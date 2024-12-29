import Button from "../button/Button";
import './QuantitySelector.scss';

const minValue = 1;

const QuantitySelector = ({setValue, value}) => {

    const onDecrement = () => {
        if (value > minValue) {
            setValue(value - 1);
        }
    }

    const onIncrement = () => {
        setValue(value + 1);
    }

    return <div className="quantity-selector">
        <Button className="decrement small" onClick={onDecrement} disabled={value <= minValue}>-</Button>
        <div className="quantity">{value} szt</div>
        <Button className="increment small" onClick={onIncrement}>+</Button>
    </div>
}

export default QuantitySelector;