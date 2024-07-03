import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from './layouts/admin';
import Customer from './layouts/customer';
import AdminDashboard from './pages/admin/adminDashboard';
import HomePage from './pages/customer/homePage';
import Error from './pages/Error';
import ProductDetails from './pages/customer/ProductDetails';
import Auth from './pages/admin/Auth';
import Register from './pages/admin/Register';
import AddProducts from './pages/admin/AddProducts';
import UpdateProduct from './pages/admin/UpdateProduct';

const isAuthenticated = () => {
  return !!sessionStorage.getItem('authToken');
};

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Customer Routes */}
        <Route path="/" element={<Customer />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetails />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={isAuthenticated() ? <Admin /> : <Navigate to="/auth" />}>
        <Route index element={<AdminDashboard />} />
        </Route>
        <Route path="add-products" element={isAuthenticated() ? <AddProducts /> : <Navigate to="/auth" />} />
        <Route path="update-product/:id" element={isAuthenticated() ? <UpdateProduct /> : <Navigate to="/auth" />} />

        {/* Error Route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
