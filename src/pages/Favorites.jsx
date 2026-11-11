
import { routes } from '../data/routes';
import RouteCard from '../components/RouteCard';

function Favorites({ favorites, onToggleFavorite }) {
  const favoriteRoutes = routes.filter((route) =>
    favorites.includes(route.id)
  );

  return (
    <div className="simple-page">
      <span className="section-label">SAVED ROUTES</span>
      <h1>Favorite Routes</h1>
      <p>Routes you’ve saved.</p>

      <div className="route-grid">
        {favoriteRoutes.length > 0 ? (
          favoriteRoutes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <p className="empty-message">No Favorite Routes yet.</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
