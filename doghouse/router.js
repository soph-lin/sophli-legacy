$path = $_SERVER['REQUEST_URI'];

switch ($path) {
    case '/':
        include('index.php');
        break;
    case '/about':
        include('about.php');
        break;
    default:
        include('rooms/room1.php');
        break;
}