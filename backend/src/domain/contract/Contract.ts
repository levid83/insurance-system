import { Entity } from "../Entity";
import { ContractDTO } from "./DTO";

export class Contract extends Entity<ContractDTO> {
  private constructor(props: ContractDTO) {
    const { id, ...data } = props;
    super(data, id);
  }

  public static create(props: ContractDTO): Contract {
    const instance = new Contract(props);
    return instance;
  }

  get id(): number {
    return this._id;
  }

  get premium(): number {
    return this.props.premium;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get terminationDate(): Date {
    return this.props.terminationDate;
  }

  toJSON() {
    return {
      id: this.id,
      premium: this.premium,
      startDate: this.startDate.toISOString().substr(0, 10),
      terminationDate: this.terminationDate.toISOString().substr(0, 10),
    };
  }

  terminate(date: Date): boolean {
    this.props.terminationDate = date;
    return true;
  }
}
