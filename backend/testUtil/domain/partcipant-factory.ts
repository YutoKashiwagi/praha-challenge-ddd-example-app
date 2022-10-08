import * as faker from 'faker'
import { ParticipantMailAddress } from "src/domain/participants/participantMailAddress"
import { ParticipantName } from "src/domain/participants/participantName"
import { ParticipantStatus } from "src/domain/participants/participantStatus"
import { ParticipantID } from "src/domain/participants/paticipantID"
import { Participant } from "src/domain/participants/participant"

export const mockedParticipant = (
  props: {
    id?: ParticipantID
    name?: ParticipantName
    mailAddress?: ParticipantMailAddress
    status?: ParticipantStatus
  } = {},
) => {
  return new Participant({
    id: props.id ?? new ParticipantID(faker.random.number()),
    name: props.name ?? new ParticipantName('hoge'),
    mailAddress:
      props.mailAddress ??
      new ParticipantMailAddress(
        `example${faker.random.number(100)}@example.com`,
      ),
    status: props.status ?? new ParticipantStatus('在籍中'),
  })
}
