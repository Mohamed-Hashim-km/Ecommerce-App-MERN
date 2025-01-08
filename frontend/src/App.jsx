import { Container } from "react-bootstrap";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Header from "./components/Header";
import Footer from "./components/footer";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <>
    
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/productscreen/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />



          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
