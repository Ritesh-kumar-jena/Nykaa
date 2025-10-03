import React, { useContext } from "react";
import { Box, Text, Stack, Button, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contex/ProductContextProvider";

function PrivacyPolicy() {
    const {resetFilter}=useContext(ProductContext)
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const btnColor = useColorModeValue("teal.400", "teal.500");

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={10}
      p={6}
      bg={bg}
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
    >
      <Stack spacing={6}>
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" color={textColor}>
          Privacy Policy
        </Text>

        <Text color={textColor} fontSize="md" lineHeight="tall">
          This is a clone project built for learning and portfolio purposes.
        </Text>

        <Text color={textColor} fontSize="md" lineHeight="tall">
          Users may enter any demo data for authentication, such as email, password (hashed), and optionally phone number. You are not required to provide real personal information, and no other personal data is collected or shared.
        </Text>

       <Text color={textColor} fontSize="md" lineHeight="tall">
        Payments on this site are processed in <b>demo/test mode only</b>. 
        No real transactions occur, and no actual banking or card information is stored. 
        Any data entered during checkout may be dummy or test information for demonstration purposes.
        </Text>


        <Text color={textColor} fontSize="md" lineHeight="tall">
          By using this site, you acknowledge that it is a practice project, and your data is stored only for demonstration purposes.
        </Text>

        <Button
          bg={btnColor}
          color="white"
          _hover={{ bg: btnColor + ".600" }}
          onClick={() =>{
             resetFilter()
             navigate("/")
             window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          alignSelf="center"
        >
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
}

export default PrivacyPolicy;
