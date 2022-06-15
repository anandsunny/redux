// axios is use to call API's
const axios = require('axios');

// main redux library
const redux = require('redux');

// middleware for redux
const thunkMiddleware = require('redux-thunk').default;

// apply middle ware into redux;
const applyMiddleware = redux.applyMiddleware;

// creating store for redux
const createStore = redux.createStore;


// actions code started
const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// request is in progress
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

// request is in success
const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

// request is in failed
const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

// actions code ended


// reducer code started
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }

        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

// reducer code ended


// create a function to dispatch action for fetch user data to jsonplaceholder
const fetchUsers = () => {
    return function (dispatch) {

        // dispated to fetch request started
        dispatch(fetchUsersRequest())

        // call get request to fetch data
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                const users = res.data.map(user => user.id);

                // dispatch action to success request
                dispatch(fetchUsersSuccess(users));
            })
            .catch(err => {

                // dispatch action to failed request
                dispatch(fetchUsersFailure(err.message));
            })
    }
}

// create store and bind reducer and middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// fetch the data to state
store.subscribe(() => { console.log(store.getState()) });

// dispated action to fetch users
store.dispatch(fetchUsers());


// run the command "node asyncAction" into the terminal to see the result.