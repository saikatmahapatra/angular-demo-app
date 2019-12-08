<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Timesheet_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function insert($postdata, $table = NULL) {
        if ($table == NULL) {
            $this->db->insert('timesheet', $postdata);
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
            $result = $this->db->update('timesheet', $postdata);
        } else {
            $result = $this->db->update($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function delete($where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->delete('timesheet');
        } else {
            $result = $this->db->delete($table);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function get_rows($id = NULL, $limit = NULL, $offset = NULL, $dataTable = FALSE, $checkPaging = TRUE, $checkDate = FALSE, $year=NULL, $month=NULL, $user_id=NULL) {
        $result = array();
        $this->db->select('
		t1.*,
        t2.project_name,
        t2.project_number,
		t3.task_activity_name
		');
		$this->db->join('timesheet_projects as t2', 't2.id = t1.project_id', 'left');        
		$this->db->join('timesheet_activities as t3', 't3.id = t1.activity_id', 'left');        
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
                't3.task_activity_name',
                't1.timesheet_hours'
            );            
            //set column field database(table column name) for datatable searchable
            $column_search = array(
                't1.timesheet_date',
                't2.project_name',
                't3.task_activity_name',
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
        $query = $this->db->get('timesheet_projects');
        #echo $this->db->last_query();
        $result = array('' => 'Select');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->project_number.' '.$r->project_name;
            }
        }
        return $result;
    }

    function get_user_dropdown() {
        $result = array();
        $this->db->select('id,user_firstname,user_lastname, user_emp_id');		
        $this->db->where('user_status','Y');
        $this->db->order_by('user_firstname');		
        $query = $this->db->get('users');
        #echo $this->db->last_query();
        $result = array('' => 'Select');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->user_firstname.' '.$r->user_lastname.' ('.$r->user_emp_id.')';
            }
        }
        return $result;
    }
	
	function get_activity_dropdown() {
        $result = array();
        $this->db->select('id,task_activity_name');
        $this->db->where('task_activity_status','Y');		
        $this->db->order_by('task_activity_name');		
        $query = $this->db->get('timesheet_activities');
        #echo $this->db->last_query();
        $result = array('' => 'Select');
        if ($query->num_rows()) {
            $res = $query->result();
            foreach ($res as $r) {
                $result[$r->id] = $r->task_activity_name;
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
        t1.timesheet_date,
        t1.timesheet_hours,
        t1.timesheet_description,
        t1.timesheet_created_on,
		t2.project_number,
		t2.project_name,
		t3.task_activity_name,
		t4.user_firstname,
		t4.user_lastname
		');
		$this->db->join('timesheet_projects as t2', 't2.id = t1.project_id', 'left');        
		$this->db->join('timesheet_activities as t3', 't3.id = t1.activity_id', 'left');        
		$this->db->join('users as t4', 't4.id = t1.timesheet_created_by', 'left');        
        if ($id) {
            $this->db->where('t1.id', $id);
        }
        if(isset($cond)){
            if($cond['q_emp'] != ""){
                $this->db->where('t1.timesheet_created_by', $cond['q_emp']);
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

}
