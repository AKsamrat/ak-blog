/* eslint-disable prettier/prettier */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;

    console.log('search', search);
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    // console.log(this)
    return this;
  }

  filter() {
    if (this.query.filter) {
      this.query.author = this.query.filter; // Assuming `author` is the field in your Blog model
    }

    const queryObj = { ...this.query };
    const excludingImportant = [
      'search',
      'sortOrder',
      'sortBy',
      'filter',

    ];

    excludingImportant.forEach((key) => delete queryObj[key]);
    console.log('queryObj', queryObj)

    this.modelQuery = this.modelQuery.find(queryObj);

    return this;
  }

  sort() {
    let sortStr;
    console.log('sorting', this?.query?.sortBy)

    if (this?.query?.sortBy && this?.query?.sortOrder) {
      const sortBy = this?.query?.sortBy;
      const sortOrder = this?.query?.sortOrder;
      console.log('sorting', sortBy, sortOrder)

      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    }

    this.modelQuery = this.modelQuery.sort(sortStr);

    return this;
  }
}

export default QueryBuilder;
