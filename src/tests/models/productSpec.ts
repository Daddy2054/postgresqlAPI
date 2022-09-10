import { Product, ProductStore } from "../../models/product";

const store = new ProductStore();
const product: Product = {
  id: "1",
  name: "product_name",
  price: 0,
  category: "category_name",
};

const products: Product[] = [product];

describe("Product model testing suite", () => {
 
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("create method should add a product", async () => {
    const result = await store.create(product);
    expect(result).toEqual(product);
  });
 
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toEqual(products);
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("show method should return the correct product", async () => {
    const result = await store.show(product.id);
    expect(result).toEqual(product);
  });

  it("should have a productsByCategory method", () => {
    expect(store.productsByCategory).toBeDefined();
  });
  it("productsByCategory method should return the correct products", async () => {
    const result = await store.productsByCategory(product.category);
    expect(result).toEqual(products);
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });
  it("delete method should delete the correct product", async () => {
    const result = await store.delete(product.id);
    expect(result).toEqual(product);
  });

});
