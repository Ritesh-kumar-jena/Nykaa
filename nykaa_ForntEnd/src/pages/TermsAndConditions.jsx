import React, { useContext } from "react";
import { Box, Text, Heading, Stack, Button, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contex/ProductContextProvider";

export default function TermsAndConditions() {
    const {resetFilter}=useContext(ProductContext)
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.50", "gray.700");
    const textColor = useColorModeValue("gray.800", "gray.100");
    const btnColor = useColorModeValue("teal.400", "teal.500")

  return (
    <Box maxW="600px" mx="auto" mt={10} p={6} borderRadius="md" boxShadow="md" bg={bg} textAlign="center">
      <Heading mb={4} textAlign="center">Terms & Conditions</Heading>
      <Stack spacing={4}>
        <Text>
          This is a clone project for learning and portfolio purposes. All products,
          images, and content are used for demonstration only.
        </Text>
        
        <Text>
          This project includes a simulated payment process to showcase functionality. 
          All transactions are test-only. 
         Users are not required to enter real payment details, and no real money will ever be charged.
        </Text>

        <Text>
          By using this site, you agree that it is solely for educational purposes
          and no liability is assumed by the creator.
        </Text>
      </Stack>
      <Button
        mt={6}
        colorScheme="teal"
        display="block"
        mx="auto"
        onClick={() => {
           resetFilter()
           navigate("/")
           window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        color={textColor}
        bg={btnColor}
      >
        Back to Home
      </Button>
    </Box>
  );
}
