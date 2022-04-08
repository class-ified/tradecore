// ---------- import external dependencies ----------
import { useState, useEffect } from "react";

// ----------- import internal dependencies ------------
import TagBox from "components/TagBox";
import { useGenre } from "context/genreState";

const AddGenre = () => {
  // ---------- component state managers ----------
  const [activeId, setActiveId] = useState("");

  const { state, dispatch } = useGenre();

  const handleClick = (id) => {
    console.log("fires");
    setActiveId(id);
    dispatch({ type: "selectedGenre", genreId: id });
    console.log(state);
  };

  useEffect(() => {
    setActiveId(state.selectedGenre);
  }, []);

  return (
    <div className="genre-box">
      {state.genres.map((e) => (
        <TagBox
          title={e.name}
          key={e.id}
          active={activeId === e.id}
          click={() => handleClick(e.id)}
        />
      ))}
    </div>
  );
};

export default AddGenre;
