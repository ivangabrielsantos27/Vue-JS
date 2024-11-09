<!-- SimpleProductCatalog.vue -->
<template>
  <div class="product-catalog">
    <!-- Simple header with toggle -->
    <div class="header">
      <h1>Simple Product Catalog</h1>
      <button @click="showOnlyInStock = !showOnlyInStock">
        {{ showOnlyInStock ? "Show All" : "Show Only In Stock" }}
      </button>
    </div>

    <!-- Product list -->
    <div class="products">
      <!-- v-for to iterate through filtered products -->
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
      >
        <!-- Product details with v-bind -->
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>

        <!-- Conditional rendering with v-if -->
        <p v-if="product.inStock" class="in-stock">In Stock</p>
        <p v-else class="out-of-stock">Out of Stock</p>

        <p class="price">${{ product.price }}</p>

        <!-- Quantity input with v-model -->
        <div class="quantity">
          <label>Quantity:</label>
          <input
            type="number"
            v-model.number="product.quantity"
            min="0"
            :max="product.inStock ? 10 : 0"
          />
        </div>

        <!-- Button with v-on and dynamic disable -->
        <button
          @click="addToCart(product)"
          :disabled="!product.inStock || product.quantity === 0"
          class="add-button"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <!-- Cart summary with v-show -->
    <div v-show="cart.length > 0" class="cart">
      <h2>Shopping Cart</h2>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} - Quantity: {{ item.quantity }}
          <button @click="removeFromCart(item)">Remove</button>
        </li>
      </ul>
      <p>Total: ${{ cartTotal }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleProductCatalog",

  data() {
    return {
      products: [
        {
          id: 1,
          name: "Basic Laptop",
          price: 699.99,
          image: "/laptop.jpg",
          inStock: true,
          quantity: 0,
        },
        {
          id: 2,
          name: "Wireless Mouse",
          price: 29.99,
          image: "/mouse.jpg",
          inStock: true,
          quantity: 0,
        },
        {
          id: 3,
          name: "Keyboard",
          price: 49.99,
          image: "/keyboard.jpg",
          inStock: false,
          quantity: 0,
        },
      ],
      showOnlyInStock: false,
      cart: [],
    };
  },

  computed: {
    // Filter products based on stock status
    filteredProducts() {
      if (this.showOnlyInStock) {
        return this.products.filter((product) => product.inStock);
      }
      return this.products;
    },

    // Calculate cart total
    cartTotal() {
      return this.cart
        .reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
        .toFixed(2);
    },
  },

  methods: {
    addToCart(product) {
      if (product.quantity > 0) {
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        };

        this.cart.push(cartItem);
        product.quantity = 0; // Reset quantity after adding to cart
      }
    },

    removeFromCart(item) {
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.product-catalog {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.product-card img {
  max-width: 100%;
  height: auto;
}

.in-stock {
  color: green;
}

.out-of-stock {
  color: red;
}

.quantity {
  margin: 10px 0;
}

.add-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.cart {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.cart ul {
  list-style: none;
  padding: 0;
}

.cart li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
</style>
