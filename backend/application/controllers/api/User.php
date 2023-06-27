<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class User extends App_Controller
{

    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        parent::__construct();
        $this->load->model('leave_model');
        $this->load->model('app_model');
    }

    function getUser_get()
    {
        $this->isAuthorized();
        $id = $this->get('id') ? $this->get('id') : NULL;
        $pageName = $this->get('pageName') ? $this->get('pageName') : NULL;

        $this->checkRolePermissions(array(
            'adminAccess',
        ));


        $perPage = $_SERVER['HTTP_PERPAGE'] ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = $_SERVER['HTTP_PAGE'] ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;
        $searchKeywords = $this->get('keywords') ? trim($this->get('keywords')) : NULL;
        $totalRecords = $this->user_model->get_rows($id, false,  NULL, NULL, TRUE, FALSE, 'U', TRUE, $searchKeywords);
        $result_array = $this->user_model->get_rows($id, true,  $perPage, $offset, TRUE, FALSE, 'U', TRUE, $searchKeywords);
        if ($result_array['data_rows']) {
            $result_array['num_rows'] = $totalRecords['num_rows'];
            $this->responseData['data'] = $result_array;
            $this->statusCode = REST_Controller::HTTP_OK;
        } else {
            $this->responseData['message'] = 'No result found';
            $this->responseData['data'] = null;
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getEmp_get()
    {
        $this->isAuthorized();
        $id = $this->get('id') ? $this->get('id') : NULL;
        $searchKeywords = $this->get('keywords') ? trim($this->get('keywords')) : NULL;
        $perPage = $_SERVER['HTTP_PERPAGE'] ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = $_SERVER['HTTP_PAGE'] ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;

        $totalRecords = $this->user_model->get_rows($id, false, NULL, NULL, FALSE, FALSE, 'U', FALSE, $searchKeywords);
        $result_array = $this->user_model->get_rows($id, true, $perPage, $offset, FALSE, FALSE, 'U', FALSE, $searchKeywords);
        if ($result_array['data_rows']) {
            $result_array['num_rows'] = $totalRecords['num_rows'];
            $this->responseData['data'] = $result_array;
            $this->statusCode = REST_Controller::HTTP_OK;
        } else {
            $this->responseData['message'] = 'No result found';
            $this->responseData['data'] = null;
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function userFormData_get()
    {
        $this->isAuthorized();
        $this->responseData['data']['designations'] = $this->app_model->get_meta_dropdown(array('designation'));
        $this->responseData['data']['departments'] = $this->app_model->get_meta_dropdown(array('department'));
        $this->responseData['data']['employmentTypes'] = $this->app_model->get_meta_dropdown(array('employment_type'));
        $this->responseData['data']['states'] = $this->app_model->get_meta_dropdown(array('state'));
        $this->responseData['data']['cities'] = $this->app_model->get_meta_dropdown(array('city'));
        $this->responseData['data']['workspace_solution'] = $this->app_model->get_meta_dropdown(array('workspace_solution'));
        $this->responseData['data']['work_location'] = $this->app_model->get_meta_dropdown(array('work_location'));
        //$this->responseData['data']['work_zone'] = $this->app_model->get_meta_dropdown(array('work_zone'));
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    function userDropdown_get()
    {
        $this->isAuthorized();
        $this->responseData['data'] = $this->user_model->get_user_dropdown();
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    function createUser_post()
    {
        $this->isAuthorized();
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $validate = TRUE;
        if ($validate == TRUE) {
            $activation_token = $this->common_lib->generate_rand_id(6, FALSE);
            $user_uid = $this->user_model->get_new_emp_id();
            $password = $this->common_lib->generate_rand_id();
            $email = strtolower($this->post('workEmail'));
            $isRegistered = $this->isEmailRegistered($email);
            if ($isRegistered) {
                $this->responseData['status'] = 'error';
                $this->responseData['message'] = $email . '</u> is already registered.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            } else {
                $designationId = $this->post('designation');
                $newVal = $this->post('newDesignation');
                if ($designationId == '-1' && trim($newVal) != '') {
                    $designationId = $this->createNewSiteMeta('designation', trim($newVal));
                    if ($designationId == 'exists') {
                        $this->responseData['status'] = 'error';
                        $this->responseData['message'] = '"' . $newVal.'" already exists. Please verify from the list & choose accordingly.';
                        $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                        return $this->response($this->responseData, $this->statusCode);
                    }
                }

                $postdata = array(
                    'user_full_name' => ucwords(strtolower(trim($this->post('fullName')))),
                    'user_email' => $email,
                    'user_phone' => $this->post('personalPhone'),
                    'user_role' => $this->post('role') ? $this->post('role') : '3',
                    'user_password' => md5($password),
                    'user_activation_key' => md5($activation_token),
                    'user_status' => 'Y',
                    'user_created_on' => date('Y-m-d H:i:s'),
                    'user_uid' => $user_uid
                );
                $insert_id_pk = $this->user_model->insert($postdata);

                if($insert_id_pk) {
                    $userMetaPostdata = array(
                        'user_id' => $insert_id_pk,
                        'user_gender' => $this->post('gender'),
                        'user_email2' => strtolower($this->post('personalEmail')),
                        'user_dob' => $this->common_lib->convert_to_mysql($this->post('dateOfBirth')),
                        'user_doj' => $this->common_lib->convert_to_mysql($this->post('dateOfJoining')),
                        'user_department' => $this->post('department'),
                        'user_designation' => $designationId,
                        'user_employment_type' => $this->post('employmentType'),
                        //'user_phone2' => $this->post('workPhone'),
                        'user_workspace_solution_type' => $this->post('workspaceSolution'),
                        'user_work_base_location_id' => $this->post('baseWorkLocation'),
                    );
                    $insert_id_meta = $this->user_model->insert($userMetaPostdata, 'user_meta');
                }

                if ($insert_id_meta && $insert_id_pk) {
                    // employee copy
                    $message = "Hello, <br>";
                    $message .= '<p>Welcome to United Exploration India Pvt Ltd. Your employee portal account has been created successfully. Please find login information given below.</p>';
                    $message .= '<table rules="all" style="border-color: #666;" cellpadding="10" border="1">';
                    $message .= "<tr><td><strong>Name:</strong> </td><td>" . ucwords(strtolower($this->post('firstName'))) . " " . ucwords(strtolower($this->post('lastName'))) . "</td></tr>";
                    $message .= "<tr><td><strong>Employee ID:</strong> </td><td>" . $user_uid . "</td></tr>";
                    $message .= "<tr><td><strong>Login URL:</strong> </td><td>http://portal.ueipl.co.in</td></tr>";
                    $message .= "<tr><td><strong>Username/Email:</strong> </td><td>" . $email . "</td></tr>";
                    $message .= "<tr><td><strong>Password:</strong> </td><td>" . $password . "</td></tr>";
                    $message .= "</table>";
                    $this->common_lib->sendEmail($email, "Welcome to UEIPL - Employee Portal Account Created", $message);

                    // admin copy
                    $message = "";
                    $message .= '<p>Employee portal account has been created for the below employee. Login information has been sent to the employee.</p>';
                    $message .= '<table rules="all" style="border-color: #666;" cellpadding="10" border="1">';
                    $message .= "<tr><td><strong>First Name:</strong> </td><td>" . ucwords(strtolower($this->post('firstName'))) . "</td></tr>";
                    $message .= "<tr><td><strong>Last Name:</strong> </td><td>" . ucwords(strtolower($this->post('lastName'))) . "</td></tr>";
                    $message .= "<tr><td><strong>Employee ID:</strong> </td><td>" . $user_uid . "</td></tr>";
                    $message .= "<tr><td><strong>Registered Email:</strong> </td><td>" . $email . "</td></tr>";
                    $message .= "<tr><td><strong>DOJ:</strong> </td><td>" . $this->post('dateOfJoining') . "</td></tr>";
                    $message .= "</table>";
                    $this->common_lib->sendEmail($this->config->item('app_admin_email'), "Employee Portal Account Created", $message);

                    $this->responseData['status'] = 'success';
                    $this->responseData['message'] = 'Employee Portal account created successfully. System generated Emp ID is <span class="font-weight-bold h5">' . $user_uid . '</span>. Account activation link has been sent to <span class="font-weight-bold">' . $email . '</span>. Employee need to  activate employee portal account before first time login.';
                    $this->statusCode = REST_Controller::HTTP_CREATED;
                } else {
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                }
            }
        } else {
            $this->responseData['message'] = 'Form validation Error';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }

        $this->response($this->responseData, $this->statusCode);
    }

    function isEmailRegistered($email)
    {
        $res = $this->user_model->check_is_email_registered($email);
        if ($res) {
            return true;
        } else {
            return false;
        }
    }

    function userDetails_get()
    {
        $this->isAuthorized();
        $pageName = $this->get('pageName') ? $this->get('pageName') : NULL;
        $isAdmin = $pageName === 'viewEmpProfile' ? TRUE : FALSE;
        if ($pageName == 'viewEmpProfile') {
            $this->checkRolePermissions(array(
                'adminAccess',
            ));
            $userId = $this->get('id') ? $this->get('id') : NULL;
        } else {
            $userId = $this->getUserId();
        }
        //print_r($userId);
        $selfAccount = $this->getUserId() == $userId ? true : false;
        if ($userId && $pageName) {
            $rows = $this->user_model->get_rows($userId, false, NULL, NULL, $isAdmin, TRUE, NULL, TRUE);
            if (sizeof($rows['data_rows']) > 0) {
                $this->responseData['data']['user'] = $rows['data_rows'];
                $this->responseData['data']['selfAccount'] = $selfAccount;
                $this->responseData['data']['address'] = $this->user_model->get_user_address(NULL, $userId, NULL);
                $this->responseData['data']['econtact'] = $this->user_model->get_user_emergency_contacts(NULL, $userId);
                $this->responseData['data']['education'] = $this->user_model->get_user_education(NULL, $userId);
                $this->responseData['data']['workExp'] = $this->user_model->get_user_work_experience(NULL, $userId);
                $this->responseData['data']['userGovtIds'] = $this->user_model->get_user_national_identifiers($userId);
                $this->responseData['data']['payrollInfo'] = $this->user_model->get_user_bank_account_details(NULL, $userId);
                $this->responseData['data']['approvers'] = $this->user_model->get_user_approvers($userId);
                $this->responseData['data']['leaveBalance'] = $this->leave_model->get_leave_balance($userId);
                $this->responseData['status'] = 'success';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->responseData['status'] = 'error';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->responseData['status'] = 'error';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function isValidCurrentPassword($password)
    {
        $userId = $this->getUserId();
        if ($password) {
            $result = $this->user_model->check_user_password_valid(md5($password), $userId);
            if ($result) {
                return true;
            } else {
                return false;
            }
        }
    }

    function changePassword_post()
    {
        $this->isAuthorized();
        $currentPassword = $this->post('currentPassword');
        $newPassword = $this->post('confirmPassword');
        $action = $this->post('action');
        $userId = $this->getUserId();
        //print_r($email); die();
        $validate = TRUE;
        if ($validate == TRUE) {
            if ($action === 'changePassword' && $currentPassword && $newPassword) {
                if ($this->isValidCurrentPassword($currentPassword)) {
                    $postdata = array('user_password' => md5($newPassword), 'password_updated_on' => date('Y-m-d H:i:s'));
                    $where = array('id' => $userId);
                    $res = $this->user_model->update($postdata, $where);
                    $this->responseData['status'] = 'success';
                    $this->responseData['message'] = 'Password changed successfully.';
                    $this->statusCode = REST_Controller::HTTP_OK;
                } else {
                    $this->responseData['message'] = 'You have entered incorrect current password. Please try again.';
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                }
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->responseData['message'] = 'Form validation Error';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }

        $this->response($this->responseData, $this->statusCode);
    }

    function userData_get()
    {
        //print_r($this->get()); die();
        $this->isAuthorized();
        $userId = $this->get('id') ? $this->get('id') : $this->getUserId();
        $selfAccount = false;
        if ($this->getUserId() == $userId) {
            $selfAccount = true;
        }
        if ($userId) {
            $rows = $this->user_model->get_rows($userId, false, NULL, NULL, FALSE, TRUE, NULL, TRUE);
            if (sizeof($rows['data_rows']) > 0) {
                $this->responseData['data']['user'] = $rows['data_rows'];
                $this->responseData['status'] = 'success';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->responseData['status'] = 'error';
                //$this->responseData['message'] = 'We\'re sorry! Unable to process your request at this moment. Please try after sometime.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->responseData['status'] = 'error';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function updateUserData_patch()
    {
        $this->isAuthorized();
        if ($this->patch('id')) {
            $postdata = array(
                'user_phone' => $this->patch('personalPhone')
            );
            $where = array('id' => $this->patch('id'));
            $res = $this->user_model->update($postdata, $where);

            $postdata2 = array(
                'user_phone2' => $this->patch('workPhone'),
                'user_email2' => $this->patch('personalEmail'),
                'user_blood_group' => $this->patch('bloodGroup'),
            );
            $where2 = array('user_id' => $this->patch('id'));
            $res2 = $this->user_model->update($postdata2, $where2, 'user_meta');

            if ($res || $res2) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Profile Information has been updated successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function updateUser_post()
    {
        $this->isAuthorized();
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        if ($this->post('id')) {
            $designationId = $this->post('designation');
            $newVal = $this->post('newDesignation');
            if ($designationId == '-1' && trim($newVal) != '') {
                $designationId = $this->createNewSiteMeta('designation', trim($newVal));
                if ($designationId == 'exists') {
                    $this->responseData['status'] = 'error';
                    $this->responseData['message'] = '"' . $newVal.'" already exists. Please verify from the list & choose accordingly.';
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                    return $this->response($this->responseData, $this->statusCode);
                }
            }
            $postdata = array(
                'user_full_name' => ucwords(strtolower($this->post('fullName'))),
                'user_role' => $this->post('role') ? $this->post('role') : '3'
            );
            $where = array('id' => $this->post('id'));
            $res = $this->user_model->update($postdata, $where);

            // update meta
            $postdata2 = array(
                'user_gender' => $this->post('gender'),
                'user_dob' => $this->common_lib->convert_to_mysql($this->post('dateOfBirth')),
                'user_doj' => $this->common_lib->convert_to_mysql($this->post('dateOfJoining')),
                'user_department' => $this->post('department'),
                'user_designation' => $designationId,
                'user_employment_type' => $this->post('employmentType'),
                'user_phone2' => $this->post('workPhone'),
                'user_workspace_solution_type' => $this->post('workspaceSolution'),
                'user_work_base_location_id' => $this->post('baseWorkLocation')
            );
            $where2 = array('user_id' => $this->post('id'));
            $res2 = $this->user_model->update($postdata2, $where2, 'user_meta');
            if ($res || $res2) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Employee Profile Information has been updated successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function updateUserStatus_post()
    {
        $this->isAuthorized();
        $this->checkRolePermissions(array(
            'adminAccess',
        ));

        if ($this->post('id')) {
            if ($this->post('id') !== $this->getUserId()) {
                $postdata = array(
                    'user_status' => $this->post('accountStatus'),
                    'user_status_updated_on' => date('Y-m-d H:i:s'),
                    'user_status_updated_by' => $this->getUserId()
                );
                $where = array('id' => $this->post('id'));
                $res = $this->user_model->update($postdata, $where);

                // update meta
                $postdata2 = array();
                $res2 = false;
                if ($this->post('accountStatus') == 'A') {
                    $postdata2['user_dor'] = $this->common_lib->convert_to_mysql($this->post('dateOfRelease'));
                    $where2 = array('user_id' => $this->post('id'));
                    $res2 = $this->user_model->update($postdata2, $where2, 'user_meta');
                }

                if ($res || $res2) {
                    $this->responseData['status'] = 'success';
                    $this->responseData['message'] = 'Account Status has been updated successfully.';
                    $this->statusCode = REST_Controller::HTTP_OK;
                } else {
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                }
            } else {
                $this->responseData['message'] = 'Self account status change is not allowed.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function search_post()
    {
        $this->isAuthorized();
        $keywords = $this->post('keywords');
        $action = $this->post('action');
        $validate = TRUE;
        if ($validate == TRUE) {
            if ($action === 'search' && $keywords) {
                $perPage = isset($_SERVER['HTTP_PERPAGE']) ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
                $currentPageIndex = isset($_SERVER['HTTP_PAGE']) ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
                $offset = $currentPageIndex * $perPage;
                $totalRecords = $this->user_model->search_users($keywords);
                $result = $this->user_model->search_users($keywords, TRUE, $perPage, $offset);
                if (isset($result) && sizeof($result) > 0) {
                    $this->responseData['status'] = 'success';
                    $this->responseData['message'] = 'Result found.';
                    $result['num_rows'] = $totalRecords['num_rows'];
                    $this->responseData['data'] = $result;
                    $this->statusCode = REST_Controller::HTTP_OK;
                } else {
                    $this->responseData['message'] = 'Sorry, we are unable to find the employee.';
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                }
            } else {
                $this->responseData['message'] = 'Please enter valid employee name or ID';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->responseData['message'] = 'Form validation Error';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }

        $this->response($this->responseData, $this->statusCode);
    }

    function approvers_get()
    {
        $this->isAuthorized();
        $userId = $this->getUserId();
        if ($userId) {
            $this->data['approvers'] = $this->user_model->get_user_approvers($userId);
            if (sizeof($this->data['approvers']) > 0) {
                $this->responseData['data'] = $this->data['approvers'];
                $this->responseData['status'] = 'success';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->responseData['message'] = 'You do not have any approvers. Please set approvers searching approvers name.';
                $this->statusCode = REST_Controller::HTTP_OK;
            }
        } else {
            $this->responseData['status'] = 'error';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function changeApprovers_post()
    {
        $this->isAuthorized();
        $userId = $this->getUserId();
        $userDetails = $this->post('userDetails');
        $validate = TRUE;
        if ($validate == TRUE) {
            if ($this->post('approverType') == 'L1') {
                $postdata = array(
                    'user_supervisor_id' => $userDetails['id']
                );
            }
            if ($this->post('approverType') == 'L2') {
                $postdata = array(
                    'user_director_approver_id' => $userDetails['id']
                );
            }
            if ($this->post('approverType') == 'HR') {
                $postdata = array(
                    'user_hr_approver_id' => $userDetails['id']
                );
            }
            if ($this->post('approverType') == 'FIN') {
                $postdata = array(
                    'user_finance_approver_id' => $userDetails['id']
                );
            }
            $postdata['user_approver_updated_on'] = date('Y-m-d H:i:s');
            $postdata['user_approver_updated_by'] = $this->getUserId();
            $where = array('user_id' => $userId);
            $res = $this->user_model->update($postdata, $where, 'user_meta');
            if ($res) {
                $this->responseData['message'] = 'Workflow approvers updated successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
            }
        } else {
            $this->responseData['message'] = 'Form validation Error';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }

        $this->response($this->responseData, $this->statusCode);
    }

    function getReportees_get()
    {
        $this->isAuthorized();
        $perPage = isset($_SERVER['HTTP_PERPAGE']) ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = isset($_SERVER['HTTP_PAGE']) ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;
        $totalRecords = $this->user_model->get_reportee_employee($this->getUserId(), NULL, NULL, NULL);
        $result = $this->user_model->get_reportee_employee($this->getUserId(), NULL, $perPage, $offset);
        if ($totalRecords > 0) {
            $result['num_rows'] = $totalRecords['num_rows'];
            $this->responseData['data'] = $result;
            $this->statusCode = REST_Controller::HTTP_OK;
        } else {
            $this->responseData['message'] = 'No records found';
            $this->statusCode = REST_Controller::HTTP_OK;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function saveLeaveBalance_post()
    {
        $this->isAuthorized();
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $userId = $this->post('userId') ? $this->post('userId') : null;
        if ($userId) {
            $postdata = array(
                'cl' => $this->post('cl'),
                'sl' => $this->post('sl'),
                'pl' => $this->post('pl'),
                'ol' => $this->post('ol'),
                'co' => $this->post('co'),
                'leave_balance_updated_by' => $this->getUserId(),
                'leave_balance_updated_on' => date('Y-m-d H:i:s')
            );
            $where = array('user_id' => $userId);
            $updated = $this->user_model->update($postdata, $where, 'user_meta');
            if ($updated) {
                $this->responseData['message'] = 'Leave balance updated.';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function userAnalytics_post()
    {
        $this->isAuthorized();
        $userId = $this->post('entityId') ? $this->post('entityId') : $this->getUserId();
        if($this->getUserRoleId() !== '1' && $userId !== $this->getUserId()) {
            //$this->responseData['message'] = 'You are not authorized to view this page';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        } else {
            $action = $this->post('action') ? $this->post('action') : null;
            $duration = $this->post('duration') ? $this->post('duration') : null;

            $dateRange = $this->post('dateRange') ? $this->post('dateRange') : null;
            $fromDate = $dateRange[0] ? date("Y-m-d", strtotime($dateRange[0])) : NULL;
            $toDate = $dateRange[1] ? date("Y-m-d", strtotime($dateRange[1])) : NULL;

            $resultArrayTask = $this->user_model->getUserDataChart($userId, $duration, $fromDate, $toDate, 'task');
            $resultArrayProject = $this->user_model->getUserDataChart($userId, $duration, $fromDate, $toDate, 'project');
            if (isset($resultArrayTask) && isset($resultArrayProject)) {
                $this->responseData['data'] = $resultArrayTask;
                $this->responseData['dataProject'] = $resultArrayProject;
                $this->statusCode = REST_Controller::HTTP_OK;
            }
            else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        }
        
        $this->response($this->responseData, $this->statusCode);
    }
}
