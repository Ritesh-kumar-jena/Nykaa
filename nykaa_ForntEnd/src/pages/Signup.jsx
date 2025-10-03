import React, { useState } from "react";
import { Box, Input, Button, FormLabel, Select, useToast,Heading } from "@chakra-ui/react";
import api from "../services/api";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function Signup({ switchToLogin }) {
  const naviget=useNavigate()
  const tost=useToast()
  const [form,setForm]=useState({name:"",email:"",pass:"",role:"buyer",phone:""})
  const handleChange=(e)=>{
  const {name,value}=e.target;
  setForm({...form,[name]:value})
  }
  const handleSignup=async()=>{
    try {
      const res=await api.post("/users/signIn",form)
      tost({
        title:"Signup Successful",
        description:res.data,
        status:"success",
        duration:3000,
        isClosable:true,
        position: "top",
      })
      switchToLogin()
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      tost({title: "Signup Failed",
      description: error.response?.data || "Something went wrong.",
      status: "error",
      duration: 3000,
      isClosable: true,
    position: "top",})
    }
  }
  return (
    <Box maxW="md" mx="auto" mt="50px" p="6" borderWidth="1px" borderRadius="lg">
      <Heading textAlign="center">SignIn</Heading>
      <FormLabel>Name</FormLabel>
      <Input name="name" onChange={handleChange} />

      <FormLabel>Email</FormLabel>
      <Input name="email" onChange={handleChange} />

      <FormLabel>Password</FormLabel>
      <Input name="pass" type="password" onChange={handleChange} />

      <FormLabel>Phone</FormLabel>
      <Input name="phone" onChange={handleChange} />

      <FormLabel>Role</FormLabel>
      <Select name="role" onChange={handleChange}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </Select>

      <Button mt="4" colorScheme="teal" onClick={handleSignup} 
      isDisabled={!form.name || !form.email || !form.pass || !form.phone }
      >Sign Up</Button>
      
      <Text fontWeight="bold" color="gray.600" mb="2"><u>If already have account</u></Text>
      <Button onClick={switchToLogin}  colorScheme="teal" _hover={{bg:"cyan.600",fontWeight:"bold"}}
      >Login</Button>
    </Box>
  );
}

export default Signup;