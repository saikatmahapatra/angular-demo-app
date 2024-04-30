<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Cms_model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
    }

    function insert($postdata, $table = NULL)
    {
        if ($table == NULL) {
            $this->db->insert('contents', $postdata);
        } else {
            $this->db->insert($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }

    function update($postdata, $where_array = NULL, $table = NULL)
    {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->update('contents', $postdata);
        } else {
            $result = $this->db->update($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function delete($where_array = NULL, $table = NULL)
    {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->delete('contents');
        } else {
            $result = $this->db->delete($table);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function get_contents($id = NULL, $paginate = false, $perPage = NULL, $offset = NULL, $searchKeywords = NULL, $checkStatus = false, $postType=NULL)
    {
        $result = array();
        $this->db->select('t1.*,t2.user_email, t2.user_full_name');
        $this->db->join('users as t2', 't2.id = t1.content_created_by', 'left');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if($postType) {
            $this->db->where('t1.content_type', $postType);
        }
        if ($checkStatus) {
            $this->db->where('t1.content_status', 'Y');
        }

        if (isset($searchKeywords)) {
            //$this->db->like('t1.content_text', $filter['keywords']);
            $this->db->like('t1.content_title', $searchKeywords);
        }

        $this->db->order_by('t1.id', 'desc');
        //for server side pagination
        if ($paginate == true && $perPage != 0) {
            $this->db->limit($perPage, $offset);
        }
        $query = $this->db->get('contents as t1');
        //print_r($this->db->last_query()); die();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_holidays($id = NULL, $limit = NULL, $offset = NULL, $year = NULL)
    {
        $result = array();
        $this->db->select('t1.*');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if ($limit) {
            $this->db->limit($limit, $offset);
        }
        $this->db->where(
            array(
                'YEAR(`holiday_date`)' => date($year),
            )
        );
        $this->db->order_by('t1.holiday_date', 'asc');
        $query = $this->db->get('holidays as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_metaType_dropdown() {
        $result = [];
        $this->db->select('distinct(t1.meta_type) as meta_type');
        $query = $this->db->get('site_meta as t1');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $a['id'] = $r->meta_type;
                $a['name'] = $r->meta_type;
                array_push($result, $a);
            }
        }
        return $result;
    }

    function get_sitemeta($id = NULL, $limit = NULL, $offset = NULL, $metaType = NULL)
    {
        $result = array();
        $this->db->select('t1.*');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if($metaType) {
            $this->db->where('t1.meta_type', $metaType);
        }
        if ($limit) {
            $this->db->limit($limit, $offset);
        }
        $this->db->order_by('t1.meta_created_on');
        $query = $this->db->get('site_meta as t1');
        //print_r($this->db->last_query()); die();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function metaExists($type, $val, $id=null) {
        $this->db->select('t1.id');
        $this->db->where('t1.meta_type', $type);
        $this->db->where('t1.meta_value', $val);
        if($id) {
            $this->db->where('t1.id !=', $id);
        }
        $query = $this->db->get('site_meta t1');
        //print_r($this->db->last_query());die();
        $num_rows = $query->num_rows();
        if($num_rows > 0 ) {
            return true;
        } else {
            return false;
        }
    }

    function get_uploads($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE, $cond = NULL)
    {
        $result = array();
        $this->db->select('t1.*');
        $this->db->join('users as t2', 't2.id = t1.upload_by_user_id', 'left');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if (isset($cond['upload_related_to'])) {
            $this->db->where('upload_related_to', $cond['upload_related_to']);
        }
        if (isset($cond['upload_related_to_id'])) {
            $this->db->where('upload_related_to_id', $cond['upload_related_to_id']);
        }
        if (isset($cond['upload_file_type_name'])) {
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
            } //End of paging
        } //if $dataTable
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


    function markAsRead($data) {
        $this->db->select('t1.id');
        $this->db->where('t1.post_id', $data['id']);
        $this->db->where('t1.post_type', $data['postType']);
        $this->db->where('t1.seen_by_user_id', $data['userId']);
        $query = $this->db->get('seen_by t1');
        //print_r($this->db->last_query());die();
        $num_rows = $query->num_rows();
        if($num_rows == 0 ) {
            $data = array(
                'post_id' => $data['id'],
                'post_type' => $data['postType'],
                'seen_by_user_id' => $data['userId']
            );
            $this->db->insert('seen_by', $data);
        } else {
            // update

        }
        return true;
    }

    function holidayExists($date, $id=NULL) {
        $this->db->select('t1.id');
        $this->db->where('t1.holiday_date', $date);
        if($id) {
            $this->db->where('t1.id !=', $id);
        }
        $query = $this->db->get('holidays t1');
        //print_r($this->db->last_query());die();
        $num_rows = $query->num_rows();
        if($num_rows > 0 ) {
            return true;
        } else {
            return false;
        }
    }

    function getEmailList() {
        $this->db->select('t1.user_email');
        $this->db->where('t1.user_status', 'Y');
        $this->db->where('t1.user_type', 'U');
        $this->db->limit(200, 0);
        $query = $this->db->get('users t1');
        //print_r($this->db->last_query());die();
        return $result = $query->result_array();
    }
}
