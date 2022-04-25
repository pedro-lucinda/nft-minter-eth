export interface IMenuRoute {
  name: string
  path: string
}

export const routes: IMenuRoute[] = [
  { name: 'Mint', path: '/home' },
  { name: 'My NFTs', path: '/nfts' },
]
