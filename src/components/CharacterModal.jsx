import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import axios from 'axios'; 
import './Modal.css'; 

const CharacterModal = ({ isOpen, onRequestClose, character }) => {
  const [homeworld, setHomeworld] = useState(null);

  useEffect(() => {
    if (character && character.homeworld) {
        axios.get(character.homeworld)
        .then(response => {
          setHomeworld(response.data);
        })
        .catch(error => {
          console.error('Error fetching homeworld data:', error);
          setHomeworld(null); 
        });
    }
  }, [character]);

  if (!character) return null;

  // Format the date added to the API
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Character Details"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onRequestClose}>X</button>
        <h2>{character.name}</h2>
        <div className="modal-details">
          <p><strong>Height:</strong> {character.height} meters</p>
          <p><strong>Mass:</strong> {character.mass} kg</p>
          <p><strong>Date Added:</strong> {character.created ? formatDate(character.created) : 'N/A'}</p>
          <p><strong>Number of Films:</strong> {character.films.length}</p>
          <p><strong>Birth Year:</strong> {character.birth_year}</p>
          {homeworld ? (
            <div className="homeworld-details">
              <h3>Homeworld Details</h3>
              <p><strong>Name:</strong> {homeworld.name}</p>
              <p><strong>Terrain:</strong> {homeworld.terrain}</p>
              <p><strong>Climate:</strong> {homeworld.climate}</p>
              <p><strong>Population:</strong> {homeworld.population}</p>
            </div>
          ) : (
            <p>Loading homeworld details...</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

CharacterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    mass: PropTypes.string.isRequired,   
    created: PropTypes.string,          
    films: PropTypes.arrayOf(PropTypes.string).isRequired,
    birth_year: PropTypes.string.isRequired, 
    homeworld: PropTypes.string.isRequired, 
  }),
};

export default CharacterModal;
