import {userReducer, incrementAge, incrementChildrenCount, changeName} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const endState = userReducer(startState, incrementAge())

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };
    // your code here
    const endState = userReducer(startState, incrementChildrenCount())

    expect(endState.childrenCount).toBe(3);
    expect(endState.age).toBe(20);
});

test('user reducer should changeName', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };
    // your code here
    const endState = userReducer(startState, changeName("Nikki"))

    expect(endState.name).toBe("Nikki");
});

