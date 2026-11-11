import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

function RouteCard({ route, favorites = [], onToggleFavorite }) {
  const isFavorite = favorites.includes(route.id);

  return (
    <div className="route-card">
      <div className="route-card-top">
        <span className="route-code">{route.id}</span>
        <span className="route-category">{route.category}</span>
      </div>

      <h3>{route.name}</h3>

      <div className="route-destination">
        <div>
          <span>Origin</span>
          <p>{route.origin}</p>
        </div>
        <div>
          <span>Destination</span>
          <p>{route.destination}</p>
        </div>
      </div>

      <div className="route-card-bottom">
        <span>{route.duration}</span>
        <Link to={`/routes/${route.id}`}>Show Route &rarr;</Link>
      </div>

      <button
        className="favorite-button"
        onClick={() => onToggleFavorite(route.id)}
      >
        {isFavorite ? <BookmarkCheck size={18} /> : <BookmarkCheck size={18} />}
        {isFavorite ? 'Saved' : 'Save Route'}
      </button>
    </div>
  );
}

export default RouteCard;
