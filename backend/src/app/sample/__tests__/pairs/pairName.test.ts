import { PairName } from 'src/domain/pairs/pairName'

describe('ペア名を作成できる', () => {
  it('小文字のアルファベット一文字のペア名を作成できること', () => {
    expect(new PairName('a').value).toEqual('a')
    expect(new PairName('z').value).toEqual('z')
  })

  it('小文字のアルファベット以外は無効であること', () => {
    expect(() => new PairName('A')).toThrow(
      'ペア名は小文字のアルファベットのみ有効です',
    )
    expect(() => new PairName('!')).toThrow(
      'ペア名は小文字のアルファベットのみ有効です',
    )
  })
})

describe('ペア名から次のペア名を作成できる', () => {
  it('ペア名がaの場合、bを取得できること', () => {
    const pairName = new PairName('a')
    const nextPairName = new PairName('b')
    expect(pairName.next()).toEqual(nextPairName)
  })

  it('ペア名がzの場合、エラーになること', () => {
    const pairName = new PairName('z')
    expect(() => pairName.next()).toThrow('これ以上ペアを作成できません')
  })
})
