function BusStopList({ stops }) {
  return (
    <div className="bus-stop-list">
      {stops.map((stop, index) => (
        <div className="bus-stop-item" key={index}>
          <div className="bus-stop-marker">
            <span></span>
          </div>

          <div className="bus-stop-info">
            <span>BUS STOP {String(index + 1).padStart(2, '0')}</span>
            <p>{stop}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BusStopList;
