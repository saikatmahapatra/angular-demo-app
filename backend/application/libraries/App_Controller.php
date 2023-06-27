<?php

defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
class App_Controller extends REST_Controller
{

    var $responseData = array();
    var $statusCode = '';
    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        // Common Response Array
        $this->responseData = [];
        $this->responseData['status'] = null;
        $this->responseData['message'] = null;
        $this->responseData['data'] = null;
        $this->responseData['token'] = null;
        $this->statusCode = REST_Controller::HTTP_INTERNAL_SERVER_ERROR;

        // models
        $this->load->model('user_model');
        $this->load->model('app_model');
    }

    function isAuthorized()
    {
        $res = $this->authorization_token->validateToken();
        if ($res['status'] == FALSE) {
            $this->responseData['message'] = $res['message'];
            $this->statusCode = REST_Controller::HTTP_UNAUTHORIZED;
            $this->response($this->responseData, $this->statusCode);
        }
        if ($res['status'] == TRUE) {
            return $res['data'];
        }
    }

    function getUserId()
    {
        $res = $this->isAuthorized();
        return $res->userId;
    }

    function getUserRoleId()
    {
        $res = $this->isAuthorized();
        return $res->userRoleId;
    }

    function createNewSiteMeta($metaType, $metaValue)
    {
        $postdata = array(
            'meta_type' => $metaType,
            'meta_value' => trim($metaValue),
            'meta_created_by' => $this->getUserId()
        );
        //print_r($postdata); die();
        $countOfRecords = $this->app_model->checkIfExists($metaType, trim($metaValue));
        if ($countOfRecords == 0) {
            $insert_id = $this->app_model->insert($postdata, 'site_meta');
            return $insert_id;
        } else {
            return 'exists';
        }
    }

    function updateSiteMeta($id, $metaValue)
    {
        $postdata = array(
            'meta_value' => trim($metaValue),
            'meta_updated_by' => $this->getUserId(),
            'meta_updated_on' => date('Y-m-d H:i:s')
        );
        $where = array('id', $id);
        //print_r($postdata); die();
        $insert_id = $this->app_model->update($postdata, $where, 'site_meta');
        return $insert_id;
    }


    function checkRolePermissions($checkPermissions = array())
    {
        $matchCount = 0;
        $result = false;
        $userRoleId = $this->getUserRoleId();
        $arrUserPermissions = $this->user_model->get_user_permission($userRoleId);
        if (isset($checkPermissions) && count($checkPermissions) > 0) {
            if (isset($arrUserPermissions) && count($arrUserPermissions) > 0) {
                $matchCount = count(array_intersect($arrUserPermissions, $checkPermissions));
                if ($matchCount > 0) {
                    $result = true;
                } else {
                    $result = false;
                }
            } else {
                $result = false;
            }
        } else {
            $result = true;
        }

        if ($result == false) {
            $this->responseData['message'] = "You do not have permission to access ot perform this operation. You account might be blocked due to multiple attempts.";
            $this->statusCode = REST_Controller::HTTP_UNAUTHORIZED;
            $this->response($this->responseData, $this->statusCode);
        }
    }
}
