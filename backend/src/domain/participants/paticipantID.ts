export class ParticipantID {
  private id: number
  constructor(id: number) {
    this.id = id
  }

  get value() {
    return this.id
  }
}
