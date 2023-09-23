import { API, routes } from "@/components/fetching";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
} from "@nextui-org/react";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { TableMaker } from "@/components/ShopManagePage/Tables/top_table";
import { AssociationTable } from "@/components/ShopManagePage/Tables/associate_table";
import { IoAdd, IoCloudUpload, IoExit, IoTrashOutline } from "react-icons/io5";
import { toast } from "sonner";

export function TabDisplay({ shop_details }: { shop_details: any }) {
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [bottomProducts, setBottomProducts] = useState<any[]>([]);
    const [associations, setAssociations] = useState<any>([]);
    const [currFile, setCurrFile] = useState<any | null>(null);
    const [isLoading, setLoading] = useState(false);

    const [loadingTopProducts, setLoadingTopProducts] = useState(false);
    const [loadingBottomProducts, setLoadingBottomProducts] = useState(false);
    const [loadingAssociations, setLoadingAssociations] = useState(false);

    const getTopProducts = async () => {
        setLoadingTopProducts(true);
        try {
            const res = await API.get(routes.getTopItems, {
                params: { shop_id: shop_details.shop_id },
            });

            setTopProducts(res.data.top_sold_items);
            // setTopProducts(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoadingTopProducts(false);
    };
    const getBottomProducts = async () => {
        setLoadingBottomProducts(true);
        try {
            const res = await API.get(routes.getBottomItems, {
                params: { shop_id: shop_details.shop_id },
            });

            setBottomProducts(res.data.bottom_sold_items);
            // setTopProducts(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoadingBottomProducts(false);
    };

    const getAssociations = async () => {
        setLoadingAssociations(true);
        try {
            const res = await API.get(routes.getAssociations, {
                params: { shop_id: shop_details.shop_id },
            });

            setAssociations(res.data.buy_patterns);
            console.log(res.data.buy_patterns);
        } catch (error) {
            console.log(error);
        }
        setLoadingAssociations(false);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrFile(e.target.files![0]);
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", currFile);
            formData.append("shop_id", shop_details.shop_id);

            const res = await API.post(
                routes.uploadFile + `?shop_id=${shop_details.shop_id}`,
                formData
            );
        } catch (err: any) {
            toast.error(err.toString());
        }
        setLoading(false);
    };

    useEffect(() => {
        getTopProducts();
        getBottomProducts();
        getAssociations();
    }, []);

    return (
        <Card className="p-4">
            <CardHeader className="flex flex-row items-start justify-between items-center">
                <div>
                    <h1>
                        Shop ID :{" "}
                        <span className="font-normal">
                            {shop_details.shop_id}
                        </span>
                    </h1>
                    <h1>
                        Shop Name :{" "}
                        <span className="font-normal">
                            {shop_details.shop_name}
                        </span>
                    </h1>
                    <h1>
                        Shop District :{" "}
                        <span className="font-normal">
                            {shop_details.district}
                        </span>
                    </h1>
                    <h1>
                        Shop State :{" "}
                        <span className="font-normal">
                            {shop_details.state}
                        </span>
                    </h1>
                </div>
                <form
                    className="flex flex-col items-center"
                    onSubmit={handleSubmit}
                >
                    {!currFile ? (
                        <Button>
                            <label className="flex justify-center items-center w-full">
                                <IoAdd size={25} />
                                Select File
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".csv"
                                />
                            </label>
                        </Button>
                    ) : (
                        <Button type="submit" isLoading={isLoading}>
                            <IoCloudUpload size={25} />
                            Upload File
                        </Button>
                    )}

                    {currFile && (
                        <span className="flex p-2 text-xs items-center hover:text-red-500">
                            <IoTrashOutline size={20} /> {currFile.name}
                        </span>
                    )}
                </form>
            </CardHeader>
            <CardBody className="flex flex-col gap-8">
                <AssociationTable
                    title="Buyer Pattern Analysis"
                    loading={loadingAssociations}
                    associations={associations}
                />
                <div className="flex gap-4 justify-evenly">
                    <TableMaker
                        products={topProducts}
                        title={"Top Selling Products"}
                        loading={loadingTopProducts}
                        routeToHit={routes.improveTopProductSales}
                    />
                    <TableMaker
                        products={bottomProducts}
                        title={"Worst Selling Products"}
                        loading={loadingBottomProducts}
                        routeToHit={routes.improveBottomProductSales}
                    />
                </div>

                {/* <TableMaker products={} title={} /> */}
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
    );
}
