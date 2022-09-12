import { Product, ProductStore } from "../../models/product";

const productStore = new ProductStore();
const product: Product = {
  id: 1,
  name: "product_name",
  price: 0,
  category: "category_name",
};

const products: Product[] = [product];

describe("Product model testing suite:", () => {
 
  it("should have a create method", () => {
    expect(productStore.create).toBeDefined();
  });
  it("create method should add a product", async () => {
    const result = await productStore.create(product);
    expect(result).toEqual(product);
  });
 
  it("should have an index method", () => {
    expect(productStore.index).toBeDefined();
  });
  it("index method should return a list of products", async () => {
    const result = await productStore.index();
    expect(result).toEqual(products);
  });

  it("should have a show method", () => {
    expect(productStore.show).toBeDefined();
  });
  it("show method should return the correct product", async () => {
    const result = await productStore.show(product.id);
    expect(result).toEqual(product);
  });

  it("should have a productsByCategory method", () => {
    expect(productStore.productsByCategory).toBeDefined();
  });
  it("productsByCategory method should return the correct products", async () => {
    const result = await productStore.productsByCategory(product.category);
    expect(result).toEqual(products);
  });



});
