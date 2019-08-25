import React from "react";
import { Form } from "react-bootstrap";

export default class CInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.placeholder
    };
  }

  handleChange(value) {
    this.setState({ input: this.refs.input.value });
  }

  render() {
    return (
      <Form>
        <Form.Control
          type="text"
          placeholder={this.state.value}
          onChange={event => this.props.onChange(event.target.value)}
          ref="input"
        />
      </Form>
    );
  }
}
