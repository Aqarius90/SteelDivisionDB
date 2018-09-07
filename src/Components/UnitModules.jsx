import React, { PureComponent } from "react";
import Turret from "./Turret";
import DetailUnitHeader from "./DetailUnitHeader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Ammo from "./Ammo";
import { parseBool } from "../js/parsers";
import UnitModuleSimple from "./UnitModuleSimple";
import UnitModuleRecon from "./UnitModuleRecon";
import UnitModuleMobility from "./UnitModuleMobility";
import UnitModuleSurvivability from "./UnitModuleSurvivability";
import UnitModuleAux from "./UnitModuleAux";
import UnitModuleAir from "./UntiModuleAir";

class UnitModules extends PureComponent {
  parseOffmap = x => {
    if (x === null) {
      return <div />;
    } else {
      return <Turret Turret={x.Turrets[0]} Salves={x.Salves} />;
    }
  };

  showWeapon = (x, i) => {
    return (
      <div className="card" key={i}>
        <div className="card-header">{x.Ammunition}</div>
        <div className="row card-body">
          <div className="col-sm">
            <p>Power: {x.Power_ForInterface}</p>
          </div>
          <div className="col-sm">
            <p>SalvoStockIndex: {x.SalvoStockIndex}</p>
          </div>
          <div className="col-sm">
            <p>
              SalvoStockIndex_ForInterface: {x.SalvoStockIndex_ForInterface}
            </p>
          </div>
          <div className="col-sm">
            <p>TirEnMouvement: {parseBool(x.TirEnMouvement)}</p>
          </div>
        </div>
        <Ammo x={x.Ammo} />
      </div>
    );
  };
  render() {
    if (this.props.Unit != null) {
      if (this.props.Unit.WeaponsDescriptor != null) {
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
              <div>
                <UnitModuleSimple x={this.props.Unit} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <UnitModuleRecon x={this.props.Unit} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <UnitModuleMobility x={this.props.Unit} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <UnitModuleSurvivability x={this.props.Unit} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <UnitModuleAux x={this.props.Unit} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <UnitModuleAir x={this.props.Unit} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="card">
                {this.props.Unit.WeaponsDescriptor.Turrets.map((x, i) => {
                  return (
                    <Turret
                      Turret={x}
                      Salves={this.props.Unit.WeaponsDescriptor.Salves}
                      key={i}
                    />
                  );
                })}
              </div>
              <div>{this.parseOffmap(this.props.Unit.Offmap)}</div>
            </TabPanel>
          </Tabs>
        );
      } else {
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
              <div>
                <UnitModuleSimple x={this.props.Unit} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <UnitModuleRecon x={this.props.Unit} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <UnitModuleMobility x={this.props.Unit} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <UnitModuleSurvivability x={this.props.Unit} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <UnitModuleAux x={this.props.Unit} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <UnitModuleAir x={this.props.Unit} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="card" />
              <div>{this.parseOffmap(this.props.Unit.Offmap)}</div>
            </TabPanel>
          </Tabs>
        );
      }
    }
    return <div />;
  }
}

class UnitData extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <DetailUnitHeader
          Pack={this.props.Pack}
          Unit={this.props.Unit}
          fadd={this.props.fadd}
          fhide={this.props.fhide}
        />
        <UnitModules Unit={this.props.Unit} />
      </React.Fragment>
    );
  }
}

export default UnitData;
