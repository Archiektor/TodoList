const INCREMENT_AGE = "INCREMENT_AGE";
const INCREMENT_CHILDREN_COUNT = "INCREMENT_CHILDREN_COUNT";
const CHANGE_NAME = "CHANGE_NAME";

type StateType = {
    age: number
    childrenCount: number,
    name: string,
}
type IncrementAgeType = {
    type: typeof INCREMENT_AGE,
}
type IncrementChildrenCountType = {
    type: typeof INCREMENT_CHILDREN_COUNT,
}
type ChangeNameACType = {
    type: typeof CHANGE_NAME,
    newName: string,
}
export const incrementAge = (): IncrementAgeType => ({type: INCREMENT_AGE})
export const incrementChildrenCount = (): IncrementChildrenCountType => ({type: INCREMENT_CHILDREN_COUNT})
export const changeName = (name: string): ChangeNameACType => ({
    type: CHANGE_NAME,
    newName: name
})

type ReducersActionsType = IncrementAgeType | IncrementChildrenCountType | ChangeNameACType;

export const userReducer = (partOfState: StateType, action: ReducersActionsType): StateType => {
    switch (action.type) {
        case 'INCREMENT_AGE':
            return {...partOfState, age: partOfState.age + 1}
        case 'INCREMENT_CHILDREN_COUNT':
            return {...partOfState, childrenCount: partOfState.childrenCount + 1}
        case "CHANGE_NAME": {
            return {...partOfState, name: action.newName}
        }
        default:
            throw new Error("I don't understand this type")
    }
}