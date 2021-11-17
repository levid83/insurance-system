import { CommandInterface } from "./CommandInterface";
import { CommandHandler } from "./CommandHandlerInterface";
import { EventInterface } from "./EventInterface";
import { EventStore } from "./EventStore";

export interface ServiceInterface {
  execute(command: CommandInterface): void;
}

export abstract class EventSourcingBase<
  C extends CommandInterface,
  E extends EventInterface
> implements ServiceInterface
{
  constructor(
    protected commandHandler: CommandHandler<C, E>,
    protected eventStore: EventStore
  ) {}

  abstract execute(command: C): Promise<EventInterface | boolean>;
}
