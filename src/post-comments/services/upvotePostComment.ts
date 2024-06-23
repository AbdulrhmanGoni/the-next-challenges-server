import { Model, Types } from 'mongoose';
import { InternalServerErrorException } from '@nestjs/common';
import { PostsComments } from '../schemas/posts-comments.schema';
import setVoteQuery from '../../global/utils/setVoteQuery';

export default async function upvotePostComment(
  postId: Types.ObjectId,
  commentId: Types.ObjectId,
  userId: Types.ObjectId,
) {
  try {
    const PostCommentsModel = this.PostCommentsModel as Model<PostsComments>;
    const { acknowledged, modifiedCount } = await PostCommentsModel.updateOne(
      { _id: postId },
      [
        {
          $set: {
            comments: {
              $map: {
                input: '$comments',
                as: 'comment',
                in: {
                  $cond: {
                    if: { $eq: ['$$comment.id', commentId] },
                    then: {
                      id: '$$comment.id',
                      commenterId: '$$comment.commenterId',
                      comment: '$$comment.comment',
                      ...setVoteQuery('upvote', userId, '$$comment').$set,
                    },
                    else: '$$comment',
                  },
                },
              },
            },
          },
        },
      ],
    );

    return acknowledged && !!modifiedCount;
  } catch {
    throw new InternalServerErrorException();
  }
}
