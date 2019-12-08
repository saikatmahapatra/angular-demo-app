<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Install_model extends CI_Model {

    var $table_users;

    function __construct() {
        parent::__construct();

        $this->table_users = "";
    }

    function create_table() {
        
    }
}
