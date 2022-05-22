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

    function get_rows($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE) {
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
                't1.project_name',
                't1.project_number',
                't1.project_start_date',
                't1.project_end_date',
                't1.project_status',
                NULL,
            );
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.project_name',
                't1.project_desc',
                't1.project_status',
                't1.project_start_date',
                't1.project_end_date',
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
        //$this->db->join('project_task_mapping as t2', 't2.project_id = t1.id', 'right');
        $query = $this->db->get('projects as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }
    
    function get_task_rows($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE) {
        $result = array();
        $this->db->select('t1.*, 
            tbl_subtask.level as subtask_level, 
            tbl_subtask.id as subtask_id, 
            tbl_subtask.task_name as subtask_parent_name,
            tbl_subtask.task_parent_id as subtask_parent_id,
            tbl_subtask.task_status as subtask_status
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
                't1.task_name',
                't1.task_status',
                NULL,
            );            
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.task_name',
                't1.task_status'
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
        $this->db->join('project_tasks as tbl_subtask', 'tbl_subtask.id = t1.task_parent_id', 'left');
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
        #echo $this->db->last_query();
        $result = array('' => '-Select-');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->task_name;
            }
        }
        return $result;
    }

    function save_project_tasks($postdata, $pid) {
        // first delete existing map for the pproject_id
        if($pid){
            $this->db->where('project_id', $pid);
            $this->db->delete('project_task_mapping');
        }
        $this->db->insert_batch('project_task_mapping', $postdata);
        //echo $this->db->last_query(); die();
        $insert_id = $this->db->insert_id();
        return $insert_id;
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

    function get_tagged_tasks($project_id=NULL) {
        $result = array();
        $this->db->select('t1.task_id_1');
        if($project_id){
            $this->db->where('t1.project_id',$project_id);
        }
        $query = $this->db->get('project_task_mapping t1');
        //echo $this->db->last_query();
        $result = array();
        if ($query->num_rows()) {
            $result = $query->result_array();
            foreach ($result as $key=>$r) {
                $result[$key] = $r['task_id_1'];
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

    function get_timesheet_rows($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE, $checkDate = FALSE, $year=NULL, $month=NULL, $user_id=NULL) {
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
		
        ####################################################################
        ##################### Display using Data Table #####################
        ####################################################################
        if ($dataTable == TRUE) {
            //set column field database for datatable orderable
            $column_order = array(
                't1.timesheet_date',
                't2.project_name',
                't3.task_name',
                't1.timesheet_hours'
            );            
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.timesheet_date',
                't2.project_name',
                't3.task_name',
                't1.timesheet_hours',
				't1.timesheet_description',
				't1.timesheet_review_status'				
                );
             // default order
            $order = array(
                't1.timesheet_date' => 'desc'
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
        $result = array();
        $this->db->select('id,project_name,project_number');		
        $this->db->where('project_status','Y');
        $this->db->order_by('project_name');		
        $query = $this->db->get('projects');
        #echo $this->db->last_query();
        $result = array('' => '-Select-');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->project_name.' - '.$r->project_number;
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

    function get_user_dropdown() {
        $result = array();
        $this->db->select('id,user_firstname,user_lastname, user_emp_id');		
        $this->db->where_not_in('user_status',array('A','N'));
        $this->db->where('user_type','U');
        $this->db->order_by('user_firstname');		
        $query = $this->db->get('users');
        #echo $this->db->last_query();
        $result = array('' => 'Select Employee');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->user_firstname.' '.$r->user_lastname.' ('.$r->user_emp_id.')';
            }
        }
        return $result;
    }

    function get_user_dropdown_searchable($keywords) {
        $result = array();
        $this->db->select('id,user_firstname,user_lastname, user_emp_id');		
        $this->db->where('user_status !=','A');
        $this->db->where('user_type','U');
        $this->db->like('user_firstname', $keywords); 
        $this->db->or_like('user_emp_id', $keywords);
        $this->db->or_like('user_lastname', $keywords);
        //$this->db->order_by('user_firstname');
        $query = $this->db->get('users');
        //echo $this->db->last_query();
        //$result = array('' => 'Select');
        if ($query->num_rows()) {
            $res = $query->result();
            $i=0;
            foreach ($res as $r) {
                $result[$i]["id"] = $r->id;
                $result[$i]["text"] =$r->user_firstname.' '.$r->user_lastname.' ('.$r->user_emp_id.')';
                $i++;
            }
        }
        return $result;
    }
    
    function get_project_task_tagging_dropdown($project_id=NULL) {
        $result = array();
        $this->db->select('t1.id, t2.task_name, t2.id as task_id');
        if($project_id){
            $this->db->where('t1.project_id',$project_id);
        }
        $this->db->join('project_tasks as t2', 't2.id = t1.task_id_1', 'right'); 
        $query = $this->db->get('project_task_mapping t1');
        //echo $this->db->last_query();
        //$result = array();
        $result = array('' => '-Select-');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->task_id] = $r->task_name;
            }
        }
        return $result;
    }

	function get_task_dropdown($order=NULL, $parent_id = NULL, $req_empty_opt = TRUE) {
        $result = array();
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
        if($req_empty_opt === true){
            $result = array('' => '-Select-');
        }
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->task_name;
            }
        }
        return $result;
    }
	
	function get_timesheet_hours_dropdown(){
		return $timesheet_hours = array('' => 'Select','0.5'=>'0.5 hrs');
    }
    
    function get_report_data($id = NULL, $limit = NULL, $offset = NULL, $cond) {
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
		t4.user_firstname,
		t4.user_lastname,
        t5.user_firstname as timesheet_reviewed_by_fn,
        t5.user_lastname as timesheet_reviewed_by_ln
		');
		$this->db->join('projects as t2', 't2.id = t1.project_id', 'left');        
		$this->db->join('project_tasks as t3', 't3.id = t1.task_id_1', 'left');        
		$this->db->join('users as t4', 't4.id = t1.timesheet_created_by', 'left');
        $this->db->join('users as t5', 't5.id = t1.timesheet_reviewed_by', 'left');        
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if(isset($cond)){
            if($cond['q_emp'] != ""){
                $this->db->where_in('t1.timesheet_created_by', $cond['q_emp']);
            }
            if($cond['q_project'] != ""){
                $this->db->where('t1.project_id', $cond['q_project']);
            }
            if($cond['from_date']){
                $this->db->where('t1.timesheet_date >=', $this->common_lib->convert_to_mysql($cond['from_date']));
            }
            if($cond['to_date']){
                $this->db->where('t1.timesheet_date <=', $this->common_lib->convert_to_mysql($cond['to_date']));
            }
        }
        $this->db->order_by('t1.timesheet_date','desc');	
        if ($limit) {
            $this->db->limit($limit, $offset);
        }    
        $query = $this->db->get('timesheet as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function validate_project_end_date($id) {
        $allow_timesheet_entry = false;
        $data = array(
            'allow_timesheet_entry' => $allow_timesheet_entry,
            'id' => '',
            'project_start_date' => '',
            'project_start_date' => ''
        );
        $result = array();
        $this->db->select('
        t1.id,
        t1.project_start_date,
        t1.project_end_date
        ');
        $this->db->where('t1.id', $id);
        $query = $this->db->get('projects as t1');
        //print_r($this->db->last_query()); die();
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        if(sizeof($result) > 0) {
            if(isset($result[0]['project_end_date'])) {
                $datediff = ( strtotime($result[0]['project_end_date']) - strtotime(date('Y-m-d')) );
                $no_day = round($datediff / (60 * 60 * 24));
                if($no_day >=0 ) {
                    $allow_timesheet_entry = true;
                } else {
                    $allow_timesheet_entry = false;
                }
                
            } else {
                $allow_timesheet_entry = true;
            }

            $data = array(
                'allow_timesheet_entry' => $allow_timesheet_entry,
                'id' => isset($result[0]['id']) ? $result[0]['id'] : '',
                'project_start_date' => isset($result[0]['project_start_date']) ? $result[0]['project_start_date'] : '',
                'project_end_date' => isset($result[0]['project_end_date']) ? $result[0]['project_end_date'] : ''
            );

        }
        return $data;
    }

    function change_task_review_status($post_data, $timesheet_id_arr) {
        $this->db->where_in('id', $timesheet_id_arr);
        $result = $this->db->update('timesheet', $post_data);
        //echo $this->db->last_query(); die();
        return $result;
    }

}
