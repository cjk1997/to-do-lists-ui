import { UpdateList } from './UpdateList';

export function ArchiveTask(index, selectedList, getLists) {
    const tasksCopy = Object.assign([], selectedList.tasks);
    tasksCopy[index].archived = !selectedList.tasks[index].archived;
    UpdateList(tasksCopy, selectedList, getLists);
};