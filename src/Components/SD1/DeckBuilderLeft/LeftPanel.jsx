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
              DB={this.props.Honey.DB}
              Deck={this.props.Honey.DeckBuilder.Deck}
              fset={this.props.Honey.DeckBuilder.API.setDeck}
            />
          </TabPanel>
          <TabPanel>
            <DeckGrid
              DB={this.props.Honey.DB}
              DeckUnits={this.props.Honey.DeckBuilder.DeckUnits}
              f={this.props.Honey.DeckBuilder.API}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.Honey.DB}
              DeckUnits={this.props.Honey.DeckBuilder.DeckUnits[0]}
              DBUnits={this.props.Honey.DeckBuilder.DBUnits[0]}
              f={this.props.Honey.DeckBuilder.API}
              header={"Recon"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.Honey.DB}
              DeckUnits={this.props.Honey.DeckBuilder.DeckUnits[1]}
              DBUnits={this.props.Honey.DeckBuilder.DBUnits[1]}
              f={this.props.Honey.DeckBuilder.API}
              header={"Infantry"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.Honey.DB}
              DeckUnits={this.props.Honey.DeckBuilder.DeckUnits[2]}
              DBUnits={this.props.Honey.DeckBuilder.DBUnits[2]}
              f={this.props.Honey.DeckBuilder.API}
              header={"Tanks"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.Honey.DB}
              DeckUnits={this.props.Honey.DeckBuilder.DeckUnits[3]}
              DBUnits={this.props.Honey.DeckBuilder.DBUnits[3]}
              f={this.props.Honey.DeckBuilder.API}
              header={"Support"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.Honey.DB}
              DeckUnits={this.props.Honey.DeckBuilder.DeckUnits[4]}
              DBUnits={this.props.Honey.DeckBuilder.DBUnits[4]}
              f={this.props.Honey.DeckBuilder.API}
              header={"Anti-Tank"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.Honey.DB}
              DeckUnits={this.props.Honey.DeckBuilder.DeckUnits[5]}
              DBUnits={this.props.Honey.DeckBuilder.DBUnits[5]}
              f={this.props.Honey.DeckBuilder.API}
              header={"Anti-Air"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.Honey.DB}
              DeckUnits={this.props.Honey.DeckBuilder.DeckUnits[6]}
              DBUnits={this.props.Honey.DeckBuilder.DBUnits[6]}
              f={this.props.Honey.DeckBuilder.API}
              header={"Artillery"}
            />
          </TabPanel>
          <TabPanel>
            <UnitPicker
              DB={this.props.Honey.DB}
              DeckUnits={this.props.Honey.DeckBuilder.DeckUnits[7]}
              DBUnits={this.props.Honey.DeckBuilder.DBUnits[7]}
              f={this.props.Honey.DeckBuilder.API}
              header={"Planes"}
            />
          </TabPanel>
          <TabPanel>
            <RandomizePanel
              DB={this.props.Honey.DB}
              RandomizerDecks={this.props.Honey.DeckBuilder.RandomizerDecks}
              f={this.props.Honey.DeckBuilder.API}
            />
          </TabPanel>
        </Tabs>
      </React.Fragment>
    );
  }
}

export default LeftPanel;
