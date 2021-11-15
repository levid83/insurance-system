import { Command } from "./Command";
import { CommandHandler } from "./CommandHandler";
import { Event } from "./Event";
import { EventStore } from "./EventStore";

export interface Service {
  execute(command: Command): void;
}

export abstract class EventSourcingBase<C extends Command, E extends Event>
  implements Service
{
  constructor(
    private commandHandler: CommandHandler<C, E>,
    private eventStoreService: EventStore
  ) {}

  async execute(command: C) {
    const event = await this.commandHandler.execute(command);
    if (event === false) return false;
    return await this.eventStoreService.save(event);
  }
}
