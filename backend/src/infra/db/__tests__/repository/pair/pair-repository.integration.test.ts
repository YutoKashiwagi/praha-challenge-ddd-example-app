import { prisma } from '@testUtil/prisma'
import { ParticipantRepository } from 'src/infra/db/repository/participant/participant-repository'
import { UUID } from 'src/util/uuid'
import { ParticipantMailAddress } from 'src/domain/participants/participantMailAddress'
import { ParticipantName } from 'src/domain/participants/participantName'
import { ParticipantStatus } from 'src/domain/participants/participantStatus'
import { Participant } from 'src/domain/participants/participant'
import { mockedParticipant, seedParticipants } from '@testUtil/domain/partcipant-factory'

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
    it('[正常系]pairを保存できる', async () => {
      const participants = [mockedParticipant(), mockedParticipant()]
      seedParticipants(prisma, participants)

      expect(await prisma.participant.count()).toEqual(2)
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
