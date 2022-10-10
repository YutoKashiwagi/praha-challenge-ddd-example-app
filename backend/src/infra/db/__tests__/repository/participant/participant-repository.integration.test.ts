import { prisma } from '@testUtil/prisma'
import { ParticipantRepository } from 'src/infra/db/repository/participant/participant-repository'
import { UUID } from 'src/util/uuid'
import { ParticipantMailAddress } from 'src/domain/participants/participantMailAddress'
import { ParticipantName } from 'src/domain/participants/participantName'
import { ParticipantStatus } from 'src/domain/participants/participantStatus'
import { Participant } from 'src/domain/participants/participant'

describe('participant-repository.integration.ts', () => {
  const participantRepo = new ParticipantRepository(prisma)
  beforeAll(async () => {
    await prisma.participant.deleteMany({})
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  describe('save', () => {
    afterEach(async () => {
      await prisma.participant.deleteMany()
    })
    it('[正常系]participantを保存できる', async () => {
      const id = UUID.create()
      const mailAddress = new ParticipantMailAddress('hoge@example.com')
      const name = new ParticipantName('hoge')
      const status = new ParticipantStatus('休会中')
      const participant = new Participant({
        id,
        mailAddress,
        name,
        status,
      })
      const expectedParticipantData = {
        id: id.value,
        mailAddress: mailAddress.value,
        name: name.value,
        status: status.value(),
      }

      await participantRepo.save(participant)
      const allParticipants = await prisma.participant.findMany({})
      expect(allParticipants).toHaveLength(1)
      expect(allParticipants[0]).toEqual(expectedParticipantData)
    })
  })

  describe('find', () => {
    afterEach(async () => {
      await prisma.participant.deleteMany()
    })

    it('対象のparticipantを取得できること', async () => {
      const id = UUID.create()
      const mailAddress = new ParticipantMailAddress('hoge@example.com')
      const name = new ParticipantName('hoge')
      const status = new ParticipantStatus('休会中')
      await prisma.participant.create({
        data: {
          id: id.value,
          mailAddress: mailAddress.value,
          name: name.value,
          status: status.value(),
        },
      })

      const expectedParticipant = new Participant({
        id,
        mailAddress,
        name,
        status,
      })
      const foundParticipant = await participantRepo.find(id)
      expect(foundParticipant).toEqual(expectedParticipant)
    })

    it('対象のparticipantが存在しない場合、nullを返すこと', async () => {
      const result = await participantRepo.find(UUID.create())
      expect(result).toBeNull()
    })
  })
})
