
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
        
import Login from './components/authenticity/login.jsx'
import AllProducts from './components/Products/AllProducts.jsx'
import ProductForm from './components/productosAD/NewProductVariationForm.jsx'
import NewProductVariationForm from './components/productosAD/NewProducts.jsx'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/button';
import 'primeflex/primeflex.css';
import Register from './components/authenticity/register.jsx'
import RegisterP from './components/authenticity/registerP.jsx'
import './index.css'; 
import Home from "./components/Products/home.jsx"
import { UserProvider } from './context/UserContext.jsx'
import AdminPanel from './components/AdminPanel/AdminPanel.js'
function App() {
  return (
    <>
  <UserProvider>
 <Router>
     <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/registerp' element={<RegisterP />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/" element={<Home />} />
        <Route path="/newproducts" element={<ProductForm />} />
        <Route path="/Panel" element={<NewProductVariationForm />} />
     </Routes>
     </Router>
      </UserProvider>,
    </>
  )
}

export default App
