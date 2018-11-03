import React, { Component } from 'react';

import '../App.css';

class ConfirmationButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="p-a-m">
        <p className="warning-text">Are you sure you want to delete {this.props.elementToDelete}?</p>
        <div className="float-right">
          <button className="button button-primary m-r-s" onClick={this.props.deleteElement}>Yes</button>
          <button className="button button-secondary" onClick={this.props.toggleConfirmation}>No</button>
        </div>
      </div>
    )
  }
}

export default ConfirmationButton;