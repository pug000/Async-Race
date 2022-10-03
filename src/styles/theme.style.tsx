import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      purpleColor: string;
      whiteColor: string;
      greenColor: string;
      lightGreenColor: string;
      redColor: string;
      brownColor: string;
      transparentColor: string;
    };
    fonts: {
      title: string;
      text: string;
    };
    fontSizes: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      text: string;
    };
    effects: {
      transition: string;
    };
  }
}

const defaultTheme: DefaultTheme = {
  colors: {
    purpleColor: '#2d284d',
    whiteColor: '#ffffff',
    greenColor: '#0ad10a',
    lightGreenColor: '#81e211',
    redColor: '#af2121',
    brownColor: '#524848',
    transparentColor: 'transparent',
  },
  fonts: {
    title: 'Permanent Marker, cursive',
    text: 'Uchen, serif',
  },
  fontSizes: {
    h1: '37px',
    h2: '35px',
    h3: '23px',
    h4: '20px',
    text: '17px',
  },
  effects: {
    transition: '0.3s ease-out',
  },
};

export default defaultTheme;
