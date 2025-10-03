import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contex/ProductContextProvider";
import {FaHeart,FaRegHeart} from "react-icons/fa"
import {
  Box,
  Grid,
  Image,
  Text,
  Stack,
  Badge,
  Button,
  Spinner,
  IconButton,
  useToast
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react"
import { AuthContext } from "../contex/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contex/CartContextProvider";

function Home() {
  const { loading,filteredProducts } = useContext(ProductContext);
  const {loadingProductId,AddToCart}=useContext(CartContext)
  const {userId,isAdmin,isLogin,setLoginOpen}=useContext(AuthContext)
  const navigate=useNavigate()
  const toast=useToast()

  const priceclr=useColorModeValue("gray.600", "gray.300")
  const amountclr=useColorModeValue("black", "white")
  const badgeBg = useColorModeValue("pink.100", "pink.600");
  const badgeColor = useColorModeValue("pink.800", "pink.100")
  const cartbtn=useColorModeValue("pink.400", "pink.500")


  const userid=userId?userId:"guest"
  const [favourites, setFavourites] = useState(() => {
  const stored = localStorage.getItem(`favourites_${userid}`);
  return stored ? JSON.parse(stored) : [];
})

  useEffect(()=>{
     const stored = localStorage.getItem(`favourites_${userid}`);
     setFavourites(stored ? JSON.parse(stored) : []);
    
  },[userid])
  const toggleFavourite = (id) => {
  let updated = [];

  if (favourites.includes(id)) {
    updated = favourites.filter((favId) => favId !== id);
  } else {
    updated = [...favourites, id];
  }

  setFavourites(updated);
  localStorage.setItem(`favourites_${userid}`, JSON.stringify(updated));
}
  if (loading) {
    return (
      <Box textAlign="center" mt="50px">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />
        <Text mt="4">Loading products...</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
       <Box mb={6} textAlign="center">
        <Image
          src="https://res.cloudinary.com/dy9gltg7s/image/upload/v1753187503/fbe99f16-a128-453b-be4d-b0767eef53f6_ldnzhi.gif" 
          alt="Featured Products"
          w="100%"
          h={{ base: "150px", md: "250px", lg: "350px" }}
          objectFit="cover"
          borderRadius="md"
          mb={6}
        />
      </Box>


      <Grid
        templateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }}
        gap={6}
      >
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Box
              key={item._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              p={4}
              _hover={{ boxShadow: "lg" }}
              position="relative"
              onClick={()=>{
                navigate(`/product/${item._id}`)
                window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            >
              <Image
                src={item.image}
                alt={item.name}
                objectFit="contain"
                w="100%"
                h="200px"
                borderRadius="md"
              />
            <Box position="absolute" top="4" left="4" display={{base:"none", md:"block"}}>
               <Badge bg={badgeBg} color={badgeColor} w="fit-content">
                  {item.category}
                </Badge>
            </Box>
            <Box position="absolute" top="4" right={{base:"1",md:"4"}}>
               <IconButton
                  aria-label="Add to favourites"
                  icon={
                    favourites.includes(item._id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )
                  }
                  fontSize={{base:"xl" , md:"2xl"}}
                  color="red.500"
                  variant="ghost"
                  _hover={{ transform: "scale(1.1)" }}
                   bg="transparent"
                   border="none"
                  _active={{ bg: "transparent" }}
                  _focus={{ boxShadow: "none", outline: "none" }} 
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavourite(item._id)
                  }}
                />
            </Box>
              <Stack mt={4} spacing={2}>
                <Text fontWeight={{ base: "normal", md: "bold" }} fontSize="lg">
                  {item.name}
                </Text>
                <Text fontSize="md" color={priceclr}>
                 MRP: <Box as="span" color={amountclr} fontWeight="bold">₹ {item.price}</Box>
                </Text>
                <Button 
                bg={cartbtn} 
                size="sm" 
                borderRadius="md" 
                w="fit-content" 
                alignSelf="center" 
                onClick={(e)=>{
                  e.stopPropagation()
                   if(isLogin){
                     AddToCart({product:item._id})
                   }else{
                     setLoginOpen(true)
                     toast({title: "Please Login first",
                     description: "User not Login.",
                     status: "warning",
                     duration: 3000,
                     isClosable: true,
                    position: "top"
                    })
                    window.scrollTo({ top: 0, behavior: "smooth" })
                 }
            
                }}
                isDisabled={isAdmin}
                isLoading={loadingProductId === item._id}
                >
                  Add to Cart
                </Button>
              </Stack>
            </Box>
          ))
        ) : (
          <Text>No products available.</Text>
        )}
      </Grid>
    </Box>
  );
}

export default Home;
