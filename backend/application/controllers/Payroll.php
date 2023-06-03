<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Payroll extends App_Controller
{
    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        parent::__construct();
        $this->isAuthorized();
        $this->load->model('user_model');
    }

    function formData_get()
    {
        $this->responseData['data']['govtIDs'] = $this->user_model->get_user_national_identifiers($this->getUserId());
        $this->responseData['data']['banks'] = $this->app_model->get_meta_dropdown(array('bank'));
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    function _accountExists($accountNo, $id = null)
    {
        return $this->user_model->check_is_account_exists($this->getUserId(), $accountNo, $id);
    }

    function createPayroll_post()
    {
        $maxAllowedRecords = 1;
        $existingNoOfRecord = $this->app_model->getUserRecordCount($this->getUserId(), 'user_bank_account');
        if($maxAllowedRecords == $existingNoOfRecord) {
            $this->responseData['status'] = 'error';
            $this->responseData['message'] = 'You have already added maximum allowed records. To add new, first you need to delete existing one.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        } else {
            $formAction = $this->post('action');
            $accountExists = $this->_accountExists($this->post('accountNo'));
            $postdata = array(
                'user_id' => $this->getUserId(),
                'bank_id' => $this->post('bank'),
                'bank_account_no' => $this->post('accountNo'),
                'ifsc_code' => strtoupper($this->post('ifscCode'))
            );

            if ($accountExists) {
                $this->responseData['message'] = 'This account number already exists. Please use a different one.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
            if ($formAction === 'add' && !$accountExists) {
                $postdata_user = array(
                    'user_pan_no' => strtoupper($this->post('panNo')),
                    'user_uan_no' => $this->post('uanNo')
                );
                $where = array('user_id' => $this->getUserId());
                $resUpdateUser = $this->user_model->update($postdata_user, $where, 'user_meta');
                $res = $this->user_model->insert($postdata, 'user_bank_account');
                if ($res && $resUpdateUser) {
                    $this->responseData['status'] = 'success';
                    $this->responseData['message'] = 'Payroll information added successfully.';
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

    function updatePayroll_put()
    {
        $formAction = $this->put('action');
        $id = $this->put('id');
        $accountExists = $this->_accountExists($this->put('accountNo'), $id);
        $postdata = array(
            'bank_id' => $this->put('bank'),
            'bank_account_no' => $this->put('accountNo'),
            'ifsc_code' => strtoupper($this->put('ifscCode'))
        );
        if ($accountExists) {
            $this->responseData['message'] = 'This account number already exists. Please use a different one.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        if ($formAction === 'edit' && !$accountExists) {
            $postdata_user = array(
                'user_pan_no' => strtoupper($this->put('panNo')),
                'user_uan_no' => $this->put('uanNo')
            );
            $where = array('user_id' => $this->getUserId());
            $resUpdateUser = $this->user_model->update($postdata_user, $where, 'user_meta');

            $where = array('id' => $id, 'user_id' => $this->getUserId());
            $res = $this->user_model->update($postdata, $where, 'user_bank_account');
            if ($res && $resUpdateUser) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Payroll information updated successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getPayroll_get()
    {
        $id = $this->get('id') ? $this->get('id') : null;
        if ($id) {
            $this->responseData['data']['payrollInfo'] = $this->user_model->get_user_bank_account_details($id, $this->getUserId());
            if (isset($this->responseData['data']['payrollInfo']) && sizeof($this->responseData['data']['payrollInfo'])) {
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

    function deletePayroll_delete()
    {
        $id = $_REQUEST['id'] ? $_REQUEST['id'] : null;
        if ($id) {
            $where = array('id' => $id, 'user_id' => $this->getUserId());
            $res = $this->user_model->delete($where, 'user_bank_account');
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Data deleted successfully.';
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
