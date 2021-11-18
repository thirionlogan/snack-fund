import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
          main: '#3f51b5',
        },
        secondary: {
          main: '#f50057',
        },
      },
});



function ThemeWrapper({ children }) {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledEngineProvider>
    );

}

ThemeWrapper.propTypes = {
    children: PropTypes.node
}

export default ThemeWrapper

