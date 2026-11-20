import { useMemo, useState } from 'react';
import { routes } from '../data/routes';
import RouteCard from '../components/RouteCard';
import { getAllStops, searchJourneys } from '../utils/routeSearch';

function JourneyLeg({ leg, number }) {
  return (
    <div className="journey-leg">
      <div className="journey-leg-heading">
        <span className="route-code">{leg.route.id}</span>
        <strong>{leg.route.name}</strong>
        <span className="route-category">
          {leg.directionKey === 'outbound' ? 'Outbound' : 'Inbound'}
        </span>
      </div>

      <div className="journey-leg-points">
        <div>
          <span className="journey-dot start-dot" />
          <p>{leg.from}</p>
        </div>

        <div className="journey-stop-list">
          {leg.stops.slice(1, -1).map((stop, index) => (
            <p key={`${stop}-${index}`}>{stop}</p>
          ))}
        </div>

        <div>
          <span className="journey-dot end-dot" />
          <p>{leg.to}</p>
        </div>
      </div>

      <p className="journey-leg-duration">
        Bus {number} · Estimated duration: {leg.route.duration}
      </p>
    </div>
  );
}

function JourneyCard({ journey, index }) {
  const isTransfer = journey.type === 'transfer';

  return (
    <article className="journey-card">
      <div className="journey-card-top">
        <span className="journey-option">
          Journey Option {index + 1}
        </span>

        <span className={`journey-badge ${isTransfer ? 'transfer-badge' : 'direct-badge'}`}>
          {isTransfer ? '1 Transfer' : 'Direct Route'}
        </span>
      </div>

      {journey.legs.map((leg, legIndex) => (
        <div key={`${leg.route.id}-${leg.directionKey}-${legIndex}`}>
          {legIndex > 0 && (
            <div className="transfer-point">
              <span>Transfer at:</span>
              <strong>{journey.transferStop}</strong>
            </div>
          )}

          <JourneyLeg leg={leg} number={legIndex + 1} />
        </div>
      ))}

      <div className="journey-summary">
        <div>
          <span>Total Estimated Duration</span>
          <strong>{journey.duration} min</strong>
        </div>

        <div>
          <span>Total Simulated Fare</span>
          <strong>Rp{journey.fare.toLocaleString('id-ID')}</strong>
        </div>
      </div>
    </article>
  );
}

function RoutesPage({ favorites, onToggleFavorite }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [category, setCategory] = useState('All');

  const allStops = useMemo(() => getAllStops(), []);

  const searchResults = useMemo(
    () => searchJourneys(origin, destination),
    [origin, destination]
  );

  const categories = [
    'All',
    ...new Set(routes.map((route) => route.category))
  ];

  const filteredRoutes = routes.filter(
    (route) => category === 'All' || route.category === category
  );

  function handleSearch(event) {
    event.preventDefault();
    setHasSearched(true);
  }

  function resetSearch() {
    setOrigin('');
    setDestination('');
    setHasSearched(false);
  }

  return (
    <div className="routes-page">
      <div className="routes-heading">
        <span className="section-label">FIND YOUR JOURNEY</span>
        <h1>Explore the Routes</h1>
        <p>
          Enter your starting point and destination to find
          the right bus route around Pekanbaru.
        </p>
      </div>

      <form className="journey-search" onSubmit={handleSearch}>
        <div className="journey-search-fields">
          <label className="journey-field">
            <span>Starting Point</span>
            <input
              list="rutein-stop-list"
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
              placeholder="Enter your starting point"
              required
            />
          </label>

          <label className="journey-field">
            <span>Destination</span>
            <input
              list="rutein-stop-list"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Enter your destination"
              required
            />
          </label>

          <datalist id="rutein-stop-list">
            {allStops.map((stop) => (
              <option key={stop} value={stop} />
            ))}
          </datalist>
        </div>

        <div className="journey-search-actions">
          <button type="submit">Find Bus</button>

          <button
            type="button"
            className="clear-search-button"
            onClick={resetSearch}
          >
            Clear
          </button>
        </div>

        <p className="search-helper">
          Select a location from the suggestions to match the available bus stops.
        </p>
      </form>

      {hasSearched && (
        <section className="journey-results">
          <div className="routes-result-info">
            <h2>Journey Results</h2>
            <span>{origin} → {destination}</span>
          </div>

          {origin.trim().toLowerCase() === destination.trim().toLowerCase() ? (
            <p className="journey-empty">
              Starting point and destination must be different.
            </p>
          ) : searchResults.direct.length > 0 ? (
            <>
              <p className="journey-result-note">
                Direct bus routes are available. No transfer is needed.
              </p>

              <div className="journey-result-grid">
                {searchResults.direct.map((journey, index) => (
                  <JourneyCard
                    key={`${journey.legs[0].route.id}-${journey.legs[0].directionKey}`}
                    journey={journey}
                    index={index}
                  />
                ))}
              </div>
            </>
          ) : searchResults.transfers.length > 0 ? (
            <>
              <p className="journey-result-note">
                No direct bus route was found. You can reach your destination
                by taking one transfer.
              </p>

              <div className="journey-result-grid">
                {searchResults.transfers.slice(0, 5).map((journey, index) => (
                  <JourneyCard
                    key={`${journey.legs[0].route.id}-${journey.transferStop}-${journey.legs[1].route.id}`}
                    journey={journey}
                    index={index}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="journey-empty">
              No route found. Make sure both locations are available
              in the RUTEIN bus stop list.
            </p>
          )}

          <p className="simulation-note">
            Travel duration and fares are simulated based on RUTEIN route data.
            Waiting time and traffic conditions are not included.
          </p>
        </section>
      )}

      <div className="category-filter">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? 'category-active' : ''}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="routes-result-info">
        <h2>All Bus Routes</h2>
        <span>{filteredRoutes.length} routes found</span>
      </div>

      <div className="route-grid">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <p className="empty-message">
            No routes found in this category.
          </p>
        )}
      </div>
    </div>
  );
}

export default RoutesPage;
