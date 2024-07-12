<!DOCTYPE html>
<?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php'; ?>
<html>
<body>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/navbar.php'; ?>
    <h1>game 🦴</h1>
    <p id = "welcome-message-container" class="typewriter"></p>
    <div>
      <button id="start-button">start</button>
      <div id="controls">
        <p>wasd/arrow keys to move.</p>
        <p>space to interact.</p>
        <p>enter to progress dialogue.</p>
      </div>
      <p>note that this only works on computer. (for now)</p>
    </div>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/player.php'; ?>
</body>
</html>