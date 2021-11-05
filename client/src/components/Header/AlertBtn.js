import React from 'react';
import './Header.css';
import IconButton from '@mui/material/IconButton';
import BusAlertIcon from '@mui/icons-material/BusAlert';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function AlertBtn () {
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Badge badgeContent={5} color="secondary">
                <IconButton sx={{flexGrow: 1}} edge="start" color="inherit" aria-label="menu" onClick={handleClickOpen}>
                    <BusAlertIcon />      
                </IconButton>
            </Badge>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bus Alerts!"}
                </DialogTitle>
                <DialogContent>
                    <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    This is an error alert — <strong>check it out!</strong>
                    </Alert>
                    <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    This is a warning alert — <strong>check it out!</strong>
                    </Alert>
                    <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    This is an info alert — <strong>check it out!</strong>
                    </Alert>
                    <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    This is a success alert — <strong>check it out!</strong>
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus> Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AlertBtn;