import { useState, useEffect, useCallback } from "react";
import {
  db,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "../firbaseconfigs";
import Users from "./Users";

export default function DataBase() {
  const [books, setBooks] = useState([]);
  const [name,setName] = useState([])
  const [newBook, setNewBook] = useState({
    Author: "",
    Title: "",
    Price: "",
    DateOfPublication: "",
  });
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = useCallback(async () => {
    try {
      const bookCollection = collection(db, "Books");
      const bookSnapshot = await getDocs(bookCollection);
      const bookList = bookSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(bookList);
    } catch (e) {
      console.error("Fetching error", e);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleAddBooks = useCallback(async () => {
    try {
      const bookCollection = collection(db, "Books");
      await addDoc(bookCollection, newBook);
      setBooks((prevBooks) => [...prevBooks, newBook]);
      setNewBook({ Author: "", Title: "", Price: "", DateOfPublication: "" });
    } catch (e) {
      console.error("Adding error", e);
    }
  }, [newBook]);

  const handleEditBook = useCallback(async (id, updatedBook) => {
    try {
      const bookDoc = doc(db, "Books", id);
      await updateDoc(bookDoc, updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? updatedBook : book))
      );
      setEditingBook(null);
      setNewBook({ Author: "", Title: "", Price: "", DateOfPublication: "" });
    } catch (e) {
      console.error("Editing error", e);
    }
  }, []);

  const handleDeleteBook = useCallback(async (id) => {
    try {
      const bookDoc = doc(db, "Books", id);
      await deleteDoc(bookDoc);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (e) {
      console.error("Deleting error", e);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div>
      <div>
        <h2>{editingBook ? "Editing" : "Booklist"} </h2>

        <input
          type="text"
          name="Title"
          placeholder="Title"
          value={newBook.Title}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="Author"
          placeholder="Author"
          value={newBook.Author}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="DateOfPublication"
          placeholder="Date of Publication"
          value={newBook.DateOfPublication}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Price"
          placeholder="Price"
          value={newBook.Price}
          onChange={handleInputChange}
        />

        {editingBook ? (
          <>
            <button onClick={() => handleEditBook(editingBook.id, newBook)}>
              Save
            </button>
            <button onClick={() => setEditingBook(null)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAddBooks}>ADD</button>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.Title}</td>
              <td>{book.Author}</td>
              <td>{book.DateOfPublication}</td>
              <td>{book.Price}</td>
              <td>
                <button
                  onClick={() => {
                    setEditingBook(book);
                    setNewBook({
                      Author: book.Author,
                      Title: book.Title,
                      Price: book.Price,
                      DateOfPublication: book.DateOfPublication,
                    });
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteBook(book.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <br />
      <br />
      <br />

      <div>
        <Users/>
      </div>
    </div>
  );
}
