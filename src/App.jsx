
(function () {
  // This is an IIFE (Immediately Invoked Function Expression).
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    // $ → shortcut for document.querySelector (finds 1 element).
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    // $$ → shortcut for document.querySelectorAll (finds many elements and turns them into an array).
  
    const state = {
      page: 1,    
      //  current pagination page
      perPage: 6, // default; layout adapts responsively
      sort: 'none', // 'price-asc' | 'price-desc' | 'newest'
      categories: new Set(),
      priceRanges: new Set(),
      cartCount: 0,
      items: [],
      cart: [], // {title, price, thumbSrc}
    };
  
    // Parse photo items into data objects
    function parseItems() {
      const cards = $$('.photo-item');
      state.items = cards.map((el, idx) => {
        const category = $('.photo-category', el)?.textContent.trim() || '';
        const title = $('.photo-title', el)?.textContent.trim() || '';
        const priceText = $('.photo-price', el)?.textContent.replace(/[^0-9.]/g, '') || '0';
        const price = Number(priceText) || 0;
        // Use DOM order as a proxy for recency (higher idx = newer)
        const createdAt = Date.now() - (cards.length - idx) * 1000;
        return { el, category, title, price, createdAt };
      });
    }
  
    // Category and price filter helpers
    function getActiveCategories() {
      const checks = $$('.category-list input[type="checkbox"]');
      state.categories = new Set(
        checks.filter(ch => ch.checked).map(ch => ch.parentElement.textContent.trim())
      );
    }
  
    function getActivePriceRanges() {
      const checks = $$('.price-filter input[type="checkbox"][name="price"]');
      state.priceRanges = new Set(
        checks.filter(ch => ch.checked).map(ch => ch.parentElement.textContent.trim())
      );
    }
  
    function priceInRanges(price) {
      if (state.priceRanges.size === 0) return true;
      const ranges = Array.from(state.priceRanges);
      return ranges.some(label => {
        const txt = label.toLowerCase();
        if (txt.includes('lower than')) {
          const m = label.match(/(\d+)/);
          return m ? price < Number(m[1]) : true;
        }
        if (txt.includes('more than')) {
          const m = label.match(/(\d+)/);
          return m ? price > Number(m[1]) : true;
        }
        const between = label.match(/\$(\d+)\s*-\s*\$(\d+)/);
        if (between) {
          const min = Number(between[1]);
          const max = Number(between[2]);
          return price >= min && price <= max;
        }
        return true;
      });
    }
  
    function applyFiltersSortPaginate() {
      // Filter
      const filtered = state.items.filter(item => {
        const catOk = state.categories.size === 0 || state.categories.has(item.category);
        const priceOk = priceInRanges(item.price);
        return catOk && priceOk;
      });
  
      // Sort
      let sorted = filtered.slice();
      if (state.sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
      else if (state.sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
      else if (state.sort === 'newest') sorted.sort((a, b) => b.createdAt - a.createdAt);
  
      // Pagination
      const total = sorted.length;
      const totalPages = Math.max(1, Math.ceil(total / state.perPage));
      if (state.page > totalPages) state.page = totalPages;
      const start = (state.page - 1) * state.perPage;
      const pageItems = sorted.slice(start, start + state.perPage);
  
      // Render visibility by toggling display
      state.items.forEach(it => {
        it.el.style.display = 'none';
      });
      pageItems.forEach(it => {
        it.el.style.display = '';
      });
  
      // Update pagination active state
      const pag = $('.pagination');
      if (pag) {
        const buttons = $$('button', pag);
        buttons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = buttons.find(b => b.textContent.trim() === String(state.page));
        if (activeBtn) activeBtn.classList.add('active');
      }
    }
  
    function handleSortChange() {
      const sortSel = $('.sort-dropdown');
      if (!sortSel) return;
      sortSel.addEventListener('change', () => {
        const val = sortSel.value.toLowerCase();
        if (val.includes('low to high')) state.sort = 'price-asc';
        else if (val.includes('high to low')) state.sort = 'price-desc';
        else if (val.includes('newest')) state.sort = 'newest';
        else state.sort = 'none';
        state.page = 1;
        applyFiltersSortPaginate();
      });
    }
  
    function handleFilters() {
      // categories
      $$('.category-list input[type="checkbox"]').forEach(ch => {
        ch.addEventListener('change', () => {
          getActiveCategories();
          state.page = 1;
          applyFiltersSortPaginate();
        });
      });
      // price
      $$('.price-filter input[type="checkbox"][name="price"]').forEach(ch => {
        ch.addEventListener('change', () => {
          getActivePriceRanges();
          state.page = 1;
          applyFiltersSortPaginate();
        });
      });
    }
  
    function handlePagination() {
      const pag = $('.pagination');
      if (!pag) return;
      pag.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const label = btn.textContent.trim();
        if (label === '‹') state.page = Math.max(1, state.page - 1);
        else if (label === '›') state.page = state.page + 1; // corrected later by bounds in apply
        else if (/^\d+$/.test(label)) state.page = Number(label);
        applyFiltersSortPaginate();
      });
    }
  
    function handleCart() {
      // Create badge near the second header img (cart icon)
      const header = $('.header');
      if (header) {
        const imgs = $$('img', header);
        const cartImg = imgs[1] || imgs[0];
        if (cartImg && !$('.cart-badge', header)) {
          const badge = document.createElement('span');
          badge.className = 'cart-badge';
          badge.textContent = '0';
          header.appendChild(badge);
        }
        // Open cart on cart icon click
        if (cartImg) {
          cartImg.style.cursor = 'pointer';
          cartImg.addEventListener('click', openCart);
        }
      }
  
      function updateBadge() {
        const b = $('.cart-badge');
        if (b) b.textContent = String(state.cartCount);
      }
  
      function updateCartUI() {
        const itemsWrap = $('.cart-items');
        const totalEl = $('.cart-total-value');
        if (!itemsWrap || !totalEl) return;
        itemsWrap.innerHTML = '';
        let total = 0;
        state.cart.forEach((it, idx) => {
          total += it.price;
          const row = document.createElement('div');
          row.className = 'cart-item';
          row.innerHTML = `
            <img class="cart-item-thumb" src="${it.thumbSrc}" alt="${it.title}">
            <div>
              <div class="cart-item-title">${it.title}</div>
              <div class="cart-item-price">$${it.price.toFixed(2)}</div>
            </div>
            <button class="cart-item-remove" data-index="${idx}">Remove</button>
          `;
          itemsWrap.appendChild(row);
        });
        totalEl.textContent = `$${total.toFixed(2)}`;
  
        // remove handlers
        $$('.cart-item-remove', itemsWrap).forEach(btn => {
          btn.addEventListener('click', e => {
            const i = Number(e.currentTarget.getAttribute('data-index'));
            const removed = state.cart.splice(i, 1)[0];
            if (removed) state.cartCount = Math.max(0, state.cartCount - 1);
            updateBadge();
            updateCartUI();
          });
        });
      }
  
      function openCart() {
        const panel = $('.cart-panel');
        const backdrop = $('.cart-backdrop');
        if (!panel || !backdrop) return;
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        backdrop.hidden = false;
      }
      function closeCart() {
        const panel = $('.cart-panel');
        const backdrop = $('.cart-backdrop');
        if (!panel || !backdrop) return;
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        backdrop.hidden = true;
      }
  
      const closeBtn = $('.cart-close');
      const backdrop = $('.cart-backdrop');
      if (closeBtn) closeBtn.addEventListener('click', closeCart);
      if (backdrop) backdrop.addEventListener('click', closeCart);
  
      const clearBtn = $('.clear-cart-btn');
      if (clearBtn) clearBtn.addEventListener('click', () => {
        state.cart.length = 0;
        state.cartCount = 0;
        updateBadge();
        updateCartUI();
      });
  
      $$('.photo-add-btn, .add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          // find card context if available
          const card = e.target.closest('.photo-item');
          let title = 'Item';
          let price = 0;
          let thumbSrc = '';
          if (card) {
            title = $('.photo-title', card)?.textContent.trim() || title;
            const priceText = $('.photo-price', card)?.textContent.replace(/[^0-9.]/g, '') || '0';
            price = Number(priceText) || 0;
            thumbSrc = $('img', card)?.getAttribute('src') || '';
          }
          state.cart.push({ title, price, thumbSrc });
          state.cartCount += 1;
          updateBadge();
          updateCartUI();
        });
      });
  
      // Expose for other handlers
      window.__openCart = openCart;
    }
  
    // Initialize
    function init() {
      parseItems();
      getActiveCategories();
      getActivePriceRanges();
      handleSortChange();
      handleFilters();
      handlePagination();
      handleCart();
  
      // Mobile filters toggle
      const filtersToggle = document.querySelector('.filters-toggle');
      const sidebar = document.querySelector('.sidebar');
      const backdropEl = document.querySelector('.cart-backdrop');
      if (filtersToggle && sidebar) {
        filtersToggle.addEventListener('click', () => {
          const nowOpen = !sidebar.classList.contains('open');
          sidebar.classList.toggle('open');
          // reuse existing backdrop for filters on mobile
          if (backdropEl) {
            backdropEl.hidden = !nowOpen;
            backdropEl.classList.toggle('filters-open', nowOpen);
          }
        });
        if (backdropEl) {
          backdropEl.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
              sidebar.classList.remove('open');
              backdropEl.classList.remove('filters-open');
            }
          });
        }
      }
  
      applyFiltersSortPaginate();
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
  