import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartItemActions } from '../../store/cartItem';

const CartItem = (props) => {
  const dispatch=useDispatch()
  const { id,title, quantity, total, price } = props.item;
const addItemHandler=()=>{
  dispatch(cartItemActions.addItem({id,title,price}))
}
const removeItemHandler=()=>{
  dispatch(cartItemActions.removeItem(id))
}
  return (
    <li className={classes.item} key={id}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
