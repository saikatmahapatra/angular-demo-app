<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Workexperience extends App_Controller
{
    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        parent::__construct();
        $this->isAuthorized();
    }

    function formData_get()
    {

        $this->responseData['data']['employer'] = $this->app_model->get_meta_dropdown(array('company'));
        $this->responseData['data']['designation'] = $this->app_model->get_meta_dropdown(array('designation'));
        $this->responseData['data']['jobLocation'] = $this->app_model->get_meta_dropdown(array('city'));
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    private function _getEmployerId($id, $newValue)
    {
        if ($id == '-1' && $newValue != '') { // add other value 
            $id =  $this->createNewSiteMeta('company', $newValue);

            if ($id == 'exists') {
                $this->responseData['status'] = 'error';
                $this->responseData['message'] = '"' . $newValue.'" already exists. Please verify from the list & choose accordingly.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                return $this->response($this->responseData, $this->statusCode);
            } else {
                return $id;
            }
        } else { // else return existing
            return $id;
        }
    }

    private function _getDesignationId($id, $newValue)
    {
        if ($id == '-1' && $newValue != '') {
            $id = $this->createNewSiteMeta('designation', $newValue);
            if ($id == 'exists') {
                $this->responseData['status'] = 'error';
                $this->responseData['message'] = '"' . $newValue.'" already exists. Please verify from the list & choose accordingly.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                return $this->response($this->responseData, $this->statusCode);
            } else {
                return $id;
            }
        } else { // else return existing
            return $id;
        }
    }

    function createExperience_post()
    {
        $maxAllowedRecords = 2;
        $existingNoOfRecord = $this->app_model->getUserRecordCount($this->getUserId(), 'user_work_exp');
        if($maxAllowedRecords == $existingNoOfRecord) {
            $this->responseData['status'] = 'error';
            $this->responseData['message'] = 'You have already added maximum allowed records. To add new, first you need to delete existing one.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        else {
            $formAction = $this->post('action');
            $employerId = $this->_getEmployerId($this->post('employer'), $this->post('newEmployer'));
            $designationId = $this->_getDesignationId($this->post('designation'), $this->post('newDesignation'));
            if ($formAction == 'add' && $employerId != null && $designationId != null) {
                $postdata = array(
                    'user_id' => $this->getUserId(),
                    'company_id' => $employerId,
                    'job_location_id' => $this->post('locationId'),
                    'from_date' => $this->common_lib->convert_to_mysql($this->post('fromDate')),
                    'to_date' => $this->common_lib->convert_to_mysql($this->post('toDate')),
                    'designation_id' => $designationId
                );
                //die($postdata);
                $res = $this->user_model->insert($postdata, 'user_work_exp');
                if ($res) {
                    $this->responseData['status'] = 'success';
                    $this->responseData['message'] = 'Job experience has been added successfully.';
                    $this->statusCode = REST_Controller::HTTP_CREATED;
                } else {
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                }
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function updateExperience_put()
    {
        $id = $this->put('id');
        $formAction = $this->put('action');
        $employerId = $this->_getEmployerId($this->put('employer'), $this->put('newEmployer'));
        $designationId = $this->_getDesignationId($this->put('designation'), $this->put('newDesignation'));
        if (isset($id) && $formAction == 'edit' && $employerId != null && $employerId != null) {
            $postdata = array(
                'company_id' => $employerId,
                'job_location_id' => $this->put('locationId'),
                'from_date' => $this->common_lib->convert_to_mysql($this->put('fromDate')),
                'to_date' => $this->common_lib->convert_to_mysql($this->put('toDate')),
                'designation_id' => $designationId
            );
            $where = array('id' => $id, 'user_id' => $this->getUserId());
            $res = $this->user_model->update($postdata, $where, 'user_work_exp');
            if ($res) {
                $this->responseData['message'] = 'Job experience has been updated successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getExperience_get()
    {
        $id = $this->get('id') ? $this->get('id') : null;
        if (isset($id)) {
            $this->responseData['data']['jobExp'] = $this->user_model->get_user_work_experience($id, $this->getUserId());
            if (isset($this->responseData['data']['jobExp']) && sizeof($this->responseData['data']['jobExp'])) {
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->responseData['status'] = 'error';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
            $this->response($this->responseData, $this->statusCode);
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
    }

    function deleteExperience_delete()
    {
        $id = $_REQUEST['id'] ? $_REQUEST['id'] : null;
        if (isset($id)) {
            $where = array('id' => $id, 'user_id' => $this->getUserId());
            $res = $this->user_model->delete($where, 'user_work_exp');
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Job experience has been deleted successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }
}
