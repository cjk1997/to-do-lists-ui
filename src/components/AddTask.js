import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { UpdateList } from './UpdateList';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export function AddTask({ selectedList, getLists }) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [newTask, setNewTask] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        event.preventDefault();
        setNewTask({ 'task': event.target.value, 'archived': false, 'date': selectedDate });
    };

    const handleDateChange = (date) => {
        if (!date) {
            setSelectedDate('')
        } else {
            setSelectedDate(date); 
        };
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form>
                <TextField id="outlined-basic" label="List Item" placeholder="List Item" variant="outlined" onChange={handleChange}/>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Set a Time and Date
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format="MM/dd/yyyy"
                                    defaultValue={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Time picker"
                                    defaultValue={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Button className="submitButton" variant="contained" color="primary" onClick={() => handleAddTask(newTask, selectedList, getLists, handleClose)}>
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
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
};

const handleAddTask = (newTask, selectedList, getLists, handleClose) => {
    handleClose();
    const tasksCopy = Object.assign([], selectedList.tasks);
    tasksCopy.push(newTask);
    UpdateList(tasksCopy, selectedList, getLists);
};