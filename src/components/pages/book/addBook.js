import React, { useState, useEffect } from "react";
import { navigate } from "hookrouter";

export default function AddBook(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [review, setReview] = useState("");
  const [genre, setGenre] = useState("");
  const [requestType, setRequestType] = useState(props.request);
  const [request, setRequest] = useState("");
  const [bookToEdit, setBookToEdit] = useState(props.book);
  const [endPoint, setEndPoint] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(endPoint, {
      method: request,
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        title: title,
        author: author,
        review: review,
        genre: genre,
      }),
    }).then((res) => {
      if(props.edit === true) {
        props.handleEditSubmit()
      } else {
        navigate('/');
      }
    });
  };

  useEffect(() => {
    if(requestType === "add") {
      setEndPoint("https://garyd-hookstore.herokuapp.com/book/add");
      setRequest('POST');
    } else if (requestType === 'update') {
      setEndPoint(
        `https://garyd-hookstore.herokuapp.com/book/update/${bookToEdit.id}`
      );
      setRequest('PUT');

      if(bookToEdit) {
        setTitle(bookToEdit.title);
        setAuthor(bookToEdit.author);
        setReview(bookToEdit.review);
        setGenre(bookToEdit.genre);
      }
    }
  }, []);

  return (
    <form className="add-book-form main-body" onSubmit={handleSubmit}>
      <div className="book-form-inputs">
        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={bookToEdit ? bookToEdit.title : ""}
        />
        <input
          type="text"
          placeholder="Author"
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
          defaultValue={bookToEdit ? bookToEdit.author : ""}
        />
        <input
          type="text"
          placeholder="Review"
          name="review"
          onChange={(e) => setReview(e.target.value)}
          defaultValue={bookToEdit ? bookToEdit.review : ""}
        />
        <input
          type="text"
          placeholder="Genre"
          name="genre"
          onChange={(e) => setGenre(e.target.value)}
          defaultValue={bookToEdit ? bookToEdit.genre : ""}
        />
      </div>

      <button className="btn" type="submit">Submit</button>
    </form>
  );
}
