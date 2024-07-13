import { EditPostOptions } from '../dto/update-post.input';

export default function createTagsUpdateQuery(
  updateTags: EditPostOptions['tags'],
) {
  const tagsUpdates: {
      $concatArrays: (object | string)[];
    } = { $concatArrays: [] },
    { newTags = [], removedTags = [] } = updateTags || {};

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
