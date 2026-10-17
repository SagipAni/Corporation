import Button from "./Button.jsx";

// PREV / NEXT buttons. `summary` is optional text on the left, e.g. "Showing 1–3 of 486".
// There is no real paging yet because the data is static.
function Pagination({ summary }) {
  return (
    <div className="pagination">
      {summary && <span className="sub-text">{summary}</span>}
      <div className="pagination-buttons">
        <Button upper>PREV</Button>
        <Button upper>NEXT</Button>
      </div>
    </div>
  );
}

export default Pagination;
