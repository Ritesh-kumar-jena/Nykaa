import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Spinner,
  Flex,
  Stack,
  Badge,
  Divider,
  useColorModeValue,
  Image,
  HStack
} from "@chakra-ui/react";
import { AuthContext } from "../contex/AuthContextProvider";
import api from "../services/api";

function Orders() {
  const { isAdmin } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const borderClr = useColorModeValue("gray.200", "gray.600");
  const adressAndDateClr = useColorModeValue("gray.600", "gray.200")
  const userInfoBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const endpoint = isAdmin ? "/orders/allOrders" : "/orders/myOrders";
        const res = await api.get(endpoint);
        const data = isAdmin ? res.data.Orders : res.data.myOrders;
        setOrders(data || []);
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAdmin]);

  if (loading) {
    return (
      <Box textAlign="center" mt="50px">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />
        <Text mt="4">Loading orders...</Text>
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box textAlign="center" mt="50px">
        <Text fontSize="lg" color={adressAndDateClr}>
          {isAdmin
            ? "No orders found."
            : "You don’t have any orders yet. Place your first order!"}
        </Text>
      </Box>
    );
  }

  return (
    <Box maxW="1000px" mx="auto" p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        {isAdmin ? "All Orders" : "My Orders"}
      </Text>

      <Stack spacing={6}>
        {orders.map((order) => (
          <Box
            key={order._id}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            borderColor={borderClr}
            shadow="sm"
            transition="all 0.2s"
            _hover={{ transform: "scale(1.02)", shadow: "md" }}
          >
            <Flex justify="space-between" mb={2}>
              <Text fontWeight="bold">Order ID: {order._id}</Text>
              <Badge
                colorScheme={
                  order.status === "pending"
                    ? "yellow"
                    : order.status === "confirmed"
                    ? "blue"
                    : order.status === "shipped"
                    ? "purple"
                    : order.status === "delivered"
                    ? "green"
                    : "red"
                }
              >
                {order.status}
              </Badge>
            </Flex>

            <Text fontSize="sm" color={adressAndDateClr} mb={2}>
              Date: {new Date(order.createdAt).toLocaleString()}
            </Text>

            <Divider mb={2} />

            {isAdmin && order.user && (
              <Box
                bg={userInfoBg}
                p={3}
                borderRadius="md"
                mb={3}
                borderWidth="1px"
                borderColor={borderClr}
              >
                <Text fontWeight="semibold" mb={1}>
                  User Info
                </Text>
                <Text fontSize="sm">Name: {order.user.name}</Text>
                <Text fontSize="sm">Email: {order.user.email}</Text>
                <Text fontSize="sm">Phone: {order.user.phone}</Text>
              </Box>
            )}

            <Stack spacing={2} mb={3}>
              {order.items.map((item) => (
                <Flex 
                key={item._id}
                justify="space-between"
                align="center"
                py={2}
                borderBottom="1px solid"
                borderColor="gray.100"
                direction={{ base: "column", sm: "row" }}
                alignItems={{ base: "flex-start", sm: "center" }}
                > 
                <HStack spacing={3} flex="1"> 
                  <Image 
                  src={item.product?.image}
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="md"
                  />
                <Box>
                  <Text fontWeight="medium">{item.product?.name}</Text>
                  <Text fontSize="sm" color={adressAndDateClr}> 
                    Qty: {item.quantity}
                 </Text>
                </Box>
               </HStack>

   
                  <Text fontWeight="semibold" mt={{ base: 2, sm: 0 }}> 
                    ₹{item.product?.price * item.quantity}
                  </Text>
              </Flex>
             ))}
            </Stack>

            <Divider mb={2} />

            <Flex justify="space-between" align="center">
              <Text fontWeight="bold">
                Total: ₹ {order.totalOrderPrice}
              </Text>
              <Text fontSize="sm" color={adressAndDateClr}>
                Address: {order.address}
              </Text>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default Orders;
