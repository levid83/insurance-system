import { Entity } from "../../domain/Entity";
import { Event } from "../interfaces/Event";
import { EventStoreDTO } from "./EventStoreDTO";

export class EventStore extends Entity<EventStoreDTO> implements Event {
  private constructor(props: EventStoreDTO) {
    const { id, ...data } = props;
    super(data, id);
  }

  public static create(props: EventStoreDTO): EventStore {
    const instance = new EventStore(props);
    return instance;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get entityId(): number {
    return this.props.entityId;
  }

  get event(): object {
    return this.props.event;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      entityId: this.entityId,
      payload: this.event,
    };
  }
}
