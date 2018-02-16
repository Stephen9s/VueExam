<?

$html = <<<EOT
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>VueExam</title>
  <meta name="description" content="Interactive client-side test-taking application.">
  <meta name="author" content="SitePoint">
  <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
  <link rel="stylesheet" href="public/css/app.css">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
</head>

<body>
    <div id="app">
        <v-app>
            <v-navigation-drawer clipped fixed mini-variant v-model="drawer" app>
              <v-list dense>
                  <v-list-tile @click="">
                      <v-list-tile-action>
                          <v-icon>dashboard</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>Dashboard</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile href="#/load">
                      <v-list-tile-action>
                          <v-icon>file_upload</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>Add Exam</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile href="#/exams">
                      <v-list-tile-action>
                          <v-icon>speaker_notes</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>Your Exams</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
              </v-list>
            </v-navigation-drawer>
            <v-toolbar app fixed clipped-left>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title>{{ applicationName }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon><v-icon>person</v-icon></v-btn>
            </v-toolbar>
            <v-content>
                <v-container fluid>
                    <router-view :key="\$route.fullPath"></router-view>
                </v-container>
            </v-content>
            <v-footer app fixed><span>&copy; 2018</span></v-footer>
        </v-app>
    </div>
    <script src="public/js/app.js"></script>
</body>
</html>
EOT;
print $html;
