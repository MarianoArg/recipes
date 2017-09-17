import { MEDIA } from './const';

function loadPage() {
    return{
        type: MEDIA.MAIN
    }
}

function goNextPage(pageId) {
    return{
        type: MEDIA.NEXT,
        token: pageId
    }
}

function mediaSuccess(media) {
    return {
        type: MEDIA.SUCCESS,
        media
    }
}

function goPrevPage(pageId) {
    return{
        type: MEDIA.PREV,
        token: pageId
    }
}

function mediaError(error) {
    return {
        type: MEDIA.ERROR,
        error
    }
}

export function openVideo(media) {
    return {
        type: MEDIA.CURRENT,
        media
    }
}

export function loadMainPage() {
    return dispatch => {
        dispatch(loadPage())
        fetch('http://127.0.0.1:5000/api/recipes/',
           {method: 'GET'})
        .then( response => {
            if (!response.ok) {
                throw Error(response.json());
            }
            return response.json();
        })
        .then( data => {
            dispatch(mediaSuccess(data));
        })
        .catch( error => {
            console.log(error);
            dispatch(mediaError(error));
        });
    }
}
