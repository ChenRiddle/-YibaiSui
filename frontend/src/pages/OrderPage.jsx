import { useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { RoomCard } from './RoomCard';
import menuData from '../data/menu.json';
import './OrderPage.css';

export function OrderPage(){
  const [rooms, setRooms] = useState([
      { id: 'A', capacity: 4, status: 'noOrder' },
      { id: 'B', capacity: 6, status: 'noOrder' },
      { id: 'C', capacity: 8, status: 'noOrder' },
      { id: 'D', capacity: 8, status: 'noOrder' },
      { id: 'E', capacity: 4, status: 'noOrder' },
      { id: 'F', capacity: 8, status: 'noOrder' },
      { id: 'G', capacity: 6, status: 'noOrder' },
    ]);
  
    const [selectedRoom, setSelectedRoom] = useState(null);  // 当前选中房间
    const [showOrderForm, setShowOrderForm] = useState(false);         // 控制点餐弹窗
    const [showRoomOptions, setShowRoomOptions] = useState(false);   // 控制操作选项弹窗

    //点餐
    const [searchTerm, setSearchTerm] = useState('');//搜索关键词
    const [selectedDishes, setSelectedDishes] = useState([]);//已选菜品
    const [roomOrders, setRoomOrders] = useState({});  // 独立存储order的东西，为了adddish加的

    //搜索菜单
    const filterMenu = menuData.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    //点击single room
   const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setSelectedDishes([]);
    setSearchTerm('');
    if (room.status === 'noOrder') {
      setSelectedDishes([]);
      setShowOrderForm(true);        // 没有点餐 - 开始点
    } else {
      const roomOrderData = roomOrders[room.id]||[];
      setSelectedDishes(roomOrderData);
      setShowRoomOptions(true);     // 已预约/占用 → 打开操作选项
    }
  };

    //点餐细节
    const handleAddDish = (item) =>{
      setSelectedDishes(previousDishes =>{
        const existingDish = previousDishes.find(d => d.id === item.id);
        if(existingDish){
          return previousDishes.map(d =>
            d.id === item.id ? 
            {...d, quantity: d.quantity + 1 } 
            :d
          );
        }else{
          return [...previousDishes, {...item, quantity: 1}];
        }
      });
    };

    //删除已选菜品
    const handleRemoveDish = (item) =>{
      setSelectedDishes(previousDishes =>{
        return previousDishes.filter(d => d.id !== item.id);
      });
    };

    //计算总价
    const calculateTotal = () => {
      return selectedDishes.reduce((total,dish) =>
        total + dish.price * dish.quantity,0
      ).toFixed(2);
    };


  // 确认订单
  const handleConfirm = (e) => {
    e.preventDefault();
    if(selectedDishes.length === 0){
      alert('Please select dishes to order.')
      return;
    }

    setRoomOrders(previousDishes => ({
      ...previousDishes,
      [selectedRoom.id]: selectedDishes
    }));

    const updatedRooms = rooms.map(room =>
      room.id === selectedRoom.id
        ? { ...room, status: 'inOrder' }
        : room
    );
    setRooms(updatedRooms);
    setShowOrderForm(false);
  };

 //取消订单
 const handleCancelOrder = () =>{
  setSelectedDishes([]);
  setShowOrderForm(false);
  setSearchTerm('');
 }

  //结账
  const handleCheckout =() =>{
    setRoomOrders(previousOrders => {
      const newOrders = {...previousOrders};
      delete newOrders[selectedRoom.id];
      return newOrders;
    });

    const updatedRooms = rooms.map(room =>
      room.id === selectedRoom.id ? {...room, status: 'noOrder'}
      : room
    );
    setRooms(updatedRooms);
    setShowRoomOptions(false);
  }

  //加菜
  const handleBackToAddDishes = () =>{
    setShowRoomOptions(false);
    setShowOrderForm(true);
    setSearchTerm('');
  }

  //取消点餐
  const handleTableCancel = () => {
    setRoomOrders(previousOrders => {
      const newOrders = {...previousOrders};
      delete newOrders[selectedRoom.id];
      return newOrders;
    });
    const updatedRooms = rooms.map(room =>
      room.id === selectedRoom.id
        ? {...room, status:'noOrder'}
        : room
    );
    setRooms(updatedRooms);
    setShowRoomOptions(false);
  }

  
  return (
    <div className="order-page">
      <Header />
      <div className="roomcard-container">
        {rooms.map(room =>(
          <RoomCard key={room.id} room={room} onClick= {() => handleRoomClick(room)}/>
        ))}
      </div>
      <Footer />

      {/* 点餐弹窗 */}
      {showOrderForm && (
        <>
        {/*如果用户点击弹窗外面的暗色背景，就关闭弹窗*/}
        <div className="popup-backdrop" onClick={() => setShowOrderForm(false)}></div>
        <div className="popup">
          <h3>Order for Room {selectedRoom.id}</h3>


        {/*找菜单*/}
          <div className="search-container">
            <input type="text" 
            placeholder="Search dishes" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          {/* 点餐细节弹窗 */}
      {searchTerm && (
        <div className="search-result">
          {filterMenu.slice(0,5).map(item => (
            <div key={item.id} className="search-item">
              <span>{item.name} - ${item.price}</span>
              <button onClick={() => handleAddDish(item)}>Add</button>
              </div>
          ))}
        </div>
      )}

      {/* 已选菜品列表 */}
      <div className="selected-dishes">
        <h3>Selected Dishes</h3>
        {selectedDishes.map((dish,index) => (
          <div key={dish.id}>
            <span>{index + 1}. {dish.name} - ${dish.price} x {dish.quantity}</span>
            <button onClick={() => handleRemoveDish(dish)}>Remove</button>
          </div>
        ))}
      </div>

      {/* 总价 */}
      <div className="total-price">
        <strong>Total Price: ${calculateTotal()}</strong>
      </div>


          <form onSubmit={handleConfirm}>
            <label>Dishes</label>
            <button type="submit">Confirm</button>
            <button type="button" onClick={handleCancelOrder}>Cancel</button>
          </form>
        </div>
        </>
      )}

      
      {/* 操作选项弹窗 */}
      {showRoomOptions && (
        <>
          {/*如果用户点击弹窗外面的暗色背景，就关闭弹窗*/}
          <div className="popup-backdrop" onClick={() => setShowRoomOptions(false)}></div>
          <div className="popup">
             {/*如果是in order的话就会有不同的操作，结账，加菜，取消这桌，close*/}
          {selectedRoom.status === 'inOrder' && (
            <>
            <p>Room {selectedRoom.id} is in order.</p>
            {/*总价显示*/}
             <p>Current Order Total: ${calculateTotal()}</p>
            {/*结账*/}
            <button onClick={handleCheckout}>Checkout</button>
            {/*加菜*/}
            <button onClick={handleBackToAddDishes}>Add Dish</button>
            {/*取消*/}
            <button onClick={handleTableCancel}>Cancel Table</button>
            {/*关闭*/}
            <button onClick={() => setShowRoomOptions(false)}>Close</button>

            </>
          )}

          </div>

        </>
      )}
    </div>
  );
}