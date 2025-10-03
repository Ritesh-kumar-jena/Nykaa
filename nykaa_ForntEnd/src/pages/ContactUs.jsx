import React, { useContext } from "react";
import { Box, Text, Stack, Button, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contex/ProductContextProvider";

export default function ContactUs() {
  const {resetFilter}=useContext(ProductContext)
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const btnColor = useColorModeValue("teal.400", "teal.500");

  return (
    <Box minH="100vh" bg={bgColor} py={10} px={{ base: 4, md: 20 }}>
      <Box
        maxW="600px"
        mx="auto"
        p={8}
        bg={cardBg}
        borderRadius="md"
        shadow="md"
        textAlign="center"
      >
        <Stack spacing={4}>
          <Text fontSize="3xl" fontWeight="bold" color={textColor}>
            Contact Us
          </Text>
          <Text fontSize="lg" color={textColor}>
            <strong>Name:</strong> Ritesh Kumar Jena
          </Text>
          <Text fontSize="lg" color={textColor}>
            <strong>Project:</strong> Nykaa Clone
          </Text>
          <Text fontSize="lg" color={textColor}>
            <strong>Email:</strong> <a style={{color: btnColor}}>jenariteshkumar85@gmail.com</a>
          </Text>
          <Text fontSize="md" color={textColor} mt={4}>
            Thank you for reviewing my project. I would greatly appreciate any feedback or suggestions—please feel free to share them via email.
          </Text>
          <Button
            mt={6}
            bg={btnColor}
            color="white"
            alignSelf="center"
            onClick={() => {
               resetFilter()
               navigate("/")
               window.scrollTo({ top: 0, behavior: "smooth" }) 
            }}
            _hover={{ bg: "teal.600" }}
          >
            Back to Home
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
