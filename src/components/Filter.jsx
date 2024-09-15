import { useState } from "react";

const Filters = ({ speciesList, homeworldList, setFilters }) => {
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedHomeworld, setSelectedHomeworld] = useState("");

  // Handler function for changes in the species dropdown
  const handleSpeciesChange = (e) => {
    setSelectedSpecies(e.target.value);
    setFilters((prev) => ({ ...prev, species: e.target.value }));
  };

  // Handler function for changes in the homeworld dropdown
  const handleHomeworldChange = (e) => {
    setSelectedHomeworld(e.target.value);
    setFilters((prev) => ({ ...prev, homeworld: e.target.value }));
  };

  return (
    <div>
      <select
        value={selectedSpecies}
        onChange={handleSpeciesChange}
        style={{ margin: "5px" }}
      >
        <option value="">All Species</option>
        {speciesList.map((species) => (
          <option key={species} value={species}>
            {species}
          </option>
        ))}
      </select>

      <select value={selectedHomeworld} onChange={handleHomeworldChange}>
        <option value="">All Homeworlds</option>
        {homeworldList.map((homeworld) => (
          <option key={homeworld} value={homeworld}>
            {homeworld}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
