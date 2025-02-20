import "./styles/main.scss";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Product } from "./pages/Product";

function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<Navigate to="/home" />} />{" "}
        </Routes>

        
        <Footer />

      </Router>
    </div>
  );
}

export default App;

