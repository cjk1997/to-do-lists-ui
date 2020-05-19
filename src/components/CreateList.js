import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
};
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

export default function CreateList(getLists) {
    const [newList, setNewList] = useState([]);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [addOpen, setAddOpen] = useState(false);

    const handleOpen = () => {
        setAddOpen(true);
    };

    const handleClose = () => {
        setAddOpen(false);
    };

    const handleChange = (event) => {
        event.preventDefault();
        setNewList({ 'list_name': event.target.value, 'tasks': [] })
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="New List" placeholder="New List" variant="outlined" onChange={handleChange}/>
                <Button className="submitButton" variant="contained" color="primary" onClick={() => handleAddList(newList, handleClose, getLists)}>
                    Save
                </Button>
            </form>
        </div>
    );

    return (
        <div>
            <Fab color="primary" aria-label="add">
                <AddIcon onClick={handleOpen}/>
            </Fab>
            <Modal
                open={addOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
};

const handleAddList = (newList, handleClose, getLists) => {
    handleClose();
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newList)})
        .then(getLists)
};