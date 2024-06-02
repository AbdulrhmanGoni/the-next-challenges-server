import { PaginationOptions } from '../../global-dto/pagination-options.dto';
import { SearchForPostInput } from '../dto/search-for-post.input';
import { Post } from '../schemas/post.schema';
import { Model } from 'mongoose';

export default async function findPosts(
  searchQuery: SearchForPostInput,
  options?: PaginationOptions,
) {
  const PostModel = this.PostModel as Model<Post>;

  const { page = 0, pageSize = 10 } = options || {};

  const posts = await PostModel.find(
    searchQuery,
    {},
    {
      limit: pageSize,
      skip: pageSize * (page - 1),
    },
  );
  return posts;
}
