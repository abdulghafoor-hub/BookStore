
import { Link } from "react-router-dom"
import { BsInfoCircle } from "react-icons/bs"
import { AiOutlineEdit } from "react-icons/ai"
import {MdOutlineDelete } from "react-icons/md";

const Booktable = ({book}  ) => {
  return (
    <div> 
        <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border-slate-600  rounded-md">No</th>
                <th className="border-slate-600  rounded-md">Title</th>
                <th className="border-slate-600 rounded-md max-md:hidden">Author</th>
                <th className="border-slate-600 rounded-md max-md:hidden">Publish Year</th>
                <th className="border-slate-600 rounded-md ">Operaton</th>
              </tr>
            </thead>
            <tbody>
              {book.map((books, index) =>(
                <tr key={books._id} className="h-8">
                  <td className="border border-slate-700  rounded-md  text-center"> {index + 1}</td>
                  <td className="border border-slate-700  rounded-md  text-center"> {books.title}</td>
                  <td className="border border-slate-700  rounded-md  text-center max-md:hidden"> {books.author}</td>
                  <td className="border border-slate-700  rounded-md  text-center max-md:hidden"> {books.publishYear}</td>
                  <td className="border border-slate-700  rounded-md  text-center ">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${books._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </Link>
                      <Link to={`/books/edit/${books._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/books/delete/${books._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  )
}

export default Booktable