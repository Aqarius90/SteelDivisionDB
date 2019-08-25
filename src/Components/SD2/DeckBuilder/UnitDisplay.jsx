import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UnitHeader from "./UnitHeader";
import UnitModules from "./UnitModules";

function UnitDisplay({ Pack, add }) {
  if (Pack === null || Pack === undefined) {
    return <div />;
  } else {
    let foo = {};
    if (Pack.phase !== undefined) {
      //deck card
      foo.pack = Pack.Pack;
      foo.trans = Pack.Transport;
    } else {
      //new unit
      foo.pack = Pack.pack;
      foo.trans = Pack.trans;
    }
    if (foo.trans.Unit.Descriptor === "-") {
      return (
        <Tabs className="card">
          <UnitHeader Pack={foo} add={add} />
          <TabList>
            <Tab>Unit</Tab>
          </TabList>
          <TabPanel>
            <UnitModules Unit={foo.pack} />
          </TabPanel>
        </Tabs>
      );
    } else {
      return (
        <Tabs className="card">
          <UnitHeader Pack={foo} add={add} />
          <TabList>
            <Tab>Unit</Tab>
            <Tab>Transport</Tab>
          </TabList>
          <TabPanel>
            <UnitModules Unit={foo.pack} />
          </TabPanel>
          <TabPanel>
            <UnitModules Unit={foo.trans} />
          </TabPanel>
        </Tabs>
      );
    }
  }
}
export default UnitDisplay;
