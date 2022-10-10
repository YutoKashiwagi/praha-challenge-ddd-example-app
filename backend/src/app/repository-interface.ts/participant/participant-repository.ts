import { Participant } from 'src/domain/participants/participant'
import { UUID } from 'src/util/uuid'

export interface IParticipantRepository {
  save(participant: Participant): Promise<Participant>
  find(id: UUID): Promise<Participant | null>
}
