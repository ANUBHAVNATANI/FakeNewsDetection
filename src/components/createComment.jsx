import React, { Component } from "react";
import * as toxicity from "@tensorflow-models/toxicity";
import { Button, Comment, Form, Label, Loader } from "semantic-ui-react";

class CreateComment extends Component {
  state = {
    comment: "",
    label: [],
    model: null,
    comments: [],
    loadSit: false
  };

  async predict() {
    let net = await this.state.model;
    let comment = this.state.comment;
    const result = await net.classify([comment]);
    let n = 0;
    let c = [];
    //console.log(result);
    while (n < 7) {
      if (result[n].results[0].match === true) {
        c.push(result[n].label);
      }
      n = n + 1;
    }
    //console.log(c);
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
    //loading the model
    /*
    const labelsToInclude = [
      "identity_attack",
      "insult",
      "threat",
      "sexual_explicit",
      "toxicity",
      "obscene"
    ];
    */
    let model = toxicity.load(threshold /*,labelsToInclude*/);
    //console.log("Successfully loaded the model");
    //const result = model.classify(["You sick"]);
    //console.log(result);

    this.setState({
      model: model
    });
  }
  renderLoader = loaderStatus => {
    if (loaderStatus) {
      return <Loader active inline />;
    }
    return <div />;
  };
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
    if (this.state.comment !== "") {
      //this.setState({ commentToBeChecked: this.state.comment });
      this.setState({ label: [] });
      this.setState({ loadSit: true });
      await this.predict();
      if (this.state.label[0] === "clean") {
        this.setState({
          comments: [...this.state.comments, this.state.comment]
        });
      }
      this.setState({
        comment: ""
      });
      //console.log("hey i am invoked");
      this.setState({ loadSit: false });
    }
  };
  renderCommentList = comments => {
    const listItems = comments.map((comment, index) => (
      <div key={index.toString()}>
        <Comment>
          <Comment.Avatar
            as="a"
            src="https://semantic-ui.com/images/avatar/small/joe.jpg"
          />
          <Comment.Content>
            <Comment.Author>Anubhav Natani</Comment.Author>
            <Comment.Text>{comment}</Comment.Text>
            <Comment.Actions />
          </Comment.Content>
        </Comment>
      </div>
    ));
    return [listItems];
  };
  renderLabel = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7];
    const labels = this.state.label;
    //console.log(labels);
    if (labels !== 0) {
      if (labels[0] === "clean") {
        return (
          <Label color={"green"} size={"large"}>
            Clean
          </Label>
        );
      } else {
        const labelItems = labels.map((l, i) => (
          <Label color={"red"} size={"large"} key={numbers[i].toString()}>
            {" "}
            {l}
          </Label>
        ));
        return labelItems;
      }
    }
  };
  render() {
    return (
      <Comment.Group>
        {this.renderCommentList(this.state.comments)}
        <Form reply onSubmit={this.onFormSubmit}>
          <Form.Input
            value={this.state.comment}
            placeholder="🤬 Your Comment"
            onChange={event => {
              this.setState({ comment: event.target.value });
            }}
          />
          <Button
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
          />
          {this.renderLabel()}
          {this.renderLoader(this.state.loadSit)}
        </Form>
      </Comment.Group>
    );
  }
}

export default CreateComment;
