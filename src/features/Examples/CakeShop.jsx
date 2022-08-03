//import react from 'redux';

//single javaScript application
const { act } = require('react-dom/test-utils');
const redux = require('redux');
const createStore = redux.createStore


const BUY_CAKE = 'BUY_CAKE';

//action creator Object
function buycake() {
  return {
    type: BUY_CAKE,
    info: "First redux action"
  }
}


//action (previousState,action)=> newState
const initialState = {
  numOfCakes: 0
}

//create a reducer(state,action)
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE: return {
      ...state, //copy previousState,
      numOfCakes: state.numOfCakes + 1
    }
    default: return state //returns a default initial state if no action is provided

  }
}


//create a store 
const store = createStore(reducer)
console.log("Initial State", store.getState());
//registers a function to be called on state changes.
store.subscribe(() => console.log('Updated State', store.getState()))
//update the state
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buycake())



