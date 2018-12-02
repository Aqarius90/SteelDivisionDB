import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DeckGrid from "./DeckGrid";
import UnitPicker from "./UnitPicker";
import "react-tabs/style/react-tabs.css";
import DivisionsSelector from "./DivisionsSelector";
import RandomizePanel from "./RandomizePanel";

class LeftPanel extends Component {
  render() {
    return (
      //unfortunately, all Tabs components
      // have to be returned as a single piece,
      //so, no modularity there
      <React.Fragment>
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
            <Tab>Randomizer</Tab>
          </TabList>

          <TabPanel>
            <DivisionsSelector
              DB={this.props.DB}
              Deck={this.props.Deck}
              fset={this.props.f.setDeck}
            />
          </TabPanel>
          <TabPanel>
            <DeckGrid
              DB={this.props.DB}
              DeckUnits={this.props.DeckUnits}
              f={this.props.f}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.DB}
              DeckUnits={this.props.DeckUnits[0]}
              DBUnits={this.props.DBUnits[0]}
              f={this.props.f}
              header={"Recon"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.DB}
              DeckUnits={this.props.DeckUnits[1]}
              DBUnits={this.props.DBUnits[1]}
              f={this.props.f}
              header={"Infantry"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.DB}
              DeckUnits={this.props.DeckUnits[2]}
              DBUnits={this.props.DBUnits[2]}
              f={this.props.f}
              header={"Tanks"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.DB}
              DeckUnits={this.props.DeckUnits[3]}
              DBUnits={this.props.DBUnits[3]}
              f={this.props.f}
              header={"Support"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.DB}
              DeckUnits={this.props.DeckUnits[4]}
              DBUnits={this.props.DBUnits[4]}
              f={this.props.f}
              header={"Anti-Tank"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.DB}
              DeckUnits={this.props.DeckUnits[5]}
              DBUnits={this.props.DBUnits[5]}
              f={this.props.f}
              header={"Anti-Air"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.DB}
              DeckUnits={this.props.DeckUnits[6]}
              DBUnits={this.props.DBUnits[6]}
              f={this.props.f}
              header={"Artillery"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.DB}
              DeckUnits={this.props.DeckUnits[7]}
              DBUnits={this.props.DBUnits[7]}
              f={this.props.f}
              header={"Planes"}
            />
          </TabPanel>
          <TabPanel>
            <RandomizePanel
              DB={this.props.DB}
              RandomizerDecks={this.props.RandomizerDecks}
              f={this.props.f}
            />
          </TabPanel>
        </Tabs>
      </React.Fragment>
    );
  }
}

export default LeftPanel;
