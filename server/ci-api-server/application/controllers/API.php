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
    
    var $responseData = array();
    var $statusCode = '';

    function __construct(){
        // Construct the parent class
        parent::__construct();

        // Load JWT Auth Lib
        $this->load->library('Authorization_Token');

        // Common Response Array
        $this->responseData = [];
        $this->responseData['message'] = null;           
        $this->responseData['data'] = null;
        $this->responseData['token'] = null;
        $this->statusCode = REST_Controller::HTTP_INTERNAL_SERVER_ERROR; 

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }
    
    function isAuthorized() {
        $res = $this->authorization_token->validateToken();
        if($res['status'] == FALSE) {
            $this->responseData['message'] = $res['message'];
            $this->statusCode = REST_Controller::HTTP_UNAUTHORIZED;
            $this->response($this->responseData, $this->statusCode);
        }
        if($res['status'] == TRUE) {
            return $res['data'];
        }
    }

    function getUserId(){
        $res = $this->isAuthorized();
        return $res->userId;
    }

    function validateToken_post(){
        $this->isAuthorized();
    }

    function test_get() {
        $payload = array('username' => 'Saikat', 'role'=> 'admin');
        $this->responseData['message'] = 'Its working, you can modify the API V1'; 
        $tokenData = $this->authorization_token->generateToken($payload);  
        $this->responseData['token'] = $tokenData;
        $this->response($this->responseData, $this->statusCode);
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
                $this->responseData['data'] = $data;
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->responseData['message'] = 'No User Found';
                $this->responseData['data'] = null;
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $result_array = $this->user_model->get_rows(NULL, NULL, $id);
            $data = $result_array['data_rows'];
            if ($data) {                
                $this->responseData['data'] = $data;
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->responseData['message'] = 'No User Found';
                $this->responseData['data'] = null;
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function login_post(){
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

    function dashboardStat_get(){
        $this->isAuthorized();
        $dashboard_stat = [];
        $this->load->model('project_model');
        $this->load->model('home_model');
        $stat_user_count = $this->home_model->get_user_count();
        $stat_projects_count = $this->home_model->get_user_projects();
        $stat_timesheet_user = $this->home_model->get_user_of_timesheet();
        $stat_user_applied_leave = $this->home_model->get_user_applied_leave_count();
        $stat_user_approved_leave = $this->home_model->get_user_approved_leave_count();
        $stat_pending_leave_action = $this->home_model->get_pending_leave_action_count($this->getUserId());
        $stat_user_timesheet_stat = $this->project_model->get_timesheet_stats(date('Y'), date('m'), $this->getUserId());
        array_push($dashboard_stat, array('targetRole' => '1', 'heading'=>'Employees', 'infoText'=>'','textCSS'=>'','bg_css'=>'', 'digitCSS'=>'text-primary', 'icon'=>'', 'count'=>$stat_user_count['data_rows'][0]['total'], 'url' => base_url('user/manage')));
        array_push($dashboard_stat, array('targetRole' => '1', 'heading'=>'Projects', 'infoText'=>'','textCSS'=>'','bg_css'=>'', 'digitCSS'=>'text-secondary', 'icon'=>'', 'count'=>$stat_projects_count['data_rows'][0]['total'], 'url' => base_url('project')));
        array_push($dashboard_stat, array('targetRole' => '1', 'heading'=>'Logged Task Current Month', 'infoText'=>'','textCSS'=>'','bg_css'=>'', 'digitCSS'=>'text-success', 'icon'=>'', 'count'=>$stat_timesheet_user['data_rows'][0]['total'], 'url' => base_url('project/timesheet_report')));
        array_push($dashboard_stat, array('targetRole' => '1', 'heading'=>'Leave Approved', 'infoText'=>'','textCSS'=>'','bg_css'=>'', 'digitCSS'=>'text-info', 'icon'=>'', 'count'=>$stat_user_approved_leave['data_rows'][0]['total'].'/'.$stat_user_applied_leave['data_rows'][0]['total'], 'url' => base_url('leave/manage')));
        array_push($dashboard_stat, array('targetRole' => '', 'heading'=>'Leave to Approve', 'infoText'=>'','textCSS'=>'','bg_css'=>'', 'digitCSS'=>'text-warning', 'icon'=>'', 'count'=>$stat_pending_leave_action['data_rows'][0]['total'], 'url' => base_url('leave/manage')));
        array_push($dashboard_stat, array('targetRole' => '', 'heading'=>'Days You Logged *', 'infoText'=>'','textCSS'=>'','bg_css'=>'', 'digitCSS'=>'text-danger', 'icon'=>'', 'count'=>$stat_user_timesheet_stat['stat_data']['total_days'], 'url' => base_url('project/timesheet')));
        array_push($dashboard_stat, array('targetRole' => '', 'heading'=>'Your Logged Hours *', 'infoText'=>'','textCSS'=>'','bg_css'=>'', 'digitCSS'=>'text-primary', 'icon'=>'', 'count'=>$stat_user_timesheet_stat['stat_data']['total_hrs'] ? $stat_user_timesheet_stat['stat_data']['total_hrs'] : 0, 'url' => base_url('project/timesheet')));
        array_push($dashboard_stat, array('targetRole' => '', 'heading'=>'Your Average Logged Hours *', 'infoText'=>'','textCSS'=>'','bg_css'=>'', 'digitCSS'=>'text-secondary', 'icon'=>'', 'count'=>$stat_user_timesheet_stat['stat_data']['avg_hrs'] ? $stat_user_timesheet_stat['stat_data']['avg_hrs'] : 0, 'url' => base_url('project/timesheet')));
        if($dashboard_stat) {
            $this->responseData['status'] = '1';
            $this->responseData['data'] = $dashboard_stat;
            $this->statusCode = REST_Controller::HTTP_OK;
        } else {
            $this->responseData['status'] = '0';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        
        $this->response($this->responseData, $this->statusCode);
    }


}
