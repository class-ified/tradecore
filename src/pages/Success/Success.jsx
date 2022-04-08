// ----------- import external dependencies ----------
import { useNavigate } from "react-router-dom";

// ------------- import internal dependencies -----------
import "./success.scss";
import { ReactComponent as Complete } from "asset/svgs/done.svg";
import { useGenre } from "context/genreState";

const Success = () => {
  // ---------- custom hook instance ----------
  const navigate = useNavigate();
  const { dispatch } = useGenre();

  return (
    <>
      <main>
        <section>
          <div className="box-wrapper">
            <div className="success-wrapper">
              <Complete style={{ fill: "#dfdfdf" }} />
              <span className="completed-process">Book added successfully</span>
              <button
                className="btn btn-grey mt-1"
                onClick={() => {
                  dispatch({ type: "newGenre" });
                  navigate("/addbook");
                }}
              >
                Add another book
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Success;
