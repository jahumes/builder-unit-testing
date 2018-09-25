
// noinspection TsLint
export type StaticThis<T> = { new (): T};

export class BaseBuilder {
    static init<T extends BaseBuilder>(this: StaticThis<T>): T {
        return new this();
    }
}
