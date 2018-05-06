<?
namespace App\Http\Controllers;
use App\Http\Controllers\Controller as Controller;

class Home extends Controller {
    
    public function index($f3, $args) {
        $f3->set('UI', './public/');
        echo \View::instance()->render('index.php');
    }

}
