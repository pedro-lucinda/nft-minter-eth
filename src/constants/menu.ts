export interface IMenuRoute {
  name: string
  path: string
}

export const routes: IMenuRoute[] = [
  { name: 'Mint', path: '/mint' },
  { name: 'My NFTs', path: '/nfts' },
]
