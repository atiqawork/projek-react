
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { routes } from '../data/routes';
import BusStopList from '../components/BusStopList';

function RouteDetail() {
  const { id } = useParams();
  const route = routes.find((item) => item.id === id);
  const [direction, setDirection] = useState('outbound');
  const [showAll, setShowAll] = useState(false);

  if (!route) {
    return (
      <div className="simple-page">
        <h1>Route not found</h1>
        <Link to="/routes">Back to Routes</Link>
      </div>
    );
  }

  const stops = route.directions[direction].stops;
  const keyStops = stops.filter((_, index) =>
    [0, Math.round((stops.length - 1) / 4),
      Math.round((stops.length - 1) / 2),
      Math.round(3 * (stops.length - 1) / 4),
      stops.length - 1
    ].includes(index)
  );


const mapPatterns = [
  {
    path: 'M30 115 L75 115 L75 65 L135 65 L135 145 L205 145 L205 95 L270 95',
    points: [[30,115], [75,115], [75,65], [135,65], [135,145], [205,145], [205,95], [270,95]]
  },
  {
    path: 'M30 55 L85 55 L85 125 L145 125 L145 75 L215 75 L215 150 L270 150',
    points: [[30,55], [85,55], [85,125], [145,125], [145,75], [215,75], [215,150], [270,150]]
  },
  {
    path: 'M30 145 L80 145 L80 85 L125 85 L125 45 L200 45 L200 115 L270 115',
    points: [[30,145], [80,145], [80,85], [125,85], [125,45], [200,45], [200,115], [270,115]]
  },
  {
    path: 'M30 90 L70 90 L70 150 L130 150 L130 70 L190 70 L190 120 L270 120',
    points: [[30,90], [70,90], [70,150], [130,150], [130,70], [190,70], [190,120], [270,120]]
  }
];

const mapPattern =
  mapPatterns[(Number(route.id.slice(1)) - 1) % mapPatterns.length];

const displayedPoints =
  direction === 'inbound'
    ? [...mapPattern.points].reverse()
    : mapPattern.points;

const mapPath = displayedPoints
  .map((point, index) =>
    `${index === 0 ? 'M' : 'L'}${point[0]} ${point[1]}`
  )
  .join(' ');

  return (
    <div className="detail-page">
      <Link to="/routes" className="back-link">
        &larr; Back to Routes
      </Link>

      <div className="detail-header">
        <div>
          <span className="route-code">{route.id}</span>
          <h1>{route.name}</h1>
          <p>{route.directions[direction].label}</p>
        </div>
        <span className="route-category">{route.category}</span>
      </div>

      <div className="detail-summary">
        <div>
          <span>DURATION</span>
          <h3>{route.duration}</h3>
        </div>
        <div>
          <span>FARE</span>
          <h3>Rp{route.fare.toLocaleString('id-ID')}</h3>
        </div>
        <div>
          <span>INTERVAL</span>
          <h3>{route.schedule.interval} minutes</h3>
        </div>
      </div>

      <div className="detail-content">
        <section className="detail-stops">
          <span className="section-label">TRAVEL DIRECTION</span>

          <div className="direction-tabs">
            <button
              className={direction === 'outbound' ? 'active' : ''}
              onClick={() => {
                setDirection('outbound');
                setShowAll(false);
              }}
            >
              Outbound
            </button>
            <button
              className={direction === 'inbound' ? 'active' : ''}
              onClick={() => {
                setDirection('inbound');
                setShowAll(false);
              }}
            >
              Inbound
            </button>
          </div>

          <div className="detail-section-heading">
            <h2>Main Bus Stops</h2>
            <p>
              {showAll
                ? `${stops.length} stops on this direction`
                : `Showing ${keyStops.length} key stops`}
            </p>
          </div>

          <BusStopList stops={showAll ? stops : keyStops} />

          <button
            className="view-stops-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Key Stops' : 'View All Stops'}
          </button>
        </section>

        <section className="detail-side">
          <div className="detail-schedule">
            <span className="section-label">SCHEDULE</span>
            <h2>Operating Hours</h2>

            <div className="schedule-item">
              <span>{route.schedule.start}</span>
              <span>First Departure</span>
            </div>
            <div className="schedule-item">
              <span>{route.schedule.end}</span>
              <span>Last Departure</span>
            </div>
          </div>

          <div className="route-map-card">
            <span className="section-label">ROUTE MAP</span>
            <h2>Route Overview</h2>
            
<div className="route-map-preview">
  <div className="map-endpoints">
    <span>{stops[0]}</span>
    <span>{stops[stops.length - 1]}</span>
  </div>

  <svg viewBox="0 0 300 200" className="route-map-svg">
  <path
    d={mapPath}
    fill="none"
    stroke="#D9CFC0"
    strokeWidth="12"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  <path
    d={mapPath}
    fill="none"
    stroke="#F04B16"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  {displayedPoints.map((point, index) => {
    const isStart = index === 0;
    const isEnd = index === displayedPoints.length - 1;

    if (!isStart && !isEnd) return null;

    return (
      <circle
        key={index}
        cx={point[0]}
        cy={point[1]}
        r="6"
        fill={isStart ? '#F04B16' : '#171717'}
      />
    );
  })}
</svg>

  <div className="map-legend">
    <span>
      <i className="start-marker"></i> Starting Point
    </span>
    <span>
      <i className="end-marker"></i> Destination
    </span>
  </div>
</div>

            <p>
              Route map preview. Exact stop locations are not
              available yet.
            </p>
          </div>
        </section>
      </div>

      <p className="simulation-note">
        Schedules and fares are simulated and may differ from
        actual public transportation services.
      </p>
    </div>
  );
}

export default RouteDetail;
