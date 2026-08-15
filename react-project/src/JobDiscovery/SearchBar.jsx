function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="job-search">
      <input
        className="job-search-input"
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
