<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Project extends App_Controller
{
    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        parent::__construct();
        $this->isAuthorized();
        $this->isUserAuthorized(array(
            'default-super-admin-access',
            'default-admin-access',
        ));
        $this->load->model('project_model');
    }

    function createProject_post()
    {
        $formAction = $this->post('action');
        $postdata = array(
            'project_number' => $this->post('projectNumber'),
            'project_name' => $this->post('projectName'),
            'project_desc' => $this->post('description'),
            'project_status' => $this->post('status'),
            'project_start_date' => $this->common_lib->convert_to_mysql($this->post('startDate')),
            'project_end_date' => $this->common_lib->convert_to_mysql($this->post('endDate')),
            'created_on' => date('Y-m-d H:i:s'),
            'created_by' => $this->getUserId()
        );

        if ($formAction === 'add') {
            $res = $this->project_model->insert($postdata);
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Project has been added successfully.';
                $this->statusCode = REST_Controller::HTTP_CREATED;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getProject_get()
    {
        $id = $this->get('id') ? $this->get('id') : null;
        $perPage = isset($_SERVER['HTTP_PERPAGE']) ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = isset($_SERVER['HTTP_PAGE']) ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;
        $totalRecords = $this->project_model->get_rows($id, false, null, null);
        $resultArray = $this->project_model->get_rows($id, true, $perPage, $offset);
        if (isset($resultArray)) {
            if (sizeof($resultArray['data_rows']) > 0) {
                $resultArray['num_rows'] = $totalRecords['num_rows'];
                $this->responseData['data'] = $resultArray;
                $this->statusCode = REST_Controller::HTTP_OK;
            }
            if (sizeof($resultArray['data_rows']) == 0) {
                $this->responseData['message'] = 'No data.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function updateProject_put()
    {
        $id = $this->put('id') ? $this->put('id') : null;
        $formAction = $this->put('action');
        if ($id && $formAction == 'edit') {
            $postdata = array(
                'project_number' => $this->put('projectNumber'),
                'project_name' => $this->put('projectName'),
                'project_desc' => $this->put('description'),
                'project_status' => $this->put('status'),
                'project_start_date' => $this->common_lib->convert_to_mysql($this->put('startDate')),
                'project_end_date' => $this->common_lib->convert_to_mysql($this->put('endDate')),
                'updated_on' => date('Y-m-d H:i:s'),
                'updated_by' => $this->getUserId()
            );
            $where = array('id' => $this->put('id'));
            $res = $this->project_model->update($postdata, $where);
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Project has been updated successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function deleteProject_delete()
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

    function projectDropdown_get() {
        $this->isAuthorized();
        $this->responseData['data']= $this->project_model->get_project_dropdown();
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }
}
