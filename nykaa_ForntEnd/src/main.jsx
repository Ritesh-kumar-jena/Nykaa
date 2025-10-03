import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import AuthContextProvider from './contex/AuthContextProvider.jsx'
import ProductContextProvider from './contex/ProductContextProvider.jsx'
import CartContextProvider from './contex/CartContextProvider.jsx'
 
createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ProductContextProvider>
      <CartContextProvider>
         <BrowserRouter>
      <ChakraProvider>
        <App />
     </ChakraProvider>
    </BrowserRouter>
    </CartContextProvider>
  </ProductContextProvider>
</AuthContextProvider>
   
    
)
 