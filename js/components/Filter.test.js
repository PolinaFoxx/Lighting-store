import { filterProducts } from "./Filter";
const mockData = [
    {
        id: 1,
        name: "Люстра в наличии pendant",
        availability: { moscow: 10, orenburg: 0, saintPetersburg: 5 },
        type: ["pendant", "nightlights"]
    },
    {
        id: 2,
        name: "Люстра без остатка pendant",
        availability: { moscow: 0, orenburg: 0, saintPetersburg: 0 },
        type: ["pendant"]
    },
    {
        id: 3,
        name: "Люстра ceiling в наличии",
        availability: { moscow: 15, orenburg: 20, saintPetersburg: 0 },
        type: ["ceiling", "overhead"]
    },
    {
        id: 4,
        name: "Люстра ceiling без остатка",
        availability: { moscow: 0, orenburg: 0, saintPetersburg: 0 },
        type: ["ceiling"]
    },
    {
        id: 5,
        name: "Универсальная люстра",
        availability: { moscow: 3, orenburg: 7, saintPetersburg: 12 },
        type: ["pendant", "ceiling", "nightlights"]
    },
    {
        id: 6,
        name: "Люстра без типа",
        availability: { moscow: 1, orenburg: 2, saintPetersburg: 3 },
        type: []
    }
]
describe('filterProducts', () => {

    it('все в наличии при status "all-item"', () => {
        const result = filterProducts(['pendant'], mockData, 'all-item');
        expect(result).toHaveLength(3);
    });

    it('ТОЛЬКО в наличии', () => {
        const result = filterProducts(['pendant'], mockData, 'in-stock');
        expect(result.map(p => p.id)).toEqual([1, 5]);
    });

    it('пустой массив типов возвращает все товары при status "all-item"', () => {
        const result = filterProducts([], mockData, 'all-item');
        expect(result).toHaveLength(6); // к примеру 6 товаров
    });

    it('пустой массив типов возвращает только товары в наличии при status "in-stock"', () => {
        const result = filterProducts([], mockData, 'in-stock');
        expect(result.map(p => p.id)).toEqual([1, 3, 5, 6]); // товары с остатками > 0
    });
})