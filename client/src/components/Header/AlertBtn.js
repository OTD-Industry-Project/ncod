import React from 'react';
import './Header.css';
import IconButton from '@mui/material/IconButton';
import BusAlertIcon from '@mui/icons-material/BusAlert';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

function AlertBtn () {
    
    const [open, setOpen] = React.useState(false);
    const [alertOpen, alertSetOpen] = React.useState(true);

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
                    <Collapse in={alertOpen}>
                        <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        This is a success alert — <strong>check it out!</strong>
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    alertSetOpen(false);
                                }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </Alert>
                    </Collapse>
                    <Alert severity="warning">
                    <AlertTitle>Examples ONLY --- Warning - Late!</AlertTitle>
                    Bus ID - 70 <br />
                    Driver Id - "GILES" <br />
                    Date - 13/10/2020 <br />
                    Time Slot - 12:10PM - 1:00PM <br />
                    Destination - "CGS WHEELERS HILL" <br />
                    </Alert>
                    <Alert severity="warning">
                    <AlertTitle>Warning - Running Behind</AlertTitle>
                    Bus ID - 10 <br />
                    Driver Id - "DOGAN" <br />
                    Date - 26/10/2020 <br />
                    Time Slot - 9:00AM - 10:00AM <br />
                    Destination - "Bacchus Marsh Grammer Woodlea Campus" <br />
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