<?php

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
class Api extends REST_Controller {
    
    var $api_response = array();

    function __construct(){
        // Construct the parent class
        parent::__construct();

        // Common Response Array
        $this->api_response = array();
        $this->api_response['time'] = time();        
        $this->api_response['screen_id'] = NULL;
        $this->api_response['code'] = 1000; //1000 =success, 1001 = error
        $this->api_response['status'] = 'success'; // success|error
        $this->api_response['message'] = NULL; // any custom message        
        $this->api_response['css_class'] = 'alert alert-success';                
        $this->api_response['data'] = array(); // data return by model

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }

    public function users_get(){
        $data = array();        
        $id = $this->get('id') ? $this->get('id') : NULL; // get id value from query string

        if ($id === NULL) {
            // If the id parameter doesn't exist return all the users
            $result_array = $this->user_model->get_rows(NULL, NULL, NULL);
            $data = $result_array['data_rows'];
            // Check if the users data store contains users (in case the database result returns NULL)
            if ($data) {                
                $this->api_response['data'] = $data;
                $this->api_response['message'] = 'Success';
                // Set the response and exit
                $this->response($this->api_response, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            } else {
                $this->api_response['data'] = $data;
                $this->api_response['message'] = 'No User Found';
                $this->response($this->api_response, REST_Controller::HTTP_NOT_FOUND); // OK (200) being the HTTP response code
            }
        } else {
            // If the id parameter exists return a single user having that id
            $result_array = $this->user_model->get_rows(NULL, NULL, $id);
            $data = $result_array['data_rows'];
            // Check if the users data store contains users (in case the database result returns NULL)
            if ($data) {                
                $this->api_response['data'] = $data;
                $this->api_response['message'] = 'Success';
                // Set the response and exit
                $this->response($this->api_response, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            } else {
                $this->api_response['data'] = $data;
                $this->api_response['message'] = 'No User Found';
                $this->response($this->api_response, REST_Controller::HTTP_NOT_FOUND); // OK (200) being the HTTP response code
            }
        }
    }

    public function users_post(){
        $newResponse = array('code' => '', 'message' => '', 'data' => '');
        $postdata = array(
            'firstname' => $this->post('firstname'),
            'lastname' => $this->post('lastname'),
            'email' => $this->post('email'),
            'mobile' => $this->post('mobile')
        );
        $validate = TRUE;
        if ($validate == TRUE) {
            $insert_id = $this->user_model->insert($postdata);
            if ($insert_id) {
                $newResponse = array('code' => '1', 'message' => 'User added successfully', 'data' => array('id' => $insert_id));
                $this->response($newResponse, REST_Controller::HTTP_OK);
            } else {
                $newResponse = array('code' => '0', 'message' => 'Unable to add user', 'data' => '');
                $this->response($newResponse, REST_Controller::HTTP_BAD_REQUEST);
            }
        } else {
            $newResponse = array('code' => '0', 'message' => 'Validation Error', 'data' => '');
            $this->response($newResponse, REST_Controller::HTTP_OK);
        }
    }


    public function user_put(){
        $newResponse = array('code' => '', 'message' => '', 'data' => '');
        $id = $this->put('id') ? $this->put('id') : NULL;
        $postdata = array(
            'firstname' => $this->put('firstname'),
            'lastname' => $this->put('lastname'),
            'email' => $this->put('email'),
            'mobile' => $this->put('mobile')
        );
        
        $validate = TRUE;
        if ($validate == TRUE) {
            $where_array = array('id' => $id);
            $res = $this->user_model->update($postdata, $where_array);
            if ($res) {
                $newResponse = array('code' => '1', 'message' => 'User updated successfully', 'data' => '');
                $this->response($newResponse, REST_Controller::HTTP_OK);
            } else {
                $newResponse = array('code' => '0', 'message' => 'Unable to update user', 'data' => '');
                $this->response($newResponse, REST_Controller::HTTP_BAD_REQUEST);
            }
        } else {
            $newResponse = array('code' => '0', 'message' => 'Validation Error', 'data' => '');
            $this->response($newResponse, REST_Controller::HTTP_OK);
        }
    }

    public function users_delete(){
        $newResponse = array('code' => '', 'message' => '', 'data' => '');
        $id = $this->get('id') ? $this->get('id') : NULL; // get id value from query string

        if ($id === NULL) {
            $newResponse = array('code' => '0', 'message' => 'No user(s) found', 'data' => $data);
            $this->response($newResponse, REST_Controller::HTTP_NOT_FOUND); // OK (200) being the HTTP response code
        } else {
            $where_array = array('id' => $id);
            $res = $this->user_model->delete($where_array);
            if ($res) {
                $newResponse = array('code' => '1', 'message' => 'User deleted successfully', 'data' => '');
                $this->response($newResponse, REST_Controller::HTTP_OK);
            } else {
                $newResponse = array('code' => '0', 'message' => 'Unable to delete user', 'data' => '');
                $this->response($newResponse, REST_Controller::HTTP_BAD_REQUEST);
            }
        }
    }

}
