import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Search from '../components/searchForm';
import { reduxConnect } from '../utils/tools.js';

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.searchValue = this.searchValue.bind(this);
    }
    searchValue(value) {
        this.props.actions.searchVideo(value);
    }

  render() {
    const {success} = this.props;

    return (
            <div>
                <Search search={this.searchValue}/>
                {success && (
                      <Redirect to={'/search'}/>
                )}
            </div>
    );
  }
}

export default reduxConnect(SearchBox, ['search'], true);
