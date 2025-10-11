class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    }
}



class ShoppingCart {
  constructor() {
    this.items = []; 
  }

  addToCart(item) {
    const existing = this.items.find(i => i.product.id === item.id);
    if (existing) existing.quantity += 1;
    else this.items.push({product : item, quantity:1});
  }

  removeFromCart(id) {
    this.items = this.items.filter(i => i.product.id !== id);
  }

  updateItem(id, quantity) {
    const item = this.items.find(i => i.product.id === id);
    item.quantity = quantity;
  }

  calculateTotalPrice() {
    return this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }
}


const cart = new ShoppingCart();
cart.addToCart(new Product(1, "Apple", 4));
cart.addToCart(new Product(1, "Apple", 4));
cart.addToCart(new Product(2, "Banana", 2));
console.log("Total:", cart.calculateTotalPrice());
cart.updateItem(2, 5);
console.log("Updated Total:", cart.calculateTotalPrice());
