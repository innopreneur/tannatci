import React from "react";
import { Container, Row, Col, ButtonGroup } from "react-bootstrap";
import CButton from "./CButton";
import "./Navbar.css";
import Orders from "./Orders";
import Balances from "./Balances";
import axios from "axios";

const OPEN_ORDERS = "Open Orders";
const CLOSED_ORDERS = "Closed Orders";
const CANCELED_ORDERS = "Canceled Orders";

const BALANCE = "Balance";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Balance",
      trades: []
    };
  }

  componentDidMount() {
    axios.get(`api/${this.props.account}`).then(res => {
      this.setState({ trades: res.data.trades });
    });
  }

  handleClick(value) {
    this.setState({
      selected: value.target.innerText
    });
  }

  formatTypes(selection) {
    switch (selection) {
      case OPEN_ORDERS:
        return "open";
      case CLOSED_ORDERS:
        return "closed";
      case CANCELED_ORDERS:
        return "canceled";
      default:
        return "open";
    }
  }

  _renderBalances() {
    return <Balances ethBalance={this.props.ethBalance} />;
  }

  _renderOrders() {
    return (
      <Orders
        type={this.formatTypes(this.state.selected)}
        trs={this.state.trades}
      />
    );
  }

  render() {
    return (
      <Container className="navbar-container">
        <Row>
          <Col lg={12}>
            <ButtonGroup size="lg">
              <CButton
                variant={
                  this.state.selected == BALANCE ? "dark" : "outline-dark"
                }
                id="balance"
                onClick={this.handleClick.bind(this)}
              >
                {BALANCE}
              </CButton>
              <CButton
                variant={
                  this.state.selected == OPEN_ORDERS ? "dark" : "outline-dark"
                }
                id="open"
                onClick={this.handleClick.bind(this)}
              >
                {OPEN_ORDERS}
              </CButton>
              <CButton
                variant={
                  this.state.selected == CLOSED_ORDERS ? "dark" : "outline-dark"
                }
                id="closed"
                onClick={this.handleClick.bind(this)}
              >
                {CLOSED_ORDERS}
              </CButton>

              <CButton
                variant={
                  this.state.selected == CANCELED_ORDERS
                    ? "dark"
                    : "outline-dark"
                }
                id="canceled"
                onClick={this.handleClick.bind(this)}
              >
                {CANCELED_ORDERS}
              </CButton>
            </ButtonGroup>
          </Col>
        </Row>
        {this.state.selected == BALANCE
          ? this._renderBalances()
          : this._renderOrders()}
      </Container>
    );
  }
}
