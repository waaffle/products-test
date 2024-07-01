import { vi } from 'vitest';
import { fetchProducts } from './fetchProducts';
import { products } from '../mock/mock-products';

describe('Тесты запросов', () => {

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('Получение продуктов без поискового запроса', async () => {
        const mockData = { products, total: 5 };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData
        });

        const result = await fetchProducts('');
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith('https://dummyjson.com/products/?limit=24&skip=0');
    });

    it('Получение продуктов с поисковым запросом', async () => {
        const mockData = { products, total: 5 };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData
        });
        const searchValue = 'Red';
        const result = await fetchProducts(searchValue);
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith('https://dummyjson.com/products/search?q=Red');
    });

    it('Получение продуктов с пагинацией', async () => {
        const mockData = { products, total: 5 };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData
        });
        const currentPage = 2;
        const result = await fetchProducts('', currentPage);
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith('https://dummyjson.com/products/?limit=24&skip=24');
    });

    it('Обработка ошибки при запросе', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false
        });
        await expect(fetchProducts()).rejects.toThrow('Failed to fetch products');
        expect(global.fetch).toHaveBeenCalledWith('https://dummyjson.com/products/?limit=24&skip=0');
    });
});
