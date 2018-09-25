// noinspection TsLint
export type StaticThis<T> = { new(): T };

export abstract class BaseBuilder {
  static init<T extends BaseBuilder>(this: StaticThis<T>): T {
    return new this();
  }
}
