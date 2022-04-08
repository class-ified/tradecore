// ---------- import external dependencies ----------
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ------------ import external dependencies ------------
import "./addbook.scss";
import { useGenre } from "context/genreState";
import AddGenre from "components/addGenre/AddGenre";
import AddSubGenre from "components/addSubGenre/AddSubGenre";

const AddBook = () => {
  // ----------- custom hooks instances ----------
  const navigate = useNavigate();
  const { dispatch, state } = useGenre();

  // ----------- application state component -----------
  const [currStep, setCurrStep] = useState(1);
  const [stepList, setStepList] = useState([
    { level: 1, name: "Genre" },
    { level: 2, name: "Subgenre" }
  ]);

  //   ------------- new genre form state -------------
  const [subGenre, setSubGenre] = useState("");
  const [isDescriptionRequired, setIsDescriptionRequired] = useState(false);
  const [err, setErr] = useState(false);

  //   ------------- information form state ------------
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState("");
  const [format, setFormat] = useState("");
  const [edition, setEdition] = useState("");
  const [language, setlanguage] = useState("");
  const [description, setDescription] = useState("");
  const [formErr, setFormErr] = useState(false);
  const [formErrMsg, setFormErrMsg] = useState("");
  const [allowDesc, setallowDesc] = useState(false);

  useEffect(() => {
    if (state.selectedSubGenre) {
      if (state.selectedSubGenre === "Add New") {
        setStepList([
          { level: 1, name: "Genre" },
          { level: 2, name: "Subgenre" },
          { level: 3, name: "Add new subgenre" },
          { level: 4, name: "Information" }
        ]);
      } else {
        setStepList([
          { level: 1, name: "Genre" },
          { level: 2, name: "Subgenre" },
          { level: 3, name: "Information" }
        ]);
      }
    }
  }, [state.selectedSubGenre]);

  useEffect(() => {
    setallowDesc(state?.selectedSubGenreData?.isDescriptionRequired ?? false);
  }, [state.selectedSubGenreData]);

  const handleNextStage = () => {
    switch (currStep) {
      case 1: {
        setCurrStep(currStep + 1);
        dispatch({ type: "getSubGenre" });
        break;
      }
      case 2: {
        setCurrStep(currStep + 1);
        break;
      }
      case 3: {
        setErr(false);
        const subGenreList = state.subGenres.subgenres;
        const subGenresMatch = subGenreList.findIndex(
          (e) => e.name === subGenre
        );

        if (subGenresMatch > -1) {
          setErr(true);
          break;
        }
    
        dispatch({
          type: "updateSubGenreData",
          name: subGenre,
          isDesc: isDescriptionRequired
        });
        setCurrStep(currStep + 1);
        break;
      }
      default: {
        console.log("yay");
      }
    }
  };

  const updateState = (e, callback) => {
    callback(e.target.value);
  };

  const handleAddGenre = (e) => {
    e.preventDefault();

    if (!title) {
      setFormErr(true);
      setFormErrMsg("Title field is required");
      return;
    }

    if (state.selectedSubGenreData.isDescriptionRequired && !description) {
      setFormErr(true);
      setFormErrMsg("Description field is required");
      return;
    }

    const requestData = {
      title,
      author,
      isbn,
      publisher,
      date,
      page,
      format,
      edition,
      language,
      description
    };

    const asyncRequest = () => Promise.resolve(requestData);

    asyncRequest().then((res) => {
      console.log(res);

      if (state.selectedSubGenre === "Add New") {
        dispatch({ type: "addSubGenre" });
      }

      setCurrStep(1);
      navigate("/success");
    });
  };

  return (
    <main>
      <section>
        <div className="box-wrapper">
          <span className="box-wrapper__heading">Add Book - New Book</span>

          {/* ----------- Multi-steper indicator ---------- */}
          <div className="indicators-wrapper">
            {stepList.map((e, i) => (
              <React.Fragment key={i}>
                <div className="indicator-stage">
                  <span
                    className={`indicator-stage--circle ${
                      currStep === e.level ? "indicator-stage__active" : ""
                    }`}
                  >
                    {e.level}
                  </span>
                  <span className="indicator-stage--step">{e.name}</span>
                </div>
                {(stepList.length === 2 || i !== stepList.length - 1) && (
                  <div className="indicator-separator"></div>
                )}
              </React.Fragment>
            ))}
            {stepList.length === 2 && (
              <>
                <div className="indicator-stage">
                  <span className="indicator-stage--circle">...</span>
                  <span className="indicator-stage--step"></span>
                </div>
              </>
            )}
          </div>

          {/* ----------- genres list ----------- */}
          <div>
            {/* ------------ multi-step step 1 ----------- */}
            {currStep === 1 && (
              <div>
                <AddGenre />
                <div className="btn-wrap mt-1">
                  <button
                    disabled={state.selectedGenre === null}
                    className="btn btn-grey"
                    onClick={handleNextStage}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* ----------- multi-step step 2 ---------- */}
            {currStep === 2 && (
              <div>
                <AddSubGenre />
                <div className="btn-wrap mt-1">
                  <button
                    className="btn btn-tran"
                    onClick={() => setCurrStep(currStep - 1)}
                  >
                    {"< Back"}
                  </button>
                  <button
                    disabled={state.selectedSubGenre === null}
                    className="btn btn-grey"
                    onClick={handleNextStage}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* ---------- multi-step step 3 ----------- */}
            {currStep === 3 &&
              stepList[2].name === "Add new subgenre" &&
              state.selectedSubGenre === "Add New" && (
                <div>
                  <div>
                    <input
                      type="text"
                      placeholder="Subgenre name"
                      aria-label="subgenre name"
                      value={subGenre}
                      onChange={(e) => setSubGenre(e.target.value)}
                      required
                    />
                    {err && (
                      <span className="err-msg">
                        Genre already exist. Create a new genre
                      </span>
                    )}

                    <div className="isdesc-wrap">
                      <input
                        type="checkbox"
                        aria-label="isDescription"
                        id="desc"
                        checked={isDescriptionRequired}
                        onChange={(e) =>
                          setIsDescriptionRequired(e.target.checked)
                        }
                      />
                      <label htmlFor="desc">
                        Description is required for this subgenre
                      </label>
                    </div>
                  </div>
                  <div className="btn-wrap mt-1">
                    <button
                      className="btn btn-tran"
                      type="button"
                      onClick={() => setCurrStep(currStep - 1)}
                    >
                      {"< Back"}
                    </button>
                    <button
                      type="button"
                      disabled={!subGenre}
                      className="btn btn-grey"
                      onClick={handleNextStage}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

            {/* ------------ multi-step step 4 ---------- */}
            {((currStep === 3 && stepList[2].name === "Information") ||
              currStep === 4) && (
              <div>
                <form onSubmit={handleAddGenre}>
                  <div className="input-wrap">
                    <label htmlFor="title">Book title</label>
                    <input
                      type="text"
                      id="title"
                      placeholder="Book title"
                      value={title}
                      onChange={(e) => updateState(e, setTitle)}
                      required
                    />
                  </div>
                  <div className="input-wrap">
                    <label htmlFor="author">Author</label>
                    <input
                      type="text"
                      id="author"
                      placeholder="Author"
                      value={author}
                      onChange={(e) => updateState(e, setAuthor)}
                    />
                  </div>
                  <div className="input-wrap">
                    <label htmlFor="isbn">ISBN</label>
                    <input
                      type="text"
                      id="isbn"
                      placeholder="ISBN"
                      value={isbn}
                      onChange={(e) => updateState(e, setIsbn)}
                    />
                  </div>
                  <div className="input-wrap">
                    <label htmlFor="publisher">Publisher</label>
                    <input
                      type="text"
                      id="publisher"
                      placeholder="Publisher"
                      value={publisher}
                      onChange={(e) => updateState(e, setPublisher)}
                    />
                  </div>
                  <div className="input-wrap">
                    <label htmlFor="date">Date Published</label>
                    <input
                      type="date"
                      id="date"
                      placeholder="Date published"
                      value={date}
                      onChange={(e) => updateState(e, setDate)}
                    />
                  </div>
                  <div className="input-wrap">
                    <label htmlFor="pages">Number of pages </label>
                    <input
                      type="number"
                      id="pages"
                      placeholder="Number of pages"
                      value={page}
                      onChange={(e) => updateState(e, setPage)}
                    />
                  </div>
                  <div className="input-wrap">
                    <label htmlFor="format">Format </label>
                    <input
                      type="text"
                      id="format"
                      placeholder="Format"
                      value={format}
                      onChange={(e) => updateState(e, setFormat)}
                    />
                  </div>
                  <div className="input-wrap">
                    <label htmlFor="edition">Edition</label>
                    <input
                      type="text"
                      id="edition"
                      placeholder="Edition"
                      value={edition}
                      onChange={(e) => updateState(e, setEdition)}
                    />
                  </div>
                  <div className="input-wrap">
                    <label htmlFor="edition-language">Edition Language</label>
                    <input
                      type="text"
                      id="edition-language"
                      placeholder="Edition Language"
                      value={language}
                      onChange={(e) => updateState(e, setlanguage)}
                    />
                  </div>
                  <div className="input-wrap">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      required={allowDesc}
                      placeholder="Type the description"
                      value={description}
                      onChange={(e) => updateState(e, setDescription)}
                    ></textarea>
                  </div>
                  {formErr && <span>{formErrMsg}</span>}
                  <div className="btn-wrap mt-1">
                    <button
                      className="btn btn-tran"
                      type="buton"
                      onClick={() => setCurrStep(currStep - 1)}
                    >
                      {"< Back"}
                    </button>
                    <button
                      disabled={state.selectedGenre === null}
                      className="btn btn-grey"
                      type="submit"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddBook;
