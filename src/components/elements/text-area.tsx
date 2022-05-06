import { Textarea as ChakraTextArea } from '@chakra-ui/react'

interface CustomTextAreaProps {
  value: any
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
  type: 'text' | 'number' | 'file'
}
export const TextArea = ({
  value,
  onChange,
  placeholder,
  type,
}: CustomTextAreaProps) => {
  return (
    <ChakraTextArea
      // LOGIC
      value={value}
      onChange={onChange}
      placeholder={placeholder}
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
