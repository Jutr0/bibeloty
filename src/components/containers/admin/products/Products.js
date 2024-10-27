import {useEffect, useState} from "react";
import {buildActions} from "../../../../utils/actionsBuilder";
import {createColumnHelper} from "@tanstack/react-table";
import {renderActionButtons} from "../../../common/table/tableFormatters";
import Box from "../../../common/box/Box";
import Table from "../../../common/table/Table";
import ConfirmationModal from "../../../common/modal/confirmationModal/ConfirmationModal";
import {useNavigate} from "react-router";
import InventoryIcon from '@mui/icons-material/Inventory';

const Products = () => {
    const [products, setProducts] = useState([])
    const [deletedProduct, setDeletedProduct] = useState()
    const navigate = useNavigate();

    const actions = buildActions("product", "admin/products")

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor('name', {
            cell: info => info.getValue(),
            header: () => 'Name'
        }),
        columnHelper.accessor('id', {
            cell: (info) => renderActionButtons(() => navigate(info.row.original.id), () => setDeletedProduct(info.row.original)),
            header: () => 'Actions'
        })

    ]

    useEffect(() => {
        actions.findAll(setProducts)
    }, []);

    const handleDelete = (product) => {
        setDeletedProduct(null)
        actions.remove(product, () => setProducts(prev => prev.filter(prevP => prevP.id !== product.id)))
    }

    return <Box className="products"
                header={{icon: <InventoryIcon/>, path: [{label: "Products"}]}}
                onAdd={() => navigate('new')}
    >
        <Table columns={columns} data={products}/>
        {deletedProduct && <ConfirmationModal icon={<InventoryIcon/>}
                                              headerTitle="Products" itemName={deletedProduct.name}
                                              onClose={() => setDeletedProduct(null)}
                                              onConfirm={() => handleDelete(deletedProduct)}
        />}
    </Box>;

}

export default Products