import { Model, Types } from 'mongoose';
import { PostsComments } from '../schemas/posts-comments.schema';
import { InternalServerErrorException } from '@nestjs/common';
import { PaginationOptions } from '../../global/dto/pagination-options.dto';
import preparePaginationOptions from '../../global/utils/preparePaginationOptions';

export default async function getPostComments(
  postId: Types.ObjectId,
  pagination: PaginationOptions,
) {
  try {
    const PostCommentsModel = this.PostCommentsModel as Model<PostsComments>;

    const { limit, skip } = preparePaginationOptions(pagination);
    const result = await PostCommentsModel.aggregate([
      { $match: { _id: postId } },
      {
        $set: {
          comments: { $slice: ['$comments', skip, limit] },
        },
      },
    ]);

    return result[0]?.comments || [];
  } catch {
    throw new InternalServerErrorException();
  }
}
