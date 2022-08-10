import mongoose from 'mongoose';

export const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  yearOfBirth: {
    type: Number,
    required: true,
  },
});

export const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publishingYear: {
    type: Number,
    required: true,
  },
  authorId: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'Author',
  },
});
