import React, { useContext, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Stack,
  Image,
  Input,
  Button,
  useColorModeValue,
  Divider,
  useToast,
  Radio,
  RadioGroup,
  Stack as RadioStack,
} from "@chakra-ui/react";
import { CartContext } from "../contex/CartContextProvider";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contex/ProductContextProvider";

function Billing() {
  const { MyCarts,getMyCart } = useContext(CartContext);
  const {resetFilter}=useContext(ProductContext)
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("")
  const [orderAdded,setOrderAdded]=useState(false)
  const borderClr = useColorModeValue("gray.200", "gray.600");
  const priceclr = useColorModeValue("gray.800", "gray.300");
  const amountclr = useColorModeValue("black", "white");
  const btnClr = useColorModeValue("teal.400", "teal.500");
  const textColor = useColorModeValue("gray.800", "gray.100")
  const toast =useToast()
  const navigate=useNavigate()

  const grandTotal = MyCarts.reduce(
    (sum, item) => sum + (item.productTotalPrice || 0),
    0
  );

  const handlePlaceOrder = async() => {
    if (!address) {
    toast({
      title: "Address required",
      description: "Please enter your delivery address before placing the order.",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    return;
  }
  if (paymentMethod==="") {
    toast({
      title: "Payment required",
      description: "Please select a payment method to proceed.",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    return;
  }

   try {
    setOrderAdded(true)
    await api.post("/orders/addOrders",{address:address})
    toast({
        title:"Order Placed Successfully",
        description:`Your payment of ₹${grandTotal} via ${paymentMethod} is successful!`,
        status:"success",
        duration:3000,
        isClosable:true,
        position: "top"
       })
   await getMyCart()
   resetFilter()
   navigate("/")
    window.scrollTo({ top: 0, behavior: "smooth" })
   } catch (error) {
    toast({
      title: "Order not added.",
      description: error.response?.data || "Something went wrong.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top"
  })
   }finally{
    setOrderAdded(false)
   }
  };

  return (
    <Box maxW="800px" mx="auto" mt="6" p="4">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Billing Details
      </Text>

      <Stack spacing={4}>
        {MyCarts.map((item) => (
          <Flex
            key={item._id}
            p="4"
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            justify="space-between"
            direction={{ base: "column", md: "row" }}
          >
            <Flex align="center" gap="4">
              <Image
                src={item.product.image}
                alt={item.product.name}
                boxSize="60px"
                objectFit="cover"
                borderRadius="md"
              />
              <Box>
                <Text fontWeight="bold">{item.product.name}</Text>
                <Text fontSize="sm" color={priceclr}>
                  Price: ₹{item.product.price} × {item.quantity}
                </Text>
              </Box>
            </Flex>
            <Text fontWeight="bold" mt={{ base: 2, md: 0 }}>
              ₹{item.productTotalPrice}
            </Text>
          </Flex>
        ))}
      </Stack>

      <Divider my={4} borderColor={borderClr} />

      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold" color={amountclr}>
          Grand Total: ₹{grandTotal}
        </Text>
      </Flex>

      <Box mb={4}>
        <Text mb={2} fontWeight="semibold">
          Delivery Address
        </Text>
        <Input
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Box>
      <Box mb={4}>
      <Text fontWeight="bold" mb={2} color={textColor}>
              Choose Payment Method:
            </Text>
            <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
              <RadioStack direction="row" spacing={4}>
                <Radio value="Card">Card</Radio>
                <Radio value="UPI">UPI</Radio>
                <Radio value="Wallet">Wallet</Radio>
                <Radio value="COD">Cash on Delivery</Radio>
              </RadioStack>
            </RadioGroup>
      
            {paymentMethod === "Card" && (
              <Stack mt={4} spacing={3}>
                <Input placeholder="Card Number (Demo)" maxLength={16} />
                <Flex gap={2}>
                  <Input placeholder="Expiry MM/YY (Demo)" />
                  <Input placeholder="CVV (Demo)" maxLength={3} />
                </Flex>
                <Input placeholder="Name on Card (Demo)" />
              </Stack>
            )}
      
            {paymentMethod === "UPI" && (
              <Input mt={4} placeholder="Enter UPI ID (Demo)" />
            )}
      
            {paymentMethod === "Wallet" && (
              <Input mt={4} placeholder="Enter Wallet ID (Demo)" />
            )}
      </Box>
      <Button bg={btnClr} color="white" onClick={handlePlaceOrder}  isLoading={orderAdded} >
        Place Order and Pay ₹{grandTotal}
      </Button>
    </Box>
  );
}

export default Billing;
