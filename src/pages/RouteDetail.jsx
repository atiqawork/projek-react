import { Link, useParams } from 'react-router-dom';
import { routes } from '../data/routes';
import BusStopList from '../components/BusStopList';

function RouteDetail() {
  const { id } = useParams();
  const route = routes.find((item) => item.id === id);

  if (!route) {
    return (
      <div className="simple-page">
        <h1>Route not found</h1>
        <p>Sorry, the route information you're looking for is not available.</p>
        <Link to="/routes">Back to the Route List</Link>
      </div>
    );
  }

  const schedules = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'];

  return (
    <div className="detail-page">
      <Link to="/routes" className="back-link">
        &larr; Back to the Route List
      </Link>

      <div className="detail-header">
        <div>
          <span className="route-code">{route.id}</span>
          <h1>{route.name}</h1>
          <p>{route.description}</p>
        </div>
        <span className="route-category">{route.category}</span>
      </div>

      <div className="detail-summary">
        <div>
          <span>TRIP ORIGIN</span>
          <h3>{route.origin}</h3>
        </div>
        <div>
          <span>FINAL DESTINATION</span>
          <h3>{route.destination}</h3>
        </div>
        <div>
          <span>ESTIMATED DURATION</span>
          <h3>{route.duration}</h3>
        </div>
      </div>

      <div className="detail-content">
        <section className="detail-stops">
          <div className="detail-section-heading">
            <span className="section-label">TRAVEL ROUTE</span>
            <h2>Order of Stops</h2>
            <p>{route.stops.length} stops along this route.</p>
          </div>

          <BusStopList stops={route.stops} />
        </section>

        <section className="detail-schedule">
          <span className="section-label">SCHEDULE</span>
          <h2>Departure Times</h2>
          <p>Choose your preferred departure time.</p>

          {schedules.map((time) => (
            <div className="schedule-item" key={time}>
              <span>{time}</span>
              <span>Estimated departured time</span>
            </div>
          ))}

          <p className="schedule-note">
            Schedules may vary based on live traffic conditions.
          </p>
        </section>
      </div>

      <p className="simulation-note">
        Your seamless city route, mapped out perfectly.
      </p>
    </div>
  );
}

export default RouteDetail;
