import {removeTaskAC, taskslistsReducer, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from './taskslists-reducer';
import {TasksStateType, TodoListType} from '../App/App';
import {addTodolist, removeTodolist, todolistsReducer} from './todolists-reducer';

describe("tasks should work coorect", () => {
    let startState: TasksStateType;
    beforeEach(() => {
        startState = {
            "todolistId1": [
                { id: "1", title: "CSS", isDone: false },
                { id: "2", title: "JS", isDone: true },
                { id: "3", title: "React", isDone: false }
            ],
            "todolistId2": [
                { id: "1", title: "bread", isDone: false },
                { id: "2", title: "milk", isDone: true },
                { id: "3", title: "tea", isDone: false }
            ]
        };
    });

    test('correct task should be deleted from correct array', () => {
        const endState = taskslistsReducer(startState, removeTaskAC("2", "todolistId2"))

        expect(endState["todolistId1"].length).toBe(3);
        expect(endState["todolistId2"].length).toBe(2);
        expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
        expect(endState["todolistId2"][1].id).toBe("3");
    });



    test('correct task should be added to correct array', () => {
        let action = addTaskAC("juce", "todolistId2");
        const endState = taskslistsReducer(startState, action)

        expect(endState["todolistId1"].length).toBe(3);
        expect(endState["todolistId2"].length).toBe(4);
        expect(endState["todolistId2"][0].id).toBeDefined();
        expect(endState["todolistId2"][0].title).toBe("juce");
        expect(endState["todolistId2"][0].isDone).toBe(false);
    })

    test('should be change task Status', () => {
        const endState = taskslistsReducer(startState, changeTaskStatusAC("2", false, "todolistId2"))

        expect(endState["todolistId2"][1].isDone).toBe(false);
        expect(endState["todolistId2"].length).toBe(3);
        expect(endState["todolistId1"][1].isDone).toBe(true);
    });

    test('should be change title', () => {
        const endState = taskslistsReducer(startState, changeTaskTitleAC("2", "goatMilk", "todolistId2"))

        expect(endState["todolistId2"][1].title).toBe("goatMilk");
        expect(endState["todolistId2"].length).toBe(3);
    });


    test('new array should be added when new todolist is added', () => {
        const endState = taskslistsReducer(startState, addTodolist("todolistId3"))
        const keys = Object.keys(endState);
        const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
        if (!newKey) {
            throw Error("new key should be added")
        }

        expect(keys.length).toBe(3);
        expect(endState[newKey]).toEqual([]);
    });



    test('property with todolistId should be deleted', () => {
        const endState = taskslistsReducer(startState, removeTodolist("todolistId2"))
        const keys = Object.keys(endState);

        expect(keys.length).toBe(1);
        expect(endState["todolistId2"]).not.toBeDefined();
    });


})


