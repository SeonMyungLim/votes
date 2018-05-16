import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import reducer from './reducers/index.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './styles/index.css';
import App from './components/App';

function logger({ getState }) {
    return (next) => (action) => {
        const returnValue = next(action);
        console.log('LOGGER', getState());
        return returnValue;
    };
}

const store = createStore(reducer, applyMiddleware(logger, thunk));
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
