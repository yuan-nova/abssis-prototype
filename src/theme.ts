import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#009688',
      light: '#4db6ac',
      dark: '#00796b',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    divider: '#e0e0e0',
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#f57c00',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#388e3c',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.005em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#757575',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#757575',
    },
    body1: {
      fontSize: '0.938rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      color: '#9e9e9e',
    },
    overline: {
      fontSize: '0.688rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      lineHeight: 2,
      color: '#9e9e9e',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0,0,0,0.08), 0px 1px 2px rgba(0,0,0,0.06)',
    '0px 2px 4px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.06)',
    '0px 4px 6px rgba(0,0,0,0.07), 0px 2px 4px rgba(0,0,0,0.06)',
    '0px 6px 10px rgba(0,0,0,0.07), 0px 3px 6px rgba(0,0,0,0.05)',
    '0px 8px 15px rgba(0,0,0,0.07), 0px 4px 8px rgba(0,0,0,0.05)',
    '0px 10px 20px rgba(0,0,0,0.06), 0px 5px 10px rgba(0,0,0,0.04)',
    '0px 12px 24px rgba(0,0,0,0.06), 0px 6px 12px rgba(0,0,0,0.04)',
    '0px 14px 28px rgba(0,0,0,0.06), 0px 7px 14px rgba(0,0,0,0.04)',
    '0px 16px 32px rgba(0,0,0,0.06), 0px 8px 16px rgba(0,0,0,0.04)',
    '0px 18px 36px rgba(0,0,0,0.06), 0px 9px 18px rgba(0,0,0,0.04)',
    '0px 20px 40px rgba(0,0,0,0.06), 0px 10px 20px rgba(0,0,0,0.04)',
    '0px 22px 44px rgba(0,0,0,0.06), 0px 11px 22px rgba(0,0,0,0.04)',
    '0px 24px 48px rgba(0,0,0,0.06), 0px 12px 24px rgba(0,0,0,0.04)',
    '0px 26px 52px rgba(0,0,0,0.06), 0px 13px 26px rgba(0,0,0,0.04)',
    '0px 28px 56px rgba(0,0,0,0.06), 0px 14px 28px rgba(0,0,0,0.04)',
    '0px 30px 60px rgba(0,0,0,0.06), 0px 15px 30px rgba(0,0,0,0.04)',
    '0px 32px 64px rgba(0,0,0,0.06), 0px 16px 32px rgba(0,0,0,0.04)',
    '0px 34px 68px rgba(0,0,0,0.06), 0px 17px 34px rgba(0,0,0,0.04)',
    '0px 36px 72px rgba(0,0,0,0.06), 0px 18px 36px rgba(0,0,0,0.04)',
    '0px 38px 76px rgba(0,0,0,0.06), 0px 19px 38px rgba(0,0,0,0.04)',
    '0px 40px 80px rgba(0,0,0,0.06), 0px 20px 40px rgba(0,0,0,0.04)',
    '0px 42px 84px rgba(0,0,0,0.06), 0px 21px 42px rgba(0,0,0,0.04)',
    '0px 44px 88px rgba(0,0,0,0.06), 0px 22px 44px rgba(0,0,0,0.04)',
    '0px 46px 92px rgba(0,0,0,0.06), 0px 23px 46px rgba(0,0,0,0.04)',
  ] as any,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0px 1px 3px rgba(0,0,0,0.08), 0px 1px 2px rgba(0,0,0,0.06)',
          '&:hover': {
            boxShadow: '0px 4px 6px rgba(0,0,0,0.07), 0px 2px 4px rgba(0,0,0,0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.06)',
          border: '1px solid #f0f0f0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0px 1px 3px rgba(0,0,0,0.08), 0px 1px 2px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight: 600,
            backgroundColor: '#f5f5f5',
            color: '#424242',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #f0f0f0',
          padding: '12px 16px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #e0e0e0',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginLeft: 8,
          marginRight: 8,
          marginBottom: 2,
          '&.Mui-selected': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            color: '#1976d2',
            '& .MuiListItemIcon-root': {
              color: '#1976d2',
            },
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.12)',
            },
          },
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
        },
      },
    },
  },
});
