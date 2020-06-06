<!DOCTYPE html>
<html lang="{{app()->getLocale()}}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{ config('app.name') }}</title>

  <script src="https://www.google.com/recaptcha/api.js?render={{ config('app.recaptcha_v3') }}"> </script>
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>

  <script src="{{ asset('js/app.js') }}" defer></script>
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">

  <!-- <script src="{{ asset('js/semantic.min.js') }}" defer></script> -->
  <link href="{{ asset('css/semantic.min.css') }}" rel="stylesheet" type="text/css">

</head>

<body>
  <div id="app">
    <app></app>
  </div>
</body>

</html>