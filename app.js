document.addEventListener("DOMContentLoaded", function() {
  
  /* Switch between various stylesheets */
  document.getElementById('switch-style-button').addEventListener('click', function() {
    let currentTheme = document.getElementById('current-theme').getAttribute('href');
    if (currentTheme.includes('style.css')) {
      document.getElementById('current-theme').setAttribute('href', './retro.css');
    } else {
      document.getElementById('current-theme').setAttribute('href', './style.css'); 
    }
  });
});