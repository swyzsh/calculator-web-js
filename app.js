document.addEventListener("DOMContentLoaded", function() {
  
  /* Switch between various stylesheets */
  document.getElementById('switch-style-button').addEventListener('click', function() {
    let themeLink = document.getElementById('current-theme');
    let themeSpan = document.getElementById('theme-name');
    let currentTheme = themeLink.getAttribute('href');

    if (currentTheme.includes('style.css')) {
      themeLink.setAttribute('href', './retro.css');
      themeSpan.textContent = 'Retro';
      themeSpan.style.color = '#39ff14';
    } else {
      themeLink.setAttribute('href', './style.css'); 
      themeSpan.textContent = 'Modern';
      themeSpan.style.color = '#babbf1';
    }
  });

  /* Copy results button logic */
  const copyButton = document.getElementById('copy-result-btn');
  let textToCopy = document.getElementById('result').textContent;
  copyButton.addEventListener("click", async () => {
    try {
      // Try the modern Clipboard API first (if supported)
      await navigator.clipboard.writeText(textToCopy);
      console.log("Text copied successfully using Clipboard API");
      alert("Result copied successfully!");
    } catch (err) {
      // If Clipboard API fails, use the legacy approach
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed"; // Hide element off-screen
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      console.log("Text copied successfully using legacy approach");
      alert("Result copied successfully!");
    }
  });

});