import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ChakraProvider, extendTheme} from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "white",
        color: "black"
      },
    }),
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} >

          <App />
    
    </ChakraProvider>
    
  </React.StrictMode>
);

export const server = 'https://api.coingecko.com/api/v3'; 
{/*from here we will use this coins url anywhere we need*/}

