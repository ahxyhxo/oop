class Item {
  constructor(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
  }
}

class Hamburger extends Item {
  constructor(size, stuffing) {
    super();
    this.name = `${size.name} hamburger`;
    this.size = size;
    this.stuffing = stuffing;
    this.price = this.calculatePrice();
    this.calories = this.calculateCalories();
  }

  calculatePrice() {
    const totalPrice = this.stuffing.reduce((total, stuffing) => {
      return total + stuffing.price;
    }, this.size.price);
    return totalPrice;
  }

  calculateCalories() {
    const totalCalories = this.stuffing.reduce((total, stuffing) => {
      return total + stuffing.calories;
    }, this.size.calories);
    return totalCalories;
  }

  getSize() {
    return this.size.name;
  }

  getStuffing() {
    const stuffings = this.stuffing.reduce((total, item) => {
      total[item.name] = (total[item.name] || 0) + 1;
      return total;
    }, {});
    return stuffings;
  }
}

Hamburger.SIZE_SMALL = {
  name: 'Small',
  price: 50,
  calories: 20,
};
Hamburger.SIZE_LARGE = {
  name: 'Large',
  price: 100,
  calories: 40,
};
Hamburger.STUFFING_CHEESE = {
  name: 'cheese',
  price: 10,
  calories: 20,
};
Hamburger.STUFFING_SALAD = {
  name: 'salad',
  price: 20,
  calories: 5,
};
Hamburger.STUFFING_POTATO = {
  name: 'potato',
  price: 15,
  calories: 10,
};

class Salad extends Item {
  constructor(type, weight) {
    super(type.name);
    this.weight = weight;
    this.price = (type.price * this.weight) / 100;
    this.calories = (type.calories * this.weight) / 100;
  }
}

Salad.CAESAR = {
  name: 'Caesar',
  price: 100,
  calories: 20,
};
Salad.OLIVIER = {
  name: 'Olivier',
  price: 50,
  calories: 80,
};

class Drink extends Item {
  constructor(type) {
    super(type.name, type.price, type.calories);
  }
}

Drink.COLA = {
  name: 'Cola',
  price: 50,
  calories: 40,
};
Drink.COFFEE = {
  name: 'Coffee',
  price: 80,
  calories: 20,
};

class Order {
  constructor(items) {
    this.items = items;
    this.isPaid = false;
  }

  addItem(item) {
    if (!this.isPaid) {
      this.items.push(item);
      return `You've just added ${item.name} to your order`;
    } else {
      return 'Your order has already been paid';
    }
  }

  removeItem(item) {
    if (this.isPaid) {
      return 'Your order has already been paid';
    }

    if (this.items.indexOf(item) > -1) {
      this.items.splice(this.items.indexOf(item), 1);
      return `You've just removed ${item.name} from your order`;
    }

    return 'This item is not in your order';
  }

  calculateCost() {
    const totalCost = this.items.reduce((total, item) => {
      return total + item.price;
    }, 0);
    return totalCost;
  }

  calculateCalories() {
    const totalCalories = this.items.reduce((total, item) => {
      return total + item.calories;
    }, 0);
    return totalCalories;
  }

  overviewOrder() {
    const orderItems = this.items.reduce((total, item) => {
      total[item.name] = (total[item.name] || 0) + 1;
      return total;
    }, {});
    const overview =
      'Order information:' +
      '\n' +
      'Cart: ' +
      JSON.stringify(orderItems) +
      '' +
      '\n' +
      'Total calories: ' +
      this.calculateCalories() +
      '\n' +
      'Total cost: ' +
      this.calculateCost() +
      '\n' +
      'Payment status: ' +
      this.isPaid;
    return overview;
  }

  payOrder() {
    if (!this.isPaid) {
      this.isPaid = true;
      return 'Payment has been successfully processed';
    }
    return 'Your order has already been paid';
  }
}

const hamburger1 = new Hamburger(Hamburger.SIZE_SMALL, [
  Hamburger.STUFFING_SALAD,
  Hamburger.STUFFING_POTATO,
]);
const hamburger2 = new Hamburger(Hamburger.SIZE_LARGE, [
  Hamburger.STUFFING_POTATO,
]);
const weight = 150;
const salad = new Salad(Salad.CAESAR, weight);
const drink = new Drink(Drink.COFFEE);
const order = new Order([hamburger1, hamburger2, salad]);
console.log(order.overviewOrder());
console.log(order.removeItem(drink));
console.log(order.addItem(drink));
console.log(order.calculateCalories());
console.log(order.removeItem(hamburger2));
console.log(order.payOrder());
console.log(order.overviewOrder());
console.log(order.addItem(salad));
