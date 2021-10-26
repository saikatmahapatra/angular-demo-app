<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Common_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function insert($postdata, $table) {
        $this->db->insert($table, $postdata);
        //echo $this->db->last_query(); die();
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }

    function update($postdata, $where_array = array(), $table) {
        $this->db->where($where_array);
        $result = $this->db->update($table, $postdata);
        //echo $this->db->last_query(); die();
        return $result;
    }

    function delete($where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        $result = $this->db->delete($table);
        //echo $this->db->last_query(); die();
        return $result;
    }
}
