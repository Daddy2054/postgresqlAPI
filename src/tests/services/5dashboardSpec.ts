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

describe("Dashboard queries testing suite", () => {
  it("should have a productsInOrders method", () => {
    expect(dashboard.productsInOrders).toBeDefined();
  });
  it("productsInOrders method should return an product", async () => {
    try {
      const result = await dashboard.productsInOrders();
      expect(result).toEqual(products);
    } catch (error) {
      throw new Error(
        `Could not test productsInOrders method. Error: ${error}`
      );
    }
  });

  it("should have an fiveMostExpensiveProducts method", () => {
    expect(dashboard.fiveMostExpensiveProducts).toBeDefined();
  });
  it("fiveMostExpensiveProducts method should return a list of five Most Expensive Products", async () => {
    try {
      const result = await dashboard.fiveMostExpensiveProducts();
      expect(result).toEqual(products);
    } catch (error) {
      throw new Error(
        `Could not test fiveMostExpensiveProducts method. Error: ${error}`
      );
    }
  });
});
