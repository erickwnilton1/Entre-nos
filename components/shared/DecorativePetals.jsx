export default function DecorativePetals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <span
          key={index}
          style={{
            left: `${index * 8.5 + 3}vw`,
            animationDuration: `${14 + index % 5 * 3}s`,
            animationDelay: `${-index * 2.3}s`
          }}
        />
      ))}
    </div>
  );
}
