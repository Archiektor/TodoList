import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string,
    saveTitle: (str: string) => void,
}

const EditableSpan: React.FC<EditableSpanType> = (props) => {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.title);

    const onEditMode = () => {
        setEditMode(true);
    }

    const offEditMode = () => {
        setEditMode(false);
        props.saveTitle(title);
        // setTitle("");
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode ?
            <input onChange={onChangeTitle} onBlur={() => offEditMode()} autoFocus={true} value={title} type="text"/> :
            <span onDoubleClick={() => onEditMode()}>{title}</span>
    )
}

export default EditableSpan;