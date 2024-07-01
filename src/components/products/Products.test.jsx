import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { products } from '../../mock/mock-products';
import { Products } from './Products';

describe('Компонент Products', () => {
    it('Отображается спиннер во время загрузки', () => {
        render(<Products products={[]} loading={true} />);
        expect(screen.getByRole('spinner')).toBeInTheDocument();
    });

    it('Рендерится список продуктов', () => {
        render(<Products products={products} loading={false} />);
        const productItems = screen.getByRole('products-list').children;
        expect(productItems).toHaveLength(products.length);
        expect(screen.getByText(/Essence Mascara/i)).toBeInTheDocument();
        expect(screen.getByText(/Product2/i)).toBeInTheDocument();
        expect(screen.getByText(/Product3/i)).toBeInTheDocument();
    });

    it('Отображается "Ничего не найдено...", когда список продуктов пустой и загрузка уже завершилась', () => {
        render(<Products products={[]} loading={false} />);
        expect(screen.getByText(/Ничего не найдено/i)).toBeInTheDocument();
    });
});
