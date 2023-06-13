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

    function import_batch($postData) {
        $this->db->update_batch('user_meta', $postData, 'user_id');
        return $this->db->affected_rows();
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

    function get_rows($id = NULL, $perPage = NULL, $offset = NULL, $paginate = TRUE, $cond) {
        $result = array();
        //(DATEDIFF(t1.leave_to_date, t1.leave_from_date)+1) leave_days
        $this->db->select('t1.*,
        t2.user_full_name as supervisor_approver_name,
        t2.user_email as supervisor_email,

        t3.user_full_name as director_approver_name,
        t3.user_email as director_email,

        t4.user_full_name as hr_approver_name,
        t4.user_email as hr_email,

        t5.user_full_name,
        t5.user_uid,
        t5.user_email,
        t8.user_email2,
        t5.user_phone,
        t8.user_phone2,
        t6.meta_value as leave_reason_text
        ');        
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if ($paginate == true && $perPage != 0) {
            $this->db->limit($perPage, $offset);
        }
        $this->db->order_by('t1.id','desc');
        $this->db->join('users t2', 't2.id = t1.supervisor_approver_id', 'left');
        $this->db->join('users t3', 't3.id = t1.director_approver_id', 'left');
        $this->db->join('users t4', 't4.id = t1.hr_approver_id', 'left');
        $this->db->join('users t5', 't5.id = t1.user_id', 'left');
        $this->db->join('user_meta t8', 't8.user_id = t5.id', 'left');
        $this->db->join('site_meta t6', 't6.id = t1.leave_reason_id', 'left');
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
            if($cond['leave_status'] == 'X') {
                $this->db->where('t1.cancel_requested', 'Y');
                $this->db->where_not_in('t1.leave_status', array('C'));
            } else if($cond['leave_status'] == 'PR') { 
                $this->db->where('((t1.supervisor_approver_id = "'.$cond['assigned_to_user_id'].'" AND t1.supervisor_approver_status = "P") OR (t1.director_approver_id = "'.$cond['assigned_to_user_id'].'" AND t1.director_approver_status = "P"))');
                $this->db->where_not_in('t1.leave_status', array('R', 'C'));
            }
            else {
                $this->db->where('t1.leave_status', $cond['leave_status']);
            } 
        }

        if(isset($cond['empInfo']) && $cond['empInfo'] !== ''){
            $this->db->where("(`t5`.`user_full_name` LIKE '%".$cond['empInfo']."%' OR `t5`.`user_email` LIKE '%".$cond['empInfo']."%')");
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
        //print_r($this->db->last_query()); die();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function check_leave_date_range($cond) {
        $this->db->select('t1.id, t1.leave_req_id');
        $this->db->where("
        ((`t1`.`leave_from_date` >= '".$cond['from_date']."' OR `t1`.`leave_to_date` >= '".$cond['from_date']."') AND (`t1`.`leave_from_date` <= '".$cond['to_date']."' OR `t1`.`leave_to_date` <= '".$cond['to_date']."'))
        ");


        if($cond['user_id']){
            $this->db->where('t1.user_id', $cond['user_id']);
        }
        if(isset($cond['leave_status'])){
            $this->db->where_not_in('t1.leave_status', $cond['leave_status']);
        }
        $query = $this->db->get('leave_applications as t1');
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        //print_r($this->db->last_query());
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function update_pl_balance() {
        $this->db->set('pl', 'pl+1.5', FALSE);
        $this->db->set('pl_updated_by_cron_on', date('Y-m-d H:i:s'));
        //$this->db->join('users t2', 't2.id =  t1.user_id', 'right');
        //$this->db->where('t2.user_status', 'Y');
        $this->db->update('user_meta t1');
        //echo $this->db->last_query(); die();
        return ($this->db->affected_rows() > 0);
    }

    function update_cl_balance(){
        $this->db->set('cl', 10, FALSE);
        $this->db->set('cl_updated_by_cron_on', date('Y-m-d H:i:s'));
        $this->db->update('user_meta');
        //echo $this->db->last_query(); die();
        return ($this->db->affected_rows() > 0);
    }

    function update_ol_balance(){
        $this->db->set('ol', 2, FALSE);
        $this->db->set('ol_updated_by_cron_on', date('Y-m-d H:i:s'));
        $this->db->update('user_meta');
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

        if(isset($postdata['credited_co'])){
            $this->db->set('co', 'co+'.$postdata['credited_co'], FALSE);
        }
        
        $this->db->where($where_array);
        $this->db->update('user_meta');
        //echo $this->db->last_query(); die();
        return ($this->db->affected_rows() > 0);
    }

    function get_leave_balance($user_id = NULL, $paginate = FALSE, $perPage = NULL, $offset = NULL, $isActive = NULL) {
        $result = array();
        $this->db->select('
        t1.user_full_name,
        t2.user_id, 
        t2.id, 
        t2.cl, 
        t2.sl, 
        t2.ol, 
        t2.pl, 
        t2.co, 
        t2.leave_balance_updated_on,
        t2.leave_balance_updated_by,
        t2.ol_updated_by_cron_on,
        t2.cl_updated_by_cron_on,
        t2.pl_updated_by_cron_on,
        t2.leave_balance_bulk_updated_on,
        t2.leave_balance_bulk_updated_by
        ');
        if ($user_id) {
            $this->db->where('t2.user_id', $user_id);
        }
        if($isActive == true) {
            $this->db->where('t1.user_status', 'Y');
        }
        //$this->db->where('t1.user_status', 'Y');
        $this->db->where('t1.user_type', 'U');
        //for server side pagination
        if ($paginate == true && $perPage != 0) {
            $this->db->limit($perPage, $offset);
        }
        $this->db->join('user_meta as t2', 't2.user_id = t1.id', 'left'); // balance
        $this->db->order_by('t1.id', 'desc');
        $query = $this->db->get('users as t1'); // main user tbl
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function is_leave_balance_exists($user_id = NULL) {
        $exists = FALSE;
        $result = array();
        $this->db->select('t1.id');
        $this->db->where('t1.user_id',$user_id);
        $query = $this->db->get('user_meta t1');
        if ($query->num_rows() >= 1) {
            //$result = $query->result_array();
            $exists = TRUE;
        }else{
            $exists = FALSE;
        }
        return $exists;
    }
}
