
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/authenticity/login.jsx'
import AllProducts from './components/Products/AllProducts.jsx'
import ProductForm from './components/Products/NewProducts.jsx'
import NewProductVariationForm from './components/Products/NewProductVariationForm.jsx'
function App() {


  return (
    <>
     <Router>
     <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AllProducts />} />
        <Route path="/newproducts" element={<ProductForm />} />
        <Route path="/newproductsVariations" element={<NewProductVariationForm />} />

     </Routes>

     </Router>
    </>
  )
}

export default App
