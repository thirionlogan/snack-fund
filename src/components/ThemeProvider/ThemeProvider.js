import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();



function ThemeWrapper({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;

}

ThemeWrapper.propTypes = {
    children: PropTypes.node
}

export default ThemeWrapper

