<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . 'libraries/App_Controller.php';
require APPPATH . 'libraries/Common_lib.php';
class Leave extends App_Controller
{
    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        parent::__construct();
        $this->isAuthorized();
        $this->load->model('app_model');
        $this->load->model('leave_model');
        $this->load->model('user_model');
        $this->data['leave_type_arr'] = array(''=>'-Select-',
            'CL'=>'Casual Leave',
            'PL'=>'Privileged Leave',
            'SL'=>'Sick Leave',
            'CO'=>'Comp. Off',
            'OL'=>'Optional Leave',
            'SP'=>'Special Leave'
        );
        // Leave Terms
        $this->data['leave_term_arr'] = array(
            'FD' => 'Full Day (FD)',
            'HD1' => 'Half Day - First Half (HD1)',
            'HD2' => 'Half Day - Second Half (HD2)'
        );
		$this->data['leave_status_arr'] = array(
            'B'=>array('text'=>'Submitted', 'badge_css'=>'badge badge-primary badge-pill', 'css'=>'text-primary'),
            'O'=>array('text'=>'In Review', 'badge_css'=>'badge badge-info badge-pill', 'css'=>'text-info'),
            'A'=>array('text'=>'Approved', 'badge_css'=>'badge badge-success badge-pill', 'css'=>'text-success'),
            'R'=>array('text'=>'Rejected', 'badge_css'=>'badge badge-danger badge-pill', 'css'=>'text-danger'),
            'P'=>array('text'=>'Pending', 'badge_css'=>'badge badge-secondary badge-pill', 'css'=>'text-secondary'),
            'C'=>array('text'=>'Cancelled', 'badge_css'=>'badge badge-warning badge-pill', 'css'=>'text-warning'),
            'X'=>array('text'=>'Cancel Requested', 'badge_css'=>'badge badge-warning badge-pill', 'css'=>'text-warning'),
            'V'=>array('text'=>'Verified', 'badge_css'=>'badge badge-warning badge-pill', 'css'=>'text-warning')
        );
    }

    // for admin
    function getLeave_post()
    {
        $perPage = isset($_SERVER['HTTP_PERPAGE']) ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = isset($_SERVER['HTTP_PAGE']) ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;
        //$leaveId = $this->post('leaveId') ? $this->post('leaveId') : NULL;
        $cond = array();
        $cond['assigned_to_user_id'] = $this->getUserId();
        //$cond['leave_status'] = array('B');
        $cond['show_supervisor_director_pending_leave'] = true;

        if ($this->post('action') == 'search') {
            $cond['leave_status'] = $this->post('leaveStatus');
            $cond['empInfo'] = $this->post('empInfo');
            $cond['pageName'] = $this->post('pageName');
            $cond['show_supervisor_director_pending_leave'] = false;
            //print_r($cond); die();
            // if admin then search assigned to any users leave, else current user only
            if ($this->getUserRoleId() == 1 && $this->post('pageName') == 'manage') {
                $cond['assigned_to_user_id'] = NULL;
            } else {
                $cond['assigned_to_user_id'] = $this->getUserId();
            }
            //print_r($cond); die();

            if($this->post('pageName') == 'viewHistory') {
                //$cond = array();
                $cond = array(
                    'applicant_user_id' =>  $this->getUserId()
                );
            }
            $totalRecords = $this->leave_model->get_rows(NULL, NULL, NULL, FALSE, $cond);
            $result_array = $this->leave_model->get_rows(NULL, $perPage, $offset, TRUE, $cond);
            if ($result_array && $totalRecords['num_rows'] > 0) {
                $result_array['num_rows'] = $totalRecords['num_rows'];
                $this->responseData['data'] = $result_array;
                $this->statusCode = REST_Controller::HTTP_OK;
            } else {
                $result_array['num_rows'] = 0;
                $result_array['data_rows'] = [];
                $this->responseData['message'] = 'No records found.';
                $this->responseData['data'] = $result_array;
                $this->statusCode = REST_Controller::HTTP_OK;
            }
        }
        //$this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    function getLeave_get()
    {
        $cond = array();
        if ($this->get('pageName') == 'leaveDetails' && $this->getUserRoleId() != 1) {
            $cond['assigned_to_user_id'] = $this->getUserId();
        }
        if ($this->get('pageName') == 'leaveDetails' && $this->getUserRoleId() == 1) {
            $cond['assigned_to_user_id'] = NULL;
        }
        if($this->get('pageName') == 'leaveHistoryDetails') {
            $cond['applicant_user_id'] = $this->getUserId();
        }
        $leaveId = $this->get('leaveId') ? $this->get('leaveId') : NULL;
        $result_array = $this->leave_model->get_rows($leaveId, NULL, NULL, FALSE, $cond);
        if ($result_array && $result_array['num_rows'] > 0) {
            $this->responseData['data'] = $result_array;
            $this->statusCode = REST_Controller::HTTP_OK;
        } else {
            $result_array['num_rows'] = 0;
            $result_array['data_rows'] = [];
            $this->responseData['message'] = 'No records found.';
            $this->responseData['data'] = $result_array;
            $this->statusCode = REST_Controller::HTTP_OK;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function updateLeave_post()
    {
        $userId = $this->getUserId();
        $leaveId = $this->post('id') ? $this->post('id') : null;
        $actionByUserId = $this->post('userId') ? $this->post('userId') : null;
        $workFlow = $this->post('workflow') ? $this->post('workflow') : null;
        $newLeaveStatus = $this->post('newStatus') ? $this->post('newStatus') : null;
        $comments = $this->post('comments') ? trim($this->post('comments')) : null;
        $finalLeaveStatus = '';
        $isCancelRequestedByApplicant = 'N';
        if ($leaveId) {
            $leaveDetails = $this->leave_model->get_rows($leaveId, NULL, NULL, FALSE, NULL);
            $leaveData = $leaveDetails['data_rows'][0];

            $currentLeaveStatus = isset($leaveData['leave_status']) ? $leaveData['leave_status'] : '';
            $currentSupervisorApproverStatus = isset($leaveData['supervisor_approver_status']) ? $leaveData['supervisor_approver_status'] : '';
            $currentDirectorApproverStatus = isset($leaveData['director_approver_status']) ? $leaveData['director_approver_status'] : '';
            $isCancelRequestedByApplicant = isset($leaveData['cancel_requested']) ? $leaveData['cancel_requested'] : 'N';


            if (sizeof($leaveData) > 0) {
                //print_r($leaveData);
                if (($workFlow == 'L1' && $userId !== $leaveData['supervisor_approver_id']) || ($workFlow == 'L2' && $userId !== $leaveData['director_approver_id'])) {
                    $this->responseData['message'] = 'You are not authorized to perform this action.';
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                } else {
                    if ($workFlow === 'U') { // Applicant User
                        if ($newLeaveStatus == 'W' && $currentLeaveStatus != 'A'){
                            $postdata = array(
                                'leave_status' => 'C',// If not approved
                                'cancelled_by' => $actionByUserId,
                                'cancellation_datetime' => date('Y-m-d H:i:s')
                            );
                            $where = array('id'=>$leaveId);
                            $is_update = $this->leave_model->update($postdata, $where, 'leave_applications');
                            if($is_update>=1){
                                $this->_sendLeaveUpdateEmail($leaveId);
                                $this->responseData['message'] = 'Leave request has been cancelled.';
                                $this->statusCode = REST_Controller::HTTP_OK;
                            }
                        }

                        if ($newLeaveStatus == 'W' && $currentLeaveStatus == 'A') {
                            $postdata = array(
                                'cancel_requested' => 'Y',
                                'cancel_requested_by' => $actionByUserId,
                                //'cancel_request_reason'=> '',
                                'cancel_request_datetime' => date('Y-m-d H:i:s')
                            );
                            $where = array('id' => $leaveId);
                            $is_update = $this->leave_model->update($postdata, $where, 'leave_applications');
                            if($is_update>=1){
                                $this->_sendLeaveUpdateEmail($leaveId);
                                $this->responseData['message'] = 'Your cancellation request has been received. Please contact to organization admin or PoC for further process.';
                                $this->statusCode = REST_Controller::HTTP_OK;
                            }
                        }

                        if ($newLeaveStatus == 'W' && $isCancelRequestedByApplicant == 'Y') {
                            $this->responseData['message'] = 'You have already requested for canlellation. Please contact to organization admin or PoC for further process.';
                            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                        }
                    }
                    if ($workFlow === 'L1') {
                        $finalLeaveStatus = '';
                        if ($newLeaveStatus == 'R' && $isCancelRequestedByApplicant != 'Y') {
                            $finalLeaveStatus = 'R'; // rejected
                        }
                        if ($newLeaveStatus == 'V' && $isCancelRequestedByApplicant != 'Y') {
                            $finalLeaveStatus = 'O'; // processing
                        }
                        if ($newLeaveStatus == 'A' && $isCancelRequestedByApplicant != 'Y') {
                            $finalLeaveStatus = 'A'; // approved
                        }
                        if ($newLeaveStatus == 'C' && $isCancelRequestedByApplicant == 'Y') {
                            $finalLeaveStatus = 'C'; // Cancel the leave
                        }
                        if ($newLeaveStatus == 'C' && $isCancelRequestedByApplicant != 'Y') {
                            $finalLeaveStatus = ''; // Cancel the leave
                        }
                        if ($finalLeaveStatus != '' && $currentSupervisorApproverStatus != 'C') {
                            $postdata = array(
                                'leave_status' => $finalLeaveStatus,
                                'supervisor_approver_status' => $newLeaveStatus,
                                //'supervisor_approver_comment' => $comments,
                                'supervisor_approver_id' => $actionByUserId,
                                'supervisor_approver_datetime' => date('Y-m-d H:i:s')
                            );
                            if($finalLeaveStatus == 'A' || $finalLeaveStatus == 'O' || $finalLeaveStatus == 'R') {
                                $postdata['supervisor_approver_comment'] = $comments;
                            }
                            //print_r($postdata);die();
                            $where = array('id' => $leaveId);
                            $is_update = $this->leave_model->update($postdata, $where, 'leave_applications');
                            if ($is_update) {
                                $this->_sendLeaveUpdateEmail($leaveId);
                                $this->responseData['message'] = 'Leave request has been updated successfully.';
                                // If Approved deduct balance
                                $balance_updated = '';
                                if ($finalLeaveStatus == 'A') {
                                    $balance_updated = $this->_updateLeaveBalance($leaveDetails);
                                    if ($balance_updated >= 1) {
                                        $this->responseData['message'] = 'Leave request has been updated successfully & Leave balance has been deducted.';
                                        $this->statusCode = REST_Controller::HTTP_OK;
                                    }
                                }

                                if ($finalLeaveStatus == 'C') {
                                    $balance_updated = $this->_adjustLeaveBalance($leaveDetails);
                                    if ($balance_updated >= 1) {
                                        $this->responseData['message'] = 'Leave request has been updated successfully & Leave balance has been adjusted.';
                                        $this->statusCode = REST_Controller::HTTP_OK;
                                    }
                                }
                                $this->statusCode = REST_Controller::HTTP_OK;
                            }
                        } else {
                            $this->statusCode = REST_Controller::HTTP_OK;
                        }
                    }

                    if ($workFlow == 'L2') {
                        $finalLeaveStatus = '';
                        if ($newLeaveStatus == 'R' && $isCancelRequestedByApplicant != 'Y') {
                            $finalLeaveStatus = 'R'; // rejected
                        }
                        if ($newLeaveStatus == 'A' && $isCancelRequestedByApplicant != 'Y') {
                            $finalLeaveStatus = 'A'; // approved
                        }
                        if ($newLeaveStatus == 'C' && $isCancelRequestedByApplicant == 'Y') {
                            $finalLeaveStatus = 'C'; // Cancel the leave
                        }
                        if ($newLeaveStatus == 'C' && $isCancelRequestedByApplicant != 'Y') {
                            $finalLeaveStatus = ''; // Cancel the leave
                        }

                        if ($finalLeaveStatus != '' && ($currentDirectorApproverStatus != 'C' || $currentLeaveStatus != 'A')) {
                            $postdata = array(
                                'leave_status' => $finalLeaveStatus,
                                'director_approver_status' => $newLeaveStatus,
                                'director_approver_id' => $actionByUserId,
                                'director_approver_datetime' => date('Y-m-d H:i:s')
                            );

                            if($finalLeaveStatus == 'A' || $finalLeaveStatus == 'R') {
                                $postdata['director_approver_comment'] = $comments;
                            }

                            if($leaveData['supervisor_approver_id'] == $leaveData['director_approver_id']) {
                                $postdata['supervisor_approver_status'] = $newLeaveStatus;
                                $postdata['supervisor_approver_datetime'] = date('Y-m-d H:i:s');
                            }

                            $where = array('id' => $leaveId);
                            $is_update = $this->leave_model->update($postdata, $where, 'leave_applications');
                            if ($is_update >= 1) {
                                $this->_sendLeaveUpdateEmail($leaveId);
                                $this->responseData['message'] = 'Leave request has been updated successfully.';
                                // If Approved deduct balance
                                $balance_updated = '';
                                if ($finalLeaveStatus == 'A') {
                                    $balance_updated = $this->_updateLeaveBalance($leaveDetails);
                                    if ($balance_updated >= 1) {
                                        $this->responseData['message'] = 'Leave request has been updated successfully & Leave balance has been deducted.';
                                        $this->statusCode = REST_Controller::HTTP_OK;
                                    }
                                }

                                if ($finalLeaveStatus == 'C') {
                                    $balance_updated = $this->_adjustLeaveBalance($leaveDetails);
                                    if ($balance_updated >= 1) {
                                        $this->responseData['message'] = 'Leave request has been updated successfully & Leave balance has been adjusted.';
                                        $this->statusCode = REST_Controller::HTTP_OK;
                                    }
                                }
                                $this->statusCode = REST_Controller::HTTP_OK;
                            } else {
                                $this->responseData['message'] = 'You can only Approve / Reject. You would be able to cancel this once applicant request for cancellation.';
                                $this->statusCode = REST_Controller::HTTP_OK;
                            }
                        } else {
                            $this->responseData['message'] = 'You can only Approve / Reject. You would be able to cancel this once applicant request for cancellation.';
                            $this->statusCode = REST_Controller::HTTP_OK;
                        }
                    }
                }
            }
        } else {
            $this->statusCode = REST_Controller::HTTP_OK;
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function _updateLeaveBalance($leaveDetails){
        $leave_data = $leaveDetails['data_rows'][0];
        $applicant_user_id = $leave_data['user_id'];
        $applied_for_days_count = $leave_data['applied_for_days_count'];
        $leave_type = $leave_data['leave_type'];
        $leave_term = $leave_data['leave_term'];
        $leave_term_multiplier = ($leave_term == 'FD') ? 1 : 0.5;
        $leave_balance_res = $this->leave_model->get_leave_balance($applicant_user_id);
        $leave_balance = $leave_balance_res['data_rows'];
        $user_meta_id = $leave_balance[0]['id'];
        $available_leave_balance = $leave_balance[0][strtolower($leave_type)];
        //print_r($leave_balance);die();
        $updated_leave_balance = ($available_leave_balance - ($applied_for_days_count * $leave_term_multiplier));

        //Update Leave Table with Number of approved days 
        $postdata = array();
        $postdata['approved_for_days_count'] = $applied_for_days_count * $leave_term_multiplier;
        if(strtolower($leave_type) == 'cl'){
            $postdata['debited_cl'] = $applied_for_days_count * $leave_term_multiplier;
        }
        if(strtolower($leave_type) == 'pl'){
            $postdata['debited_pl'] = $applied_for_days_count * $leave_term_multiplier;
        }
        if(strtolower($leave_type) == 'ol'){
            $postdata['debited_ol'] = $applied_for_days_count * $leave_term_multiplier;
        }
        if(strtolower($leave_type) == 'sl'){
            $postdata['debited_sl'] = $applied_for_days_count * $leave_term_multiplier;
        }
        if(strtolower($leave_type) == 'co'){
            $postdata['debited_co'] = $applied_for_days_count * $leave_term_multiplier;
        }
        $where = array('id'=>$leave_data['id']);
        $this->leave_model->update($postdata, $where, 'leave_applications');

        // Update Leave Balance
        $postdata = array(
            strtolower($leave_type) => $updated_leave_balance,
            'leave_balance_updated_on' => date('Y-m-d H:i:s'),
            'leave_balance_updated_by' => $this->getUserId()
        );
        $where = array('id'=>$user_meta_id, 'user_id'=>$applicant_user_id);
        $is_update_balance = $this->leave_model->update($postdata, $where, 'user_meta');
        return $is_update_balance;
    }

    function _adjustLeaveBalance($leaveDetails){
        $leave_data = $leaveDetails['data_rows'][0];
        $applicant_user_id = $leave_data['user_id'];
        $leave_balance_res = $this->leave_model->get_leave_balance($applicant_user_id);
        $leave_balance = $leave_balance_res['data_rows'];
        $user_meta_id = $leave_balance[0]['id'];
        // Update Leave Balance Table
        $postdata = array();
        if(isset($leave_data['debited_cl'])){
            $postdata['credited_cl'] = $leave_data['debited_cl'];
        }
        if(isset($leave_data['debited_pl'])){
            $postdata['credited_pl'] = $leave_data['debited_pl'];
        }
        if(isset($leave_data['debited_ol'])){
            $postdata['credited_ol'] = $leave_data['debited_ol'];
        }
        if(isset($leave_data['debited_sl'])){
            $postdata['credited_sl'] = $leave_data['debited_sl'];
        }
        if(isset($leave_data['debited_co'])){
            $postdata['credited_co'] = $leave_data['debited_co'];
        }
        //print_r($postdata)
        $where = array('id' => $user_meta_id, 'user_id' => $applicant_user_id);
        $is_update_balance = $this->leave_model->adjust_leave_balance($postdata, $where);

        // Also update user leave table
        $where = array('id' => $leave_data['id']);
        $is_user_leave_updated = $this->leave_model->update($postdata, $where, 'leave_applications');

        return $is_update_balance;
    }

    function createLeave_post() {
        $userId = $this->getUserId();
        $this->data['approvers'] = $this->user_model->get_user_approvers($userId);
        $leave_balance_res = $this->leave_model->get_leave_balance($userId);
        $this->data['leave_balance'] = $leave_balance_res['data_rows'];
        $supervisor_approver_id = isset($this->data['approvers'][0]['user_supervisor_id']) ? $this->data['approvers'][0]['user_supervisor_id'] : NULL;
        $director_approver_id = isset($this->data['approvers'][0]['user_director_approver_id']) ? $this->data['approvers'][0]['user_director_approver_id'] : NULL;
        $hr_approver_id = isset($this->data['approvers'][0]['user_hr_approver_id']) ? $this->data['approvers'][0]['user_hr_approver_id'] : NULL;

        if(($supervisor_approver_id == NULL || $supervisor_approver_id == 0) && ($director_approver_id == NULL || $director_approver_id == 0)){
            $this->responseData['message'] = 'You have to set workflow approvers to apply for leave.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        } else {
            if($this->post('action')=== 'applyLeave') {
                $dateRange = $this->post('fromToDate');
                $fromDate = date("Y-m-d", strtotime($dateRange[0]));
                $toDate = $dateRange[1] ? date("Y-m-d", strtotime($dateRange[1])) : NULL;
                $no_day = 1;
                if($toDate !== NULL) {
                    $datediff = (strtotime($this->common_lib->convert_to_mysql($toDate)) - strtotime($this->common_lib->convert_to_mysql($fromDate)));
                    $no_day = round($datediff / (60 * 60 * 24)) + 1;
                }
                
                $leave_request_id = date('mdy').$this->common_lib->generate_rand_id(4, FALSE);

                $this->_validateLeaveSlot();
                $this->_validateCOBalance($this->post('leaveType'), $this->data['leave_balance'][0]['co']);
                $this->_isLeaveExistsDateRange($fromDate, $toDate, $userId);

				$postdata = array(
                    'leave_req_id' => $leave_request_id,
                    'leave_type' => $this->post('leaveType'),
                    //'leave_reason' => $this->post('leaveReason'),
                    'leave_reason_id' => $this->post('leaveReasonId'),
                    'leave_from_date' => $this->common_lib->convert_to_mysql($fromDate),
                    'leave_to_date' => $toDate ? $this->common_lib->convert_to_mysql($toDate) : $this->common_lib->convert_to_mysql($fromDate),
                    'applied_for_days_count' => ($no_day),
                    'user_id' => $userId,
                    'leave_created_on' => date('Y-m-d H:i:s'),
                    'leave_status' => 'B',
                    'leave_term' => $this->post('leaveSlot'),
                    'supervisor_approver_id'=> $supervisor_approver_id,
                    'supervisor_approver_status'=>'P',
                    'director_approver_id'=>$director_approver_id,
                    'director_approver_status'=>'P',
                    'hr_approver_id'=>$hr_approver_id,
                    'hr_approver_status'=>'P',
                    'on_apply_cl_bal'=> isset($this->data['leave_balance'][0]['cl']) ? $this->data['leave_balance'][0]['cl'] : '',
                    'on_apply_pl_bal'=> isset($this->data['leave_balance'][0]['pl']) ? $this->data['leave_balance'][0]['pl'] : '',
                    'on_apply_ol_bal'=> isset($this->data['leave_balance'][0]['ol']) ? $this->data['leave_balance'][0]['ol'] : '',
                    'on_apply_sl_bal'=> isset($this->data['leave_balance'][0]['sl']) ? $this->data['leave_balance'][0]['sl'] : '',
                    'on_apply_co_bal'=> isset($this->data['leave_balance'][0]['co']) ? $this->data['leave_balance'][0]['co'] : ''

                );
                $insert_id = $this->leave_model->insert($postdata);
                if($insert_id) {

                    // Send email
                    $this->_sendLeaveUpdateEmail($insert_id);

                    $this->responseData['message'] = 'Your leave application request ID '.$leave_request_id.' has been generated. You can track you application status.';
                    $this->statusCode = REST_Controller::HTTP_CREATED;
                } else {
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                }
            }
        }
        $this->response($this->responseData, $this->statusCode);
    }

    function getLeaveFormData_get() {
        $this->data['approvers'] = $this->user_model->get_user_approvers($this->getUserId());
        $leave_balance_res = $this->leave_model->get_leave_balance($this->getUserId());
        $this->data['leave_balance'] = $leave_balance_res['data_rows'];
        $this->data['leaveReasonList'] = $this->app_model->get_meta_dropdown(array('leave_reason'));
        $this->responseData['data'] = array('approvers' => $this->data['approvers'], 'leave_balance' => $this->data['leave_balance'], 'leaveReasonList' => $this->data['leaveReasonList'] );
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    function _validateLeaveSlot(){
        if(($this->post('leaveSlot') == 'HD1' || $this->post('leaveSlot') == 'HD2') && $this->post('leaveType') != 'CL'){
            $this->responseData['message'] = 'Half Day is applicable for CL only.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            $this->response($this->responseData, $this->statusCode);
        }
    }

    function _validateCOBalance($leaveType, $balance){
        if($leaveType == 'CO' && $balance <=0){
            $this->responseData['message'] = 'You are not allowed to apply a Comp. off as you have insufficient balance.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            $this->response($this->responseData, $this->statusCode);
        }
    }

    function _isLeaveExistsDateRange($fromDate, $toDate, $userId){
        $cond = array(
            'from_date' => $this->common_lib->convert_to_mysql($fromDate),
            'to_date' => $toDate ? $this->common_lib->convert_to_mysql($toDate) : $this->common_lib->convert_to_mysql($fromDate),
            'user_id' => $userId,
            'leave_status' => array('C', 'R')
        );
        $res = $this->leave_model->check_leave_date_range($cond);
        //print_r($res);
        if($res['num_rows'] > 0){
            $this->responseData['message'] = 'Leave req # '.$res['data_rows'][0]['leave_req_id'].' already exists in the selected date range. To re-apply the existing leave request need to be cancelled or rejected. If the leave is already approved & you want to cancel it, kindly raise a cancellation request.';
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            $this->response($this->responseData, $this->statusCode);
        }
    }

    function _sendLeaveUpdateEmail($leave_id) {
        $result_array = $this->leave_model->get_rows($leave_id, NULL, NULL, FALSE, NULL);
        $data = $result_array['data_rows'][0];

        $applicant_name = $data['user_full_name'];
        $leave_status = $this->data['leave_status_arr'][$data['leave_status']]['text'];
        $leave_type = $this->data['leave_type_arr'][$data['leave_type']];
        $leave_term = $this->data['leave_term_arr'][$data['leave_term']];
        $leave_from_to = $this->common_lib->display_date($data['leave_from_date'], false, false, 'd/m/Y').' - '.$this->common_lib->display_date($data['leave_to_date'], false, false, 'd/m/Y');
        $leave_reason = $data['leave_reason_text'] ? $data['leave_reason_text'] : $data['leave_reason'];
        $leave_request_id = $data['leave_req_id'];
        $leave_created_on = $this->common_lib->display_date($data['leave_created_on'], true, false, null);
        $applied_for_days_count = $data['applied_for_days_count'] ? $data['applied_for_days_count'] : 0;
        $days = $data['applied_for_days_count'] > 1 ? 'days' : 'day';

        $L1_workflow_status = $this->data['leave_status_arr'][$data['supervisor_approver_status']]['text'];
        $L2_workflow_status = $this->data['leave_status_arr'][$data['director_approver_status']]['text'];

        // email
        $to_applicant_email = $data['user_email'];
        $L1_supervisior_email = $data['supervisor_email'];
        $L1_supervisior_userid = $data['supervisor_approver_id'];
        $L1_supervisior_name = $data['supervisor_approver_name'];

        $L2_director_email = $data['director_email'];
        $L2_director_userid = $data['director_approver_id'];
        $L2_director_name = $data['director_approver_name'];
        $L3_hr_email = $data['hr_email'];

        // Applicants copy
        $message = '';
        $messageToApplicant = "Hi ".$applicant_name.", <br>";
        if($data['leave_status'] == 'B') {
            $messageToApplicant .= '<p>Your leave application has been submitted. For further information/details you can track leave details from employee portal.</p>';
        } else {
            $messageToApplicant .= '<p>Your leave application has been reviewed and status updated. For further information/details you can track leave details from employee portal.</p>';
        }
        
        // Approvers copy
        $messageToApprovers = '';
        $greetingsToApprovers = '';
        $messageToApprovers .= '<p>Please review the below leave application (ignore if already done). For further information/details you can track leave details from employee portal.</p>';
        
        // Common body
        $message .= '<table rules="all" style="border-color: #666;" cellpadding="10" border="1">';
        $message .= "<tr><td><strong>Application Date:</strong> </td><td>".$leave_created_on."</td></tr>";
        $message .= "<tr><td><strong>Application/Req. ID:</strong> </td><td>".$leave_request_id."</td></tr>";
        $message .= "<tr><td><strong>Leave Status:</strong> </td><td>".$leave_status."</td></tr>";

        $message .= "<tr><td><strong>Applicant:</strong> </td><td>".$applicant_name." [".$to_applicant_email."]</td></tr>";
        $message .= "<tr><td><strong>Leave Date & Duration:</strong> </td><td>".$leave_from_to." (".$applied_for_days_count." ".$days.")</td></tr>";
        $message .= "<tr><td><strong>Leave Type:</strong> </td><td>".$leave_type." - ".$leave_term."</td></tr>";
        $message .= "<tr><td><strong>Leave Reason:</strong> </td><td>".$leave_reason."</td></tr>";
        if($data['cancel_requested'] == 'Y') {
            $message .= "<tr><td><strong>Cancel Requested :</strong> </td><td>Leave cancellation requested on ".$this->common_lib->display_date($data['cancel_request_datetime'], true)."</td></tr>";
        }
        if($L1_supervisior_userid == $L2_director_userid) {
            $message .= "<tr><td><strong>Workflow:</strong> </td><td>".$L2_workflow_status." - ".$L2_director_name." [".$L2_director_email."]<br>".$this->common_lib->display_date($data['director_approver_datetime'], true)."</td></tr>";
        } else {
            $message .= "<tr><td><strong>L1 Workflow:</strong> </td><td>".$L1_workflow_status." - ".$L1_supervisior_name. " [".$L1_supervisior_email."]<br>".$this->common_lib->display_date($data['supervisor_approver_datetime'], true)."</td></tr>";
            $message .= "<tr><td><strong>L2 Workflow:</strong> </td><td>".$L2_workflow_status." - ".$L2_director_name." [".$L2_director_email."]<br>".$this->common_lib->display_date($data['director_approver_datetime'], true)."</td></tr>";
        }

        $message .= "<tr><td><strong>Details Link: </strong> </td><td><a href='http://portal.ueipl.co.in/leave/details/".$leave_id."'>click here</a></td></tr>";
        $message .= "</table>";

        // Send to applicant
        $subjectToApplicant = "Your Leave Application ".$leave_request_id." - ".$leave_status; // default
        if($data['leave_status'] == 'A' || $data['leave_status'] == 'R' || $data['leave_status'] == 'C') {
            $subjectToApplicant = "Your Leave Application ".$leave_request_id." Reviewed - ".$leave_status;
            if($data['leave_status'] == 'C' && $data['cancelled_by'] == $data['user_id']) {
                $subjectToApplicant = "Your Leave Application ".$leave_request_id." Withdrawn & Cancelled";
            }

            if($data['cancel_requested'] == 'Y' && $data['leave_status'] != 'C') {
                $subjectToApplicant = "Your Leave Application ".$leave_request_id." - Cancel Request Sent";
            }
        }

        if($data['leave_status'] == 'B' || $data['leave_status'] == 'A' || $data['leave_status'] == 'R' || $data['leave_status'] == 'C') {
            $this->common_lib->sendEmail($to_applicant_email, $subjectToApplicant, $messageToApplicant.$message);
        }

        // Send to approvers
        $subjectToApproverL1 = "Action Required: Leave Application ".$leave_request_id; // default
        if($data['leave_status'] == 'O' || $data['leave_status'] == 'A' || $data['leave_status'] == 'R' || $data['leave_status'] == 'C') {
            $subjectToApproverL1 = "Reviewed: Leave Application ".$leave_request_id." - ".$leave_status;
            $subjectToApproverL2 = "Action Required: Leave Application ".$leave_request_id." - ".$leave_status;
            if($data['leave_status'] != 'O') {
                $subjectToApproverL2 = "Reviewed: Leave Application ".$leave_request_id." - ".$leave_status;
            }          
            if($data['leave_status'] == 'C' && $data['cancelled_by'] == $data['user_id']) {
                $subjectToApproverL1 = "No Action Required: Leave Application ".$leave_request_id." - Withdrawn & Cancelled";
                $subjectToApproverL2 = "No Action Required: Leave Application ".$leave_request_id." - Withdrawn & Cancelled";
            }
            if($data['cancel_requested'] == 'Y'  && $data['leave_status'] != 'C') {
                $subjectToApproverL1 = "Action Required: Cancel Leave Application ".$leave_request_id; 
                $subjectToApproverL2 = "Action Required: Cancel Leave Application ".$leave_request_id;
            }
        }

        // Send to approvers - If L1 & L2 are same person, so either Approve/Reject/Cancel if requested
        if(($L1_supervisior_userid == $L2_director_userid) && ($data['leave_status'] != 'O')) {
            $greetingsToApprovers = 'Hi '.$L1_supervisior_name. ',';
            $this->common_lib->sendEmail($L1_supervisior_email, $subjectToApproverL1, $greetingsToApprovers.$messageToApprovers.$message);
        }
        
        // Send to approvers - If L1 & L2 are different person | In Review/Approve/Reject/Cancel if requested 
        if(($L1_supervisior_userid != $L2_director_userid))
        {
            // Send to L1
            $greetingsToApproversL1 = 'Hi '.$L1_supervisior_name. ',';
            $this->common_lib->sendEmail($L1_supervisior_email, $subjectToApproverL1, $greetingsToApproversL1.$messageToApprovers.$message);

            // Send to L2
            if($data['leave_status'] == 'O' || $data['cancel_requested'] == 'Y' || $data['leave_status'] == 'A' || $data['leave_status'] == 'R' || $data['leave_status'] == 'C') {
                $greetingsToApproversL2 = 'Hi '.$L2_director_name. ',';
                $this->common_lib->sendEmail($L2_director_email, $subjectToApproverL2, $greetingsToApproversL2.$messageToApprovers.$message);
            }
        }
        
        
    }

    function getEmpLeaveBalance_get() {
        $this->checkRolePermissions(array(
            'adminAccess',
        ));
        $perPage = isset($_SERVER['HTTP_PERPAGE']) ? $_SERVER['HTTP_PERPAGE'] : 30; // rows per page
        $currentPageIndex = isset($_SERVER['HTTP_PAGE']) ? $_SERVER['HTTP_PAGE'] : 0; // page number array index
        $offset = $currentPageIndex * $perPage;
        $totalRecords = $this->leave_model->get_leave_balance(NULL, FALSE, NULL, NULL, TRUE);
        $result_array = $this->leave_model->get_leave_balance(NULL, TRUE, $perPage, $offset, TRUE);
        if ($result_array['data_rows']) {
            $result_array['num_rows'] = $totalRecords['num_rows'];
            $this->responseData['data'] = $result_array;
            $this->statusCode = REST_Controller::HTTP_OK;
        } else {
            $this->responseData['message'] = 'No result found';
            $this->responseData['data'] = null;
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->statusCode = REST_Controller::HTTP_OK;
        $this->response($this->responseData, $this->statusCode);
    }

    function uploadLeaveData_post() {
        if($this->post('action') === 'updateBatch') {
            //update batch
            $postData = $this->post('leaveBalance');
            $newData = array();
            if(isset($postData) && sizeof($postData)>0 && sizeof($postData)<=100) {
                $arrayKeys = array_keys($postData[0]);
                if(
                    $arrayKeys[0] == 'UID' && $arrayKeys[1] == 'EMPLOYEE_NAME' 
                    && $arrayKeys[2] == 'CL' && $arrayKeys[3] == 'SL' 
                    && $arrayKeys[4] == 'PL' && $arrayKeys[5] == 'OL' 
                    && $arrayKeys[6] =='CO' && $arrayKeys[7] == 'BULK_UPDATED_ON') {
                    foreach($postData as $key => $val) {
                        $newData[$key]['user_id'] = $val['UID'];
                        $newData[$key]['cl'] = $val['CL'];
                        $newData[$key]['pl'] = $val['PL'];
                        $newData[$key]['sl'] = $val['SL'];
                        $newData[$key]['ol'] = $val['OL'];
                        $newData[$key]['co'] = $val['CO'];
                        $newData[$key]['leave_balance_bulk_updated_on'] = date('Y-m-d H:i:s');
                        $newData[$key]['leave_balance_bulk_updated_by'] = $this->getUserId();
                    }
                    $affectedRows = $this->leave_model->import_batch($newData);
                    if($affectedRows) {
                        $this->responseData['message'] = $affectedRows.' records have been updated successfully.';
                        $this->statusCode = REST_Controller::HTTP_OK;
                    } else {
                        $this->responseData['message'] = 'Error occured while updating data.';
                        $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                    }
                } else {
                    $this->responseData['message'] = 'You have either selected an invalid template or corrupted the template headers. Please try downloading a new one and only updating balance cells.';
                    $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
                }
            } else {
                $this->responseData['message'] = 'Invalid Data : '.sizeof($postData).' rows were found in the uploaded template which is not allowed.';
                $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
            }
            
        } else {
            $this->statusCode = REST_Controller::HTTP_BAD_REQUEST;
        }
        $this->response($this->responseData, $this->statusCode);
    }
}
