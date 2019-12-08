<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Welcome_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }
    function add(){
        echo "Welcome Model Add called <br>";
    }

}
