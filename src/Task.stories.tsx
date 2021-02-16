import React from 'react'
import {action} from '@storybook/addon-actions'
import {Task} from './Task'
import {TaskStatuses, TodoTaskPriorities} from "./API/todolist-api";

export default {
    title: 'Task Stories',
    component: Task
}

const removeCallback = action('Remove Button inside Task clicked');
const changeStatusCallback = action('Status changed inside Task');
const changeTitleCallback = action('Title changed inside Task');

export const TaskBaseExample = (props: any) => {
    return (
        <div>
            <Task
                task={{id: '1', status: TaskStatuses.Completed, title: "CSS", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: TodoTaskPriorities.Middle, startDate: '', todoListId: 'todolistId1'}}
                removeTask={removeCallback}
                changeTaskTitle={changeTitleCallback}
                changeTaskStatus={changeStatusCallback}
                todolistId={"todolistId1"}

            />
            <Task
                task={{id: '2', status: TaskStatuses.New, title: "JS", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: TodoTaskPriorities.Middle, startDate: '', todoListId: 'todolistId2'}}
                removeTask={removeCallback}
                changeTaskTitle={changeTitleCallback}
                changeTaskStatus={changeStatusCallback}
                todolistId={"todolistId2"}
            />
        </div>)
}
