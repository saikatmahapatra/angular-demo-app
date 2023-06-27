<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Task extends App_Controller
{
    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        parent::__construct();
        $this->isAuthorized();
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $this->load->model('project_model');
    }

    function formData_get()
    {
        $this->responseData['data']['taskDropdown'] = $this->project_model->get_task_dropdown();
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    function createTask_post()
    {
        $formAction = $this->post('action');
        if ($formAction === 'add' && $this->_taskExists($this->post('taskName')) === true) {
            $postdata = array(
                'task_name' => $this->post('taskName'),
                'task_status' => 'Y'
            );
            $res = $this->project_model->insert($postdata, 'project_tasks');
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Task has been added successfully.';
                $this->statusCode = REST_Controller::HTTP_CREATED;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->responseData['message'] = 'This task already exists in datadabse. Please add a different task.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getTask_get()
    {
        $id = $this->get('id') ? $this->get('id') : null;
        $perPage = isset($_SERVER['HTTP_PERPAGE']) ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = isset($_SERVER['HTTP_PAGE']) ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;
        $numRows = $this->project_model->get_task_rows($id, FALSE);
        $resultArray = $this->project_model->get_task_rows($id, TRUE, $perPage, $offset);
        if (isset($resultArray)) {
            if (sizeof($resultArray['data_rows']) > 0) {
                $resultArray['num_rows'] = $numRows['num_rows'];
                $this->responseData['data'] = $resultArray;
                $this->statusCode = REST_Controller::HTTP_OK;
            }
            if (sizeof($resultArray['data_rows']) == 0) {
                $this->responseData['message'] = 'No data.';
                $this->statusCode = REST_Controller::HTTP_OK;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function updateTask_put()
    {
        $id = $this->put('id') ? $this->put('id') : null;
        $formAction = $this->put('action');
        if ($id && $formAction == 'edit' && $this->_taskExists($this->put('taskName'), $id) === true) {
            $postdata = array(
                'task_name' => $this->put('taskName'),
                'task_status' => $this->put('status')
            );
            $where = array('id' => $this->put('id'));
            $res = $this->project_model->update($postdata, $where, 'project_tasks');
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Task has been updated successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->responseData['message'] = 'This task already exists in datadabse. Please try with different task.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function deleteTask_delete()
    {
        // $id = $_REQUEST['id'] ? $_REQUEST['id'] : null;
        // if ($id) {
        //     $where = array('id' => $id);
        //     $res = $this->project_model->delete($where);
        //     if ($res) {
        //         $this->responseData['status'] = 'success';
        //         $this->responseData['message'] = 'Data deleted successfully.';
        //         $this->statusCode = REST_Controller::HTTP_OK;
        //     } else {
        //         $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        //     }
        // } else {
        //     $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        // }

        $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        $this->response($this->responseData, $this->statusCode);
    }

    function _taskExists($taskName, $id=NULL)
    {
        return $this->project_model->is_unique_value($taskName, $id);
    }
}
