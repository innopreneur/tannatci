import React from "react";
import { Container, Image } from "react-bootstrap";
import "./Account.css";

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <p className="address-label">
          Your address is {this.props.currentAccount}
        </p>
      </Container>
    );
  }
}
