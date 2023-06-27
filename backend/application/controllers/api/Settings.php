<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Settings extends App_Controller
{
    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        parent::__construct();
        $this->isAuthorized();
        $this->load->model('settings_model');
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
    }

    function updateSiteSettings_put()
    {
        $formAction = $this->put('action');
        $postdata = array(
            'timesheetMinDays' => $this->put('timesheetMinDays'),
            'timesheetMaxDays' => $this->put('timesheetMaxDays'),
            'emailNotifyDistro' => $this->put('emailNotifyDistro')
        );
        if ($formAction === 'updateSettings') {
            $res = $this->settings_model->update_options($postdata);
            
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Settings updated successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getSiteSettings_get()
    {
        $this->responseData['data'] = $this->settings_model->get_option();
        if (isset($this->responseData['data'])) {
            $this->responseData['status'] = 'success';
            $this->statusCode = REST_Controller::HTTP_OK;
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }
}
