export const calculateOrdercost = (cartItems) => {
  const itemPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemPrice > 300 ? 0 : 50;
  const taxPrice = Number((0.15 * itemPrice)).toFixed(2);
  const shippingTotal = (parseFloat(itemPrice) + parseFloat(shippingPrice) + parseFloat(taxPrice)).toFixed(2);


  return {
    itemPrice,
    shippingTotal,
    taxPrice,
    shippingPrice,
  };
};

export const getPriceQueryParams = (searchParams,key,value)=>{
  const hasValueInParams = searchParams.has(key);

  if(value && hasValueInParams){
    searchParams.set(key,value);
  }
  else if(value){
    searchParams.append(key,value);
  }
  else{
    searchParams.delete(key);
  }

  return searchParams;
    
}
