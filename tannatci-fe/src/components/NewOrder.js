import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CDropDown from "./CDropDown";
import CInput from "./CInput";
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
  variant: "outline-warning"
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

  processOrder(order) {
    let newOrder = {};
    newOrder['type'] = order.tradeType;
    newOrder['from'] = order.fromToken;
    newOrder['to'] = order.toToken;
    newOrder['amount'] = order.fromAmount;
    if(order.condition == 'goes up by'){
      newOrder['percentage'] = order.changePercent;
    } else {
      newOrder['percentage'] = `-${order.changePercent}`;
    }
    newOrder['timeFrame'] = '24h';
    return newOrder;
  }

  submitOrder() {
    let order = this.processOrder(this.state);
    this.props.onSubmit(order);
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
            <h5>as soon as the price of</h5>
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
            <h5>% within</h5>
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
              onClick={this.submitOrder.bind(this)}
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
