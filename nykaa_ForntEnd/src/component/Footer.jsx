import {
  Box,
  Flex,
  Stack,
  Text,
  Link,
  Divider,
  Grid
} from "@chakra-ui/react";
import { useContext } from "react";
import { ProductContext } from "../contex/ProductContextProvider";
import { useNavigate } from "react-router-dom";





export default function Footer() {
  const {filterByCategory,resetFilter}=useContext(ProductContext)
  const navigate=useNavigate()

  const backToHome=()=>{
  resetFilter()
   navigate("/")
   window.scrollTo({ top: 0, behavior: "smooth" }) 
  }

  return (
    <Box bg="gray.500" borderTop="1px solid" w="100vw"  borderColor="gray.200" mt={10} pr={{ base: "5%", md: "5%", lg: "10%" }}  pl={{ base: "5%", md: "5%", lg: "10%" }} pt={{base:"5" ,md:"0"}}>
      {/* Top Footer: Links */}
      <Grid
  templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
  gap={{base: "5", md: "10"}}
  px={10}
  py={10}
>
  {/* Column 1 */}
        <Stack spacing={2} minW={{ base: "100%", sm: "150px" }}>
          <Text fontWeight="bold" fontSize="sm" color="black">Nykaa</Text>
          <Link onClick={()=>backToHome()} fontSize="sm" color="gray.700">Who are we?</Link>
          <Link onClick={()=>backToHome()} fontSize="sm" color="gray.700">Careers</Link>
          <Link onClick={()=>backToHome()} fontSize="sm" color="gray.700">Authenticity</Link>
          <Link onClick={()=>backToHome()} fontSize="sm" color="gray.700">Press</Link>
        </Stack>

        {/* Column 2 */}
        <Stack spacing={2} minW={{ base: "100%", sm: "150px" }}>
          <Text fontWeight="bold" fontSize="sm" color="black">Help</Text>
          <Link 
          onClick={()=>{
            navigate("/contactUs")
            window.scrollTo({ top: 0, behavior: "smooth" })}} 
          fontSize="sm" 
          color="gray.700"
          >
            Contact Us
            </Link>
          <Link onClick={()=>backToHome()} fontSize="sm" color="gray.700">FAQs</Link>
          <Link onClick={()=>backToHome()} fontSize="sm" color="gray.700">Shipping & Delivery</Link>
          <Link onClick={()=>backToHome()} fontSize="sm" color="gray.700">Returns</Link>
        </Stack>

        {/* Column 3 */}
        <Stack spacing={2} minW={{ base: "100%", sm: "150px" }}>
          <Text fontWeight="bold" fontSize="sm" color="black">Top Categories</Text>
          <Link 
          onClick={()=>{
            filterByCategory("Makeup")
            navigate("/")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }} 
          fontSize="sm" 
          color="gray.700"
          >
            Makeup
            </Link>
          <Link 
          onClick={()=>{
            filterByCategory("Skin")
            navigate("/")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          fontSize="sm" 
          color="gray.700"
          >
            Skin
          </Link>
          <Link 
          onClick={()=>{
            filterByCategory("Hair")
            navigate("/")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          fontSize="sm" 
          color="gray.700"
          >
            Hair
            </Link>
          <Link 
          onClick={()=>{
            filterByCategory("Bath & Body")
            navigate("/")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          fontSize="sm"
          color="gray.700"
          >
            Bath & Body
            </Link>
          <Link 
          onClick={()=>{
            filterByCategory("Fragrance")
            navigate("/")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          fontSize="sm" 
          color="gray.700"
          >
            Fragrance
            </Link>
        </Stack>

        {/* Column 4 */}
        <Stack spacing={2} minW={{ base: "100%", sm: "150px" }}>
          <Text fontWeight="bold" fontSize="sm" color="black">Policy</Text>
          <Link 
          onClick={()=>{
            navigate("/t&c")
            window.scrollTo({ top: 0, behavior: "smooth" })
            }} 
            fontSize="sm" 
            color="gray.700"
            >
              Terms & Conditions
              </Link>
          <Link 
          onClick={()=>{
            navigate("/PrivacyPolicy")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }} 
          fontSize="sm" 
          color="gray.700"
          >
            Privacy Policy
            </Link>
          <Link onClick={()=>backToHome()} fontSize="sm" color="gray.700">Cancellation Policy</Link>
        </Stack>
</Grid>
     

      <Divider borderColor="gray.300" mb={2}/>

      {/* Bottom Strip */}
      <Flex px={10} py={4} justify="space-between" align="center" wrap="wrap" bg="pink.400" borderRadius="20px 20px 0 0">
        <Text fontSize="sm" color="gray.700">
          © {new Date().getFullYear()} Nykaa Clone. All rights reserved.
        </Text>
        <Text fontSize="sm" color="gray.700" mt={{base:"5",md:"0"}} >
          Made with ❤️ by Ritesh
        </Text>
      </Flex>
    </Box>
  );
}
