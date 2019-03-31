import React, { Component } from "react";
import CreatePost from "./createPost";
class PostList extends Component {
  state = { postToShow: [] };
  componentDidUpdate() {
    //console.log(this.props);
    let c = this.props.finalPost;
    let d = this.state.postToShow;
    d = d.push(c);

    //console.log(d);
    /*
    this.setState({
      commentsToShow: d
    });
    */
  }
  onPostCreation() {}
  componentDidMount() {}
  Posts = posts => {
    const listItems = posts.map((post, index) => (
      <li key={index.toString()}>{post}</li>
    ));
    return <ul>{listItems}</ul>;
  };

  render() {
    return (
      <div className="ui divided items">
        {this.Posts(this.state.postToShow)}
      </div>
    );
  }
}

export default PostList;
