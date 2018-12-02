import React, { Component } from "react";
import UnitData from "./UnitModules";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class Pack extends Component {
  render() {
    if (this.props.Pack.TransportUnit === null) {
      return (
        //unfortunately, all Tabs components
        // have to be returned as a single piece,
        //so, no modularity there
        <React.Fragment>
          <Tabs className="card">
            <TabList>
              <Tab>Unit</Tab>
            </TabList>
            <TabPanel>
              <UnitData
                Pack={this.props.Pack}
                Unit={this.props.Pack.Unit}
                fadd={this.props.fadd}
                fhide={this.props.fhide}
              />
            </TabPanel>
          </Tabs>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Tabs className="card">
            <TabList>
              <Tab>Unit</Tab>
              <Tab>Transport</Tab>
            </TabList>
            <TabPanel>
              <UnitData
                Pack={this.props.Pack}
                Unit={this.props.Pack.Unit}
                fadd={this.props.fadd}
                fhide={this.props.fhide}
              />
            </TabPanel>
            <TabPanel>
              <UnitData
                Pack={this.props.Pack}
                Unit={this.props.Pack.TransportUnit}
                fadd={this.props.fadd}
                fhide={this.props.fhide}
              />
            </TabPanel>
          </Tabs>
        </React.Fragment>
      );
    }
  }
}

class RightPanel extends Component {
  showPack = (x, i) => {
    return (
      <Pack
        key={i}
        Pack={x}
        fadd={this.props.fadd}
        fshow={this.props.fshow}
        fhide={this.props.fhide}
      />
    );
  };
  render() {
    if (this.props.UnitsToDisplay.length === 0) {
      return <div />;
    } else {
      return (
        <React.Fragment>
          {this.props.UnitsToDisplay.map(this.showPack)}
        </React.Fragment>
      );
    }
  }
}

export default RightPanel;
