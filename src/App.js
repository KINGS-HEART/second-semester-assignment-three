import React from "react";

import groupImg from './images/Group.png';
import vectorImg from './images/Vector.png';
import heroImg from './images/pexels-evgeny-tchebotarev-2187304 (1) 1.png';
import rect10 from './images/Rectangle 10.png';
import rect101 from './images/Rectangle 10.1.png';
import rect102 from './images/Rectangle 10.2.png';
import group40 from './images/Group 40.png';
import group25 from './images/Group 25.png';
import group251 from './images/Group 25 (1).png';
import group26 from './images/Group 26.png';
import group48 from './images/Group 48.png';
import group8 from './images/Group 8.png';

function App() {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <img src={groupImg} alt="header" />
        <img src={vectorImg} alt="shopping cart" />
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-top">
            <h1 className="hero-title">Samurai King Resting</h1>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>

          <div className="hero-image-wrapper">
            <img
              src={heroImg}
              alt="Shiba Inu puppy on leash"
              className="hero-image"
            />
            <span className="photo-of-day">Photo of the day</span>
          </div>

          <div className="hero-description">
            <div className="description-left">
              <h3>About the Samurai King Resting</h3>
              <span className="photo-category">Pets</span>
              <p>
                So how did the classical Latin become so incoherent? According
                to McClintock, a 15th century typesetter likely scrambled part
                of Cicero's De Finibus in order to provide placeholder text to
                mockup various fonts for a type specimen book.
              </p>
              <p>
                So how did the classical Latin become so incoherent? According
                to McClintock.
              </p>
            </div>

            <div className="description-right">
              <h3>People also buy</h3>
              <div className="people-also-buy">
                <div className="also-buy-item">
                  <img src={rect10} alt="Camera equipment" />
                </div>
                <div className="also-buy-item">
                  <img src={rect101} alt="Picture frame" />
                </div>
                <div className="also-buy-item">
                  <img src={rect102} alt="Photo print" />
                </div>
              </div>
              <div className="details">
                <h4>Details</h4>
                <p>
                  <strong>Size:</strong> 1020 x 1020 pixel
                </p>
                <p>
                  <strong>Size:</strong> 15 mb
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Category</h3>
          <ul className="category-list">
            <li><label><input type="checkbox" defaultChecked /> People</label></li>
            <li><label><input type="checkbox" /> Premium</label></li>
            <li><label><input type="checkbox" defaultChecked /> Pets</label></li>
            <li><label><input type="checkbox" defaultChecked /> Food</label></li>
            <li><label><input type="checkbox" defaultChecked /> Landmarks</label></li>
            <li><label><input type="checkbox" /> Cities</label></li>
            <li><label><input type="checkbox" /> Nature</label></li>
          </ul>

          <div className="price-filter">
            <h4>Price range</h4>
            <label><input type="checkbox" /> Lower than $20</label>
            <label><input type="checkbox" /> $20 - $100</label>
            <label><input type="checkbox" /> $100 - $200</label>
            <label><input type="checkbox" /> More than $200</label>
          </div>
        </aside>

        {/* Gallery */}
        <main className="gallery">
          <div className="gallery-header">
            <h2 className="gallery-title">
              Photography / <span>Premium Photos</span>
            </h2>
            <button className="filters-toggle" type="button">Filters</button>
            <select className="sort-dropdown">
              <option>↕ Sort By Price</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>

          <div className="photo-grid">
            <div className="photo-item">
              <span className="best-seller-tag">Best Seller</span>
              <img src={group40} alt="Red Bench" />
              <div className="photo-info">
                <span className="photo-category">People</span>
                <h3 className="photo-title">Red Bench</h3>
                <p className="photo-price">$3.89</p>
                <button className="photo-add-btn">Add to Cart</button>
              </div>
            </div>

            <div className="photo-item">
              <img src={group25} alt="Egg Balloon" />
              <div className="photo-info">
                <span className="photo-category">Food</span>
                <h3 className="photo-title">Egg Balloon</h3>
                <p className="photo-price">$93.89</p>
                <button className="photo-add-btn">Add to Cart</button>
              </div>
            </div>

            <div className="photo-item">
              <img src={group251} alt="Egg Balloon" />
              <div className="photo-info">
                <span className="photo-category">Food</span>
                <h3 className="photo-title">Egg Balloon</h3>
                <p className="photo-price">$93.89</p>
                <button className="photo-add-btn">Add to Cart</button>
              </div>
            </div>

            <div className="photo-item">
              <img src={group26} alt="Man" />
              <div className="photo-info">
                <span className="photo-category">People</span>
                <h3 className="photo-title">Man</h3>
                <p className="photo-price">$100.00</p>
                <button className="photo-add-btn">Add to Cart</button>
              </div>
            </div>

            <div className="photo-item">
              <img src={group48} alt="Architecture" />
              <div className="photo-info">
                <span className="photo-category">Landmarks</span>
                <h3 className="photo-title">Architecture</h3>
                <p className="photo-price">$101.00</p>
                <button className="photo-add-btn">Add to Cart</button>
              </div>
            </div>

            <div className="photo-item">
              <img src={group8} alt="Architecture" />
              <div className="photo-info">
                <span className="photo-category">Landmarks</span>
                <h3 className="photo-title">Architecture</h3>
                <p className="photo-price">$101.00</p>
                <button className="photo-add-btn">Add to Cart</button>
              </div>
            </div>
          </div>

          <div className="pagination">
            <button>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>
          </div>
        </main>
      </div>

      {/* Cart Panel */}
      <div className="cart-backdrop" hidden></div>
      <aside
        className="cart-panel"
        aria-hidden="true"
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close" aria-label="Close cart">×</button>
        </div>
        <div className="cart-items"></div>
        <div className="cart-footer">
          <div className="cart-total">
            <span className="cart-total-label">Total:</span>
            <span className="cart-total-value">$0.00</span>
          </div>
          <button className="clear-cart-btn">Clear</button>
        </div>
      </aside>
    </div>
  );
}

export default App;
