<!DOCTYPE html>
<?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php'; ?>
<html>
<body>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/navbar.php'; ?>
    <h1>dream on!</h1>
    <p id = "splash-message-container" class="typewriter"></p>
    <p>
      <a href="/chapters/ch1.php">read ch. 1 here</a>
    </p>    
</body>
</html>

<!-- splash message -->
<?php
  $splash_messages = array(
    "wip: the series",
    "hello hello hello",
    "welcome to ithaca",
    "ribbit ribbit"
  );
  $random_message_index = array_rand($splash_messages);
?>

<script>
  var splashMessages = <?php echo json_encode($splash_messages); ?>;
  var randomMessageIndex = <?php echo $random_message_index; ?>;
  var splashMessageContainer = document.getElementById("splash-message-container");
  splashMessageContainer.innerHTML = splashMessages[randomMessageIndex];
</script>