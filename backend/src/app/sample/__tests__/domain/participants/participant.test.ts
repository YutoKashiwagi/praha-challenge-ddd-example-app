import { Participant } from "src/domain/participants/participant"
import { ParticipantMailAddress } from "src/domain/participants/participantMailAddress"
import { ParticipantName } from "src/domain/participants/participantName"
import { ParticipantStatus } from "src/domain/participants/participantStatus"
import { ParticipantID } from "src/domain/participants/paticipantID"

describe('参加者エンティティを生成できる', () => {
  it('インスタンスを生成でき、値を取得できること', () => {
    const id = new ParticipantID(1)
    const mailAddress = new ParticipantMailAddress('hoge@example.com')
    const name = new ParticipantName('hoge')
    const status = new ParticipantStatus('在籍中')
    const participant = new Participant({
      id,
      mailAddress,
      name,
      status
    })
    expect(participant).toBeInstanceOf(Participant)
    // TODO: 値の取得
  })
})
