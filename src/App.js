import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { cartActions } from "./store/cart";
import Notification from "./components/UI/Notification";

let initial = true;

function App() {
  
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.showCart);
  const cart = useSelector((state) => state.cartItem)
  const notification = useSelector((state) => state.cart.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        cartActions.setNotification({
          status: "sending",
          title: "Sending",
          message: "Sending cart data",
        })
      );

      const response = await fetch(
        "https://react-redux-e9917-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Error Sending data");
      }
      dispatch(
        cartActions.setNotification({
          status: "success",
          title: "Success",
          message: "Cart data send",
        })
      );
    };

    if (initial) {
      initial = false;
      return;
    }
    sendCartData().catch((error) => {
      dispatch(
        cartActions.setNotification({
          status: "error",
          title: "Error",
          message: error,
        })
      );
    });
  }, [cart, dispatch]);
  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
