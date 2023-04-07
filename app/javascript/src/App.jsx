import React from "react";
import AppRoutes from './routes/AppRoutes'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { UserContextProvider } from "./store/UserContext";

const theme = createTheme({
  palette: {
    primary: {
      main: '#5e17eb'
    },
    text: {
      primary: '#303030',
      secondary: '#173A5E'
    }
  }
})
function App(){
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <AppRoutes/>
      </UserContextProvider>
    </ThemeProvider>
  );
}


export default App;