<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Academic extends App_Controller
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
        
        $this->responseData['data']['qualification'] = $this->app_model->get_meta_dropdown(array('qualification'));
        $this->responseData['data']['degree'] = $this->app_model->get_meta_dropdown(array('degree'));
        $this->responseData['data']['inst'] = $this->app_model->get_meta_dropdown(array('institute'));
        $this->responseData['data']['specialization'] = $this->app_model->get_meta_dropdown(array('specialization'));
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    function createAcademicRecord_post()
    {
        $maxAllowedRecords = 1;
        $existingNoOfRecord = $this->app_model->getUserRecordCount($this->getUserId(), 'user_academics');
        if($maxAllowedRecords == $existingNoOfRecord) {
            $this->responseData['status'] = 'error';
            $this->responseData['message'] = 'You have already added maximum allowed records. To add new, first you need to delete existing one.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        } else {
            $degreeId = $this->post('degree');
            $specializationId = $this->post('specialization');
            $instituteId = $this->post('institute');
            if ($degreeId == '-1' && $this->post('newDegree') != '') {
                $val = $this->post('newDegree');
                $degreeId = $this->createNewSiteMeta('degree', $val);
                if ($degreeId == 'exists') {
                    $this->responseData['status'] = 'error';
                    $this->responseData['message'] = '"' . $val.'" already exists. Please verify from the list & choose accordingly.';
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                    return $this->response($this->responseData, $this->statusCode);
                }
            }
            if ($specializationId == '-1' && $this->post('newSpecialization') != '') {
                $val = $this->post('newSpecialization');
                $specializationId = $this->createNewSiteMeta('specialization', $val);
                if ($specializationId == 'exists') {
                    $this->responseData['status'] = 'error';
                    $this->responseData['message'] = '"' . $val.'" already exists. Please verify from the list & choose accordingly.';
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                    return $this->response($this->responseData, $this->statusCode);
                }
            }
            if ($instituteId == '-1' && $this->post('newInstitute') != '') {
                $val = $this->post('newInstitute');
                $instituteId = $this->createNewSiteMeta('institute', $val);
                if ($instituteId == 'exists') {
                    $this->responseData['status'] = 'error';
                    $this->responseData['message'] = '"' . $val.'" already exists. Please verify from the list & choose accordingly.';
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                    return $this->response($this->responseData, $this->statusCode);
                }
            }
            if ($degreeId != null && $specializationId != null && $instituteId != null) {
                $postdata = array(
                    'user_id' => $this->getUserId(),
                    'academic_degree' => $degreeId,
                    'academic_specialization' => $specializationId,
                    'academic_institute' => $instituteId,
                    //'academic_from_year' => $this->post('fromYear'),
                    'academic_to_year' => $this->post('toYear'),
                    'academic_marks_percentage' => $this->post('marks')
                );
                $res = $this->user_model->insert($postdata, 'user_academics');
            }
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Education details has been added successfully.';
                $this->statusCode = REST_Controller::HTTP_CREATED;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function updateAcademicRecord_put()
    {
        
        $id = $this->put('id');
        $degreeId = $this->put('degree');
        $specializationId = $this->put('specialization');
        $instituteId = $this->put('institute');
        if ($degreeId == '-1' && $this->put('newDegree') != '') {
            $val = $this->put('newDegree');
            $degreeId = $this->createNewSiteMeta('degree', $val);
            if ($degreeId == 'exists') {
                $this->responseData['status'] = 'error';
                $this->responseData['message'] = '"' . $val.'" already exists. Please verify from the list & choose accordingly.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                return $this->response($this->responseData, $this->statusCode);
            }
        }
        if ($specializationId == '-1' && $this->put('newSpecialization') != '') {
            $val = $this->put('newSpecialization');
            $specializationId = $this->createNewSiteMeta('specialization', $val);
            if ($specializationId == 'exists') {
                $this->responseData['status'] = 'error';
                $this->responseData['message'] = '"' . $val.'" already exists. Please verify from the list & choose accordingly.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                return $this->response($this->responseData, $this->statusCode);
            }
        }
        if ($instituteId == '-1' && $this->put('newInstitute') != '') {
            $val = $this->put('newInstitute');
            $instituteId = $this->createNewSiteMeta('institute', $val);
            if ($instituteId == 'exists') {
                $this->responseData['status'] = 'error';
                $this->responseData['message'] = '"' . $val.'" already exists. Please verify from the list & choose accordingly.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                return $this->response($this->responseData, $this->statusCode);
            }
        }
        if ($degreeId != null && $specializationId != null && $instituteId != null) {
            $postdata = array(
                'academic_degree' => $degreeId,
                'academic_specialization' => $specializationId,
                'academic_institute' => $instituteId,
                //'academic_from_year' => $this->put('fromYear'),
                'academic_to_year' => $this->put('toYear'),
                'academic_marks_percentage' => $this->put('marks')
            );
            $where = array('id' => $id, 'user_id' => $this->getUserId());
            $res = $this->user_model->update($postdata, $where, 'user_academics');
        }
        if ($res) {
            $this->responseData['status'] = 'success';
            $this->responseData['message'] = 'Education details has been updated successfully.';
            $this->statusCode = REST_Controller::HTTP_OK;
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getAcademicRecord_get()
    {
        
        $id = $this->get('id') ? $this->get('id') : null;
        if ($id) {
            $this->responseData['data']['education'] = $this->user_model->get_user_education($id, $this->getUserId());
            if (isset($this->responseData['data']['education']) && sizeof($this->responseData['data']['education'])) {
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

    function deleteAcademicRecord_delete()
    {
        
        $id = $_REQUEST['id'] ? $_REQUEST['id'] : null;
        if ($id) {
            $where = array('id' => $id, 'user_id' => $this->getUserId());
            $res = $this->user_model->delete($where, 'user_academics');
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
