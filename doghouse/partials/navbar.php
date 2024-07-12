<nav>
    <ul>
        <li><a href="/" id="logoContainer">DogHouse</a></li>
        <li><a href="/about.php">about</a></li>
        <li id="rooms-menu" class="dropdown">
          <a>rooms</a>
          <ul id="rooms-menu-list" class="dropdown-list"></ul>
        </li>
        <li id="settings-button" class="dropdown">⚙️</li>
        <div id="settings-container">
          <div id="settings-content">
            <div>settings</div>
            <button id="clear-data-button">clear data</button>
          </div>
        </div>
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
  var emojis = ["🐕","🌭","🐶","🦮","🦮","🐕‍🦺","🐩"];

  newLogoIcon();

  window.addEventListener('playerTouchedLogoTrigger', newLogoIcon);

  function newLogoIcon(){
    var splashMessageContainer = document.getElementById("logoContainer");
    splashMessageContainer.innerHTML = "DogHouse " + getRandomEmoji();
  }

  function getRandomEmoji(){
    return emojis[Math.floor(Math.random()*emojis.length)];
  }
</script>