<!DOCTYPE html>
<?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php'; ?>
<html>
<body>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/navbar.php'; ?>
    <h1>home ✨</h1>
    <div id = "splash-message-container" class="typewriter"></div>
    <p>
        enchanting creatures, inexplicable phenomena, things that spark imagination and move the heart.
    </p>
    <p>ah, life is a zoo, so won't you come and join me? let's embark on a mission and charter the whimsies of the world.</p>
    <p>If you'd like to go back to the homepage, click <a href="https://sophli.me" style="margin: 0"><em>here</em></a>.</p>
</body>
</html>

<!-- splash message -->
<?php
  $splash_messages = array(
    "joy is discovery",
    "venture into the wilderness",
    "listen to the stillness... it is the world",
    "see the wonders, snatch it for yourself and keep it",
    "amidst the tsunamis and borealis",
    "it's a bright and sunshiney day, once again ~",
    "nice weather for a picnic ~",
    "breathe in jungle safari"
  );
  $random_message_index = array_rand($splash_messages);
?>

<script>
  var splashMessages = <?php echo json_encode($splash_messages); ?>;
  var randomMessageIndex = <?php echo $random_message_index; ?>;
  var splashMessageContainer = document.getElementById("splash-message-container");
  splashMessageContainer.innerHTML = splashMessages[randomMessageIndex];
</script>