import { Types } from 'mongoose';

export default function setVoteQuery(
  voteType: 'upvote' | 'downvote',
  userId: Types.ObjectId,
  rootPath?: string,
) {
  const voteField = voteType + 's';
  const undoField = voteType === 'upvote' ? 'downvotes' : 'upvotes';
  const path = rootPath ? rootPath + '.' : '$';

  return {
    $set: {
      [voteField]: {
        $cond: {
          if: { $in: [userId, `${path}${voteField}.voters`] },
          then: {
            voters: {
              $filter: {
                input: `${path}${voteField}.voters`,
                as: 'voterId',
                cond: { $ne: [userId, '$$voterId'] },
              },
            },
            totalVotes: {
              $sum: [`${path}${voteField}.totalVotes`, -1],
            },
          },
          else: {
            voters: {
              $concatArrays: [`${path}${voteField}.voters`, [userId]],
            },
            totalVotes: {
              $sum: [`${path}${voteField}.totalVotes`, 1],
            },
          },
        },
      },
      [undoField]: {
        $cond: {
          if: { $in: [userId, `${path}${undoField}.voters`] },
          then: {
            voters: {
              $filter: {
                input: `${path}${undoField}.voters`,
                as: 'voterId',
                cond: { $ne: [userId, '$$voterId'] },
              },
            },
            totalVotes: {
              $sum: [`${path}${undoField}.totalVotes`, -1],
            },
          },
          else: `${path}${undoField}`,
        },
      },
    },
  };
}
