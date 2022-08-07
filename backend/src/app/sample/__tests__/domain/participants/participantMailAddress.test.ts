import { ParticipantMailAddress } from "src/domain/participants/participantMailAddress"

// ちゃんとテストするのは大変なので軽く済ませる
describe('正しい形式のメールアドレスのみ有効', () => {
  it('不正な形式の場合は例外が発生すること', () => {
    expect(() => new ParticipantMailAddress('hogehoge')).toThrow('不正な形式のメールアドレスです')
  })

  it('正しい形式の場合は許可されること', () => {
    expect(new ParticipantMailAddress('hogehoge@example.com').value).toBe('hogehoge@example.com')
  })
})
