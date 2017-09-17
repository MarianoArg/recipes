import { SEARCH } from './const';

function searchRequest(text) {
    return {
        type: SEARCH.REQUEST,
        text
    }
}

function searchSuccess(media) {
    return {
        type: SEARCH.SUCCESS,
        media
    }
}

function searchError(error) {
    return {
        type: SEARCH.ERROR,
        error
    }
}

export function searchVideo(searchQuery) {
    const searchString = searchQuery.split(' ');

    let keywords = '';
    const MIN_WORD_LENGTH = 2;
    for(let word in searchString) {
        if(searchString[word].length > MIN_WORD_LENGTH) {
            keywords = keywords + searchString[word] + '+' ;
        }
    };
    keywords = keywords.slice(0, -1);
    console.log(keywords);
    return dispatch => {
        dispatch(searchRequest(keywords));
            fetch('http://127.0.0.1:5000/api/recipes/recipe/_search?q='+keywords,
                {method: 'GET'})
            .then( response => {
                if (!response.ok) {
                    throw Error(response.json());
                }
                return response.json();
            })
            .then( data => {
                dispatch(searchSuccess(data));
            })
            .catch( error => {
                console.log(error);
                dispatch(searchError(error));
            });
        }
}
