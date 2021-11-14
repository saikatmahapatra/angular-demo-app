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

class Common_lib {

    var $CI;
    var $data;

    function __construct() {
        $this->CI = & get_instance();
        $this->CI->load->model('user_model');
        $this->CI->data['alert_message'] = $this->display_flash_message();

        $this->CI->data['is_admin'] = ($this->CI->uri->segment(1) == 'admin' || $this->CI->session->userdata('sess_template') == 'admin') ? TRUE : FALSE;
    }

    /**
     * Load common view elements like header, footer, sidebar etc
     * @param type $template_view_elements_dir_name
     * @param type $title
     * @param type $meta_keywords
     * @param type $meta_desc
     * @param type $meta_author
     * @return type
     */
    function init_template_elements($view = NULL, $html_title = NULL, $meta_keyword = NULL, $meta_desc = NULL, $meta_author = NULL) {
        $this->CI->data['sess_user_name'] = isset($this->CI->session->userdata['sess_user']['user_firstname']) ? ucwords(strtolower($this->CI->session->userdata['sess_user']['user_firstname'])) : 'Guest';
        $this->CI->data['sess_user_id'] = isset($this->CI->session->userdata['sess_user']['id']) ? ucwords(strtolower($this->CI->session->userdata['sess_user']['id'])) : NULL;
        
        if($view == 'site'){
            $this->CI->data['el_html_tag_title'] = isset($html_title) ? $html_title : $this->CI->config->item('app_html_title');
            $this->CI->data['el_html_tag_meta_keywords'] = isset($meta_keyword) ? $meta_keyword : $this->CI->config->item('app_meta_keywords');
            $this->CI->data['el_html_tag_meta_description'] = isset($meta_desc) ? $meta_desc : $this->CI->config->item('app_meta_description');
            $this->CI->data['el_html_tag_meta_author'] = isset($meta_author) ? $meta_author : $this->CI->config->item('app_meta_author');
            $this->CI->data['el_html_head'] = $this->CI->load->view('_layouts/elements/html_head', $this->CI->data, TRUE);
            $this->CI->data['el_navbar'] = $this->CI->load->view('_layouts/elements/navbar', $this->CI->data, TRUE);
            $this->CI->data['el_footer'] = $this->CI->load->view('_layouts/elements/footer', $this->CI->data, TRUE);
        }
        if($view == 'admin'){
            $this->CI->data['el_html_tag_title'] = isset($html_title) ? $html_title : $this->CI->config->item('app_html_title');
            $this->CI->data['el_html_tag_meta_keywords'] = isset($meta_keyword) ? $meta_keyword : $this->CI->config->item('app_meta_keywords');
            $this->CI->data['el_html_tag_meta_description'] = isset($meta_desc) ? $meta_desc : $this->CI->config->item('app_meta_description');
            $this->CI->data['el_html_tag_meta_author'] = isset($meta_author) ? $meta_author : $this->CI->config->item('app_meta_author');
            $this->CI->data['el_html_head'] = $this->CI->load->view('_layouts/elements/admin_html_head', $this->CI->data, TRUE);
            $this->CI->data['el_footer'] = $this->CI->load->view('_layouts/elements/admin_footer', $this->CI->data, TRUE);
            $this->CI->data['el_navbar'] = $this->CI->load->view('_layouts/elements/admin_navbar', $this->CI->data, TRUE);
        }
        return $this->CI->data;
    }

    /**
     * This will add javascript(controller and its all view specific) through controller.
     * @param type $files | file name
     * @return string
     */
    function add_javascript($files = array()) {
		$file_path = 'assets/dist/js/';
		$ext = '.min.js'; // .js | .min.js
        $common_files = array(
            'ajax',            
            'app'         
        );
        $load_files = array_merge($common_files, $files);
        $create_tag = '';
        foreach ($load_files as $index => $file_name) {
            $create_tag.='<script src="' . base_url($file_path.$file_name.$ext) . '"></script>' . "\n";
        }
        return $create_tag;
    }

    /**
     * Create app log file
     * @param type $path
     * @param type $file_name
     * @param type $data
     * @param type $mode
     */
    function write_log($path = 'log/', $file_name = NULL, $data = NULL, $mode = 'x+') {
        $this->CI->load->helper('file');
        //$data = 'Welcome';
        //$file_name = time() . '.txt';
        //$path = 'app_log/';
        $file = $path . $file_name;
        $res = write_file($file, $data, $mode);
    }

    function render_pagination($total_rows, $limit_per_page = NULL, $additional_segment = NUll) {
        $this->CI->load->library('pagination');
        $directory = $this->CI->router->directory;
        $controller = $this->CI->router->class;
        $method = $this->CI->router->method;
        if (count($_GET) > 0) {
            $config['suffix'] = '?' . http_build_query($_GET, '', "&");
        }

        $config['base_url'] = base_url().$directory.$controller.'/'.$method.'/page/';
        if($additional_segment !=NULL){
            $config['base_url'] = base_url() . $additional_segment . '/page/';
        }

        $config['total_rows'] = $total_rows;
        $config['per_page'] = ($limit_per_page == NULL) ? '30' : $limit_per_page;
        $config['uri_segment'] = $this->CI->uri->total_segments(); #print_r(end($this->CI->uri->segment_array()));
        $config['num_links'] = 2;
        
        $config['full_tag_open'] = '<nav aria-label="Page navigation"><ul class="pagination">';
        $config['full_tag_close'] = '</ul></nav>';
        $config['cur_tag_open'] = '<li class="page-item active"><a class="page-link">';
        $config['cur_tag_close'] = '</a></li>';
        $config['prev_link'] = '&lt;&lt;';
        $config['prev_tag_open'] = '<li class="page-item prev">';
        $config['prev_tag_close'] = '</li>';
        $config['next_link'] = '&gt;&gt;';
        $config['next_tag_open'] = '<li class="page-item">';
        $config['next_tag_close'] = '</li>';
        $config['first_link'] = 'First';
        $config['first_tag_open'] = '<li class="page-item">';
        $config['first_tag_close'] = '</li>';
        $config['first_url'] = ''; //An alternative URL to use for the “first page” link.
        $config['last_link'] = 'Last';
        $config['last_tag_open'] = '<li class="page-item">';
        $config['last_tag_close'] = '</li>';

        $config['num_tag_open'] = '<li class="page-item">';
        $config['num_tag_close'] = '</li>';
        $config['anchor_class'] = 'page-link';
		$config['attributes'] = array('class' => 'page-link');
        $config['display_pages'] = TRUE; // TRUE = Show number | FALSE = Hide Nos, Show Next, Prev Link
        $config['use_page_numbers'] = TRUE;
        $config['page_query_string'] = FALSE;
        $config['reuse_query_string'] = TRUE;
        $this->CI->pagination->initialize($config);
        return $this->CI->pagination->create_links();
    }

    function upload_file($html_control, $upload_param) {
        $config['upload_path'] = realpath(APPPATH . '../' . $upload_param['upload_path']);
        $config['allowed_types'] = (!empty($upload_param['allowed_types'])) ? $upload_param['allowed_types'] : 'gif|jpg|png|jpeg|pdf|doc|docx|rtf|text|txt';
        $config['max_size'] = isset($upload_param['max_size']) ? $upload_param['max_size'] : '4096'; //4 MB
        $file_name = $_FILES[$html_control]['name'];
        $config['file_name'] = isset($upload_param['file_new_name']) ? $upload_param['file_new_name'] : $file_name;
        $this->CI->load->library('upload', $config);
        if (!$this->CI->upload->do_upload($html_control)) {            
            return array('upload_error' => $this->CI->upload->display_errors('<div>', '</div>'));
            //$this->CI->form_validation->set_message($html_control, $this->CI->upload->display_errors());
            //return FALSE;
        } else {
            $this->CI->data = array('upload_data' => $this->CI->upload->data());
            $this->file_full_upload_path = $upload_param['upload_path'] . '/' . $this->CI->data['upload_data']['file_name'];
            //For image upload
            if (isset($upload_param['large_img_require']) && ($upload_param['large_img_require'] == TRUE)) {
                $this->large_image_path = $upload_param['large_img_path'] . '/' . $this->CI->data['upload_data']['file_name'];
                $config = array();
                $config['image_library'] = 'gd2';
                $config['source_image'] = $this->file_full_upload_path;
                $config['create_thumb'] = FALSE;
                $config['maintain_ratio'] = TRUE;
                $config['max_width'] = $upload_param['large_img_width'];
                $config['max_height'] = $upload_param['large_img_height'];
                $config['width'] = $upload_param['large_img_width'];
                $config['height'] = $upload_param['large_img_height'];
                $config['new_image'] = $this->large_image_path;
                $this->CI->load->library('image_lib', $config);
                $this->CI->image_lib->initialize($config);
                $this->CI->image_lib->resize();
                $this->CI->image_lib->clear();
            }
            if (isset($upload_param['thumb_img_require']) && ($upload_param['thumb_img_require'] == TRUE)) {
                $this->thumb_image_path = $upload_param['thumb_img_path'] . '/' . $this->CI->data['upload_data']['file_name'];
                $config = array();
                $config['image_library'] = 'gd2';
                $config['source_image'] = $this->file_full_upload_path;
                $config['create_thumb'] = FALSE;
                $config['maintain_ratio'] = TRUE;
                $config['max_width'] = $upload_param['thumb_img_width'];
                $config['max_height'] = $upload_param['thumb_img_height'];
                $config['width'] = $upload_param['thumb_img_width'];
                $config['height'] = $upload_param['thumb_img_height'];
                $config['new_image'] = $this->thumb_image_path;
                $this->CI->load->library('image_lib', $config);
                $this->CI->image_lib->initialize($config);
                $this->CI->image_lib->resize();
                $this->CI->image_lib->clear();
            }
            if (isset($upload_param['small_img_require']) && ($upload_param['small_img_require'] == TRUE)) {
                $this->small_image_path = $upload_param['small_img_path'] . '/' . $this->CI->data['upload_data']['file_name'];
                $config = array();
                $config['image_library'] = 'gd2';
                $config['source_image'] = $this->file_full_upload_path;
                $config['create_thumb'] = FALSE;
                $config['maintain_ratio'] = TRUE;
                $config['max_width'] = $upload_param['small_img_width'];
                $config['max_height'] = $upload_param['small_img_height'];
                $config['width'] = $upload_param['small_img_width'];
                $config['height'] = $upload_param['small_img_height'];
                $config['new_image'] = $this->small_image_path;
                $this->CI->load->library('image_lib', $config);
                $this->CI->image_lib->initialize($config);
                $this->CI->image_lib->resize();
                $this->CI->image_lib->clear();
            }
            if (isset($upload_param['check_img_size']) && ($upload_param['check_img_size'] == TRUE)) {
                $image_width = $this->CI->data['upload_data']['image_width'];
                $image_height = $this->CI->data['upload_data']['image_height'];
                $allowed_img_width = $upload_param['allowed_img_width'];
                $allowed_img_height = $upload_param['allowed_img_height'];
                $is_valid = $this->is_valid_dimension($image_width, $image_height, $allowed_img_width, $allowed_img_height);
                if ($is_valid == TRUE) {
                    return $this->CI->data['upload_data'];
                } else {
                    @unlink($this->file_full_upload_path);
                    @unlink($this->large_image_path);
                    @unlink($this->thumb_image_path);
                    @unlink($this->small_image_path);
                    return array('upload_error' => 'Image dimension is not allowed to upload. Image dimension should be '.$allowed_img_width.'x'.$allowed_img_height);
                }
            }
            if (isset($upload_param['unlink_source_file']) && ($upload_param['unlink_source_file'] == TRUE)) {
                unlink($this->file_full_upload_path);
            }
            //For image upload ends
            return $this->CI->data['upload_data'];
        }
    }

    function is_valid_dimension($image_width, $image_height, $allowed_img_width, $allowed_img_height) {        
        if (($image_width == $allowed_img_width) && ($image_height == $allowed_img_height)) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function unlink_file($path) {
        foreach ($path as $key => $value) {
            if (file_exists($value)) {
                unlink($value);
            }
        }
    }

    function generate_rand_number($length = 4, $append_date = TRUE) {
        // We are removine confusing characters
        // Small case    :    i, o,s 
        // Upper case    :    I, O, S
        // Digits        :    1(One), 0(zero), 5(Five)
        $str = "";
        $chars = "2346789";
        $size = strlen($chars);
        for ($i = 0; $i < $length; $i++) {
            $str .= $chars[rand(0, $size - 1)];
        }
        if ($append_date == TRUE) {
            $str = date('mdy') . $str;
        }
        return $str;
    }

    function generate_password($length = 6) {
        $str = "";
        $chars = "2346789ABCDEFGHJKLMNPQRTUVWX@$%!";    // Remove confuing digits, alphabets
        $size = strlen($chars);
        for ($i = 0; $i < $length; $i++) {
            $str .= $chars[rand(0, $size - 1)];
        }
        return $str;
    }

    function recursive_remove_directory($directory) {
        foreach (glob("{$directory}/*") as $file) {
            if (is_dir($file)) {
                recursive_remove_directory($file);
            } else {
                unlink($file);
            }
        }
        rmdir($directory);
    }

    /**
     * 
     * @param type $key_name
     * @return boolean
     */
    function get_sess_user($key_name = NULL) {
        if (isset($this->CI->session->userdata['sess_user'])) {
            if (isset($key_name)) {
                try {
                    return $this->CI->session->userdata['sess_user'][$key_name];
                } catch (Exception $ex) {
                    return $ex->getMessage();
                }
            } else {
                return $this->CI->session->userdata['sess_user'];
            }
        } else {
            return FALSE;
        }
    }

    /**
     * Set flash message to display
     */
    function set_flash_message($msg, $css = NULL){
        $this->CI->session->set_flashdata('flash_message', $msg);
        $this->CI->session->set_flashdata('flash_message_css', $css);
    }

    /**
     * Display Flash Message
     */
    function display_flash_message(){
        $msg = $this->CI->session->flashdata('flash_message');
        $css = $this->CI->session->flashdata('flash_message_css');
        $msg_html = NULL;
        if(isset($msg)){
         $msg_html = '<div class="alert ' . $css . ' alert-dismissable auto-closable-alert"><button type="button" class="close" data-dismiss="alert" aria-hidden="TRUE">&times;</button>'.$msg.'</div>';
        }else{
            $msg_html = NULL; 
        }
        $this->CI->data['alert_message'] = NULL;
        return $msg_html;
    }

    /**
     * Is user logged in
     * @return boolean
     */
    function is_logged_in() {
        $result = FALSE;
        if (isset($this->CI->session->userdata['sess_user']) && (isset($this->CI->session->userdata['sess_user']['id']))) {
            $result = TRUE;
        } else {
            $result = FALSE;
        }
        return $result;
    }

    /**
     * Redirect if user not logged
     * @return type
     */
    function auth_user($login_screen_name = 'site') {
        $is_logged_id = $this->is_logged_in();
        if ($is_logged_id == FALSE) {
            if ($login_screen_name == 'site') {
                redirect('user/login');
            }
            if ($login_screen_name == 'admin') {
                redirect('admin/user/login');
            }
        }
    }

    function get_user_role() {
        $res = array();
        $user_role_id = $this->CI->session->userdata['sess_user']['user_role'];
        $role = $this->CI->user_model->get_user_role($user_role_id);
        if (isset($role)) {
            $res = $role[0];
        }
        return $res;
    }

    /**
     * Check user authorization
     * @param type $check_permissions
     * @param type $redirect
     * @param type $redirect_uri
     */
    function is_auth($check_permissions, $redirect = TRUE, $redirect_uri = NULL) {
        $match_count = 0;
        $result = array('is_authorized' => FALSE, 'status' => '0', 'message' => 'checking permission');
        $user_role_id = $this->CI->session->userdata['sess_user']['user_role'];
        $arr_user_permissions = $this->CI->user_model->get_user_role_permission($user_role_id);
        if (isset($check_permissions) && count($check_permissions) > 0) {
            if (isset($arr_user_permissions) && count($arr_user_permissions) > 0) {
                $match_count = count(array_intersect($arr_user_permissions, $check_permissions));
                if ($match_count > 0) {
                    $result = array('is_authorized' => TRUE, 'status' => '2', 'message' => 'some of the permissions match found and validated');
                } else {                    
                    $result = array('is_authorized' => FALSE, 'status' => '3', 'message' => 'no permissions match found or validated');
                }
            } else {                
                $result = array('is_authorized' => FALSE, 'status' => '5', 'message' => 'user role and permission list not found in database');
            }
        } else {
            $result = array('is_authorized' => TRUE, 'status' => '6', 'message' => 'no permissions checking array passed');
        }
        //print_r($result);
        //die();
        if ($redirect == TRUE) {
            if($result['is_authorized'] == FALSE){
                $this->CI->session->unset_userdata('sess_user');
                $uri = isset($redirect_uri) ? $redirect_uri : $this->CI->router->directory.'error/auth';
                redirect($uri);
            }            
        }
        if($redirect == FALSE){
            return $result['is_authorized'];
        }
        //return $result;
    }
	
	/*Get User profile Image*/
	function get_user_profile_img() {
		//$res = array();
        $data = $this->CI->user_model->get_user_profile_pic($this->CI->session->userdata['sess_user']['id']);
		return $data[0]['user_profile_pic'];
    }
	
	/*Convert input date to mysql date*/
	function convert_to_mysql($date){
		return date('Y-m-d',strtotime($date));
	}
	
	/*Convert date to display format date*/
	function display_date($date, $time=NULL, $birthday=NULL){
		if($time == TRUE){
			return date('d-m-Y h:i:s a',strtotime($date));
        }
        if($birthday == TRUE){
            $dob = explode('-',$date);            
			return $this->display_ordinal_suffix($dob[2]).' '.date('F',strtotime($date));
        }
        else{
			return date('d-m-Y',strtotime($date));
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
	
	/* URL-safe encoding */	
	function encode($string, $key="", $url_safe=TRUE){
		$output = $string;
		$required_encryption = FALSE;
		$this->CI->load->library('MY_Encrypt');
		if($required_encryption==TRUE){
			$output =  $this->CI->my_encrypt->encode($string, $key="", $url_safe=TRUE);
		}
		return $output;
	}
	
	/* URL-safe decoding */
	function decode($string, $key=""){
		$output = $string;
		$required_encryption = FALSE;
		$this->CI->load->library('MY_Encrypt');
		if($required_encryption==TRUE){
			$output =  $this->CI->my_encrypt->decode($string, $key="");
		}
		return $output;
    }
    
    function force_balance_tags( $text ) {
        $tagstack = array();
        $stacksize = 0;
        $tagqueue = '';
        $newtext = '';
        // Known single-entity/self-closing tags
        $single_tags = array( 'area', 'base', 'basefont', 'br', 'col', 'command', 'embed', 'frame', 'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param', 'source' );
        // Tags that can be immediately nested within themselves
        $nestable_tags = array( 'blockquote', 'div', 'object', 'q', 'span' );
     
        // WP bug fix for comments - in case you REALLY meant to type '< !--'
        $text = str_replace('< !--', '<    !--', $text);
        // WP bug fix for LOVE <3 (and other situations with '<' before a number)
        $text = preg_replace('#<([0-9]{1})#', '&lt;$1', $text);
     
        while ( preg_match("/<(\/?[\w:]*)\s*([^>]*)>/", $text, $regex) ) {
            $newtext .= $tagqueue;
     
            $i = strpos($text, $regex[0]);
            $l = strlen($regex[0]);
     
            // clear the shifter
            $tagqueue = '';
            // Pop or Push
            if ( isset($regex[1][0]) && '/' == $regex[1][0] ) { // End Tag
                $tag = strtolower(substr($regex[1],1));
                // if too many closing tags
                if ( $stacksize <= 0 ) {
                    $tag = '';
                    // or close to be safe $tag = '/' . $tag;
                }
                // if stacktop value = tag close value then pop
                elseif ( $tagstack[$stacksize - 1] == $tag ) { // found closing tag
                    $tag = '</' . $tag . '>'; // Close Tag
                    // Pop
                    array_pop( $tagstack );
                    $stacksize--;
                } else { // closing tag not at top, search for it
                    for ( $j = $stacksize-1; $j >= 0; $j-- ) {
                        if ( $tagstack[$j] == $tag ) {
                        // add tag to tagqueue
                            for ( $k = $stacksize-1; $k >= $j; $k--) {
                                $tagqueue .= '</' . array_pop( $tagstack ) . '>';
                                $stacksize--;
                            }
                            break;
                        }
                    }
                    $tag = '';
                }
            } else { // Begin Tag
                $tag = strtolower($regex[1]);
     
                // Tag Cleaning
     
                // If it's an empty tag "< >", do nothing
                if ( '' == $tag ) {
                    // do nothing
                }
                // ElseIf it presents itself as a self-closing tag...
                elseif ( substr( $regex[2], -1 ) == '/' ) {
                    // ...but it isn't a known single-entity self-closing tag, then don't let it be treated as such and
                    // immediately close it with a closing tag (the tag will encapsulate no text as a result)
                    if ( ! in_array( $tag, $single_tags ) )
                        $regex[2] = trim( substr( $regex[2], 0, -1 ) ) . "></$tag";
                }
                // ElseIf it's a known single-entity tag but it doesn't close itself, do so
                elseif ( in_array($tag, $single_tags) ) {
                    $regex[2] .= '/';
                }
                // Else it's not a single-entity tag
                else {
                    // If the top of the stack is the same as the tag we want to push, close previous tag
                    if ( $stacksize > 0 && !in_array($tag, $nestable_tags) && $tagstack[$stacksize - 1] == $tag ) {
                        $tagqueue = '</' . array_pop( $tagstack ) . '>';
                        $stacksize--;
                    }
                    $stacksize = array_push( $tagstack, $tag );
                }
     
                // Attributes
                $attributes = $regex[2];
                if ( ! empty( $attributes ) && $attributes[0] != '>' )
                    $attributes = ' ' . $attributes;
     
                $tag = '<' . $tag . $attributes . '>';
                //If already queuing a close tag, then put this tag on, too
                if ( !empty($tagqueue) ) {
                    $tagqueue .= $tag;
                    $tag = '';
                }
            }
            $newtext .= substr($text, 0, $i) . $tag;
            $text = substr($text, $i + $l);
        }
     
        // Clear Tag Queue
        $newtext .= $tagqueue;
     
        // Add Remaining text
        $newtext .= $text;
     
        // Empty Stack
        while( $x = array_pop($tagstack) )
            $newtext .= '</' . $x . '>'; // Add remaining tags to close
     
        // WP fix for the bug with HTML comments
        $newtext = str_replace("< !--","<!--",$newtext);
        $newtext = str_replace("<    !--","< !--",$newtext);
     
        return $newtext;
    }
    
    function remove_empty_p( $content ) {
        $content = $this->force_balance_tags( $content );
        $content = preg_replace( '#<p>\s*+(<br\s*/*>)?\s*</p>#i', '', $content );
        $content = preg_replace( '~\s?<p>(\s|&nbsp;)+</p>\s?~', '', $content );
        return $content;
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

}

?>