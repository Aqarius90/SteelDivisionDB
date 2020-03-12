import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { SD1UnitUnitRow, SD1UnitUnitCard } from "./SD1Cards";
import { SD2UnitUnitRow, SD2UnitUnitCard } from "./SD2Cards";
import { FilterField } from "./Database";
import { useParams } from "react-router-dom";

function UnitDB({ allUnits }) {
  const [fUnits, setfUnits] = useState(allUnits);
  let params = useParams();
  let prs = params.DB === "SD1" ? true : false;

  function showRow(x, i) {
    return (
      <tr key={i} onClick={() => setDetail(x)}>
        {prs ? (
          <SD1UnitUnitRow x={x} i={i}></SD1UnitUnitRow>
        ) : (
          <SD2UnitUnitRow x={x} i={i}></SD2UnitUnitRow>
        )}
      </tr>
    );
  }
  const [detail, setDetail] = useState(null);

  /*pagination*/
  let pPage = 10;
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(Math.ceil(allUnits.length / pPage));
  function setFilter(x) {
    setPages(Math.ceil(x.length / pPage));
    setPage(0);
    setfUnits(x);
  }
  let pageUnits = [];
  for (
    let i = page * pPage;
    i < Math.min((page + 1) * pPage, fUnits.length);
    i++
  ) {
    pageUnits.push(fUnits[i]);
  }
  let handlePageClick = data => {
    setPage(data.selected);
  };

  return (
    <>
      <div className="card">
        <FilterField items={allUnits} set={setFilter}></FilterField>
        <div className="row">
          <div className="col-12">
            <table className="sortable table-hover">
              <tbody>
                <tr>
                  <th> </th>
                  <th> Unit </th>
                  <th> Spec </th>
                  <th> Price </th>
                  <th> Front AV </th>
                  <th> Side AV </th>
                  <th> Rear AV </th>
                  <th> Top AV </th>
                  <th> Factory </th>
                  <th> Optics </th>
                  <th> Camo </th>
                  <th> Speed </th>
                  <th> Stun/regen </th>
                  <th> Supply/TOT </th>
                </tr>
                {pageUnits.map((e, i) => showRow(e, i, prs))}
              </tbody>
            </table>
          </div>
          {prs ? (
            <SD1UnitUnitCard detail={detail} setDetail={setDetail} />
          ) : (
            <SD2UnitUnitCard detail={detail} setDetail={setDetail} />
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
export default UnitDB;
