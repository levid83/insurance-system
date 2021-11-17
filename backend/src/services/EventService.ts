import { CommandInterface } from "../event-sourcing/interfaces/CommandInterface";
import { CommandHandler } from "../event-sourcing/interfaces/CommandHandlerInterface";
import { EventInterface } from "../event-sourcing/interfaces/EventInterface";
import { EventSourcingBase } from "../event-sourcing/interfaces/EventSourcingBase";
import { EventStore } from "../event-sourcing/interfaces/EventStore";

export class EventService<
  C extends CommandInterface,
  E extends EventInterface
> extends EventSourcingBase<C, E> {
  constructor(commandHandler: CommandHandler<C, E>, eventStore: EventStore) {
    super(commandHandler, eventStore);
  }
  async execute(command: C): Promise<EventInterface | boolean> {
    const domainEvent = await this.commandHandler.execute(command);
    if (domainEvent === false) return false;
    const event = await this.eventStore.save(domainEvent);
    if (event) return event;
    else return false;
  }
}
