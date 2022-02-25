import React, { useState, useEffect } from "react";

type IPaginationProps = {
  pages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ pages, setCurrentPage }: IPaginationProps) => {
  const numOfPages: number[] = [];

  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }

  const [currentButton, setCurrentButton] = useState(1);

  // switching between displayed table pages
  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, setCurrentPage]);

  return (
    <div className="clearfix">
      <div className="hint-text">
        Showing <b>5</b> out of <b>7</b> entries
      </div>
      <ul className="pagination">
        <li
          className={`${
            currentButton === 1 ? "page-item disabled" : "page-item"
          }`}
        >
          <a
            href="#!"
            onClick={() =>
              setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
            }
          >
            Previous
          </a>
        </li>
        {numOfPages.map((page, index) => {
          return (
            <li
              key={index}
              className={`${
                currentButton === page ? "page-item active" : "page-item"
              }`}
            >
              <a
                href="#!"
                className="page-link"
                onClick={() => setCurrentButton(page)}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li
          className={`${
            currentButton === numOfPages.length
              ? "page-item disabled"
              : "page-item"
          }`}
        >
          <a
            href="#!"
            onClick={() =>
              setCurrentButton((next) => (next === 1 ? next + 1 : next))
            }
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
