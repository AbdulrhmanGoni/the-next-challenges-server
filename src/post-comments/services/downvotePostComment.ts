import { Model, Types } from 'mongoose';
import { InternalServerErrorException } from '@nestjs/common';
import { PostsComments } from '../schemas/posts-comments.schema';
import setVoteQuery from '../../global/utils/setVoteQuery';

export default async function downvotePostComment(
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
                      $mergeObjects: [
                        '$$comment',
                        setVoteQuery('downvote', userId, '$$comment').$set,
                      ],
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
