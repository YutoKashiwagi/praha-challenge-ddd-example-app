import { Module } from '@nestjs/common'
import { SampleController } from './controller/sample/some-data.controller'
import { TeamsController } from './controller/teams/teams.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [SampleController, TeamsController],
  providers: [],
})
export class AppModule {}
