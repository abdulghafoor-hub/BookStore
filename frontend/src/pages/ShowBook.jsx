import { useState, useEffect } from "react";
import Spinner from "../components/Spinner"
import axios from "axios";
import BackButton from "../components/BackButtons"
import { useParams } from "react-router-dom";
const ShowBook = () => {
  const[books, setBooks]=useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const {id} =useParams();
  useEffect(()=>{
    setIsLoading(true);
    axios
    .get(`http://localhost:5555/books/${id}`)
    .then((response)=>{
      setBooks(response.data.Data);
      setIsLoading(false);
    })
    .catch((error)=>{
      console.log(error)
      setIsLoading(false)
    })
  },[])
  return (
    <div className="p-4 " >
      <BackButton />
      <h1 className="text-3xl my-4"> show Book</h1>
      {
        isLoading? (<Spinner />):(
          <div className="flex flex-col border-2 border-sky-400 rounded-lg w-fit  p-4">
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500"> Id</span>
              <span >{books._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500"> Title</span>
              <span >{books.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500"> Author</span>
              <span >{books.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500"> publish Year</span>
              <span >{books.publishYear}</span>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ShowBook