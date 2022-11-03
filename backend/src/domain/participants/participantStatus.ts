export type ParticipantType = '在籍中' | '休会中' | '退会済み'
export class ParticipantStatus {
  constructor(private status: ParticipantType) {}

  public value() {
    return this.status
  }
}
