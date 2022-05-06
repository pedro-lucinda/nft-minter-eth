import { extendTheme } from '@chakra-ui/react'
import { Button } from './components/button'

export const theme = extendTheme({
  components: {
    Button: Button,
  },
  colors: {
    brand: {
      pink: '#EF8FFF',
      lightBlue: '#2CA0E2',
      purple: '#9B6FEE',

      blueBorder: '#3D5EA7',
      background:
        'linear-gradient(183.33deg, #032150 46.28%, #113D9B 76.4%, #6846D4 90.4%)',
      glass:
        'linear-gradient(90deg, rgba(145, 96, 237, 0.274) -3.84%, rgba(255, 255, 255, 0.024) 133.08%)',

      backdrop: 'blur(40.1868px)',
      cardBg:
        'linear-gradient(169.44deg, rgba(145, 96, 237, 0.274)1.85%, rgba(65, 48, 90, 0.08) 98.72%)',
      modalBg:
        'linear-gradient(169.44deg, rgba(44, 4, 118, 1)1.85%, rgba(34, 13, 65, 1) 98.72%)',
    },
  },

  styles: {
    global: {
      body: {
        bg: 'brand.background',
        color: 'white',
      },
    },
  },
  fonts: {
    heading: 'Fahkwang, sans-serif',
    body: 'Titillium Web, sans-serif',
  },
})
