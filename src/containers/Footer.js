import React, {Component} from 'react';
import Favorite from 'material-ui/svg-icons/action/favorite';

export default class Footer extends Component {
  render() {
    return(
      <footer className="rogue-footer">
        <h1>Cooked with <Favorite className="rogue-love" color='rgb(244, 67, 54)' /> by the <span className="rogue-logo">Rogue Team</span></h1>
        <p>All content is owned by their respective authors.</p>
      </footer>
      )
  }
}
