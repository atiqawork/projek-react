export const routes = [
  {
    id: 'B01',
    name: 'Pandau Line',
    category: 'Residential',
    origin: 'Ramayana STC',
    destination: 'Pandau Permai',
    duration: '45 min',
    fare: 5000,
    schedule: {
      start: '06.00',
      end: '18.00',
      interval: 30
    },
    description: 'A simulated route connecting the city center to residential areas in Pandau Permai.',
    directions: {
      outbound: {
        label: 'Ramayana STC → Pandau Permai',
        stops: [
          'Ramayana STC',
          'Mall Pekanbaru',
          'Jenderal Sudirman St.',
          'Kaharuddin Nasution St.',
          'Pasir Putih St.',
          'Pandau Permai'
        ]
      },
      inbound: {
        label: 'Pandau Permai → Ramayana STC',
        stops: [
          'Pandau Permai',
          'Pasir Putih St.',
          'Kaharuddin Nasution St.',
          'Jenderal Sudirman St.',
          'Hotel Furaya',
          'Ramayana STC'
        ]
      }
    }
  },
  {
    id: 'B02',
    name: 'Airport Line',
    category: 'Airport',
    origin: 'MPP Pekanbaru',
    destination: 'Sultan Syarif Kasim II Airport',
    duration: '25 min',
    fare: 5000,
    schedule: {
      start: '06.00',
      end: '18.00',
      interval: 30
    },
    description: 'A simulated route connecting MPP Pekanbaru to Sultan Syarif Kasim II Airport.',
    directions: {
      outbound: {
        label: 'MPP → Sultan Syarif Kasim II Airport',
        stops: [
          'MPP Pekanbaru',
          'Dang Merdu',
          'RRI Pekanbaru',
          'Jenderal Sudirman St.',
          'Simpang Tiga',
          'Sultan Syarif Kasim II Airport'
        ]
      },
      inbound: {
        label: 'Airport → MPP Pekanbaru',
        stops: [
          'Sultan Syarif Kasim II Airport',
          'Simpang Tiga',
          'Jenderal Sudirman St.',
          'RRI Pekanbaru',
          'Dang Merdu',
          'MPP Pekanbaru'
        ]
      }
    }
  },
  {
    id: 'B03',
    name: 'Kulim Line',
    category: 'Residential',
    origin: 'BRPS Bus Terminal',
    destination: 'Kulim',
    duration: '45 min',
    fare: 5000,
    schedule: {
      start: '06.00',
      end: '18.00',
      interval: 30
    },
    description: 'A simulated route connecting BRPS Bus Terminal to residential areas in Kulim.',
    directions: {
      outbound: {
        label: 'BRPS → Kulim',
        stops: [
          'BRPS Bus Terminal',
          'Tuanku Tambusai St.',
          'Soekarno Hatta St.',
          'Jenderal Sudirman St.',
          'Imam Munandar St.',
          'Kulim'
        ]
      },
      inbound: {
        label: 'Kulim → BRPS',
        stops: [
          'Kulim',
          'Imam Munandar St.',
          'Jenderal Sudirman St.',
          'Soekarno Hatta St.',
          'Tuanku Tambusai St.',
          'BRPS Bus Terminal'
        ]
      }
    }
  },
  {
    id: 'B04',
    name: 'Panam Line',
    category: 'Campus',
    origin: 'UIN Suska Riau',
    destination: 'Ramayana STC',
    duration: '40 min',
    fare: 5000,
    schedule: {
      start: '06.00',
      end: '18.00',
      interval: 20
    },
    description: 'A simulated route connecting UIN Suska Riau and University of Riau to the city center.',
    directions: {
      outbound: {
        label: 'UIN Suska → Ramayana STC',
        stops: [
          'UIN Suska Riau',
          'HR Soebrantas St.',
          'University of Riau',
          'Soekarno Hatta St.',
          'Arifin Ahmad St.',
          'Jenderal Sudirman St.',
          'Ramayana STC'
        ]
      },
      inbound: {
        label: 'Ramayana STC → UIN Suska',
        stops: [
          'Ramayana STC',
          'Jenderal Sudirman St.',
          'Arifin Ahmad St.',
          'Soekarno Hatta St.',
          'University of Riau',
          'HR Soebrantas St.',
          'UIN Suska Riau'
        ]
      }
    }
  },
  {
    id: 'B05',
    name: 'Tangor Line',
    category: 'Residential',
    origin: 'Ramayana STC',
    destination: 'Pasar Tangor',
    duration: '40 min',
    fare: 5000,
    schedule: {
      start: '06.00',
      end: '18.00',
      interval: 30
    },
    description: 'A simulated route connecting the city center to Pasar Tangor and Tenayan Raya.',
    directions: {
      outbound: {
        label: 'Ramayana STC → Pasar Tangor',
        stops: [
          'Ramayana STC',
          'Jenderal Sudirman St.',
          'Hang Tuah St.',
          'Polsek Tenayan Raya',
          'Pasar Tangor'
        ]
      },
      inbound: {
        label: 'Pasar Tangor → Ramayana STC',
        stops: [
          'Pasar Tangor',
          'Polsek Tenayan Raya',
          'Hang Tuah St.',
          'Jenderal Sudirman St.',
          'Ramayana STC'
        ]
      }
    }
  },
  {
    id: 'B06',
    name: 'BRPS - City Line',
    category: 'City',
    origin: 'MPP Pekanbaru',
    destination: 'BRPS Bus Terminal',
    duration: '35 min',
    fare: 5000,
    schedule: {
      start: '06.00',
      end: '18.00',
      interval: 30
    },
    description: 'A simulated route connecting the city center to BRPS Bus Terminal.',
    directions: {
      outbound: {
        label: 'MPP → BRPS',
        stops: [
          'MPP Pekanbaru',
          'Jenderal Sudirman St.',
          'Ratulangi St.',
          'Ahmad Yani St.',
          'Riau St.',
          'Soekarno Hatta St.',
          'Tuanku Tambusai St.',
          'BRPS Bus Terminal'
        ]
      },
      inbound: {
        label: 'BRPS → MPP',
        stops: [
          'BRPS Bus Terminal',
          'Tuanku Tambusai St.',
          'Soekarno Hatta St.',
          'Riau St.',
          'Juanda St.',
          'Jenderal Sudirman St.',
          'MPP Pekanbaru'
        ]
      }
    }
  },
  {
    id: 'B07',
    name: 'Government Line',
    category: 'Government',
    origin: 'MPP Pekanbaru',
    destination: 'Tenayan Raya Government Center',
    duration: '40 min',
    fare: 5000,
    schedule: {
      start: '06.00',
      end: '18.00',
      interval: 30
    },
    description: 'A simulated route connecting the city center to the municipal government complex in Tenayan Raya.',
    directions: {
      outbound: {
        label: 'MPP → Government Center',
        stops: [
          'MPP Pekanbaru',
          'Kartini St.',
          'Mustika St.',
          'Mohammad Dahlan St.',
          'Sisingamangaraja St.',
          'Sultan Syarif Kasim St.',
          'Hang Tuah Ujung St.',
          'Badak Ujung St.',
          'Abdul Rahman Hamid St.',
          'Tenayan Raya Government Center'
        ]
      },
      inbound: {
        label: 'Government Center → MPP',
        stops: [
          'Tenayan Raya Government Center',
          'Abdul Rahman Hamid St.',
          'Badak Ujung St.',
          'Hang Tuah Ujung St.',
          'Sultan Syarif Kasim St.',
          'Sisingamangaraja St.',
          'Mohammad Dahlan St.',
          'Mustika St.',
          'Kartini St.',
          'MPP Pekanbaru'
        ]
      }
    }
  },
  {
    id: 'B08',
    name: 'Rumbai - Campus Line',
    category: 'Campus',
    origin: 'MPP Pekanbaru',
    destination: 'University of Lancang Kuning',
    duration: '40 min',
    fare: 5000,
    schedule: {
      start: '06.00',
      end: '18.00',
      interval: 30
    },
    description: 'A simulated route connecting the city center to Politeknik Caltex Riau and University of Lancang Kuning.',
    directions: {
      outbound: {
        label: 'MPP → Unilak',
        stops: [
          'MPP Pekanbaru',
          'Cut Nyak Dhien St.',
          'Ahmad Yani St.',
          'Riau St.',
          'Siak II St.',
          'Palas Mekar St.',
          'Kartika Sari St.',
          'Politeknik Caltex Riau',
          'Yos Sudarso St.',
          'University of Lancang Kuning'
        ]
      },
      inbound: {
        label: 'Unilak → MPP',
        stops: [
          'University of Lancang Kuning',
          'Yos Sudarso St.',
          'Politeknik Caltex Riau',
          'Kartika Sari St.',
          'Palas Mekar St.',
          'Siak II St.',
          'Riau St.',
          'Juanda St.',
          'Jenderal Sudirman St.',
          'MPP Pekanbaru'
        ]
      }
    }
  }
];
