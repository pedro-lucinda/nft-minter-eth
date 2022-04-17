import { Flex } from "@chakra-ui/react";
import React from "react";

export const AuthPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="full" h="full">
      {children}
    </Flex>
  );
};
