<?

$html = <<<EOT
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>VueExam</title>
  <meta name="description" content="Interactive client-side test-taking application.">
  <meta name="author" content="SitePoint">

  <link rel="stylesheet" href="public/css/app.css">
</head>

<body>
    <div id="root">
      <app-navbar></app-navbar>
      <router-view :key="\$route.fullPath"></router-view>
    </div>
    <script src="public/js/app.js"></script>
</body>
</html>
EOT;
print $html;