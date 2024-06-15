import { Model, Types } from 'mongoose';
import { EditPostOptions } from '../dto/update-post.input';
import { Post } from '../schemas/post.schema';
import { InternalServerErrorException } from '@nestjs/common';
import createTagsUpdateQuery from './createTagsUpdateQuery';
import createResourcesUpdateQuery from './createResourcesUpdateQuery';

export default async function editPost(
  postId: Types.ObjectId,
  authorId: Types.ObjectId,
  editPostOptions: EditPostOptions,
) {
  const { tags, resources, ...editOptions } = editPostOptions;
  const updateStage = { $set: editOptions };

  const tagsUpdateQuery = createTagsUpdateQuery(tags);
  if (tagsUpdateQuery) {
    Object.assign(updateStage.$set, { tags: tagsUpdateQuery });
  }

  const resourcesUpdateQuery = createResourcesUpdateQuery(resources);
  if (resourcesUpdateQuery) {
    Object.assign(updateStage.$set, { resources: resourcesUpdateQuery });
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
