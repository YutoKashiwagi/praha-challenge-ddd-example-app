import { UUID } from 'src/util/uuid'
import { uuid, isUuid } from 'uuidv4'

describe('文字列からインスタンスを生成できる', () => {
  it('uuidインスタンスを作成できる', () => {
    const uuidString = '69def822-2097-4a25-b6d6-ff54ab8e553b'
    expect(UUID.restore(uuidString).value).toEqual(uuidString)
  })

  it('文字列がuuid v4のフォーマットでない場合、エラーになること', () => {
    expect(() => UUID.restore('hoge')).toThrowError()
  })
})

describe('UUID V4のIDを作成できる', () => {
  const createdUUID = UUID.create().value
  expect(isUuid(createdUUID)).toEqual(true)
})

describe('比較できる', () => {
  it('比較できること', () => {
    const uuidString = '69def822-2097-4a25-b6d6-ff54ab8e553b'
    const uuid = UUID.restore(uuidString)
    expect(uuid.equal(UUID.restore(uuidString))).toEqual(true)
    expect(
      uuid.equal(UUID.restore('4bac9dd1-ed49-4ba7-8e63-7334ffc4c5be')),
    ).toEqual(false)
  })
})
