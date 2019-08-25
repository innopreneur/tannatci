import React from "react";
import { Dropdown } from "react-bootstrap";

export default class CDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: props.title
    };
  }

  updateSelected(action) {
    this.props.onSelect(action);
    this.setState({ action });
  }

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant={this.props.variant} id="dropdown-basic">
          {this.state.action}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {this.props.actions.map((item, id) => {
            return (
              <Dropdown.Item
                onSelect={this.updateSelected.bind(this, item)}
                key={id}
                id={item}
              >
                {item}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
