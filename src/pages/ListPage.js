import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import 'date-fns';
import date from 'date-and-time';
import 'date-and-time/plugin/meridiem';
import { ListsContext } from '../context/ListsContext';
import { AddTask } from '../components/AddTask';
import { ArchiveTask } from '../components/ArchiveTask';
import { EditTask } from '../components/EditTask';
import { DeleteTask } from '../components/DeleteTask';
import Layout from '../config/Layout';
import './ListPage.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';

export function GenerateList() {
    const { selectedList, getLists } = useContext(ListsContext);
    const [redirectBool, setRedirectBool] = useState(false);
    date.plugin('meridiem');

    console.log(selectedList)

    const updateListSelectedBool = () => {
        if (!selectedList._id) {
            setRedirectBool(true);
        };
    };

    useEffect(() => updateListSelectedBool(), []);

    const displayList = selectedList.tasks.map((task, index) => {
        let archived;
        if (task.archived === true) {
            archived = true;
        } else {
            archived = false;
        };

        const getDueDate = (taskDate) => {
            if (!taskDate) {
                return (
                    <>
                    </>
                );
            } else {
                const dueDate = date.format(new Date(taskDate), 'ddd, MMM D');
                const dueTime = date.format(new Date(taskDate), 'h:mm a   -   ');

                return (
                    <div className="dateAndTime">
                        <span>{dueTime}</span>
                        <span>{dueDate}</span>
                    </div>
                );
            };
        };

        return (
            <TableRow hover>
                <TableCell padding="checkbox">
                    <Checkbox 
                        checked={archived}
                        color="primary"
                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
                        onChange={() => ArchiveTask(index, selectedList, getLists)}
                    />
                </TableCell>
                <TableCell >
                    {task.task}
                    {getDueDate(task.date)}
                </TableCell>
                <EditListItem task={task} index={index} selectedList={selectedList} getLists={getLists} />
            </TableRow>
        );
    });
    return (
        <Layout>
            <Typography>
                <div className="listPageBody">
                    <div className="listTitle">{selectedList.list_name}</div>
                    <TableContainer component={Paper}>
                        <Table className='table' aria-label="simple table">
                            <TableBody>
                                {displayList}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <AddTask selectedList={selectedList} getLists={getLists} />
                </div>
                {redirectBool ? <Redirect to="/" /> : ''}
            </Typography>
        </Layout>
    );
};

function EditListItem({ task, index, selectedList, getLists }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditOpen = () => {
        setEditOpen(true);
        handleMenuClose();
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
        handleMenuClose();
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    return (
        <TableCell>
            <Button 
                aria-control="simple-menu" 
                aria-haspopup="true" 
                onClick={handleMenuOpen}
            >
                <EditIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleEditOpen()}>Edit</MenuItem>
                <EditTask
                    task={task}
                    index={index}
                    editOpen={editOpen}
                    onClose={handleEditClose}
                    selectedList={selectedList}
                    getLists={getLists}
                />
                <MenuItem onClick={() => handleDeleteOpen()}>Delete</MenuItem>
                <DeleteTask
                    task={task}
                    index={index}
                    deleteOpen={deleteOpen}
                    onClose={handleDeleteClose}
                    selectedList={selectedList}
                    getLists={getLists}
                />
            </Menu>
        </TableCell>
    );
};