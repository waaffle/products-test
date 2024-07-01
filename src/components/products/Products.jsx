import { Card, CardBody, CardFooter, Image, Spinner } from "@nextui-org/react";

export const Products = ({ products, loading }) => {
    if (loading) return <div className="mt-10"><Spinner role="spinner" /></div>

    return (
        <div>
            {!loading && !products?.length && <div className="mt-10">Ничего не найдено...</div>}
            <ul role="products-list" className="flex mx-auto py-6 flex-wrap justify-center">
                {products?.map((product, index) => (
                    <Card className="mb-6 mr-6 w-40" shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={product.title}
                                className="w-full object-cover h-[140px]"
                                src={product.thumbnail}
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>{product.title}</b>
                            <p className="text-default-500">{product.price}</p>
                        </CardFooter>
                    </Card>
                ))}
            </ul>
        </div >
    );
};