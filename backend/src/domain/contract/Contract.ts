import { format } from "date-fns";

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

    if (
      format(new Date(props.startDate), "yyyy-MM-dd") <
      format(new Date(), "yyyy-MM-dd")
    )
      throw new Error("Contract start date cannot be in the past");
    return true;
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
    if (
      this.terminationDate &&
      format(new Date(this.terminationDate), "yyyy-MM-dd") <
        format(new Date(), "yyyy-MM-dd")
    )
      throw new Error("Contract is already expired");

    if (!termDate) throw new Error("Missing termination date");
    if (
      format(new Date(this.startDate), "yyyy-MM-dd") >
      format(new Date(termDate), "yyyy-MM-dd")
    )
      throw new Error(
        "Termination date should be greater then start date (or equal)"
      );
    if (
      format(new Date(termDate), "yyyy-MM-dd") <
      format(new Date(), "yyyy-MM-dd")
    )
      throw new Error("Termination date cannot be in the past");

    return true;
  }
}
