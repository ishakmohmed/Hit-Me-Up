import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/order" component={OrderScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route exact path="/" component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
