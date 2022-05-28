<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Common_lib.php';

/**
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Saikat Mahapatra
 * @license         MIT
 * @link            
 */
class API extends REST_Controller {
    
    var $apiResponse = array();
    var $statusCode = '';

    function __construct(){
        // Construct the parent class
        parent::__construct();

        // Load JWT Auth Lib
        $this->load->library('Authorization_Token');

        // Common Response Array
        $this->apiResponse = [];
        $this->apiResponse['status'] = '1';
        $this->apiResponse['message'] = '';           
        $this->apiResponse['data'] = '';
        $this->apiResponse['token'] = '';
        $this->statusCode = REST_Controller::HTTP_INTERNAL_SERVER_ERROR; 

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }

    function isLoggedIn() {
        $this->apiResponse['message'] = 'You are not logged in.';
        $this->statusCode = REST_Controller::HTTP_UNAUTHORIZED;
        $this->response($this->apiResponse, $this->statusCode);
        return false;
    }

    function isAuthorized() {
        $authTokenValidation = $this->authorization_token->validateToken();
        if($authTokenValidation['status'] == FALSE) {
            $this->apiResponse['status'] = '0';
            $this->apiResponse['message'] = $authTokenValidation['message'];
            $this->statusCode = REST_Controller::HTTP_UNAUTHORIZED;
            $this->response($this->apiResponse, $this->statusCode);
            return false;
        } else{
            return true;
        }
    }

    function validateToken_post(){
        $this->isAuthorized();
    }

    function test_get() {
        $payload = array('username' => 'Saikat', 'role'=> 'admin');
        $this->apiResponse['message'] = 'Its working, you can modify the API V1'; 
        $tokenData = $this->authorization_token->generateToken($payload);  
        $this->apiResponse['token'] = $tokenData;
        $this->response($this->apiResponse, $this->statusCode);
    }

    function users_get(){
        //$this->isLoggedIn();
        $this->isAuthorized();
        $data = array();        
        $id = $this->get('id') ? $this->get('id') : NULL;
        if ($id === NULL) {
            $result_array = $this->user_model->get_rows(NULL, NULL, NULL);
            $data = $result_array['data_rows'];
            if ($data) {                
                $this->apiResponse['data'] = $data;
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->apiResponse = '0';
                $this->apiResponse['message'] = 'No User Found';
                $this->apiResponse['data'] = $data;
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $result_array = $this->user_model->get_rows(NULL, NULL, $id);
            $data = $result_array['data_rows'];
            if ($data) {                
                $this->apiResponse['data'] = $data;
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->apiResponse = '0';
                $this->apiResponse['message'] = 'No User Found';
                $this->apiResponse['data'] = $data;
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        }
        $this->response($this->apiResponse, $this->statusCode);
    }

    function login_post(){
        $email = $this->post('userName');
        $password = md5($this->post('password'));
        //print_r($email); die();
        $validate = TRUE;
        if ($validate == TRUE) {
            $login_result = $this->user_model->authenticate_user($email, $password);
            if (isset($login_result) && $login_result['status'] != 'error') {
                $this->apiResponse['status'] = '1';
                $this->apiResponse['message'] = 'Login Successfull';
                //print_r($login_result['data']); die();
                $credData['userId'] = $login_result['data']['id'];
                $credData['userEmail'] = $login_result['data']['user_email'];
                $tokenData = $this->authorization_token->generateToken($credData);      
                $this->apiResponse['data'] = $login_result['data'];
                $this->apiResponse['token'] = $tokenData;
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->apiResponse['status'] = '0';
                $this->apiResponse['message'] = $login_result['message'];      
                $this->apiResponse['data'] = $login_result;
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->apiResponse['status'] = '0';
            $this->apiResponse['message'] = 'Form validation Error';
            $this->statusCode = REST_Controller::HTTP_OK;
        }

        $this->response($this->apiResponse, $this->statusCode);
    }



}
