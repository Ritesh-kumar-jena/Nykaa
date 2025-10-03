import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contex/ProductContextProvider";
import {
  Box,
  Grid,
  Image,
  Text,
  Stack,
  Badge,
  Button,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react"
import { AuthContext } from "../contex/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contex/CartContextProvider";

function Wishlist() {
   const { products, loading } = useContext(ProductContext);
   const {loadingProductId,AddToCart}=useContext(CartContext)
   const {userId,isAdmin,isLogin,setLoginOpen}=useContext(AuthContext)
   const priceclr=useColorModeValue("gray.600", "gray.300")
   const amountclr=useColorModeValue("black", "white")
   const badgeBg=useColorModeValue("pink.100", "pink.600")
   const badgeColor=useColorModeValue("pink.800", "pink.100")
   const userid=userId?userId:"guest"
   const [wishlist, setWishlist] = useState([]);
   const navigate=useNavigate()
   const toast=useToast()

  useEffect(() => {

    const stored = localStorage.getItem(`favourites_${userid}`);
    const ids = stored ? JSON.parse(stored) : [];
    const favProducts = products.filter((p) => ids.includes(p._id));
    setWishlist(favProducts);
  }, [userId, products])

    if (loading) {
        return (
          <Box textAlign="center" mt="50px">
            <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />
            <Text mt="4">Loading products...</Text>
          </Box>
        )
      }
  return (
    <>
     <Box p={6}>
          
           <Grid
             templateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }}
             gap={6}
           >
             {wishlist && wishlist.length > 0 ? (
                wishlist.map((item) => (
                 <Box
                   key={item._id}
                   borderWidth="1px"
                   borderRadius="lg"
                   overflow="hidden"
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
                   <Stack mt={4} spacing={2}>
                     <Text fontWeight={{ base: "normal", md: "bold" }} fontSize="lg">
                       {item.name}
                     </Text>
                     <Text fontSize="md" color={priceclr}>
                      MRP: <Box as="span" color={amountclr} fontWeight="bold">₹ {item.price}</Box>
                     </Text>
                     <Button 
                     colorScheme="pink" 
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
                      position: "top",})
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
    </>
  );
}

export default Wishlist;