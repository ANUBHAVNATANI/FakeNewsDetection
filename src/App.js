//new app.js code
import React, { Component } from "react";
//import CreateComment from "./components/createComment";
import CreatePost from "./components/createPost";
import { Container } from "semantic-ui-react";
class App extends Component {
  state = {};
  render() {
    return (
      <Container>
        <CreatePost />
      </Container>
    );
  }
}
export default App;
