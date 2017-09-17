import { FILTER } from './const';

function filterRequest(text) {
    return {
        type: FILTER.REQUEST,
        text
    }
}

function filterSuccess(media) {
    return {
        type: FILTER.SUCCESS,
        media
    }
}

function addFilter(filter) {
    return {
        type: FILTER.ADD,
        filter
    }
}

function removeFilter(filter) {
    return {
        type: FILTER.REMOVE,
        filter
    }
}

function filterError(error) {
    return {
        type: FILTER.ERROR,
        error
    }
}

export function filterVideo(filterQuery) {
    let keywords = filterQuery.map(filter => keywords || '' + filter);
    keywords = keywords.toString();

    return dispatch => {
        dispatch(filterRequest(filterQuery));
            fetch('http://127.0.0.1:5000/api/recipes/recipe/_search?q='+ keywords,
                {method: 'GET'})
            .then( response => {
                if (!response.ok) {
                    throw Error(response.json());
                }
                return response.json();
            })
            .then( data => {
                dispatch(filterSuccess(data));
            })
            .catch( error => {
                console.log(error);
                dispatch(filterError(error));
            });
        }
}

export function setFilters(filter, active) {
    return dispatch => {
        if(active) {
            dispatch(addFilter(filter));
        } else {
            dispatch(removeFilter(filter));
        }
    }
}
