import React from "react";
import { Button, Typography } from "@mui/material";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.nextButtonHandler = this.nextButtonHandler.bind(this);
    this.stateList = [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ];

    this.columnDefs = [
      { field: "date" },
      { field: "positive" },
      { field: "probableCases" },
      { field: "negative" },
    ];

    this.state = {
      data: [],
      currentState: 0,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.covidtracking.com/v1/states/${this.stateList[
          this.state.currentState].toLowerCase()}/daily.json`).then((res) => this.setState({ data: res.data }));
  }

  nextButtonHandler(e) {
    let index = this.state.currentState + (e.target.id === "next" ? 1 : -1);
    if (index < 0) {
      index = this.stateList.length - 1;
    } else if (index >= this.stateList.length) {
      index = 0;
    }
    axios
      .get(
        `https://api.covidtracking.com/v1/states/${this.stateList[index].toLowerCase()}/daily.json`).then((res) => this.setState({ data: res.data, currentState: index }));
  }

  render() {
    return (
      <div className="App">
        <Typography variant="h4" sx={{ color: "blue" }}>
          {`State: ${this.stateList[this.state.currentState]}`}
        </Typography>
        <div className="ag-theme-alpine" style={{ height: 700, width: 900 }}>
          <AgGridReact
            rowData={this.state.data}
            columnDefs={this.columnDefs}
          ></AgGridReact>
        </div>

        <div className="btnContainer">
          <Button
            variant="contained"
            id="prev"
            sx={{ margin: "10px" }}
            onClick={this.nextButtonHandler}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            id="next"
            sx={{ margin: "10px", width: "107px" }}
            onClick={this.nextButtonHandler}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
