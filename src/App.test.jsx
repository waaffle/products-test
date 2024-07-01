import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./components/products-list/ProductsList', () => ({
    ProductsList: () => <div data-testid="products-list">Mocked ProductsList</div>
}));

describe('Компонент App', () => {
    it('Рендерится ProductList', () => {
        render(<App />);
        expect(screen.getByTestId('products-list')).toBeInTheDocument();
    });
});
