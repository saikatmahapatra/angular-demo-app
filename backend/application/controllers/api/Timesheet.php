<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Timesheet extends App_Controller
{
    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        parent::__construct();
        $this->isAuthorized();
        $this->load->model('project_model');
        $this->load->model('settings_model');
    }

    function formData_get()
    {
        $this->responseData['data']['projects'] = $this->project_model->get_project_dropdown();
        $this->responseData['data']['tasks'] = $this->project_model->get_task_dropdown();
        $this->responseData['data']['holidays'] = $this->project_model->get_holiday_dates('C');
        $this->responseData['data']['optionalHolidays'] = $this->project_model->get_holiday_dates('O');
        $this->responseData['data']['settings'] = $this->settings_model->get_option(array('timesheetMinDays', 'timesheetMaxDays'));
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    function _getDates($dateArr)
    {
        $newDate = [];
        foreach ($dateArr as $key => $val) {
            array_push($newDate, $val['date']);
        }
        return $newDate;
    }

    function _validateFormData($postData)
    {
        $result = true;
        if (sizeof($postData['timeSheetDates']) > 5) {
            $result = false;
            $this->responseData['message'] = 'You are allowed to choose maximum 5 days at a time.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        return $result;
    }

    function createTimesheet_post()
    {
        $formAction = $this->post('action');
        $validatedForm = $this->_validateFormData($this->post());
        if ($formAction === 'add' && $validatedForm) {
            $dates = $this->post('timeSheetDates');
            $descr = trim($this->post('description')) !== '' ?  trim($this->post('description')) : NULL;
            $postdata = array();
            foreach ($dates as $key => $date) {
                $postdata[$key] = array(
                    'timesheet_date' => $this->common_lib->convert_to_mysql($date),
                    'project_id' => $this->post('project'),
                    'task_id' => $this->post('task'),
                    'timesheet_hours' => $this->post('hours'),
                    'timesheet_description' => $descr,
                    'timesheet_created_by' => $this->getUserId(),
                    'timesheet_created_on' => date('Y-m-d H:i:s')
                );
            }
            $id = $this->project_model->insert_batch($postdata, 'timesheet');
            if ($id) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Your task details have been saved successfully.';
                $this->statusCode = REST_Controller::HTTP_CREATED;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function updateTimesheet_put()
    {
        $formAction = $this->put('action');
        $date = $this->put('date');
        $descr = trim($this->put('description')) !== '' ?  trim($this->put('description')) : NULL;
        $isEligible = $this->isEditDeleteEligible($date);
        if ($formAction === 'edit') {
            if($isEligible) {
                $data = array(
                    'project_id' => $this->put('project'),
                    'task_id' => $this->put('task'),
                    'timesheet_hours' => $this->put('hours'),
                    'timesheet_description' => $descr,
                    'timesheet_updated_by' => $this->getUserId(),
                    'timesheet_updated_on' => date('Y-m-d H:i:s')
                );
                $where_array = array('id' => $this->put('id'));
                $res = $this->project_model->update($data, $where_array, 'timesheet');
                if ($res) {
                    $this->responseData['status'] = 'success';
                    $this->responseData['message'] = 'Your task details has been updated successfully.';
                    $this->statusCode = REST_Controller::HTTP_OK;
                } else {
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                }
            } else{
                $this->responseData['message'] = 'Edit of previous month\'s timesheet are not allowed.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
            
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getTimesheet_get()
    {
        $userId = $this->get('userId') ? $this->get('userId') : null;
        $year = $this->get('year') ? $this->get('year') : date('Y');
        $month = $this->get('month') ? $this->get('month') : date('m');
        $id = $this->get('id') ? $this->get('id') : null;
        $perPage = isset($_SERVER['HTTP_PERPAGE']) ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = isset($_SERVER['HTTP_PAGE']) ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;
        if ($year) {
            $totalRecords = $this->project_model->get_timesheet_rows($id, NULL, NULL, FALSE, TRUE, $year, $month, $userId);
            $res = $this->project_model->get_timesheet_rows($id, NULL, NULL, FALSE, TRUE, $year, $month, $userId);            
            $resultArray['num_rows'] = $totalRecords['num_rows'];
            $resultArray['data_rows'] = $res['data_rows'];
            $this->responseData['data'] = $resultArray;
            if (isset($this->responseData['data'])) {
                $this->responseData['status'] = 'success';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
            $this->response($this->responseData, $this->statusCode);
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
    }

    function deleteTimesheet_delete()
    {
        $id = $_REQUEST['id'] ? $_REQUEST['id'] : null;
        $date = $_REQUEST['date'] ? $_REQUEST['date'] : null;
        $isEligible = $this->isEditDeleteEligible($date);
        if ($id) {
            if($isEligible) {
                $where_array = array('id' => $id);
                $res = $this->project_model->delete($where_array, 'timesheet');
                if ($res) {
                    $this->responseData['status'] = 'success';
                    $this->responseData['message'] = 'Data deleted successfully.';
                    $this->statusCode = REST_Controller::HTTP_OK;
                } else {
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                }
            }else {
                $this->responseData['message'] = 'Delete of previous month\'s timesheet are not allowed.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
            
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }

        $this->response($this->responseData, $this->statusCode);
    }

    function isEditDeleteEligible($date) {
        $todayMonth = date('m');
        $todayYear = date('Y');
        $timesheetDate = explode("-", $date);
        if($todayMonth == $timesheetDate[1] && $todayYear == $timesheetDate[0]) {
            return true;
        } else {
            return false;
        }
    }

    function getReport_post() {
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $dateRange = $this->post('dateRange');
        $fromDate = date("Y-m-d", strtotime($dateRange[0]));
        $toDate = $dateRange[1] ? date("Y-m-d", strtotime($dateRange[1])) : NULL;

        $filterByCond = array(
            'fromDate' => $fromDate,
            'toDate' => $toDate,
            'empIds' => $this->post('employee'),
            'projectIds' => $this->post('projects')
        );
        
        $perPage = $_SERVER['HTTP_PERPAGE'] ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = $_SERVER['HTTP_PAGE'] ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;

        $totalRecords = $this->project_model->get_report_data(NULL, false, NULL, NULL, $filterByCond);
        $result_array = $this->project_model->get_report_data(NULL, true, $perPage, $offset, $filterByCond);        

        if (isset($result_array)) {
            $result_array['num_rows'] = $totalRecords['num_rows'];
            $this->responseData['data'] = $result_array;
            $this->statusCode = REST_Controller::HTTP_OK;
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        
        $this->response($this->responseData, $this->statusCode);
    }

    function timesheetChartData_post()
    {
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $projectId = $this->post('entityId') ? $this->post('entityId') : null;
        $duration = $this->post('duration') ? $this->post('duration') : null;
        $action = $this->post('action') ? $this->post('action') : null;
        $dateRange = $this->post('dateRange') ? $this->post('dateRange') : null;
        $fromDate = $dateRange[0] ? date("Y-m-d", strtotime($dateRange[0])) : NULL;
        $toDate = $dateRange[1] ? date("Y-m-d", strtotime($dateRange[1])) : NULL;
        if($action == 'generateChart') {
            $resultArray = $this->project_model->getProjectHourReport($projectId, $duration, $fromDate, $toDate);
            $resultArrayTasks = $this->project_model->getProjectTaskHourReport($projectId, $duration, $fromDate, $toDate);
            if (isset($resultArray) && isset($resultArrayTasks)) {
                $this->responseData['data'] = $resultArray;
                $this->responseData['taskData'] = $resultArrayTasks;
                $this->statusCode = REST_Controller::HTTP_OK;
            }
            else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        
        $this->response($this->responseData, $this->statusCode);
    }
}
