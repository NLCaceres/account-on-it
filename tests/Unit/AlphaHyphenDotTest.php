<?php

namespace Tests\Unit;

use App\Rules\AlphaHyphenDot;
use PHPUnit\Framework\TestCase;

class AlphaHyphenDotTest extends TestCase
{
    const FAKE_ATTRIBUTE_NAME = 'foobar';

    //* Pattern: Passing values - Myname, My-Name, MyName, J.D.
    //* Fails - 123, My_name, John.Dorian.

    public function testHyphenRegex() 
    {
        $alphaHyphenDotRule = new AlphaHyphenDot();

        $namesWithoutHyphenPass = $alphaHyphenDotRule->passes(self::FAKE_ATTRIBUTE_NAME, 'Myname');
        $this->assertTrue($namesWithoutHyphenPass);

        $namesWithHyphenPass = $alphaHyphenDotRule->passes(self::FAKE_ATTRIBUTE_NAME, 'My-Name');
        $this->assertTrue($namesWithHyphenPass);

        $namesWithMultiHyphenFail = $alphaHyphenDotRule->passes(self::FAKE_ATTRIBUTE_NAME, 'My-Whole-Name');
        $this->assertFalse($namesWithMultiHyphenFail);

        $namesWithHyphenCaseInsensitivePass = $alphaHyphenDotRule->passes(self::FAKE_ATTRIBUTE_NAME, 'My-name');
        $this->assertTrue($namesWithHyphenCaseInsensitivePass);
    }

    public function testUnderscoreRegex()
    { 
        $alphaHyphenDotRule = new AlphaHyphenDot();

        $namesWithUnderscoresFail = $alphaHyphenDotRule->passes(self::FAKE_ATTRIBUTE_NAME, 'My_name');
        $this->assertFalse($namesWithUnderscoresFail);
    }

    public function testPeriodRegex() 
    {
        $alphaHyphenDotRule = new AlphaHyphenDot();

        $nickNamesWithPeriodPass = $alphaHyphenDotRule->passes(self::FAKE_ATTRIBUTE_NAME, 'J.D.');
        $this->assertTrue($nickNamesWithPeriodPass);

        $fullNamesWithPeriodFail = $alphaHyphenDotRule->passes(self::FAKE_ATTRIBUTE_NAME, 'John.Dorian.');
        $this->assertFalse($fullNamesWithPeriodFail);
    }

    public function testDigitsRegex() 
    {
        $alphaHyphenDotRule = new AlphaHyphenDot();
        
        $digitsFail = $alphaHyphenDotRule->passes(self::FAKE_ATTRIBUTE_NAME, '123');
        $this->assertFalse($digitsFail);
    }
}
