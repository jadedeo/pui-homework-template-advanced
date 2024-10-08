import React from "react";
import "../css/baseForm.css";

/** 'SearchSort' component accepts the following props to render the searching & sorting UI:
 * searchInput & setSearchInput: for monitoring the entered search term
 * sortCriteria & setSortCriteria: for monitoring the selected sort criteria
 * executeSearch: function for seting 'query' after the 'search' button has been clicked
 */
const SearchSort = ({
  searchInput,
  setSearchInput,
  sortCriteria,
  setSortCriteria,
  executeSearch,
}) => {
  return (
    <div id="search-sort">
      <div id="search">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") executeSearch();
          }}
        />
        <button onClick={executeSearch}>Search</button>
      </div>

      <div id="sort">
        <label htmlFor="sort-dropdown">Sort by:</label>
        <select
          id="sort-dropdown"
          onChange={(e) => {
            setSortCriteria(e.target.value);
          }}
          value={sortCriteria}
        >
          <option value="name">Name</option>
          <option value="basePrice">Base Price</option>
        </select>
      </div>
    </div>
  );
};
export default SearchSort;
