import React from "react";
import CharacterCard from "./CharacterCard";
import CharacterModal from "./CharacterModal";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Filters from "./Filter";
import "./MainContent.css";
import Loader from "./Loader";

const MainContent = ({
  loading,
  error,
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  filteredCharacters,
  openModal,
  closeModal,
  selectedCharacter,
  page,
  totalPages,
  handleNextPage,
  handlePrevPage,
  handleLogout,
}) => {
  return (
    <>
      <header>
        <h1>Star Wars Characters</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="search-filters-container">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="search-bar"
        />
        <Filters
          speciesList={[
            ...new Set(filteredCharacters.map((char) => char.speciesName)),
          ]}
          homeworldList={[
            ...new Set(filteredCharacters.map((char) => char.homeworldName)),
          ]}
          setFilters={setFilters}
          className="filters"
        />
      </div>

      {loading && <Loader />}

      <div className="character-grid">
        {filteredCharacters.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            onClick={openModal}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
      />

      <CharacterModal
        isOpen={!!selectedCharacter}
        onRequestClose={closeModal}
        character={selectedCharacter}
      />
    </>
  );
};

export default MainContent;
