<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Settings_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function insert($postdata, $table = NULL) {
        if ($table == NULL) {
            $this->db->insert('site_settings_options', $postdata);
        } else {
            $this->db->insert($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }

    function update($postdata, $where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->update('site_settings_options', $postdata);
        } else {
            $result = $this->db->update($table, $postdata);
        }
        echo $this->db->last_query(); die();
        return $result;
    }

    function update_options($postdata_options) {
        $result = true;
        if(isset($postdata_options)){
            foreach($postdata_options as $key=>$val){
                //echo $key.'---'.$val;
                echo $sql = "UPDATE `site_settings_options` SET `option_value` = '".$val."' WHERE `option_name` = '".$key."'";
                $query = $this->db->query($sql);
            }
            //$result = $this->db->update('site_settings_options');
        }
        //echo $this->db->last_query(); die();
        
        //return $result;
    }

    function delete($where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->delete('site_settings_options');
        } else {
            $result = $this->db->delete($table);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function get_option($option_name_array = NULL) {
        $result = array();
        $this->db->select('t1.*');
        if(isset($option_name_array) && sizeof($option_name_array) > 0){
            $this->db->where_in('option_name', $option_name_array);
        }
        $query = $this->db->get('site_settings_options as t1');
        $num_rows = $query->num_rows();
        $res = $query->result_array();
        if(sizeof($num_rows)>0){
            foreach ($res as $r) {
                $result[$r['option_name']] = $r['option_value'];
            }
            //$result =  $res;
        }
        return $result;
    }
}
