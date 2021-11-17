import { CommandInterface } from "./CommandInterface";
import { EventInterface } from "./EventInterface";

export interface CommandHandler<
  C extends CommandInterface,
  E extends EventInterface
> {
  validate(command: C): Promise<boolean>;
  execute(command: C): Promise<E | false>;
}
