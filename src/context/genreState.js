// ------------ import external dependencies ------------
import React from "react";

// ---------- import internal dependencies ---------
import { data } from "utils/data";

const GenreContext = React.createContext();

function genreReducer(state, action) {
  switch (action.type) {
    case "selectedGenre": {
      return {
        ...state,
        selectedGenre: action.genreId,
        selectedSubGenre: null
      };
    }
    case "selectedSubGenre": {
      return {
        ...state,
        selectedSubGenre: action.subGenre,
        selectedSubGenreData: action.data
      };
    }
    case "updateSubGenreData": {
      return {
        ...state,
        selectedSubGenreData: {
          name: action.name,
          isDescriptionRequired: action.isDesc
        }
      };
    }
    case "addSubGenre": {
      const lastSubGenre = state.subGenres.subgenres.length - 1;
      const newId = state.subGenres.subgenres[lastSubGenre].id + 1;
      const newSubGenre = {
        id: newId,
        name: state.selectedSubGenreData.name,
        isDescriptionRequired: state.selectedSubGenreData.isDescriptionRequired
      };
      const updatedSubGenre = [...state.subGenres.subgenres, newSubGenre];
      const { id, name } = state.subGenres;
      const updateGenre = { id, name, subgenres: updatedSubGenre };
      const findGenreIndex = state.genres.findIndex(
        (e) => e.id === state.subGenres.id
      );
      const newGenre = [...state.genres];
      newGenre.splice(findGenreIndex, 1, updateGenre);

      return {
        ...state,
        genres: newGenre,
        subGenres: null,
        selectedGenre: null,
        selectedSubGenreData: null,
        selectedSubGenre: null
      };
    }
    case "getSubGenre": {
      const updateSubGenres = state.genres.filter(
        (e) => e.id === state.selectedGenre
      )[0];
      return {
        ...state,
        subGenres: updateSubGenres
      };
    }
    case "newGenre": {
      return {
        ...state,
        subGenres: null,
        selectedGenre: null,
        selectedSubGenreData: null,
        selectedSubGenre: null
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GenreProvider({ children }) {
  const [state, dispatch] = React.useReducer(genreReducer, {
    genres: data.genres,
    selectedGenre: null,
    subGenres: null,
    selectedSubGenre: null
  });
  const value = { state, dispatch };
  return (
    <GenreContext.Provider value={value}>{children}</GenreContext.Provider>
  );
}

function useGenre() {
  const context = React.useContext(GenreContext);
  if (context === undefined) {
    throw new Error("useGenre must be used within a CountProvider");
  }
  return context;
}

export { GenreProvider, useGenre };
