<?
define('BASE_DIR', dirname(dirname(__FILE__)) );
$f3 = \Base::instance();
include 'web/routes.php';
$f3->run();
