import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { SD1WeaponWeaponRow, SD1WeaponWeaponCard } from "./SD1Cards";
import { SD2WeaponWeaponRow, SD2WeaponWeaponCard } from "./SD2Cards";
import { FilterField } from "./Database";
import { useParams } from "react-router-dom";

function WeaponDB({ allWeapons }) {
  const [fweapons, setfWeapons] = useState(allWeapons);
  let params = useParams();
  let prs = params.DB === "SD1" ? true : false;

  function showRow(e, i) {
    return (
      <tr key={i} onClick={() => setDetail(e)}>
        {prs ? (
          <SD1WeaponWeaponRow x={e} i={i}></SD1WeaponWeaponRow>
        ) : (
          <SD2WeaponWeaponRow x={e} i={i}></SD2WeaponWeaponRow>
        )}
      </tr>
    );
  }
  const [detail, setDetail] = useState(null);

  /*pagination*/
  let pPage = 10;
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
    <>
      <div className="card">
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
                  {prs ? "" : <th> DispersionMin </th>}
                  <th> DispersionMax </th>
                  <th> RangeMin </th>
                  <th> RangeMax </th>
                  {prs ? <th> RangeMin </th> : ""}
                  {prs ? <th> RangeMax </th> : <th> RangeAAA </th>}
                </tr>
                {pageWeapons.map((e, i) => showRow(e, i))}
              </tbody>
            </table>
          </div>
          {prs ? (
            <SD1WeaponWeaponCard detail={detail} setDetail={setDetail} />
          ) : (
            <SD2WeaponWeaponCard detail={detail} setDetail={setDetail} />
          )}
        </div>
      </div>
      <div className="card">
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
    </>
  );
}
export default WeaponDB;
