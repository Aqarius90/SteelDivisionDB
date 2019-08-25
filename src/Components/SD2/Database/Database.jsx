import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UnitDB from "./UnitDB";

function Database({ DB }) {
  const [filterParams, setFilterParams] = useState("");
  const [filterListUnit, setFilterlist] = useState(DB.Units); //check the derivation
  let handleChange = event => {
    setFilterParams(event.target.value);
  };

  let filter = () => {
    console.log("setFilterlist");
    let x = DB.Units.filter(e => {
      return (
        e.Descriptor !== "-" &&
        (e.Name.includes(filterParams.filterText) ||
          e.Decks.includes(filterParams.filterText) ||
          e.Optics.includes(filterParams.filterText))
      ); //||
      //e.Weapons.Descriptor.includes(filterParams.filterText)) //wront, but fine for now
    });
    console.log(x);
    setFilterlist(x);
  };

  let clearFilter = () => {
    setFilterParams({
      filterText: "",
      priceRange: [0, 999]
    });
    filter();
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-10">
          <input
            className="form-control"
            value={filterParams}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="col-2">
          <button
            className="btn btn-block btn-primary"
            onClick={() => filter()}
          >
            Filter
          </button>
        </div>
      </div>
      <Tabs className="card">
        <TabList>
          <Tab>Unit</Tab>
          <Tab>Weapon</Tab>
        </TabList>
        <TabPanel>
          <UnitDB filterList={filterListUnit} />
        </TabPanel>
        <TabPanel />
      </Tabs>
    </React.Fragment>
  );
}

export default Database;
