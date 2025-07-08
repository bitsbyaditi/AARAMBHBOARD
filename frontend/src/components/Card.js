function Card({ title, content }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default Card;
