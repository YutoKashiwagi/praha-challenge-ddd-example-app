import { PrismaClient } from '@prisma/client'
import { IPairRepository } from 'src/app/repository-interface.ts/pair/pair-repository'
import { Pair } from 'src/domain/pairs/pair'
import { PairName } from 'src/domain/pairs/pairName'
import { Participant } from 'src/domain/participants/participant'
import { ParticipantMailAddress } from 'src/domain/participants/participantMailAddress'
import { ParticipantName } from 'src/domain/participants/participantName'
import {
  ParticipantStatus,
  ParticipantType,
} from 'src/domain/participants/participantStatus'
import { UUID } from 'src/util/uuid'

export class PairRepository implements IPairRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async save(pair: Pair): Promise<Pair> {
    const { id, participants, name } = pair.getAllProperties()

    await this.prismaClient.pair.upsert({
      where: {
        id,
      },
      update: {
        name,
      },
      create: {
        id,
        name,
      },
    })

    await this.prismaClient.pairParticipant.deleteMany({
      where: {
        pairID: id,
      },
    })
    await this.prismaClient.pairParticipant.createMany({
      data: participants,
    })

    return pair
  }

  public async find(id: UUID) {
    const pairRecord = await this.prismaClient.pair.findUnique({
      where: {
        id: id.value,
      },
      include: {
        participants: {
          include: {
            participant: true,
          },
        },
      },
    })

    if (pairRecord === null) {
      return null
    }

    return new Pair(
      UUID.restore(pairRecord.id),
      pairRecord.participants.map((pairParticipant) => {
        const participant = pairParticipant.participant

        return new Participant({
          id: UUID.restore(participant.id),
          name: new ParticipantName(participant.name),
          mailAddress: new ParticipantMailAddress(participant.mailAddress),
          status: new ParticipantStatus(participant.status as ParticipantType),
        })
      }),
      new PairName('a'),
    )
  }
}
