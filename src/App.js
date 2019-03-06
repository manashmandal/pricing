import React, { Component } from 'react';
import logo from './logo.svg';
import { Select, Button, Row, Col, Card, Tag } from 'antd';
import './App.css';

const Option = Select.Option;

const data = require('./data.json');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: "inside-dhaka",
      area: "Mirpur DOHS",
      weight: "1kg",
      weights: ["1kg", "2kg", "3kg"],
      data: data,
      selectedArea: [],
      cod: "",
      pricing: ""
    }
  }

  render() {
    return (
      <div className="App">
      <h1>ডেলিভারি চার্জ ক্যালকুলেটর</h1>
      <br></br>
          <Row gutter={24}>
              <Col span={6}>
                <Select showSearch
                        style={{width: 200}}
                        placeholder="Select Location"
                        onChange={(value) => this.setState({ location: value, selectedArea: 
                         Array.from(new Set(this.state.data[value].locations))  
                        })}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                          { Object.keys(this.state.data).map(l => <Option key={l} value={l}>{l}</Option>) }
                        </Select>
              </Col>

              <Col span={6}>
                <Select showSearch
                        style={{width: 200}}
                        placeholder="Select Area"
                        onChange={(value) => this.setState({ area: value })}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                          { this.state.selectedArea.map(l => <Option key={l} value={l}>{l}</Option>) }
                        </Select>
              </Col>

              <Col span={6}>
                <Select showSearch
                        style={{width: 200}}
                        placeholder="Select Weight"
                        onChange={(value) => this.setState({ weight: value })}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                          { this.state.weights.map(l => <Option key={l} value={l}>{l}</Option>) }
                        </Select>
              </Col>

              <Col span={6}>
                  <Button onClick={()=> { 
                          this.setState({
                            pricing: this.state.data[this.state.location].pricing[this.state.weight],
                            cod: this.state.data[this.state.location].cod
                          })
                   }} type="primary">Calculate</Button>
              </Col>
          </Row>
          <br></br>
          <br></br>
          <Row gutter={16}>
          <Card style={{width: "100vh", position: "relative", margin: "auto"}}>
              <h1>{ this.state.pricing !== "" && `আপনার ডেলিভারি চার্জ ৳${this.state.pricing} + ${this.state.cod} COD`}</h1>
            </Card>
          </Row>
      </div>
    );
  }
}

export default App;
