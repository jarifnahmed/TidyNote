import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNote } from '../../store/note';
import { getBooks } from '../../store/book';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './PostNote.css';


export default function PostNote(){
    const booksObj = useSelector((state) => state.book.entries);
    const books = Object.values(booksObj);
    const firstBook=books[0]?.id;
    const dispatch= useDispatch();
    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [bookId, setBookId]=useState(firstBook);

      const reset = () => {
        setName("");
        setText("");
        setBookId(firstBook);
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        const newNote = {
          note_name: name,
          note_text: text,
          bookId
        };
        dispatch(createNote(newNote));
        reset();
      };

      const editorConfiguration = {
        toolbar: [
          'heading', '|',
          'bold', 'italic', '|',
          'link', '|',
          'bulletedList', 'numberedList', '|',
          'insertTable', '|',
          'blockQuote', '|',
          'undo', 'redo'
        ], shouldNotGroupWhenFull: true
     };

     const notify = () => {
      if (!name && !text && !bookId) {
        toast.error("Your note needs some information!")
      } else if (!name) {
        toast.error("The note needs a name!");
      } else if (!text) {
        toast.error("The note needs some content!");
      } else if (!bookId) {
        toast.error("The note needs to be assigned to a book!");
      } else {
        toast.success("Saved!")
      }
     }

    return(
        <div className="PostNote">
          <form className='input-data' onSubmit={handleSubmit}>
            <input className='input-data'
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="New Note"
              name="name"
            />
          <CKEditor  className='input-data'
              editor={ClassicEditor}
              config={ editorConfiguration }
              data={text}
              onChange={(event, editor) => {
              const data = editor.getData();
              setText(data)

              }}
          />
            <select className='input-data'
            onChange={(e)=>setBookId(e.target.value)}
            value={bookId}
            required
            >
            <option value=''>Please choose a notebook</option>

            {books.map(({ id, book_name }) => (
                <option value={id}>{book_name}</option>))}
            </select>

            <button onClick={notify} className='delete-button' type="submit">Save</button>
            <ToastContainer
              theme='colored'
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              />
          </form>
        </div>
        );
};
