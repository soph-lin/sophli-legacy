<nav>
  <ul>
      <li><a href="/" id="logoContainer">sophli</a></li>
      <li><a href="/about.php">about</a></li>
      <li><a href="/music.php">music</a></li>
      <li><a href="/bites.php">bites</a></li>
      <li id="lightbulb">
        <svg xmlns="http://www.w3.org/2000/svg" id="pullCord" height="250" width="20" viewBox="50 50 300 30">
            <line x1="0" y1="0" x2="0" y2="200"/>
            <circle cx="0" cy="200" r="5" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
          <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1"/>
        </svg>
      </li>
  </ul>
</nav>


  
<?php
  $splash_messages = array(
    "✋","✌️","🤏","✍️","👐","👋","👏","👏","👌","🙏","🤙"
  );
  $random_message_index = array_rand($splash_messages);
?>

<script>
  var splashMessages = <?php echo json_encode($splash_messages); ?>;
  var randomMessageIndex = <?php echo $random_message_index; ?>;
  var splashMessageContainer = document.getElementById("logoContainer");
  const emoji = splashMessages[randomMessageIndex];
  splashMessageContainer.innerHTML = "sophli " + emoji;

  const faviconHREF = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='80'>${emoji}</text></svg>`;
  document.getElementById("favicon").setAttribute("href", faviconHREF);
</script>