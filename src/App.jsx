import { useMemo, useState } from "react";
import "./App.css";

const categories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty & Health",
  "Sports",
  "Toys & Games",
  "Books",
];

const products = [
  {
    id: 1,
    name: "iPhone 15 (128 GB)",
    category: "Electronics",
    price: 79900,
    rating: 4.6,
    reviews: "2.4k",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&auto=format&fit=crop",
    brand: "Apple",
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    price: 24900,
    rating: 4.5,
    reviews: "1.8k",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop",
    brand: "Apple",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 3499,
    rating: 4.2,
    reviews: "1.2k",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop",
    brand: "Samsung",
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "Fashion",
    price: 4999,
    rating: 4.4,
    reviews: "980",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
    brand: "Nike",
  },
  {
    id: 5,
    name: "Everyday Laptop",
    category: "Electronics",
    price: 49990,
    rating: 4.3,
    reviews: "760",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop",
    brand: "HP",
  },
  {
    id: 6,
    name: "Classic Backpack",
    category: "Fashion",
    price: 2499,
    rating: 4.4,
    reviews: "640",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
    brand: "American Tourister",
  },
  {
    id: 7,
    name: "Daily Face Serum",
    category: "Beauty & Health",
    price: 1299,
    rating: 4.5,
    reviews: "1.1k",
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&auto=format&fit=crop",
    brand: "L'Oreal",
  },
  {
    id: 8,
    name: "Digital Air Fryer",
    category: "Home & Living",
    price: 8999,
    rating: 4.4,
    reviews: "870",
    image:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&auto=format&fit=crop",
    brand: "Philips",
  },
  {
    id: 9,
    name: "Basketball",
    category: "Sports",
    price: 1499,
    rating: 4.3,
    reviews: "320",
    image:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&auto=format&fit=crop",
    brand: "Nike",
  },
  {
    id: 10,
    name: "Home Table Lamp",
    category: "Home & Living",
    price: 1899,
    rating: 4.2,
    reviews: "290",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop",
    brand: "Philips",
  },
  {
    id: 11,
    name: "Classic Novel",
    category: "Books",
    price: 499,
    rating: 4.7,
    reviews: "510",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop",
    brand: "Penguin",
  },
  {
    id: 12,
    name: "Soft Toy Bear",
    category: "Toys & Games",
    price: 799,
    rating: 4.6,
    reviews: "410",
    image:
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500&auto=format&fit=crop",
    brand: "Teddy",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm your AI shopping assistant. I can help you discover products, compare prices, and find something you'll love. What are you shopping for today?",
    },
  ]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" || product.category === category;

      const matchesPrice = product.price <= maxPrice;

      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand);

      const matchesRating = product.rating >= minRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesBrand &&
        matchesRating
      );
    });
  }, [search, category, maxPrice, selectedBrands, minRating]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }

  function toggleWishlist(productId) {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }

  function toggleBrand(brand) {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    );
  }

  function sendMessage(text = message) {
    const question = text.trim();
    if (!question) return;

    const lowerQuestion = question.toLowerCase();

    let reply =
      "I'd recommend exploring our featured products. Tell me your budget and what you're looking for, and I can help narrow down the options!";

    if (
      lowerQuestion.includes("phone") ||
      lowerQuestion.includes("mobile")
    ) {
      reply =
        "Our featured phone is the iPhone 15 at ₹79,900. Use the search bar to explore electronics and compare the products available in this demo.";
    } else if (
      lowerQuestion.includes("headphone") ||
      lowerQuestion.includes("earbud")
    ) {
      reply =
        "Check out our Wireless Earbuds Pro listed at ₹24,900. You can also browse Electronics and add your favorite items to the cart.";
    } else if (
      lowerQuestion.includes("laptop")
    ) {
      reply =
        "Take a look at our Everyday Laptop listed at ₹49,990. You can search for laptops or filter by Electronics to find it.";
    } else if (
      lowerQuestion.includes("fashion") ||
      lowerQuestion.includes("shoe")
    ) {
      reply =
        "Explore our Fashion collection for running shoes and backpacks. You can filter by category to see available products.";
    } else if (
      lowerQuestion.includes("cart")
    ) {
      reply = `You have ${cartCount} item(s) in your cart, with a current total of ${formatPrice(cartTotal)}.`;
    } else if (
      lowerQuestion.includes("budget") ||
      lowerQuestion.includes("cheap") ||
      lowerQuestion.includes("under")
    ) {
      reply =
        "You can use the Price Range slider on the left to find products within your budget.";
    }

    setChatMessages((current) => [
      ...current,
      { sender: "user", text: question },
      { sender: "ai", text: reply },
    ]);

    setMessage("");
  }

  return (
    <div className="shop-app">
      <header className="top-header">
        <a className="brand-logo" href="#" aria-label="ShopSmart AI home">
          <span className="logo-icon">🛍️</span>
          <span>
            ShopSmart <strong>AI</strong>
          </span>
        </a>

        <div className="search-box">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search for products, brands and more..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products"
          />
          <button aria-label="Search">⌕</button>
        </div>

        <div className="header-actions">
          <button
            className="header-link"
            onClick={() =>
              setChatMessages((current) => [
                ...current,
                {
                  sender: "ai",
                  text: "Account registration is not connected in this frontend demo yet.",
                },
              ]) || setShowChat(true)
            }
          >
            <span>♙</span> Login / Signup
          </button>

          <button
            className="header-link"
            onClick={() => {
              setCategory("All Categories");
              setSearch("");
              setShowCart(false);
            }}
          >
            <span>♡</span> Wishlist ({wishlist.length})
          </button>

          <button className="header-link cart-link" onClick={() => setShowCart(!showCart)}>
            <span>🛒</span> Cart
            <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </header>

      <nav className="category-nav" aria-label="Product categories">
        {categories.map((item, index) => (
          <button
            key={item}
            className={`nav-category ${
              category === item ? "nav-active" : ""
            }`}
            onClick={() => setCategory(item)}
          >
            {index === 0 ? "☰" : ["", "▣", "♧", "⌂", "♡", "⚽", "♙", "▤"][index]}
            <span>{item}</span>
          </button>
        ))}
      </nav>

      <main className="main-layout">
        <aside className="sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            {categories.map((item) => (
              <button
                key={item}
                className={`filter-category ${
                  category === item ? "filter-active" : ""
                }`}
                onClick={() => setCategory(item)}
              >
                <span>{item === "All Categories" ? "▤" : "◇"}</span>
                {item}
              </button>
            ))}
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <p className="filter-value">
              ₹0 – {formatPrice(maxPrice)}
            </p>
            <input
              className="price-slider"
              type="range"
              min="500"
              max="100000"
              step="500"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              aria-label="Maximum price"
            />
            <div className="price-labels">
              <span>₹0</span>
              <span>{formatPrice(maxPrice)}</span>
            </div>
          </div>

          <div className="filter-section">
            <h3>Brand</h3>
            {["Apple", "Samsung", "Nike", "HP", "Philips"].map((brand) => (
              <label className="checkbox-row" key={brand}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                {brand}
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h3>Customer Rating</h3>
            {[4, 3, 2].map((rating) => (
              <label className="checkbox-row" key={rating}>
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                />
                <span className="stars">★★★★★</span>
                <span>& up</span>
              </label>
            ))}
            <button
              className="clear-filters"
              onClick={() => {
                setCategory("All Categories");
                setSearch("");
                setMaxPrice(100000);
                setSelectedBrands([]);
                setMinRating(0);
              }}
            >
              Clear all filters
            </button>
          </div>
        </aside>

        <section className="store-content">
          <section className="hero-banner">
            <div className="hero-copy">
              <span className="ai-label">✦ Powered by AI</span>
              <h1>
                Smarter Shopping
                <br />
                with ShopSmart AI
              </h1>
              <p>
                Discover the best products, personalized for you.
                <br />
                Save time, shop smarter!
              </p>
              <button
                className="primary-button hero-button"
                onClick={() =>
                  document
                    .getElementById("featured-products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Now <span>→</span>
              </button>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="hero-orbit">✦</div>
              <div className="hero-emoji">🤖</div>
              <div className="hero-bag">🛍️</div>
              <div className="hero-note">Your AI shopping assistant ↙</div>
            </div>
          </section>

          <div className="products-heading" id="featured-products">
            <div>
              <h2>
                {category === "All Categories"
                  ? "Featured Products"
                  : category}
              </h2>
              <p>
                {filteredProducts.length} products to explore
              </p>
            </div>
            <span className="sort-label">Sort: Recommended ▾</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <button
                    className={`wishlist-button ${
                      wishlist.includes(product.id) ? "wishlisted" : ""
                    }`}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      wishlist.includes(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {wishlist.includes(product.id) ? "♥" : "♡"}
                  </button>

                  <div className="product-image-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  </div>

                  <div className="product-details">
                    <span className="product-category">
                      {product.category}
                    </span>
                    <h3>{product.name}</h3>
                    <p className="product-price">
                      {formatPrice(product.price)}
                    </p>
                    <div className="product-rating">
                      <span>★</span>
                      {product.rating}
                      <span className="review-count">
                        ({product.reviews})
                      </span>
                    </div>
                    <button
                      className="primary-button add-button"
                      onClick={() => addToCart(product)}
                    >
                      <span>🛒</span> Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <span>🔎</span>
              <h3>No products found</h3>
              <p>Try a different search or clear your filters.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All Categories");
                  setMaxPrice(100000);
                  setSelectedBrands([]);
                  setMinRating(0);
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {showCart && (
        <div className="cart-panel">
          <div className="cart-panel-header">
            <h2>Your Shopping Cart</h2>
            <button onClick={() => setShowCart(false)}>✕</button>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty. Let's go shopping!</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div>
                    <strong>{item.name}</strong>
                    <p>
                      {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}
              <div className="cart-total">
                <strong>Total</strong>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>
              <button
                className="primary-button checkout-button"
                onClick={() =>
                  alert("Checkout is a demo feature and is not connected yet.")
                }
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      )}

      {showChat && (
        <section className="chat-panel">
          <div className="chat-header">
            <span className="chat-avatar">🤖</span>
            <div>
              <strong>ShopSmart AI</strong>
              <span className="online-status">● Online · Demo assistant</span>
            </div>
            <button
              className="chat-close"
              onClick={() => setShowChat(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chat-body">
            {chatMessages.map((chat, index) => (
              <div
                key={index}
                className={`chat-message ${
                  chat.sender === "user" ? "user-message" : "ai-message"
                }`}
              >
                {chat.sender === "ai" && (
                  <span className="message-avatar">🤖</span>
                )}
                <p>{chat.text}</p>
              </div>
            ))}

            <div className="quick-prompts">
              {[
                "Best phone under ₹30,000",
                "Top rated headphones",
                "Show me laptops",
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <form
            className="chat-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              aria-label="Chat message"
            />
            <button type="submit" aria-label="Send message">
              ➤
            </button>
          </form>
        </section>
      )}

      {!showChat && (
        <button
          className="chat-launcher"
          onClick={() => setShowChat(true)}
          aria-label="Open AI shopping assistant"
        >
          💬
        </button>
      )}

      <footer className="site-footer">
        <p>© 2026 ShopSmart AI · Smarter shopping starts here.</p>
      </footer>
    </div>
  );
}

export default App;