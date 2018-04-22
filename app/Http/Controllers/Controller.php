<?

namespace App\Http\Controllers;
use CapsuleManager\Wrapper\Manager as Capsule;

class Controller {
    protected $capsule;
    protected $connectionPDO;

    public function __construct() {
        // Don't care if this gets checked in; defaults for MySQL.
        $this->connectionPDO = new \PDO("mysql:host=127.0.0.1;dbname=vueexam;", "root", "password");
        $this->capsule = new Capsule($this->connectionPDO);

        // Make this Capsule instance available globally via static methods
        $this->capsule->setAsGlobal();

        // Setup the Eloquent ORM
        $this->capsule->bootEloquent();
    }
}