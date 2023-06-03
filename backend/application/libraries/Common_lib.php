<?php

/**
 * Common Library
 * This library is responsible for all common operation required by controllers
 * @access public
 * @author Saikat Mahapatra <mahapatra.saikat@gmail.com>
 * @copyright (c) 2017, Saikat Mahapatra
 * 
 */

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Common_lib
{

    var $CI;
    var $data;
    var $responseData = array();
    var $statusCode = '';

    function __construct()
    {
        $this->CI = &get_instance();
        $this->CI->responseData = [];
    }

    function generate_rand_id($length = 6, $alpha_numeric = TRUE)
    {
        $str = "";
        if ($alpha_numeric == TRUE) {
            $chars = "2346789ABCDEFGHJKLMNPQRTUVWX@$%!"; // Remove confuing digits, alphabets
        } else {
            $chars = "1234567890";
        }

        $size = strlen($chars);
        for ($i = 0; $i < $length; $i++) {
            $str .= $chars[rand(0, $size - 1)];
        }
        return $str;
    }

    /*Convert input date to mysql date*/
    function convert_to_mysql($date)
    {
        return date('Y-m-d', strtotime($date));
    }

    /*Convert date to display format date*/
	function display_date($date, $time=false, $birthday=false, $format=null){
        if($date != NULL){
            if($time == true){
                $output_format = 'd-m-Y h:i:sa';
                if($format){
                    $output_format = $format;
                }
                return date($output_format, strtotime($date));
            }
            if($birthday == true){
                $dob = explode('-',$date);
                return $this->display_ordinal_suffix($dob[2]).' '.date('F',strtotime($date));
            }
            else{
                $output_format = 'd-m-Y';
                if($format){
                    $output_format = $format;
                }
                return date($output_format, strtotime($date));
            }
        }else{
            return '';
        }				
    }

    /*Display ordinal_suffix st, th, rd*/    
    function display_ordinal_suffix($num){
        $num = $num % 100; // protect against large numbers
        if($num < 11 || $num > 13){
                switch($num % 10){
                case 1: return $num.'<sup>st</sup>';
                case 2: return $num.'<sup>nd</sup>';
                case 3: return $num.'<sup>rd</sup>';
            }
        }
        return $num.'<sup>th</sup>';
    }

    function get_greetings(){
        // 24-hour format of an hour without leading zeros (0 through 23)
        $h = date('G');
        if ( $h >= 5 && $h <= 11 ) {
            return "Good Morning";
        } else if ( $h >= 12 && $h <= 18 ) {
            return "Good Afternoon";
        } else if ( $h >= 19 || $h <= 4 ) {
            return "Good Evening";
        }
    }

    function sendEmail($to, $subject, $message_html, $cc=NULL) {
        $config['mailtype'] = 'html';
        $this->CI->email->initialize($config);
        $this->CI->email->to($to);
        if(isset($cc)){
            $this->CI->email->cc($cc);
        }
        $this->CI->email->from($this->CI->config->item('app_admin_email'), $this->CI->config->item('app_admin_email_name'));
        $this->CI->email->subject($subject);
        $message = '<html><body><div style="border-top: 5px solid #1976d2; border-bottom: 5px solid #1976d2; padding-top: 20px; padding-bottom: 20px;">';
        // $message .= '<table rules="all" style="border-color: #666;" cellpadding="10" border="1">';
        // $message .= "<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>ertert</td></tr>";
        // $message .= "<tr><td><strong>Email:</strong> </td><td>user@email.com</td></tr>";
        // $message .= "<tr><td><strong>Type of Change:</strong> </td><td>Account Type Changed</td></tr>";
        // $message .= "<tr><td><strong>Urgency:</strong> </td><td>1-High</td></tr>";
        // $message .= "<tr><td><strong>URL To Change (main):</strong> </td><td>Some URL</td></tr>";
        // $message .= "<tr><td><strong>NEW Content:</strong> </td><td>generic comments</td></tr>";
        // $message .= "</table>";
        $message .= $message_html;
        $message .= "<p>*** This is a system generated email. Please do not reply.</p>";
        $message .= "</div></body></html>";
        $this->CI->email->message($message);
        // echo $to;
        // print_r($cc);
        // echo $subject;
        // echo $message;
        $this->CI->email->send();
        //echo $this->CI->email->print_debugger();
    }
    
}
