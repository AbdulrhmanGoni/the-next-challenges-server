import { Types } from 'mongoose';

export default function setVoteQuery(
  voteType: 'upvote' | 'downvote',
  userId: Types.ObjectId,
) {
  const voteField = voteType + 's';
  const undoField = voteType === 'upvote' ? 'downvotes' : 'upvotes';

  return {
    $set: {
      [voteField]: {
        $cond: {
          if: { $in: [userId, `$${voteField}.voters`] },
          then: {
            voters: {
              $filter: {
                input: `$${voteField}.voters`,
                as: 'voterId',
                cond: { $ne: [userId, '$$voterId'] },
              },
            },
            totalVotes: {
              $sum: [`$${voteField}.totalVotes`, -1],
            },
          },
          else: {
            voters: {
              $concatArrays: [`$${voteField}.voters`, [userId]],
            },
            totalVotes: {
              $sum: [`$${voteField}.totalVotes`, 1],
            },
          },
        },
      },
      [undoField]: {
        $cond: {
          if: { $in: [userId, `$${undoField}.voters`] },
          then: {
            voters: {
              $filter: {
                input: `$${undoField}.voters`,
                as: 'voterId',
                cond: { $ne: [userId, '$$voterId'] },
              },
            },
            totalVotes: {
              $sum: [`$${undoField}.totalVotes`, -1],
            },
          },
          else: `$${undoField}`,
        },
      },
    },
  };
}
