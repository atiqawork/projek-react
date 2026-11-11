import { useState } from 'react';
import { routes } from '../data/routes';
import RouteCard from '../components/RouteCard';
import SearchBar from '../components/SearchBar';

function Home({ favorites, onToggleFavorite }) {
  const [search, setSearch] = useState('');

  const filteredRoutes = routes.filter((route) => {
    const keyword = search.toLowerCase();

    return (
      route.id.toLowerCase().includes(keyword) ||
      route.name.toLowerCase().includes(keyword) ||
      route.origin.toLowerCase().includes(keyword) ||
      route.destination.toLowerCase().includes(keyword)
    );
  });

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
            <h2>Popular Routes</h2>
            <p>Find routes that match your destination.</p>
          </div>

          <span className="route-count">
            {filteredRoutes.length} Routes
          </span>
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
              No routes found. Try other keywords.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
