
import React from 'react';
import { bindActionCreators } from 'redux';
import { appActions } from '../actions/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export function reduxConnect(component, stateKeys, actions = false) {

    const props = {};
    stateKeys.forEach(property => props[property] = PropTypes.object.isRequired);
    if (actions) {
        props.actions = PropTypes.object.isRequired;
    }

    component.propTypes = props;

    const stateFunc = (state) => {
        const reqProps = {};
        stateKeys.forEach(property => {
            reqProps[property] = state[property];
        });

        return reqProps;
    };

    let actionsFunc;
    if (actions) {
        actionsFunc = (dispatch) => {
            return {
                actions: bindActionCreators(appActions, dispatch),
            };
        };
    }

    return connect(stateFunc, actionsFunc)(component);

}
