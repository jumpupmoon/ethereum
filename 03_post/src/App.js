import React from 'react';
import './App.css';
import Writer from './writer';
import Post from './post';
import postStorage from './PostStorage';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [
        {author: 'alice', contents: 'in wonderland', updated: new Date().toString()}
      ]
    }
  }

  componentDidMount() {
    postStorage.subscribe(this);
  }

  componentWillUnmount() {
    postStorage.unsubscribe(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>NonceNS</h1>
        </header>
        <div>
          <div>
            <Writer />
            <div>
              {
                Object
                  .keys(this.state.posts)
                  .map(key => <Post key={key} post={this.state.posts[key]} />)
              }
            </div>
          </div>
        </div>
      </div>
    ) 
  }
}