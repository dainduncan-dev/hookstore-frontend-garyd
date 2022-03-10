import React from 'react';

export default function Book(props) {
    const {id, title, author, review, genre} = props.book;
    return (
      <div key={id} className="book-container main-body">
        <h1>{title}</h1>
        <h3>{author}</h3>
        <h3>{review}</h3>
        <h3>{genre}</h3>

        <div className="btn-container">
          <button className="btn" onClick={() => props.handleEditClick(id)}>
            Edit
          </button>
          <button className="btn" onClick={() => props.handleDeleteClick(id)}>
            Delete
          </button>
        </div>
      </div>
    );
}