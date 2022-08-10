import connectToMongodb from '../_db/mongo-connect';
import mongoose from 'mongoose';
import {BookSchema} from '../_db/schemas';

export default async function handler(request, response) {
  try {
    const startTime = Date.now();
    await connectToMongodb();
    const afterConnectTime = Date.now();
    const Books = mongoose.model('Book', BookSchema, 'books');
    const result = await Books.aggregate([
      {
        $match: {
          publishingYear: {$gt: 1900},
        },
      },
      {
        $lookup: {
          from: 'authors',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $unwind: '$author',
      },
      {
        $project: {
          _id: 0,
          title: 1,
          publishingYear: 1,
          author: '$author.name',
        },
      },
    ]);
    const afterAggregateTime = Date.now();

    return response.status(200).json({
      connectTime: afterConnectTime - startTime,
      aggregationTime: afterAggregateTime - afterConnectTime,
      result,
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({message: 'Server Error'});
  }
}
