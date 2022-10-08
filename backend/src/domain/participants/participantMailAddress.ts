export class ParticipantMailAddress {
  private mailAddress: string
  constructor(mailAddress: string) {
    if (!this.isValidMailAddress(mailAddress)) {
      throw '不正な形式のメールアドレスです'
    }

    this.mailAddress = mailAddress
  }

  get value() {
    return this.mailAddress
  }

  private isValidMailAddress(mailAddress: string) {
    // todo: 正規表現直す
    const mailAddressRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/
    return mailAddressRegex.test(mailAddress)
  }
}
