import React, { useContext, useEffect, useState } from 'react'
import Layout from '../config/Layout';
import CreateList from '../components/CreateList';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ListsContext } from '../context/ListsContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export const ListsDisplay = () => {
    const { lists, getLists } = useContext(ListsContext);
    const { selectedList, setSelectedList } = useContext(ListsContext);
    const classes = useStyles();

    const selectList = (list) => {
        setSelectedList(list);
    };
    
    const displayLists = lists.map((list) => {
        return (
            <div>
                <Link to='/list' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button className="listButton" variant="contained" color="primary" onClick={() => selectList(list)}>
                        {list.list_name}
                    </Button>
                </Link>
            </div>
        );
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return(
        <Layout>
            <Typography component="div" gutterBottom>
                <Link to='/calendar' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button className="calendarButton" variant="contained" color="primary">
                        Calendar
                    </Button>
                </Link>
                <div className="listButtonContainer">
                    {displayLists}
                </div>
                <div className="addListButton">
                    <CreateList getLists={getLists} />
                </div>
            </Typography>
        </Layout>
    );
};