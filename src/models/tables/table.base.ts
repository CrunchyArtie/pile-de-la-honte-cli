export abstract class TableBase<T> {
    constructor(public data: T[]) {
    }

    public abstract toString(): string;
}
