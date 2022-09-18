import React from "react";
import AppRoutes from './routes/AppRoutes'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5e17eb'
    }
  }
})
function App(){
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes/>
    </ThemeProvider>
  );
}


export default App;