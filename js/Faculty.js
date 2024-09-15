document.addEventListener("DOMContentLoaded", () => {
  setupNavbarScrollEffect();
  setupDrawerToggle();
  // setupDrawerItemsToggle();
  counter();
  setupDrawerItemsToggle();
  preventOverflow();
  them();
  searchPart();
  selectDirection();
  scrollSection()
});

// Changing classes  when scrolling the documents
function setupNavbarScrollEffect() {
  const navbarDesktop = document.querySelector(".custom-navbar");
  const handleScroll = () => {
    if (window.scrollY > 120) {
      navbarDesktop.classList.add("bg-scrolled-navbar");
    } else {
      navbarDesktop.classList.remove("bg-scrolled-navbar");
    }
  };
  window.onscroll = handleScroll;

  handleScroll();
}



// Set the background document  and  show  menu in mobile mode
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


// Counting numbers from 0 to a specific number in the educational-groups section
function counter(){
  const count = document.querySelectorAll('.counter-value')

  count.forEach(item =>{
    const targetNumber = item.getAttribute('data-count')
    let currentNumber = 0;
    const interval = setInterval(() => {
        if (currentNumber < targetNumber) {
            currentNumber++;
            item.innerText = currentNumber;
        } else {
            clearInterval(interval);
        }
    }, 70); 
  })
}


// set show class for sub-menu
function setupDrawerItemsToggle() {
  const drawerItems = document.querySelectorAll(".nav-drawer-item");

  drawerItems.forEach((item) => {
    const link = item.querySelector("a");
    // const subMenu = item.querySelector(".sub-menu");

    link.addEventListener("click", (e) => {
      e.preventDefault();
      closeAllDrawerItems(item);
      // item.classList.toggle("bg-drawer-sub");
      item.classList.toggle("showSubMenu");
    });
  });
}

// Close All Drawer Items
function closeAllDrawerItems(exceptItem = null) {
  const drawerItems = document.querySelectorAll(".nav-drawer-item");

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
  const item = element.querySelector(".custom-dropdown-wraper");
  element.style.transform = `translate3d(${0}px, -40px, 0px)`;
  const rect = item.getBoundingClientRect();
  const screenWidth = window.innerWidth;

  let translateX = 0;


  if (rect.right > screenWidth) {
    translateX = screenWidth - rect.right - 13;
  }
  if (rect.left < 0) {
    translateX = -rect.left;
  }
  element.style.transform = `translate3d(${translateX}px, -40px, 0px)`;
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

// By clicking on the landding home page, scroll to the desired section
function scrollSection(){
  const universityLife = document.querySelector('.events')
  const landingIcon = document.querySelector('#landing-icon')
  landingIcon.addEventListener('click',()=>{
    universityLife.scrollIntoView({ behavior: 'smooth' });
  })
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
  const dropdown = document.querySelectorAll(".custom-dropdown-container .custom-dropdown-wraper");

  body.setAttribute("dir", direction);
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
