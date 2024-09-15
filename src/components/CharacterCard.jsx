import React from 'react';
import PropTypes from 'prop-types';

// Map species to background colors
const speciesColors = {
  "Human": "#f5f5f5",
  "Droid": "#ffeb3b",
  "Wookiee": "#8d6e63",
  "Rodian": "#4caf50",
  "default": "#cfd8dc"
};

const CharacterCard = ({ character, onClick }) => {
  const backgroundColor = speciesColors[character.speciesName] || speciesColors["default"];

  return (
    <div
      className="character-card"
      style={{ backgroundColor }}
      onClick={() => onClick(character)}
    >
      <img src={`https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`} alt="Random" />
      <h3>{character.name}</h3>
      <p>{character.speciesName}</p>
    </div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CharacterCard;
