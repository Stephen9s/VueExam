<?php
/**
 * Thanks to 
 * https://medium.com/@jeffochoa/using-the-illuminate-validation-validator-class-outside-laravel-6b2b0c07d3a4
 */
namespace app\Factories;

use Illuminate\Validation;
use Illuminate\Translation;
use Illuminate\Filesystem\Filesystem;

class ValidatorFactory
{
    private $factory;
    
    public function __construct()
    {
        $this->factory = new Validation\Factory(
            $this->loadTranslator()
        );
    }

    protected function loadTranslator()
    {
        $filesystem = new Filesystem();
        $loader = new Translation\FileLoader(
            $filesystem, BASE_DIR . '/lang');
            $loader->addNamespace(
                'lang',
                BASE_DIR . '/lang'
            );

        $loader->load('en', 'validation', 'lang');

        return new Translation\Translator($loader, 'en');
    }

    public function __call($method, $args)
    {
        return call_user_func_array(
            [$this->factory, $method],
            $args
        );
    }
}