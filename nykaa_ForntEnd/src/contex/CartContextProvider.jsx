import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContextProvider";
import { useToast } from "@chakra-ui/react";




export const CartContext=createContext()

function CartContextProvider({children}) {
    const [MyCarts,setMyCarts]=useState([])
    const [loading,setLoading]=useState(true)
    const [loadingProductId, setLoadingProductId] = useState(null)

     const {isAdmin,isLogin}=useContext(AuthContext)

     const toast=useToast()

    const getMyCart=async()=>{
      try {
        if(isAdmin){
         const res=await api.get("/cart/allcart")
         const data=res.data
         typeof(data)==="string"?setMyCarts([]):setMyCarts(data.cart||[])
        }else{
        const res=await api.get("/cart/mycart")
        const data=res.data
         typeof(data)==="string"?setMyCarts([]):setMyCarts(data.cart||[])
        }
        
      } catch (error) {
        console.error(error)
      }finally{
        setLoading(false)
      }
    }

       useEffect(()=>{
        if(isLogin){
        getMyCart()
       }
    },[isLogin])


   
    const AddToCart=async({product})=>{
      try {
        setLoadingProductId(product)
         const res=await api.post("/cart/addtocart",{product:product})
        toast({title: "Add product to cart",
              description: res.data?.msg || "Product added to cart successfully.",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top"})
        await getMyCart()

      } catch (error) {
        toast({title: "Add product to cart failed",
              description: error.response?.data || "Something went wrong.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top"})
        console.error(error)
      }finally{
       setLoadingProductId(null)
      }
    }

    const editCart=async({id,quantity})=>{
      try {
        setLoadingProductId(id)
         const res=await api.patch(`/cart/editOrders/${id}`,{quantity:quantity})
        toast({title: "Edit product quantity to cart",
              description: res.data?.msg || "Order updated successfully.",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top"})
        await getMyCart()

      } catch (error) {
        toast({title: "Edit product quantity to cart failed",
              description: error.response?.data || "Something went wrong.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top"})
        console.error(error)
      }finally{
        setLoadingProductId(null)
      }
    }
    const deleteCart=async({id})=>{
      try {
        setLoadingProductId(id)
         const res=await api.delete(`/cart/deleteOrders/${id}`)
        toast({title: "delete product from cart",
              description: res.data?.msg || "Order delete from cart successfully.",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top"})
        await getMyCart()

      } catch (error) {
        toast({title: "Product delete from cart failed",
              description: error.response?.data || "Something went wrong.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top"})
        console.error(error)
      }finally{
        setLoadingProductId(null)
      }
    }
   

  return (
    <CartContext.Provider value={{loading,loadingProductId , MyCarts,getMyCart,AddToCart,editCart,deleteCart}}>{children}</CartContext.Provider>
  );
}

export default CartContextProvider;