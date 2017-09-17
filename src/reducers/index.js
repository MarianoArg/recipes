import { combineReducers } from 'redux';
import { mediaReducer } from './media';
import { searchReducer } from './search';
import { filterReducer } from './filter';

const reducers = {
    media: mediaReducer,
    search: searchReducer,
    filter: filterReducer
};

const rootReducer = combineReducers(reducers);
module.exports = rootReducer;
