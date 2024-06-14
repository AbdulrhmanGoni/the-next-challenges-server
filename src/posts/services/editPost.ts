import { Model, Types } from 'mongoose';
import { EditPostOptions } from '../dto/update-post.input';
import { Post } from '../schemas/post.schema';
import { InternalServerErrorException } from '@nestjs/common';
import createTagsUpdateQuery from './createTagsUpdateQuery';

export default async function editPost(
  postId: Types.ObjectId,
  authorId: Types.ObjectId,
  editPostOptions: EditPostOptions,
) {
  const { tags, ...editOptions } = editPostOptions;
  const updateStage = { $set: editOptions };

  const tagsUpdateQuery = createTagsUpdateQuery(tags);
  if (tagsUpdateQuery) {
    Object.assign(updateStage.$set, { tags: tagsUpdateQuery });
  }

  try {
    const PostModel = this.PostModel as Model<Post>;
    const { acknowledged, modifiedCount } = await PostModel.updateOne(
      { _id: postId, authorId },
      [updateStage],
    );

    return acknowledged && !!modifiedCount;
  } catch {
    throw new InternalServerErrorException();
  }
}
