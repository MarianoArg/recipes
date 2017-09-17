import { MEDIA } from '../actions/const';
import { stateTree } from '../stores/state';
import {REHYDRATE} from 'redux-persist/constants'

const initialState = stateTree;

export function mediaReducer(state = initialState, action) {
    switch(action.type) {
        case MEDIA.MAIN:
        return {...state,
            loading: true,
            success: null
        }
        case MEDIA.SUCCESS:
        return {... state,
            success: true,
            loading: false,
            error: null,
            ...action.media
        }
        case MEDIA.ERROR:
        return {...state,
            success: false,
            error: action.error
        }
        case MEDIA.CURRENT:
        return{...state,
            current_video: action.media
        }
        case REHYDRATE:
          let incoming = action.payload.media
          if (incoming) return {...state, ...incoming}
          return state
      default:
      return state;
  }
}
