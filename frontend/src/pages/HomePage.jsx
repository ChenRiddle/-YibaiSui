import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import './HomePage.css';

export function HomePage() {
  return (
    <>
      <div className="homepage">
      <Header />
        <title>YiBaiSui</title>
        <div className="homepage-body">
          <h1 className="greeting">Welcome to YiBaiSui</h1>
        </div>
        <Footer/>
      </div> 
    </>
  );
}