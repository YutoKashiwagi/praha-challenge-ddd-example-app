import { Test, TestingModule } from '@nestjs/testing'
import { TeamsController } from '../../../controller/teams/teams.controller'

describe('Controller', () => {
  let controller: TeamsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
    }).compile()

    controller = module.get<TeamsController>(TeamsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('期待通りのレスポンスを返すこと', async () => {
    const response = await controller.getTeams()
    expect(response).toEqual('success')
  })
})
