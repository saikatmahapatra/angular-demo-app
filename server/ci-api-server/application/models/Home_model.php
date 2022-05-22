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

    function get_user_count() {
        $result = array();
        $this->db->select('count(*) as total');
		$this->db->where('t1.user_type', 'U');
		$this->db->where('t1.user_status !=', 'A');
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
                'YEAR(`leave_from_date`) >=' => date('Y'),
                'MONTH(`leave_from_date`) >=' => date('m'),
                'YEAR(`leave_to_date`) <=' => date('Y'),
                'MONTH(`leave_to_date`) <=' => date('m')
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
                'YEAR(`leave_from_date`) >=' => date('Y'),
                'MONTH(`leave_from_date`) >=' => date('m'),
                'YEAR(`leave_to_date`) <=' => date('Y'),
                'MONTH(`leave_to_date`) <=' => date('m')
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

    function get_user_profile_completion_status($user_id){
        $message = array();
        $strength = 0;

        // emergency contacts
        $this->db->select('id');
        $this->db->where('user_id', $user_id);
        $query = $this->db->get('user_emergency_contacts');
        $num_rows = $query->num_rows();
        if($num_rows <= 0 ){
            $message[] = 'emergency contacts';
        }

        // address
        $this->db->select('id');
        $this->db->where('user_id', $user_id);
        $query = $this->db->get('user_addresses');
        $num_rows = $query->num_rows();
        if($num_rows <= 0 ){
            $message[] = 'communication addresses';
        }

        // education
        // $this->db->select('id');
        // $this->db->where('user_id', $user_id);
        // $query = $this->db->get('user_academics');
        // $num_rows = $query->num_rows();
        // if($num_rows <= 0 ){
        //     $message[] = 'education details';
        // }

        // user approvers
        // $this->db->select('id');
        // $this->db->where('user_id', $user_id);
        // $query = $this->db->get('user_approvers');
        // $num_rows = $query->num_rows();
        // if($num_rows <= 0 ){
        //     $message[] = 'leave approvers';
        // }
        
        // user_bank_account
        // $this->db->select('id');
        // $this->db->where('user_id', $user_id);
        // $query = $this->db->get('user_bank_account');
        // $num_rows = $query->num_rows();
        // if($num_rows <= 0 ){
        //     $message[] = 'salary account';
        // }

        // user_work_exp
        // $this->db->select('id');
        // $this->db->where('user_id', $user_id);
        // $query = $this->db->get('user_work_exp');
        // $num_rows = $query->num_rows();
        // if($num_rows <= 0 ){
        //     $message[] = 'previous work experiences';
        // }

        return $message;
    }

    /**
     * https://fullcalendar.io/
     * Get records of user timesheet, leave, holiday, other calendar related activities.
     */
    function get_events(){
        $eventList = array();
        // return '[
        //     {
        //       "title": "All Day Event",
        //       "start": "2019-08-01"
        //     },
        //     {
        //       "title": "Leave ID 26737637 - Maternity leave",
        //       "start": "2019-08-07",
        //       "end": "2019-12-10",
        //       "url": "'.base_url('leave/details/37/0922194959').'"
        //     },
        //     {
        //       "id": "999",
        //       "title": "Repeating Event",
        //       "start": "2019-08-09T16:00:00-05:00"
        //     },
        //     {
        //       "id": "999",
        //       "title": "Repeating Event",
        //       "start": "2019-08-16T16:00:00-05:00"
        //     },
        //     {
        //       "title": "Conference",
        //       "start": "2019-08-11",
        //       "end": "2019-08-13"
        //     },
        //     {
        //       "title": "Meeting",
        //       "start": "2019-08-12T10:30:00-05:00",
        //       "end": "2019-08-12T12:30:00-05:00"
        //     },
        //     {
        //       "title": "Lunch",
        //       "start": "2019-08-12T12:00:00-05:00"
        //     },
        //     {
        //       "title": "Meeting",
        //       "start": "2019-08-12T14:30:00-05:00"
        //     },
        //     {
        //       "title": "Happy Hour",
        //       "start": "2019-08-12T17:30:00-05:00"
        //     },
        //     {
        //       "title": "Dinner",
        //       "start": "2019-08-12T20:00:00"
        //     },
        //     {
        //       "title": "Birthday Party",
        //       "start": "2019-08-13T07:00:00-05:00"
        //     },
        //     {
        //       "title": "Click for Google",
        //       "url": "http://google.com/",
        //       "start": "2019-08-28"
        //     }
        //   ]
        //   ';
        $start = $this->input->get_post('start');
        $end = $this->input->get_post('end');        
        $cond = array(
            'user_id' => $this->common_lib->get_sess_user('id'),
        );

        $data1 = array();
        $rs = $this->get_holidays($start, $end, $cond);
        if(isset($rs['data_rows']) && sizeof($rs['data_rows']) > 0){
          foreach($rs['data_rows'] as $key => $val){
            $data1[$key]['id'] = $val['id'];
            $data1[$key]['title'] = ($val['holiday_type'] == 'C' ? '' : 'Opt. ').$val['holiday_description'];
            $data1[$key]['start'] = $val['holiday_date'];
            //$data1[$key]['overlap'] = false;
            //$data1[$key]['rendering'] = 'background';
            $data1[$key]['borderColor'] = '#dc3545';
            $data1[$key]['backgroundColor'] = '#dc3545';
            $data1[$key]['textColor'] = '#fff';
            $data1[$key]['extendedProps'] = array(
                'event_type' => ($val['holiday_type'] == 'C' ? 'Holiday' : 'Optional Holiday'),
                'event_type_css' => 'badge badge-danger',
                'icon' => ''
            );
          }
        }
        
        $data2 = array();
        $rs = $this->get_timesheet_logs($start, $end, $cond);
        if(isset($rs['data_rows']) && sizeof($rs['data_rows']) > 0){
            foreach($rs['data_rows'] as $key => $val){
              $data2[$key]['id'] = $val['id'];  
              //print_r($val);
              //$data2[$key]['title'] = $val['timesheet_hours'].' hrs';
              //$data2[$key]['description'] = $val['project_name'].' : '.$val['timesheet_description'];
              $data2[$key]['title'] = $val['timesheet_hours'].' hrs '.$val['project_name'].' : '.$val['timesheet_description'];
              $data2[$key]['start'] = $val['timesheet_date'];
              //$data2[$key]['overlap'] = false;
              //$data2[$key]['rendering'] = 'background';
              $data2[$key]['borderColor'] = '#6610f2';
              $data2[$key]['backgroundColor'] = '#6610f2';
              $data2[$key]['textColor'] = '#fff';
              //$data2[$key]['url'] = base_url('project/edit_timesheet/'.$val['id']);
              //$data2[$key]['allDay'] = false;
              $data2[$key]['extendedProps'] = array(
                'event_type' => 'Timesheet',
                'event_type_css' => 'badge badge-primary',
                'icon' => ''
            );
            }
          }

          $data3 = array();
          $rs = $this->get_leave_applications($start, $end, $cond);
          $leave_status_arr = array(
            'B'=>array('text'=>'Applied', 'css'=>'text-primary'),
            'P'=>array('text'=>'Pending', 'css'=>'text-secondary'),
            'C'=>array('text'=>'Cancelled', 'css'=>'text-warning'),
            'R'=>array('text'=>'Rejected', 'css'=>'text-danger'),
            'A'=>array('text'=>'Approved', 'css'=>'text-success'),
            'O'=>array('text'=>'Processing', 'css'=>'text-info'),
            'X'=>array('text'=>'Cancel Requested', 'css'=>'text-warning'),
            );
          if(isset($rs['data_rows']) && sizeof($rs['data_rows']) > 0){
            foreach($rs['data_rows'] as $key => $val){
              $data3[$key]['id'] = $val['id'];
              $data3[$key]['title'] = $val['leave_type'].' '.$leave_status_arr[$val['leave_status']]['text'].' '.$val['leave_req_id'].' : '.$val['leave_reason'];
              $data3[$key]['start'] = $val['leave_from_date'].'T00:00:00';
              //$data3[$key]['end'] = $val['leave_to_date'].'T23:59:59';
              $end_date_bug_fix = date('Y-m-d', strtotime('+1 day', strtotime($val['leave_to_date'])));
              $data3[$key]['end'] = $end_date_bug_fix.'T23:59:59'; //to fix bug of
              $data3[$key]['borderColor'] = '#fd7e14'; // orange
              $data3[$key]['backgroundColor'] = '#fd7e14'; // 80% lighten of border
              $data3[$key]['textColor'] = '#fff';
              $data3[$key]['allDay'] = true;
              $data3[$key]['url'] = base_url('leave/details/'.$val['id'].'/'.$val['leave_req_id']);
              $data3[$key]['extendedProps'] = array(
                'event_type' => 'Leave',
                'event_type_css' => 'badge badge-warning',
                'icon' => ''
            );
            }
          }

        $eventList = array_merge($data1, $data2, $data3);
        return json_encode($eventList);
    }

    function get_holidays($start, $end, $cond){
      $start = date('Y-m-d', strtotime($start));
      $end = date('Y-m-d', strtotime($end));
      $result = array();
      $this->db->select('t1.*');
      $this->db->where('holiday_date >=', $start);
      $this->db->where('holiday_date <=', $end);
      $query = $this->db->get('holidays as t1');
      //print_r($this->db->last_query());
      $num_rows = $query->num_rows();
      $result = $query->result_array();
      return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_timesheet_logs($start, $end, $cond){
        $start = date('Y-m-d', strtotime($start));
        $end = date('Y-m-d', strtotime($end));
        $result = array();
        $this->db->select('
        t1.id,
        t1.timesheet_date,
        t1.timesheet_hours,
        t1.timesheet_description,
		t2.project_name,
		t3.task_name,
		t4.user_firstname,
		t4.user_lastname
		');
		$this->db->join('projects as t2', 't2.id = t1.project_id', 'left');
		$this->db->join('project_tasks as t3', 't3.id = t1.task_id_1', 'left');
		$this->db->join('users as t4', 't4.id = t1.timesheet_created_by', 'left');
        if(isset($cond)){
            if($cond['user_id'] != ""){
                $this->db->where('t1.timesheet_created_by', $cond['user_id']);
            }
        }
        $this->db->where('t1.timesheet_date >=', $start);
        $this->db->where('t1.timesheet_date <=', $end);
        $query = $this->db->get('timesheet as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }

    function get_leave_applications($start, $end, $cond){
        $start = date('Y-m-d', strtotime($start));
        $end = date('Y-m-d', strtotime($end));
        $result = array();
        $this->db->select('
        t1.id,
        t1.leave_req_id,
        t1.leave_from_date,
        t1.leave_to_date,
		t1.leave_reason,
		t1.leave_type,
		t1.leave_status
		');
        if(isset($cond)){
            if($cond['user_id'] != ""){
                $this->db->where('t1.user_id', $cond['user_id']);
            }
        }
        $this->db->where('t1.leave_from_date >=', $start);
        $this->db->where('t1.leave_to_date <=', $end);	
        $query = $this->db->get(' leave_applications as t1');
        //print_r($this->db->last_query());
        $num_rows = $query->num_rows();
        $result = $query->result_array();
        return array('num_rows' => $num_rows, 'data_rows' => $result);
    }
}
