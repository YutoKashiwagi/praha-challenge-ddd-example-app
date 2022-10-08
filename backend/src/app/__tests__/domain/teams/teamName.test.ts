import { TeamName } from 'src/domain/teams/teamName'

describe('チーム名は1~999の整数', () => {
  it('整数のみ有効であること', () => {
    expect(() => new TeamName(1.5)).toThrow('チーム名は1~999の数値のみ有効です')
    expect(new TeamName(2).value()).toBe(2)
  })

  it('1未満は無効であること', () => {
    expect(() => new TeamName(-10000000000000)).toThrow(
      'チーム名は1~999の数値のみ有効です',
    )
    expect(() => new TeamName(0)).toThrow('チーム名は1~999の数値のみ有効です')
  })

  it('1から999までの整数は有効であること', () => {
    expect(new TeamName(1).value()).toBe(1)
    expect(new TeamName(999).value()).toBe(999)
  })

  it('1000以上は無効であること', () => {
    expect(() => new TeamName(1000)).toThrow(
      'チーム名は1~999の数値のみ有効です',
    )
    expect(() => new TeamName(10000000000000)).toThrow(
      'チーム名は1~999の数値のみ有効です',
    )
  })
})
