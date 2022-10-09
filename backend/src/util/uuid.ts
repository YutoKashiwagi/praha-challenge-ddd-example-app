import { uuid, isUuid } from 'uuidv4'

export class UUID {
  private id: string

  private constructor(id: string) {
    if (!isUuid(id)) {
      throw new Error('uuid v4のフォーマットで指定してください')
    }

    this.id = id
  }

  get value() {
    return this.id
  }

  public equal(uuid: UUID) {
    return this.value === uuid.value
  }

  public static create() {
    return new UUID(uuid())
  }

  public static restore(value: string) {
    return new UUID(value)
  }
}
