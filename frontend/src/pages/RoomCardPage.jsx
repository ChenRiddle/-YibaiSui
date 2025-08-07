import { useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { RoomCard } from './RoomCard';
import './RoomCardPage.css';

export function RoomCardPage() {
  const [rooms, setRooms] = useState([
    { id: 'A', capacity: 4, status: 'available' },
    { id: 'B', capacity: 6, status: 'available' },
    { id: 'C', capacity: 8, status: 'available' },
    { id: 'D', capacity: 8, status: 'available' },
    { id: 'E', capacity: 4, status: 'available' },
    { id: 'F', capacity: 8, status: 'available' },
    { id: 'G', capacity: 6, status: 'available' },
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null);  // 当前选中房间
  const [showForm, setShowForm] = useState(false);         // 控制预约弹窗
  const [showOptions, setShowOptions] = useState(false);   // 控制操作选项弹窗

  // 处理房间点击 → 弹窗切换
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    if (room.status === 'available') {
      setShowForm(true);        // 空闲 → 打开预约表单
    } else {
      setShowOptions(true);     // 已预约/占用 → 打开操作选项
    }
  };

  // 确认预约 → 更新状态
  const handleConfirm = (e) => {
    e.preventDefault();
    const updatedRooms = rooms.map(room =>
      room.id === selectedRoom.id
        ? { ...room, status: 'reserved' }
        : room
    );
    setRooms(updatedRooms);
    setShowForm(false);
  };

  // 取消预约
  const handleCancelReservation = () => {
    const updatedRooms = rooms.map(room =>
      room.id === selectedRoom.id
        ? { ...room, status: 'available' }
        : room
    );
    setRooms(updatedRooms);
    setShowOptions(false);
  };

  // 客人到店 → occupied
  const handleCheckIn = () => {
    const updatedRooms = rooms.map(room =>
      room.id === selectedRoom.id
        ? { ...room, status: 'occupied' }
        : room
    );
    setRooms(updatedRooms);
    setShowOptions(false);
  };

  // 客人离店 → available
  const handleCheckout = () => {
    const updatedRooms = rooms.map(room =>
      room.id === selectedRoom.id
        ? { ...room, status: 'available' }
        : room
    );
    setRooms(updatedRooms);
    setShowOptions(false);
  };

  return (
    <div className="roomcard-page">
      <Header />

      <div className="roomcard-container">
        {rooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            onClick={() => handleRoomClick(room)}
          />
        ))}
      </div>

      <Footer />

      {/* 预约弹窗 */}
      {showForm && (
        <>
        {/*如果用户点击弹窗外面的暗色背景，就关闭弹窗*/}
          <div className="popup-backdrop" onClick={() => setShowForm(false)}></div>
          <div className="popup">
            <h3>Reserve Room {selectedRoom.id}</h3>
            <form onSubmit={handleConfirm}>
              <label>Last Name: <input name="lastName" required /></label><br />
              <label>Phone Number: <input name="phoneNumber" type="number" required /></label><br />
              <label>Guests: <input name="guestCount" type="number" required /></label><br />
              <label>Arrival Time: <input name="arrivalTime" type="time" required /></label><br />
              <label>Staff ID: <input name="staffID" required /></label><br />
              <button type="submit">Confirm</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </>
      )}

      {/* 状态操作弹窗 */}
      {showOptions && (
        <>
          {/*如果用户点击弹窗外面的暗色背景，就关闭弹窗*/}
          <div className="popup-backdrop" onClick={() => setShowOptions(false)}></div>
          <div className="popup">

            {/*如果是预约了的话就会有取消预约或者到店*/}
            {selectedRoom.status === 'reserved' && (
              <>
                <p>Room {selectedRoom.id} is reserved</p>
                <button onClick={handleCancelReservation}>Cancel Reservation</button>
                <button onClick={handleCheckIn}>Guest Arrived</button>
              </>
            )}

            {/*如果是已经来了的话，那就可以离开*/}
            {selectedRoom.status === 'occupied' && (
              <>
                <p>Room {selectedRoom.id} is in use</p>
                <button onClick={handleCheckout}>Guest Left</button>
              </>
            )}

            <button onClick={() => setShowOptions(false)}>Close</button>
          </div>
        </>
      )}
    </div>
  );
}
