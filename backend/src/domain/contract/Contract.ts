import { Entity } from "../Entity";
import { ContractDTO } from "./DTO";

export class Contract extends Entity<ContractDTO> {
  private constructor(props: ContractDTO) {
    const { id, ...data } = props;
    super(data, id);
  }

  public static create(props: ContractDTO): Contract {
    if (typeof props.premium === "undefined" || props.premium === null)
      throw new Error("Missing premium.");
    if (isNaN(props.premium) || props.premium < 0)
      throw new Error("Premium should be a positive number");

    if (!props.startDate) throw new Error("Missing contract start date.");

    if (props.startDate <= new Date())
      throw new Error("Contract start date cannot be in the past");

    return new Contract(props);
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

  terminate(termDate: Date): void {
    if (!termDate) throw new Error("Missing termination date");
    if (this.startDate >= termDate)
      throw new Error("Start date must be greater then termination date");
    if (termDate <= new Date())
      throw new Error("Termination date cannot be in the past");
    this.props.terminationDate = termDate;
  }
}
