export class ParticipantName {
  private name: string
  static MAX_LENGTH: number = 50
  static MIN_LENGTH: number = 1

  constructor(name: string) {
    if (name.length < ParticipantName.MIN_LENGTH || name.length > ParticipantName.MAX_LENGTH) {
      throw '参加者名は1~50文字までです'
    }
    this.name = name
  }

  get value() {
    return this.name
  }
}
