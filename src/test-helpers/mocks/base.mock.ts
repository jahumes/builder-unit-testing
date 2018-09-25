
// noinspection TsLint
export type StaticThis<T> = { new (): T};

export class BaseMock {
    static init<T extends BaseMock>(this: StaticThis<T>): T {
        return new this();
    }
}
