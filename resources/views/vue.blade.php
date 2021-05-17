<!DOCTYPE html>
<html lang="{{app()->getLocale()}}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name') }}</title>

  <!-- Recaptcha v2 and v3 -->
  <script src="https://www.google.com/recaptcha/api.js?render={{ config('app.recaptcha_v3') }}"> </script>
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>

  <!-- FavIcon -->
  <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/favicon/apple-touch-icon.png') }}">
  <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon/favicon-32x32.png') }}">
  <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('images/favicon/favicon-16x16.png') }}">
  <!-- <link rel="manifest" href="{{ asset('images/favicon/site.webmanifest') }}"> -->
  <link rel="mask-icon" href="{{ asset('images/favicon/safari-pinned-tab.svg') }}" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">

  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

  <!-- //? Asset ensures you have the exact file from public directory (seemingly no issues with HotModuleReloading) -->
  <!-- //? BUT could use mix() (here) with version() (in webpack.mix.js) to properly register versioned bundled files-->
  <script src="{{ asset('js/app.js') }}" defer></script>
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">

  <!-- <script src="{{ asset('js/semantic.min.js') }}" defer></script> -->
  <link href="{{ asset('css/semantic.min.css') }}" rel="stylesheet" type="text/css">

</head>

<body>
  <!--//? Vue directly mounts on to div with render + $mount funcs -->
  <div id="app">
    <!-- <app></app> -->
  </div>
</body>

</html>