import OrderItem from "./order_item";

describe("Order Item unit tests", () => {
  it("should be possible change quantity", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    item.changeQuantity(3);
    expect(item.quantity).toBe(3);
  });
});
