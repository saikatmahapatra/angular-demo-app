<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Cms extends App_Controller
{
    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        parent::__construct();
        $this->isAuthorized();
        $this->load->model('project_model');
        $this->load->model('home_model');
        $this->load->model('cms_model');
        $this->load->model('settings_model');
    }

    function getDashboardStat_get()
    {
        
        $dashboard_stat = [];
        $stat_user_count = $this->home_model->get_user_count();
        $stat_active_user_count = $this->home_model->get_user_count(TRUE);
        $stat_projects_count = $this->home_model->get_user_projects();
        $stat_timesheet_user = $this->home_model->get_user_of_timesheet();
        $stat_user_applied_leave = $this->home_model->get_user_applied_leave_count();
        $stat_user_approved_leave = $this->home_model->get_user_approved_leave_count();
        $stat_pending_leave_action = $this->home_model->get_pending_leave_action_count($this->getUserId());
        $stat_user_timesheet_stat = $this->project_model->get_timesheet_stats(date('Y'), date('m'), $this->getUserId());
        

        if($this->getUserRoleId() == 1) {
            array_push($dashboard_stat, array('targetRole' => '1', 'heading' => 'active employee accounts', 'infoText' => '', 'textCSS' => '', 'bg_css' => '', 'digitCSS' => 'text-primary', 'icon' => 'users', 'iconCss' => '#6f42c1', 'count' => $stat_active_user_count['data_rows'][0]['total'].'/'.$stat_user_count['data_rows'][0]['total'], 'url' => 'emp/manage'));

            array_push($dashboard_stat, array('targetRole' => '1', 'heading' => 'projects', 'infoText' => '', 'textCSS' => '', 'bg_css' => '', 'digitCSS' => 'text-secondary', 'icon' => 'projects', 'iconCss' => '#6f42c1', 'count' => $stat_projects_count['data_rows'][0]['total'], 'url' => 'project/manage-project'));

            array_push($dashboard_stat, array('targetRole' => '1', 'heading' => 'employees logged tasks *', 'infoText' => '', 'textCSS' => '', 'bg_css' => '', 'digitCSS' => 'text-success', 'icon' => 'calendar',  'iconCss' => '#6f42c1', 'count' => $stat_timesheet_user['data_rows'][0]['total'], 'url' => 'timesheet/report'));

            array_push($dashboard_stat, array('targetRole' => '1', 'heading' => 'leave apps. approved *', 'infoText' => '', 'textCSS' => '', 'bg_css' => '', 'digitCSS' => 'text-info', 'icon' => 'check', 'iconCss' => '#6f42c1', 'count' => $stat_user_approved_leave['data_rows'][0]['total'] . '/' . $stat_user_applied_leave['data_rows'][0]['total'], 'url' => 'leave/manage'));
        }

        array_push($dashboard_stat, array('targetRole' => '3', 'heading' => 'leave apps. waiting for your review', 'infoText' => '', 'textCSS' => '', 'bg_css' => '', 'digitCSS' => 'text-warning', 'icon' => 'pendingaction', 'iconCss' => '#6f42c1', 'count' => $stat_pending_leave_action['data_rows'][0]['total'], 'url' => 'leave/requests-to-approve'));

        array_push($dashboard_stat, array('targetRole' => '3', 'heading' => 'days task you have logged *', 'infoText' => '', 'textCSS' => '', 'bg_css' => '', 'digitCSS' => 'text-danger', 'icon' => 'clock', 'iconCss' => '#6f42c1', 'count' => $stat_user_timesheet_stat['stat_data']['total_days'], 'url' => 'timesheet/log-work'));

        if ($dashboard_stat) {
            $this->responseData['status'] = 'success';
            $this->responseData['data'] = $dashboard_stat;
            $this->statusCode = REST_Controller::HTTP_OK;
        } else {
            $this->responseData['status'] = 'error';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getPosts_get()
    {
        $pageName = $this->get('pageName') ? $this->get('pageName') : null; 
        if($pageName === 'managePosts') {
            $this->checkRolePermissions(array(
                'adminAccess',
            ));
        }
        $id = $this->get('id') ? $this->get('id') : null;
        $postType = $this->get('type') ? $this->get('type') : null; 
        $searchKeywords = $this->get('searchBy') ? $this->get('searchBy') : null;

        $perPage = isset($_SERVER['HTTP_PERPAGE']) ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = isset($_SERVER['HTTP_PAGE']) ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;
        
        if($pageName === 'managePosts') {
            $totalRecords = $this->cms_model->get_contents($id, false, null, null, NULL, false, $postType);
            $result_array = $this->cms_model->get_contents($id, true, $perPage, $offset, NULL, false, $postType);
        }
        if($pageName === 'dashboardPosts') {
            $totalRecords = $this->cms_model->get_contents($id, false, null, null, $searchKeywords, true);
            $result_array = $this->cms_model->get_contents($id, true, $perPage, $offset, $searchKeywords, true);
        }
        

        if (isset($result_array)) {
            if (sizeof($result_array['data_rows']) > 0) {
                $result_array['num_rows'] = $totalRecords['num_rows'];
                $this->responseData['data'] = $result_array;
                $this->statusCode = REST_Controller::HTTP_OK;
            }
            else {
                $this->responseData['message'] = 'No results found.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function createPost_post() {
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $formAction = $this->post('action');
        $postdata = array(
            'content_type' => $this->post('contentCategory'),
            'content_title' => $this->post('contentHeadline'),
            'content_text' => trim($this->post('contentDescription', TRUE)),
            'content_created_by' => $this->getUserId(),
            'content_status' => $this->post('contentStatus'),
            'content_created_on' => date('Y-m-d H:i:s')
        );
        if ($formAction === 'add') {
            $res = $this->cms_model->insert($postdata);
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Post created successfully.';
                $this->statusCode = REST_Controller::HTTP_CREATED;
                if($this->post('sendEmailNotification') == true) {
                    $this->sendEmailNotification($postdata['content_title'], $postdata['content_text'], $res);
                }
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function updatePost_put() {
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $formAction = $this->put('action');
        $postdata = array(
            'content_type' => $this->put('contentCategory'),
            'content_title' => $this->put('contentHeadline'),
            'content_text' => trim($this->put('contentDescription', TRUE)),
            'content_updated_by' => $this->getUserId(),
            'content_status' => $this->put('contentStatus'),
            'content_updated_on' => date('Y-m-d H:i:s')
        );
        $where = array('id' => $this->put('id'));
        if ($formAction === 'edit' && $this->put('id'))  {
            $res = $this->cms_model->update($postdata, $where);
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Post updated successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
                if($this->put('sendEmailNotification') == true) {
                    $this->sendEmailNotification($postdata['content_title'], $postdata['content_text'], $this->put('id'));
                }
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function deletePost_delete()
    {
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $id = $_REQUEST['id'] ? $_REQUEST['id'] : null;
        if ($id) {
            $where = array('id' => $id);
            $res = $this->cms_model->delete($where, 'contents');
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
    
    function markAsRead_put()
    {
        $data = array(
            'id' => $this->put('id'),
            'postType' => $this->put('postType'),
            'userId' => $this->put('userId')
        );
        //print_r($data); die();
        $result = $this->cms_model->markAsRead($data);
        if ($result) {
            $this->statusCode = REST_Controller::HTTP_OK;
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }

        $this->response($this->responseData, $this->statusCode);
    }

    function getHolidays_get()
    {
        $year = $this->get('year') ? $this->get('year') : Date('Y');   
        // $perPage = isset($_SERVER['HTTP_PERPAGE']) ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        // $currentPageIndex = isset($_SERVER['HTTP_PAGE']) ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        // $offset = $currentPageIndex * $perPage;
        // $totalRecords = $this->cms_model->get_holidays(NULL, NULL, NULL, FALSE, FALSE);
        $result_array = $this->cms_model->get_holidays(NULL, NULL, NULL, $year);
        if (isset($result_array)) {
            if (sizeof($result_array['data_rows']) > 0) {
                //$result_array['num_rows'] = $totalRecords['num_rows'];
                $this->responseData['data'] = $result_array;
                $this->statusCode = REST_Controller::HTTP_OK;
            }
            else {
                $this->responseData['data'] = [];
                $this->responseData['message'] = 'No results found.';
                $this->statusCode = REST_Controller::HTTP_OK;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }
    
    function addHoliday_post() {
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $formAction = $this->post('action');
        $date = $this->common_lib->convert_to_mysql($this->post('date'));
        $holidayExists = $this->cms_model->holidayExists($date);
        if($formAction === 'add' && !$holidayExists) {
            $postdata = array(
                'holiday_date' => $date,
                'holiday_description' => $this->post('occasion'),
                'holiday_type' => trim($this->post('type'))
            );
            $res = $this->cms_model->insert($postdata, 'holidays');
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Holiday added successfully.';
                $this->statusCode = REST_Controller::HTTP_CREATED;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->responseData['message'] = 'Another holiday is already exists on the date '.$date;
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        
        $this->response($this->responseData, $this->statusCode);
    }

    function updateHoliday_put() {
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $formAction = $this->put('action');
        $date = $this->common_lib->convert_to_mysql($this->put('date'));
        $holidayExists = $this->cms_model->holidayExists($date, $this->put('id'));
        $postdata = array(
            'holiday_date' => $date,
            'holiday_description' => $this->put('occasion'),
            'holiday_type' => trim($this->put('type'))
        );
        $where = array('id' => $this->put('id'));
        if ($formAction === 'edit' && $this->put('id') && !$holidayExists)  {
            $res = $this->cms_model->update($postdata, $where, 'holidays');
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Holiday updated successfully.';
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->responseData['message'] = 'Another holiday is already exists on the date '.$date;
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function deleteHoliday_delete()
    {
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $id = $_REQUEST['id'] ? $_REQUEST['id'] : null;
        if ($id) {
            $where = array('id' => $id);
            $res = $this->cms_model->delete($where, 'holidays');
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

    function holidayExists() {

    }

    function getEvents_get() {
        $startDate = null;
        $endDate = null;
        $userId = $this->getUserId();
        $this->responseData['data'] = $this->home_model->get_events($startDate, $endDate, $userId);
        $this->response($this->responseData, $this->statusCode);
    }

    function sendEmailNotification($title, $messageContent, $postId) {
        $sendToList = array();
        $emailDL = $this->settings_model->get_option(array('emailNotifyDistro'));
        if(isset($emailDL['emailNotifyDistro']) && $emailDL['emailNotifyDistro']) {
            array_push($sendToList, $emailDL['emailNotifyDistro']);
        } else {
            $emailList = $this->cms_model->getEmailList();
            if(sizeof($emailList)>0) {
                foreach ($emailList as $key => $value) {
                    array_push($sendToList, $value['user_email']);
                }
            }
        }
        // email copy
        $message = "";
        $message .= $messageContent;
        $message .= "<p><a href='http://portal.ueipl.co.in/dashboard/post-details/".$postId."'>Click here</a> to read this post from MyApp portal.</p>";
        //print_r($sendToList); die();
        $this->common_lib->sendEmail($sendToList, $title, $message);
    }

    function getMetaType_get()
    {
        $this->responseData['data']['metaType'] = $this->cms_model->get_metaType_dropdown();
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    function getSiteMeta_get()
    {
        $site_meta = $this->get('selectedMetaType') ? $this->get('selectedMetaType') : null;   
        $perPage = isset($_SERVER['HTTP_PERPAGE']) ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = isset($_SERVER['HTTP_PAGE']) ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;
        $totalRecords = $this->cms_model->get_sitemeta(NULL, NULL, NULL, $site_meta);
        $result_array = $this->cms_model->get_sitemeta(NULL, $perPage, $offset, $site_meta);
        if (isset($result_array)) {
            if (sizeof($result_array['data_rows']) > 0) {
                $result_array['num_rows'] = $totalRecords['num_rows'];
                $this->responseData['data'] = $result_array;
                $this->statusCode = REST_Controller::HTTP_OK;
            }
            else {
                $this->responseData['data'] = [];
                $this->responseData['message'] = 'No results found.';
                $this->statusCode = REST_Controller::HTTP_OK;
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }
    
    function addSiteMeta_post() {
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $formAction = $this->post('action');

        $metaExists = $this->cms_model->metaExists($this->post('metaType'), $this->post('metaValue'), NULL);
        if($formAction === 'add' && !$metaExists) {
            $metaType  = $this->post('metaType') == '-1' ? trim($this->post('newMetaType')) : $this->post('metaType');
            $postdata = array(
                'meta_type' => $metaType,
                'meta_value' => trim($this->post('metaValue')),
                'meta_status' => $this->post('metaStatus'),
                'meta_code' => trim($this->post('metaCode')),
            );

            //print_r($postdata); die();
            $res = $this->cms_model->insert($postdata, 'site_meta');
            if ($res) {
                $this->responseData['status'] = 'success';
                $this->responseData['message'] = 'Meta added successfully.';
                $this->statusCode = REST_Controller::HTTP_CREATED;
            } else {
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
        } else {
            $this->responseData['message'] = 'Already exists';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        
        $this->response($this->responseData, $this->statusCode);
    }
}
