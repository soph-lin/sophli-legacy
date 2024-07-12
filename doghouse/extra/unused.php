<!-- If logo-container needs to have a picture, such as below. -->
<li id = "logo"><a href="/home/index.php">sophiesticated <img src="/home/assets/axolotl.png" alt="axolotl" style="object-fit: cover; height: 2em; vertical-align: middle;"></a></li>

<!-- How to use dropdown in navbar -->
<li class = "dropdown">
    <a>words</a>
    <ul>
        <li><a href="#">poetry</a></li>
        <li><a href="#">musings</a></li>
    </ul>
</li>

<!-- splash message -->
<?php
  $splash_messages = array(
    "bark barkity bark",
    "yappers yippers",
    "dog noises"
  );
  $random_message_index = array_rand($splash_messages);
?>

<script>
  var splashMessages = <?php echo json_encode($splash_messages); ?>;
  var randomMessageIndex = <?php echo $random_message_index; ?>;
  var welcomeMessageContainer = document.getElementById("welcome-message-container");
  welcomeMessageContainer.innerHTML = splashMessages[randomMessageIndex];
</script>