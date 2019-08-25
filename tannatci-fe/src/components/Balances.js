import React from "react";
import { Container, Row, Table } from "react-bootstrap";
import './Balances.css';


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
                    <tbody>
                    {
                    this.state.balances.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.token}</td>
                                <td>{item.amount}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                    </Table>
                </Row>
                
            </Container>
        )
    }
}
