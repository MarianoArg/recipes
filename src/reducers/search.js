import { SEARCH } from '../actions/const';
import { stateTree } from '../stores/state';
import {REHYDRATE} from 'redux-persist/constants'

const initialState = stateTree;

export function searchReducer(state = initialState, action) {
    switch(action.type) {
        case SEARCH.REQUEST:
            return {...state,
                    searchKeywords: action.text,
                    fetching: true,
                    success: null
                 }
        case SEARCH.SUCCESS:
            return {... state,
                    success: true,
                    fetching: false,
                    error: null,
                    ...action.media
            }
        case SEARCH.ERROR:
            return {...state,
                    success: false,
                    error: action.error
            }
            case REHYDRATE:
              let incoming = action.payload.media
              if (incoming) return {...state, ...incoming}
              return state
            default:
                return state;
    }
}
