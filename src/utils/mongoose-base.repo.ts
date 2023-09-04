import {
  Aggregate,
  AggregateOptions,
  AnyObject,
  ClientSessionOptions,
  Document,
  FilterQuery,
  InsertManyOptions,
  Model,
  MongooseBulkWriteOptions,
  PipelineStage,
  ProjectionType,
  Query,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import {
  BulkWriteOptions,
  AnyBulkWriteOperation,
  ChangeStreamOptions,
} from 'mongodb';
import { PopulateOptions } from 'mongoose';

interface PaginateOptions {
  page: number;
  limit: number;
}

export class MongooseBaseRepo<T> {
  public readonly modelName: string;
  constructor(private readonly model: Model<T>) {
    this.model = model;
    this.modelName = model.modelName;
  }

  new(doc?: Partial<T>, fields?: any, options?: boolean | AnyObject) {
    return new this.model(doc, fields, options);
  }

  aggregate(pipeline?: PipelineStage[], options?: AggregateOptions) {
    return this.model.aggregate(pipeline, options);
  }

  bulkSave(
    documents: Document<any, any, any>[],
    options?: BulkWriteOptions & {
      timestamps?: boolean;
    },
  ) {
    return this.model.bulkSave(documents, options);
  }

  bulkWrite(
    writes: AnyBulkWriteOperation<
      // eslint-disable-next-line
      T extends Document<any, any, any> ? any : T extends {} ? T : any
    >[],
    options?: BulkWriteOptions & MongooseBulkWriteOptions,
  ) {
    return this.model.bulkWrite(writes, options);
  }

  countDocuments(filter?: FilterQuery<T>, options?: QueryOptions<T>) {
    return this.model.countDocuments(filter, options);
  }

  deleteMany(filter?: FilterQuery<T>, options?: QueryOptions<T>) {
    return this.model.deleteMany(filter, options);
  }

  deleteOne(filter?: FilterQuery<T>, options?: QueryOptions<T>) {
    return this.model.deleteOne(filter, options);
  }

  estimatedDocumentCount(options?: QueryOptions<T>) {
    return this.model.estimatedDocumentCount(options);
  }

  exists(filter: FilterQuery<T>) {
    return this.model.exists(filter);
  }

  find(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.find(filter, projection, options);
  }

  findById(id: any, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
    return this.model.findById(id, projection, options);
  }

  findByIdAndDelete(id?: any, options?: QueryOptions<T>) {
    return this.model.findByIdAndDelete(id, options);
  }

  findByIdAndUpdate(
    id?: any,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  findOne(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.findOne(filter, projection, options);
  }

  findOneAndDelete(filter?: FilterQuery<T>, options?: QueryOptions<T>) {
    return this.model.findOneAndDelete(filter, options);
  }

  findOneAndReplace(
    filter?: FilterQuery<T>,
    replacement?: T | AnyObject,
    options?: QueryOptions<T>,
  ) {
    return this.model.findOneAndReplace(filter, replacement, options);
  }

  findOneAndUpdate(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  insertMany(docs: T[], options: InsertManyOptions & { lean: true }) {
    return this.model.insertMany(docs, options);
  }

  startSession(options?: ClientSessionOptions) {
    return this.model.startSession(options);
  }

  updateMany(
    filter?: FilterQuery<T>,
    update?: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.updateMany(filter, update, options);
  }

  updateOne(
    filter?: FilterQuery<T>,
    update?: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.updateOne(filter, update, options);
  }

  watch(
    pipeline?: Record<string, unknown>[],
    options?: ChangeStreamOptions & { hydrate?: boolean },
  ) {
    return this.model.watch(pipeline, options);
  }

  populate(docs: any[], options: string | PopulateOptions | PopulateOptions[]) {
    return this.model.populate(docs, options);
  }

  async paginate(
    query: Query<Array<Document>, Document> | Aggregate<any[]>,
    filter: Record<string, any>,
    options: PaginateOptions,
  ) {
    const { limit, page } = options;
    const isFilter = Object.keys(filter).length;

    const [total, results] = await Promise.all([
      isFilter ? this.countDocuments(filter) : this.estimatedDocumentCount(),
      query,
    ]);
    return {
      page,
      limit,
      total,
      results,
    };
  }
}
