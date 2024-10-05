import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import deepPurple from '@material-ui/core/colors/deepPurple';

const theme = createMuiTheme({
  	palette: {
        //type: 'dark',
    	primary: indigo,
      	secondary: deepPurple,
        background: {
            default: '#ffffff'
        }
  	},
    //shadows: ["none"],
  	shape: {
        borderRadius: 6,
    },
    typography: {
        
	    button: {
	      	fontWeight: 600,
	      	textTransform: 'none'
        },
        caption: {
            letterSpacing: 0,
            opacity:0.7
        },
        fontFamily: '"Poppins", "Helvetica", sans-serif',
        letterSpacing: -0.5,
        subtitle1: {
            color: '#999',
            textTransform: 'uppercase',
            fontWeight: 500,
            fontSize: '14px'
        },
        h1: {
            letterSpacing: '-0.5px',
            fontWeight: 600
        },
        h2: {
            letterSpacing: '-0.5px',
            fontWeight: 600
        },
        h3: {
            letterSpacing: '-0.5px',
            fontWeight: 600
        },
        h4: {
            letterSpacing: '-0.5px',
            fontWeight: 600
        },
        h5: {
            letterSpacing: '-0.5px',
            fontWeight: 600
        },
        h6: {
            letterSpacing: '-0.5px',
            fontWeight: 600
        }

        
	},
    overrides: {
        MuiAlert: {
            message: {
                display: 'inline',
                width: '100%'
            }
        },
        MuiAlertTitle: {
            root: {
                fontWeight: 700
            }
        },
        MuiListItemText: {
            primary: {
                fontWeight: 500
            }
        },
        MuiListItemIcon: {
            root: {
                minWidth: '38px'
            }
        },
        MuiAvatar: {
            colorDefault: {

            },
            rounded: {

            }
        },
        MuiDialogTitle: {
            root: {
                padding: '10px 15px 10px 15px'
            }
        },
        MuiDialogContent: {
            root: {
                padding: '15px 15px 0 15px'
            }
        },
        MuiDialogActions: {
            root: {
                padding: '15px 15px 15px 15px'
            }
        },
        MuiTab: {
            root: {
                minWidth: 'auto !important',
                padding: '0 15px 0 15px'
            }
        },
        MuiFormHelperText: {
            root: {
                marginBottom:-5
            }
        }
    }
});

export default theme;

