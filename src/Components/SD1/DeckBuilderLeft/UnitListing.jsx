import React, { Component } from "react";
import { parsePhase, parseAlias, parsePicture } from "../js/parsers";
import {
  DisplayAP,
  DisplayAV,
  DisplayExp,
  DisplayPara,
  DisplaySpecial
} from "../DisplayComponents";

class UnitsInList extends Component {
  makeUnitEntry = x => {
    if (x.TransportUnit == null) {
      let Unit = x.Unit;
      return (
        <tr key={x.EncodeInt} onClick={() => this.props.fshow(x)}>
          <td>
            <img
              src={parsePicture(Unit, "sm")}
              className="img-xp"
              alt="unitPortrait"
            />
          </td>
          <td>{parseAlias(Unit)}</td>
          <td>{Unit.ProductionPrice}</td>
          <td>{x.UnitsPerPack}</td>
          <td>{x.PackAvailabilty}</td>
          <td>{parsePhase(x.AvailableFromPhase)}</td>
          <td>
            <DisplayExp Experiencelevel={x.Experiencelevel} css="img-xp" />
          </td>
          <td>
            <DisplayAP AP={Unit.APValue} css="img-xp" />
          </td>
          <td>
            <DisplayAV AV={Unit.PlatingValue} css="img-xp" />
          </td>
          <td>
            <DisplayPara IsParachutist={Unit.IsParachutist} />
          </td>
          <td>
            <DisplaySpecial Spec={Unit.SpecialtyTexture} css="img-xp" />
          </td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
      );
    } else {
      let Unit = x.Unit;
      let TransportUnit = x.TransportUnit;
      return (
        <tr key={x.EncodeInt} onClick={() => this.props.fshow(x)}>
          <td>
            <img
              src={parsePicture(Unit, "sm")}
              className="img-xp"
              alt="unitPortrait"
            />
          </td>
          <td>{parseAlias(Unit)}</td>
          <td>{Unit.ProductionPrice}</td>
          <td>{x.UnitsPerPack}</td>
          <td>{x.PackAvailabilty}</td>
          <td>{parsePhase(x.AvailableFromPhase)}</td>
          <td>
            <DisplayExp Experiencelevel={x.Experiencelevel} css="img-xp" />
          </td>
          <td>
            <DisplayAP AP={Unit.APValue} css="img-xp" />
          </td>
          <td>
            <DisplayAV AV={Unit.PlatingValue} css="img-xp" />
          </td>
          <td>
            <DisplayPara IsParachutist={Unit.IsParachutist} />
          </td>
          <td>
            <DisplaySpecial Spec={Unit.SpecialtyTexture} css="img-xp" />
          </td>
          <td>{parseAlias(TransportUnit)}</td>
          <td>{TransportUnit.ProductionPrice}</td>
          <td>
            <DisplayAP AP={Unit.APValue} css="img-xp" />
          </td>
          <td>
            <DisplayAV AV={Unit.PlatingValue} css="img-xp" />
          </td>
          <td>
            <DisplayPara IsParachutist={TransportUnit.IsParachutist} />
          </td>
          <td>
            <DisplaySpecial
              Spec={TransportUnit.SpecialtyTexture}
              css="img-xp"
            />
          </td>
        </tr>
      );
    }
  };

  render() {
    return (
      <table className="sortable table-hover" id="recTable">
        <tbody>
          <tr>
            <th />
            <th onClick={() => this.props.fsort(1, "AliasName")}>Unit⇓</th>
            <th onClick={() => this.props.fsort(1, "ProductionPrice")}>
              Points⇓
            </th>
            <th onClick={() => this.props.fsort(0, "UnitsPerPack")}>Number⇓</th>
            <th onClick={() => this.props.fsort(0, "PackAvailabilty")}>
              Cards⇓
            </th>
            <th onClick={() => this.props.fsort(0, "AvailableFromPhase")}>
              Phase⇓
            </th>
            <th onClick={() => this.props.fsort(0, "Experiencelevel")}>
              Veterancy⇓
            </th>
            <th onClick={() => this.props.fsort(1, "APValue")}>AT⇓</th>
            <th onClick={() => this.props.fsort(1, "PlatingValue")}>FAV⇓</th>
            <th onClick={() => this.props.fsort(1, "IsParachutist")}>Para⇓</th>
            <th onClick={() => this.props.fsort(1, "SpecialtyTexture")}>
              Spec⇓
            </th>
            <th onClick={() => this.props.fsort(2, "AliasName")}>Transport⇓</th>
            <th onClick={() => this.props.fsort(2, "ProductionPrice")}>
              Points⇓
            </th>
            <th onClick={() => this.props.fsort(2, "APValue")}>AT⇓</th>
            <th onClick={() => this.props.fsort(2, "PlatingValue")}>FAV⇓</th>
            <th onClick={() => this.props.fsort(2, "IsParachutist")}>Para⇓</th>
            <th onClick={() => this.props.fsort(2, "SpecialtyTexture")}>
              Spec⇓
            </th>
          </tr>
          {this.props.Units.map(this.makeUnitEntry)}
        </tbody>
      </table>
    );
  }
}

export default UnitsInList;
