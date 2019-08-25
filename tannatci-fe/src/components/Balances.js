import React from "react";
import { Container, Row, Table } from "react-bootstrap";
import './Balances.css';


let trs = [
    {
        type: 'BUY',
        amount: 1,
        percentage: -2,
        from: 'ETH',
        to: 'DAI',
        timeFrame: '24h',
        status: 'open'
    },
    {
        type: 'SELL',
        amount: 100,
        percentage: -3.5,
        from: 'OCEAN',
        to: 'DAI',
        timeFrame: '7d',
        status: 'closed'
    }
]

export default class Orders extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            balances: [{token: 'ETH', amount: this.props.ethBalance}]
        }
    }

    render(){
        return (
            <Container className="balance-container">
                <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    {
                    this.state.balances.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.token}</td>
                                <td>{item.amount}</td>
                            </tr>
                        )
                    })}
                    </Table>
                </Row>
                
            </Container>
        )
    }
}
