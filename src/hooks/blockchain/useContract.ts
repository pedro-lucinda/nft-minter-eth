import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from 'react-moralis'

interface ContractOptions {
  abi: any
  chain: 'rinkeby'
  address: string
  function_name: string
  params: {
    [key: string]: any
  }
}

export const useAPIContract = (options: ContractOptions) => {
  const { native } = useMoralisWeb3Api()

  const {
    fetch: runContractFunction,
    data: contractResponse,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(native.runContractFunction, { ...options })

  return { runContractFunction, contractResponse, error, isLoading }
}
