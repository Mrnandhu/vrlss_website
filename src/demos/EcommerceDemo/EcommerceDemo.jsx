import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  Heart,
  Home,
  Package,
  Search,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  UserRound,
  X,
} from 'lucide-react'

import './EcommerceDemo.css'

const products = [
  {
    id: 'EC-001',
    name: 'Minimal Overshirt',
    category: 'New arrivals',
    price: 2199,
    oldPrice: 2699,
    size: ['S', 'M', 'L', 'XL'],
    colors: ['Stone', 'Black'],
    description:
      'A clean everyday overshirt concept with a relaxed silhouette and lightweight construction.',
  },
  {
    id: 'EC-002',
    name: 'Classic Cotton Shirt',
    category: 'Shirts',
    price: 1299,
    oldPrice: 1599,
    size: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue'],
    description:
      'A versatile cotton shirt designed for everyday styling.',
  },
  {
    id: 'EC-003',
    name: 'Relaxed Linen Trouser',
    category: 'Trousers',
    price: 1899,
    oldPrice: 2299,
    size: ['S', 'M', 'L'],
    colors: ['Sand', 'Olive'],
    description:
      'Relaxed-fit trousers with a lightweight linen-inspired finish.',
  },
  {
    id: 'EC-004',
    name: 'Essential Polo',
    category: 'T-shirts',
    price: 999,
    oldPrice: 1199,
    size: ['S', 'M', 'L', 'XL'],
    colors: ['Green', 'Navy'],
    description:
      'A minimal polo designed around a simple everyday wardrobe.',
  },
  {
    id: 'EC-005',
    name: 'Everyday Overshirt',
    category: 'Outerwear',
    price: 2099,
    oldPrice: 2499,
    size: ['M', 'L', 'XL'],
    colors: ['Charcoal', 'Cream'],
    description:
      'A versatile outer layer with a contemporary utility-inspired shape.',
  },
  {
    id: 'EC-006',
    name: 'Soft Knit Sweater',
    category: 'Knitwear',
    price: 1799,
    oldPrice: 2199,
    size: ['S', 'M', 'L'],
    colors: ['Cream', 'Brown'],
    description:
      'A soft knit concept for cooler evenings and layered looks.',
  },
]

const categories = [
  'All',
  'New arrivals',
  'Shirts',
  'Trousers',
  'T-shirts',
  'Outerwear',
  'Knitwear',
]

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'profile', label: 'Profile', icon: UserRound },
]

const formatMoney = (value) =>
  `₹${Math.round(value).toLocaleString('en-IN')}`

function ProductVisual({ product, large = false }) {
  const colors = {
    'EC-001': 'product-visual-stone',
    'EC-002': 'product-visual-white',
    'EC-003': 'product-visual-sand',
    'EC-004': 'product-visual-green',
    'EC-005': 'product-visual-charcoal',
    'EC-006': 'product-visual-cream',
  }

  return (
    <div
      className={`ecom-product-visual ${
        colors[product.id] || ''
      } ${large ? 'ecom-product-visual-large' : ''}`}
    >
      <span className="ecom-visual-label">
        VRLS CONCEPT
      </span>

      <div className="ecom-clothing-shape">
        <span />
        <span />
      </div>
    </div>
  )
}

function DemoBadge() {
  return (
    <div className="ecom-demo-badge">
      <span>VRLS DEMO / CONCEPT</span>
      <small>
        E-commerce mobile application concept. All products and
        orders shown are demonstration data.
      </small>
    </div>
  )
}

function EcommerceDemo() {
  const [page, setPage] = useState('home')
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('')
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [checkoutStep, setCheckoutStep] = useState('cart')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === 'All' || product.category === category

      const matchesQuery =
        !query.trim() ||
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(query.toLowerCase())

      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0,
  )

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const shipping = cartSubtotal >= 3000 || cart.length === 0 ? 0 : 99
  const total = cartSubtotal + shipping

  const toggleWishlist = (productId) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  const addToCart = (product, size = 'M', color = '') => {
    setCart((current) => {
      const existing = current.find(
        (item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color,
      )

      if (existing) {
        return current.map((item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [
        ...current,
        {
          ...product,
          size,
          color,
          quantity: 1,
        },
      ]
    })
  }

  const updateQuantity = (index, amount) => {
    setCart((current) =>
      current
        .map((item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                quantity: Math.max(
                  0,
                  item.quantity + amount,
                ),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (index) => {
    setCart((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    )
  }

  const openProduct = (product) => {
    setSelectedProduct(product)
    setSelectedSize(product.size[0])
    setSelectedColor(product.colors[0])
  }

  const goPage = (nextPage) => {
    setPage(nextPage)
    setSelectedProduct(null)
    setMobileSearch(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openCart = () => {
    setPage('cart')
    setCheckoutStep('cart')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const placeOrder = () => {
    setOrderPlaced(true)
    setCheckoutStep('confirmation')
  }

  return (
    <div className="ecom-demo">
      <a
        href="/"
        className="ecom-back-home"
        aria-label="Back to VRLS Solutions home"
      >
        <ArrowLeft size={14} />
        Back to Home
      </a>

      <div className="ecom-shell">
        <header className="ecom-header">
          <div className="ecom-header-inner">
            <button
              type="button"
              className="ecom-brand"
              onClick={() => goPage('home')}
            >
              <span>V</span>
              <div>
                <strong>VERA</strong>
                <small>STORE CONCEPT</small>
              </div>
            </button>

            <nav className="ecom-desktop-nav">
              {navItems.map((item) => {
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={
                      page === item.id
                        ? 'ecom-nav-active'
                        : ''
                    }
                    onClick={() => goPage(item.id)}
                  >
                    {item.label}
                  </button>
                )
              })}
            </nav>

            <div className="ecom-header-actions">
              <button
                type="button"
                className="ecom-icon-button"
                onClick={() =>
                  setMobileSearch((value) => !value)
                }
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <button
                type="button"
                className="ecom-icon-button"
                onClick={() => goPage('wishlist')}
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span>{wishlist.length}</span>
                )}
              </button>

              <button
                type="button"
                className="ecom-cart-button"
                onClick={openCart}
                aria-label="Open cart"
              >
                <ShoppingBag size={18} />
                <span>Cart</span>
                {cartCount > 0 && <b>{cartCount}</b>}
              </button>
            </div>
          </div>
        </header>

        <main className="ecom-main">
          <DemoBadge />

          {mobileSearch && (
            <div className="ecom-search-expanded">
              <Search size={17} />
              <input
                autoFocus
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search products..."
              />
              <button
                type="button"
                onClick={() => setMobileSearch(false)}
                aria-label="Close search"
              >
                <X size={17} />
              </button>
            </div>
          )}

          {page === 'home' && (
            <>
              <section className="ecom-hero">
                <div className="ecom-hero-copy">
                  <span>NEW COLLECTION</span>
                  <h1>
                    Less noise.
                    <br />
                    <em>More style.</em>
                  </h1>
                  <p>
                    A premium mobile commerce experience
                    designed around simple discovery and
                    effortless checkout.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setCategory('New arrivals')
                      window.scrollTo({
                        top: 500,
                        behavior: 'smooth',
                      })
                    }}
                  >
                    Explore collection
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="ecom-hero-product">
                  <ProductVisual
                    product={products[0]}
                    large
                  />
                  <div>
                    <span>01 / 06</span>
                    <strong>Minimal Overshirt</strong>
                  </div>
                </div>
              </section>

              <section className="ecom-section">
                <div className="ecom-section-heading">
                  <div>
                    <span>SHOP THE COLLECTION</span>
                    <h2>Find your everyday.</h2>
                  </div>

                  <label className="ecom-search">
                    <Search size={15} />
                    <input
                      value={query}
                      onChange={(event) =>
                        setQuery(event.target.value)
                      }
                      placeholder="Search"
                    />
                  </label>
                </div>

                <div className="ecom-category-row">
                  {categories.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        category === item
                          ? 'ecom-category-active'
                          : ''
                      }
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="ecom-product-grid">
                  {filteredProducts.map((product) => (
                    <article
                      className="ecom-card"
                      key={product.id}
                    >
                      <div
                        className="ecom-card-visual-wrap"
                        onClick={() => openProduct(product)}
                      >
                        <ProductVisual product={product} />

                        <button
                          type="button"
                          className={`ecom-wishlist ${
                            wishlist.includes(product.id)
                              ? 'ecom-wishlist-active'
                              : ''
                          }`}
                          onClick={(event) => {
                            event.stopPropagation()
                            toggleWishlist(product.id)
                          }}
                          aria-label={`${
                            wishlist.includes(product.id)
                              ? 'Remove'
                              : 'Add'
                          } ${product.name} ${
                            wishlist.includes(product.id)
                              ? 'from'
                              : 'to'
                          } wishlist`}
                        >
                          <Heart
                            size={16}
                            fill={
                              wishlist.includes(product.id)
                                ? 'currentColor'
                                : 'none'
                            }
                          />
                        </button>

                        {product.oldPrice && (
                          <span className="ecom-sale">
                            CONCEPT SALE
                          </span>
                        )}
                      </div>

                      <div className="ecom-card-info">
                        <span>{product.category}</span>
                        <h3>{product.name}</h3>

                        <div>
                          <strong>
                            {formatMoney(product.price)}
                          </strong>
                          <del>
                            {formatMoney(product.oldPrice)}
                          </del>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}

          {page === 'wishlist' && (
            <section className="ecom-page-section">
              <div className="ecom-section-heading">
                <div>
                  <span>YOUR SELECTION</span>
                  <h2>Wishlist.</h2>
                </div>
              </div>

              {wishlist.length === 0 ? (
                <EmptyState
                  icon={Heart}
                  title="Your wishlist is empty."
                  description="Save products here while you explore the collection."
                  button="Explore products"
                  onClick={() => goPage('home')}
                />
              ) : (
                <div className="ecom-product-grid">
                  {products
                    .filter((product) =>
                      wishlist.includes(product.id),
                    )
                    .map((product) => (
                      <article
                        className="ecom-card"
                        key={product.id}
                      >
                        <div
                          className="ecom-card-visual-wrap"
                          onClick={() => openProduct(product)}
                        >
                          <ProductVisual product={product} />

                          <button
                            type="button"
                            className="ecom-wishlist ecom-wishlist-active"
                            onClick={(event) => {
                              event.stopPropagation()
                              toggleWishlist(product.id)
                            }}
                          >
                            <Heart
                              size={16}
                              fill="currentColor"
                            />
                          </button>
                        </div>

                        <div className="ecom-card-info">
                          <span>{product.category}</span>
                          <h3>{product.name}</h3>
                          <strong>
                            {formatMoney(product.price)}
                          </strong>
                        </div>
                      </article>
                    ))}
                </div>
              )}
            </section>
          )}

          {page === 'orders' && (
            <section className="ecom-page-section">
              <div className="ecom-section-heading">
                <div>
                  <span>ACCOUNT</span>
                  <h2>Orders.</h2>
                </div>
              </div>

              {orderPlaced ? (
                <div className="ecom-orders-list">
                  <div className="ecom-order-card">
                    <div className="ecom-order-icon">
                      <Package size={20} />
                    </div>

                    <div>
                      <span>DEMO ORDER</span>
                      <strong>#VERA-2049</strong>
                      <small>
                        Demonstration order · Ready for
                        processing
                      </small>
                    </div>

                    <b>{formatMoney(total)}</b>
                  </div>
                </div>
              ) : (
                <EmptyState
                  icon={Package}
                  title="No demo orders yet."
                  description="Complete the checkout flow to create a demonstration order."
                  button="Start shopping"
                  onClick={() => goPage('home')}
                />
              )}
            </section>
          )}

          {page === 'profile' && (
            <section className="ecom-page-section">
              <div className="ecom-section-heading">
                <div>
                  <span>ACCOUNT</span>
                  <h2>Your profile.</h2>
                </div>
              </div>

              <div className="ecom-profile-card">
                <div className="ecom-profile-avatar">D</div>

                <div>
                  <span>DEMO CUSTOMER</span>
                  <h3>Demo Shopper</h3>
                  <p>
                    This profile is part of the VRLS
                    e-commerce application concept.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => goPage('orders')}
                >
                  View orders
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </section>
          )}

          {page === 'cart' && (
            <section className="ecom-page-section ecom-cart-page">
              {!orderPlaced && checkoutStep === 'cart' && (
                <>
                  <div className="ecom-section-heading">
                    <div>
                      <span>YOUR BAG</span>
                      <h2>Shopping cart.</h2>
                    </div>

                    <span className="ecom-cart-count">
                      {cartCount} items
                    </span>
                  </div>

                  {cart.length === 0 ? (
                    <EmptyState
                      icon={ShoppingCart}
                      title="Your cart is empty."
                      description="Add something from the collection to continue."
                      button="Continue shopping"
                      onClick={() => goPage('home')}
                    />
                  ) : (
                    <div className="ecom-cart-layout">
                      <div className="ecom-cart-list">
                        {cart.map((item, index) => (
                          <div
                            className="ecom-cart-item"
                            key={`${item.id}-${item.size}-${index}`}
                          >
                            <ProductVisual product={item} />

                            <div className="ecom-cart-item-info">
                              <span>{item.category}</span>
                              <h3>{item.name}</h3>
                              <small>
                                Size {item.size}
                                {item.color
                                  ? ` · ${item.color}`
                                  : ''}
                              </small>

                              <strong>
                                {formatMoney(item.price)}
                              </strong>

                              <div className="ecom-quantity">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      index,
                                      -1,
                                    )
                                  }
                                >
                                  −
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      index,
                                      1,
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="ecom-remove"
                              onClick={() =>
                                removeFromCart(index)
                              }
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <aside className="ecom-summary">
                        <span>ORDER SUMMARY</span>
                        <h3>Ready when you are.</h3>

                        <div>
                          <span>Subtotal</span>
                          <b>{formatMoney(cartSubtotal)}</b>
                        </div>

                        <div>
                          <span>Delivery</span>
                          <b>
                            {shipping === 0
                              ? 'Free'
                              : formatMoney(shipping)}
                          </b>
                        </div>

                        <div className="ecom-summary-total">
                          <span>Total</span>
                          <strong>{formatMoney(total)}</strong>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setCheckoutStep('checkout')
                          }
                        >
                          Continue to checkout
                          <ArrowRight size={15} />
                        </button>
                      </aside>
                    </div>
                  )}
                </>
              )}

              {!orderPlaced && checkoutStep === 'checkout' && (
                <Checkout
                  total={total}
                  onBack={() => setCheckoutStep('cart')}
                  onPlaceOrder={placeOrder}
                />
              )}

              {orderPlaced && (
                <div className="ecom-confirmation">
                  <div className="ecom-confirmation-icon">
                    <Check size={29} />
                  </div>

                  <span>DEMO ORDER CONFIRMED</span>

                  <h2>Thank you.</h2>

                  <p>
                    Your demonstration order has been created.
                    No payment has been processed and nothing
                    will be shipped.
                  </p>

                  <div className="ecom-order-number">
                    <span>DEMO ORDER</span>
                    <strong>#VERA-2049</strong>
                    <b>{formatMoney(total)}</b>
                  </div>

                  <div className="ecom-confirmation-actions">
                    <button
                      type="button"
                      onClick={() => {
                        setCart([])
                        setOrderPlaced(false)
                        setCheckoutStep('cart')
                        goPage('home')
                      }}
                    >
                      Continue shopping
                    </button>

                    <button
                      type="button"
                      onClick={() => goPage('orders')}
                    >
                      View orders
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}
        </main>

        <nav className="ecom-mobile-nav">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => goPage(item.id)}
                className={
                  page === item.id
                    ? 'ecom-mobile-nav-active'
                    : ''
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}

          <button
            type="button"
            onClick={openCart}
            className={page === 'cart' ? 'ecom-mobile-nav-active' : ''}
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
            {cartCount > 0 && <b>{cartCount}</b>}
          </button>
        </nav>

        <footer className="ecom-footer">
          <strong>VERA</strong>
          <span>Premium commerce concept by VRLS Solutions</span>
          <span>VRLS DEMO / CONCEPT</span>
        </footer>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          size={selectedSize}
          color={selectedColor}
          setSize={setSelectedSize}
          setColor={setSelectedColor}
          isWishlisted={wishlist.includes(
            selectedProduct.id,
          )}
          onWishlist={() =>
            toggleWishlist(selectedProduct.id)
          }
          onClose={() => setSelectedProduct(null)}
          onAdd={() => {
            addToCart(
              selectedProduct,
              selectedSize,
              selectedColor,
            )
            setSelectedProduct(null)
            openCart()
          }}
        />
      )}
    </div>
  )
}

function ProductModal({
  product,
  size,
  color,
  setSize,
  setColor,
  isWishlisted,
  onWishlist,
  onClose,
  onAdd,
}) {
  return (
    <div
      className="ecom-modal-backdrop"
      onMouseDown={onClose}
    >
      <div
        className="ecom-product-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <button
          type="button"
          className="ecom-modal-close"
          onClick={onClose}
          aria-label="Close product"
        >
          <X size={19} />
        </button>

        <div className="ecom-modal-visual">
          <ProductVisual product={product} large />
        </div>

        <div className="ecom-modal-info">
          <span>{product.category}</span>
          <h2>{product.name}</h2>

          <div className="ecom-modal-price">
            <strong>{formatMoney(product.price)}</strong>
            <del>{formatMoney(product.oldPrice)}</del>
          </div>

          <p>{product.description}</p>

          <div className="ecom-option">
            <span>SIZE</span>

            <div>
              {product.size.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={
                    size === item
                      ? 'ecom-option-active'
                      : ''
                  }
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="ecom-option">
            <span>COLOUR</span>

            <div>
              {product.colors.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={
                    color === item
                      ? 'ecom-option-active'
                      : ''
                  }
                  onClick={() => setColor(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="ecom-modal-actions">
            <button
              type="button"
              className="ecom-add-button"
              onClick={onAdd}
            >
              Add to cart
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className={`ecom-modal-wishlist ${
                isWishlisted
                  ? 'ecom-wishlist-active'
                  : ''
              }`}
              onClick={onWishlist}
              aria-label="Toggle wishlist"
            >
              <Heart
                size={18}
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Checkout({ total, onBack, onPlaceOrder }) {
  const [delivery, setDelivery] = useState('home')
  const [payment, setPayment] = useState('upi')

  return (
    <div className="ecom-checkout">
      <div className="ecom-checkout-heading">
        <button type="button" onClick={onBack}>
          <ChevronLeft size={16} />
          Back to cart
        </button>

        <div>
          <span>CHECKOUT</span>
          <h2>Complete your order.</h2>
        </div>
      </div>

      <div className="ecom-checkout-layout">
        <div className="ecom-checkout-form">
          <section>
            <span>01 / DELIVERY</span>
            <h3>Delivery address</h3>

            <button
              type="button"
              className={`ecom-choice ${
                delivery === 'home'
                  ? 'ecom-choice-active'
                  : ''
              }`}
              onClick={() => setDelivery('home')}
            >
              <span>Home</span>
              <small>
                Demo address · Address is not saved or
                submitted.
              </small>
              <b>{delivery === 'home' ? '✓' : ''}</b>
            </button>

            <button
              type="button"
              className={`ecom-choice ${
                delivery === 'pickup'
                  ? 'ecom-choice-active'
                  : ''
              }`}
              onClick={() => setDelivery('pickup')}
            >
              <span>Store pickup</span>
              <small>
                Pickup location would be selected in a
                production implementation.
              </small>
              <b>{delivery === 'pickup' ? '✓' : ''}</b>
            </button>
          </section>

          <section>
            <span>02 / PAYMENT</span>
            <h3>Payment method</h3>

            {[
              ['upi', 'UPI', 'Demo payment interface'],
              [
                'card',
                'Card',
                'Demo card payment interface',
              ],
              [
                'cash',
                'Cash on delivery',
                'Available in concept flow',
              ],
            ].map(([id, title, description]) => (
              <button
                type="button"
                className={`ecom-choice ${
                  payment === id
                    ? 'ecom-choice-active'
                    : ''
                }`}
                key={id}
                onClick={() => setPayment(id)}
              >
                <span>{title}</span>
                <small>{description}</small>
                <b>{payment === id ? '✓' : ''}</b>
              </button>
            ))}
          </section>
        </div>

        <aside className="ecom-checkout-summary">
          <span>ORDER TOTAL</span>
          <h3>{formatMoney(total)}</h3>

          <p>
            This checkout is a demonstration of the user
            experience. No payment will be processed.
          </p>

          <button
            type="button"
            onClick={onPlaceOrder}
          >
            Place demo order
            <Check size={15} />
          </button>
        </aside>
      </div>
    </div>
  )
}

function EmptyState({
  icon: Icon,
  title,
  description,
  button,
  onClick,
}) {
  return (
    <div className="ecom-empty">
      <div>
        <Icon size={25} />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <button type="button" onClick={onClick}>
        {button}
        <ArrowRight size={14} />
      </button>
    </div>
  )
}

export default EcommerceDemo
