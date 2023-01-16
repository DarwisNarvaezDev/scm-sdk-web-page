import { ChakraProvider, Heading } from "@chakra-ui/react";
import Index from "./index/Index";

export default function  App(){
  return (
    <ChakraProvider
        resetCSS
    >
        <Index />
    </ChakraProvider>
  )
}