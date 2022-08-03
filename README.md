# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

---

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

---

## Three Principles of Redux

State is read-only, can be any JavaScript type, including: number, string, boolean, array, and object.


1. [Store](https://redux.js.org/understanding/thinking-in-redux/glossary#store): the global state of your application is stored in an object tree within **a single store**.
   
   - getState(): access to the state
   - dispatch(action): update the state
   - subscribe(listener) registers a function to be called on state changes.
   - replaceReducer(nextReducer) can be used to implement hot reloading and code splitting. Most likely you won't use it.
  


2. [Action](https://redux.js.org/understanding/thinking-in-redux/glossary): the only way to change the state is to emit an action, an object describing what happened. 
Every action must have a type property with a string value. This describes the action.
   -  type Action = Object 
   -  action creator = function returns action
   -  Typically, an action has a **payload property** with an object value. This includes any information related to the action. Or requires no payload because no additional information is needed.
   -  When an action is generated and notifies other parts of the application, we say that the action is dispatched.


  ```
   const action = {
   type: 'todos/addTodo',
   payload: 'Take selfies'
   };

    //no payload
   const removeAll = {
   type: 'songs/removeAll'
   }
  ```



3. [Reducer](https://redux.js.org/understanding/thinking-in-redux/glossary#reducer): to specify how the state tree is transformed by actions, you write pure reducers. Changes are made with pure functions.Reducers are just pure functions that take the previous state and an action as arguements, and return the **next state**

    - [Rules of Reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#rules-of-reducers)
    1. They should only calculate the new state value based on the state and action arguments.
    2. They are not allowed to modify the existing state. Instead, they must copy the existing state and make changes to the copied values.
    3. They must not do any asynchronous logic or have other “side effects”.

---
## Immutable Updates and Pure Functions

If a function makes immutable updates to its arguments, it does not change the argument but instead makes a copy and changes that copy. (Sounds similar to rule 2, no?) It’s called updating immutably because the function doesn’t change, or mutate, the arguments

This function mutates its argument:

```
const mutableUpdater = (obj) => {
  obj.completed = !obj.completed;
  return obj;
}
 
const task = { text: 'do dishes', completed: false };
const updatedTask = mutableUpdater(task);
console.log(updatedTask); 
// Prints { text: 'do dishes', completed: true };
 
console.log(task); 
// Prints { text: 'do dishes', completed: true };

```

Meanwhile, this function “immutably updates” its argument:

By copying the contents of the argument obj into a new object ({...obj}) and updating the completed property of the copy, the argument obj will remain unchanged.

```
const immutableUpdater = (obj) => {
  return {
    ...obj,
    completed: !obj.completed
  }
}
 
const task = { text: 'iron clothes', completed: false };
const updatedTask = immutableUpdater(task);
console.log(updatedTask); 
// Prints { text: 'iron clothes', completed: true };
 
console.log(task); 
// Prints { text: 'iron clothes', completed: false };
```

Note that, plain strings, numbers, and booleans are immutable in JavaScript so we can just return them without making a copy:

```
const immutator = (num) => num + 1;
const x = 5;
const updatedX = immutator(x);
 
console.log(x, updatedX); // Prints 5, 6
```


In this example, the function is not a pure function because its returned value depends on the status of a remote endpoint.

```
const addItemToList = (list) => {
  let item;
  fetch('https://anything.com/endpoint')
    .then(response => {
      if (!response.ok) {
        item = {};
      }
 
      item = response.json();
   });
 
   return [...list, item];  
};
```

The function can be made pure by pulling the fetch() statement outside of the function.

```
let item;
  fetch('https://anything.com/endpoint')
    .then(response => {
      if (!response.ok) {
        item = {};
      }
 
      item = response.json();
   });
 
const addItemToList = (list, item) => {
    return [...list, item];
};
```