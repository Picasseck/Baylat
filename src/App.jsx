import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Footer from './components/Footer';

// Les pages viendront ici au fur et à mesure
function Placeholder({ title }) {
  return <div className="page container"><h1>{title}</h1></div>;
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Placeholder title="Products" />} />
          <Route path="/cart" element={<Placeholder title="Cart" />} />
          <Route path="/about" element={<Placeholder title="About" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;