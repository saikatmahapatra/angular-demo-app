<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Svc extends CI_Controller {

    var $data;

    function __construct() {
        parent::__construct();
        /**
         * Command in cPanel
         * /usr/local/bin/php /home/unitedeipl/public_html/portal/backend/index.php svc test_cron_job
         */
        
    }

    function index()
	{
		$this->load->view('welcome_message');
	}

    function sendBirthdayEmail(){
        /**
         * Command in cPanel (daily 1 time)
         * /usr/local/bin/php /home/unitedeipl/public_html/portal/backend/index.php svc sendBirthdayEmail
         */
        $this->load->model('user_model');
        $result_array = $this->user_model->find_birthday();
        //print_r($result_array['data_rows']); die();

        foreach($result_array['data_rows'] as $key => $val){
            $message = "<strong>Dear ".$val['user_full_name'].",</strong> <br>";
            $message .= '<p>Wishing you a very happy birthday and a wonderful year.</p>';
            $cc = array("admin@unitedexploration.co.in");
            if(isset($val['user_email2'])) {
                array_push($cc, $val['user_email2']);
            } 
            $this->common_lib->sendEmail($val['user_email'], "Happy Birthday to ".$val['user_full_name'], $message, $cc);
        }
    }

    function sendWorkAnniversaryEmail(){
        /**
         * Command in cPanel (daily 1 time)
         * /usr/local/bin/php /home/unitedeipl/public_html/portal/backend/index.php svc sendWorkAnniversaryEmail
         */
        $this->load->model('user_model');
        $result_array = $this->user_model->get_employee_anniversary();
        //print_r($result_array); //die();

        foreach($result_array['data_rows'] as $key => $val){
            $message = "<strong>Dear ".$val['user_full_name'].",</strong> <br>";
            $message.= '<p>Congratulations on reaching '.$this->getOrdinalSuffix($result_array["anniversary"]). ' service milestone with United Exploration India Pvt. Ltd. The success of our organization is a direct result of your efforts and dedication.</p>';
            $message.= '<p>We look forward to your ongoing contributions and a bright and successful future together.</p>';
            $cc = array("admin@unitedexploration.co.in");
            if(isset($val['user_email2'])) {
                array_push($cc, $val['user_email2']);
            } 
            $this->common_lib->sendEmail($val['user_email'], "Congratulations on Your Service Anniversary - ".$val['user_full_name'], $message, $cc);
        }
    }

    function getOrdinalSuffix($num){
        $num = $num % 100; // protect against large numbers
        if($num < 11 || $num > 13){
             switch($num % 10){
                case 1: return $num.'st';
                case 2: return $num.'nd';
                case 3: return $num.'rd';
            }
        }
        return $num.'th';
    }

    // function updatePLBalance(){
    //     /**
    //      * Run per month start of day
    //      * Command in cPanel
    //      * /usr/local/bin/php /home/unitedeipl/public_html/portal/backend/index.php svc updatePLBalance
    //      */
    //     $this->load->model('leave_model');
    //     $result_array = $this->leave_model->update_pl_balance();
    //     //echo $result_array;
    // }

    // function updateCLBalance(){
    //     /**
    //      * Run 1st Jan every year
    //      * Command in cPanel
    //      * /usr/local/bin/php /home/unitedeipl/public_html/portal/backend/index.php svc updateCLBalance
    //      */
    //     $this->load->model('leave_model');
    //     $result_array = $this->leave_model->update_cl_balance();
    //     //echo $result_array;
    // }

    // function updateOLBalance(){
    //     /**
    //      * Run 1st Jan every year
    //      * Command in cPanel
    //      * /usr/local/bin/php /home/unitedeipl/public_html/portal/backend/index.php svc updateOLBalance
    //      */
    //     $this->load->model('leave_model');
    //     $result_array = $this->leave_model->update_ol_balance();
    //     //echo $result_array;
    // }

    function checkUser() {
        echo exec('whoami');
    }

    function sendEmail() {
        $to = $this->input->post('to');
        $sub = $this->input->post('subject');
        $msg = $this->input->post('message');


        if($to) {
            $config['mailtype'] = 'html';
            $this->email->initialize($config);
            $this->email->to($to);
            $this->email->from('noreply@unitedexploration.co.in', 'MyApp ESS Portal');
            $this->email->subject($sub);
            $message = '<html><body><div style="border-top: 5px solid #1976d2; border-bottom: 5px solid #1976d2; padding-top: 20px; padding-bottom: 20px;">';
            $message .= $msg;
            $message .= "<p>*** This is a system generated email. Please do not reply.</p>";
            $message .= "</div></body></html>";
            $this->email->message($message);
            $this->email->send();
            echo "Email Sent ".date('Y-m-d h:i:s tt');
        }


        $this->load->view('sendEmail');
    }
}

?>
