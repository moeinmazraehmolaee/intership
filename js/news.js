document.addEventListener("DOMContentLoaded", function () {
  setupDrawerToggle();
  setupDrawerItemsToggle();
  searchPart();
  preventOverflow();
  them();
  selectDirection();
  setShowModal();
});

// swiper js
const swiperGallery = new Swiper(".swiperGallery", {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      grabCursor: true,
      touchRatio: 1,
      touchAngle: 45,
    },
  },
});
const modalSwiper = new Swiper(".modalSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});




// Drawer Toggle
function setupDrawerToggle() {
  const btnDrawer = document.querySelector(".open-drawer");
  const navDrawerContainer = document.querySelector(".nav-drawer-container");
  const navDrawerWraper = document.querySelector(".nav-drawer-wraper");

  document.addEventListener("click", (e) => {
    if (btnDrawer.contains(e.target)) {
      navDrawerContainer.classList.add("show");
    } else if (
      !navDrawerWraper.contains(e.target) &&
      e.target !== navDrawerWraper
    ) {
      navDrawerContainer.classList.remove("show");
      closeAllDrawerItems();
    }
  });
}

// Drawer Items Toggle
function setupDrawerItemsToggle() {
  const drawerItems = document.querySelectorAll(".navBar-item");

  drawerItems.forEach((item) => {
    const link = item.querySelector("a");
    // const subMenu = item.querySelector(".sub-menu");

    link.addEventListener("click", (e) => {
      e.preventDefault();
      closeAllDrawerItems(item);
      item.classList.toggle("showSubMenu");
      // subMenu.classList.toggle("");
    });
  });
}
// Close All Drawer Items
function closeAllDrawerItems(exceptItem = null) {
  const drawerItems = document.querySelectorAll(".navBar-item");

  drawerItems.forEach((otherItem) => {
    if (otherItem !== exceptItem) {
      // otherItem.classList.remove("bg-drawer-sub");
      // const otherSubMenu = otherItem.querySelector(".dropdon-toggle");
      // if (otherSubMenu) {
        otherItem.classList.remove("showSubMenu");
      // }
    }
  });
}

// show search section
function searchPart() {
  const searchIcons = document.querySelectorAll("#search-icon");
  const forSearch = document.querySelector("#forSearch");
  const searchInput = document.querySelector(".search-input");
  document.addEventListener("click", (e) => {
    e.preventDefault();
    const clickedInsideSearchIcon = Array.from(searchIcons).some((icon) =>
      icon.contains(e.target)
    );
    const clickedOutside =
      !searchInput.contains(e.target) && !clickedInsideSearchIcon;

    if (clickedInsideSearchIcon) {
      forSearch.classList.add("search-container");
    } else if (clickedOutside) {
      forSearch.classList.remove("search-container");
    }
  });
}

// set transform property  for dropdown menu
function setTransform(element) {
  const item = element.querySelector(".custom-dropdown");
    element.style.transform = `translate3d(${0}px, -1.62em, 0px)`;
  const rect = item.getBoundingClientRect();
  const screenWidth = window.innerWidth;

  let translateX = 0;

  if (rect.right > screenWidth) {
    translateX = screenWidth - rect.right - 13;
  }
  if (rect.left < 0) {
    translateX = -rect.left;
  }
  element.style.transform = `translate3d(${translateX}px, -1.62em, 0px)`;
}
// Preventing the menu from overflow the document
function preventOverflow() {
  const subMenu = document.querySelectorAll(".custom-dropdown-container");

  subMenu.forEach((item) => {
    setTransform(item);
  });

  // Call the function when window is resized
  window.addEventListener("resize", () => {
    subMenu.forEach((item) => {
      setTransform(item);
    });
  });
}

// Change Theme
function them() {
  const globalIcons = document.querySelectorAll("#global-icon");
  const body = document.querySelector("body");

  globalIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      body.classList.toggle('dark')
      body.classList.toggle('light')
    });
  });
}



// set add or remove show class for modal swiper.js
function setShowModal() {
  const swiperGalleryItems = document.querySelectorAll(".swiperGallery-item");
  const modal = document.querySelector(".modal");
  const modalSwiper = document.querySelector(".modalSwiper");

  swiperGalleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      modal.classList.add("show");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !modalSwiper.contains(e.target) &&
      !Array.from(swiperGalleryItems).some((gallery) => gallery.contains(e.target))
    ) {
      modal.classList.remove("show");
    }
  });
}

// Language Direction
function updateDropdownPosition(dropdown, direction) {
  dropdown.forEach((item) => {
    item.style.left = direction === "ltr" ? "0" : "auto";
    item.style.right = direction === "rtl" ? "0" : "auto";
    item.style.textAlign = direction === "ltr" ? "left" : "right";
  });
}

function handleLanguageChange(direction) {
  const body = document.querySelector("body");
  const dropdown = document.querySelectorAll(
    ".custom-dropdown-container .custom-dropdown-wraper"
  );

  body.setAttribute("dir", direction);
  swiperGallery.changeLanguageDirection(direction);
  modalSwiper.changeLanguageDirection(direction);
  updateDropdownPosition(dropdown, direction);
  preventOverflow();
}

function selectDirection() {
  const EN = document.querySelectorAll("#En");
  const Fa = document.querySelectorAll("#Fa");

  EN.forEach((element) => {
    element.addEventListener("click", () => handleLanguageChange("ltr"));
  });

  Fa.forEach((element) => {
    element.addEventListener("click", () => handleLanguageChange("rtl"));
  });
}