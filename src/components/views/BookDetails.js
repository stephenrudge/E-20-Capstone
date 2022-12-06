import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "./Book";

import "./BookDetails.css";

export const BookDetails = () => {
  const [books, setAllBooks] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/usersbooks/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAllBooks(data);
        // setAllBooks(data)
        console.log(data);
      });
  }, [id]);

  //   //

  const handleClickFinishBook = () => {
    fetch(`http://localhost:8088/usersBooks/${books.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ statusId: 3 }),
    });
  };

  //method that contains fetch call for each onClick:
  //i.e.:
  //
  const handleClickStartBook = () => {
    fetch(`http://localhost:8088/usersBooks/${books.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ statusId: 2 }),
    });
  };

  const handleClickToReadBook = () => {
    fetch(`http://localhost:8088/usersBooks/${books.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ statusId: 1 }),
    });
  };

  const handleClickDeleteBook = () => {
    return fetch(`http://localhost:8088/usersBooks/${books.id}`, {
      method: "DELETE",
    }).then(() => {
      navigate("/home");
    });
  };

  return (
    <>
      <article className="BookDetails">
        <div className="bookCard">
          {" "}
          <h1>{books.title} Details</h1>
        </div>
        <div className="bookDetails">
            <img src={books.coverImg}></img>
          <div className="bookText">
            <div>Title: {books.title}</div>
            <div>Author: {books.author}</div>
            <div>Total Page Count: {books.totalPageCount}</div>
            {/* strech goal */}
            {/* <div>Start date: {books.startDate} </div> */}
          </div>
        </div>
          <button
            onClick={() => {
              handleClickStartBook();
            }}
            className="startBook"
          >
            Start Book
          </button>
          <button
            onClick={() => {
              {
                handleClickFinishBook();
              }
            }}
            className="finishBook"
          >
            Finish Book
          </button>
          <button
            onClick={() => {
              navigate(`/edit/${books.id}`);
            }}
            className="editDetails"
          >
            Edit Details
          </button>

          <button
            onClick={() => {
              handleClickToReadBook();
            }}
            className="startBook"
          >
            Did Not Start
          </button>

          <button
            onClick={() => {
              {
                handleClickDeleteBook();
              }
              window.alert("Are you sure you want to Delete this book?")
            }}
            className="deleteBook"
          >
            Delete Book
          </button>
      </article>
    </>
  );
};
