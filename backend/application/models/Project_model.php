<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Project_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function insert($postdata, $table = NULL) {
        if ($table == NULL) {
            $this->db->insert('projects', $postdata);
        } else {
            $this->db->insert($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        $insert_id = $this->db->insert_id();
        return $insert_id;
    }

    function insert_batch($postdata, $table = NULL) {
        if ($table == NULL) {
            $this->db->insert_batch('timesheet', $postdata);
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
            $result = $this->db->update('projects', $postdata);
        } else {
            $result = $this->db->update($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function delete($where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->delete('projects');
        } else {
            $result = $this->db->delete($table);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function get_rows($id = NULL, $paginate = false, $perPage = NULL, $offset = NULL) {
        $result = array();
        $this->db->select('t1.*');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if ($paginate == true && $perPage != 0) {
            $this->db->limit($perPage, $offset);
        }
        $this->db->order_by('t1.id', 'desc');        
        $query = $this->db->get('projects as t1');
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }
    
    function get_task_rows($id = NULL, $paginate = false, $perPage = NULL, $offset = NULL) {
        $result = array();
        $this->db->select('t1.*, 
            tbl_subtask.level as subtask_level, 
            tbl_subtask.id as subtask_id, 
            tbl_subtask.task_name as subtask_parent_name,
            tbl_subtask.task_parent_id as subtask_parent_id,
            tbl_subtask.task_status as subtask_status');
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if ($paginate == true && $perPage != 0) {
            $this->db->limit($perPage, $offset);
        }
        $this->db->join('project_tasks as tbl_subtask', 'tbl_subtask.id = t1.task_parent_id', 'left');
        $this->db->order_by('t1.id', 'desc'); 
        $query = $this->db->get('project_tasks as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_task_nested_dropdown($level=NULL) {
        $result = array();
        $this->db->select('id,task_name, task_parent_id, level, task_code');
        $this->db->where('task_status','Y');
        if(isset($level)){
            $this->db->where('level',$level);
        }	
        $this->db->order_by('task_name');
        $query = $this->db->get('project_tasks');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $a['id'] = $r->id;
                $a['name'] = $r->task_name;
                array_push($result, $a);
            }
        }
        return $result;
    }

    function get_task_dd($level = NULL) {
        $result = array();
        $this->db->select('id,task_name, task_parent_id, level, task_code');
        $this->db->where('task_status','Y');	
        if(isset($level)){
            $this->db->where('level',$level);
        }	
        $this->db->order_by('task_name');
        $query = $this->db->get('project_tasks');
        #echo $this->db->last_query();
        //$result = array('' => 'Select');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->task_name;
            }
        }
        return $result;
    }

    function get_task_level($task_id) {
        $result = array();
        $this->db->select('level');
        if(isset($task_id)){
            $this->db->where('id',$task_id);
        }
        $query = $this->db->get('project_tasks');
        if ($query->num_rows()) {
            $result = $query->result_array();
        }
        return $result;
    }

    function is_unique_value($value, $id=NULL) {
        $result = false;
        $this->db->select('id');
        if(isset($id)){
            $this->db->where_not_in('id',$id);
        }
        $this->db->where('task_name', $value);
        $query = $this->db->get('project_tasks');
        if ($query->num_rows()) {
            $result = false;
        } else {
            $result = true;
        }
        return $result;
    }

    function get_timesheet_rows($id = NULL, $perPage = NULL, $offset = NULL, $paginate = FALSE, $checkDate = FALSE, $year=NULL, $month=NULL, $user_id=NULL) {
        $result = array();
        $this->db->select('
		t1.*,
        t2.project_name,
        t2.project_number,
		t3.task_name
		');
		$this->db->join('projects as t2', 't2.id = t1.project_id', 'left');        
		$this->db->join('project_tasks as t3', 't3.id = t1.task_id_1', 'left');        
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if ($user_id) {
            $this->db->where('t1.timesheet_created_by', $user_id);
        }
		if($checkDate == TRUE){
			$this->db->where(
				array(
				'YEAR(`timesheet_date`)' => $year,
				'MONTH(`timesheet_date`)' => $month,
				)
			);
		}
        //for server side pagination
        if ($paginate == true && $perPage != 0) {
            $this->db->limit($perPage, $offset);
        }
        $query = $this->db->get('timesheet as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

	function get_timesheet_stats($year,$month, $user_id){		
		$this->db->select('
		t1.id, 
		t1.timesheet_date, 
		DATE_FORMAT(t1.`timesheet_date`,"%Y") as timesheet_year,
		DATE_FORMAT(t1.`timesheet_date`,"%m") as timesheet_month,
		DATE_FORMAT(t1.`timesheet_date`,"%d") as timesheet_day,
		t1.timesheet_hours,
		t1.timesheet_review_status	
		');        
        $this->db->where(
			array(
			'YEAR(`timesheet_date`)' => $year,
            'MONTH(`timesheet_date`)' => $month,
            't1.timesheet_created_by' => $user_id
			)
		);
		
        $query = $this->db->get('timesheet as t1');
		//echo $this->db->last_query(); //die();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
		
		
		//Data Stat
		$this->db->select('
		count(DISTINCT(`timesheet_date`)) as total_days, 		
		SUM(`timesheet_hours`) as total_hrs,
		ROUND((SUM(`timesheet_hours`)/count(DISTINCT(`timesheet_date`))),2) as avg_hrs
		');        
        $this->db->where(
			array(
			'YEAR(`timesheet_date`)' => $year,
            'MONTH(`timesheet_date`)' => $month,
            't1.timesheet_created_by' => $user_id
			)
		);
		
        $query = $this->db->get('timesheet as t1');
		//echo $this->db->last_query(); //die();        
        $stat_data = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result, 'stat_data'=>$stat_data[0]);       
	}
	
	function get_project_dropdown() {
        $result = [];
        $this->db->select('id,project_name,project_number');		
        $this->db->where('project_status','Y');
        $this->db->order_by('project_name');		
        $query = $this->db->get('projects');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $a['id'] = $r->id;
                $a['name'] = $r->project_name.' - '.$r->project_number;
                array_push($result, $a);
            }
        }
        return $result;
    }

	function get_project_dropdown_searchable($keywords) {
        $result = array();
        $this->db->select('id,project_name,project_number');		
        $this->db->where('project_status','Y');
        //$this->db->order_by('project_name');	
        $this->db->like('project_name', $keywords);
        $this->db->or_like('project_number', $keywords);
        $query = $this->db->get('projects');
        #echo $this->db->last_query();
        //$result = array('' => 'Select');
        if ($query->num_rows()) {
            $res = $query->result();
            $i=0;
            foreach ($res as $r) {
                $result[$i]["id"] = $r->id;
                $result[$i]["text"] =$r->project_name.' - '.$r->project_number;
                $i++;
            }
        }
        return $result;
    }

	function get_task_dropdown($order=NULL, $parent_id = NULL, $req_empty_opt = TRUE) {
        $result = [];
        $this->db->select('id,task_name');
        $this->db->where('task_status','Y');		
        $this->db->order_by('task_name');
        if($order){
            $this->db->where('level', $order);
        }
        if($parent_id){
            $this->db->where('task_parent_id', $parent_id);
        }		
        $query = $this->db->get('project_tasks');
        #echo $this->db->last_query();
        // if($req_empty_opt === true){
        //     $result = array('' => '-Select-');
        // }
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $a['id'] = $r->id;
                $a['name'] = $r->task_name;
                array_push($result, $a);
            }
        }
        return $result;
    }
    
    function get_report_data($id = NULL,  $paginate = false, $perPage = NULL, $offset = NULL, $cond = NULL) {
        $result = array();
        $this->db->select('
        t1.id,
        t1.timesheet_date,
        t1.timesheet_hours,
        t1.timesheet_description,
        t1.timesheet_created_on,
        t1.timesheet_updated_on,
        t1.timesheet_review_status,
        t1.timesheet_reviewed_by,
        t1.timesheet_reviewed_on,
		t2.project_number,
		t2.project_name,
		t3.task_name,
		t4.user_full_name,
        t4.user_email,
        t5.user_full_name as timesheet_reviewed_by_name
		');
		$this->db->join('projects as t2', 't2.id = t1.project_id', 'left');        
		$this->db->join('project_tasks as t3', 't3.id = t1.task_id_1', 'left');        
		$this->db->join('users as t4', 't4.id = t1.timesheet_created_by', 'left');
        $this->db->join('users as t5', 't5.id = t1.timesheet_reviewed_by', 'left');        
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if(isset($cond)){
            if(isset($cond['empIds']) && sizeof($cond['empIds']) > 0){
                $this->db->where_in('t1.timesheet_created_by', $cond['empIds']);
            }
            if(isset($cond['projectIds']) && sizeof($cond['projectIds']) > 0){
                $this->db->where_in('t1.project_id', $cond['projectIds']);
            }
            if(isset($cond['fromDate']) && $cond['fromDate'] != NULL){
                $this->db->where('t1.timesheet_date >=', $this->common_lib->convert_to_mysql($cond['fromDate']));
            }
            if(isset($cond['toDate']) && $cond['toDate'] != NULL){
                $this->db->where('t1.timesheet_date <=', $this->common_lib->convert_to_mysql($cond['toDate']));
            }
        }
        $this->db->order_by('t1.timesheet_date','desc');	
        
        //for server side pagination
        if ($paginate == true && $perPage != 0) {
            $this->db->limit($perPage, $offset);
        }
        $query = $this->db->get('timesheet as t1');
        //print_r($this->db->last_query()); die();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_holiday_dates($type) {
        $result = array();
        $this->db->select('t1.*');
        $this->db->where_in('holiday_type', $type);
		$this->db->where(
			array(
			'YEAR(`holiday_date`)' => date('Y'),
			)
		);
		$this->db->order_by('t1.holiday_date', 'asc');
        $query = $this->db->get('holidays as t1');
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return  $result;
    }

}
