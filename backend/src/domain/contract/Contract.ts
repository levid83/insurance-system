import { Entity } from "../Entity";
import { CreateContractDTO } from "./DTO";

export class Contract extends Entity<CreateContractDTO> {
  private constructor(props: CreateContractDTO) {
    const { id, ...data } = props;
    super(data, id);
  }

  public static create(props: CreateContractDTO): Contract {
    return new Contract(props);
  }

  static validateCreation(props: CreateContractDTO) {
    if (typeof props.premium === "undefined" || props.premium === null)
      throw new Error("Missing premium.");
    if (isNaN(props.premium) || props.premium < 0)
      throw new Error("Premium should be a positive number");

    if (!props.startDate) throw new Error("Missing contract start date.");

    if (new Date(props.startDate) < new Date())
      throw new Error("Contract start date cannot be in the past");
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
      startDate: this.startDate,
      terminationDate: this.terminationDate,
    };
  }

  terminate(termDate: Date): void {
    this.props.terminationDate = termDate;
  }

  validateTermination(termDate: Date) {
    if (!termDate) throw new Error("Missing termination date");
    if (new Date(this.startDate) > new Date(termDate))
      throw new Error("Start date must be greater then termination date");
    if (new Date(termDate) < new Date())
      throw new Error("Termination date cannot be in the past");
  }
}
