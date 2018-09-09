import React, { PureComponent } from "react";

class Header extends PureComponent {
  onClick() {
    window.location.href = `mailto:${this.props.email}`;
  }
  render() {
    return (
      <div className="row card-header">
        <div className="col-sm-1" />
        <div className="col-sm-10 panel">
          <h1 align="center">Steel Division Database</h1>
          <h6 align="center">last patch: v.300093911</h6>
        </div>
        <div className="col-sm-1" />
      </div>
    );
  }
}

export default Header;
