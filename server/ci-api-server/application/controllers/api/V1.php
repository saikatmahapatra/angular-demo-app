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

    function __construct(){
        // Construct the parent class
        parent::__construct();

        // Common Response Array
        $this->api_response = [];
        $this->api_response['status'] = '1'; // 1=success, 0=error
        $this->api_response['message'] = '';           
        $this->api_response['data'] = '';

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }

    public function users_get(){
        $data = array();        
        $id = $this->get('id') ? $this->get('id') : NULL;
        if ($id === NULL) {
            $result_array = $this->user_model->get_rows(NULL, NULL, NULL);
            $data = $result_array['data_rows'];
            if ($data) {                
                $this->api_response['data'] = $data;
                $this->response($this->api_response, REST_Controller::HTTP_OK);
            } else {
                $this->api_response = '0';
                $this->api_response['message'] = 'No User Found';
                $this->api_response['data'] = $data;
                $this->response($this->api_response, REST_Controller::HTTP_BAD_REQUEST);
            }
        } else {
            $result_array = $this->user_model->get_rows(NULL, NULL, $id);
            $data = $result_array['data_rows'];
            if ($data) {                
                $this->api_response['data'] = $data;
                $this->response($this->api_response, REST_Controller::HTTP_OK);
            } else {
                $this->api_response = '0';
                $this->api_response['message'] = 'No User Found';
                $this->api_response['data'] = $data;
                $this->response($this->api_response, REST_Controller::HTTP_BAD_REQUEST);
            }
        }
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
                $this->api_response['data'] = $login_result['data'];
                $this->response($this->api_response, REST_Controller::HTTP_OK);
            } else {
                $this->api_response['status'] = '0';
                $this->api_response['message'] = $login_result['message'];      
                $this->api_response['data'] = $login_result;
                $this->response($this->api_response, REST_Controller::HTTP_BAD_REQUEST);
            }
        } else {
            $this->api_response['status'] = '0';
            $this->api_response['message'] = 'Form validation Error';
            $this->response($this->api_response, REST_Controller::HTTP_OK);
        }
    }

}
