import React, { Component } from "react";

class CreateComment extends Component {
  state = {
    post: "",
    label: []
  };

  async predict() {
    //api call here
  }
  componentDidMount() {}

  componentDidUpdate() {}

  onFormSubmit = event => {
    //console.log("Came here");
    event.preventDefault();
    //this.setState({ commentToBeChecked: this.state.comment });
    this.setState({ label: [] });
    this.predict();

    //console.log("hey i am invoked");
  };

  renderLabel = () => {
    const labels = this.state.label;
    if (labels !== 0) {
      return (
        <button
          className="ui negative basic button"
          key={numbers[i].toString()}
        >
          <i className="icon exclamation triangle" />
          Fake!
        </button>
      );
    }
  };
  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.onFormSubmit}>
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
          {this.renderLabel()}
        </form>
      </div>
    );
  }
}

export default CreateComment;
