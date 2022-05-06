import { useMoralis } from 'react-moralis'

export interface Metadata {
  name: string
  description: string
  image: string
}

export const useIPFS = () => {
  const { Moralis } = useMoralis()

  async function saveIPFSImageAndGetURL(
    file: File,
  ): Promise<string | undefined> {
    try {
      const moralisFile = new Moralis.File((file as any).name, file)
      await moralisFile.saveIPFS()
      return (moralisFile as any)._ipfs
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async function saveMetadataIPFSAndGetURL(
    metadata: Metadata,
  ): Promise<string | undefined> {
    try {
      const metadataFormatted = new Moralis.File(
        `${metadata.name}metadata.json`,
        {
          base64: Buffer.from(JSON.stringify(metadata)).toString('base64'),
        },
      )
      await metadataFormatted.saveIPFS()

      return (metadataFormatted as any)._ipfs
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  return { saveIPFSImageAndGetURL, saveMetadataIPFSAndGetURL }
}
