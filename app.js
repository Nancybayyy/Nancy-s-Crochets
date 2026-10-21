(() => {
  const products = window.NANCY_PRODUCTS || [];
  const categoryNames = {
    tops: "Crochet Tops",
    caps: "Crochet Caps",
    hats: "Crochet Hats",
    bralettes: "Crochet Bralettes"
  };
  const categoryClasses = {
    tops: "product-badge--tops",
    caps: "product-badge--caps",
    hats: "product-badge--hats",
    bralettes: "product-badge--bralettes"
  };

  const featuredGrid = document.querySelector("#featured-products");
  const shopGrid = document.querySelector("#shop-products");
  const searchInput = document.querySelector("#product-search");
  const sortSelect = document.querySelector("#product-sort");
  const resultsCount = document.querySelector("#results-count");
  const emptyState = document.querySelector("#empty-state");
  const productDialog = document.querySelector("#product-dialog");
  const dialogContent = document.querySelector("#dialog-content");
  const contactForm = document.querySelector("#contact-form");
  const formFeedback = document.querySelector("#form-feedback");
  let activeCategory = "all";

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

  const createProductCard = (product) => `
    <article class="product-card">
      <button class="product-card__image-button" type="button" data-product-id="${escapeHtml(product.id)}" aria-label="View details for ${escapeHtml(product.name)}">
        <span class="product-card__image-wrap">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt)}" width="900" height="1350" loading="lazy">
          <span class="product-badge ${categoryClasses[product.category]}">${categoryNames[product.category]}</span>
        </span>
      </button>
      <div class="product-card__info">
        <div>
          <h3><button class="product-card__name" type="button" data-product-id="${escapeHtml(product.id)}">${escapeHtml(product.name)}</button></h3>
          <p class="product-card__availability">Sample piece · details unconfirmed</p>
        </div>
        <span class="product-card__price">Price<br>on enquiry</span>
      </div>
      <button class="product-card__details" type="button" data-product-id="${escapeHtml(product.id)}">View piece <span aria-hidden="true">↗</span></button>
    </article>`;

  const renderFeatured = () => {
    if (featuredGrid) {
      featuredGrid.innerHTML = products.filter((product) => product.featured).map(createProductCard).join("");
    }
  };

  const getVisibleProducts = () => {
    const query = searchInput.value.trim().toLowerCase();
    const visible = products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesSearch = `${product.name} ${categoryNames[product.category]} ${product.description}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    if (sortSelect.value === "name") {
      visible.sort((first, second) => first.name.localeCompare(second.name));
    } else if (sortSelect.value === "category") {
      visible.sort((first, second) => categoryNames[first.category].localeCompare(categoryNames[second.category]) || first.name.localeCompare(second.name));
    }
    return visible;
  };

  const renderShop = () => {
    const visible = getVisibleProducts();
    shopGrid.innerHTML = visible.map(createProductCard).join("");
    resultsCount.textContent = `${visible.length} ${visible.length === 1 ? "piece" : "pieces"}`;
    emptyState.hidden = visible.length > 0;
  };

  const openProduct = (productId) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    dialogContent.innerHTML = `
      <div class="product-detail">
        <img class="product-detail__image" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt)}" width="900" height="1350">
        <div class="product-detail__copy">
          <span class="product-badge ${categoryClasses[product.category]}">${categoryNames[product.category]}</span>
          <h2 id="dialog-title">${escapeHtml(product.name)}</h2>
          <p class="product-detail__availability">Sample listing · availability to be confirmed</p>
          <p>${escapeHtml(product.description)}</p>
          <p class="product-detail__price">Price to be confirmed</p>
          <div class="product-detail__options">
            <h3>Colours to ask about</h3>
            <ul>${product.colours.map((colour) => `<li>${escapeHtml(colour)}</li>`).join("")}</ul>
          </div>
          <div class="product-detail__options">
            <h3>Size &amp; fit</h3>
            <ul>${product.sizes.map((size) => `<li>${escapeHtml(size)}</li>`).join("")}</ul>
          </div>
          <button class="button button--primary product-detail__enquire" type="button" data-enquire-product="${escapeHtml(product.id)}">Enquire about this piece <span aria-hidden="true">→</span></button>
        </div>
      </div>`;
    productDialog.showModal();
  };

  const closeMobileMenu = () => {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".primary-navigation");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector(".visually-hidden").textContent = "Open navigation menu";
    navigation.classList.remove("is-open");
  };

  document.querySelector(".menu-toggle").addEventListener("click", (event) => {
    const button = event.currentTarget;
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    button.querySelector(".visually-hidden").textContent = isExpanded ? "Open navigation menu" : "Close navigation menu";
    document.querySelector(".primary-navigation").classList.toggle("is-open", !isExpanded);
  });

  document.querySelectorAll(".primary-navigation a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.querySelectorAll("[data-category-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.categoryFilter;
      document.querySelectorAll("[data-category-filter]").forEach((filter) => {
        const isActive = filter === button;
        filter.classList.toggle("is-active", isActive);
        filter.setAttribute("aria-pressed", String(isActive));
      });
      renderShop();
    });
  });

  document.querySelectorAll("[data-category-link]").forEach((link) => {
    link.addEventListener("click", () => {
      activeCategory = link.dataset.categoryLink;
      document.querySelectorAll("[data-category-filter]").forEach((filter) => {
        const isActive = filter.dataset.categoryFilter === activeCategory;
        filter.classList.toggle("is-active", isActive);
        filter.setAttribute("aria-pressed", String(isActive));
      });
      renderShop();
    });
  });

  searchInput.addEventListener("input", renderShop);
  sortSelect.addEventListener("change", renderShop);

  document.addEventListener("click", (event) => {
    const productButton = event.target.closest("[data-product-id]");
    if (productButton) {
      openProduct(productButton.dataset.productId);
      return;
    }

    const enquireButton = event.target.closest("[data-enquire-product]");
    if (enquireButton) {
      const product = products.find((item) => item.id === enquireButton.dataset.enquireProduct);
      if (!product) return;
      productDialog.close();
      document.querySelector("#contact-subject").value = `Enquiry about ${product.name}`;
      document.querySelector("#contact-message").value = `Hello, I’d like to know more about the ${product.name}. Please let me know the current price, colour options, sizing and availability.`;
      window.location.hash = "contact";
      window.setTimeout(() => document.querySelector("#contact-name").focus(), 250);
    }
  });

  document.querySelector(".product-dialog__close").addEventListener("click", () => productDialog.close());
  productDialog.addEventListener("click", (event) => {
    if (event.target === productDialog) productDialog.close();
  });

  contactForm.addEventListener("input", () => {
    formFeedback.textContent = "";
    formFeedback.classList.remove("form-feedback--error");
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    formFeedback.textContent = "Your details are valid, but this site is not connected to an email or messaging service yet. Nothing was sent or saved. Please connect a contact service before accepting enquiries.";
    formFeedback.classList.add("form-feedback--error");
  });

  document.querySelector("#current-year").textContent = new Date().getFullYear();
  renderFeatured();
  renderShop();
})();
