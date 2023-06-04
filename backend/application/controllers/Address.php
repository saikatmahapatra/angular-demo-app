<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Address extends App_Controller
{
    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        parent::__construct();
        $this->isAuthorized();
    }

    function addressTypeExists($str)
    {
        $result = $this->user_model->check_address_type_exists($this->getUserId(), $str);
        if ($result) {
            return true;
        }
        return false;
    }

    private function _getCityId($id, $newValue)
    {
        if ($id == '-1' && $newValue != '') {
            $id = $this->createNewSiteMeta('city', $newValue);
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

    function createAddress_post()
    {

        $addressTypeExists = $this->addressTypeExists($this->post('addressType'));
        $maxAllowedRecords = 2;
        $existingNoOfRecord = $this->app_model->getUserRecordCount($this->getUserId(), 'user_addresses');
        $formAction = $this->post('action');
        if ($formAction === 'add') {
            if($maxAllowedRecords == $existingNoOfRecord) {
                $this->responseData['status'] = 'error';
                $this->responseData['message'] = 'You have already added maximum allowed records. To add new, first you need to delete existing one.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            } else {
                if ($addressTypeExists) {
                    $this->responseData['status'] = 'error';
                    $this->responseData['message'] = 'The address type you selected is already added by you. Please select a different one.';
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                } else {
                    $cityId = $this->_getCityId($this->post('city'), $this->post('newCity'));
                    $postdata = array(
                        'user_id' => $this->getUserId(),
                        'address_type' => $this->post('addressType'),
                        'phone1' => $this->post('phone'),
                        'zip' => $this->post('zip'),
                        'locality' => $this->post('addressLine2'),
                        'address' => $this->post('addressLine1'),
                        'city' => $cityId,
                        'state' => $this->post('state'),
                        'landmark' => $this->post('landmark')
                    );
                    $res = $this->user_model->insert($postdata, 'user_addresses');
                    if ($res) {
                        $this->responseData['status'] = 'success';
                        $this->responseData['message'] = 'Address has been added successfully.';
                        $this->statusCode = REST_Controller::HTTP_CREATED;
                    } else {
                        $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                    }
                }
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getAddress_get()
    {

        $id = $this->get('id') ? $this->get('id') : null;
        $this->responseData['data']['address'] = $this->user_model->get_user_address($id, $this->getUserId(), NULL);
        if (isset($this->responseData['data']['address']) && sizeof($this->responseData['data']['address'])) {
            $this->statusCode = REST_Controller::HTTP_OK;
        } else {
            //$this->responseData['status'] = 'error';
            //$this->responseData['message'] = 'Invalid Data';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function updateAddress_put()
    {
        $id = $this->put('id') ? $this->put('id') : null;
        $cityId = $this->_getCityId($this->put('city'), $this->put('newCity'));
        $formAction = $this->put('action');
        if ($id && $formAction == 'edit') {
            $data = array(
                'phone1' => $this->put('phone'),
                'zip' => $this->put('zip'),
                'locality' => $this->put('addressLine2'),
                'address' => $this->put('addressLine1'),
                'city' => $cityId,
                'state' => $this->put('state'),
                'landmark' => $this->put('landmark')
            );
            $where = array('id' => $this->put('id'), 'user_id' => $this->getUserId());
            $res = $this->user_model->update($data, $where, 'user_addresses');
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Address has been updated successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function deleteAddress_delete()
    {
        $id = $_REQUEST['id'] ? $_REQUEST['id'] : null;
        if ($id) {
            $where = array('id' => $id, 'user_id' => $this->getUserId());
            $res = $this->user_model->delete($where, 'user_addresses');
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
