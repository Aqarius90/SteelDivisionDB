import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { SD1DeckUnitCard, SD1DeckDeckRow } from "./SD1Cards";
import { SD2DeckUnitCard, SD2DeckDeckRow } from "./SD2Cards";
import { useParams } from "react-router-dom";

function DeckDB({ allDecks }) {
  const [units, setUnits] = useState(null);
  let params = useParams();
  let prs = params.DB === "SD1";
  function showRow(e, i) {
    return (
      <div key={i}>
        {prs ? (
          <SD1DeckDeckRow x={e} setUnits={setUnits}></SD1DeckDeckRow>
        ) : (
          <SD2DeckDeckRow x={e} setUnits={setUnits}></SD2DeckDeckRow>
        )}
      </div>
    );
  }
  function showUnits(e, i) {
    return (
      <div key={i} className="col-12">
        {prs ? (
          <SD1DeckUnitCard x={e} i={i}></SD1DeckUnitCard>
        ) : (
          <SD2DeckUnitCard x={e} i={i}></SD2DeckUnitCard>
        )}
      </div>
    );
  }

  /*pagination*/
  let pPage = 5;
  const [page, setPage] = useState(0);
  let filtered = [];
  for (
    let i = page * pPage;
    i < Math.min((page + 1) * pPage, allDecks.length - 1);
    i++
  ) {
    filtered.push(allDecks[i]);
  }
  let handlePageClick = data => {
    setPage(data.selected);
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12">
          {filtered.map((e, i) => showRow(e, i, prs))}
        </div>
        <div className="col-xl-6 col-xs-12">
          <div className="row">
            {units ? units.map((e, i) => showUnits(e, i, prs)) : ""}
          </div>
        </div>
      </div>
      <div className="card">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"btn btn-outline-primary btn-secondary"}
          pageCount={Math.ceil(allDecks.length / pPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"btn-group btn-block"}
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
export default DeckDB;
