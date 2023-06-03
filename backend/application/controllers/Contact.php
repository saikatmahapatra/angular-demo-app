<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Contact extends App_Controller
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
        $this->responseData['data']['relation'] = $this->app_model->get_meta_dropdown(array('family_relationship'));
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    function _phoneExists($phone, $id=null) {
        return $this->user_model->check_is_phone_number_exists($phone, $id);
    }

    function createContact_post()
    {
        $maxAllowedRecords = 2;
        $existingNoOfRecord = $this->app_model->getUserRecordCount($this->getUserId(), 'user_emergency_contacts');
        if($maxAllowedRecords == $existingNoOfRecord) {
            $this->responseData['status'] = 'error';
            $this->responseData['message'] = 'You have already added maximum allowed records. To add new, first you need to delete existing one.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        } else {
            $formAction = $this->post('action');
            $phoneExits = $this->_phoneExists($this->post('phoneNo'));
            $postdata = array(
                'user_id' => $this->getUserId(),
                'contact_person_name' => $this->post('contactPersonName'),
                'contact_person_address' => $this->post('communicationAddress'),
                'relationship_with_contact' => $this->post('relationWithContact'),
                'contact_person_phone1' => $this->post('phoneNo')
            );
            if($phoneExits) {
                $this->responseData['message'] = 'This phone number is already present in some contact list. Please use a different phone number.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
            if ($formAction === 'add' && !$phoneExits) {
                $res = $this->user_model->insert($postdata, 'user_emergency_contacts');
                if ($res) {
                    $this->responseData['status'] = 'success';
                    $this->responseData['message'] = 'Emergency Contact has been added successfully.';
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

    function updateContact_put()
    {
        $formAction = $this->put('action');
        $id = $this->put('id');
        $phoneExits = $this->_phoneExists($this->put('phoneNo'), $id);
        $postdata = array(
            'user_id' => $this->getUserId(),
            'contact_person_name' => $this->put('contactPersonName'),
            'contact_person_address' => $this->put('communicationAddress'),
            'relationship_with_contact' => $this->put('relationWithContact'),
            'contact_person_phone1' => $this->put('phoneNo')
        );
        if($phoneExits) {
            $this->responseData['message'] = 'This phone number is already present in some contact list. Please use a different phone number.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        if ($formAction === 'edit' && !$phoneExits) {
            $where = array('id' => $id, 'user_id' => $this->getUserId());
            $res = $this->user_model->update($postdata, $where,'user_emergency_contacts');
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Emergency Contact has been updated successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getContact_get()
    {
        $id = $this->get('id') ? $this->get('id') : null;
        if ($id) {
            $this->responseData['data']['contact'] = $this->user_model->get_user_emergency_contacts($id, $this->getUserId());
            if (isset($this->responseData['data']['contact']) && sizeof($this->responseData['data']['contact'])) {
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

    function deleteContact_delete()
    {
        $id = $_REQUEST['id'] ? $_REQUEST['id'] : null;
        if ($id) {
            $where = array('id' => $id, 'user_id' => $this->getUserId());
            $res = $this->user_model->delete($where, 'user_emergency_contacts');
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
