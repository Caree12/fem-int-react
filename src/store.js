import { createStore } from 'redux';
import reducer from './reducers/index.js';

const store = createStore(
    reducer, 
    // if you wanted to use thunks or sagas this is also where you'd do it
    // check for presence of the browser and if the redux devtools extenstion is there USE it! - else use a bogus function : f => f
    typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !==  "undefined" 
        ? window.__REDUX_DEVTOOLS_EXTENSION__() 
        : f => f
    );

export default store;