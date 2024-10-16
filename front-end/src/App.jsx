import Navbar from "./components/navbar";
import Home from "./components/home";
import Footer from "./components/footer";

import './styles/app.css';
export default function App() {
  return (
    <>
      <div className="header-container">
        <Navbar />
      </div>
      <div className="main-container">
        <Home />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
      
    </>
  )
}
