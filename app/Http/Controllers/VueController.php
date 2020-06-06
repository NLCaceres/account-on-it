<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class VueController extends Controller
{
    public function index()
    {
        return view('vue');
    }

    public function recaptcha(Request $request)
    {
        $token = $request->input('response');
        //? Interestingly php parses 'str' differently than "str". Double quotes allow str interpolation!
        $secret = config('app.recaptcha_v3_secret');
        $recaptchaVerified = Http::post("https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}")->json(); //? Posting to the base url only works as a form-encoded url or as shown, with query params!

        if (!$recaptchaVerified['success']) {
            $errors = $recaptchaVerified['error-codes'];
            if (count($errors) > 0) { //* Could go through the 6 possible error codes, but all quite similar */
                return response(null, Response::HTTP_BAD_GATEWAY); //* Could also send the exact ones received but all likely will be handled as a broken service notice to user */
            }
        }
        //? Laravel 7 gives a few options for handling external api replies
        //! Basic w/ a stdClass, similar to JS or Py objects. Not a base/parent class like Java. No similar concept in PHP
        // $body = json_decode($recaptchaVerified->getBody());
        // $body_success = $body->success;
        //! Basic w/ auto-cast to array, Php arrs much more like maps using keys of any val to access values inside
        // $body2 = json_decode($recaptchaVerified->getBody(), true);
        // $body2_success = $body2['score'];
        //! Laravel 7 gives us plenty of response helpers like the json() method used above
        return response(['action' => $recaptchaVerified['action'], 'score' => $recaptchaVerified['score']]); //? Defaults to 200 (OK)
    }
}
