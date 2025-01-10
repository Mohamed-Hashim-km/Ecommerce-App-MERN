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
import LoginScreen from "./registration/Login";
import RegisterScreen from "./registration/SignUp";
import Loader from "./components/Loader";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import CheckoutSteps from "./components/CheckoutSteps";
import PrivetRoutes from "./components/PrivetRoutes";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/sign" element={<RegisterScreen />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/productscreen/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="" element={<PrivetRoutes />}>
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
            </Route>

            <Route path="/checkoutSteps" element={<CheckoutSteps />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
