// Dropdown menu toggle and accessibility for nav

document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.querySelector('.menu-btn');
  const mainMenu = document.getElementById('main-menu');
  const submenuBtn = document.querySelector('.submenu-btn');
  const submenu = document.querySelector('.submenu');

  // Toggle main menu
  menuBtn.addEventListener('click', function () {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !expanded);
    mainMenu.hidden = expanded;
    if (!expanded) {
      mainMenu.querySelector('a, .submenu-btn').focus();
    }
  });

  // Toggle submenu
  submenuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const expanded = submenuBtn.getAttribute('aria-expanded') === 'true';
    submenuBtn.setAttribute('aria-expanded', !expanded);
    submenu.hidden = expanded;
    if (!expanded) {
      submenu.querySelector('a').focus();
    }
  });

  // Close menus on outside click
  document.addEventListener('click', function (e) {
    if (!menuBtn.contains(e.target) && !mainMenu.contains(e.target)) {
      menuBtn.setAttribute('aria-expanded', 'false');
      mainMenu.hidden = true;
      submenuBtn.setAttribute('aria-expanded', 'false');
      submenu.hidden = true;
    }
  });

  // Keyboard navigation (Escape closes menus)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      menuBtn.setAttribute('aria-expanded', 'false');
      mainMenu.hidden = true;
      submenuBtn.setAttribute('aria-expanded', 'false');
      submenu.hidden = true;
      menuBtn.focus();
    }
  });
});
