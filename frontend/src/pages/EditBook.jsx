import { useState, useEffect } from "react"
import axios from "axios"
import Spinner from "../components/Spinner"
import BackButtons from "../components/BackButtons"
import { useNavigate, useParams } from "react-router-dom"

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {id}= useParams();

  useEffect(()=>{
    setIsLoading(true)
    axios
    .get(`http://localhost:5555/books/${id}`)
    .then((response)=>{
      setTitle(response.data.Data.title)
      setAuthor(response.data.Data.author)
      setPublishYear(response.data.Data.publishYear)
      setIsLoading(false)
    })
    .catch((error)=>{
      console.log(error);
    })
  }, [])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear
    }
    setIsLoading(true)
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        navigate('/')
        setIsLoading(false);
      })
      .catch((error)=>{
        setIsLoading(false)
        alert('An Error happend');
        console.log(error);
      })
  }
  return (
    <div className='p-4'>
      <BackButtons />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {isLoading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}

export default EditBook;
