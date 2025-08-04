import { Link } from 'react-router-dom';
import './header.css';

export function Header() {
  return (
    <>
      <div className="header">
        <div className="header-menu">
          <Link to="/roomcard-page" className="menu-item">Reservation</Link>
          <Link to="/order-page" className="menu-item">Orders</Link>
          <Link to="/dasshboard-page" className="menu-item">Dashboard</Link>
        </div>
        </div>
    </>
  );
}