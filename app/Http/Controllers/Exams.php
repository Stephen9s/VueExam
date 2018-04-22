<?
namespace App\Http\Controllers;
use App\Http\Controllers\Controller as Controller;
use App\Factories\ValidatorFactory;

class Exams extends Controller {
    public function get($f3, $args) {
        array_shift($args);
        $request = array_merge($_GET, $args);

        $errors = null;

        $validator = (new ValidatorFactory())->make(
            $request,
            [
                'id' => 'required|integer|min:0|max:55'
            ]
        );

        if ($validator->fails()) {
            $errors = $validator->errors();
            $f3->status(400);
            header('Content-Type: application/json');
            echo json_encode(["errors" => $errors], true);
        } else {
            header('Content-Type: application/json');
            echo json_encode(["result" => "success"], true);
        }
    }
}