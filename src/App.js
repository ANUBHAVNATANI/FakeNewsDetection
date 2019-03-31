//new app.js code
import React, { Component } from "react";
//import CreateComment from "./components/createComment";
import CreatePost from "./components/createPost";
class App extends Component {
  state = {};
  render() {
    return (
      <div className="ui container">
        <CreatePost />
      </div>
    );
  }
}
export default App;
