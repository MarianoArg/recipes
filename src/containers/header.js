import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SearchBox from './SearchBox.jsx';
import { reduxConnect } from '../utils/tools.js';

class Header extends Component {
    render() {
        const { actions } = this.props;
        const {success, recipes} = this.props.search;

        return(
                <Toolbar className="rogue-header">
                    <ToolbarGroup>
                        <SearchBox  success={success} actions={ this.props.actions } />
                    </ToolbarGroup>
                </Toolbar>
            )
    }
}

Header.propTypes = {
  actions: PropTypes.shape({})
};

export default reduxConnect(Header, ['search'], true);
