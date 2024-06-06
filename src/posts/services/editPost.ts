import { Model, Types } from 'mongoose';
import { EditPostOptions } from '../dto/update-post.input';
import { Post } from '../schemas/post.schema';
import { InternalServerErrorException } from '@nestjs/common';

export default async function editPost(
  postId: Types.ObjectId,
  authorId: Types.ObjectId,
  editPostOptions: EditPostOptions,
) {
  const { tags, ...editOptions } = editPostOptions;

  const updateStage = { $set: editOptions };

  const tagsUpdateQuery = createTagsUpdateQuery(
    tags?.newTags,
    tags?.removedTags,
  );
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

function createTagsUpdateQuery(
  newTags: EditPostOptions['tags']['newTags'] = [],
  removedTags: EditPostOptions['tags']['removedTags'] = [],
) {
  const tagsUpdates = { $concatArrays: new Array() };

  if (newTags.length || removedTags.length) {
    if (removedTags.length) {
      tagsUpdates.$concatArrays.push({
        $filter: {
          input: '$tags',
          as: 'tag',
          cond: { $not: [{ $in: ['$$tag', removedTags] }] },
        },
      });
    } else {
      tagsUpdates.$concatArrays.push('$tags');
    }

    if (newTags.length) {
      tagsUpdates.$concatArrays.push({
        $filter: {
          input: newTags,
          as: 'tag',
          cond: { $not: [{ $in: ['$$tag', '$tags'] }] },
        },
      });
    } else {
      tagsUpdates.$concatArrays.push(newTags);
    }

    return tagsUpdates;
  }
}
