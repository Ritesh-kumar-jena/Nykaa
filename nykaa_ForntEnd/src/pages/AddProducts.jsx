import React, { useState } from "react";
import { Input,Button,FormLabel,Box,useToast,Spinner } from "@chakra-ui/react";
import api from "../services/api";

function AddProducts() {
   const tost=useToast()
   const [loading,setLoading]=useState(false)
   const [form,setForm]=useState({name:"",category:"",apply:"",type:"",price:"",image:""})
   const handelChange=(e)=>{
    const {name,value}=e.target
    setForm({...form,[name]:name === "price" ? Number(value) :value})
   }

   const addProduct=async()=>{
    try {
      setLoading(true)
      const res=await api.post("/products/addProducts",form)
       tost({title: "Product Added Successfuly",
      description: res.data,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",})
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
       tost({title: "Product Not Added",
      description: error.response?.data || "Something went wrong.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",})
    }finally{
     setLoading(false)
     setForm({name:"",category:"",apply:"",type:"",price:"",image:""})
    }
   }

   return (
    <>
     <Box maxW="md" mx="auto" mt="50px" p="6" borderWidth="1px" borderRadius="lg">
      <FormLabel>Product Name</FormLabel>
      <Input value={form.name} onChange={handelChange} name="name"/>

      <FormLabel>Product category</FormLabel>
      <Input value={form.category} onChange={handelChange} name="category"/>

      <FormLabel>Product Apply For</FormLabel>
      <Input value={form.apply} onChange={handelChange} name="apply"/>

      <FormLabel>Product Type</FormLabel>
      <Input value={form.type} onChange={handelChange} name="type"/>

      <FormLabel>Product Price</FormLabel>
      <Input value={form.price} type="number" onChange={handelChange} name="price"/>

      <FormLabel>Product Image</FormLabel>
      <Input value={form.image} onChange={handelChange} name="image"/>

      {loading&&<Spinner size="md" mt={4}/>}

      <Button mt="4" colorScheme="teal" onClick={addProduct} 
      isDisabled={!form.name || !form.category || !form.apply || !form.type || !form.price|| !form.image}>Submit</Button>
     </Box>
    </>
  );
}

export default AddProducts;