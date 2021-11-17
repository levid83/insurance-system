import { Entity } from "../../domain/Entity";
import { EventInterface } from "../interfaces/EventInterface";
import { EventDTO } from "./DTO";

export class Event extends Entity<EventDTO> implements EventInterface {
  private constructor(props: EventDTO) {
    const { id, ...data } = props;
    super(data, id);
  }

  public static create(props: EventDTO): Event {
    const instance = new Event(props);
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
