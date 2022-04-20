import { useMoralis } from 'react-moralis'

interface Metadata {
  name: string
  description: string
  image: Promise<string | undefined>
}

export const useIPFS = () => {
  const { Moralis } = useMoralis()

  async function saveIPFSAndGetURL(file: File): Promise<string | undefined> {
    try {
      const moralisFile = new Moralis.File((file as any).name, file)
      await moralisFile.saveIPFS()
      return (moralisFile as any)._ipfs ?? undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async function saveMetadataIPFSAndGetURL(
    metadata: Metadata,
  ): Promise<string | undefined> {
    try {
      const file2 = new Moralis.File(`${metadata.name}metadata.json`, {
        base64: Buffer.from(JSON.stringify(metadata)).toString('base64'),
      })
      await file2.saveIPFS()
      return (file2 as any)._ipfs ?? undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  return { saveIPFSAndGetURL, saveMetadataIPFSAndGetURL }
}
