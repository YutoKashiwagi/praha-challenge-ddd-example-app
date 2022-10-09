import { UUID } from 'src/util/uuid'
import { Participant } from '../participants/participant'
import { PairName } from './pairName'
export class Pair {
  static readonly PARTICIPANT_MIN_LENGTH = 2
  static readonly PARTICIPANT_MAX_LENGTH = 3
  public readonly participants: Participant[]
  public readonly pairName: PairName
  public readonly id: UUID

  constructor(id: UUID, participants: Participant[], pairName: PairName) {
    // 人数制限
    if (
      participants.length < Pair.PARTICIPANT_MIN_LENGTH ||
      participants.length > Pair.PARTICIPANT_MAX_LENGTH
    ) {
      throw 'ペア内の参加者は2~3名までです'
    }
    this.ensureAllParticipantsActive(participants)
    this.participants = participants
    this.pairName = pairName
    this.id = id
  }

  public addParticipant(participant: Participant) {
    return new Pair(
      this.id,
      this.participants.concat([participant]),
      this.pairName,
    )
  }

  public removeParticipant(participant: Participant) {
    if (this.participants.length <= Pair.PARTICIPANT_MIN_LENGTH) {
      throw 'ペア内の参加者が2名未満となるため、参加者をペアから削除できません'
    }

    const newParticipants = this.participants.filter(
      (_participant) => _participant.id() !== participant.id(),
    )
    if (newParticipants.length === this.participants.length) {
      throw 'ペアに参加者が含まれていません'
    }
    return new Pair(this.id, newParticipants, this.pairName)
  }

  public nextPair(participants: Participant[]) {
    // ペアが上限になった場合のエラーハンドリングは面倒なので行わない
    return new Pair(UUID.create(), participants, this.pairName.next())
  }

  private ensureAllParticipantsActive(participants: Participant[]) {
    participants.forEach((participant) => {
      if (!participant.isActive()) {
        throw '在籍中以外の参加者が含まれています'
      }
    })
  }
}
