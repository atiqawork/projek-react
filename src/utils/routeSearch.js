
import { routes } from '../data/routes';

// Titik yang diperbolehkan sebagai tempat transit.
const TRANSFER_STOPS = [
  'Ramayana STC',
  'MPP Pekanbaru',
  'BRPS Bus Terminal'
];

// Menyamakan format teks untuk pencarian.
function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

// Mengambil semua halte dari seluruh koridor.
export function getAllStops() {
  const stops = routes.flatMap((route) =>
    Object.values(route.directions).flatMap(
      (direction) => direction.stops
    )
  );

  return [...new Set(stops)].sort((a, b) =>
    a.localeCompare(b)
  );
}

// Mencari rute langsung dan rute transit.
export function searchJourneys(originInput, destinationInput) {
  const origin = normalize(originInput);
  const destination = normalize(destinationInput);

  if (!origin || !destination || origin === destination) {
    return { direct: [], transfers: [] };
  }

  const direct = [];
  const transfers = [];

  // Menggabungkan seluruh arah perjalanan.
  const routeDirections = routes.flatMap((route) =>
    Object.entries(route.directions).map(
      ([directionKey, direction]) => ({
        route,
        directionKey,
        stops: direction.stops
      })
    )
  );

  // 1. Mencari bus yang melewati lokasi awal dan tujuan.
  routeDirections.forEach((item) => {
    const startIndex = item.stops.findIndex(
      (stop) => normalize(stop) === origin
    );

    const endIndex = item.stops.findIndex(
      (stop) => normalize(stop) === destination
    );

    if (startIndex !== -1 && endIndex > startIndex) {
      direct.push({
        type: 'direct',
        legs: [
          {
            ...item,
            from: item.stops[startIndex],
            to: item.stops[endIndex],
            stops: item.stops.slice(
              startIndex,
              endIndex + 1
            )
          }
        ],
        duration: parseInt(item.route.duration, 10),
        fare: item.route.fare
      });
    }
  });

  // 2. Mencari perjalanan yang membutuhkan satu kali transit.
  routeDirections.forEach((first) => {
    const startIndex = first.stops.findIndex(
      (stop) => normalize(stop) === origin
    );

    if (startIndex === -1) return;

    first.stops.slice(startIndex + 1).forEach((transferStop) => {
      // Transit hanya boleh dilakukan di titik yang ditentukan.
      const allowedTransfer = TRANSFER_STOPS.some(
        (stop) => normalize(stop) === normalize(transferStop)
      );

      if (!allowedTransfer) return;

      routeDirections.forEach((second) => {
        // Tidak menggunakan koridor yang sama dua kali.
        if (first.route.id === second.route.id) return;

        const transferIndex = second.stops.findIndex(
          (stop) => normalize(stop) === normalize(transferStop)
        );

        const destinationIndex = second.stops.findIndex(
          (stop) => normalize(stop) === destination
        );

        if (transferIndex !== -1 && destinationIndex > transferIndex) {
          const firstTransferIndex = first.stops.findIndex(
            (stop, index) =>
              index > startIndex &&
              normalize(stop) === normalize(transferStop)
          );

          transfers.push({
            type: 'transfer',
            legs: [
              {
                ...first,
                from: first.stops[startIndex],
                to: first.stops[firstTransferIndex],
                stops: first.stops.slice(
                  startIndex,
                  firstTransferIndex + 1
                )
              },
              {
                ...second,
                from: second.stops[transferIndex],
                to: second.stops[destinationIndex],
                stops: second.stops.slice(
                  transferIndex,
                  destinationIndex + 1
                )
              }
            ],
            transferStop,
            duration:
              parseInt(first.route.duration, 10) +
              parseInt(second.route.duration, 10),
            fare: first.route.fare + second.route.fare
          });
        }
      });
    });
  });

  // Menghapus hasil transit yang duplikat.
  const uniqueTransfers = [
    ...new Map(
      transfers.map((journey) => [
        `${journey.legs[0].route.id}-${journey.legs[0].directionKey}-${journey.transferStop}-${journey.legs[1].route.id}-${journey.legs[1].directionKey}`,
        journey
      ])
    ).values()
  ].sort((a, b) => a.duration - b.duration);

  return {
    direct: direct.sort((a, b) => a.duration - b.duration),
    transfers: uniqueTransfers
  };
}
