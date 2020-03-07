import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { DeckUnitCard, DeckDeckRow } from "./Cards";

function DeckDB({ allDecks }) {
  //const [decks, setDecks] = useState(allDecks);
  const [units, setUnits] = useState(null);
  function showRow(e, i) {
    return (
      <div key={i}>
        <DeckDeckRow x={e} setUnits={setUnits}></DeckDeckRow>
      </div>
    );
  }
  function showUnits(e, i) {
    return (
      <div key={i} className="col-12">
        <DeckUnitCard x={e} i={i}></DeckUnitCard>
      </div>
    );
  }

  /*pagination*/
  let pPage = 20;
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(Math.ceil(allDecks.length / pPage));
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
    <div className="container">
      <div className="row">
        <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12">
          {filtered.map((e, i) => showRow(e, i))}
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"btn btn-outline-primary btn-secondary"}
            pageCount={pages}
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
        <div className="col-xl-6 col-xs-12">
          <div className="row">
            {units ? units.map((e, i) => showUnits(e, i)) : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeckDB;
