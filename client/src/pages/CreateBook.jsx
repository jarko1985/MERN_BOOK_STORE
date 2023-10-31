import React, { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = (event) => {
    event.preventDefault();
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/books/", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Something Wrong Happened...please check your Console");
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center">Create New Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500" htmlFor="title">Title</label>
          <input
           value={title} 
           name="title" 
           onChange={(e)=>setTitle(e.target.value)} 
           className="border-2 border-gray-500 px-4 py-2 w-full"
           />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500" htmlFor="author">Author</label>
          <input
           value={author} 
           name="author" 
           onChange={(e)=>setAuthor(e.target.value)} 
           className="border-2 border-gray-500 px-4 py-2 w-full"
           />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500" htmlFor="yearPublished">Year Published</label>
          <input
           value={publishYear} 
           name="yearPublished" 
           onChange={(e)=>setPublishYear(e.target.value)} 
           className="border-2 border-gray-500 px-4 py-2 w-full"
           />
        </div>
        <button className="p-2 m-8 bg-sky-300" onClick={handleSaveBook}>Save</button> 
      </div>
    </div>
  );
};

export default CreateBook;
