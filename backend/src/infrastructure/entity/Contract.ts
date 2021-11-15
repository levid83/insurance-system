import { Contract as DomainContract } from "../../domain/contract/Contract";
import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity({ name: "contracts" })
export class Contract {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  premium: number;

  @Column({ type: "date", nullable: false })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  terminationDate: Date;

  static toDomain(contract: Contract): DomainContract {
    return DomainContract.create({
      id: contract.id,
      premium: contract.premium,
      startDate: contract.startDate,
      terminationDate: contract.terminationDate,
    });
  }

  fromDomain(contract: DomainContract): void {
    this.id = contract.id;
    this.premium = contract.premium;
    this.startDate = contract.startDate;
    this.terminationDate = contract.terminationDate;
  }
}
