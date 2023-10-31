import { Book } from "../models/BookModel.js";
import express from 'express';

const bookRouter = express.Router();

//CREATE A NEW BOOK
bookRouter.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response
          .status(400)
          .send({ message: "Please Fill all Required Fields" });
      }
      const { title, author, publishYear } = request.body;
      const newBook = {
        title: title,
        author: author,
        publishYear: publishYear,
      };
      const book = await Book.create(newBook);
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  //GET ALL BOOKS
  bookRouter.get("/", async (request, response) => {
    try {
      const allBooks = await Book.find({});
      return response.status(200).send({
        count: allBooks.length,
        data: allBooks,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  //GET BOOK BY ID
  bookRouter.get("/:id", async (request, response) => {
    try {
      const bookId = request.params.id;
      const book = await Book.findById(bookId);
      return response.status(200).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  //UPDATE BOOK BY ID
  bookRouter.put("/:id", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response
          .status(400)
          .send({ message: "Please Fill all Required Fields" });
      }
      const bookId = request.params.id;
      const result = await Book.findByIdAndUpdate(bookId,request.body);
      if(!result){
          return response.status(404).json({message:"Book Not Found With Provided ID"});
      }
      else{
          response.status(200).send({message:`Book with ID of ${bookId} Has been Updated Successfully`})
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  //DELETE BOOK BY ID
  bookRouter.delete('/:id',async(request,response)=>{
     try {
      const bookId = request.params.id;
      const result = await Book.findByIdAndDelete(bookId);
      if(!result){
          return response.status(404).json({message:"Book Not Found With Provided ID"});
      }
      return response.status(200).send({message:`Book with ID ${bookId} Has been Deleted`}) 
     } catch (error) {
      console.log(error.message);
      response.status(500).send({message:error.message})
     }
  });

  export default bookRouter;