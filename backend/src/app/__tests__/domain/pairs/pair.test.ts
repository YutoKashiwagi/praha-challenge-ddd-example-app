import { Pair } from 'src/domain/pairs/pair'
import { PairName } from 'src/domain/pairs/pairName'
import { ParticipantStatus } from 'src/domain/participants/participantStatus'
import { mockedParticipant } from '@testUtil/domain/partcipant-factory'
import { UUID } from 'src/util/uuid'

describe('ペアを作成できる', () => {
  it('1名以下の場合、無効であること', () => {
    // 0名
    expect(() => {
      new Pair(UUID.create(), [], new PairName('a'))
    }).toThrow('ペア内の参加者は2~3名までです')
    // 1名
    expect(() => {
      new Pair(UUID.create(), [mockedParticipant()], new PairName('a'))
    }).toThrow('ペア内の参加者は2~3名までです')
  })

  it('2~3名の場合、有効であること', () => {
    // 2名
    expect(
      new Pair(
        UUID.create(),
        [mockedParticipant(), mockedParticipant()],
        new PairName('a'),
      ),
    ).toBeInstanceOf(Pair)
    // 3名
    expect(
      new Pair(
        UUID.create(),
        Array(3).fill(mockedParticipant()),
        new PairName('a'),
      ),
    ).toBeInstanceOf(Pair)
  })

  it('4名以上の場合、無効であること', () => {
    expect(() => {
      new Pair(
        UUID.create(),
        Array(4).fill(mockedParticipant()),
        new PairName('a'),
      )
    }).toThrow('ペア内の参加者は2~3名までです')
  })

  it('在籍中以外のステータスの参加者はペアになれないこと', () => {
    const validParticipant = mockedParticipant()
    const invalidParticipant = mockedParticipant({
      status: new ParticipantStatus('休会中'),
    })
    expect(
      () =>
        new Pair(
          UUID.create(),
          [validParticipant, invalidParticipant],
          new PairName('a'),
        ),
    ).toThrow('在籍中以外の参加者が含まれています')
  })
})

describe('ペアに参加者を追加できる', () => {
  it('ペアの人数が2名の場合、追加できること', () => {
    const participants = [mockedParticipant(), mockedParticipant()]
    const pairID = UUID.create()
    const pair = new Pair(pairID, participants, new PairName('a'))

    const newParticipant = mockedParticipant()
    const newPair = pair.addParticipant(newParticipant)
    const newPairParticipants = participants.concat([newParticipant])
    expect(newPair).toEqual(
      new Pair(pairID, newPairParticipants, new PairName('a')),
    )
  })

  it('ペアの人数が3名の場合、追加できないこと', () => {
    const participants = [
      mockedParticipant(),
      mockedParticipant(),
      mockedParticipant(),
    ]
    const pair = new Pair(UUID.create(), participants, new PairName('a'))

    const newParticipant = mockedParticipant()
    expect(() => pair.addParticipant(newParticipant)).toThrow(
      'ペア内の参加者は2~3名までです',
    )
  })
})

describe('ペアから参加者を削除できる', () => {
  it('ペアの人数が二名の場合、削除できないこと', () => {
    const participant1 = mockedParticipant()
    const participant2 = mockedParticipant()
    const pair = new Pair(
      UUID.create(),
      [participant1, participant2],
      new PairName('a'),
    )

    expect(() => pair.removeParticipant(participant1)).toThrow(
      'ペア内の参加者が2名未満となるため、参加者をペアから削除できません',
    )
  })

  it('ペアの参加者が3名の場合、削除できること', () => {
    const participant1 = mockedParticipant()
    const participant2 = mockedParticipant()
    const participant3 = mockedParticipant()
    const pairID = UUID.create()
    const pair = new Pair(
      pairID,
      [participant1, participant2, participant3],
      new PairName('a'),
    )

    expect(pair.removeParticipant(participant1)).toEqual(
      new Pair(pairID, [participant2, participant3], new PairName('a')),
    )
  })

  it('削除したい参加者がペアに含まれていない場合、例外が発生すること', () => {
    const pair = new Pair(
      UUID.create(),
      [mockedParticipant(), mockedParticipant(), mockedParticipant()],
      new PairName('a'),
    )

    const notExistParticipant = mockedParticipant()
    expect(() => pair.removeParticipant(notExistParticipant)).toThrow(
      'ペアに参加者が含まれていません',
    )
  })
})

describe('次のペアを作成できる', () => {
  it('次のペアを作成できること', () => {
    const latestPair = new Pair(
      UUID.create(),
      [mockedParticipant(), mockedParticipant()],
      new PairName('a'),
    )
    const nextPairParticipants = [mockedParticipant(), mockedParticipant()]
    const nextPair = latestPair.nextPair(nextPairParticipants)
    expect(nextPair.participants).toEqual(nextPairParticipants)
    expect(nextPair.pairName).toEqual(new PairName('b'))
  })
})
