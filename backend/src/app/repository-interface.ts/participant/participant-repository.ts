import { Participant } from 'src/domain/participants/participant'

export interface IParticipantRepository {
  save(participant: Participant): Promise<Participant>
}
