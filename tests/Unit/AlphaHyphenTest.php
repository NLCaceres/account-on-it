<?php

namespace Tests\Unit;

use App\Rules\AlphaHyphen;
use PHPUnit\Framework\TestCase;

class AlphaHyphenTest extends TestCase
{
    const FAKE_ATTRIBUTE_NAME = 'foobar';

    //* Pattern: Passing values - Myname, My-Name, MyName
    //* Fails - 123, My_name, John.Dorian. J.D.

    public function testHyphenRegex() 
    {
        $alphaHyphenRule = new AlphaHyphen();

        $namesWithoutHyphenPass = $alphaHyphenRule->passes(self::FAKE_ATTRIBUTE_NAME, 'Myname');
        $this->assertTrue($namesWithoutHyphenPass);

        $namesWithHyphenPass = $alphaHyphenRule->passes(self::FAKE_ATTRIBUTE_NAME, 'My-Name');
        $this->assertTrue($namesWithHyphenPass);

        $namesWithMultiHyphenFail = $alphaHyphenRule->passes(self::FAKE_ATTRIBUTE_NAME, 'My-Whole-Name');
        $this->assertFalse($namesWithMultiHyphenFail);

        $namesWithHyphenCaseInsensitivePass = $alphaHyphenRule->passes(self::FAKE_ATTRIBUTE_NAME, 'My-name');
        $this->assertTrue($namesWithHyphenCaseInsensitivePass);
    }

    public function testPeriodRegex() 
    {
        $alphaHyphenRule = new AlphaHyphen();
        $nickNamesWithPeriodFail = $alphaHyphenRule->passes(self::FAKE_ATTRIBUTE_NAME, 'J.D.');
        $this->assertFalse($nickNamesWithPeriodFail);

        $fullNamesWithPeriodFail = $alphaHyphenRule->passes(self::FAKE_ATTRIBUTE_NAME, 'John.Dorian.');
        $this->assertFalse($fullNamesWithPeriodFail);
    }

    public function testUnderscoreRegex()
    { 
        $alphaHyphenRule = new AlphaHyphen();
        $namesWithUnderscoresFail = $alphaHyphenRule->passes(self::FAKE_ATTRIBUTE_NAME, 'My_name');
        $this->assertFalse($namesWithUnderscoresFail);
    }

    public function testDigitsRegex() 
    {
        $alphaHyphenRule = new AlphaHyphen();
        $digitsFail = $alphaHyphenRule->passes(self::FAKE_ATTRIBUTE_NAME, '123');
        $this->assertFalse($digitsFail);
    }
}
