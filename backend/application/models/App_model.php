<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class App_model extends CI_Model {

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

    function get_meta_dropdown($types, $requiredCode = false) {
        $result = [];
        $this->db->select('id, meta_value, meta_code');
        $this->db->where('meta_status','Y');
        $this->db->where_in('meta_type', $types);
		$this->db->order_by('meta_value');
        $query = $this->db->get('site_meta');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                if($requiredCode) {
                    $a['id'] = $r->id.'-'.$r->meta_code;
                } else {
                    $a['id'] = $r->id;
                }
                $a['name'] = $r->meta_value;
                array_push($result, $a);
            }
        }
        return $result;
    }

    function get_meta($types) {
        $result = [];
        $this->db->select('id, meta_value');
        $this->db->where('meta_status','Y');
        $this->db->where_in('meta_type', $types);
		$this->db->order_by('meta_value');
        $query = $this->db->get('site_meta');
        if ($query->num_rows()) {
            $result = $query->result_array();
        }
        return $result;
    }

    function getUserRecordCount($userId = NULL, $tableName=NULL) {
        $this->db->select('id');
        $this->db->where('user_id', $userId);
        $query = $this->db->get($tableName);
        //echo $this->db->last_query(); die();
        return $query->num_rows();
    }

    function checkIfExists($metaType, $metaValue) {
        $this->db->select('id');
        $this->db->where('meta_type', $metaType);
        $this->db->where('meta_value', $metaValue);
        $query = $this->db->get('site_meta');
        //echo $this->db->last_query(); die();
        return $query->num_rows();
    }
}
