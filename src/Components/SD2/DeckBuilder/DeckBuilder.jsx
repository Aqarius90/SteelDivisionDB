import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DivisionSelector from "./DivisionSelector";
import DeckGrid from "./DeckGrid";
import UnitPanel from "./UnitPanel";
import Randomizer from "./Randomizer";
import { useParams } from "react-router-dom";

function DeckBuilder({ DB, Deck, API }) {
  //the unit to show in right hand side
  const [sideShow, setSideShow] = useState(null);

  let getShowable = type => {
    let listables = [];
    let valids = Deck.Units.filter(e => e.Key.Factory === type);
    valids.forEach(e => {
      //for units in category
      listables.push({ u: e, t: false }); //no transport
      e.Value.AvailableTransportList.forEach(f => {
        if (f) {
          listables.push({
            u: e, //transports
            t: Deck.Transports.find(
              g => g.Key.UnitDescriptor === f.trim().slice(18)
            )
          });
        }
      });
    });
    return listables;
  };
  return (
    <div className="card">
      <DecodeHeader Deck={Deck} API={API} />
      <Tabs className="card" defaultIndex={DB ? 1 : 0}>
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
        </TabList>

        <TabPanel>
          <DivisionSelector Decks={DB} setDeck={API.setDeck} />
        </TabPanel>
        <TabPanel>
          <DeckGrid Deck={Deck} setIncome={API.setIncome} />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            UnitPairs={getShowable("Recons")}
            Index={0} //*for CardRow
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            UnitPairs={getShowable("Infantry")}
            Index={1}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            UnitPairs={getShowable("Tanks")}
            Index={2}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            UnitPairs={getShowable("Support")}
            Index={3}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            UnitPairs={getShowable("AT")}
            Index={4}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            UnitPairs={getShowable("DCA")}
            Index={5}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            UnitPairs={getShowable("Art")}
            Index={6}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            UnitPairs={getShowable("Planes")}
            Index={7}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <UnitPanel
            Deck={Deck}
            API={API}
            UnitPairs={getShowable("Defense")}
            Index={8}
            sideShow={sideShow}
            setShow={setSideShow}
          />
        </TabPanel>
        <TabPanel>
          <Randomizer DB={DB} randomFill={API.randomFill}></Randomizer>
        </TabPanel>

        {/*<TabPanel>
          {<StatsPanel Deck={Deck} setIncome={API.setIncome} />}
        </TabPanel>*/}
      </Tabs>
    </div>
  );
}

function DecodeHeader({ Deck, API }) {
  const [isFirst, setIsFirst] = useState(true);
  let params = useParams();
  if (isFirst && params.code) {
    API.decode(params.code);
    setIsFirst(false);
  }

  /*lets you type into the input without polluting the Deck object with false data*/
  const [code, setCode] = useState("");
  const [realCode, setRealCode] = useState(Deck.DeckCode);
  if (realCode !== Deck.DeckCode) {
    /*realCode is the actual deck code. code is just the shown one
     *when deckcode disagrees with realcode, the deck was changed, everything syncs*/
    setCode(Deck.DeckCode);
    setRealCode(Deck.DeckCode);
  }

  let handleChange = event => {
    setCode(event.target.value);
  };
  return (
    <>
      <div className="row card-body">
        <div className="col-xl-3 col-md-8 order-1">
          <h3>
            {Deck.DivisonName} :{Deck.ActivPts}/{Deck.MaxActivationPoints}
          </h3>
        </div>
        <div className="col-xl-7 col-md-12 order-xl-2 order-md-4">
          <input
            className="form-control"
            value={code}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="col order-xl-3 order-md-2">
          <button className="btn btn-block" onClick={() => API.decode(code)}>
            Decode
          </button>
        </div>
        <div className="col order-xl-4 order-md-3">
          <button className="btn btn-block" onClick={() => API.clear()}>
            Clear
          </button>
        </div>
      </div>
    </>
  );
}

export default DeckBuilder;
