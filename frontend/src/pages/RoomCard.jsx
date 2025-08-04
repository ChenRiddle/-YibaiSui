

import './RoomCard.css';



// single room card
export function RoomCard({ room, onClick }) {
  const { id, capacity, status } = room;

  const cardClass = `roomcard ${status}`;

  return (
    <div className={cardClass} onClick={onClick}>
      <h3>Room {id}</h3>
      <p>Status: {status}</p>
      <p>Capacity: {capacity}</p>
    </div>
  );
}
