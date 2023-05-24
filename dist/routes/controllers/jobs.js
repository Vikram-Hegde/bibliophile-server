"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelated = exports.getBooks = exports.createBook = exports.getBook = exports.reviewBook = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema_1 = require("../../Models/bookSchema");
const getBooks = async (req, res) => {
    try {
        const data = await bookSchema_1.bookModel.find();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(404).json(error);
    }
};
exports.getBooks = getBooks;
const createBook = async (req, res) => {
    try {
        const obj = req.body.book;
        const book = new bookSchema_1.bookModel({ ...obj });
        const newBookMessage = await book.save();
        res.status(201).json(newBookMessage);
    }
    catch (error) {
        res.status(409).json(error);
    }
};
exports.createBook = createBook;
const getBook = async (req, res) => {
    const { id } = req.params;
    if (mongoose_1.default.Types.ObjectId.isValid(id)) {
        const data = await bookSchema_1.bookModel.findById(id).populate("reviews");
        res.status(200).json(data);
    }
};
exports.getBook = getBook;
const reviewBook = async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body.review;
        const review = new bookSchema_1.reviewModel(obj);
        const newReviewMessage = await review.save();
        const updatedBook = await bookSchema_1.bookModel.findByIdAndUpdate(id, { $push: { reviews: newReviewMessage._id } }, { new: true, runValidators: true });
        res.status(201).json({ review: newReviewMessage, book: updatedBook });
    }
    catch (error) {
        console.log(error);
    }
};
exports.reviewBook = reviewBook;
const getRelated = async (req, res) => {
    try {
        const genres = req.query.genres;
        const { id } = req.params;
        let decodedGenres;
        let regExGenres;
        if (Array.isArray(genres)) {
            decodedGenres = genres?.map((genre) => decodeURIComponent(genre));
            regExGenres = decodedGenres?.map((genre) => RegExp(genre, "i"));
        }
        else {
            regExGenres = RegExp(genres, "i");
        }
        if (mongoose_1.default.Types.ObjectId.isValid(id)) {
            const data = await bookSchema_1.bookModel
                .find({ genre: { $in: regExGenres }, _id: { $ne: id } })
                .limit(4);
            res.status(200).json(data);
        }
    }
    catch (error) {
        res.sendStatus(400);
    }
};
exports.getRelated = getRelated;
