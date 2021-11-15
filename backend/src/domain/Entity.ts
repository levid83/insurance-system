export abstract class Entity<T> {
  protected readonly _id: number;
  protected props: T;

  constructor(props: T, id?: number) {
    this._id = id;
    this.props = props;
  }
}
