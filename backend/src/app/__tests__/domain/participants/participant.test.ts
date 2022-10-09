import { Participant } from 'src/domain/participants/participant'
import { ParticipantMailAddress } from 'src/domain/participants/participantMailAddress'
import { ParticipantName } from 'src/domain/participants/participantName'
import { ParticipantStatus } from 'src/domain/participants/participantStatus'
import { UUID } from 'src/util/uuid'

describe('参加者エンティティを生成できる', () => {
  it('インスタンスを生成でき、値を取得できること', () => {
    const id = UUID.create()
    const mailAddress = new ParticipantMailAddress('hoge@example.com')
    const name = new ParticipantName('hoge')
    const status = new ParticipantStatus('在籍中')
    const participant = new Participant({
      id,
      mailAddress,
      name,
      status,
    })
    expect(participant).toBeInstanceOf(Participant)
  })
})

describe('在籍中か判定できる', () => {
  it('在籍中の場合、trueを返すこと', () => {
    const id = UUID.create()
    const mailAddress = new ParticipantMailAddress('hoge@example.com')
    const name = new ParticipantName('hoge')
    const status = new ParticipantStatus('在籍中')
    const participant = new Participant({
      id,
      mailAddress,
      name,
      status,
    })
    expect(participant.isActive()).toEqual(true)
  })

  it('在籍中以外の場合、falseを返すこと', () => {
    const id = UUID.create()
    const mailAddress = new ParticipantMailAddress('hoge@example.com')
    const name = new ParticipantName('hoge')
    const status = new ParticipantStatus('休会中')
    const participant = new Participant({
      id,
      mailAddress,
      name,
      status,
    })
    expect(participant.isActive()).toEqual(false)
  })
})
