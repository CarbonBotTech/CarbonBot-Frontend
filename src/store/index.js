import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import AppReducer from './reducers/app';
import PlatformReducer from './reducers/platforms';
import CategoryReducer from './reducers/categories';
import ChannelReducer from './reducers/channels';
import NotificationReducer from './reducers/notifications';

const CustomMiddleware = store => next => action => {
    next(action);
}

const rootReducer = combineReducers({
    app: AppReducer,
    platforms: PlatformReducer,
    categories: CategoryReducer,
    channels: ChannelReducer,
    notifications: NotificationReducer
});

const Store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk, CustomMiddleware))
    //compose(applyMiddleware(thunk, CustomMiddleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
//,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export default Store;

