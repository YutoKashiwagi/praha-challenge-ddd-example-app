import { prisma } from '@testUtil/prisma'
import { UUID } from 'src/util/uuid'
import {
  mockedParticipant,
  seedParticipants,
} from '@testUtil/domain/partcipant-factory'
import { Pair } from 'src/domain/pairs/pair'
import { PairName } from 'src/domain/pairs/pairName'
import { PairRepository } from 'src/infra/db/repository/pair/pair-repository'

describe('pair-repository.integration.ts', () => {
  const pairRepo = new PairRepository(prisma)
  beforeAll(async () => {
    await prisma.pairParticipant.deleteMany()
    await prisma.participant.deleteMany()
    await prisma.pair.deleteMany()
  })
  afterEach(async () => {
    await prisma.pairParticipant.deleteMany()
    await prisma.participant.deleteMany()
    await prisma.pair.deleteMany()
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('save', () => {
    it('[正常系]pairを新規作成できる', async () => {
      const participants = [mockedParticipant(), mockedParticipant()]
      seedParticipants(prisma, participants)

      const pairID = UUID.create()
      const pair = new Pair(pairID, participants, new PairName('a'))
      await pairRepo.save(pair)

      const savedPair = await prisma.pair.findUnique({
        where: { id: pairID.value },
      })
      expect(savedPair?.id).toEqual(pairID.value)
      expect(savedPair?.name).toEqual(pair.pairName.value)

      const savedPairPariticiapnts = await prisma.pairParticipant.findMany({
        where: {
          pairID: pairID.value,
        },
      })
      expect(savedPairPariticiapnts).toHaveLength(2)
      expect(savedPairPariticiapnts).toContainEqual({
        pairID: pairID.value,
        participantID: participants[0]?.id(),
      })
      expect(savedPairPariticiapnts).toContainEqual({
        pairID: pairID.value,
        participantID: participants[1]?.id(),
      })
    })

    it('[正常系]pairのメンバーを更新できる', async () => {
      // participantsとpairNameを更新できる
      const participant1 = mockedParticipant()
      const participant2 = mockedParticipant()
      const participant3 = mockedParticipant()
      seedParticipants(prisma, [participant1, participant2, participant3])

      const pairID = UUID.create()
      await prisma.pair.create({
        data: {
          id: pairID.value,
          name: 'a',
        },
      })
      await prisma.pairParticipant.createMany({
        data: [{ pairID: pairID.value, participantID: participant1.id() }],
      })

      const pair = new Pair(
        pairID,
        [participant2, participant3],
        new PairName('b'),
      )
      await pairRepo.save(pair)

      const savedPair = await prisma.pair.findUnique({
        where: { id: pairID.value },
      })
      expect(savedPair?.id).toEqual(pairID.value)
      expect(savedPair?.name).toEqual('b')

      const savedPairPariticiapnts = await prisma.pairParticipant.findMany({
        where: {
          pairID: pairID.value,
        },
      })
      expect(savedPairPariticiapnts).toHaveLength(2)
      expect(savedPairPariticiapnts).toContainEqual({
        pairID: pairID.value,
        participantID: participant2.id(),
      })
      expect(savedPairPariticiapnts).toContainEqual({
        pairID: pairID.value,
        participantID: participant3.id(),
      })
    })
  })

  describe('find', () => {
    it('[正常系]対象のPairを返すこと', async () => {
      // pair1, pair2を作成し、pair1をfindする
      const participant1 = mockedParticipant()
      const participant2 = mockedParticipant()
      const participant3 = mockedParticipant()
      const participant4 = mockedParticipant()
      seedParticipants(prisma, [
        participant1,
        participant2,
        participant3,
        participant4,
      ])

      // pair1のseed
      const pair1ID = UUID.create()
      await prisma.pair.create({
        data: {
          id: pair1ID.value,
          name: 'a',
        },
      })
      await prisma.pairParticipant.createMany({
        data: [
          { pairID: pair1ID.value, participantID: participant1.id() },
          { pairID: pair1ID.value, participantID: participant2.id() },
        ],
      })

      // pair2のseed
      const pair2ID = UUID.create()
      await prisma.pair.create({
        data: {
          id: pair2ID.value,
          name: 'b',
        },
      })
      await prisma.pairParticipant.createMany({
        data: [
          { pairID: pair2ID.value, participantID: participant3.id() },
          { pairID: pair2ID.value, participantID: participant4.id() },
        ],
      })

      const foundPair = await pairRepo.find(pair1ID)
      expect(foundPair).toEqual(
        new Pair(pair1ID, [participant1, participant2], new PairName('a')),
      )
    })

    it('[正常系]対象のPairが見つからない場合、nullを返すこと', async () => {
      const id = UUID.create()
      expect(await pairRepo.find(id)).toBeNull()
    })
  })
})
