<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Auth extends App_Controller
{

    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        parent::__construct();
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }

    function validateToken_post()
    {
        $this->isAuthorized();
    }

    function validateToken_get()
    {
        $this->isAuthorized();
    }

    function validateRolePermissions_get()
    {
        $this->isAuthorized();
        $roleId = $this->getUserRoleId();
        $this->responseData['data'] = array('roleId' => $roleId);
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    function authenticate_post()
    {
        $email = $this->post('userName');
        $password = md5($this->post('password'));
        //print_r($email); die();
        $validate = TRUE;
        if ($validate == TRUE) {
            $login_result = $this->user_model->authenticate_user($email, $password);
            if (isset($login_result) && $login_result['status'] != 'error') {
                $this->responseData['message'] = 'Login Successfull';
                //print_r($login_result['data']); die();
                $credData['userId'] = $login_result['data']['id'];
                $credData['userRoleId'] = $login_result['data']['user_role'];
                $credData['userEmail'] = $login_result['data']['user_email'];
                $tokenData = $this->authorization_token->generateToken($credData);
                $this->responseData['data'] = $login_result['data'];
                $this->responseData['token'] = $tokenData;
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->responseData['message'] = $login_result['message'];
                $this->responseData['data'] = $login_result;
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->responseData['message'] = 'Form validation Error';
            $this->statusCode = REST_Controller::HTTP_OK;
        }

        $this->response($this->responseData, $this->statusCode);
    }

    function logout_get()
    {
        $this->responseData['message'] = 'Logout Successfull';
        $credData['userId'] = null;
        $credData['userRoleId'] = null;
        $credData['userEmail'] = null;
        $tokenData = $this->authorization_token->generateToken($credData);
        $this->responseData['data'] = array();
        $this->responseData['token'] = $tokenData;
        $this->statusCode = REST_Controller::HTTP_OK;
        session_destroy();
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

    function checkEmail_post()
    {
        $email = $this->post('email');
        $action = $this->post('action');
        //print_r($email); die();
        $validate = TRUE;
        if ($validate == TRUE) {
            if ($action === 'forgotPassword' && $email) {
                if ($this->isEmailRegistered($email)) {
                    $password_reset_key = $this->common_lib->generate_rand_id(6, FALSE);
                    $postdata = array('user_reset_password_key' => md5($password_reset_key));
                    $where = array('user_email' => $email);
                    $result = $this->user_model->update($postdata, $where);
                    if ($result) {
                        $message_html = '';
                        $message_html .= '<p>Your password reset OTP is ' . $password_reset_key . '</p>';
                        $this->common_lib->sendEmail($email, "Password Reset OTP is " . $password_reset_key, $message_html);
                        $this->responseData['status'] = 'success';
                        $this->responseData['message'] = 'OTP has been sent to ' . $email;
                        $this->statusCode = REST_Controller::HTTP_OK;
                    } else {
                        $this->responseData['message'] = 'Error';
                        $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                    }
                } else {
                    $this->responseData['message'] = 'The email id is not registered with us. Please try with a correct email id.';
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                }
            } else {
                $this->responseData['message'] = 'Error';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->responseData['message'] = 'Form validation Error';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }

        $this->response($this->responseData, $this->statusCode);
    }

    function resetPassword_post()
    {
        $otp = md5($this->post('otp'));
        $email = $this->post('email');
        $password = md5($this->post('password'));
        $validate = TRUE;
        if ($validate == TRUE) {
            $isValidPasswordKey = $this->user_model->check_user_password_reset_key($email, $otp);
            if($isValidPasswordKey) {
                $postdata = array('user_password' => $password, 'user_reset_password_key' => NULL, 'password_updated_on' => date('Y-m-d H:i:s'));
                $where = array('user_email' => $email, 'user_reset_password_key' => $otp);
                $update_password = $this->user_model->update($postdata, $where);
                if ($update_password) {
                    $this->responseData['status'] = 'success';
                    $this->responseData['message'] = 'Password changed successfully.';
                    $this->statusCode = REST_Controller::HTTP_OK;
                } else {
                    $this->responseData['message'] = 'Unable to reset your password. Please try again.';
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                }
            } else {
                $this->responseData['message'] = 'You have entered incorrect OTP or email. Please try again.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }

            
        } else {
            $this->responseData['message'] = 'Form validation Error';
            $this->statusCode = REST_Controller::HTTP_OK;
        }
        $this->response($this->responseData, $this->statusCode);
    }

}
