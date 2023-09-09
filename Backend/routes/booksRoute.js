import  express  from "express";
const router=express.Router();
import { Book} from "../model/bookModel.js"

router.get("/", async (req, res) => {
    try {
        const book = await Book.find({});
        return res.status(200).json({
            count: book.length,
            Data: book,
        });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
// Get Book By ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({
            count: book.length,
            Data: book,
        });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
// Post Request. Add Data To databse

router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear) {
            return res.status(200).send({ message: 'send all fields: title ,author and publishYear ' })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const book = await Book.create(newBook);
        res.status(203).send(book);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
// Route To  Update Book
router.put("/:id", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({ message: "Send All required Fields:Title,author and publishYear" })
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)
        if (!result)
            return res.status(400).json({ message: "Book not Found" })
        return res.status(201).send({ message: "Book Edited succefully" })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }

})
// Delete Book With Mongoose
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const del = await Book.findByIdAndDelete(id);
        if (!del)
            return res.status(404).json({ message: "Not Found" });
        return res.status(200).send({ message: "Deleted Successfully" })
    } catch (error) {
        res.status(503).json({ message: error.message })
    }
})
export default router;