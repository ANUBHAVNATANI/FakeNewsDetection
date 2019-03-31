/*
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {reactLocalStorage} from 'reactjs-localstorage';
import CommentList from "./components/commentList";
import CommentForm from "./components/createComment";

class App extends Component {
  state = {
    loading: false,
    comments:[],
  };

  addComment = (comment) => {
    console.log(comment);
    this.setState({
      loading: false,
      comments: [comment.cleanComment]
    });
  }

  render() {
    const loadingSpin = this.state.loading ? "App-logo Spin" : "App-logo";
    return (
      <div className="App container bg-light shadow">
        <header className="App-header">
          <img src={logo} className={loadingSpin} alt="logo" />
          <h1 className="App-title">
            React Comments
            <span className="px-2" role="img" aria-label="Chat">
              💬
            </span>
          </h1>
          <p>
            Checkout the tutorial on{" "}
            <a className="text-light" href="https://qcode.in">
              QCode.in
            </a>
          </p>
        </header>

        <div className="row">
          <div className="col-4  pt-3 border-right">
            <h6>Comment Checker</h6>
            <CommentForm addComment={(comment) => {this.addComment(comment)}} />
          </div>
          <div className="col-8  pt-3 bg-white">
            <CommentList
              loading={this.state.loading}
              comments={this.state.comments}
            />
          </div>
          <div>{this.handleStateChange}</div>
        </div>
      </div>
    );
  }
}

export default App;
*/

//new app.js code
import React, { Component } from "react";
//import CreateComment from "./components/createComment";
import CreatePost from "./components/createPost";
class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <CreatePost />
      </div>
    );
  }
}
export default App;
