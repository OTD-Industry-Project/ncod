import React from 'react';
import './Header.css';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { List, Drawer, ListItem } from '@mui/material';
//function for menu hamburger button
function MenuBtn(){

    const [state, setState] = React.useState(false)
    //toggling state of drawer
    const toggleDrawer = (open) => (event) => {
        setState(open)
    }
    //list of settings options to be displayed, clickable
    const list = () => (
        <div onClick={toggleDrawer(false)}>
            <List>
                <ListItem button> 
                    Setting 1
                </ListItem>
                <ListItem button>
                    Setting 2
                </ListItem>
                <ListItem button>
                    Setting 3
                </ListItem>
                <ListItem button>
                    Setting 4
                </ListItem>
                <ListItem button>
                    The settings can go quite depending on length of title
                </ListItem>
            </List>
        </div>
    )
    //div menu icon button to open drawer when clicked
    return(
        <div>
            <IconButton sx={{flexGrow: 1}} edge="start" color="inherit" aria-label="menu" 
            onClick={toggleDrawer(true)}
            >
                <MenuIcon />         
            </IconButton>
            <Drawer //Drawer to open a side menu for settings
            anchor={'right'}
            open={state}
            onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </div>
    )
}
export default MenuBtn;