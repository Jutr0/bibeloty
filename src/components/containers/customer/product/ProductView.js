import Container from "../layout/./container/Container";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './ProductView.scss';
import {useEffect, useState} from "react";
import {buildActions} from "../../../../utils/actionsBuilder";
import {useParams} from "react-router";
import Button from "../../../common/button/Button";
import {useDispatch} from "react-redux";
import {addProduct} from "../../../../redux/reducers/cartSlice";
import classnames from "classnames";
import QuantitySelector from "../../../common/quantitySelector/QuantitySelector";

const ProductView = () => {

    const [product, setProduct] = useState({});
    const [selectedSize, setSelectedSize] = useState();
    const [quantity, setQuantity] = useState(1);
    const {id} = useParams();

    const actions = buildActions("product")
    const dispatch = useDispatch();

    useEffect(() => {
        actions.getOne(id, product => {
            setProduct(product);
            setSelectedSize(product.sizes[0]?.size)
        })
    }, []);

    const addToCart = () => {
        dispatch(addProduct({...product, selectedSize, quantity, main_image: product.product_documents?.[0].document}))
        setQuantity(1)
    }

    return <Container className="product-view">
        <Carousel autoPlay={false} showThumbs={false} emulateTouch showStatus={false}>
            {product.product_documents?.map(productDocument => <div>
                <img src={productDocument.document.url}/>
            </div>)}
        </Carousel>
        <div className='right'>
            <div className="info">
                <h3 className="name">{product.name}</h3>
                <div className="materials">{product.materials?.map(m => m.name).join(", ")}</div>
                <div className="description">{product.description}</div>
            </div>
            <div className="actions">
                {product.sizes?.length > 0 && <div className="size-select">
                    <h4>ROZMIAR</h4>
                    <div className="buttons">
                        {product.sizes.map(size => <Button key={size.size}
                                                           className={classnames("small", {active: selectedSize === size.size})}
                                                           onClick={() => setSelectedSize(size.size)}
                        >{size.size}</Button>)}
                    </div>
                </div>}
                <div className="add-to-cart">
                    <QuantitySelector
                        value={quantity}
                        setValue={setQuantity}
                    />
                    <Button onClick={addToCart}>Dodaj do koszyka</Button>
                </div>
                <div className='price'>{product.price} PLN</div>
            </div>
        </div>
    </Container>
}

export default ProductView;