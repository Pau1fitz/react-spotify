export const theme = {
  spacing: '8',

  palette: {
    primary: {
      main: '#1DB954',
      light: '#25E240',
      dark: '#2FD566',
    },
    error: {
      text: '#E3EDF8',
      background: '#3379CD',
    },
    grey: {
      1: '#B2B2B2',
      2: '#CCCCCC',
      3: '#666666',
      4: '#404040',
      5: '#333333',
      6: '#181818',
      7: '#121212',
    },
    common: {
      white: {
        primary: '#FFFFFF',
        secondary: '#B3B3B3',
      },
      black: {
        primary: '#121212',
        secondary: '#181818',
      }
    }
  },

  typography: {
    family: {
      thin: ['Proxima Thin', 'sans-serif'].join(','),
      normal: ['Proxima Nova', 'sans-serif'].join(','),
      bold: ['Proxima Bold', 'sans-serif'].join(','),
    },
    size: '14',
  },

  gradients: {
    primary: 'linear-gradient(180deg, #383838 0%, #181818 10%)',
  },

  borderRadius: {
    small: '4px',
    large: '20px',
    round: '50%',
  }
}
