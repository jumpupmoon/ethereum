import React from 'react';

export default class Writer extends React.Component {
    newPost(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={e => this.newPost(e)}>
                <p>
                    <textarea ref={input => this.body = input} />
                    <br />
                    <button type="submit">Post</button>
                </p>
            </form>
        )
    }
}