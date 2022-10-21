import { Pair } from 'src/domain/pairs/pair'
import { UUID } from 'src/util/uuid'

export interface IPairRepository {
  save(pair: Pair): Promise<Pair>
  find(id: UUID): Promise<Pair | null>
}
