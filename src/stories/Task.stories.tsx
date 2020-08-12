import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import Task from '../Task/Task';

export default {
    title: 'Task',
    component: Task,
} as Meta;

const removeCallback = action('Remove button inside task clicked');
const changeStatusCallback = action('Status changed inside Task');
const changeTitleCallback = action('Title changed inside Task');

export const TaskBaseExample = (props: any) => {
    return (
        <React.Fragment>
            <Task
                removeTask={removeCallback} changeTaskTitle={changeTitleCallback}
                changeTaskStatus={changeStatusCallback}
                todoListId={'todolistid1'} task={{id: '1', isDone: false, title: '35'}}/>
            <Task
                removeTask={removeCallback} changeTaskTitle={changeTitleCallback}
                changeTaskStatus={changeStatusCallback}
                todoListId={'todolistid2'} task={{id: '2', isDone: true, title: '36'}}/>
        </React.Fragment>
    )
}