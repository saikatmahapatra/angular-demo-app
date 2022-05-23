<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age:86400');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token,  Accept, Authorization, X-Requested-With');
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';

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
class V1 extends REST_Controller {
    
    var $api_response = array();
    var $http_status_code = '';

    function __construct(){
        // Construct the parent class
        parent::__construct();

        // Load JWT Auth Lib
        $this->load->library('Authorization_Token');

        // Common Response Array
        $this->api_response = [];
        $this->api_response['status'] = '1';
        $this->api_response['message'] = '';           
        $this->api_response['data'] = '';
        $this->api_response['token'] = '';
        $this->http_status_code = REST_Controller::HTTP_INTERNAL_SERVER_ERROR; 

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }

    function isLoggedIn() {
        $this->api_response['message'] = 'You are not logged in.';
        $this->http_status_code = REST_Controller::HTTP_UNAUTHORIZED;
        $this->response($this->api_response, $this->http_status_code);
        return false;
    }

    function isAuthorized() {

    }

    public function test_get() {
        $payload = array('username' => 'Saikat', 'role'=> 'admin');
        $this->api_response['message'] = 'Its working, you can modify the API V1'; 
        $tokenData = $this->authorization_token->generateToken($payload);  
        $this->api_response['token'] = $tokenData;
        $this->response($this->api_response, $this->http_status_code);
    }

    public function users_get(){
        //$this->isLoggedIn();
        $data = array();        
        $id = $this->get('id') ? $this->get('id') : NULL;
        if ($id === NULL) {
            $result_array = $this->user_model->get_rows(NULL, NULL, NULL);
            $data = $result_array['data_rows'];
            if ($data) {                
                $this->api_response['data'] = $data;
                $this->http_status_code = REST_Controller::HTTP_OK;
            } else {
                $this->api_response = '0';
                $this->api_response['message'] = 'No User Found';
                $this->api_response['data'] = $data;
                $this->http_status_code = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $result_array = $this->user_model->get_rows(NULL, NULL, $id);
            $data = $result_array['data_rows'];
            if ($data) {                
                $this->api_response['data'] = $data;
                $this->http_status_code = REST_Controller::HTTP_OK;
            } else {
                $this->api_response = '0';
                $this->api_response['message'] = 'No User Found';
                $this->api_response['data'] = $data;
                $this->http_status_code = REST_Controller::HTTP_BAD_REQUEST;
            }
        }
        $this->response($this->api_response, $this->http_status_code);
    }

    public function login_post(){
        $email = $this->post('userName');
        $password = md5($this->post('password'));
        //print_r($email); die();
        $validate = TRUE;
        if ($validate == TRUE) {
            $login_result = $this->user_model->authenticate_user($email, $password);
            if (isset($login_result) && $login_result['status'] != 'error') {
                $this->api_response['status'] = '1';
                $this->api_response['message'] = 'Login Successfull';
                $tokenData = $this->authorization_token->generateToken($login_result['data']);      
                $this->api_response['data'] = $login_result['data'];
                $this->api_response['token'] = $tokenData;
                $this->http_status_code = REST_Controller::HTTP_OK;
            } else {
                $this->api_response['status'] = '0';
                $this->api_response['message'] = $login_result['message'];      
                $this->api_response['data'] = $login_result;
                $this->http_status_code = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->api_response['status'] = '0';
            $this->api_response['message'] = 'Form validation Error';
            $this->http_status_code = REST_Controller::HTTP_OK;
        }

        $this->response($this->api_response, $this->http_status_code);
    }


}
