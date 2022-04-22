import { Spinner, Flex, Image, Input, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { IoImagesOutline } from 'react-icons/io5'

interface NftCardProps {
  name: string
  description: string
  image: File | null
  onChange: React.ChangeEventHandler<HTMLInputElement>
  isLoading: boolean
}

export const NftCard = ({
  name,
  description,
  image,
  onChange,
  isLoading,
}: NftCardProps) => {
  const input = React.useRef()

  const [url, setUrl] = React.useState<string>()

  React.useEffect(() => {
    if (image) setUrl(window.URL.createObjectURL(new Blob([image])))
  }, [image])

  return (
    <Flex
      bg="brand.cardBg"
      direction="column"
      p={10}
      m={2}
      maxW="400px"
      border="1px solid"
      borderColor="brand.purple"
      borderRadius="35px"
      backdropFilter="brand.backdrop"
      overflow="clip"
      position="relative"
      onClick={() => (input as any)?.current?.click()}
      _hover={{
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transform: isLoading ? 'none' : 'scale(0.99)',
        transition: isLoading ? 'none' : 'transform 0.2s ease-in-out',
      }}
    >
      {isLoading && (
        <Flex
          align="center"
          justify="center"
          width="full"
          h="full"
          position="absolute"
          top={0}
          left={0}
          bg="#0d095651"
        >
          <Spinner size="xl" />
        </Flex>
      )}

      <Text mb="10px" align="center" color="gray.300">
        Click to select an image
      </Text>

      <Input
        type="file"
        w="full"
        h="full"
        position="absolute"
        top={0}
        left={0}
        ref={input as any}
        hidden={true}
        onChange={onChange}
      />
      {!!image ? (
        <Image
          src={url as string}
          alt=""
          w="303px"
          h="292px"
          objectFit="cover"
        />
      ) : (
        <Flex
          width="303px"
          height="292px"
          align="center"
          justify="center"
          direction="column"
        >
          <IoImagesOutline size="203px" />
        </Flex>
      )}

      <VStack spacing={2} w="full" align="start" mt={4}>
        <Text fontWeight="bold" fontSize="xl" h="40px" w="full">
          {name || 'Name'}
        </Text>
        <Text fontWeight="bold" fontSize="xl" h="40px" w="full">
          {description || 'Description'}
        </Text>
      </VStack>
    </Flex>
  )
}
