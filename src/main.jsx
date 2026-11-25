import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Check, ChevronRight, Minus, Plus, RotateCcw, Pencil, Droplets, Coffee, Utensils, Leaf, Sparkles } from "lucide-react";
import "./styles.css";

const MENU = [
  {
    category: "Main Course",
    icon: Utensils,
    items: [
      { id: "veg-burger", name: "Veg Burger", footprint: 250, note: "Virtual water footprint for one serving." },
      { id: "chicken-burger", name: "Chicken Burger", footprint: 600, note: "Virtual water footprint for one serving." },
      { id: "mutton-burger", name: "Mutton Burger", footprint: 1000, note: "Virtual water footprint for one serving." },
      { id: "bowl-of-rice", name: "Bowl of Rice", footprint: 600, note: "Virtual water footprint for one serving." },
      { id: "veg-pizza", name: "Veg Pizza", footprint: 200, note: "Virtual water footprint for one serving." },
      { id: "chicken-pizza", name: "Chicken Pizza", footprint: 375, note: "Virtual water footprint for one serving." },
      { id: "mutton-pizza", name: "Mutton Pizza", footprint: 600, note: "Virtual water footprint for one serving." }
    ]
  },
  {
    category: "Desserts",
    icon: Sparkles,
    items: [
      { id: "chocolate", name: "Chocolate", footprint: 825, note: "Virtual water footprint for one serving." },
      { id: "cheesecake", name: "Cheesecake", footprint: 325, note: "Virtual water footprint for one serving." },
      { id: "ice-cream-lollipop", name: "Ice Cream Lollipop", footprint: 115, note: "Virtual water footprint for one serving." }
    ]
  },
  {
    category: "Drinks",
    icon: Coffee,
    items: [
      { id: "rose-milk", name: "Rose Milk", footprint: 260, note: "Virtual water footprint for one serving." },
      { id: "mojito", name: "Mojito", footprint: 30, note: "Virtual water footprint for one serving." },
      { id: "matcha", name: "Matcha", footprint: 24, note: "Virtual water footprint for one serving." }
    ]
  }
];

const format = (n) => new Intl.NumberFormat("en-IN").format(n);

function App() {
  const [selection, setSelection] = useState({});
  const [quantities, setQuantities] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const selectedItems = useMemo(() => MENU.flatMap(section =>
    section.items.filter(item => selection[item.id]).map(item => ({
      ...item,
      quantity: quantities[item.id] || 1,
      subtotal: item.footprint * (quantities[item.id] || 1)
    }))
  ), [selection, quantities]);

  const totalWater = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  function toggleItem(id) {
    setSelection(prev => ({ ...prev, [id]: !prev[id] }));
    setError("");
  }

  function changeQuantity(id, amount) {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + amount) }));
  }

  function confirmOrder() {
    if (selectedItems.length === 0) {
      setError("Please select at least one menu item before confirming.");
      return;
    }
    setError("");
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editOrder() {
    setConfirmed(false);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function newOrder() {
    setSelection({});
    setQuantities({});
    setConfirmed(false);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <div className="topbar-inner">
          <span className="staff-label"><span className="live-dot" /> STAFF ORDER DESK</span>
          <span className="topbar-note">RUBRA · WATER FOOTPRINT EXPERIENCE</span>
        </div>
      </header>

      <main className="main-content">
        <section className="brand-block">
          <div className="brand-ornament"><span /> EST. WITH PURPOSE <span /></div>
          <div className="brand-name">RUBRA<span className="brand-period">.</span></div>
          <p className="brand-tagline">EVERY ORDER HAS A WATER STORY</p>
          <p className="brand-description">A thoughtful look at the water behind every bite.</p>
        </section>

        {!confirmed ? (
          <>
            <div className="intro-row">
              <div>
                <p className="eyebrow">ORDER MANAGEMENT</p>
                <h1>Build an <em>order.</em></h1>
                <p className="intro-copy">Select the items your guest has ordered. The virtual water footprint will be calculated when you confirm.</p>
              </div>
              <div className="selection-pill"><span className="selection-count">{selectedItems.length}</span><span>selected<br />items</span></div>
            </div>

            <div className="menu-sections">
              {MENU.map((section, index) => {
                const Icon = section.icon;
                return (
                  <section className="menu-section" key={section.category}>
                    <div className="section-heading">
                      <div className="section-icon"><Icon size={18} strokeWidth={1.7} /></div>
                      <div>
                        <p className="eyebrow">0{index + 1} / MENU</p>
                        <h2>{section.category}</h2>
                      </div>
                      <div className="section-rule" />
                    </div>
                    <div className="menu-card">
                      <div className="menu-column-head">
                        <span>MENU ITEM</span>
                        <span>VIRTUAL WATER FOOTPRINT</span>
                      </div>
                      {section.items.map((item, itemIndex) => {
                        const checked = !!selection[item.id];
                        return (
                          <div className={`menu-item ${checked ? "is-selected" : ""}`} key={item.id}>
                            <label className="item-select">
                              <input type="checkbox" checked={checked} onChange={() => toggleItem(item.id)} />
                              <span className="custom-check"><Check size={13} /></span>
                              <span className="item-name-wrap">
                                <span className="item-name">{item.name}</span>
                                <span className="item-note">{item.note}</span>
                              </span>
                            </label>
                            <div className="item-right">
                              <span className="footprint-value">{format(item.footprint)} <small>L</small></span>
                              <div className={`quantity-control ${checked ? "quantity-visible" : ""}`} aria-label={`Quantity for ${item.name}`}>
                                <button type="button" onClick={() => changeQuantity(item.id, -1)} disabled={!checked || (quantities[item.id] || 1) <= 1} aria-label="Decrease quantity"><Minus size={13} /></button>
                                <span>{quantities[item.id] || 1}</span>
                                <button type="button" onClick={() => changeQuantity(item.id, 1)} disabled={!checked} aria-label="Increase quantity"><Plus size={13} /></button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>

            <div className="order-footer">
              <div className="footer-summary">
                <span className="eyebrow">CURRENT SELECTION</span>
                <strong>{selectedItems.length ? `${selectedItems.length} menu ${selectedItems.length === 1 ? "item" : "items"} selected` : "No items selected yet"}</strong>
                <span>{selectedItems.length ? `${format(totalWater)} L estimated footprint` : "Tick the items ordered by your guest."}</span>
              </div>
              <button className="confirm-button" onClick={confirmOrder}>
                CONFIRM ORDER <ChevronRight size={17} />
              </button>
            </div>
            {error && <div className="error-message" role="alert">{error}</div>}
            <p className="helper-line"><Sparkles size={13} /> Quantities start at 1. Only checked items are included in the calculation.</p>
          </>
        ) : (
          <section className="receipt-wrap">
            <div className="receipt-heading">
              <div className="success-mark"><Check size={22} /></div>
              <p className="eyebrow">ORDER CONFIRMED</p>
              <h1>Your order,<br /><em>accounted for.</em></h1>
              <p className="intro-copy">Here is the virtual water footprint behind this order.</p>
            </div>

            <div className="receipt-card">
              <div className="receipt-top">
                <div><span className="eyebrow">RUBRA CAFÉ</span><h2>Order summary</h2></div>
                <span className="confirmed-tag"><Check size={12} /> CONFIRMED</span>
              </div>
              <div className="receipt-labels"><span>ITEM & QUANTITY</span><span>WATER FOOTPRINT</span></div>
              {MENU.map(section => {
                const items = selectedItems.filter(item => section.items.some(menuItem => menuItem.id === item.id));
                if (!items.length) return null;
                return (
                  <div className="receipt-group" key={section.category}>
                    <p className="receipt-category">{section.category}</p>
                    {items.map(item => (
                      <div className="receipt-item" key={item.id}>
                        <div><strong>{item.name}</strong><span>{item.quantity} × {format(item.footprint)} L</span></div>
                        <strong className="receipt-subtotal">{format(item.subtotal)} <small>L</small></strong>
                      </div>
                    ))}
                  </div>
                );
              })}
              <div className="receipt-total">
                <div><span>TOTAL QUANTITY</span><strong>{totalQuantity} {totalQuantity === 1 ? "ITEM" : "ITEMS"}</strong></div>
                <div className="total-water"><span>TOTAL VIRTUAL WATER FOOTPRINT</span><strong>{format(totalWater)} <small>LITRES</small></strong></div>
              </div>
              <div className="water-story">
                <div className="water-icon"><Droplets size={22} /></div>
                <div><p className="eyebrow">THE WATER BEHIND YOUR MEAL</p><p>Your order represents <strong>{format(totalWater)} litres</strong> of virtual water required to produce the food and beverages.</p></div>
              </div>
              <p className="disclaimer">Virtual water footprint represents the freshwater used throughout the production and supply chain of food and beverages. It does not represent the amount of water directly consumed by the customer.</p>
            </div>
            <div className="receipt-actions">
              <button className="secondary-button" onClick={editOrder}><Pencil size={15} /> EDIT ORDER</button>
              <button className="confirm-button new-order-button" onClick={newOrder}><RotateCcw size={15} /> NEW ORDER</button>
            </div>
          </section>
        )}

        <footer className="page-footer">
          <span>RUBRA <b>·</b> CONSCIOUS BY DESIGN</span>
          <span>VIRTUAL WATER FOOTPRINT · LITRES</span>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
