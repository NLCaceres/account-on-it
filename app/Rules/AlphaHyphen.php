<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class AlphaHyphen implements Rule
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
    { //* Match any 1 or more character in [] (so upper A to lower Z and the hyphen)
      //* See tests for examples that should match
        if (is_string($value)) {
            //? RegExp explanation: Doing [A-z] is tempting BUT turns out there are a few random chars in between (including underscores!)
            //? [A-Za-z]+ matches 'Name' with + indicating 1 or more character will match as group
            //? (-[A-Za-z]+) matches the last half 'My-Name' following the hyphen but NOT 'My-Whole-Name' 
            //? Thanks to the ? only 1 hyphen or none is allowed
            $matchingStringCount = preg_match_all("/[A-Za-z]+(-[A-Za-z]+)?/", $value); //* preg_match_all just returns count of matches
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
        return 'The string must contain only letters, and a hyphen';
    }
}
