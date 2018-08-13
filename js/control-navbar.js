  // The script will execute only if the viewport width is less than or equal to 780px
var element = document.getElementsByClassName("mobile-menu__hamburger-button")[0],
menu = document.getElementsByClassName("mobile-menu__menu-wrapper")[0].parentNode,
menuOpened = false;

function hideShowMenu() {
  if (!menuOpened) {
    menu.classList.add('mobile-menu--menu-shown');
    element.classList.add("mobile-menu__hamburger-button--active");
    menuOpened = true;
  } else {
    menu.classList.remove('mobile-menu--menu-shown');
    element.classList.remove("mobile-menu__hamburger-button--active");
    menuOpened = false;
  }
}
element.addEventListener("click", hideShowMenu);
