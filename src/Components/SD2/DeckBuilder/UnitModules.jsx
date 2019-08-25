import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function UnitModules(Unit) {
  if (Unit != null) {
    return (
      <Tabs className="card">
        <TabList className="card-header">
          <Tab>Simple</Tab>
          <Tab>Recon</Tab>
          <Tab>Mobility</Tab>
          <Tab>Survivability</Tab>
          <Tab>Aux</Tab>
          <Tab>Air Data</Tab>
          <Tab>Weapons</Tab>
        </TabList>
        <TabPanel>
          <div>UnitModuleSimple</div>
        </TabPanel>
        <TabPanel>
          <div>UnitModuleRecon</div>
        </TabPanel>
        <TabPanel>
          <div>UnitModuleMobility</div>
        </TabPanel>
        <TabPanel>
          <div>UnitModuleSurvivability</div>
        </TabPanel>
        <TabPanel>
          <div>UnitModuleAux</div>
        </TabPanel>
        <TabPanel>
          <div>UnitModuleAir</div>
        </TabPanel>
        <TabPanel>Turret</TabPanel>
      </Tabs>
    );
  }
  return <div />;
}

export default UnitModules;
