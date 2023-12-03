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

    function get_rows($id = NULL, $pagination = false, $limit = NULL, $offset = NULL, $isAdmin = FALSE, $checkPaging = TRUE, $userType = NULL, $show_archived = FALSE, $keywords = null) {
        if ($isAdmin == TRUE){
            $this->db->select('
            t1.id,
            t1.user_email,
            t1.user_phone,
            t1.user_full_name,
            t8.user_gender,
            t1.user_role,
            t1.user_type,
            t1.user_created_on,
            t1.user_status,
            t1.user_status_updated_on,
            t1.user_status_updated_by,
            t1.user_login_date_time,
            t8.user_email2,
            t8.user_department,
            t8.user_designation,
            t8.user_dob,
            t8.user_blood_group,
            t8.user_doj,
            t8.user_employment_type,
            t8.user_dor,
            t1.user_uid,
            t8.user_phone2,
            t8.user_pan_no,
            t8.user_uan_no,
            t2.role_name, 
            t3.meta_value as department_name, 
            t4.meta_value as designation_name, 
            t5.meta_value as employment_type_name, 
            t8.user_work_base_location_id,
            t6.meta_value as base_work_location_name,
            t8.user_workspace_solution_type,
            t7.meta_value as workspace_type_name,
            ');
            
        }else{
            $this->db->select('
            t1.id,
            t1.user_email,
            t1.user_full_name,
            t8.user_gender,
            t1.user_role,
            t1.user_type,
            t1.user_created_on,
            t1.user_status_updated_on,
            t1.user_status,
            t8.user_email2,
            t8.user_dob,
            t8.user_blood_group,
            t8.user_doj,
            t1.user_uid,
            t1.user_phone,
            t8.user_phone2,
            t4.meta_value as designation_name,
            t5.meta_value as employment_type_name,
            t1.user_status, 
            t3.meta_value as department_name,
            t2.role_name,
            t1.user_created_on,
            t1.user_login_date_time,
            t8.user_work_base_location_id,
            t6.meta_value as base_work_location_name,
            t8.user_workspace_solution_type,
            t7.meta_value as workspace_type_name'
        );
        }
        if($show_archived == FALSE) {
            $this->db->where('t1.user_status', 'Y');
        }

        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if ($userType) {
            $this->db->where('t1.user_type', $userType);
        }
        if(isset($keywords)){
            $this->db->where("(
                `t1`.`user_full_name` LIKE '%".$keywords."%' OR  
                `t1`.`user_email` LIKE '%".$keywords."%' OR 
                `t3`.`meta_value` LIKE '%".$keywords."%' OR 
                `t4`.`meta_value` LIKE '%".$keywords."%' 
                )");
        }
        $this->db->join('user_meta t8', 't1.id = t8.user_id', 'left');
        $this->db->join('srbac_roles t2', 't1.user_role=t2.id', 'left');
        $this->db->join('site_meta t3', 't8.user_department=t3.id', 'left');
        $this->db->join('site_meta t4', 't8.user_designation=t4.id', 'left');
        $this->db->join('site_meta t5', 't8.user_employment_type=t5.id', 'left');
        $this->db->join('site_meta t6', 't8.user_work_base_location_id = t6.id', 'left');
        $this->db->join('site_meta t7', 't8.user_workspace_solution_type = t7.id', 'left');
        if ($pagination == true && $limit) {
            $this->db->limit($limit, $offset);
        }
        $this->db->order_by('t1.id', 'desc');
        $query = $this->db->get('users t1');
        //echo $this->db->last_query();
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
        t1.user_full_name,
        t1.user_role,
        t1.user_status,
        t1.user_status,
        t2.role_name,
        t1.user_login_date_time
        ');
		$this->db->join('srbac_roles t2', 't1.user_role=t2.id');
        $this->db->where(array(
            't1.user_email' => $user_email,
            't1.user_password' => $user_password
        ));
        $query = $this->db->get('users as t1');
        if ($query->num_rows() > 0) {
            $result = $query->result_array();
            $row = $result[0];            
            if (isset($row) && ($row['user_status'] == 'N')) {
                $login_status = 'error';
                $message = 'Your account has been deactivated. Please contact to administrator.';
                $auth_result = array('status' => $login_status,'message' => $message, 'data' => $loggedin_data);
                return $auth_result;
            } else if (isset($row) && ($row['user_status'] == 'A')) {
                $login_status = 'error';
                $message = 'Your account has been deactivated permanently.' ;
                $auth_result = array('status' => $login_status, 'message' => $message, 'data' => $loggedin_data);
                return $auth_result;
            } else {
                $login_status = 'success';
                $message = 'login_success';
                $loggedin_data = array(
                    'id' => $row['id'],
                    'user_role' => $row['user_role'],
					'user_role_name' => $row['role_name'],
                    'user_full_name' => $row['user_full_name'],
                    'user_email' => $row['user_email'],
                    'user_login_date_time' => $row['user_login_date_time']
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
            $message = 'Incorrect username or password. Please try again.';
            $auth_result = array('status' => $login_status, 'message' => $message, 'data' => $loggedin_data);
            return $auth_result;
        }
    }

    function check_is_email_registered($user_email) {
        $this->db->select('id');
        $this->db->where('user_email', $user_email);
        $query = $this->db->get('users');
        if ($query->num_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }

    function check_user_password_valid($current_password, $user_id) {
        $this->db->select('id');
        $this->db->where('id', $user_id);
        $this->db->where('user_password', $current_password);
        $query = $this->db->get('users');
        if ($query->num_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }
    
    function check_user_password_reset_key($email, $key) {
        $this->db->select('id');
        $this->db->where(array('user_email' => $email, 'user_reset_password_key' => $key));
        $qury = $this->db->get('users');
        if ($qury->num_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }

    function get_user_permission($role_id) {
        $this->db->select('t1.id, t1.role_code, t1.role_permissions');
        $this->db->where(array('t1.id' => $role_id));
        $query = $this->db->get('srbac_roles as t1');
        $result = $query->result_array();
        $main_res = array();
        if (isset($result) && sizeof($result) > 0 &&  strlen($result[0]['role_permissions']) > 0) {
            $main_res = explode(',', $result[0]['role_permissions']);
        }
        return $main_res;
    }

    function get_user_address($id = NULL, $user_id, $address_type) {
        $this->db->select('t1.*,t2.meta_value as state_name, city.meta_value as city_name');    
        if(isset($id)){
            $this->db->where(array('t1.id' => $id));
        }  
        if(isset($user_id)){
            $this->db->where(array('t1.user_id' => $user_id));
        } 
        if(isset($address_type)){
            $this->db->where(array('t1.address_type' => $address_type));
        }  
        $this->db->join('site_meta as t2', 't1.state = t2.id', 'left');
        $this->db->join('site_meta as city', 't1.city = city.id', 'left');   
        $query = $this->db->get('user_addresses as t1');
        //echo $this->db->last_query();
        $result = $query->result_array();        
        return $result;
    }
	
	function get_user_education($id = NULL, $user_id) {
        $this->db->select('
        t1.*,
        t3.meta_value as specialization_name, 
        t4.meta_value as institute_name, 
        t5.meta_value as degree_name');    
        if(isset($id)){
            $this->db->where(array('t1.id' => $id));
        }  
        if(isset($user_id)){
            $this->db->where(array('t1.user_id' => $user_id));
        }
		//$this->db->join('site_meta t2', 't1.academic_qualification=t2.id', 'left');
		$this->db->join('site_meta t3', 't1.academic_specialization=t3.id', 'left');
		$this->db->join('site_meta t4', 't1.academic_institute=t4.id', 'left');	
		$this->db->join('site_meta t5', 't1.academic_degree=t5.id', 'left');	
		$this->db->order_by('t1.academic_to_year','desc');
        $query = $this->db->get('user_academics as t1');
        //echo $this->db->last_query();
        $result = $query->result_array();        
        return $result;
    }
	
	function get_uploads($upload_related_to = NULL, $upload_related_to_id = NULL, $id = NULL, $upload_file_document_type_name = NULL) {
        $this->db->select('t1.*');
        if ($id) {
            $this->db->where('id', $id);
        }
        if ($upload_related_to) {
            $this->db->where('upload_related_to', $upload_related_to);
        }

        if ($upload_related_to_id) {
            $this->db->where('upload_related_to_id', $upload_related_to_id);
        }
        if ($upload_file_document_type_name) {
            $this->db->where('upload_file_type_name', $upload_file_document_type_name);
        }
        $query = $this->db->get('uploads t1');
        $result = $query->result_array();
        return $result;
    }
    
	function get_new_emp_id() {
        $this->db->select('max(user_uid)+1 as new_emp_id');        
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
            return true;
        } else {
            return false;
        }
    }

    function get_user_work_experience($id = NULL, $user_id) {
        $this->db->select('t1.*, t2.meta_value as company_name,t3.meta_value as designation_name, t4.meta_value as job_location_name');    
        if(isset($id)){
            $this->db->where(array('t1.id' => $id));
        }  
        if(isset($user_id)){
            $this->db->where(array('t1.user_id' => $user_id));
        }
		$this->db->join('site_meta t2', 't1.company_id=t2.id', 'left');
		$this->db->join('site_meta t3', 't1.designation_id=t3.id', 'left');
        $this->db->join('site_meta t4', 't1.job_location_id=t4.id', 'left');
		$this->db->order_by('t1.to_date','desc');
        $query = $this->db->get('user_work_exp as t1');
        //echo $this->db->last_query();
        $result = $query->result_array();        
        return $result;
    }

    function get_user_bank_account_details($id = NULL, $user_id) {
        $this->db->select('t1.*, t2.meta_value as bank_name');    
        if(isset($id)){
            $this->db->where(array('t1.id' => $id));
        }  
        if(isset($user_id)){
            $this->db->where(array('t1.user_id' => $user_id));
        }
		$this->db->join('site_meta t2', 't1.bank_id=t2.id', 'left');
        $query = $this->db->get('user_bank_account as t1');
        //echo $this->db->last_query();
        $result = $query->result_array();        
        return $result;
    }

    function check_is_account_exists($user_id, $ac_no, $account_id) {
        $this->db->select('id');
        if(isset($id)){
            $this->db->where_not_in('id', $id);
        }
        $this->db->where(array('user_id' => $user_id, 'bank_account_no' => $ac_no));
        $qury = $this->db->get('user_bank_account');
        //echo $this->db->last_query(); die();
        if ($qury->num_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }

    function get_user_national_identifiers($user_id) {
        $this->db->select('t1.user_pan_no, t1.user_uan_no');             
        if(isset($user_id)){
            $this->db->where(array('t1.user_id' => $user_id));
        }		
        $query = $this->db->get('user_meta as t1');
        //echo $this->db->last_query();
        $result = $query->result_array();        
        return $result;
    }

    function get_user_dropdown() {
        $result = [];
        $this->db->select('id, user_full_name, user_email');		
        $this->db->where('user_status !=','A');
        $this->db->where('user_type','U');
        $this->db->order_by('user_full_name');		
        $query = $this->db->get('users');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $a['id'] = $r->id;
                $email = explode('@', $r->user_email);
                $a['name'] = $r->user_full_name.' ('.$email[0].')';
                array_push($result, $a);
            }
        }
        return $result;
    }

    function find_birthday(){
        $day = date('d');
        $month = date('m');
        $result = array();
        $this->db->select('
        t1.user_full_name,
        t1.user_email,
        t2.user_email2
		');
        
        $this->db->join('user_meta t2', 't1.id = t2.user_id', 'left');
        $this->db->where(
			array(
			'DAY(`user_dob`)' => $day,
            'MONTH(`user_dob`)' => $month
			)
        );
        $this->db->where('t1.user_status', 'Y');
       
        $query = $this->db->get('users as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_user_approvers($user_id = NULL) {
        $this->db->select('
        t1.id,
        t1.user_supervisor_id,
        t1.user_hr_approver_id,
        t1.user_director_approver_id,
        t1.user_finance_approver_id,
        t1.user_approver_updated_on,
        t1.user_approver_updated_by, 
        t2.user_full_name as supervisor_name,
        t2.user_email as supervisor_email,

        t3.user_full_name as hr_name,
        t3.user_email as hr_email,

        t4.user_full_name as director_name,
        t4.user_email as director_email,

        t5.user_full_name as finance_name,
        t5.user_email as finance_email
        ');
        if ($user_id) {
            $this->db->where('t1.user_id', $user_id);
        }        	
        $this->db->join('users t2', 't1.user_supervisor_id = t2.id' , 'left');       
        $this->db->join('users t3', 't1.user_hr_approver_id = t3.id', 'left');       
        $this->db->join('users t4', 't1.user_director_approver_id = t4.id', 'left');       
        $this->db->join('users t5', 't1.user_finance_approver_id = t5.id', 'left');       
        $query = $this->db->get('user_meta t1');
        $result = $query->result_array();
        return $result;
    }

    function get_user_emergency_contacts($id = NULL, $user_id) {
        $this->db->select('t1.*,t2.meta_value as relationship');    
        if(isset($id)){
            $this->db->where(array('t1.id' => $id));
        }  
        if(isset($user_id)){
            $this->db->where(array('t1.user_id' => $user_id));
        }  
        $this->db->join('site_meta as t2', 't1.relationship_with_contact=t2.id', 'left');  
        $query = $this->db->get('user_emergency_contacts as t1');
        //echo $this->db->last_query();
        $result = $query->result_array();        
        return $result;
    }

    function get_user_emergency_contacts_count($user_id, $max_allowed_limit = NULL){
        $this->db->select('count(*) as count');
        if ($user_id) {
            $this->db->where('user_id', $user_id);
        }     
        $query = $this->db->get('user_emergency_contacts');
        //echo $this->db->last_query();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        //print_r($result[0]['count']);
        if($max_allowed_limit != NULL){
            return ($result[0]['count'] >= $max_allowed_limit) ? false : true;
        }
        return $result; 
    }

    function get_employee_anniversary(){
        $day = date('d');
        $month = date('m');

        $result = array();
        $this->db->select('
        t1.user_full_name,
        t1.user_email,
        t2.user_email2,
        t2.user_doj
		');
        $this->db->where(
			array(
			'DAY(`user_doj`)' => $day,
            'MONTH(`user_doj`)' => $month
			)
        );
        $this->db->join('user_meta t2', 't1.id = t2.user_id', 'left');
        $this->db->where('user_status', 'Y');
        $query = $this->db->get('users as t1');
        //print_r($this->db->last_query()); die();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        $anniversary_years = '';
        if(isset($result[0]['user_doj'])){
            $date1 = $result[0]['user_doj'];
            $date2 = date('Y-m-d');
            $diff = abs(strtotime($date2) - strtotime($date1));
            $anniversary_years = floor($diff / (365*60*60*24));
        }

        return array('num_rows' => $num_rows, 'data_rows' => $result, 'anniversary' => $anniversary_years);
    }

    function search_users($keywords, $paginate = FALSE, $perPage = NULL, $offset = NULL) {
        $this->db->select('
        t1.id,
        t1.user_full_name,
        t1.user_email,
        t2.meta_value as designation_name
        ');

        $this->db->where('t1.user_type','U');
        $this->db->where('t1.user_status', 'Y');

        $this->db->where("(
            `t1`.`user_full_name` LIKE '%".$keywords."%' OR `t1`.`user_email` LIKE '%".$keywords."%' OR  `t2`.`meta_value` LIKE '%".$keywords."%' 
            )");

        $this->db->join('user_meta t8', 't8.user_id=t1.id', 'left');
        $this->db->join('site_meta t2', 't8.user_designation=t2.id', 'left');
        //for server side pagination
        if ($paginate == true && $perPage != 0) {
            $this->db->limit($perPage, $offset);
        }
        $query = $this->db->get('users t1');
        //print_r($this->db->last_query()); die();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_reportee_employee($reporting_to_user_id, $search_string = NULL, $limit = NULL, $offset = NULL) {
        $this->db->select('
        t1.user_id,
        t2.user_full_name,
        t2.user_uid,
        t3.meta_value as designation_name,
        t2.user_email,
        t2.user_phone
        ');
        
        $this->db->where('(t1.user_supervisor_id = "'.$reporting_to_user_id.'"  OR t1.user_director_approver_id = "'.$reporting_to_user_id.'" OR t1.user_hr_approver_id = "'.$reporting_to_user_id.'")');

        $this->db->where('t2.user_type','U');
        $this->db->where('t2.user_status','Y');
        $this->db->join('users t2', 't1.user_id = t2.id', 'left');
        $this->db->join('user_meta t8', 't8.user_id=t2.id', 'left');
        $this->db->join('site_meta t3', 't8.user_designation=t3.id', 'left');
        if ($limit) {
            $this->db->limit($limit, $offset);
        }
        $this->db->order_by('t1.user_id', 'desc');
        $query = $this->db->get('user_meta t1');
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function check_is_phone_number_exists($phone, $id = NUll) {
        $this->db->select('id');
        $this->db->where(array('contact_person_phone1' => $phone));
        if(isset($id)) {
            $this->db->where('id != ', $id);
        }
        
        $qury = $this->db->get('user_emergency_contacts');
        //print_r($this->db->last_query()); die();
        return $qury->num_rows() > 0 ? true : false;
    }

    function getUserDataChart($userId, $duration=NULL, $fromDate=NULL, $toDate=NULL, $groupBy='task') {
        $result = array();
        if($groupBy == 'task') {
            $this->db->select('SUM(t1.timesheet_hours) as sum_hours, t1.timesheet_created_by, t1.task_id, t2.task_name');
            $this->db->join('project_tasks as t2', 't2.id = t1.task_id', 'left');
        }
        if($groupBy == 'project') {
            $this->db->select('SUM(t1.timesheet_hours) as sum_hours, t1.timesheet_created_by, t1.project_id, t2.project_name');
        $this->db->join('projects as t2', 't2.id = t1.project_id', 'left');
        }
        
		$this->db->where('t1.timesheet_created_by', $userId);

        if($duration == 'today') {
            $this->db->where('timesheet_date = "'.date('Y-m-d').'" ');
        }
        
        if($duration == 'last2weeks') {
            $this->db->where('timesheet_date >= (NOW() - INTERVAL 2 WEEK)');
        }

        if($duration == 'last1week') {
            $this->db->where('timesheet_date >= (NOW() - INTERVAL 1 WEEK)');
        }
        
        if($duration == 'last2weeks') {
            $this->db->where('timesheet_date >= (NOW() - INTERVAL 2 WEEK)');
        }

        if($duration == 'currentMonth') {
            $this->db->where('MONTH(`timesheet_date`) = MONTH(CURRENT_DATE()) AND YEAR(`timesheet_date`) = YEAR(CURRENT_DATE())');
        }

        if($duration == 'last1Month') {
            $this->db->where('timesheet_date >= (NOW() - INTERVAL 1 MONTH)');
        }

        if($duration == 'last3months') {
            $this->db->where('timesheet_date >= (NOW() - INTERVAL 3 MONTH)');
        }

        if($duration == 'last6months') {
            $this->db->where('timesheet_date >= (NOW() - INTERVAL 6 MONTH)');
        }

        if($duration == 'last12months') {
            $this->db->where('timesheet_date >= (NOW() - INTERVAL 12 MONTH)');
        }

        if($duration == 'customDateRange') {
            if(isset($fromDate) && !isset($toDate)){
                $this->db->where('t1.timesheet_date', $this->common_lib->convert_to_mysql($fromDate));
            }
    
            if(isset($fromDate) && isset($toDate)){
                $this->db->where('t1.timesheet_date >=', $this->common_lib->convert_to_mysql($fromDate));
                $this->db->where('t1.timesheet_date <=', $this->common_lib->convert_to_mysql($toDate));
            }
        }

        if($groupBy == 'task') {
            $this->db->group_by('t1.task_id');
        }
        if($groupBy == 'project') {
            $this->db->group_by('t1.project_id');
        }
		
        $query = $this->db->get('timesheet as t1');
        $result = $query->result_array();
        //print_r($this->db->last_query()); die();
        return  $result;
    }


    function getRoles($id, $limit=NULL, $offset=NULL) {
        $this->db->select('t1.*');
        if($id) {
            $this->db->where(array('t1.id' => $id));
        }
        if ($limit) {
            $this->db->limit($limit, $offset);
        }
        $query = $this->db->get('srbac_roles as t1');$num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function getPermissions($id, $limit=NULL, $offset=NULL) {
        $this->db->select('t1.*');
        if($id) {
            $this->db->where(array('t1.id' => $id));
        }
        if ($limit) {
            $this->db->limit($limit, $offset);
        }
        $query = $this->db->get('srbac_permissions as t1');
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }
}
