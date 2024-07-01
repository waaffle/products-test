import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProductsPagination } from "./ProductsPagination"; // Импорт вашего компонента

describe('Компонент ProductsPagination', () => {

    it('Пагинация рендерится без ошибок', () => {
        render(<ProductsPagination total={10} onChange={() => { }} currentPage={1} />);
        expect(screen.getByRole('pagination')).toBeInTheDocument();
    });

    it('Отображает точное количество страниц, когда их мало', () => {
        const { container } = render(<ProductsPagination total={5} onChange={() => { }} currentPage={1} />);
        const paginationButtons = container.querySelectorAll('li');
        expect(paginationButtons.length).toBe(5);
    });

    it('Отображает 7 страниц, когда страниц больше 7', () => {
        const { container } = render(<ProductsPagination total={20} onChange={() => { }} currentPage={1} />);
        const paginationButtons = screen.getAllByRole("button"); // 'button' роль для элементов <li> в библиотеке Next UI
        expect(paginationButtons.length).toBe(7);
    });

    it('Устанавливает текущую страницу правильно', () => {
        render(<ProductsPagination total={10} onChange={() => { }} currentPage={5} />);
        const currentPageButton = screen.getByLabelText(/pagination item 5/i);
        expect(currentPageButton).toHaveAttribute('data-active', 'true');
    });

    it('Вызывает onChange при смене страницы', () => {
        const handleChange = vi.fn();
        render(<ProductsPagination total={10} onChange={handleChange} currentPage={1} />);
        const nextPageButton = screen.getByText('2');
        fireEvent.click(nextPageButton);
        expect(handleChange).toHaveBeenCalledWith(2);
    });
});
