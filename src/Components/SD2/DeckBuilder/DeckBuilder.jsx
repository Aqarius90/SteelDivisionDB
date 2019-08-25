import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DivisionSelector from "./DivisionSelector";
import DeckGrid from "./DeckGrid";
import UnitPanel from "./UnitPanel";
import StatsPanel from "./StatsPanel";

function DeckBuilder({ DB, Deck, API }) {
  const [toShow, setShow] = useState(null);
  //<div className="col-xl-2">
  //</div>
  return (
    <Tabs className="card">
      <TabList>
        <Tab>Division</Tab>
        <Tab>Deck</Tab>
        <Tab>Recon</Tab>
        <Tab>Infantry</Tab>
        <Tab>Tanks</Tab>
        <Tab>Support</Tab>
        <Tab>Anti-Tank</Tab>
        <Tab>Anti-Air</Tab>
        <Tab>Artillery</Tab>
        <Tab>Planes</Tab>
        <Tab>Static</Tab>
        <Tab>Randomizer</Tab>
        <Tab>Statistics</Tab>
      </TabList>

      <TabPanel>
        <DivisionSelector Decks={DB.Decks} setDeck={API.setDeck} />
      </TabPanel>
      <TabPanel>
        <DeckGrid Deck={Deck} setIncome={API.setIncome} />
      </TabPanel>
      <TabPanel>
        <UnitPanel
          Deck={Deck}
          API={API}
          Index={0}
          Pack={toShow}
          show={setShow}
        />
      </TabPanel>
      <TabPanel>
        <UnitPanel
          Deck={Deck}
          API={API}
          Index={1}
          Pack={toShow}
          show={setShow}
        />
      </TabPanel>
      <TabPanel>
        <UnitPanel
          Deck={Deck}
          API={API}
          Index={2}
          Pack={toShow}
          show={setShow}
        />
      </TabPanel>
      <TabPanel>
        <UnitPanel
          Deck={Deck}
          API={API}
          Index={3}
          Pack={toShow}
          show={setShow}
        />
      </TabPanel>
      <TabPanel>
        <UnitPanel
          Deck={Deck}
          API={API}
          Index={4}
          Pack={toShow}
          show={setShow}
        />
      </TabPanel>
      <TabPanel>
        <UnitPanel
          Deck={Deck}
          API={API}
          Index={5}
          Pack={toShow}
          show={setShow}
        />
      </TabPanel>
      <TabPanel>
        <UnitPanel
          Deck={Deck}
          API={API}
          Index={6}
          Pack={toShow}
          show={setShow}
        />
      </TabPanel>
      <TabPanel>
        <UnitPanel
          Deck={Deck}
          API={API}
          Index={7}
          Pack={toShow}
          show={setShow}
        />
      </TabPanel>
      <TabPanel>
        <UnitPanel
          Deck={Deck}
          API={API}
          Index={8}
          Pack={toShow}
          show={setShow}
        />
      </TabPanel>
      <TabPanel />
      <TabPanel>
        <StatsPanel Deck={Deck} setIncome={API.setIncome} />
      </TabPanel>
    </Tabs>
  );
}

export default DeckBuilder;
