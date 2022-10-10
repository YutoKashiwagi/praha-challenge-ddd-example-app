import { PrismaClient } from '@prisma/client'
import { IParticipantRepository } from 'src/app/repository-interface.ts/participant/participant-repository'
import { Participant } from 'src/domain/participants/participant'

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
}
