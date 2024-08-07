<!DOCTYPE html>
<?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/header.php'; ?>
<html>
<body>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/partials/navbar.php'; ?>
    <h1>spotify time capsule</h1>
    <p id="splash-message-container" class="typewriter">why not</p>

    <div id='get-stats-div'>
        <span>take me to</span>
        <select id='time-type'>
            <option>spring</option>
            <option>summer</option>
            <option>fall</option>
            <option>winter</option>
            <option>custom period</option>
            <option>custom day</option>
        </select>
        <span id='custom-season-container' class='no-spacing'>
            <span>of</span>
            <input id='season-year' type="number" min="2006" step="1" placeholder='year'></input>
        </span>
        <span id='custom-period-container' class='no-spacing'>
            <input id='starting-date' type='date'></input>
            <span>to</span>
            <input id='end-date' type='date'></input>
        </span>
        <span>
        <span id='custom-day-container' class='no-spacing'>
            <input id='day' type='date'></input>
        </span>
        <span>
        <select id='data-type'>
            <option selected>use sample data</option>
            <option>use my spotify</option>
        </select>
        <button id='get-stats' type='button'>GO</button>
    </div>
    
    <div id='additional-settings-div'>
        <span>Additional settings ⚙️</span>
        <input id='client-id' placeholder='your spotify client id' style='width: 200px;'></input>
        <select id='songs-display-type'>
            <option selected>display as cloud</option>
            <option>display as list</option>
        </select>
    </div>
    <div id='extra-div'>
        <span>Extra 💡</span>
        <a href="https://github.com/ACulturedSwine/spotistats" target="_blank">linky link to github + instructions to set up client id</a>
    </div>
    <div id='results-div'>
        <span id='msg-container'></span>
        <ul id='stats'>
            <li id='num-songs-added'></li>    
            <li id='hrs-added'></li>
            <li id='fun-stat'></li>
            <li id='audio-stats-container'>
                <span id='audio-stats-msg'>you tend to listen to songs with</span>
                <ul id='audio-stats' class='no-spacing'></ul>
            </li>
        </ul>
        <div id='list-display'></div>
        <div id='cloud'></div>
    </div>
</body>
</html>