import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UnitHeader from "./UnitHeader";
import UnitModules from "./UnitModules";

function UnitDisplay({ Pack, show, add }) {
  if (Pack === null || Pack === undefined) {
    return <div />;
  } else {
    if (Pack.t) {
      return (
        <Tabs className="card popup-unit">
          <UnitHeader Pack={Pack} show={show} add={add} />
          <TabList>
            <Tab>Unit</Tab>
            <Tab>Transport</Tab>
          </TabList>
          <TabPanel>
            <UnitModules x={Pack.u} />
          </TabPanel>
          <TabPanel>
            <UnitModules x={Pack.t} />
          </TabPanel>
        </Tabs>
      );
    }
    return (
      <Tabs className="card popup-unit">
        <UnitHeader Pack={Pack} show={show} add={add} />
        <TabList>
          <Tab>Unit</Tab>
        </TabList>
        <TabPanel>
          <UnitModules x={Pack.u} />
        </TabPanel>
      </Tabs>
    );
  }
}
export default UnitDisplay;
