//initial state value
const initialWagonState = {
  supplies: 100,
  distance: 0,
  days: 0,
  cash: 200
}


//Initial State and Reducer
const useReducer = (state = initialWagonState, action) => {
  switch (action.type) {
    case 'gather': {
      return {
        ...state, //copy the intital state
        supplies: state.supplies + 15,
        distance: state.distance,
        days: state.days + 1,
      }
    }

    case 'travel': {
      return {
        ...state,
        supplies: state.supplies - (20 * action.payload),
        distance: state.distance + (10 * action.payload),
        days: state.days + action.payload
      }
    }

    case 'tippedWagon': {
      return {
        ...state,
        supplies: state.supplies - 30,
        days: state.days + 1
      }
    }
    // Players can give away 20 supplies to gain 5 cash
    case 'sell': {
      return {
        ...state,
        supplies: state.supplies - 20,
        cash: state.cash + 5
      }
    }

    //Players can gain 25 supplies at the cost of 15 cash
    case 'buy': {
      return {
        ...state,
        supplies: state.supplies + 25,
        cash: state.cash - 15

      }
    }
    //Outlaws steal half of the player’s cash
    case 'theft': {
      return {
        ...state,
        cash: state.cash / 2
      }
    }

    default: {
      return state;
    }
  }
}

//initialization
let wagon = useReducer(undefined, {});
console.log(wagon);
//day 1 actions
wagon = useReducer(wagon, { type: "travel", payload: 1 })
console.log(wagon);
//day 2 actions
wagon = useReducer(wagon, { type: "gather", payload: 0 })
console.log(wagon);
//day 3 actions
wagon = useReducer(wagon, { type: "tippedWagon", payload: 0 })
console.log(wagon);
//On the following day, we set out for a long 3 days of travel.
wagon = useReducer(wagon, { type: 'travel', payload: 3 })
console.log(wagon);
//buy
wagon = useReducer(wagon, { type: 'buy' })
console.log(wagon);
wagon = useReducer(wagon, { type: 'sell' })
console.log(wagon);
wagon = useReducer(wagon, { type: 'theft' })
console.log(wagon);