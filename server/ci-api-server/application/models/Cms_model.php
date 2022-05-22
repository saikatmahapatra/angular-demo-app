<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Cms_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function insert($postdata, $table = NULL) {
        if ($table == NULL) {
            $this->db->insert('cms', $postdata);
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
            $result = $this->db->update('cms', $postdata);
        } else {
            $result = $this->db->update($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function delete($where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->delete('cms');
        } else {
            $result = $this->db->delete($table);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function get_rows($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE) {
        $result = array();
        $this->db->select('t1.*,t2.user_email, t2.user_emp_id, t2.user_firstname, t2.user_lastname');
        $this->db->join('users as t2', 't2.id = t1.content_created_by', 'left');
        if ($id) {
            $this->db->where('t1.id', $id);
        }

        ####################################################################
        ##################### Display using Data Table #####################
        ####################################################################
        if ($dataTable == TRUE) {
            //set column field database for datatable orderable
            $column_order = array(
                't1.content_title',
                't1.content_type',
                't1.content_text',
                't1.content_status',
                NULL,
            );            
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.content_type',
                't1.content_title',
                't1.content_text',
                't1.content_status',
                't1.content_meta_keywords',
                't1.content_meta_description',
                't1.content_meta_author',
                );
             // default order
            $order = array(
                't1.id' => 'desc'
                );
            $i = 0;
            foreach ($column_search as $item) { // loop column
                if (isset($_REQUEST['search']['value'])) { // if datatable send POST for search
                    if ($i === 0) { // first loop
                        $this->db->group_start(); // open bracket. query Where with OR clause better with bracket. because maybe can combine with other WHERE with AND.
                        $this->db->like($item, $_REQUEST['search']['value']);
                    } else {
                        $this->db->or_like($item, $_REQUEST['search']['value']);
                    }
                    if (count($column_search) - 1 == $i) { //last loop
                        $this->db->group_end(); //close bracket
                    }
                }
                $i++;
            }
            if (isset($_REQUEST['order'])) { // here order processing
                $this->db->order_by($column_order[$_REQUEST['order']['0']['column']], $_REQUEST['order']['0']['dir']);
            } else if (isset($order)) {
                $this->db->order_by(key($order), $order[key($order)]);
            }
            //Paging, checkPaging flag added for counting filtered rows without limit offset
            if (($checkPaging == TRUE) && (isset($_REQUEST['length']) && $_REQUEST['length'] != -1)) {
                $this->db->limit($_REQUEST['length'], $_REQUEST['start']);
            }//End of paging
        }//if $dataTable
        ####################################################################
        ##################### Display using Data Table Ends ################
        ####################################################################
        else {
            if ($limit) {
                $this->db->limit($limit, $offset);
            }
        }
        $query = $this->db->get('cms as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }
	
	function get_contents($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE, $filter = NULL) {
        $result = array();
        $this->db->select('t1.*,t2.user_email, t2.user_lastname, t2.user_firstname');
        $this->db->join('users as t2', 't2.id = t1.content_created_by', 'left');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
		if($limit){
           $this->db->limit($limit, $offset);
        }
        $this->db->where('t1.content_status', 'Y');

        if(isset($filter) && isset($filter['content_type'])){
            $this->db->where_in('t1.content_type', $filter['content_type']);
        }

		$this->db->order_by('t1.id', 'desc');
        $query = $this->db->get('cms as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_top_contents($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE, $filter = NULL) {
        $result = array();
        $this->db->select('t1.*,t2.user_email, t2.user_lastname, t2.user_firstname');
        $this->db->join('users as t2', 't2.id = t1.content_created_by', 'left');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
		if($limit){
           $this->db->limit($limit, $offset);
        }
        $this->db->where('t1.content_status', 'Y');

        if(isset($filter) && isset($filter['content_type'])){
            $this->db->where_in('t1.content_type', $filter['content_type']);
        }

		$this->db->order_by('t1.id', 'desc');
        $query = $this->db->get('cms as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_pagecontent_type() {
        $data = array(
            '' => 'Select',
            'news' => 'News',
            'notice' => 'Notice',
            'policy' => 'Policy - Company/HR Policies'
        );
        return $data;
    }

    function get_holiday_data_rows($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE) {
        $result = array();
        $this->db->select('t1.*');
        if ($id) {
            $this->db->where('t1.id', $id);
        }

        ####################################################################
        ##################### Display using Data Table #####################
        ####################################################################
        if ($dataTable == TRUE) {
            //set column field database for datatable orderable
            $column_order = array(
                't1.holiday_date',
                't1.holiday_description',
                NULL,
            );            
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.holiday_date',
                't1.holiday_description'
                );
             // default order
            $order = array(
                't1.holiday_date' => 'asc'
                );
            $i = 0;
            foreach ($column_search as $item) { // loop column
                if (isset($_REQUEST['search']['value'])) { // if datatable send POST for search
                    if ($i === 0) { // first loop
                        $this->db->group_start(); // open bracket. query Where with OR clause better with bracket. because maybe can combine with other WHERE with AND.
                        $this->db->like($item, $_REQUEST['search']['value']);
                    } else {
                        $this->db->or_like($item, $_REQUEST['search']['value']);
                    }
                    if (count($column_search) - 1 == $i) { //last loop
                        $this->db->group_end(); //close bracket
                    }
                }
                $i++;
            }
            if (isset($_REQUEST['order'])) { // here order processing
                $this->db->order_by($column_order[$_REQUEST['order']['0']['column']], $_REQUEST['order']['0']['dir']);
            } else if (isset($order)) {
                $this->db->order_by(key($order), $order[key($order)]);
            }
            //Paging, checkPaging flag added for counting filtered rows without limit offset
            if (($checkPaging == TRUE) && (isset($_REQUEST['length']) && $_REQUEST['length'] != -1)) {
                $this->db->limit($_REQUEST['length'], $_REQUEST['start']);
            }//End of paging
        }//if $dataTable
        ####################################################################
        ##################### Display using Data Table Ends ################
        ####################################################################
        else {
            if ($limit) {
                $this->db->limit($limit, $offset);
            }
        }
        $query = $this->db->get('holidays as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }
	
	function get_holidays($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE) {
        $result = array();
        $this->db->select('t1.*');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
		if($limit){
           $this->db->limit($limit, $offset);
        }
		$this->db->where(
			array(
			'YEAR(`holiday_date`)' => date('Y'),
			)
		);
		$this->db->order_by('t1.holiday_date', 'asc');
        $query = $this->db->get('holidays as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_uploads($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE, $cond = NULL) {
        $result = array();
        $this->db->select('t1.*');
        $this->db->join('users as t2', 't2.id = t1.upload_by_user_id', 'left');
        if($id) {
            $this->db->where('t1.id', $id);
        }
		if(isset($cond['upload_related_to'])) {
            $this->db->where('upload_related_to', $cond['upload_related_to']);
        }
        if(isset($cond['upload_related_to_id'])) {
            $this->db->where('upload_related_to_id', $cond['upload_related_to_id']);
        }
        if(isset($cond['upload_file_type_name'])) {
            $this->db->where('upload_file_type_name', $cond['upload_file_type_name']);
        }

        ####################################################################
        ##################### Display using Data Table #####################
        ####################################################################
        if ($dataTable == TRUE) {
            //set column field database for datatable orderable
            $column_order = array(
                't1.upload_file_name',
                't1.content_status',
                NULL,
            );            
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.upload_related_to',
                't1.upload_file_type_name',
                't1.upload_text_1',
                't1.upload_text_2',
                't1.upload_text_3',
                't1.upload_mime_type'
                );
             // default order
            $order = array(
                't1.id' => 'desc'
                );
            $i = 0;
            foreach ($column_search as $item) { // loop column
                if (isset($_REQUEST['search']['value'])) { // if datatable send POST for search
                    if ($i === 0) { // first loop
                        $this->db->group_start(); // open bracket. query Where with OR clause better with bracket. because maybe can combine with other WHERE with AND.
                        $this->db->like($item, $_REQUEST['search']['value']);
                    } else {
                        $this->db->or_like($item, $_REQUEST['search']['value']);
                    }
                    if (count($column_search) - 1 == $i) { //last loop
                        $this->db->group_end(); //close bracket
                    }
                }
                $i++;
            }
            if (isset($_REQUEST['order'])) { // here order processing
                $this->db->order_by($column_order[$_REQUEST['order']['0']['column']], $_REQUEST['order']['0']['dir']);
            } else if (isset($order)) {
                $this->db->order_by(key($order), $order[key($order)]);
            }
            //Paging, checkPaging flag added for counting filtered rows without limit offset
            if (($checkPaging == TRUE) && (isset($_REQUEST['length']) && $_REQUEST['length'] != -1)) {
                $this->db->limit($_REQUEST['length'], $_REQUEST['start']);
            }//End of paging
        }//if $dataTable
        ####################################################################
        ##################### Display using Data Table Ends ################
        ####################################################################
        else {
            if ($limit) {
                $this->db->limit($limit, $offset);
            }
        }
        $query = $this->db->get('uploads as t1');
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }
	
	function get_slider($id = NULL) {
        $result = array();
        $this->db->select('t1.id, t1.upload_file_name,t1.upload_text_1, t1.upload_text_2,t1.upload_text_3');
        if($id) {
            $this->db->where('t1.id', $id);
        }
		$this->db->where('t1.upload_status', 'Y');
		$this->db->where('t1.upload_related_to', 'slider');
        $query = $this->db->get('uploads as t1');
        $num_rows = $query->num_rows();
        return $result = $query->result_array();
    }

}
