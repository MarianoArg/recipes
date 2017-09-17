import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { reduxConnect } from '../utils/tools.js';
import CircularProgress from 'material-ui/CircularProgress';
import YouTube from 'react-youtube';

class Recipe extends Component {
    _onReady(e) {
        console.log('player ready')
        e.target.playVideo();
    }

  render() {

    const video = this.props.media.current_video;
    const opts = {
        width: '800px',
        height: '450px',
        playerVars: {
            autoplay: 1,
            showinfo: 1,
            controls: 1,
        }
    };
    return(
      <section className='rogue-recipe-container'>
        <div className="rogue-video">
            <YouTube
                    videoId={video.id}
                    id={video.id}
                    playbackState='unstarted'
                    opts={opts}
                    ref={(p) => this._player = p}
                    onReady={this._onReady.bind(this)}
            />
            <h1>{video.title}</h1>
            <h3>{video.channel}</h3>
            <p>{video.description}</p>
        </div>
      </section>
    )
  }
}

Recipe.propTypes = {
  actions: PropTypes.shape({})
};

export default reduxConnect(Recipe, ['media'], true);
