import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import 'date-fns';
import date from 'date-and-time';
import 'date-and-time/plugin/meridiem';
import { ListsContext } from '../context/ListsContext';
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

export const GenerateDailyList = () => {
    const { lists, getLists, selectedDate } = useContext(ListsContext);
    const [dailyListItems, setDailyListItems] = useState([]);
    const [selectedDateBool, setSelectedDateBool] = useState(false);
    date.plugin('meridiem');
    date.plugin('day-of-week');

    console.log("selectedDate.iso", selectedDate.iso)

    const displayDate = date.format(new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day), 'dddd, MMMM D, YYYY');

    const updateSelectedDateBool = () => {
        if (selectedDate.iso === undefined) {
            setSelectedDateBool(true);
        };
    };

    useEffect(() => {  
        updateSelectedDateBool()
        listsMap()   
    }, []);

    const listsMap = () => {
        const tempArray = [];

        lists.forEach((list) => {
            for (let i = 0; i < list.tasks.length; i++) {
                let tempDate = date.format(new Date(list.tasks[i].date), 'YYYY-MM-DD');
                if (tempDate === selectedDate.iso) {
                    const dailyTaskOriginList = { 'originList': list };
                    const index = { 'index': i };
                    tempArray.push([list.tasks[i], [dailyTaskOriginList, index]]);
                 };
             };
        });

        console.log("tempArray", tempArray)

        setDailyListItems(tempArray.sort((a, b) => {return new Date(a[0].date) - new Date(b[0].date)}));
    };
    
    const displayList = dailyListItems.map((task) => {
        let archived;
        if (task[0].archived === true) {
            archived = true;
        } else {
            archived = false;
        };

        console.log("task[0].task", task[0].task)
        console.log("task[0].archived", task[0].archived)

        const getDueTime = (taskDate) => {
            if (!taskDate) {
                return (
                    <>
                    </>
                );
            } else {
                const dueTime = date.format(new Date(taskDate), 'h:mm a');

                return (
                    <div className="dateAndTime">
                        <span>{dueTime}</span>
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
                        onChange={() => ArchiveTask(task[1][1].index, task[1][0].originList, getLists)}
                    />
                </TableCell>
                <TableCell >
                    {task[0].task}
                    {getDueTime(task[0].date)}
                </TableCell>
                <EditListItem task={task[0]} index={task[1][1].index} selectedList={task[1][0].originList} getLists={getLists} />
            </TableRow>
        );
    });

    return (
        <Layout>
            <Typography>
                <div className="listPageBody">
                    <div className="listTitle">{displayDate}</div>
                    <TableContainer component={Paper}>
                        <Table className='table' aria-label="simple table">
                            <TableBody>
                                {displayList}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <AddTask selectedList={selectedList} getLists={getLists} /> */}
                </div>
                {selectedDateBool ? <Redirect to='/calendar' /> : ''}
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