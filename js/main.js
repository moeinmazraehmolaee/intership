document.addEventListener("DOMContentLoaded", () => {
  setupScrollEffect();
  setupDrawerToggle();
  setupDrawerItemsToggle();
  rotateBorder();
  searchPart();
  selectDirection();
  them();
  preventOverflow();
  scrollSection();
});

// Initialize Swiper
const swiper = new Swiper(".swiper-container", {
  loop: true,
  effect: "cube",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

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

// Search Section Toggle
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

// Scroll Effect
function setupScrollEffect() {
  const navbarDesktop = document.querySelector(".navbar-container");
  const logoImg = document.querySelector(".logo img");
  const logo = document.querySelector(".logo");
  const customItems = document.querySelectorAll(".custom-item");
  // const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const menusBelow = document.querySelectorAll(".menu-below");
  const customDropdowns = document.querySelectorAll(".custom-dropdown-wraper");
  const iconUses = document.querySelectorAll("#icon-use");
  const scrollClass = "scroll";
  const scrolledClass = "scrolledClass";

  function removeNormalFromHref(href) {
    const [path, idPart] = href.split("#");
    return `${path}#${idPart.replace("-normal", "")}`;
  }

  function updateStylesOnScroll(isScrolled) {
    if (isScrolled) {
      navbarDesktop.classList.add(scrolledClass);
      logoImg.src = "./img/Group 4 (1).png";
      logo.style.marginTop = "0.2em";

      [customDropdowns, menusBelow].forEach((elements) => {
        elements.forEach((el) => el.classList.add(scrollClass));
      });

      customItems.forEach((item) => (item.style.marginTop = "2.63em"));

      iconUses.forEach((icon) => {
        const hrefValue = icon.getAttributeNS(
          "http://www.w3.org/1999/xlink",
          "href"
        );
        const newHrefValue = removeNormalFromHref(hrefValue);
        icon.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "href",
          newHrefValue
        );
      });
    } else {
      navbarDesktop.classList.remove(scrolledClass);
      logoImg.src = "./img/Group 4.png";
      logo.style.marginTop = "0.25em";

      [customDropdowns, menusBelow].forEach((elements) => {
        elements.forEach((el) => el.classList.remove(scrollClass));
      });

      customItems.forEach((item) => (item.style.marginTop = "2.63em"));

      iconUses.forEach((icon) => {
        const hrefValue = icon.getAttributeNS(
          "http://www.w3.org/1999/xlink",
          "href"
        );
        const newHrefValue = hrefValue.includes("normal")
          ? hrefValue
          : `${hrefValue}-normal`;
        icon.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "href",
          newHrefValue
        );
      });
    }
  }

  function handleScroll() {
    const isScrolled =
      document.body.scrollTop > 120 ||
      document.documentElement.scrollTop > 120 ||
      window.innerWidth < 992;
    updateStylesOnScroll(isScrolled);
  }

  window.onscroll = handleScroll;
  handleScroll();
}

// Rotate Border
function rotateBorder() {
  const borderCirculs = document.querySelectorAll(".border-circul");

  borderCirculs.forEach((borderCircul) => {
    let angle = 0;
    setInterval(() => {
      angle += 360;
      borderCircul.style.transform = `rotate(${angle}deg)`;
    }, 5000);
  });
}

// Prevent Overflow
function preventOverflow() {
  const subMenus = document.querySelectorAll(".custom-dropdown-container");

  subMenus.forEach(setTransform);
  window.addEventListener("resize", () => {
    subMenus.forEach(setTransform);
  });
}

function setTransform(element) {
  const item = element.querySelector(".custom-dropdown-wraper");
  element.style.transform = `translate3d(${0}px, -24px, 0px)`;
  const rect = item.getBoundingClientRect();
  const screenWidth = window.innerWidth;

  let translateX = 0;
  if (rect.right > screenWidth) {
    translateX = screenWidth - rect.right - 13;
  }
  if (rect.left < 0) {
    translateX = -rect.left;
  }
  element.style.transform = `translate3d(${translateX}px, -24px, 0px)`;
}

// Scroll to Section
function scrollSection() {
  const universityLife = document.querySelector("#university-life");
  const landingIcon = document.querySelector("#landing-icon");

  landingIcon.addEventListener("click", () => {
    universityLife.scrollIntoView({ behavior: "smooth" });
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
  swiper.changeLanguageDirection(direction);
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
