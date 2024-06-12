import { PaginationOptions } from '../dto/pagination-options.dto';

const defaultPageSize = 5;
const defaultPageNumber = 0;

export default function preparePaginationOptions(options: PaginationOptions) {
  const limit = options?.pageSize || defaultPageSize;
  const skip = ((options?.page || defaultPageNumber) - 1) * limit;

  return { limit, skip };
}
