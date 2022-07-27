export class ParticipantMailAddress {
  private mailAddress: string
  constructor(mailAddress: string) {
    if (!this.isValidMailAddress(mailAddress)) {
      throw '不正な形式のメールアドレスです'
    }

    this.mailAddress = mailAddress
  }

  public value() {
    return this.mailAddress
  }

  private isValidMailAddress(mailAddress: string) {
    const mailAddressRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/
    return mailAddressRegex.test(mailAddress)
  }
}
