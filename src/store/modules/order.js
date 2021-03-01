import ProductService from '@/services/ProductService';
export default {
  namespaced: true,
  actions: {
    async createOrder({ rootGetters, dispatch }) {
      try {
        const userId = rootGetters['auth/userId'];
        const productsInCart = rootGetters['cart/productsCart'];
        const orderList = [];

        Object.keys(productsInCart).forEach(async key => {
          const product = rootGetters['products/getProductById'](key);
          const item = {
            name: productsInCart[key].title,
            quantity: productsInCart[key].quantity,
            price: product.price
          };
          const count = product.count - item.quantity;
          orderList.push(item);
          const { data } = await ProductService.updateProduct({
            id: key,
            count: count
          });
          console.log(data);
        });
        const order = {
          date: Date.now(),
          userId,
          list: orderList
        };

        await ProductService.createOrder(order);
        await ProductService.createOrderToUser({ id: userId, orderList });
        dispatch('cart/clearCart', null, { root: true });
      } catch (e) {}
    }
  }
};
