import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Book from "./book/book";
import AddBook from "./book/addBook";

export default function Home(props) {
  const [allBooks, setAllBooks] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [bookToEdit, setBookToEdit] = useState({});
  const [editMode, setEditMode] = useState(false);

  const getAllBooks = () => {
    axios
      .get("https://garyd-hookstore.herokuapp.com/book/get")
      .then((res) => {
        setAllBooks(res.data);
      })
      .catch((error) => {
        console.log(
          `An error has occured with your API 'GET' request --> ${error}`
        );
      });
  };

  const handleEditClick = (book) => {
    setBookToEdit(book);
    setEditMode(true);
  };

  const handleEditSubmit = () => {
    setEditMode(false);
    getAllBooks();
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`https://garyd-hookstore.herokuapp.com/book/delete/${id}`)
      .then((res) => {
        setAllBooks(
          allBooks.filter((book) => {
            return book.id != id;
          })
        );
      })
      .catch((error) => {
        console.log("An error has occured while deleting your book.", error);
      });
  };

  const renderBooks = () => {
    return allBooks.map((book) => {
      return (
        <div key={book.id}>
          <Book
            book={book}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      );
    });
  };

  useEffect(() => {
    getAllBooks();
    if (Cookies.get("username")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className="home-page-container main-body">
      <div className="username-title">
        <h1>Welcome {loggedIn ? Cookies.get("username") : ""}</h1>
      </div>

      <div className="books-container">
        {editMode ? (
          <AddBook
            book={bookToEdit}
            edit={editMode}
            request={"update"}
            handleEditSubmit={handleEditSubmit}
          />
        ) : (
          renderBooks()
        )}
      </div>
    </div>
  );
}
