import { Route, Routes } from 'react-router';
import './App.css';
import { HomePage } from './pages/HomePage';
import { RoomCardPage } from './pages/RoomCardPage';
import { OrderPage } from './pages/OrderPage';


function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="roomcard-page" element={<RoomCardPage/>}/>
        <Route path="order-page" element={<OrderPage/>}/>
      </Routes>
      
    </>
  )
}

export default App
