<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class AlphaHyphenDot implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    { //* Match any 1 or more character in [] (so upper A to lower Z and the hyphen) -> See tests for examples of matches
        if (is_string($value)) {
            //? RegExp explanation: Doing [A-z] is tempting BUT turns out there are a few random chars in between (including underscores!)
            //? [A-Za-z]+ matches 'Name' with + indicating 1 or more character will match as group
            //? Including (-[A-Za-z]+) matches 'My_name' meanwhile (\.[A-Z]\.) matches 'J.D.' (without allowing 'J.d.')
            //? Separating them with | (Bool OR) allows matching EITHER 'My_name' or 'J.D.' preventing any weird 'My_name' matching
            //? Finally ? after the above part ((x)|(y)) prevents 'My-whole_name', 'J.D.D.' & 'my-whole-name' from passing 
            //? by enforcing only 0 or 1 of that group not multiple!
            $matchingStringCount = preg_match_all("/[A-Za-z]+((-[A-Za-z]+)|(\.[A-Z]\.))?/", $value); //* This regexp derived from AlphaHyphen
            //* string should only have 1 match! if it matches more like bam_boom (bam & boom matching separately)
            //* Then we don't have a true match like (bam-boom or Bam)
            return $matchingStringCount === 1;
        }
        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The string must contain only letters, and a hyphen or period separated initials';
    }
}
