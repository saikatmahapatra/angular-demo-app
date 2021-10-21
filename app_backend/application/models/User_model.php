<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class User_model extends CI_Model {

    var $data;
    var $user_role;
    var $user_id;

    function __construct() {
        parent::__construct();
    }

    function insert($postdata, $table = NULL) {
        if ($table == NULL) {
            $this->db->insert('users', $postdata);
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
            $result = $this->db->update('users', $postdata);
        } else {
            $result = $this->db->update($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function delete($where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->delete('users');
        } else {
            $result = $this->db->delete($table);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function get_rows($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE) {
        $this->db->select('t1.*,t2.role_name, t2.role_weight,t3.department_name, t4.designation_name');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        $this->db->join('roles t2', 't1.user_role=t2.id', 'left');
        $this->db->join('departments t3', 't1.user_department=t3.id', 'left');
        $this->db->join('designations t4', 't1.user_designation=t4.id', 'left');
        ####################################################################
        ##################### Display using Data Table #####################
        ####################################################################
        if ($dataTable == TRUE) {
            //set column field database for datatable orderable
            $column_order = array(
                't1.user_firstname',
                't1.user_emp_id',
                't1.user_email',
                't1.user_status',
                NULL,
            );
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.user_firstname',
                't1.user_emp_id',
                't1.user_lastname',
                't1.user_email',
                't1.user_email_secondary',
                't1.user_phone1',
                't1.user_phone2',
                't2.role_name',
				't3.department_name',
				't4.designation_name',
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
        $query = $this->db->get('users t1');
        #echo $this->db->last_query();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function authenticate_user($user_email, $user_password) {
        $login_status = 'error';
        $message = '';
        $loggedin_data = array();
        $auth_result = array('status' => $login_status, 'message' => $message, 'data' => $loggedin_data);

        $this->db->select('
		t1.id,
		t1.user_email,
		t1.user_firstname,
		t1.user_lastname,
		t1.user_role,
		t1.user_profile_pic,
		t1.user_status,
		t2.role_name,
		t2.role_weight,
		t1.user_login_date_time,
		t1.user_emp_id
		');
		$this->db->join('roles t2', 't1.user_role=t2.id');
        $this->db->where(array(
            't1.user_email' => $user_email,
            't1.user_password' => $user_password
        ));
		/*$this->db->or_where(array(
            't1.user_emp_id' => $user_email,
            't1.user_password' => $user_password
        ));*/
        $query = $this->db->get('users as t1');
        //echo $this->db->last_query();die();
        if ($query->num_rows() > 0) {
            $result = $query->result_array();
            $row = $result[0];            
            if (isset($row) && ($row['user_status'] == 'N')) {
                $login_status = 'error';
                $message = 'Your account is not activated yet. Please activate your account to login.';
                $auth_result = array('status' => $login_status,'message' => $message, 'data' => $loggedin_data);
                return $auth_result;
            } else if (isset($row) && ($row['user_status'] == 'A')) {
                $login_status = 'error';
                $message = 'Your account has been deactivated.';
                $auth_result = array('status' => $login_status, 'message' => $message, 'data' => $loggedin_data);
                return $auth_result;
            } else {
                $login_status = 'success';
                $message = 'login_success';
                $loggedin_data = array(
                    'id' => $row['id'],
                    'user_role' => $row['user_role'],
					'user_role_name' => $row['role_name'],
                    'user_firstname' => $row['user_firstname'],
                    'user_lastname' => $row['user_lastname'],
                    'user_email' => $row['user_email'],
                    'user_profile_pic' => $row['user_profile_pic'],
					'user_emp_id' => $row['user_emp_id'],
                    'user_login_date_time' => $row['user_login_date_time'],
                );
                $auth_result = array('status' => $login_status, 'message' => $message, 'data' => $loggedin_data);
				// update login date time
				$postdata = array('user_login_date_time'=>date('Y-m-d H:i:s'));
				$where = array('id'=>$row['id']);
				$this->update($postdata, $where);
                return $auth_result;
            }
        } else {
            $login_status = 'error';
            $message = 'Login failed. Please try again.';
            $auth_result = array('status' => $login_status, 'message' => $message, 'data' => $loggedin_data);
            return $auth_result;
        }
    }

    function get_user_login_timestamp($id){
        $this->db->select('t1.user_login_date_time');
        $this->db->where(array(
            't1.id' => $id
        ));
        $query = $this->db->get('users as t1');
        $result = $query->result_array();
        return $result;
    }

    function check_is_email_registered($user_email, $db_operation_type = NULL, $user_id = NULL, $user_role = NULL) {
        $this->db->select('id');
        $this->db->where('user_email', $user_email);
        if ($db_operation_type == 'edit') {
            $this->db->where_not_in('id', $user_id);
        }
        if ($user_role) {
            $this->db->where('user_role', $user_role);
        }
        $query = $this->db->get('users');
        if ($query->num_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function check_user_activation_key($user_id, $activation_key) {
        $this->db->select('id');
        $this->db->where(array('id' => $user_id, 'user_activation_key' => $activation_key));
        $qury = $this->db->get('users');
        if ($qury->num_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function check_user_password_valid($current_password, $user_id) {
        $this->db->select('id');
        $this->db->where('id', $user_id);
        $this->db->where('user_password', $current_password);
        $query = $this->db->get('users');
        if ($query->num_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
    
    function check_user_password_reset_key($email, $key) {
        $this->db->select('id');
        $this->db->where(array('user_email' => $email, 'user_reset_password_key' => $key));
        $qury = $this->db->get('users');
        if ($qury->num_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function get_user_role($role_id) {
        $this->db->select('t1.*');
        $this->db->where(array('id' => $role_id));
        $query = $this->db->get('roles as t1');
        $result = $query->result_array();
        return $result;
    }
	
	function get_user_role_dropdown() {
        $result = array();
        $this->db->select('id,role_name,role_weight');
        $this->db->where('role_active','Y');
        $query = $this->db->get('roles');
        $result = array('' => 'Select');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->role_name;
            }
        }
        return $result;
    }
	
	function get_department_dropdown() {
        $result = array();
        $this->db->select('id,department_name');
        $this->db->where('department_status','Y');
        $this->db->order_by('department_name');
        $this->db->select('id,department_name');
        $query = $this->db->get('departments');
        $result = array('' => 'Select');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->department_name;
            }
        }
        return $result;
    }
	
	function get_designation_dropdown($status=NULL) {
        $result = array();
        $this->db->select('id,designation_name');
        if($status){
            $this->db->where('designation_status',$status);
        }        
        $this->db->order_by('designation_name');
        $query = $this->db->get('designations');
        if($status == NULL){
            $result = array('' => 'Select','-1'=>'ADD NEW');
        }else{
            $result = array('' => 'Select');
        }
        
        
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->designation_name;
            }
        }
        return $result;
    }

    function get_user_role_permission($role_id) {
        $this->db->select('t1.id,t1.permission_id,t2.role_name,t2.role_weight,t3.permission_name,t3.permission_description');
        $this->db->join('roles as t2', 't1.role_id=t2.id', 'left');
        $this->db->join('permissions as t3', 't1.permission_id=t3.id', 'left');
        $this->db->where(array('t1.role_id' => $role_id));
        $query = $this->db->get('role_permission as t1');
        //echo $this->db->last_query();
        $result = $query->result_array();
        $main_res = array();
        if (isset($result) && sizeof($result) > 0) {
            foreach ($result as $key => $value) {
                $main_res[] = $value['permission_name'];
            }
        }
        return $main_res;
    }

    function get_state_dropdown() {
        $result = array();
        $this->db->select('id,state_name');
        $this->db->where('state_status','Y');
		$this->db->order_by('state_name');
        $query = $this->db->get('states');
        $result = array('' => 'Select');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->state_name;
            }
        }
        return $result;
    }

    function get_user_address($id = NULL, $user_id, $address_type) {
        $this->db->select('t1.*,t2.state_name');    
        if(isset($id)){
            $this->db->where(array('t1.id' => $id));
        }  
        if(isset($user_id)){
            $this->db->where(array('t1.user_id' => $user_id));
        } 
        if(isset($address_type)){
            $this->db->where(array('t1.address_type' => $address_type));
        }  
        $this->db->join('states as t2', 't1.state=t2.id', 'left');  
        $query = $this->db->get('user_addresses as t1');
        //echo $this->db->last_query();
        $result = $query->result_array();        
        return $result;
    }
	
	function get_qualification_dropdown() {
        $result = array();
        $this->db->select('id,qualification_name');
        $this->db->where('qualification_status','Y');
		$this->db->order_by('qualification_name');
        $query = $this->db->get('academic_qualification'); 
        $result = array('' => 'Select');       
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->qualification_name;
            }
        }
        return $result;
    }

    function get_degree_dropdown() {
        $result = array();
        $this->db->select('id,degree_name');
        $this->db->where('degree_status','Y');
		$this->db->order_by('degree_name');
        $query = $this->db->get('academic_degree');
        $result = array('' => 'Select','-1'=>'ADD NEW');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->degree_name;
            }
        }
        return $result;
    }
	
	function get_specialization_dropdown() {
        $result = array();
        $this->db->select('id,specialization_name');
        $this->db->where('specialization_status','Y');
		$this->db->order_by('specialization_name');
        $query = $this->db->get('academic_specialization');
        $result = array('' => 'Select','-1'=>'ADD NEW');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->specialization_name;
            }
        }
        return $result;
    }
	
	function get_institute_dropdown() {
        $result = array();
        $this->db->select('id,institute_name');
        $this->db->where('institute_status','Y');
        $this->db->order_by('institute_name');
        $query = $this->db->get('academic_institute');
        $result = array('' => 'Select','-1'=>'ADD NEW');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->institute_name;
            }
        }
        return $result;
    }
	
	function get_user_education($id = NULL, $user_id) {
        $this->db->select('t1.*,t2.qualification_name,t3.specialization_name,t4.institute_name, t5.degree_name');    
        if(isset($id)){
            $this->db->where(array('t1.id' => $id));
        }  
        if(isset($user_id)){
            $this->db->where(array('t1.user_id' => $user_id));
        }
		$this->db->join('academic_qualification t2', 't1.academic_qualification=t2.id', 'left');
		$this->db->join('academic_specialization t3', 't1.academic_specialization=t3.id', 'left');
		$this->db->join('academic_institute t4', 't1.academic_institute=t4.id', 'left');	
		$this->db->join('academic_degree t5', 't1.academic_degree=t5.id', 'left');	
		$this->db->order_by('t1.academic_qualification','desc');
        $query = $this->db->get('user_academics as t1');
        //echo $this->db->last_query();
        $result = $query->result_array();        
        return $result;
    }
	
	function get_users($id = NULL, $limit = NULL, $offset = NULL, $search_keywords=NULL) {
        $this->db->select('t1.*,t2.role_name, t2.role_weight,t3.department_name, t4.designation_name');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if($search_keywords){
            $this->db->like('t1.user_firstname', $search_keywords);
            $this->db->or_like('t1.user_lastname', $search_keywords);
            $this->db->or_like('t1.user_emp_id', $search_keywords);
            $this->db->or_like('t1.user_email', $search_keywords);
            $this->db->or_like('t1.user_email_secondary', $search_keywords);
            $this->db->or_like('t1.user_phone1', $search_keywords);
            $this->db->or_like('t1.user_phone2', $search_keywords);
            $this->db->or_like('t4.designation_name', $search_keywords);
        }		
        $this->db->join('roles t2', 't1.user_role=t2.id', 'left');
		$this->db->join('departments t3', 't1.user_department=t3.id', 'left');
        $this->db->join('designations t4', 't1.user_designation=t4.id', 'left');
        if ($limit) {
            $this->db->limit($limit, $offset);
        }
		$this->db->order_by('t1.user_firstname');
        $query = $this->db->get('users t1');
        //echo $this->db->last_query();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }
	
	function get_user_profile_pic($id = NULL) {
        $this->db->select('t1.user_profile_pic');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        $query = $this->db->get('users t1');
        //echo $this->db->last_query();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return $result;
    }
	
	function get_new_customer_id() {
        $this->db->select('max(user_emp_id)+1 as new_emp_id');        
        $query = $this->db->get('users as t1');
        $result = $query->result_array();
		if($result){
			return str_pad($result[0]['new_emp_id'], 4, '0', STR_PAD_LEFT);		
		}else{
			return 0;
		}        
    }

    function check_address_type_exists($user_id, $address_type) {
        $this->db->select('id');
        $this->db->where(array('user_id' => $user_id, 'address_type' => $address_type));
        $qury = $this->db->get('user_addresses');
        if ($qury->num_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
	
	function get_user_approvers($user_id = NULL) {
        $this->db->select('
        t1.*, 
        t2.user_firstname as supervisor_firstname,
        t2.user_lastname as supervisor_lastname,
        t2.user_emp_id as supervisor_emp_id,
        t2.user_email as supervisor_email,

        t3.user_firstname as hr_firstname,
        t3.user_lastname as hr_lastname,
        t3.user_emp_id as hr_emp_id,
        t3.user_email as hr_email,

        t4.user_firstname as director_firstname,
        t4.user_lastname as director_lastname,
        t4.user_emp_id as director_emp_id,
        t4.user_email as director_email,

        t5.user_firstname as finance_firstname,
        t5.user_lastname as finance_lastname,
        t5.user_emp_id as finance_emp_id,
        t5.user_email as finance_email
        ');
        if ($user_id) {
            $this->db->where('t1.user_id', $user_id);
        }        	
        $this->db->join('users t2', 't1.user_supervisor_id = t2.id' , 'left');       
        $this->db->join('users t3', 't1.user_hr_approver_id = t3.id', 'left');       
        $this->db->join('users t4', 't1.user_director_approver_id = t4.id', 'left');       
        $this->db->join('users t5', 't1.user_finance_approver_id = t5.id', 'left');       
        //$this->db->join('users t6', 't1.user_finance_approver_id = t5.id', 'left');       
        $query = $this->db->get('user_approvers t1');
        //echo $this->db->last_query();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return $result;
    }

    function has_user_approvers($user_id = NULL) {
        $this->db->select('t1.id');
        if ($user_id) {
            $this->db->where('t1.user_id', $user_id);
        }     
        $query = $this->db->get('user_approvers t1');
        //echo $this->db->last_query();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return $result;
    }

}

?>