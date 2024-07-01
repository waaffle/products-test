import { Input } from "@nextui-org/react";

export const SearchInput = ({ searchValue, onChange }) => (
    <Input
        className="max-w-xs mt-4"
        type="text"
        label="Поиск товара"
        value={searchValue}
        onChange={(event) => onChange(event.target.value)}
    />
);
