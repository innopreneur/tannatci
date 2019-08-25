import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CDropDown from "./CDropDown";
import CInput from "./CInput";
import CLabel from "./CLabel";
import CButton from "./CButton";
import "./NewOrder.css";

let typeOfTrades = {
  title: "Buy",
  actions: ["Buy", "Sell"],
  variant: "outline-danger"
};

let tokens = {
  title: "ETH",
  actions: ["ETH", "DAI", "OCEAN", "LOOM"],
  variant: "outline-success"
};

let condition = {
  title: "goes up by",
  actions: ["goes up by", "goes down by"],
  variant: "outline-secondary"
};

let fromAmount = {
  placeholder: "0.0"
};

let changePercent = {
  placeholder: "5.0"
};

let changePeriod = {
  title: "24 hours",
  actions: ["24 hours", "7 days"],
  variant: "outline-primary"
};

let createOrderProps = {
  variant: "dark",
  size: "lg"
};

export default class NewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromAmount: "0.0",
      changePercent: "5.0",
      changePeriod: "24 hours",
      tradeType: "Buy",
      fromToken: "ETH",
      toToken: "ETH",
      condtion: "goes up by"
    };
  }

  getFromAmount(value) {
    this.setState({
      ...this.state,
      fromAmount: value
    });
  }

  getChangePercent(value) {
    this.setState({
      ...this.state,
      changePercent: value
    });
  }

  getChangePeriod(value) {
    this.setState({
      ...this.state,
      changePeriod: value
    });
  }

  getTradeType(value) {
    this.setState({
      ...this.state,
      tradeType: value
    });
  }

  getFromToken(value) {
    this.setState({
      ...this.state,
      fromToken: value
    });
  }

  getToToken(value) {
    this.setState({
      ...this.state,
      toToken: value
    });
  }

  getCondition(value) {
    this.setState({
      ...this.state,
      condition: value
    });
  }

  processOrder() {
    //TODO
  }

  submitOrder() {
    console.log(this.state);
    let url = `http://4a722a21.ngrok.io/api/trade/${this.props.currentAccount}`;
    let body = this.processOrder();
    //TODO fetch
  }

  render() {
    return (
      <Container className="new-order-container">
        <Row className="new-order-form">
          <Col>
            <CDropDown
              onSelect={this.getTradeType.bind(this)}
              {...typeOfTrades}
            />
          </Col>
          <Col>
            <CInput onChange={this.getFromAmount.bind(this)} {...fromAmount} />
          </Col>
          <Col>
            <CDropDown onSelect={this.getFromToken.bind(this)} {...tokens} />
          </Col>
          <Col lg={2.1}>
            <CLabel label="as soon as the price of" />
          </Col>
          <Col>
            <CDropDown onSelect={this.getToToken.bind(this)} {...tokens} />
          </Col>
          <Col>
            <CDropDown onSelect={this.getCondition.bind(this)} {...condition} />
          </Col>
          <Col lg={1}>
            <CInput
              onChange={this.getChangePercent.bind(this)}
              {...changePercent}
            />
          </Col>
          <Col>
            <CLabel label="% within the last" />
          </Col>
          <Col>
            <CDropDown
              onSelect={this.getChangePeriod.bind(this)}
              {...changePeriod}
            />
          </Col>
        </Row>
        <Row className="create-order-btn">
          <Col>
            <CButton
              onClick={this.props.onSubmit}
              // onClick={this.submitOrder.bind(this)}
              {...createOrderProps}
            >
              Create Order
            </CButton>
          </Col>
        </Row>
      </Container>
    );
  }
}
