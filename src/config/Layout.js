import React, { useContext } from 'react';
import { ListsContext } from '../context/ListsContext';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 325;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        // zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        // marginRight: 36,
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: '0',
        flexShrink: 0,
        // whiteSpace: 'nowrap',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // drawerHeader: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     padding: theme.spacing(0, 1),
    //     // necessary for content to be below app bar
    //     ...theme.mixins.toolbar,
    //     justifyContent: 'flex-end',
    // },
    // content: {
    //     backgroundColor: '#3f51b5',
    //     flexGrow: 1,
    //     padding: theme.spacing(3),
    //     transition: theme.transitions.create('margin', {
    //       easing: theme.transitions.easing.sharp,
    //       duration: theme.transitions.duration.leavingScreen,
    //     }),
    //     marginLeft: drawerWidth,
    // },
    // contentShift: {
    //     backgroundColor: '#3f51b5',
    //     transition: theme.transitions.create('margin', {
    //       easing: theme.transitions.easing.easeOut,
    //       duration: theme.transitions.duration.enteringScreen,
    //     }),
    //     marginLeft: 0,
    // },

    drawerOpen: {
        // backgroundColor: '#3f51b5',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        // backgroundColor: '#3f51b5',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    //     overflowX: 'hidden',
    //     width: theme.spacing(7) + 1,
    //     [theme.breakpoints.up('sm')]: {
    //         width: theme.spacing(9) + 1,
    //     },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function Layout({ children }) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { lists, getLists } = useContext(ListsContext);
    const { selectedList, setSelectedList } = useContext(ListsContext);

    const selectList = (list) => {
        setSelectedList(list);
        handleDrawerClose();
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
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

    return (
        <div className={classes.root}>
            <AppBar 
                position="fixed"   
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton 
                        color="inherit"
                        aria-label="open drawer" 
                        onClick={handleDrawerOpen}
                        edge="start" 
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>




                    {/* <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button size="large" variant="contained" color="primary" class="homeButton">
                            Lists
                        </Button>
                    </Link> */}
                        
                        
                        
                        Lists
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer 
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{paper: clsx({[classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),}}
            >
                <div  className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <div className="drawerListLinks">
                    <Link to='/calendar' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button className="calendarButton" variant="contained" color="primary">
                            Calendar
                        </Button>
                    </Link>
                    {displayLists}
                </div>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography>
                    {children}
                </Typography>
            </main>
        </div>
    );
};