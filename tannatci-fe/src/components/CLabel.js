import React from "react";
import { Form } from "react-bootstrap";

export default class CLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label
    };
  }

  render() {
    return (
      <Form>
        <Form.Label>{this.state.label}</Form.Label>
      </Form>
    );
  }
}
