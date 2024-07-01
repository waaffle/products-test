import { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/fetchProducts';
import { ProductsPagination } from '../pagination/ProductsPagination';
import { SearchInput } from '../input/SearchInput';
import { Products } from '../products/Products';

export const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsOnPage, setProductsOnPage] = useState(24);
    const [total, setTotal] = useState(24);
    const [loading, setLoading] = useState(false);

    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const result = await fetchProducts(searchValue, currentPage, productsOnPage);
                setProducts(result.products)
                setTotal(result.total)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false);
            }
        }
        getProducts();
    }, [searchValue, currentPage, productsOnPage])

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleInput = (newSearchValue) => {
        setSearchValue(newSearchValue);
        if (newSearchValue) setProductsOnPage(194);
        else setProductsOnPage(24);
    }
    return (
        <div className="flex flex-col items-center min-h-screen">
            {!!products?.length && <ProductsPagination total={Math.ceil(total / productsOnPage)} className="mt-4" currentPage={currentPage} onChange={paginate} />}
            <SearchInput searchValue={searchValue} onChange={handleInput} />
            <Products products={products} loading={loading} />
        </div>
    );
};