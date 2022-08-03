// Define reducer here
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'songs/addSong': {
      //they must copy the existing state and make changes to the copied values.
      //only calculate the new state value based on the state and action arguments.
      return [...state, action.payload]
    }
    case 'songs/removeSong': {
      //return a copy of the state object with the specified song removed.
      return state.filter(song => song !== action.payload)
    }

    default:
      return state;
  }
}


//create state
const initialState = ['Take Five', 'Claire de Lune', 'Respect'];

//create actions
const addNewSong = {
  type: 'songs/addSong',
  payload: 'Halo'
};

const removeSong = {
  type: 'songs/removeSong',
  payload: 'Take Five'
};

const removeAll = {
  type: 'songs/removeAll'
}





//This function mutates its argument:

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

//Meanwhile, this function “immutably updates” its argument:
const immutableUpdater = (obj) => {
  return {
    ...obj,
    completed: !obj.completed
  }
}

const task2 = { text: 'iron clothes', completed: false };
const updatedTask2 = immutableUpdater(task2);
console.log(updatedTask2);
// Prints { text: 'iron clothes', completed: true };

console.log(task2);
// Prints { text: 'iron clothes', completed: false };


//Note that, plain strings, numbers, and booleans are immutable in JavaScript so we can just return them without making a copy:
const immutator = (num) => num + 1;
const x = 5;
const updatedX = immutator(x);

console.log(`X is: ${x} and updatedX is: ${updatedX}.`); // Prints 5, 6
