import {applyMiddleware, createStore} from "redux";
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import persistedReducer from './root-reducer';
import rootSaga from "./root-saga";

const sagaMiddlewares = createSagaMiddleware();

const middlewares = [sagaMiddlewares];

if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

export const store = createStore(persistedReducer, applyMiddleware(...middlewares));

sagaMiddlewares.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };