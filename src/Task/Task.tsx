import React, {ChangeEvent, useCallback} from 'react';
import s from '../TodoList/TodoList.module.scss';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from '../EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from '../TodoList/Todolist';

type TaskPropsType = {
    removeTask: (taskId: string, todoListId: string) => void,
    todoListId: string,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
    changeTaskTitle: (id: string, title: string, todoListId: string) => void,
    task: TaskType,
}

const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const {removeTask, todoListId, changeTaskStatus, changeTaskTitle, task: t} = props;
    const onClickHandler = () => removeTask(t.id, todoListId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(t.id, e.currentTarget.checked, todoListId);
    }
    const onTitleCallback = useCallback((title: string) => {
        changeTaskTitle(t.id, title, todoListId)
    }, [changeTaskTitle, t.id, todoListId])

    let isDoneForStyle = t.isDone ? 'is-done' : '';

    return <div className={`${s.wrapper__listItem} ${isDoneForStyle}`} key={t.id}>
        <div>
            <Checkbox className={s.wrapper__flag}
                      color={'primary'}
                      onChange={onChangeStatusHandler}
                      checked={t.isDone}/>
            <EditableSpan saveTitle={onTitleCallback} title={t.title}/>
        </div>
        <IconButton onClick={onClickHandler}><Delete/></IconButton>
    </div>
})

export default Task