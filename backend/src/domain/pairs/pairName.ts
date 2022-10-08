export class PairName {
  private name: string
  private readonly names = [...'abcdefghijklmnopqrstuvwxyz']

  constructor(name: string) {
    const nameRegexp = /[a-z]/
    if (!nameRegexp.test(name)) {
      throw 'ペア名は小文字のアルファベットのみ有効です'
    }
    this.name = name
  }

  get value() {
    return this.name
  }

  public next() {
    const currentIndex = this.names.indexOf(this.name)
    if (currentIndex === -1) {
      throw '無効なペア名です'
    }

    let nextName = ''
    if (currentIndex === 25) {
      throw 'これ以上ペアを作成できません'
    } else {
      nextName = this.names[currentIndex + 1] as string
    }
    return new PairName(nextName)
  }
}
