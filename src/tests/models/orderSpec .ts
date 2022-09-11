import { Order, OrderProducts, OrderStore } from "../../models/order";
import { Product } from "../../models/product";

const product: Product = {
  id: 1,
  name: "product_name",
  price: 0,
  category: "category_name",
};

const store = new OrderStore();
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

describe("Order model testing suite", () => {
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("create method should add a order", async () => {
    const result = await store.create(order);
    expect(result).toEqual(order);
  });

  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index method should return a list of orders", async () => {
    const result = await store.index();
    expect(result).toEqual(orders);
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("show method should return the correct order", async () => {
    const result = await store.show(order.id);
    expect(result).toEqual(order);
  });

  it("should have a completedByUser method", () => {
    expect(store.completedByUser).toBeDefined();
  });
  it("completedByUser method should return the correct orders", async () => {
    const result = await store.completedByUser(order.user_id);
    expect(result).toEqual(orders);
  });

  it("should have a addProduct method", () => {
    expect(store.addProduct).toBeDefined();
  });
  it("addProduct method should add the correct product to correct order", async () => {
    const result = await store.addProduct(order, order_products, product);
    expect(result).toEqual(order_products);
  });

  it("should have a updateProduct method", () => {
    expect(store.updateProduct).toBeDefined();
  });
  it("updateProduct method should update the correct order", async () => {
    const result = await store.updateProduct(order_products);
    expect(result).toEqual(order_products);
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });
  it("delete method should delete the correct order", async () => {
    const result = await store.delete(order.id);
    expect(result).toEqual(order);
  });
});
