const displaySubmenu = () => {
  const submenu = document.getElementsByClassName("menu__sub")[0];
  submenu.style.display = "block";
};
const hideSubmenu = () => {
  const submenu = document.getElementsByClassName("menu__sub")[0];
  submenu.style.display = "none";
};

let active = null;

const handleOnMouseEnter = item => {
  if (active) active.classList.remove("menu__item--active");
  active = item;
  item.classList.add("menu__item--active");
  displaySubmenu();
};
const menuItems = document.getElementsByClassName("menu__item");
for (const menuItem of menuItems) {
  menuItem.addEventListener("mouseenter", () => handleOnMouseEnter(menuItem));
}

document
  .getElementsByClassName("menu")[0]
  .addEventListener("mouseleave", hideSubmenu);
