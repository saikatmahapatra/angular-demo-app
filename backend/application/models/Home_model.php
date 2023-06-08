<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Home_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }

    function insert($postdata, $table = NULL) {
        if ($table == NULL) {
            $this->db->insert('event_calendar', $postdata);
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
            $result = $this->db->update('event_calendar', $postdata);
        } else {
            $result = $this->db->update($table, $postdata);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function delete($where_array = NULL, $table = NULL) {
        $this->db->where($where_array);
        if ($table == NULL) {
            $result = $this->db->delete('event_calendar');
        } else {
            $result = $this->db->delete($table);
        }
        //echo $this->db->last_query(); die();
        return $result;
    }

    function get_user_count($checkActive=NULL) {
        $result = array();
        $this->db->select('count(*) as total');
		$this->db->where('t1.user_type', 'U');
        if($checkActive == true) {
            $this->db->where('t1.user_status', 'Y');
        }
		//$this->db->where('t1.user_status !=', 'A');
        $query = $this->db->get('users t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_user_projects() {
        $result = array();
        $this->db->select('count(*) as total');     
		//$this->db->where('t1.project_status', 'N');
        $query = $this->db->get('projects t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_user_applied_leave_count() {
        $result = array();
        $this->db->select('count(*) as total');
        //$this->db->where('t1.leave_status', 'B');
        $this->db->where(
			array(
                'YEAR(`leave_created_on`) =' => date('Y'),
                'MONTH(`leave_created_on`) =' => date('m')
			)
		);
        $query = $this->db->get('leave_applications t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_user_approved_leave_count() {
        $result = array();
        $this->db->select('count(*) as total');
        $this->db->where('t1.leave_status', 'A');
        $this->db->where(
			array(
                'YEAR(`leave_created_on`) =' => date('Y'),
                'MONTH(`leave_created_on`) =' => date('m')
			)
        );
        $query = $this->db->get('leave_applications t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_pending_leave_action_count($user_id) {
        $result = array();
        $this->db->select('count(*) as total');
        // $this->db->where(
		// 	array(
        //         'YEAR(`leave_from_date`) >=' => date('Y'),
        //         'MONTH(`leave_from_date`) >=' => date('m'),
        //         'YEAR(`leave_to_date`) <=' => date('Y'),
        //         'MONTH(`leave_to_date`) <=' => date('m')
		// 	)
        // );
        //$this->db->where('t1.leave_status !=', 'C');
        // $this->db->where('((t1.supervisor_approver_id = "'.$user_id.'" AND t1.supervisor_approver_status = "P")');
        // $this->db->or_where('(t1.director_approver_id = "'.$user_id.'" AND t1.director_approver_status = "P" ))');

        $this->db->where('((t1.supervisor_approver_id = "'.$user_id.'" AND t1.supervisor_approver_status = "P") OR (t1.director_approver_id = "'.$user_id.'" AND t1.director_approver_status = "P"))');
        $this->db->where_not_in('t1.leave_status', array('R', 'C'));
        $this->db->where_not_in('t5.user_status', array('N', 'A'));

        $this->db->join('users t5', 't5.id = t1.user_id', 'left');
        $query = $this->db->get('leave_applications t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_user_of_timesheet() {
        $result = array();
        $this->db->select('count(distinct(t1.timesheet_created_by)) as total');
        $this->db->where(
			array(
			'YEAR(`timesheet_date`)' => date('Y'),
            'MONTH(`timesheet_date`)' => date('m'),
            //'DAY(`timesheet_date`)' => date('d')
			)
		);     
		//$this->db->where('t1.project_status', 'N');
        $query = $this->db->get('timesheet t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }
}
