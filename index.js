const redux = require('redux');

// log the process to redux and show into console
const reduxLogger = require('redux-logger');

const applyMiddleware = redux.applyMiddleware;

// create logger to generate logs
const logger = reduxLogger.createLogger();


// actions
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM =  'BUY_ICECREAM';

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIcecream() {
    return {
        type: BUY_ICECREAM
    }
}

// default states
const cakeInitialState = {
    numOfCakes: 10
}
const icecreamInitialState = {
    numOfIcecream: 20
}


// reducers
const cakeReducer = (state = cakeInitialState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }

        default: return state
    }
}
const icecreamReducer = (state = icecreamInitialState, action) => {
    switch(action.type) {

        case BUY_ICECREAM: return {
            ...state,
            numOfIcecream: state.numOfIcecream - 1
        }

        default: return state
    }
}

// if user have more the one reducers the we can use combineReduces()
const combineReducers = redux.combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
})

// bind reducer and middleware into store
const store = redux.createStore(combineReducers, applyMiddleware(logger));

// log initial state first
console.log('Initial state', store.getState());

// subscribe and log all dispatch action here
const unSubscribe = store.subscribe(() => console.log('Updated state: ', store.getState()));

// dispatch actions here
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());

// called unsubscribe method to log current state
unSubscribe();