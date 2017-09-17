import React, {Component} from 'react';
import SentimentDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';


const SearchError = () => {
    const iconStyle = {
        width: '35px',
        height: '35px'
    };

    return (
      <article className="rogue-search-error">
        <h1>Sorry, no recipes found <SentimentDissatisfied color='rgba(0,0,0,.7)' style={iconStyle} className="search-error-icon"/></h1>
        <h3>Why don't you try with differents terms?</h3>
      </article>
      )
}

export default SearchError;
