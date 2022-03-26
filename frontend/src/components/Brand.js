import React from "react";
import { Text, Center, VStack } from "@chakra-ui/react";
function Brand() {
  return (
    <>
      <VStack>
        <Center color="white">
          <Text fontSize="7xl">Tasket</Text>
          <Text px="1" color="lightgreen">
            v1.0.0
          </Text>
        </Center>
        <Center paddingBottom="5" color="white">
          <Text fontSize="lg">Your Friendly Task manager 📝</Text>
        </Center>
      </VStack>
    </>
  );
}

export default Brand;
