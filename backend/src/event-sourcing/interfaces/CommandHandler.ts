import { Command } from "./Command";
import { Event } from "./Event";

export interface CommandHandler<C extends Command, E extends Event> {
  validate(command: C): Promise<boolean>;
  execute(command: C): Promise<E | false>;
}
