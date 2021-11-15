import { Command } from "../event-sourcing/interfaces/Command";
import { CommandHandler } from "../event-sourcing/interfaces/CommandHandler";
import { Event } from "../event-sourcing/interfaces/Event";
import { EventSourcingBase } from "../event-sourcing/interfaces/EventSourcingBase";
import { EventStore } from "../event-sourcing/interfaces/EventStore";

export class EventService<
  C extends Command,
  E extends Event
> extends EventSourcingBase<C, E> {
  constructor(commandHandler: CommandHandler<C, E>, eventStore: EventStore) {
    super(commandHandler, eventStore);
  }
}
