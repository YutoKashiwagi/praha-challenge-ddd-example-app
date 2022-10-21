import { PrismaClient } from '@prisma/client'
import { IPairRepository } from 'src/app/repository-interface.ts/pair/pair-repository'
import { Pair } from 'src/domain/pairs/pair'
import { Participant } from 'src/domain/participants/participant'
import { UUID } from 'src/util/uuid'

export class PairRepository implements IPairRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async save(pair: Pair): Promise<Pair> {
    // const {
    //   id,
    //   mailAddress,
    //   name,
    //   status,
    // } = participantEntity.getAllProperties()

    // await this.prismaClient.participant.create({
    //   data: {
    //     id,
    //     mailAddress,
    //     name,
    //     status: status as string,
    //   },
    // })
    // return participantEntity
    return pair
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
