import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Image,Flex,Input,InputGroup,InputLeftElement,IconButton,useBreakpointValue,Text,
    Popover,PopoverTrigger,PopoverContent,PopoverArrow,PopoverCloseButton,PopoverBody,useToast,List,ListItem} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FiShoppingBag } from "react-icons/fi"
import { DarkMode } from "./DarkMode";
import { useColorModeValue } from "@chakra-ui/react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductCatagory from "./navComponents/ProductCatagory";
import { AuthContext } from "../contex/AuthContextProvider";
import { ProductContext } from "../contex/ProductContextProvider";
import api from "../services/api";



function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}



function Navbar() {
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const {isLogin,setIsLogin,isAdmin,setUserId,isLoginOpen,setLoginOpen}=useContext(AuthContext)
  const {resetFilter,search}=useContext(ProductContext)

  const debouncedQuery=useDebounce(query,700)

  const navigate=useNavigate()
  const tost=useToast()
  const isMobileOrTablet = useBreakpointValue({ base: true, md: true, lg: false });
  

  const wishlistbg=useColorModeValue("pink.300", "pink.400")
  const bgColor = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.100", "gray.500");
  const inputFocusBg = useColorModeValue("white", "gray.600");
  const placeholderColor = useColorModeValue("gray.400", "gray.300");
  const borderClr = useColorModeValue("gray.200", "gray.600");
  const iconClr = useColorModeValue("gray.400", "gray.300");
  const textclr=useColorModeValue("gray.600", "white")

  useEffect(() => {
    const fetchSuggestions = async () => {
    if (debouncedQuery.trim() === "") {
      setSuggestions([]);
      return;
    }
    try {
      const res = await api.get(`/products/searchProduct?q=${debouncedQuery}`);
      const data = res.data;
      if (typeof data === "string" || data.length<2) {
        setSuggestions([]);
      } else {
        setSuggestions(data || []);
      }
    } catch (error) {
     tost({title: "product search failed",
              description: error.response?.data || "Something went wrong.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",})
      setSuggestions([]);
    }
  };

  fetchSuggestions();
  }, [debouncedQuery])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      tost({
        title: "Please enter your query.",
        description: "Search box cannot be empty.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
         search(trimmedQuery)
         setQuery("")
         setSuggestions([])
         window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }
  
  const handleSelect = (item) => {
    setSuggestions([]);
    setQuery("")
    navigate(`/product/${item._id}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handelLogout=async()=>{
      try {
         setIsLogin(false)
         setUserId(null) 
         localStorage.removeItem("token")
         localStorage.removeItem("userName")
         resetFilter()
            tost({
             title:"Logout Successful",
             description:"You are Logout Successfully",
             status:"success",
             duration:3000,
             isClosable:true,
             position: "top",
     
            })
            navigate("/")
            window.scrollTo({ top: 0, behavior: "smooth" })
       } catch (error) {
         tost({title: "Logout Failed",
           description: error.response?.data || "Something went wrong.",
           status: "error",
           duration: 3000,
           isClosable: true,
           position: "top",})
       }

  }
  return (

    // For sml screen

    <>

      <Box
       as="nav"
       position="sticky"
       top="0"
       left="0"
       width="100%"
       zIndex="1100"
   >
     {isMobileOrTablet?(
      <>
      
      <Box bg={bgColor} w="100%" px={4} py={2}  borderBottom="1px solid" borderColor={borderClr}>
    <Flex align="center" justify={{base:"space-between",sm:"space-around"}} wrap="wrap" gap={3} minW="max-content" mb="20px">
      
      {/* Logo */}
     <Image 
            src="https://res.cloudinary.com/dy9gltg7s/image/upload/v1754039570/Screenshot_2025-07-22_192704_n2cbsn.png"
            alt="Logo"
            height="30px"
            cursor="pointer"
            onClick={()=>{
              resetFilter()
              navigate("/")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
         />

      {/* Search Input */}
      <Box position="relative">
        <InputGroup maxW={{ base: "120px", sm: "160px",md:"250px" }}>
        <InputLeftElement pointerEvents="none" children={<SearchIcon color={iconClr}/>}/>
               <Input
                 type="text"
                 size="sm"
                 placeholder="Search On Nykaa"
                 bg={inputBg}
                 _placeholder={{ color: placeholderColor }}
                 border="none"
                 _focus={{ bg: inputFocusBg, border: "1px solid pink" }}
                 value={query}
                 onChange={handleChange}   
                 onKeyDown={handleKeyDown}
               />
      </InputGroup>
      
      {/* suggestion box */}
      {suggestions.length > 0 && (
        <Box
          position="absolute"
          
          top="100%"
          left={0}
          bg={bgColor}
          border="1px solid #ddd"
          borderRadius="md"
          shadow="md"
          zIndex="1000"
          w="250px"
        >
          <List spacing={1}>
            {suggestions.map((item) => (
              <ListItem
                key={item._id}
                px="3"
                py="2"
                cursor="pointer"
                _hover={{ bg:wishlistbg }}
                onClick={() => handleSelect(item)}
              >
                {item.name}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      </Box>
       

      {/* Icons */}
      <Flex align="center" gap={3}>
         <DarkMode/>
        <IconButton
             icon={<FiShoppingBag />}
             variant="ghost"
             aria-label="Cart"
             fontSize="20px"
             onClick={()=>{
              if(isLogin){
               navigate("/cart")
               window.scrollTo({ top: 0, behavior: "smooth" })
            }else{
              setLoginOpen(true)
             tost({title: "Please Login first",
                description: "User not Login.",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top",})
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
            }}
        />
      </Flex>
    </Flex>
    
     {/* Auth Buttons */}
    {isLogin &&<> 
      <Text fontSize="sm" textAlign="center" color={textclr} mr="4" fontWeight="bold">
             👋 Hi, {localStorage.getItem("userName")}
            </Text>
    <Flex mt={3} gap={2} justify="center" wrap="wrap">
      {isAdmin&&<Link to="/addProduct"><Button onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })} colorScheme="pink" size="sm" borderRadius="md">ADD PRODUCT</Button></Link>}
      {!isAdmin&&<Link to="/wishlist"><Button onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })} bg={wishlistbg}   size="sm" borderRadius="md">❤️Wishlist</Button></Link>}
     <Link to="/orders"><Button onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })} bg={wishlistbg}  size="sm" borderRadius="md">Orders</Button></Link>
     <Button onClick={handelLogout} colorScheme="red" size="sm" borderRadius="md">
          Logout
        </Button>
     </Flex>
     </>}
     {!isLogin&&(<Flex w="100%" justify="center" alignItems="center" gap={4} mt={2}>
      <Link to="/wishlist"><Button onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })} bg={wishlistbg}   size="sm" borderRadius="md">❤️Wishlist</Button></Link>
           <Popover placement="bottom-end" isOpen={isSignupOpen} onClose={() => setSignupOpen(false)}>
              <PopoverTrigger>
                  <Button colorScheme="pink" size="sm" borderRadius="md" 
                     onClick={() => {
                               setSignupOpen(true);
                               setLoginOpen(false);
                               setTimeout(() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }, 0)
                     }}>
                     Sign in
                  </Button>
             </PopoverTrigger>
             <PopoverContent>
              <PopoverArrow />
               <PopoverCloseButton />
                 <PopoverBody>
                   <Signup switchToLogin={() => {
                      setSignupOpen(false);
                      setLoginOpen(true);
                      window.scrollTo({ top: 0, behavior: "smooth" })
                   }}/>
                  </PopoverBody>
                </PopoverContent>
            </Popover>
        
           <Popover placement="bottom-end" isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
              <PopoverTrigger>
                  <Button colorScheme="pink" size="sm" borderRadius="md" 
                      onClick={() => {
                          setLoginOpen(true);
                          setSignupOpen(false); 
                          window.scrollTo({ top: 0, behavior: "smooth" })
                  }}>
                      Login
                  </Button>
             </PopoverTrigger>
             <PopoverContent>
              <PopoverArrow />
               <PopoverCloseButton />
                 <PopoverBody>
                   <Login/>
                  </PopoverBody>
                </PopoverContent>
            </Popover>
       
    </Flex>)}

    {/* Categories */}
    <Flex mt={3} gap={3} wrap="wrap" justify="center">
      <ProductCatagory />
    </Flex>
  </Box>
      </>
     ):(



                 // For Big screen


      

     <>
     {/* Banner image */}
           <Image 
       src="https://res.cloudinary.com/dy9gltg7s/image/upload/v1753190017/Screenshot_2025-07-22_184240_yt6gog.png"
       alt="Banner"
       maxW="100%"
       borderRadius="md"
       boxShadow="md"
     />
    <Box>
     <Flex
      width="100%"
      bg={bgColor}
      px={6}
      py={3}
      align="center"
      justify="space-around"
      borderBottom="1px solid"
     borderColor={borderClr}
  >
    <Flex align="center" gap={6} minW="max-content">
     
     {/* Nykaa Logo */}
      <Image 
       src="https://res.cloudinary.com/dy9gltg7s/image/upload/v1754039570/Screenshot_2025-07-22_192704_n2cbsn.png"
       alt="Logo"
       height="30px"
       cursor="pointer"
       onClick={()=>{
        navigate("/")
        resetFilter()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }}
    />

   {/* catagory */}
    <ProductCatagory/>

    </Flex>

    {/* Search bar */}
    <Flex flex="0 1 300px" justify="center">
    <InputGroup maxW="200px">
       <InputLeftElement pointerEvents="none" children={<SearchIcon color={iconClr}/>}/>
           <Input
           type="text"
           placeholder="Search on Nykaa"
           bg={inputBg}
           _placeholder={{ color: placeholderColor }}
           border="none"
           _focus={{ bg: inputFocusBg, border: "1px solid pink" }}
           value={query}
           onChange={handleChange}   
           onKeyDown={handleKeyDown} 
           />
    </InputGroup>

  {/* suggestion box */}

   {suggestions.length > 0 && (
        <Box
          position="absolute"
          mt="10"
          bg={bgColor}
          border="1px solid #ddd"
          borderRadius="md"
          shadow="md"
          zIndex="1000"
          w="250px"
        >
          <List spacing={1}>
            {suggestions.map((item) => (
              <ListItem
                key={item._id}
                px="3"
                py="2"
                cursor="pointer"
                _hover={{ bg:wishlistbg }}
                onClick={() => handleSelect(item)}
              >
                {item.name}
              </ListItem>
            ))}
          </List>
        </Box>
      )}

    {!isAdmin?(<Link to="/wishlist"><Button onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })} bg={wishlistbg}  ml="4" mt="1" size="sm" borderRadius="md">❤️Wishlist</Button></Link>
    ):(<Link to="/orders"><Button onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })} bg={wishlistbg} ml="4" mt="1" size="sm" borderRadius="md">Orders</Button></Link>)}
     </Flex>
     <Flex align="center" gap={4} minW="max-content">

      {/* Auth & user profile buttons */}
      
      {isLogin && <Text fontSize="sm" color={textclr} mr="4" fontWeight="bold">
             👋 Hi, {localStorage.getItem("userName")}
            </Text>}
       

         {!isLogin && (
           <Popover placement="bottom-end" isOpen={isSignupOpen} onClose={() => setSignupOpen(false)}>
              <PopoverTrigger>
                  <Button colorScheme="pink" size="sm" borderRadius="md" 
                     onClick={() => {
                               setSignupOpen(true);
                               setLoginOpen(false); 
                               window.scrollTo({ top: 0, behavior: "smooth" })
                     }}>
                     Sign in
                  </Button>
             </PopoverTrigger>
             <PopoverContent>
              <PopoverArrow />
               <PopoverCloseButton />
                 <PopoverBody>
                   <Signup switchToLogin={() => {
                      setSignupOpen(false);
                      setLoginOpen(true);
                      window.scrollTo({ top: 0, behavior: "smooth" })
                   }}/>
                  </PopoverBody>
                </PopoverContent>
            </Popover>
       )}
        
         {!isLogin && (
           <Popover placement="bottom-end" isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
              <PopoverTrigger>
                  <Button colorScheme="pink" size="sm" borderRadius="md" 
                      onClick={() => {
                          setLoginOpen(true);
                          setSignupOpen(false); 
                          window.scrollTo({ top: 0, behavior: "smooth" })
                  }}>
                      Login
                  </Button>
             </PopoverTrigger>
             <PopoverContent>
              <PopoverArrow />
               <PopoverCloseButton />
                 <PopoverBody>
                   <Login/>
                  </PopoverBody>
                </PopoverContent>
            </Popover>
       )}
        
        {isAdmin&&<Link to="/addProduct"><Button onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })} colorScheme="pink" size="sm" borderRadius="md">ADD PRODUCT</Button></Link>}
       {!isAdmin&&isLogin&&<Link to="/orders"><Button onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })} bg={wishlistbg}  size="sm" borderRadius="md">Orders</Button></Link>}
        
        {isLogin&&<Button onClick={handelLogout} colorScheme="red" size="sm" borderRadius="md">
          Logout
        </Button>}

        {/* icon buttons */}
        
        <DarkMode/>
        
        <IconButton
          icon={<FiShoppingBag />}
          variant="ghost"
          aria-label="Cart"
          fontSize="20px"
          onClick={()=>{
            if(isLogin){
               navigate("/cart")
               window.scrollTo({ top: 0, behavior: "smooth" })
            }else{
              setLoginOpen(true)
             tost({title: "Please Login first",
                description: "User not Login.",
                status: "warning",
                duration: 3000,
                isClosable: true,
              position: "top",})
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
              
            }}
        />
     </Flex>
    
  </Flex>
  </Box>
     </>)}


  </Box>
  
    </>
  );
}

export default Navbar;


