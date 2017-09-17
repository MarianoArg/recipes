import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from '../components/cardItem';
import { reduxConnect } from '../utils/tools.js';
import CircularProgress from 'material-ui/CircularProgress';

class Main extends Component {
  componentDidMount() {
    if(!this.props.media.success) {
        this.props.actions.loadMainPage()
    }
  }

  render() {
    const {success, recipes} = this.props.media;

    return(
          <section className="rogue-main-page">
          {
            success ?
            recipes.map(item => <Card actions={this.props.actions} key={item._id} channel={item.channelTitle} title={item.title} thumbnails={item.thumbnails} description={item.description} id={item.videoID}/>) :
            <CircularProgress className="rogue-loading" size={80} thickness={5} color={'#e87e04'} />
          }
          </section>
      )
  }
}

Main.propTypes = {
  actions: PropTypes.shape({})
};

export default reduxConnect(Main, ['media'], true);
