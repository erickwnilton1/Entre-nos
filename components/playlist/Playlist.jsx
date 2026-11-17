export default function Playlist({ data }) {
  return (
    <>
      <h2>Algumas músicas sempre vão <em>lembrar você.</em></h2>
      <div className="g2 playlist">
        {data.pl.map((song, index) => (
          <a className="card glow" key={index} href={song[3]} target="_blank" rel="noreferrer">
            <div className="mono">{song[1]}</div>
            <h3>▶ {song[0]}</h3>
            <p className="muted">{song[2]}</p>
          </a>
        ))}
      </div>
    </>
  );
}
