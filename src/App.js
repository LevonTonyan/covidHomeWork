import React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid} from 'recharts'
import "./App.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";

import { Button, Typography,CircularProgress } from '@mui/material';


class App extends React.Component {
  constructor(props) {
    super(props);
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

    this.nextButtonHandler = this.nextButtonHandler.bind(this);

    this.state = {
      data: [],
      currentState: 0,
      isLoading:false
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.covidtracking.com/v1/states/${this.stateList[
          this.state.currentState].toLowerCase()}/daily.json`).then((r) => {
            let data = [];
            for(let i=0;i<r.data.length;i+=40){
              data.push(r.data[i])
            }
            this.setState({data:data})
          })
  }
  nextButtonHandler(e) {
    this.setState({ isLoading:true });
    let index = this.state.currentState + (e.target.id === "next" ? 1 : -1);
    if (index < 0) {
      index = this.stateList.length - 1;
    } else if (index >= this.stateList.length) {
      index = 0;
    }
 
    axios
      .get(
        `https://api.covidtracking.com/v1/states/${this.stateList[index].toLowerCase()}/daily.json`).then((r) => {
          let data = [];
          for(let i=0;i<r.data.length;i+=40){
            data.push(r.data[i])
          }
          this.setState({data:data, currentState:index, isLoading:false})
        })
        
  }


  render() {
  
    return (
      <div className="App">
         <Typography variant="h4" sx={{ color: "blue", marginLeft:"400px" }} >
          {this.state.isLoading?<CircularProgress/>:this.stateList[this.state.currentState]}
        </Typography>
        
      <LineChart width={800} height={400} data={this.state.data} > 
        <Line type="monotone" stroke="red" dataKey="positive"> </Line>
        <Line type="monotone" stroke="green" dataKey="negative"> </Line>

        <XAxis dataKey="date"/>
        <YAxis/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      </LineChart>



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
