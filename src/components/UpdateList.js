export function UpdateList(updatedTasks, selectedList, getLists) {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/${selectedList._id}`, {
        method : 'PATCH',
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify(updatedTasks) })
        .then(response => response.json())
        .then(getLists)
        .catch(err => err);
};