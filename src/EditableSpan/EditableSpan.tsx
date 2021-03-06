import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string,
    saveTitle: (str: string) => void,
}

const EditableSpan: React.FC<EditableSpanType> = React.memo((props) => {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>("");

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };

    const activateViewMode = () => {
        setEditMode(false);
        props.saveTitle(title);
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value.trim().length !== 0 ? setTitle(e.currentTarget.value) : setTitle(title);
    }

    return (
        editMode ?
            <TextField onChange={onChangeTitleHandler} onBlur={() => activateViewMode()} autoFocus={true} value={title}
                       type="text"/> :
            <span onDoubleClick={() => activateEditMode()}>{props.title}</span>
    )
})

export default EditableSpan;