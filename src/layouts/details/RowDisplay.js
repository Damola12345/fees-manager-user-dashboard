import React from "react";

function RowDisplay({ head, title, description, link }) {
  return (
    <div className={`table-row`}>
      {!head ? (
        <>
          <p className="table-row__title">{title}</p>
          <div className="table-row__description">
            {link ? (
              <a className="link" href={description} target="blank">
                {description}
              </a>
            ) : (
              description
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default RowDisplay;
