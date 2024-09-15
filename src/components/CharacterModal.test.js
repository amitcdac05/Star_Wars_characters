import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import CharacterModal from './CharacterModal';

// Mock the axios module
jest.mock('axios');

describe('CharacterModal', () => {
  it('opens with the correct information when a character card is clicked', async () => {
    // Define a mock character object
    const character = {
      name: 'Luke Skywalker',
      height: '1.72',
      mass: '77',
      created: '2024-01-01T00:00:00Z',
      films: ['Film1', 'Film2'],
      birth_year: '19BBY',
      homeworld: 'https://swapi.dev/api/planets/1/'
    };

    // Define a mock homeworld response
    const homeworld = {
      name: 'Tatooine',
      terrain: 'Desert',
      climate: 'Arid',
      population: '200000'
    };

    // Mock axios.get to return the homeworld data
    axios.get.mockResolvedValue({ data: homeworld });

    // Define the props
    const props = {
      isOpen: true,
      onRequestClose: jest.fn(),
      character: character
    };

    // Render the CharacterModal component
    render(<CharacterModal {...props} />);

    // Assert that the modal content is rendered correctly
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Height: 1.72 meters')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77 kg')).toBeInTheDocument();
    expect(screen.getByText('Date Added: 01/01/2024')).toBeInTheDocument();
    expect(screen.getByText('Number of Films: 2')).toBeInTheDocument();
    expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();

    // Wait for homeworld details to load and assert them
    await waitFor(() => {
      expect(screen.getByText('Homeworld Details')).toBeInTheDocument();
      expect(screen.getByText('Name: Tatooine')).toBeInTheDocument();
      expect(screen.getByText('Terrain: Desert')).toBeInTheDocument();
      expect(screen.getByText('Climate: Arid')).toBeInTheDocument();
      expect(screen.getByText('Population: 200000')).toBeInTheDocument();
    });

    // Optionally, simulate closing the modal
    fireEvent.click(screen.getByText('X'));
    expect(props.onRequestClose).toHaveBeenCalled();
  });
});
