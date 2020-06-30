import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandlerItem}
                   onKeyPress={onKeyPressHandlerItem}
                   className={error ? "error" : ""}
            />
            <button onClick={onAddItemClick}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default AddItemForm;