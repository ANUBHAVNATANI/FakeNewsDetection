import React, { Component } from "react";
import * as toxicity from "@tensorflow-models/toxicity";

class CreateComment extends Component {
  state = {
    comment: "",
    label: [],
    model: null,
    comments: []
  };

  async predict() {
    let net = await this.state.model;
    let comment = this.state.comment;
    const result = await net.classify([comment]);
    let n = 0;
    let c = [];
    while (n < 4) {
      if (result[n].results[0].match === true) {
        c.push(result[n].label);
      }
      n = n + 1;
    }
    if (c.length === 0) {
      this.setState({ label: ["clean"] });
    } else {
      this.setState({ label: c });
    }
  }
  componentDidMount() {
    //console.log("got here");
    //load the tfjs model here
    const threshold = 0.9;
    const labelsToInclude = ["identity_attack", "insult", "threat", "toxicity"];
    //loading the model

    let model = toxicity.load(threshold, labelsToInclude);
    //console.log("Successfully loaded the model");
    //const result = model.classify(["You sick"]);
    //console.log(result);

    this.setState({
      model: model
    });
  }

  componentDidUpdate() {
    //updation after the set state method
    //console.log(this.state);
    //console.log(model);
    //console.log(comment);
    //const data = [comment];
    //const result = model.classify(data);
    //console.log(result);
  }

  //helper function
  /*
  onCommentEnter(event) {
    console.log(event.target.value);
  }
  */
  /*
  onCommentClick(event) {
    console.log("Comment clicked");
  }
  */
  onFormSubmit = async event => {
    //console.log("Came here");
    event.preventDefault();
    //this.setState({ commentToBeChecked: this.state.comment });
    this.setState({ label: [] });
    await this.predict();
    if (this.state.label[0] === "clean") {
      this.setState({
        comments: [...this.state.comments, this.state.comment]
      });
    }

    //console.log("hey i am invoked");
  };
  renderCommentList = comments => {
    const listItems = comments.map((comment, index) => (
      <div>
        <li key={index.toString()}>{comment}</li>
      </div>
    ));
    return <ul>{listItems}</ul>;
  };
  renderLabel = () => {
    const numbers = [1, 2, 3, 4];
    const labels = this.state.label;
    if (labels !== 0) {
      const labelItems = labels.map((l, i) => (
        <button
          className="ui negative basic button"
          key={numbers[i].toString()}
        >
          <i className="icon exclamation triangle" />
          {l}
        </button>
      ));
      return labelItems;
    }
  };
  render() {
    return (
      <div>
        {this.renderCommentList(this.state.comments)}
        <form className="ui reply form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <textarea
              rows="2"
              value={this.state.comment}
              placeholder="🤬 Your Comment"
              onChange={event => {
                this.setState({ comment: event.target.value });
              }}
            />
          </div>

          <button
            className="ui primary submit labeled icon button"
            type="submit"
          >
            <i className="icon edit" />
            Comment
          </button>
          {this.renderLabel()}
        </form>
      </div>
    );
  }
}

export default CreateComment;
