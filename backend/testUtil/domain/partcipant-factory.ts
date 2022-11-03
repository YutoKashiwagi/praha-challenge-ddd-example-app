import * as faker from 'faker'
import { ParticipantMailAddress } from "src/domain/participants/participantMailAddress"
import { ParticipantName } from "src/domain/participants/participantName"
import { ParticipantStatus } from "src/domain/participants/participantStatus"
import { Participant } from "src/domain/participants/participant"
import { UUID } from 'src/util/uuid'
import { PrismaClient } from '@prisma/client'

export const mockedParticipant = (
  props: {
    id?: UUID
    name?: ParticipantName
    mailAddress?: ParticipantMailAddress
    status?: ParticipantStatus
  } = {},
) => {
  return new Participant({
    id: props.id ?? UUID.create(),
    name: props.name ?? new ParticipantName('hoge'),
    mailAddress:
      props.mailAddress ??
      new ParticipantMailAddress(
        `example${faker.random.number(100)}@example.com`,
      ),
    status: props.status ?? new ParticipantStatus('在籍中'),
  })
}

export const seedParticipants = async (prisma: PrismaClient, participants: Participant[]) => {
  const participantsForCreateMany = participants.map((participant) => {
      const {
        id,
        mailAddress,
        name,
        status
      } = participant.getAllProperties()

      return {
        id,
        mailAddress,
        name,
        status
      }
    })

  await prisma.participant.createMany({
    data: participantsForCreateMany
  })
}
