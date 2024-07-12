<nav>
    <ul>
        <li><a href="/" id="logoContainer">dream on!</a></li>
        <li><a href="/about.php">about</a></li>
        <li><a href="/ost.php">ost</a></li>
    </ul>
</nav>

<div id="modal-container">
  <div id="modal-content">
    <div id="modal-header">
      <h2></h2>
    </div>
    <div id="modal-message"></div>
    <div id="modal-footer"></div>
  </div>
</div>

<script>
  var emojis = ['📚', '🐸', '☄️', '🛠️', '🎭', '❄️', '🌸'];

  newLogoIcon();

  window.addEventListener('playerTouchedLogoTrigger', newLogoIcon);

  function newLogoIcon(){
    var splashMessageContainer = document.getElementById("logoContainer");
    splashMessageContainer.innerHTML = "dream on! " + getRandomEmoji();
  }

  function getRandomEmoji(){
    return emojis[Math.floor(Math.random()*emojis.length)];
  }
</script>