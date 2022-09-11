import { Order, OrderProducts, OrderStore } from "../../models/order";
import { Product, ProductStore } from "../../models/product";
import { DashboardQueries } from "../../services/dashboard";

const product: Product = {
  id: 1,
  name: "product_name",
  price: 0,
  category: "category_name",
};
const products: Product[] = [product];

const order: Order = {
  id: 1,
  status: "open",
  user_id: 1,
};
const order_products: OrderProducts = {
  quantity: 1,
  order_id: 1,
  product_id: 1,
};

const store = new OrderStore();
const PrStore = new ProductStore();
const dashboard = new DashboardQueries();

beforeAll(() => {
  store.addProduct(
    order as Order,
    order_products as OrderProducts,
    product as Product
  );
});

afterAll(() => {
  order_products.quantity = 0
  store.updateProduct(
    order_products as OrderProducts,
  );
  store.delete(order_products.order_id)
  PrStore.delete(order_products.product_id)
});

describe("Dashboard queries testing suite", () => {
  it("should have a productsInOrders method", () => {
    expect(dashboard.productsInOrders).toBeDefined();
  });
  it("productsInOrders method should return an product", async () => {
    const result = await dashboard.productsInOrders();
    expect(result).toEqual(products);
  });

  it("should have an fiveMostExpensiveProducts method", () => {
    expect(dashboard.fiveMostExpensiveProducts).toBeDefined();
  });
  it("index method should return a list of five Most Expensive Products", async () => {
    const result = await dashboard.fiveMostExpensiveProducts();
    expect(result).toEqual(products);
  });
});
