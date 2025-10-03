import { useColorMode,IconButton } from "@chakra-ui/react";
import {MoonIcon,SunIcon} from "@chakra-ui/icons"

export const DarkMode=()=>{
  const {colorMode,toggleColorMode}=useColorMode()
    return(
        <>
        <IconButton
          aria-label="Toggle Color Mode"
          icon={colorMode==="light"?<MoonIcon/>:<SunIcon/>}
          onClick={toggleColorMode}
          variant="ghost"
          size="md"
          ml="auto"
        />
        </>
    )
}