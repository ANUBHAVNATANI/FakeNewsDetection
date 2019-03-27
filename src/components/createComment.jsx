/*
import React, { Component } from "react";
 
import { Form, TextField,TextareaField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';
//import {reactLocalStorage} from 'reactjs-localstorage';

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
      },
    message: {
        type: String,
        required: true
      }
})


//comment form class
class CommentForm extends Component {
 
    constructor(props) {
        super(props);
        this.state = {labelsToShow:[],
                      cleanComment:[],
                      error:false};
        this.submitMethod = this.submitMethod.bind(this);
      }
  
  componentDidMount(){

      //reactLocalStorage.setObject('stateC',this.state)
      this.props.addComment(this.state.cleanComment);
}


//gives true result which has value greater than thershold
//perticular lables are included
async submitMethod(text) {
  const threshold = 0.9;
  const labelsToInclude = ['identity_attack','insult','threat','toxicity'];
  //console.log("in the submission method");
  //loading the model
  let model;
  model = await toxicity.load(threshold,labelsToInclude);
  //console.log("Successfully loaded the model");

  const comment = [text.message];
  const result = await model.classify(comment);
  //console.log(result);
  let n=0;
  let c = []
  while(n<4){
      if(result[n].results[0].match===true){
          c.push(result[n].label);
      }
      n = n+1;
  }
  //console.log(c);
  //console.log(c.length);
  let d = text.message;
  let e = this.state.labelsToShow;
  let temparr = [c,d];
  e.push(temparr);
  //console.log(e);
  if(c.length !== 0){
    
  this.setState({
    labelsToShow:e
  });
}
else{
    this.setState({
        cleanComment:d
    });
}
  console.log(this.state);
}
//handling errors of the commenting 
errorMethod = (errors,model) =>{
  //error handling
  console.log(errors.name);
}

  render() {
    return (
        <Form onSubmit={this.submitMethod}
            onError={this.errorMethod}
            Schema={commentSchema}
            >
          <div className="form-group">
            <TextField
              className="form-control"
              placeholder="😎 Your Name"
              name="name"
              type="text"
            />
          </div>

          <div className="form-group">
            <TextareaField
              className="form-control"
              placeholder="🤬 Your Comment"
              name="message"
            />
          </div>
        <div className="form-group">
            <SubmitField value="Comment" className="btn btn-primary" />
        </div>
        </Form>
    );
  }
}
export default CommentForm;

*/

import React, { Component } from "react";
import * as toxicity from "@tensorflow-models/toxicity";

class CreateComment extends Component {
  state = {
    comment: "",
    label: [],
    model: null,
    commentToBeChecked: ""
  };

  async predict() {
    let net = await this.state.model;
    let comment = this.state.commentToBeChecked;
    const result = await net.classify([comment]);
    return result;
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

    const model = this.state.model;
    const comment = this.state.commentToBeChecked;
    //console.log(model);
    //console.log(comment);

    if (model !== null && comment !== "") {
      this.predict().then(result => {
        let n = 0;
        let c = [];
        while (n < 4) {
          if (result[n].results[0].match === true) {
            c.push(result[n].label);
          }
          n = n + 1;
        }
        console.log(c);
      });

      //const data = [comment];
      //const result = model.classify(data);
      //console.log(result);
    }
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
  onFormSubmit = event => {
    //console.log("Came here");
    this.setState({ commentToBeChecked: this.state.comment });
    event.preventDefault();
    //console.log("hey i am invoked");
  };

  render() {
    return (
      <div>
        <form className="ui reply form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <textarea
              value={this.state.comment}
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
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateComment;
