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
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $this->load->model('project_model');
    }

    function createProject_post()
    {
        $formAction = $this->post('action');
        $category = explode('-', $this->post('category'));
        $postdata = array(
            'project_code' => $this->post('projectCode'),
            'project_name' => $this->post('projectName'),
            'project_desc' => $this->post('description'),
            'project_status' => $this->post('status'),
            'project_start_date' => $this->common_lib->convert_to_mysql($this->post('startDate')),
            'project_end_date' => $this->post('endDate') ? $this->common_lib->convert_to_mysql($this->post('endDate')) : null,
            'created_on' => date('Y-m-d H:i:s'),
            'created_by' => $this->getUserId(),
            'project_category_id' => $category ? $category[0] : null,
            'project_commencement_year' => $this->post('commencementYear'),
            'project_serial_no' => $this->post('refNumber')
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
        $category = explode('-', $this->put('category'));
        if ($id && $formAction == 'edit') {
            $postdata = array(
                'project_code' => $this->put('projectCode'),
                'project_name' => $this->put('projectName'),
                'project_desc' => $this->put('description'),
                'project_status' => $this->put('status'),
                'project_start_date' => $this->common_lib->convert_to_mysql($this->put('startDate')),
                'project_end_date' => $this->put('endDate') ? $this->common_lib->convert_to_mysql($this->put('endDate')) : null,
                'updated_on' => date('Y-m-d H:i:s'),
                'updated_by' => $this->getUserId(),
                'project_category_id' => $category ? $category[0] : null,
                'project_commencement_year' => $this->put('commencementYear'),
                'project_serial_no' => $this->put('refNumber')
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

    function formData_get() {
        $this->isAuthorized();
        $this->responseData['data']['projectType']= $this->app_model->get_meta_dropdown(array('project_type'), true);
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }
}
