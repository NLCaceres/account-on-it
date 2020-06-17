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

  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

  <!-- Could use asset instead of mix here but mix helps with hot module reloading -->
  <script src="{{ mix('js/app.js') }}" defer></script>
  <link href="{{ mix('css/app.css') }}" rel="stylesheet">

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