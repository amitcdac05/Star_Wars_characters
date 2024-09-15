import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import useCharacters from './hooks/useCharacters';
import MainContent from './components/MainContent';
import Login from './ pages/Login';
import './App.css';

const App = () => {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState({ species: "", homeworld: "" });
  const [selectedCharacter, setSelectedCharacter] = React.useState(null);
  const navigate = useNavigate();

  const { filteredCharacters, loading, error, totalPages } = useCharacters(page, filters, searchQuery);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const openModal = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  const loginSuccess = () => {
    navigate('/home'); 
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <Login onLogin={(username, password) => {
              handleLogin(username, password);
              loginSuccess();
            }} />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route
        path="/home"
        element={
          isAuthenticated ? (
            <MainContent
              loading={loading}
              error={error}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filters={filters}
              setFilters={setFilters}
              filteredCharacters={filteredCharacters}
              openModal={openModal}
              closeModal={closeModal}
              selectedCharacter={selectedCharacter}
              page={page}
              totalPages={totalPages}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              handleLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default App;
