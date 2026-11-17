export default function Map({ data }) {
  return (
    <div className="map">
      <div className="map-line">✈</div>
      <div className="map-points"><span>●</span><span>●</span></div>
      <div className="map-labels"><span>{data.orig}</span><span>{data.dest}</span></div>
    </div>
  );
}
