import { describe, it, expect } from 'vitest';
import { calculateTotal } from './calculator';

describe('calculateTotal', () => {
    it('правильно рахує суму без знижки', () => {
        expect(calculateTotal(100, 2)).toBe(200);
    });

    it('правильно рахує суму зі знижкою 10%', () => {
        expect(calculateTotal(100, 2, 10)).toBe(180);
    });

    it('повертає 0, якщо ціна відємна', () => {
        expect(calculateTotal(-50, 2)).toBe(0);
    });

    it('повертає 0, якщо кількість відємна', () => {
        expect(calculateTotal(100, -1)).toBe(0);
    });

    it('коректно обробляє нульову кількість', () => {
        expect(calculateTotal(100, 0)).toBe(0);
    });

    it('коректно обробляє 100% знижку', () => {
        expect(calculateTotal(500, 1, 100)).toBe(0);
    });

    it('повертає 0, якщо знижка більша за 100%', () => {
        expect(calculateTotal(100, 1, 150)).toBe(0);
    });
});