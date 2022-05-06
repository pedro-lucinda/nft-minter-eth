import { Flex } from "@chakra-ui/react";
import React from "react";

export const PublicPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="full" h="full" maxW="1440px" m="0 auto">
      {children}
    </Flex>
  );
};
