import React, { Component } from "react";
import * as toxicity from '@tensorflow-models/toxicity'; 
import { Form, TextField,TextareaField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';
import {reactLocalStorage} from 'reactjs-localstorage';

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
    
      reactLocalStorage.setObject('stateC',this.state)
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
  //console.log(this.state);
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