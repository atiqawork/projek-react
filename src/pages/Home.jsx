import { useState } from 'react';
import { routes } from '../data/routes';
import RouteCard from '../components/RouteCard';
import SearchBar from '../components/SearchBar';

function Home({ favorites, onToggleFavorite }) {
  const [search, setSearch] = useState('');

  // Select only three featured routes for the homepage.
  const featuredRouteIds = ['B02', 'B04', 'B06'];

  const featuredRoutes = routes.filter((route) =>
    featuredRouteIds.includes(route.id)
  );

  // Search across all routes when the user enters a keyword.
  const filteredRoutes = routes.filter((route) => {
    const keyword = search.toLowerCase();

    return (
      route.id.toLowerCase().includes(keyword) ||
      route.name.toLowerCase().includes(keyword) ||
      route.origin.toLowerCase().includes(keyword) ||
      route.destination.toLowerCase().includes(keyword)
    );
  });

  const displayedRoutes = search.trim()
    ? filteredRoutes
    : featuredRoutes;

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="hero-label">BUS ROUTE GUIDE · PEKANBARU</span>

          <h1>
            Travel made easier,
            <br />
            start from <span>RUTEIN.</span>
          </h1>

          <p>
            Find information on bus routes and your destinations
            around Pekanbaru, all in one place.
          </p>

          <SearchBar
            search={search}
            setSearch={setSearch}
            onSearch={(event) => event.preventDefault()}
          />
        </div>

        <div className="hero-decoration">
          <span>R</span>
          <div className="hero-circle"></div>
        </div>
      </section>

      <section className="home-routes">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE PEKANBARU</span>

            <h2>
              {search.trim() ? 'Search Results' : 'Popular Routes'}
            </h2>

            <p>
              {search.trim()
                ? 'Routes matching your search.'
                : 'Explore some of the featured bus routes in Pekanbaru.'}
            </p>
          </div>

          <span className="route-count">
            {search.trim()
              ? `${displayedRoutes.length} Routes Found`
              : '3 Featured Routes'}
          </span>
        </div>

        <div className="route-grid">
          {displayedRoutes.length > 0 ? (
            displayedRoutes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
              />
            ))
          ) : (
            <p className="empty-message">
              No routes found. Try another keyword.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
