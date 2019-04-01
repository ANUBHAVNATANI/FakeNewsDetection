import React, { Component } from "react";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs";
import CreateComment from "./createComment";
import {
  Segment,
  Button,
  Item,
  Header,
  Icon,
  Form,
  Divider,
  Image,
  Grid,
  Label,
  Loader
} from "semantic-ui-react";

class CreatePost extends Component {
  state = {
    post: "",
    embedModel: null,
    postModel: null,
    label: null,
    embeding: null,
    posts: [],
    loadSit: false
  };

  async embed() {
    //embedding code here
    let post = this.state.post;
    let embed_m = await this.state.embedModel;

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
        <Segment raised>
          <React.Fragment>
            <Item key={index.toString()}>
              <Grid>
                <Grid.Column width={4}>
                  <Image
                    src="https://semantic-ui.com/images/avatar/large/justen.jpg"
                    fluid
                  />
                </Grid.Column>
                <Grid.Column width={9}>
                  <Item.Content>
                    <Header as="h2" dividing>
                      Fake Or Real Gossip You Know?
                    </Header>

                    <Item.Description>
                      <Header size="medium">{post}</Header>
                      <Header as="h5" disabled>
                        Checked by an Intelligent Model using tfjs(don't worry
                        about title)
                      </Header>
                    </Item.Description>
                  </Item.Content>

                  <Divider hidden />
                  <CreateComment key={index.toString()} />
                </Grid.Column>
              </Grid>
            </Item>
          </React.Fragment>
        </Segment>
      </div>
    ));
    return [listItems];
  };
  componentDidUpdate() {
    //console.log(this.state);
    // if (this.state.embeding !== null) {
    //   this.predict();
    // }
  }
  renderLoader = loaderStatus => {
    if (loaderStatus) {
      return <Loader active inline />;
    }
    return <div />;
  };
  onFormSubmit = async event => {
    //console.log("Came here");
    event.preventDefault();
    //this.setState({ finalPost: this.state.post });
    //this.setState({ commentToBeChecked: this.state.comment });
    if (this.state.post !== "") {
      this.setState({ label: null });
      this.setState({ loadSit: true });
      await this.embed();
      await this.predict();
      if (this.state.label === "real") {
        this.setState({
          posts: [this.state.post, ...this.state.posts]
        });
      }
      this.setState({
        post: ""
      });
      this.setState({ loadSit: false });
      //console.log(this.state);
      //this.predict();
    }
  };
  //console.log("hey i am invoked");

  renderLabel = () => {
    const label = this.state.label;
    if (label !== null) {
      if (label === "fake") {
        return (
          <Label color={"red"} size={"large"}>
            {" "}
            {label}
          </Label>
        );
      } else {
        return (
          <Label color={"green"} size={"large"}>
            {" "}
            {label}
          </Label>
        );
      }
    }
    return null;
  };
  render() {
    return (
      <div>
        <Item.Group>
          <Header as="h2" icon textAlign="center">
            <Icon name="users" circular />
            <Header.Content>Fake Gossip</Header.Content>
          </Header>

          <Segment raised>
            <Form onSubmit={this.onFormSubmit}>
              <Form.Field>
                <Form.TextArea
                  label="Gossip"
                  placeholder="Spread your gossip!!"
                  onChange={event => {
                    this.setState({ post: event.target.value });
                  }}
                  value={this.state.post}
                />
              </Form.Field>

              <Button
                content="Add Gossip"
                labelPosition="left"
                icon="edit"
                type="submit"
                primary
              />
              {this.renderLabel()}
              {this.renderLoader(this.state.loadSit)}
            </Form>
          </Segment>
          {this.renderPostList(this.state.posts)}
        </Item.Group>
      </div>
    );
  }
}

export default CreatePost;
