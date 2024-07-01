import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductsList } from './ProductsList';
import { fetchProducts } from '../../services/fetchProducts';
import { vi } from 'vitest';
import { products } from '../../mock/mock-products';


vi.mock('../../services/fetchProducts');

describe('Компонент ProductsList', () => {

    it('Отображает список продуктов после загрузки', async () => {
        fetchProducts.mockResolvedValue({
            products: products,
            total: products.length,
        });
        render(<ProductsList />);
        await waitFor(() => {
            expect(screen.getByText(/Essence Mascara/i)).toBeInTheDocument();
            expect(screen.getByText(/Product2/i)).toBeInTheDocument();
            expect(screen.getByText(/Product3/i)).toBeInTheDocument();
        });
    });

    it('Обрабатывает изменение значения поиска', async () => {
        fetchProducts.mockResolvedValue({
            products: products,
            total: products.length,
        });
        render(<ProductsList />);
        fireEvent.change(screen.getByLabelText(/Поиск товара/i), { target: { value: 'Red' } });
        await waitFor(() => {
            expect(fetchProducts).toHaveBeenCalledWith('Red', 1, 194);
        });
    });

    it('Не отображает пагинацию, если нет продуктов', async () => {
        fetchProducts.mockResolvedValue({
            products: [],
            total: 0,
        });
        render(<ProductsList />);
        await waitFor(() => {
            expect(screen.queryByRole('pagination')).not.toBeInTheDocument();
        });
    });

});
