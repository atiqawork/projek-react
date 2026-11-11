import { useState } from 'react';
import { routes } from '../data/routes';
import RouteCard from '../components/RouteCard';
import SearchBar from '../components/SearchBar';

function RoutesPage({ favorites, onToggleFavorite }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredRoutes = routes.filter((route) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      route.id.toLowerCase().includes(keyword) ||
      route.name.toLowerCase().includes(keyword) ||
      route.origin.toLowerCase().includes(keyword) ||
      route.destination.toLowerCase().includes(keyword);

    const matchesCategory =
      category === 'All' || route.category === category;

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'City', 'Campus', 'Airport', 'Healthcare', 'Leisure'];

  return (
    <div className="routes-page">
      <div className="routes-heading">
        <span className="section-label">FIND YOUR JOURNEY</span>
        <h1>Explore the Routes</h1>
        <p>
          Choose a bus route based on your destination
          around Pekanbaru.
        </p>
      </div>

      <div className="routes-search">
        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={(event) => event.preventDefault()}
        />
      </div>

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
        <h2>List of Routes</h2>
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
            No routes found. Try a different keyword or category.
          </p>
        )}
      </div>
    </div>
  );
}

export default RoutesPage;
