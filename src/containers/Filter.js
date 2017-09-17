import React, {Component} from 'react';
import Card from '../components/cardItem';
import SearchError from '../components/searchError';
import PropTypes from 'prop-types';
import { reduxConnect } from '../utils/tools.js';
import Footer from './Footer';

class Filter extends Component {
    render() {
        const itemList = this.props.filter.recipes;
        return(
            <section className="rogue-search-page">
               {
                (itemList.length) ?
                itemList.map(item => {
                    if(item) {
                        return <Card actions={this.props.actions} key={item._id} channel={item.channelTitle} title={item.title} thumbnails={item.thumbnails} description={item.description} id={item.videoID}/>
                    }
                }):
                <SearchError />
            }
            </section>
        )
    }
}

Filter.propTypes = {
  actions: PropTypes.shape({})
};

export default reduxConnect(Filter, ['filter'], true);
