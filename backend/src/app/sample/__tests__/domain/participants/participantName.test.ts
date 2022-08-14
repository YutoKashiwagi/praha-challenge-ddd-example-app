import { ParticipantName } from 'src/domain/participants/participantName'

describe('1~50文字の参加者名のみ有効であること', () => {
  it('空文字列は無効であること', () => {
    expect(() => new ParticipantName('')).toThrow('参加者名は1~50文字までです')
  })

  it('1~50文字は有効であること', () => {
    expect(new ParticipantName('a').value).toBe('a')
    expect(new ParticipantName('a'.repeat(50)).value).toBe('a'.repeat(50))
  })

  it('51文字以上は無効であること', () => {
    expect(() => new ParticipantName('a'.repeat(51))).toThrow(
      '参加者名は1~50文字までです',
    )
  })
})
