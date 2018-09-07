import React, { PureComponent } from "react";

class Header extends PureComponent {
  render() {
    return (
      <div className="row card-header">
        <div className="col-sm-1" />
        <div className="col-sm-10 panel">
          <h1 align="center">Steel Division Database</h1>
          <h6 align="center">last patch: v.</h6>
        </div>
        <div className="col-sm-1" />
      </div>
    );
  }
}

export default Header;
