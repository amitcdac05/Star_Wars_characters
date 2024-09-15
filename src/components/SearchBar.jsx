import './MainContent.css'
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search by name"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-input"
     
    />
  );
};

export default SearchBar;
