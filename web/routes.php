<?

$f3->route('GET /', 'App\Http\Controllers\Home->index');
$f3->route('GET /jsonData/@id', 'App\Http\Controllers\Exams->get');