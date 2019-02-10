import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs";




async function loadModel(){
  let model = await tf.loadModel("http://s000.tinyupload.com/index.php?file_id=19723243508837339565");
  const pred = model.predict([1,4,5,6]).dataSync();
  console.log(pred);
  return model
}
/*
function predict(){
  //let c = loadModel();
  //const pred = c.predict([1,4,5,6]).dataSync();
  console.log(pred);
}
*/
class App extends Component {
  
  
  render() {
    return (
      <div>
        <div>
          Tfjs try
          </div>
          <div>
          <form>
            <button onClick={loadModel()} />
            </form>          
          </div>
      </div>
    );
  }
}

export default App;
