import { Order, OrderProducts, OrderStore } from "../../models/order";
import { Product } from "../../models/product";

const order: Order = {
  id: 1,
  status: "open",
  user_id: 1,
};
const orders: Order[] = [order];
const order_products: OrderProducts = {
  quantity: 1,
  order_id: 1,
  product_id: 1,
};
describe("Order model testing suite:", () => {
  const product: Product = {
    id: 1,
    name: "product_name",
    price: 0,
    category: "category_name",
  };
  const orderStore = new OrderStore();

  it("should have a addProduct method", () => {
    expect(orderStore.addProduct).toBeDefined();
  });
  it("addProduct method should add the correct product to correct order", async () => {
    try {
      const result = await orderStore.addProduct(
        order,
        order_products,
        product
      );
      expect(result).toEqual(order_products);
    } catch (error) {
      throw new Error(`Could not test addProduct method. Error: ${error}`);
    }
  });
  it("should have an index method", () => {
    expect(orderStore.index).toBeDefined();
  });
  it("index method should return a list of orders", async () => {
    try {
      const result = await orderStore.index();
      expect(result).toEqual(orders);
    } catch (error) {
      throw new Error(`Could not test index method. Error: ${error}`);
    }
    const result = await orderStore.index();
    expect(result).toEqual(orders);
  });

  it("should have a show method", () => {
    expect(orderStore.show).toBeDefined();
  });
  it("show method should return the correct order", async () => {
    try {
      const result = await orderStore.show(order.id);
      expect(result).toEqual(order);
    } catch (error) {
      throw new Error(`Could not test show method. Error: ${error}`);
    }
  });

  it("should have a showCurrent method", () => {
    expect(orderStore.showCurrent).toBeDefined();
  });
  it("showCurrent method should return the current order by user", async () => {
    try {
      const result = await orderStore.showCurrent(order.user_id);
      expect(result).toEqual(order);
    } catch (error) {
      throw new Error(`Could not test showCurrent method. Error: ${error}`);
    }
  });

  it("should have a status method", () => {
    expect(orderStore.status).toBeDefined();
  });
  it("status method should change status and return the correct order", async () => {
    try {
      const result = await orderStore.status(order.id, "completed");
      order.status = "completed";
      expect(result).toEqual(order);
    } catch (error) {
      throw new Error(`Could not test status method. Error: ${error}`);
    }
  });

  it("should have a completedByUser method", () => {
    expect(orderStore.completedByUser).toBeDefined();
  });
  it("completedByUser method should return the correct orders", async () => {
    try {
      const result = await orderStore.completedByUser(order.user_id);
      expect(result).toEqual(orders);
    } catch (error) {
      throw new Error(`Could not test completedByUser method. Error: ${error}`);
    }
  });

  it("should have a updateProduct method", () => {
    expect(orderStore.updateProduct).toBeDefined();
  });
  it("updateProduct method should update the correct order", async () => {
    try {
      const result = await orderStore.updateProduct(order_products);
      expect(result).toEqual(order_products);
    } catch (error) {
      throw new Error(`Could not test updateProduct method. Error: ${error}`);
    }
  });
});
