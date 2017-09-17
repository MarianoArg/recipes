import { FILTER } from '../actions/const';
import { stateTree } from '../stores/state';

const initialState = stateTree;
console.log(initialState);

export function filterReducer(state = initialState, action) {
    switch(action.type) {
        case FILTER.REQUEST:
            return {...state,
                    filter: action.text,
                    filterFetching: true,
                    filterSuccess: null
                 }
        case FILTER.SUCCESS:
            return {...state,
                    filterSuccess: true,
                    filterFetching: false,
                    filterError: null,
                    ...action.media
            }
        case FILTER.ERROR:
            return {...state,
                    filterSuccess: false,
                    filterError: action.error
            }
        case FILTER.ADD:
            return {...state,
                 filterActives: [...state.filterActives || [], action.filter]
            }
        case FILTER.REMOVE:
            return {...state,
                filterActives: [...state.filterActives.filter(element => element !== action.filter)]
            }
        default:
            return state;
    }
}
