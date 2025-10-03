import React, { useContext, useState } from "react";
import { Box,FormLabel,Input,Button,useToast,useColorModeValue,Heading} from "@chakra-ui/react"
import api from "../services/api"
import { AuthContext } from "../contex/AuthContextProvider";
import { ProductContext } from "../contex/ProductContextProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const {setIsLogin}=useContext(AuthContext)
  const {resetFilter}=useContext(ProductContext)
  const tost=useToast()
  const bgColor = useColorModeValue("white", "gray.800");
const [form,setForm]=useState({phone:"",pass:""})
const navigate=useNavigate()
  const handleChange=(e)=>{
 const {name,value}=e.target
setForm({...form,[name]:value})

  }
 
 const handleSubmit=async()=>{
  try {
    
       const res=await api.post("/users/login",form)
       const welcomeMsg = res.data.msg; 
       const name = welcomeMsg.split(" ")[1];
       localStorage.setItem("token",res.data.token)
       localStorage.setItem("userName",name)
       setIsLogin(true)
       resetFilter()
       tost({
        title:"Login Successful",
        description:res.data.msg,
        status:"success",
        duration:3000,
        isClosable:true,
        position: "top"

       })
        navigate("/")
        window.scrollTo({ top: 0, behavior: "smooth" })
      
  } catch (error) {
    tost({title: "Login Failed",
      description: error.response?.data || "Something went wrong.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",})
  }
      
  }

  return (
    <>
    <Box maxW="md" mx="auto" mt="50px" p="6" borderWidth="1px" borderRadius="lg"  bg={bgColor}>
     <Heading textAlign='center'>LogIn</Heading>
     <FormLabel>Phone Number</FormLabel>
     <Input type="text" name="phone" onChange={handleChange} placeholder="Enter Phone Number" required/>
     <FormLabel>Password</FormLabel>
     <Input type="password" name="pass" onChange={handleChange} placeholder="Enter Password" required/>
     <Button mt="4" _hover={{bg:"cyan.600",fontWeight:"bold"}} colorScheme="teal" type="submit"
     isDisabled={!form.phone||!form.pass}
     onClick={handleSubmit}
     >Submit</Button>
    </Box>
    </>
  );
}

export default Login;