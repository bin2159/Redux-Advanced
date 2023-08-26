import { cartActions } from "./cart";
import { cartItemActions } from "./cartItem";

export const sendCartData = (cart) => {
    return (dispatch) => {
      dispatch(
        cartActions.setNotification({
          status: "sending",
          title: "Sending",
          message: "Sending cart data",
        })
      );
  
      const getResponse = async () => {
        const response = await fetch(
          "https://react-redux-e9917-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify({items:cart.items,totalQuantity:cart.totalQuantity}),
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
      try{
        getResponse()
      }
      catch(error){
        dispatch(
          cartActions.setNotification({
            status: "error",
            title: "Error",
            message: error,
          })
        );
      }
    };
  };

  export const getCartData=()=>{
    return async(dispatch)=>{
        const getResponse=async()=>{
            const response=await fetch('https://react-redux-e9917-default-rtdb.firebaseio.com/cart.json')
            if(!response.ok){
                throw new Error('Failed to get cart data')
            }
            const data=await response.json()
            return data
        }
        try{
            const data=await getResponse() 
            
            dispatch(cartItemActions.replaceData({
                items:data.items||[],
                totalQuantity:data.totalQuantity
            }))
        }
        catch(error){
            dispatch(
                cartActions.setNotification({
                  status: "error",
                  title: "Error",
                  message: error,
                })
              );
        }
    }
  }