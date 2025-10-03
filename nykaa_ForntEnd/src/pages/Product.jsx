import React, { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contex/ProductContextProvider";
import { Box,Spinner,Text,Image,Stack,Badge,Flex,Button,useColorModeValue, useToast } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { AuthContext } from "../contex/AuthContextProvider";
import { CartContext } from "../contex/CartContextProvider";

function Product() {

    const {id}=useParams()
    const {loading,products}=useContext(ProductContext)

    const {loadingProductId,AddToCart}=useContext(CartContext)
      const {isAdmin,isLogin,setLoginOpen}=useContext(AuthContext)
      const toast=useToast()

    const priceClr = useColorModeValue("gray.600", "gray.300");
    const amountClr = useColorModeValue("black", "white");
    const borderClr = useColorModeValue("gray.200", "gray.600")

    const product=products.find((p) => p._id === id)
   
    const randomRating = useMemo(() => Math.floor(Math.random() * 3) + 3, []) 
  const totalStars = 5
    if (loading) {
        return (
          <Box textAlign="center" mt="50px">
            <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />
            <Text mt="4">Loading products...</Text>
          </Box>
        );
      }
  return (
    <>
     <Flex
      direction={{ base: "column", md: "row" }}
      gap={8}
      p={8}
      maxW="1000px"
      mx="auto"
    >
      {/* Product Image */}
      <Box
       flex="1" 
       borderRightWidth={{ base: 0, md: 2 }}
       borderBottomWidth={{ base: 2, md: 0 }}
       borderStyle="solid"
       borderColor={borderClr}
       >
        <Image
          src={product.image}
          alt={product.name}
          objectFit="contain"
          w="100%"
          h={{ base: "250px", md: "400px" }}
          borderRadius="md"
        />
      </Box>

      {/* Product Details */}
      <Stack flex="1" spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          {product.name}
        </Text>

        <Badge
          w="fit-content"
          bg={useColorModeValue("pink.100", "pink.600")}
          color={useColorModeValue("pink.800", "pink.100")}
          fontSize="sm"
        >
          {product.category}
        </Badge>

        <Text fontSize="lg" color={priceClr}>
          MRP:{" "}
          <Box as="span" color={amountClr} fontWeight="bold">
            ₹ {product.price}
          </Box>
        </Text>

        <Flex align="center">
          {[...Array(totalStars)].map((_, i) => (
            <StarIcon
              key={i}
              color={i < randomRating ? "yellow.400" : "gray.300"}
              boxSize={5}
            />
          ))}
          <Text ml={2} fontSize="sm" color={priceClr}>
            {randomRating} out of {totalStars}
          </Text>
        </Flex>

        <Button 
        colorScheme="pink" 
        size="lg" 
        w="fit-content"
        onClick={(e)=>{
                  e.stopPropagation()
                   if(isLogin){
                     AddToCart({product:product._id})
                   }else{
                     setLoginOpen(true)
                     toast({title: "Please Login first",
                     description: "User not Login.",
                     status: "warning",
                     duration: 3000,
                     isClosable: true,
                    position: "top",})
                    window.scrollTo({ top: 0, behavior: "smooth" })
                 }
            
                }}
                isDisabled={isAdmin}
                isLoading={loadingProductId === product._id}
        >
          Add to Cart
        </Button>
      </Stack>
    </Flex>
    </>
  );
}

export default Product;