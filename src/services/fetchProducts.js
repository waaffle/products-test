export const fetchProducts = async (searchValue, currentPage = 1, productsOnPage = 24) => {
    const skip = productsOnPage * (currentPage - 1);
    const search = searchValue ? `search?q=${searchValue}` : `?limit=${productsOnPage}&skip=${skip}`;
    console.log(search)
    const response = await fetch(`https://dummyjson.com/products/${search}`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
};
