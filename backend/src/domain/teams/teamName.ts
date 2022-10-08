export class TeamName {
  private name: number

  constructor(name: number) {
    if (!this.isValidValue(name)) {
      throw 'チーム名は1~999の数値のみ有効です'
    }
    this.name = name
  }

  public value() {
    return this.name
  }

  private isValidValue(value: number) {
    return Number.isInteger(value) && value >= 1 && value <= 999
  }
}
