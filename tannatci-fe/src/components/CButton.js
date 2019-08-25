import React from "react";
import { Button } from "react-bootstrap";

export default class CButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button
        variant={this.props.variant}
        size={this.props.size}
        onClick={this.props.onClick.bind(this)}
      >
        {this.props.children}
      </Button>
    );
  }
}
