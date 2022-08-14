export class ParticipantStatus {
  constructor(private status: '在籍中' | '休会中' | '退会済み') {}

  public value() {
    return this.status
  }
}
