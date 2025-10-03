import React, { useContext, useEffect, useState } from "react";
import api from "../services/api";
import { Box,Spinner,Text,Button,Flex,Image,Stack,NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,useColorModeValue,IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons"
import { CartContext } from "../contex/CartContextProvider";
import { useNavigate } from "react-router-dom";



function Cart() {
  const {loading,loadingProductId, MyCarts,editCart,deleteCart}=useContext(CartContext)

  const navigate=useNavigate()

  const priceclr=useColorModeValue("gray.800", "gray.300")
  const amountclr=useColorModeValue("black", "white")
  const cartbtn=useColorModeValue("pink.400", "pink.500")

     if (loading) {
        return (
          <Box textAlign="center" mt="50px">
            <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />
            <Text mt="4">Loading products...</Text>
          </Box>
        );
      }
      if (!MyCarts || MyCarts.length === 0) {
    return (
      <Box textAlign="center" mt="50px">
        <Text fontSize="lg" fontWeight="bold">
          Your cart is empty 🛒
        </Text>
      </Box>
    );
  }

  const grandTotal = MyCarts.reduce((sum, item) => sum + (item.productTotalPrice || 0), 0)

  return (
    <>
      <Box maxW="800px" mx="auto" mt="6" p="4">
      <Stack spacing={6}>
        {MyCarts.map((item) => (
          <Flex
            key={item._id}
            p="4"
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            align="center"
            justify="space-between"
            direction={{ base: "column", md: "row" }}
          >
            {/* Product Info */}
            <Flex align="center"  gap="4">
              <Image
                src={item.product.image || "https://via.placeholder.com/100"}
                alt={item.product.name}
                boxSize="80px"
                objectFit="cover"
                borderRadius="md"
                direction={{ base: "column", md: "row" }}
                textAlign={{ base: "center", md: "left" }}
              />
              <Box>
                <Text fontWeight="bold">{item.product.name}</Text>
                <Text fontSize="sm" color={priceclr} pt={1} >
                  Price: <Box as="span" color={amountclr} fontWeight="bold">₹{item.product.price}</Box>
                </Text>
              </Box>
            </Flex>

            {/* Quantity Edit */}
            <Flex direction="column" align="flex-end" gap="2" flex="1" mt={{base: 5, md: 0}}>
              <Flex gap="2">
                <NumberInput
                    size="sm"
                    minW="70px"
                    maxW={20}
                    min={1}
                    max={10}
                    value={item.quantity}
                    onChange={(valueString, valueNumber) =>
                    editCart({ id: item._id, quantity: valueNumber })
                    }
                    isDisabled={loadingProductId === item._id}
                >
                <NumberInputField readOnly pointerEvents="none"/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
               </NumberInputStepper>
              </NumberInput>
              
              
              <IconButton
              aria-label="Delete item"
              icon={<DeleteIcon />}
              colorScheme="red"
              size="sm"
              onClick={() => deleteCart({ id: item._id })}
              isLoading={loadingProductId === item._id}
            />
            </Flex>
               <Text fontSize="md"  mt="2" color={priceclr}>
                Total: <Box as="span" color={amountclr} fontWeight="bold">₹{item.productTotalPrice}</Box>
              </Text>
            </Flex>
           
          </Flex>
          
        ))}
      </Stack>
      <Flex justify="space-between" mt="6">
        <Text fontSize="xl" fontWeight="bold" >
          Grand Total: ₹{grandTotal}
        </Text>
        <Button 
        bg={cartbtn} 
        size={{base:"sm",md:"md"}} 
        onClick={()=>{
          navigate("/billing")
           window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          >
            {`Proceed -->`}
            </Button>
      </Flex>
    </Box>
    </>
  );
}

export default Cart;