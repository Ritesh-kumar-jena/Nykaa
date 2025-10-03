import React, { useEffect, useState } from "react";
import { createContext } from "react";
import api from "../services/api";
import { useToast } from "@chakra-ui/react";


export const ProductContext=createContext()

function ProductContextProvider({children}) {
    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(true)
     const [filteredProducts, setFilteredProducts] = useState([])
     const toast=useToast()
    const getAllProducts=async()=>{
      try {
        const res=await api.get("/products/allProducts")
        setProducts(res.data.products)
        setFilteredProducts(res.data.products)
      } catch (error) {
        console.error(error)
      }finally{
        setLoading(false)
      }
    }
    useEffect(()=>{
      getAllProducts()
    },[])

    const filterByCategory = (category) => {
    if (!category) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => p.category === category);
      setFilteredProducts(filtered);
    }
  }

  const filterByType = (type) => {
    if (!type) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => p.type === type);
      setFilteredProducts(filtered);
    }
  };

  const resetFilter = () => setFilteredProducts(products)

  const search=async(query)=>{
    try {
      setLoading(true)
      const res=await api.get(`/products/searchProduct?q=${query}`)
      const data=res.data
      if(typeof(data)==="string"){
        setFilteredProducts([])
         toast({title: "product search failed",
              description:data,
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top"})
        
      }else{
        setFilteredProducts(data||[])
      }
      
    } catch (error) {
       toast({title: "product search failed",
              description: error.response?.data || "Something went wrong.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top"})
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <ProductContext.Provider value={{loading , products,filteredProducts,filterByCategory,filterByType,resetFilter,search}}>{children}</ProductContext.Provider>
  );
}

export default ProductContextProvider;