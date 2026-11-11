import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="simple-page">
      <h1>404</h1>
      <p>The page you are looking for was not found.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFound;