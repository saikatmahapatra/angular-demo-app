<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class order_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function insert($postdata, $table = NULL) {
        if ($table == NULL) {
            $this->db->insert('orders', $postdata);
        } else {
            $this->db->insert($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }
	
	function insert_batch($postdata, $table = NULL) {
        if ($table == NULL) {
            $this->db->insert_batch('orders', $postdata);
        } else {
            $this->db->insert_batch($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }
	
    function update($postdata, $where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->update('orders', $postdata);
        } else {
            $result = $this->db->update($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }
	
	function update_batch($data, $where_col = NULL, $table = NULL) {
		if($table == NULL){
			$result = $this->db->update_batch('order_details', $data, $where_col);			
		}else{
			$result = $this->db->update_batch($table, $data, $where_col);			
		}
        return $result;
    }
	
    function delete($where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->delete('orders');
        } else {
            $result = $this->db->delete($table);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function get_rows($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE) {
        $result = array();
        $this->db->select('t1.*,t2.user_firstname,t2.user_lastname,t2.user_email,t2.user_phone1');
        $this->db->join('users as t2', 't2.id = t1.order_user_id', 'left');
        if ($id) {
            $this->db->where('t1.id', $id);
        }

        ####################################################################
        ##################### Display using Data Table #####################
        ####################################################################
        if ($dataTable == TRUE) {
            //set column field database for datatable orderable
            $column_order = array(
                't1.order_no',                
                't1.order_datetime',
                't1.order_payment_method',
                't1.order_payment_status',
                't2.user_email',
                NULL,
            );            
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.order_no',
                't1.order_type',
                't1.order_datetime',
                't1.order_payment_method',
                't1.order_payment_status',
                't1.order_status',
                't1.order_payment_trans_id',
                't2.user_email',
                't2.user_lastname',
                't2.user_lastname',
                't2.user_phone1',
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
        $query = $this->db->get('orders as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }
	
	function get_order_details($order_id) {
        $this->db->select('t1.id, t1.order_id, t1.product_id, t1.order_detail_price, t1.order_detail_quantity, t1.order_detail_status, t1.order_detail_discount_coupon, t1.order_detail_discount_amt, t1.order_detail_delivery_amt, t1.order_detail_total_amt, t2.product_name, t2.product_price, t2.product_color,t2.product_size, t2.product_sku');
        $this->db->join('products as t2', 't2.id=t1.product_id', 'left');
        $this->db->where(array('t1.order_id' => $order_id));
        $query = $this->db->get('order_details as t1');
		//echo $this->db->last_query(); die();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
        return $result;
    }
	
	
}
