import {
  Box,
  Flex,
  Text,
  Link,
  Stack,
  Grid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useColorModeValue,
  Skeleton,
  useBreakpointValue
} from "@chakra-ui/react";
import { useContext } from "react";
import { ProductContext } from "../../contex/ProductContextProvider";
import { useNavigate } from "react-router-dom";


const groupByCategory = (products) => {
  const result = {};

  products.forEach((product) => {
    const { category, apply, type } = product;

    if (!result[category]) {
      result[category] = {};
    }
 
    if (!result[category][apply]) {
      result[category][apply] = new Set();
    }

    result[category][apply].add(type);
  });

  
  for (let cat in result) {
    for (let apply in result[cat]) {
      result[cat][apply] = Array.from(result[cat][apply]);
    }
  }

  return result;
};

const ProductCategory = () => {
  const { products,loading,filterByCategory,filterByType } = useContext(ProductContext);
  const navigate=useNavigate()

  const popoverTrigger = useBreakpointValue({ base: "click", md: "hover" })

  const textColor = useColorModeValue("black", "white");
  const popoverBg = useColorModeValue("white", "gray.800");
  const borderClr = useColorModeValue("gray.200", "gray.600");
  const applyTitleColor = useColorModeValue("gray.700", "gray.300");
  const linkHoverColor = useColorModeValue("pink.400", "pink.300");
  
  if (loading) {
    return (
      <Flex gap={5} overflowX="auto">
          <Skeleton w="80px" h="20px" borderRadius="md" />
          <Skeleton w="80px" h="20px" borderRadius="md" />
          <Skeleton w="80px" h="20px" borderRadius="md" />
      </Flex>
    );
  }

  const groupedData = groupByCategory(products);


  return (
         
    <Flex gap={5} fontWeight="semibold" fontSize="sm" color={textColor}>
      {Object.entries(groupedData).map(([category, applyMap]) => (
        <Popover trigger={popoverTrigger} placement="bottom-start" key={category}>
          <PopoverTrigger>
            <Box cursor="pointer">
              <Text fontWeight="bold" _hover={{ color: linkHoverColor }} onClick={()=>{
                filterByCategory(category)
                 navigate("/")
                 window.scrollTo({ top: 0, behavior: "smooth" })
                }}>
                {category}
              </Text>
            </Box>
          </PopoverTrigger>

          <PopoverContent border="1px solid" borderColor={borderClr} p={4} bg={popoverBg} minW="500px">
            <PopoverBody>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {Object.entries(applyMap).map(([applyTitle, types], idx) => (
                  <Box key={idx}>
                    <Text fontWeight="semibold" color={applyTitleColor} mb={2}>
                      {applyTitle}
                    </Text>
                    <Stack spacing={1}>
                      {types.map((typeItem, i) => (
                        <Link key={i} onClick={()=>{
                          filterByType(typeItem)
                          navigate("/")
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                         _hover={{ color: linkHoverColor }}>
                          {typeItem}
                        </Link>
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Grid>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ))}
    </Flex>
  );
};

export default ProductCategory;
