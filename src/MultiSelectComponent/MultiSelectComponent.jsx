import React, { Component } from "react";
import { MDBSelect } from "mdbreact";

class SelectPage extends Component {
  state = {
    options: [
      {
        text: "USA",
        value: "1"
      },
      {
        text: "Germany",
        value: "2"
      },
      {
        text: "France",
        value: "3"
      },
      {
        text: "Poland",
        value: "4"
      },
      {
        text: "Japan",
        value: "5"
      }
    ]
  };

  render() {
    return (
      <div>
        <MDBSelect
          multiple
          search
          options={this.state.options}
          selected="Choose your country"
          selectAll
        />
      </div>
    );
  }
}

export default SelectPage;