const Ichimoku = require('../lib/index.js')
const candles = require('./data.js')
const assert = require('chai').assert;
const expect = require('chai').expect;

describe('Ichimoku', () => {
    const ichimoku = new Ichimoku({conversionPeriod: 9, basePeriod: 26, spanPeriod: 52, values: []})

    var ichimokuValue = {}
    var ichimokuValues = []

    beforeEach(() => {
        for (let candle of candles) {
            ichimokuValues.push(
                ichimoku.nextValue({
                    high: candle.mid.h,
                    low: candle.mid.l,
                    close: candle.mid.c
                })
            )
        }

        ichimokuValue = ichimokuValues.slice(-1).pop()
        ichimokuValues = ichimokuValues.slice(-10)

    })

    it('should return a conversion line', () => {
        expect(ichimokuValue).to.contain.key('conversion')
    })

    it('should return a base line', () => {
        expect(ichimokuValue).to.contain.key('base')
    })

    it('should return a Span A line', () => {
        expect(ichimokuValue).to.contain.key('spanA')
    })

    it('should return a Span B line', () => {
        expect(ichimokuValue).to.contain.key('spanB')
    })

    it('should return a Lagging span', () => {
        expect(ichimokuValue).to.contain.key('lagging')
    })

    it('should calculate the correct line values', () => {
        expect(ichimokuValues).to.deep.equal([{
                conversion: 1.3393,
                base: 1.336665,
                spanA: 1.3375975,
                spanB: 1.337445,
                spanBNoDis: 1.33747,
                spanANoDis: 1.3379825,
                lagging: 1.34332
            },
                {
                    conversion: 1.33921,
                    base: 1.336665,
                    spanA: 1.33748,
                    spanB: 1.337445,
                    spanBNoDis: 1.33747,
                    spanANoDis: 1.3379375,
                    lagging: 1.34354
                },
                {
                    conversion: 1.33899,
                    base: 1.336665,
                    spanA: 1.337525,
                    spanB: 1.337445,
                    spanBNoDis: 1.33747,
                    spanANoDis: 1.3378275,
                    lagging: 1.34397
                },
                {
                    conversion: 1.33899,
                    base: 1.336665,
                    spanA: 1.3375875,
                    spanB: 1.33736,
                    spanBNoDis: 1.33747,
                    spanANoDis: 1.3378275,
                    lagging: 1.34354
                },
                {
                    conversion: 1.339,
                    base: 1.336675,
                    spanA: 1.3378325,
                    spanB: 1.33736,
                    spanBNoDis: 1.33747,
                    spanANoDis: 1.3378375,
                    lagging: 1.34336
                },
                {
                    conversion: 1.33956,
                    base: 1.337235,
                    spanA: 1.33791,
                    spanB: 1.33736,
                    spanBNoDis: 1.33747,
                    spanANoDis: 1.3383975,
                    lagging: 1.3438
                },
                {
                    conversion: 1.33956,
                    base: 1.337235,
                    spanA: 1.33791,
                    spanB: 1.33736,
                    spanBNoDis: 1.33747,
                    spanANoDis: 1.3383975,
                    lagging: 1.34406
                },
                {
                    conversion: 1.33956,
                    base: 1.337235,
                    spanA: 1.337715,
                    spanB: 1.33736,
                    spanBNoDis: 1.33747,
                    spanANoDis: 1.3383975,
                    lagging: 1.34392
                },
                {
                    conversion: 1.33982,
                    base: 1.337495,
                    spanA: 1.337715,
                    spanB: 1.33716,
                    spanBNoDis: 1.337495,
                    spanANoDis: 1.3386575,
                    lagging: 1.34366
                },
                {
                    conversion: 1.33982,
                    base: 1.337495,
                    spanA: 1.33811,
                    spanB: 1.33709,
                    spanBNoDis: 1.337495,
                    spanANoDis: 1.3386575,
                    lagging: 1.34349
                }]
        )
    })
});
