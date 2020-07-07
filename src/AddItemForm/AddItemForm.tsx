import React, {ChangeEvent, KeyboardEvent, useState} from "react";

import s from "./AddItemForm.module.scss";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void,
}

const AddItemForm: React.FC<AddItemFormType> = ({addItem}) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);


    const onAddItemClick = () => {
        if (title.trim() !== "") {
            addItem(title.trim());
        } else {
            setError("Title is required");
        }
        setTitle("");
    }

    const onChangeHandlerItem = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandlerItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            onAddItemClick();
        }
    }

    let errorAddItemStyle = error ? `${s.wrapper__addItem_error}` : "";
    return (
        <div className={s.wrapper}>
            <div onBlur={() => setError(null)} className={s.wrapper__inputBlock}>
                {/*<TextField variant={"standard"} className={`${s.wrapper__addItem} ${errorAddItemStyle}`} value={title}*/}
                <TextField variant={"standard"} value={title}
                           onChange={onChangeHandlerItem}
                           onKeyPress={onKeyPressHandlerItem}
                           error={Boolean(errorAddItemStyle)}
                           label={"Title"}
                           helperText={error}
                />
                {/*{error && <div className={`${s.wrapper__errorDiv}`}>{error}</div>}*/}
            </div>
            {/*<button className={s.wrapper__btn} onClick={onAddItemClick}>+</button>*/}
            <IconButton onClick={onAddItemClick} color={"primary"}>
                <AddBox/>
            </IconButton>
            {/*<Button variant={"contained"} color={"primary"} onClick={onAddItemClick}>+</Button>*/}
        </div>
    )
}

export default AddItemForm;