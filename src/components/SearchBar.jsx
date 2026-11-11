
function SearchBar({ search, setSearch, onSearch }) {
  return (
    <form className="search-bar" onSubmit={onSearch}>
      <div className="search-input">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search a route or destination.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button type="submit">Search Route</button>
    </form>
  );
}

export default SearchBar;
