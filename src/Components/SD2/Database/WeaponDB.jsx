import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { WeaponWeaponRow, WeaponWeaponCard } from "./Cards";
import { FilterField } from "./Database";

function WeaponDB({ allWeapons }) {
  const [fweapons, setfWeapons] = useState(allWeapons);
  function showRow(e, i) {
    return (
      <tr key={i} onClick={() => setDetail(e)}>
        <WeaponWeaponRow x={e} i={i}></WeaponWeaponRow>
      </tr>
    );
  }
  const [detail, setDetail] = useState(null);

  /*pagination*/
  let pPage = 20;
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(Math.ceil(allWeapons.length / pPage));
  function setFilter(x) {
    setPages(Math.ceil(x.length / pPage));
    setPage(0);
    setfWeapons(x);
  }
  let pageWeapons = [];
  for (
    let i = page * pPage;
    i < Math.min((page + 1) * pPage, fweapons.length);
    i++
  ) {
    pageWeapons.push(fweapons[i]);
  }
  let handlePageClick = data => {
    setPage(data.selected);
  };

  return (
    <div className="container">
      <FilterField items={allWeapons} set={setFilter}></FilterField>
      <div className="row">
        <div className="col-12">
          <table className="sortable table-hover">
            <tbody>
              <tr>
                <th></th>
                <th> Weapon </th>
                <th> Caliber </th>
                <th> Indirect fire </th>
                <th> APCR </th>
                <th> Accuracy </th>
                <th> Stabilizer </th>
                <th> Aimtime </th>
                <th> DispersionMin </th>
                <th> DispersionMax </th>
                <th> RangeMin </th>
                <th> RangeMax </th>
                <th> RangeAAA </th>
              </tr>
              {pageWeapons.map((e, i) => showRow(e, i))}
            </tbody>
          </table>
        </div>
        <WeaponWeaponCard detail={detail} setDetail={setDetail} />
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"btn"}
          pageCount={pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination btn-group btn-block"}
          subContainerClassName={"pages pagination"}
          pageClassName={"btn"}
          previousClassName={"btn"}
          nextClassName={"btn"}
          activeClassName={"btn active"}
          pageLinkClassName={"btn btn-block btn-outline-primary "}
          previousLinkClassName={"btn btn-block btn-outline-primary"}
          nextLinkClassName={"btn btn-block btn-outline-primary"}
          activeLinkClassName={"btn btn-block btn-outline-primary active"}
        />
      </div>
    </div>
  );
}
export default WeaponDB;
