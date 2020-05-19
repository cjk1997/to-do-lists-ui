import React from 'react';
import { UpdateList } from './UpdateList';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';


export function DeleteTask({ task, index, deleteOpen, onClose, selectedList, getLists }) {
    const handleClose = () => {
        onClose();
    };

    const handleDelete = (index, selectedList, getLists) => {
        onClose();
        HandleListItemDelete(index, selectedList, getLists);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={deleteOpen}>
            <DialogTitle id="simple-dialog-title">Delete {task.task}</DialogTitle>
            <Button variant="outlined" colored="secondary" onClick={() => handleDelete(index, selectedList, getLists)}>
                Yes
            </Button>
            <Button variant="outlined" onClick={() => handleClose()}>
                No
            </Button>
        </Dialog>
    );
};

DeleteTask.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

const HandleListItemDelete = (index, selectedList, getLists) => {
    const deletedTaskCopy = Object.assign( [], selectedList.tasks);
    deletedTaskCopy.splice(index, 1);
    UpdateList(deletedTaskCopy, selectedList, getLists);
};