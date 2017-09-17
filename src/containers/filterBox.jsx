import React, {Component} from 'react';
import FilterList from '../components/filterList';
import {Redirect} from 'react-router-dom';
import { reduxConnect } from '../utils/tools.js';

class FilterBox extends Component {
    constructor() {
        super();
        this.filtrar = this.filtrar.bind(this);

    }

    filtrar(value, active){
        let criteria = [];
        if(active) {
            criteria = [...this.props.filter.filterActives, value]
        } else {
            criteria = [...this.props.filter.filterActives.filter(element => element !== value)]
        }

        this.props.actions.filterVideo(criteria);
    }

  render() {
    const {filterSuccess, filterActives} = this.props.filter;

    return (
        <div>
          <FilterList {...this.props} activeFilters={filterActives} filter={this.filtrar}/>
          {filterSuccess && (
            <Redirect to={'/filter'}/>
          )}
        </div>
    );
  }
}

export default reduxConnect(FilterBox, ['filter'], true);
