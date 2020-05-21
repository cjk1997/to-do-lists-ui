import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { UpdateList } from './UpdateList';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

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

export function EditTask({ task, index, editOpen, onClose, selectedList, getLists }) {
    const [editedTask, setEditedTask] = useState({});
    const [taskTitle, setTaskTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState(task.date);
    const classes = useStyles();
    
    const handleClose = () => {
        onClose();
    };

    const handleEdit = (index, selectedList, getLists) => {
        onClose();
        const tempTask = { 'task': taskTitle, 'archived': task.archived, 'date': selectedDate }
        setEditedTask(tempTask)
        HandleListItemEdit(index, tempTask, selectedList, getLists);
    };

    const handleChange = (event) => {
        console.log("taskTitle", taskTitle)
        event.preventDefault();
        setTaskTitle(event.target.value);
    };

    const handleDateChange = (date) => {
        if (!date) {
            setSelectedDate('')
        } else {
            setSelectedDate(date); 
            console.log("date change", date)
        };
    };

    return(
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={editOpen}>
            <DialogTitle id="simple-dialog-title">Edit</DialogTitle>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="" defaultValue={task.task} variant="outlined" onChange={handleChange}/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <Button className="submitButton" variant="contained" color="primary" onClick={() => handleEdit(index, selectedList, getLists)}>
                    Save
                </Button>
            </form>
        </Dialog>
    );
};

const HandleListItemEdit = (index, editedTask, selectedList, getLists) => {
    const tasksCopy = Object.assign( [], selectedList.tasks);
    tasksCopy[index] = editedTask;
    UpdateList(tasksCopy, selectedList, getLists);
};