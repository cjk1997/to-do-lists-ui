import React from 'react';

export const ListsContext = React.createContext({
    lists: [],
    getLists: () => {},
    selectedList: [],
    setSelectedList: () => {},
    selectedDate: {},
    setSelectedDate: () => {},
});