<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Srbac extends App_Controller
{
    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        parent::__construct();
        $this->isAuthorized();
        $this->load->model('user_model');
    }

    function getRoles_get()
    {
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $id = $this->get('id') ? $this->get('id') : null;

        $perPage = isset($_SERVER['HTTP_PERPAGE']) ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = isset($_SERVER['HTTP_PAGE']) ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;

        $totalRecords = $this->user_model->getRoles($id, null, null);
        $result_array = $this->user_model->getRoles($id, $perPage, $offset);


        if (isset($result_array)) {
            if (sizeof($result_array['data_rows']) > 0) {
                $result_array['num_rows'] = $totalRecords['num_rows'];
                $this->responseData['data'] = $result_array;
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->responseData['message'] = 'No results found.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getPermissions_get()
    {
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $id = $this->get('id') ? $this->get('id') : null;

        $perPage = isset($_SERVER['HTTP_PERPAGE']) ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = isset($_SERVER['HTTP_PAGE']) ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;

        $totalRecords = $this->user_model->getPermissions($id, null, null);
        $result_array = $this->user_model->getPermissions($id, $perPage, $offset);


        if (isset($result_array)) {
            if (sizeof($result_array['data_rows']) > 0) {
                $result_array['num_rows'] = $totalRecords['num_rows'];
                $this->responseData['data'] = $result_array;
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->responseData['message'] = 'No results found.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }
}
