import React from 'react';

export default class Post extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.post.author}</p>
                <p>{this.props.post.contents}</p>
                <p>{this.props.post.date}</p>
                <hr />
            </div>
        )
    }
}