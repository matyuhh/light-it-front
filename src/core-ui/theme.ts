import { createTheme } from '@mui/material/styles';
import colors from './colors';

const theme = createTheme({
  palette: {
    background: {
      default: colors.white,
    },
    text: {
      primary: colors.black,
    },
  },
  typography: {
    fontFamily: '"Arial", "Helvetica"',
    h1: {
      fontWeight: 700,
      fontSize: '32px',
      lineHeight: '50px',
    },
    h2: {
      fontWeight: 700,
      fontSize: '22px',
      lineHeight: '24px',
      letterSpacing: 0.15,
    },
    h3: {
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: 0.15,
    },
    h4: {
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '24px',
    },
    h5: {
      fontWeight: 400,
      fontSize: '14px',
      letterSpacing: 0.16,
      lineHeight: '24px',
    },
    h6: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '24px',
      fontFamily: 'Roboto',
    },
    subtitle1: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: '16px',
      fontFamily: 'Montserrat',
    },
    subtitle2: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: '16px',
      fontFamily: 'Arial',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          display: 'flex',
          marginTop: 24,
          overflowX: 'hidden',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          minWidth: 320,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          paddingRight: 4,
          paddingLeft: 5,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          background: colors.darkBlue,
          color: colors.white,
          borderRadius: '6px',
          width: '144px',
          height: '43px',
          border: 'none',
        },
        outlined: {
          background: colors.white,
          color: colors.darkBlue,
          borderRadius: '6px',
          width: '144px',
          height: '43px',
          border: `1px solid ${colors.darkBlue}`,
        },
      },
    },
  },
});

export default theme;
