// --------- import external dependencies ---------
import React from "react";

// ------------ import internal dependencies ------------
import "./tagbox.scss";

const TagBox = ({ title, click, active }) => {
  return (
    <React.Fragment>
      <div
        className={`tag-box ${active ? "tag-box__active" : ""}`}
        onClick={click}
      >
        <span>{title}</span>
      </div>
    </React.Fragment>
  );
};

export default TagBox;
