import { render, fireEvent, screen, rerender } from '@testing-library/react';
import { it, vi } from 'vitest';
import { SearchInput } from './SearchInput';

describe('Компонент SearchInput', () => {
    it('Отображает начальное значение поиска', () => {
        render(<SearchInput searchValue="Test" onChange={() => { }} />);
        const input = screen.getByLabelText(/Поиск товара/i);
        expect(input).toHaveValue('Test');
    });

    it('Вызывается функция onChange с правильным значением при вводе текста', () => {
        const handleChange = vi.fn();
        render(<SearchInput searchValue="" onChange={handleChange} />);
        const input = screen.getByLabelText(/Поиск товара/i);
        fireEvent.change(input, {
            target: {
                value: 'New Value'
            }
        });
        expect(handleChange).toHaveBeenCalledWith('New Value');
    });

    it('Обновляет значение ввода при изменении пропса searchValue', () => {
        const { rerender } = render(<SearchInput searchValue="Test1" onChange={() => { }} />);

        let input = screen.getByLabelText(/Поиск товара/i);
        expect(input).toHaveValue('Test1');

        rerender(<SearchInput searchValue="Test2" onChange={() => { }} />);
        input = screen.getByLabelText(/Поиск товара/i);
        expect(input).toHaveValue('Test2');
    });
});

