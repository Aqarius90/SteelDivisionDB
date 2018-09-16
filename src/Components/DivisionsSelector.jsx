import React, { PureComponent } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

class Division extends PureComponent {
  getPicture = () => {
    let img = "img/d/" + this.props.x.EmblemTexture.toLowerCase() + ".tgv.png";
    return img;
  };

  setDeck = () => {
    this.props.fset(this.props.x);
  };

  render() {
    return (
      <button className="btn" onClick={this.setDeck}>
        <img src={this.getPicture()} className="img-back" alt="unitPortrait" />
      </button>
    );
  }
}

class DivisionsSelector extends PureComponent {
  makeButton = (x, i) => {
    return (
      <div className="col-xl-3" key={i}>
        <Division x={x} fset={this.props.fset} />
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="row card-body">
          <div className="col-xl">
            <Tabs>
              <TabList>
                <Tab>Skirmish</Tab>
                <Tab>Attack</Tab>
                <Tab>Defence</Tab>
              </TabList>
              <TabPanel>
                <div className="row">
                  {this.props.DB.Decks.filter(x => {
                    return x.DivisionNationalite === "Allied";
                  })
                    .filter(x => {
                      return x.DivisionTags.includes("DEFAULT");
                    })
                    .map(this.makeButton)}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="row">
                  {this.props.DB.Decks.filter(x => {
                    return x.DivisionNationalite === "Allied";
                  })
                    .filter(x => {
                      return x.DivisionTags.includes("Attacker");
                    })
                    .map(this.makeButton)}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="row">
                  {this.props.DB.Decks.filter(x => {
                    return x.DivisionNationalite === "Allied";
                  })
                    .filter(x => {
                      return x.DivisionTags.includes("Defender");
                    })
                    .map(this.makeButton)}
                </div>
              </TabPanel>
            </Tabs>
          </div>
          <div className="col-xl">
            <Tabs>
              <TabList>
                <Tab>Skirmish</Tab>
                <Tab>Attack</Tab>
                <Tab>Defence</Tab>
              </TabList>
              <TabPanel>
                <div className="row">
                  {this.props.DB.Decks.filter(x => {
                    return x.DivisionNationalite === "Axis";
                  })
                    .filter(x => {
                      return x.DivisionTags.includes("DEFAULT");
                    })
                    .map(this.makeButton)}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="row">
                  {this.props.DB.Decks.filter(x => {
                    return x.DivisionNationalite === "Axis";
                  })
                    .filter(x => {
                      return x.DivisionTags.includes("Attacker");
                    })
                    .map(this.makeButton)}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="row">
                  {this.props.DB.Decks.filter(x => {
                    return x.DivisionNationalite === "Axis";
                  })
                    .filter(x => {
                      return x.DivisionTags.includes("Defender");
                    })
                    .map(this.makeButton)}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DivisionsSelector;
