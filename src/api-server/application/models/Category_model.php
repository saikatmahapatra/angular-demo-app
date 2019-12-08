<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Category_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function insert($postdata, $table = NULL) {
        if ($table == NULL) {
            $this->db->insert('categories', $postdata);
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
            $result = $this->db->update('categories', $postdata);
        } else {
            $result = $this->db->update($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function delete($where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->delete('categories');
        } else {
            $result = $this->db->delete($table);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function get_rows($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE) {
        $result = array();
        $this->db->select('t1.*,t2.category_name as parent_name');
        $this->db->join('categories as t2', 't2.id = t1.category_parent', 'left');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        ####################################################################
        ##################### Display using Data Table #####################
        ####################################################################
        if ($dataTable == TRUE) {
            //set column field database for datatable orderable
            $column_order = array(
                't1.category_name',
                't2.category_name',                
                NULL,
            );
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.category_name', 
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
        $query = $this->db->get('categories as t1');
        #print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        //$this->create_tree_array($result);
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_category_dropdown() {
        $result = array();
        $this->db->select('category_name,id');
        $query = $this->db->get('categories');
        #echo $this->db->last_query();
        $result = array('' => '');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->category_name;
            }
        }
        return $result;
    }

    function category_option_group_dd($catid = NULL) {
        $sql = "select id, category_name from categories where category_parent = '" . $catid . "'";
        $query = $this->db->query($sql);
        if ($query->num_rows == 0) {
            return NULL;
        } else {
            $res = $query->result();
            foreach ($res as $row) {
                $children = $this->category_option_group_dd($row->id);
                //$categories[$row->id] = $row->category_name;
                if ($children == NULL) {
                    $categories[$row->id] = $row->category_name;
                }
                if ($children != NULL) {
                    $categories[''] = '--- Select One Category---';
                    $categories[$row->category_name] = $children;
                }
            }
            return $categories;
        }
    }

    // check at the time of edit
    function check_category_name($category_name) {
        $this->db->select('*');
        $this->db->where('category_name', $category_name);
        $this->db->where_not_in('id', $this->uri->segment('4'));
        $query = $this->db->get('categories');
        $num_row = $query->num_rows();
        if ($num_row >= 1) {
            return FALSE;
        } else
            return TRUE;
    }

    function create_tree_array($my_array) {
        echo '<pre>';
        print_r($my_array);
        $parent_child = array();
        foreach ($my_array as $key => $value) {
            if ($value['category_parent'] == 0) {
                $parent_child['root'][$value['id']] = $value['category_name'];
            } else if ($value['category_parent'] == $value['id']) {
                $parent_child['root'][$value['id']] = array();
                $parent_child['root'][$value['id']][$value['id']] = $value['category_name'];
            }
        }
        print_r($parent_child);
        die();
    }

}
