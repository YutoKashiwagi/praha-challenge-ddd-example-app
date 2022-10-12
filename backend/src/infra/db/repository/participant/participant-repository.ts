import { PrismaClient } from '@prisma/client'
import { IParticipantRepository } from 'src/app/repository-interface.ts/participant/participant-repository'
import { Participant } from 'src/domain/participants/participant'
import { ParticipantMailAddress } from 'src/domain/participants/participantMailAddress'
import { ParticipantName } from 'src/domain/participants/participantName'
import { ParticipantStatus } from 'src/domain/participants/participantStatus'
import { UUID } from 'src/util/uuid'

export class ParticipantRepository implements IParticipantRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async save(participantEntity: Participant) {
    const {
      id,
      mailAddress,
      name,
      status,
    } = participantEntity.getAllProperties()

    await this.prismaClient.participant.create({
      data: {
        id,
        mailAddress,
        name,
        status: status as string,
      },
    })
    return participantEntity
  }

  public async find(participantID: UUID) {
    const participantRecord = await this.prismaClient.participant.findUnique({
      where: { id: participantID.value },
    })

    if (participantRecord === null) {
      return null
    }

    return new Participant({
      id: UUID.restore(participantRecord.id),
      mailAddress: new ParticipantMailAddress(participantRecord.mailAddress),
      name: new ParticipantName(participantRecord.name),
      status: new ParticipantStatus(
        participantRecord.status as '在籍中' | '休会中' | '退会済み',
      ),
    })
  }
}
