import React, { useContext } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contex/ProductContextProvider";

function NotFoundPage() {
  const {resetFilter}=useContext(ProductContext)
    const navigate=useNavigate()
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mb={4}>
        404 - Page Not Found
      </Heading>
      <Text mb={6}>Oops! The page you’re looking for does not exist.</Text>
      <Button
        onClick={()=>{
          resetFilter()
          navigate("/")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;
