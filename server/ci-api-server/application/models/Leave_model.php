<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Leave_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function insert($postdata, $table = NULL) {
        if ($table == NULL) {
            $this->db->insert('leave_applications', $postdata);
        } else {
            $this->db->insert($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }
	
	function insert_batch($postdata, $table = NULL) {
        if ($table == NULL) {
            $this->db->insert_batch('leave_applications', $postdata);
        } else {
            $this->db->insert_batch($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }

    function import_batch_leave_balance_data($postdata) {
        //print_r($postdata); die();
        $result = array('status'=>false, 'msg'=>'Importing Data at model', 'rows_afftected'=>'0', 'css'=>'alert alert-success');
        if(isset($postdata) && sizeof($postdata) >0){
            $sql_values = "";
            $sql_duplicate_update = "";
            $rows = sizeof($postdata);
            foreach($postdata as $key=>$val){
                $rows--;
                $sql_values.="('".$val['id']."', '".$val['user_id']."', '".$val['balance_date']."', '".$val['cl']."', '".$val['sl']."', '".$val['pl']."', '".$val['co']."', '".$val['created_on']."', '".$val['created_by']."')";
                if($rows !=0){
                    $sql_values.=",";
                }
            }

            $sql = "INSERT INTO `leave_balance` (`id`, `user_id`, `balance_date`, `cl`, `sl`, `pl`, `co`, `created_on`,`created_by`) VALUES";
            $sql.= $sql_values;
            $sql.= " ON DUPLICATE KEY UPDATE ";
            //$sql.= $sql_duplicate_update;
            $sql.= " `cl` = VALUES(`cl`), `sl` = VALUES(`sl`), `pl` = VALUES(`pl`), `co` = VALUES(`co`), `updated_on` = '".date('Y-m-d H:i:s')."',  `updated_by` = VALUES(`updated_by`) "; 
            $sql.=";";
            $this->db->query($sql);
            $affected_rows = $this->db->affected_rows();
            $result = array('status'=>true, 'msg'=>$affected_rows.' : Data Imported Successfully.', 'rows_afftected'=>$affected_rows,'css'=>'alert alert-success');
        }else{
            $result = array('status'=>false, 'msg'=>'There are no rows to import. Kindly download or export data template first, update leave balance & import it.', 'rows_afftected'=>'0','css'=>'alert alert-info');
        }

        return $result;
        
    }

    function update($postdata, $where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->update('leave_applications', $postdata);
        } else {
            $result = $this->db->update($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        return ($this->db->affected_rows() > 0);
    }

    function delete($where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->delete('leave_applications');
        } else {
            $result = $this->db->delete($table);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function get_rows($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE, $cond=NULL) {
        $result = array();
        //(DATEDIFF(t1.leave_to_date, t1.leave_from_date)+1) leave_days
        $this->db->select('t1.*,
        t2.user_firstname as supervisor_approver_firstname,
        t2.user_lastname as supervisor_approver_lastname,
        t2.user_emp_id as supervisor_approver_emp_id,
        t2.user_email as supervisor_email,

        t3.user_firstname as director_approver_firstname,
        t3.user_lastname as director_approver_lastname,
        t3.user_emp_id as director_approver_emp_id,
        t3.user_email as director_email,

        t4.user_firstname as hr_approver_firstname,
        t4.user_lastname as hr_approver_lastname,
        t4.user_emp_id as hr_approver_emp_id,
        t4.user_email as hr_email,

        t5.user_firstname,
        t5.user_lastname,
        t5.user_emp_id,
        t5.user_email,
        t5.user_email_secondary,
        t5.user_phone1,
        t5.user_phone2
        ');        
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        

        ####################################################################
        ##################### Display using Data Table #####################
        ####################################################################
        if ($dataTable == TRUE) {
            //set column field database for datatable orderable
            $column_order = array(
                't1.leave_from_date',
                't1.leave_to_date',
                NULL,
            );            
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.leave_from_date',
                't1.leave_to_date'
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
        $this->db->order_by('t1.id','desc');
        $this->db->join('users t2', 't2.id = t1.supervisor_approver_id', 'left');
        $this->db->join('users t3', 't3.id = t1.director_approver_id', 'left');
        $this->db->join('users t4', 't4.id = t1.hr_approver_id', 'left');
        $this->db->join('users t5', 't5.id = t1.user_id', 'left');
        if(isset($cond['applicant_user_id'])){
            $this->db->where('t1.user_id', $cond['applicant_user_id']);
        }

        if(isset($cond['assigned_to_user_id'])){
            //$this->db->where('t1.supervisor_approver_id', $cond['assigned_to_user_id']);
            //$this->db->where('t1.director_approver_id'= $cond['assigned_to_user_id']);
            $this->db->where('(t1.director_approver_id = "'.$cond['assigned_to_user_id'].'" OR t1.supervisor_approver_id = "'.$cond['assigned_to_user_id'].'")');
            
            //$this->db->where('t1.supervisor_approver_status', 'P');
            //$this->db->or_where('t1.director_approver_status', 'P');
        }

        if(isset($cond['show_supervisor_director_pending_leave']) && $cond['show_supervisor_director_pending_leave'] === true) {
            $this->db->where('((t1.supervisor_approver_id = "'.$cond['assigned_to_user_id'].'" AND t1.supervisor_approver_status = "P") OR (t1.director_approver_id = "'.$cond['assigned_to_user_id'].'" AND t1.director_approver_status = "P"))');
            $this->db->where_not_in('t1.leave_status', array('R', 'C'));
        }

        if(isset($cond['leave_status']) && !empty($cond['leave_status'])){
            $this->db->where_in('t1.leave_status', $cond['leave_status']);
        }

        if( (isset($cond['leave_from_date']) && !empty($cond['leave_from_date'])) && (isset($cond['leave_to_date']) && !empty($cond['leave_to_date'])) ){
            //$this->db->where('t1.leave_from_date >=', $this->common_lib->convert_to_mysql($cond['leave_from_date']));

             $this->db->where('((t1.leave_from_date BETWEEN "'.$this->common_lib->convert_to_mysql($cond['leave_from_date']).'" AND "'.$this->common_lib->convert_to_mysql($cond['leave_to_date']).'") OR (t1.leave_to_date BETWEEN "'.$this->common_lib->convert_to_mysql($cond['leave_from_date']).'" AND "'.$this->common_lib->convert_to_mysql($cond['leave_to_date']).'"))');
        }

        // if(isset($cond['leave_to_date']) && !empty($cond['leave_to_date'])){
        //     $this->db->where('t1.leave_to_date <=', $this->common_lib->convert_to_mysql($cond['leave_to_date']));
        // }
        $this->db->where_not_in('t5.user_status', array('N', 'A')); // dont show leave of ex, inactive usr
        $query = $this->db->get('leave_applications as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_leave_balance_master($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE) {
        $result = array();
        $this->db->select('
        t1.*,
        t2.user_firstname,
        t2.user_lastname,
        t2.user_emp_id,
        t2.user_phone1,
        t2.user_email
        ');
        $this->db->join('users as t2', 't2.id = t1.user_id', 'left');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        $this->db->where('t2.user_status !=', 'A');

        ####################################################################
        ##################### Display using Data Table #####################
        ####################################################################
        if ($dataTable == TRUE) {
            //set column field database for datatable orderable
            $column_order = array(
                't2.user_firstname',
                NULL,
                NULL,
                NULL,
                NULL,
                NULL
            );
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't2.user_firstname',
                't2.user_lastname',
                't2.user_emp_id',
                't2.user_phone1',
                't2.user_email',
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
        $query = $this->db->get('leave_balance as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }


    function check_leave_date_range($cond){
        $this->db->select('t1.id, t1.leave_req_id');
        if($cond['from_date']){
            $this->db->where('t1.leave_from_date >=', $cond['from_date']);
        }
        if($cond['to_date']){
            $this->db->where('t1.leave_to_date <=', $cond['to_date']);
        }
        if($cond['user_id']){
            $this->db->where('t1.user_id', $cond['user_id']);
        }
        if(isset($cond['leave_status'])){
            $this->db->where_in('t1.leave_status', $cond['leave_status']);
        }
        $query = $this->db->get('leave_applications as t1');
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }


    function get_leave_balance($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE, $user_id=NULL) {
        $result = array();
        $this->db->select('t1.*,
        t2.user_firstname, t2.user_lastname
        ');        
        if ($id) {
            $this->db->where('t1.id', $id);
        }        
        if ($user_id) {
            $this->db->where('t1.user_id', $user_id);
        } 

        ####################################################################
        ##################### Display using Data Table #####################
        ####################################################################
        if ($dataTable == TRUE) {
            //set column field database for datatable orderable
            $column_order = array(
                't1.leave_from_date',
                't1.leave_to_date',
                NULL,
            );            
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.leave_from_date',
                't1.leave_to_date'
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
        $this->db->join('users t2', 't2.id = t1.user_id', 'left');        
        $query = $this->db->get('leave_balance as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        return $result = $query->result_array();
        
    }

    function update_pl_balance(){
        $this->db->set('pl', 'pl+1.5', FALSE);
        $this->db->set('pl_updated_by_cron_on', date('Y-m-d H:i:s'));
        $this->db->update('leave_balance');
        //echo $this->db->last_query(); die();
        return ($this->db->affected_rows() > 0);
    }

    function update_cl_balance(){
        $this->db->set('cl', 10, FALSE);
        $this->db->set('cl_updated_by_cron_on', date('Y-m-d H:i:s'));
        $this->db->update('leave_balance');
        //echo $this->db->last_query(); die();
        return ($this->db->affected_rows() > 0);
    }

    function update_ol_balance(){
        $this->db->set('ol', 2, FALSE);
        $this->db->set('ol_updated_by_cron_on', date('Y-m-d H:i:s'));
        $this->db->update('leave_balance');
        //echo $this->db->last_query(); die();
        return ($this->db->affected_rows() > 0);
    }

    function adjust_leave_balance($postdata, $where_array){
        if(isset($postdata['credited_cl'])){
            $this->db->set('cl', 'cl+'.$postdata['credited_cl'], FALSE);
        }
        if(isset($postdata['credited_pl'])){
            $this->db->set('pl', 'pl+'.$postdata['credited_pl'], FALSE);
        }
        if(isset($postdata['credited_ol'])){
            $this->db->set('ol', 'ol+'.$postdata['credited_ol'], FALSE);
        }
        
        $this->db->where($where_array);
        $this->db->update('leave_balance');
        //echo $this->db->last_query(); die();
        return ($this->db->affected_rows() > 0);
    }

    function get_leave_bal_datatable($user_id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE) {
        $result = array();
        $this->db->select('t1.user_firstname, t1.user_lastname,t1.user_emp_id, t2.balance_date, t1.id as user_id, t2.id as bal_pk_index, t2.cl, t2.sl, t2.ol, t2.pl, t2.co, t2.created_on, t2.updated_on');
        $this->db->join('leave_balance as t2', 't2.user_id = t1.id', 'left');
        if ($user_id) {
            $this->db->where('t2.user_id', $user_id);
        }
        //$this->db->order_by('t1.user_firstname');
        $this->db->where('t1.user_status !=', 'A');
        $this->db->where('t1.user_type', 'U');
        ####################################################################
        ##################### Display using Data Table #####################
        ####################################################################
        if ($dataTable == TRUE) {
            //set column field database for datatable orderable
            $column_order = array(
                't1.user_emp_id',
                't1.user_firstname',
                't2.cl',
                't2.sl',
                't2.pl',
                't2.ol',
                't2.balance_date',
                't2.created_on',
                't2.updated_on',
                NULL,
            );            
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.user_firstname',
                't1.user_lastname',
                't1.user_emp_id'
                );
             // default order
            $order = array(
                't1.user_firstname' => 'asc'
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
        $query = $this->db->get('users as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function is_leave_balance_exists($user_id = NULL) {
        $exists = FALSE;
        $result = array();
        $this->db->select('t1.id');
        $this->db->where('t1.user_id',$user_id);
        $query = $this->db->get('leave_balance t1');
        if ($query->num_rows() >= 1) {
            //$result = $query->result_array();
            $exists = TRUE;
        }else{
            $exists = FALSE;
        }
        return $exists;
    }
}
