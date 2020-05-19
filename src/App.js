import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ListsDisplay } from './pages/Home';
import { CalendarDisplay } from './pages/CalendarPage';
import { GenerateList } from './pages/ListPage';
import { ListsContext } from './context/ListsContext';
import './App.css';

function App() {
  const { Provider } = ListsContext;
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState({tasks: []});
  const getLists = () => {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}`)
        .then(response => response.json())
        .then(data => {
          setLists(data);
          if (selectedList._id) {
            const listArray = data.filter((list) => selectedList._id === list._id);
            setSelectedList(listArray[0]);
        }})
        .catch(err => err);
  };

  useEffect(() => {getLists()}, []);

  return (
    <Provider value={{ lists, getLists, selectedList, setSelectedList }}>
      <Router>
        <Switch>
          <Route exact path='/' component={ListsDisplay} />
          <Route exact path='/calendar' component={CalendarDisplay} />
          <Route exact path='/list' component={GenerateList} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;