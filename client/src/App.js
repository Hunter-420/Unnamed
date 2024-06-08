import './App.css';
import { Routes, Route } from 'react-router-dom';
import Admin from './layouts/admin';
import Customer from './layouts/customer';
import AdminDashboard from './pages/admin/adminDashboard';
import HomePage from './pages/customer/homePage';
import Error from './pages/Error';
import ProductDetails from './pages/customer/ProductDetails';
import Auth from './pages/admin/Auth';
import AddProducts from './pages/admin/AddProducts';
import UpdateProduct from './pages/admin/UpdateProduct';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AdminDashboard />} />
          </Route>
        <Route path="/" element={<Customer />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetails />} />
        </Route>
        <Route path="*" element={<Error />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/add-products" element={<AddProducts />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
