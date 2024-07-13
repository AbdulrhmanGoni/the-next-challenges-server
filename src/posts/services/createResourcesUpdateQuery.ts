import { Types } from 'mongoose';
import { EditPostOptions } from '../dto/update-post.input';

export default function createResourcesUpdateQuery(
  updateResources: EditPostOptions['resources'],
) {
  const resourcesUpdate: {
      $concatArrays: (object | string)[];
    } = {
      $concatArrays: [],
    },
    {
      newResources = [],
      removedResources = [],
      updatedResources = [],
    } = updateResources || {};

  if (
    newResources.length ||
    removedResources.length ||
    updatedResources.length
  ) {
    if (removedResources.length) {
      resourcesUpdate.$concatArrays.push({
        $filter: {
          input: '$resources',
          as: 'resource',
          cond: { $not: [{ $in: ['$$resource._id', removedResources] }] },
        },
      });
    } else {
      resourcesUpdate.$concatArrays.push('$resources');
    }

    if (newResources.length) {
      resourcesUpdate.$concatArrays.push(
        newResources.map((resource) => {
          Object.assign(resource, { _id: new Types.ObjectId() });
          return resource;
        }),
      );
    } else {
      resourcesUpdate.$concatArrays.push([]);
    }

    if (updatedResources.length) {
      return {
        $map: {
          input: resourcesUpdate,
          as: 'resource',
          in: {
            $let: {
              vars: {
                index: {
                  $indexOfArray: [
                    updatedResources.map(({ _id }) => _id),
                    '$$resource._id',
                  ],
                },
              },
              in: {
                $cond: {
                  if: { $ne: ['$$index', -1] },
                  then: {
                    $mergeObjects: [
                      '$$resource',
                      { $arrayElemAt: [updatedResources, '$$index'] },
                    ],
                  },
                  else: '$$resource',
                },
              },
            },
          },
        },
      };
    } else {
      return resourcesUpdate;
    }
  }
}
