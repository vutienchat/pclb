import type {} from '@mui/lab/themeAugmentation'
import type { ThemeOptions } from '@mui/material'
import type {} from '@mui/x-date-pickers/themeAugmentation'

const base: ThemeOptions = {
  config: {
    sidebarWidth: 300
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
        variant: 'outlined'
      },
      styleOverrides: {
        root: {
          borderColor: '#BCC1CA',
          borderWidth: 1,
          borderRadius: 6,
          minHeight: 40
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          minHeight: 40
        },
        input: {
          '&::placeholder': {
            color: '#827D7D'
          },
          '&:-internal-autofill-selected': {
            backgroundColor: 'transparent !important',
            color: 'inherit !important',
            padding: '6.5px 14px !important'
          }
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
        fullWidth: true
      }
    },
    MuiInputLabel: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiAvatar: {
      defaultProps: {
        variant: 'rounded'
      },
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0
        },
        rounded: {
          borderRadius: '999999px'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
        size: 'small'
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          minWidth: '100px',
          height: '40px',
          borderRadius: '8px'
        }
      }
    },
    MuiLoadingButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
        size: 'small'
      },
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
        color: 'primary'
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: 0
        }
      }
    },
    MuiChip: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: {
          fontWeight: 500
        }
      }
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        root: {
          borderRadius: 4
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: 'hidden'
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover'
      }
    },
    MuiMenu: {
      defaultProps: {
        elevation: 16
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        input: {
          fontWeight: 500
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // backgroundImage: 'none',
        }
      }
    },
    MuiPopover: {
      defaultProps: {
        elevation: 16
      }
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
        color: 'primary'
      }
    },
    MuiSwitch: {
      defaultProps: {
        size: 'medium',
        color: 'primary'
      }
    },
    MuiTable: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiIcon: {
      defaultProps: {
        fontSize: 'small'
      }
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'small'
      }
    },
    MuiAlert: {
      defaultProps: {
        variant: 'filled'
      }
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        }
      }
    },
    MuiStack: {
      defaultProps: {
        direction: 'row',
        spacing: 1
      }
    },
    MuiListItemText: {
      defaultProps: {
        primaryTypographyProps: {
          variant: 'body2'
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginTop: 1
        }
      }
    }
  },
  direction: 'ltr',
  shape: {
    borderRadius: 5
  }
}

export default base
