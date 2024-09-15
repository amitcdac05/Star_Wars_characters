import { useCallback, useEffect, useState } from "react";
import { fetchData } from "../services/api";

const useCharacters = (page, filters, searchQuery) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch character data from the API
  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(`/people/?page=${page}`);
      console.log(data);
      const charactersWithDetails = await Promise.all(
        data.results.map(async (character) => {
          const speciesName =
            character.species.length > 0
              ? (await fetchData(character.species[0])).name
              : "Human";
          const homeworld = character.homeworld
            ? await fetchData(character.homeworld)
            : {};
          return {
            ...character,
            speciesName,
            homeworldName: homeworld.name || "Unknown",
          };
        })
      );
      setCharacters(charactersWithDetails);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  // Filter characters based on search query and selected filters
  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = character.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSpecies = filters.species
      ? character.speciesName === filters.species
      : true;
    const matchesHomeworld = filters.homeworld
      ? character.homeworldName === filters.homeworld
      : true;
    return matchesSearch && matchesSpecies && matchesHomeworld;
  });

  return { filteredCharacters, loading, error, totalPages };
};

export default useCharacters;
