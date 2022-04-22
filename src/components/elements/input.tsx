import { Input as ChakraInput } from '@chakra-ui/react'
import React from 'react'

interface CustomInputProps {
  value?: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  type: 'text' | 'number' | 'file'
  accept?: any
}

export const Input = ({
  value,
  onChange,
  placeholder,
  type,
  accept,
}: CustomInputProps) => {
  return (
    <ChakraInput
      // LOGIC
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      accept={accept}
      //STYLE
      w={['300px', '300px', '380px']}
      h="50px"
      bg="none"
      border="1px solid"
      borderColor="brand.blueBorder"
      p={2}
      fontSize="18px"
      _hover={{}}
      _focus={{ outline: 'none' }}
      _placeholder={{ color: 'gray.300' }}
    />
  )
}
