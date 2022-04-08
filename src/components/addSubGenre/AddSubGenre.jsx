// ---------- import external dependencies ----------
import { useState, useEffect } from "react";

// ----------- import internal dependencies ------------
import TagBox from "components/TagBox";
import { useGenre } from "context/genreState";

const AddSubGenre = () => {
  // ---------- custom hook instances ----------
  const { state, dispatch } = useGenre();

  // ---------- component state managers ----------
  const [activeId, setActiveId] = useState("");

  const handleClick = (name, data) => {
    console.log("fires");
    setActiveId(name);
    dispatch({ type: "selectedSubGenre", subGenre: name, data: data });
    console.log(state);
  };

  useEffect(() => {
    setActiveId(state.selectedSubGenre);
  }, [state.selectedSubGenre]);

  return (
    <div className="genre-box">
      {state.subGenres.subgenres.map((e) => (
        <TagBox
          key={e.id}
          title={e.name}
          active={activeId === e.name}
          click={() => handleClick(e.name, e)}
        />
      ))}
      <TagBox
        title="Add New"
        active={activeId === "Add New"}
        click={() => handleClick("Add New", {})}
      />
    </div>
  );
};

export default AddSubGenre;
