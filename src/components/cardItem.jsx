import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CardItem extends Component {
        openVideo() {
            this.props.actions.openVideo(this.props)
        }

        render() {
        const {thumbnails, title, id, channel, description} = this.props;

        return (
            <article className="video-card" onClick={this.openVideo.bind(this)}>
                <Link to={`/recipes/v=${id}`}>
                        <div className="video-thumbnail">
                            <img src={thumbnails.high.url}/>
                        </div>
                        <div className="video-info">
                            <h2>{title}</h2>
                            <h4>{channel}</h4>
                        </div>
                    </Link>
            </article>
        );
    }
}

export default CardItem;
