export function formatContractError(e: any): string {
  return e?.message?.replace('MetaMask Tx Signature: ', '') ?? ''
}
