import React from 'react';
import './Header.css';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { List, Drawer, ListItem } from '@mui/material';

function MenuBtn(){

    const [state, setState] = React.useState(false)

    const toggleDrawer = (open) => (event) => {
        setState(open)
    }

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

    return(
        <div>
            <IconButton sx={{flexGrow: 1}} edge="start" color="inherit" aria-label="menu" 
            onClick={toggleDrawer(true)}
            >
                <MenuIcon />         
            </IconButton>
            <Drawer
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