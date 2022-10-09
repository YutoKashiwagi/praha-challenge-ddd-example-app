import { Controller, Get } from '@nestjs/common'

@Controller('api/v1/teams')
export class TeamsController {
  @Get()
  getTeams() {
    return 'success'
  }
}
