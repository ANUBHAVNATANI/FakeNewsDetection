import React, { Component } from "react";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs";
import CreateComment from "./createComment";

class CreatePost extends Component {
  state = {
    post: "",
    embedModel: null,
    postModel: null,
    label: null,
    embeding: null,
    posts: []
  };

  async embed() {
    //embedding code here
    let embed_m = await this.state.embedModel;
    let post = this.state.post;
    let embedAfter = await embed_m.embed(post);
    let embeding = await embedAfter.data();
    let x = tf.tensor2d(embeding, [1, 512]);
    //embeding = embeding.reshape([1, 512]);
    this.setState({
      embeding: x
    });
  }
  async predict() {
    //api call here
    let model = await this.state.postModel;
    let output = model.predict(this.state.embeding);
    output = await output.data();
    //console.log(output);
    output = output[0];
    //console.log(output);
    if (output <= 0.5) {
      this.setState({
        label: "fake",
        embeding: null
      });
    } else {
      this.setState({
        label: "real",
        embeding: null
      });
    }
  }
  componentDidMount() {
    //loading the embeding model at the mounting of the component

    //let embedModel = use.load();
    let embedModel = use.load();
    //loading the post model at the mounting of the component
    let postModel = tf.loadLayersModel("/models/model.json");

    this.setState({
      embedModel: embedModel,
      postModel: postModel
    });
  }

  renderPostList = posts => {
    const listItems = posts.map((post, index) => (
      <div>
        <li key={index.toString()}>{post}</li>
        <CreateComment key={index.toString()} />
      </div>
    ));
    return <ul>{listItems}</ul>;
  };
  componentDidUpdate() {
    //console.log(this.state);
    // if (this.state.embeding !== null) {
    //   this.predict();
    // }
  }

  onFormSubmit = async event => {
    //console.log("Came here");
    event.preventDefault();
    //this.setState({ finalPost: this.state.post });
    //this.setState({ commentToBeChecked: this.state.comment });
    this.setState({ label: null });
    await this.embed();
    await this.predict();
    if (this.state.label === "real") {
      this.setState({
        posts: [...this.state.posts, this.state.post]
      });
    }
    //console.log(this.state);
    //this.predict();
  };
  //console.log("hey i am invoked");

  renderLabel = () => {
    const label = this.state.label;
    if (label !== null) {
      return (
        <button className="ui negative basic button">
          <i className="icon exclamation triangle" />
          {label}
        </button>
      );
    }
    return null;
  };
  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <textarea
              value={this.state.post}
              onChange={event => {
                this.setState({ post: event.target.value });
              }}
            />
          </div>

          <button
            className="ui primary submit labeled icon button"
            type="submit"
          >
            <i className="icon edit" />
            Post
          </button>
          {this.renderLabel()}
        </form>
        {this.renderPostList(this.state.posts)}
      </div>
    );
  }
}

export default CreatePost;
