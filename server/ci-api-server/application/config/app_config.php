<?php
/* 
* Application Specific Custom Config Define Here and Use in Application
* $this->config->item('item_key_name');
* Load this file at autoload.php 
* $autoload['config'] = array('app_config');
*/

defined('BASEPATH') OR exit('No direct script access allowed');

// Admin Controller, Site Controller and View Directory Config
$config['site_view_dir'] = 'site/'; //application/views/site/
$config['admin_view_dir'] = 'admin/'; //application/views/admin/

// Email config
$config['app_admin_email'] = 'portal@unitedexploration.co.in';
$config['app_admin_email_cc'] = '';
$config['app_admin_email_bcc'] = '';
$config['app_admin_email_name'] = 'UEIPL MyApp';
$config['app_email_subject_prefix'] = 'MyApp -';
$html_email_header = '';
$html_email_footer = '<div id="message_footer" style="margin-top: 5px; font-size: 11px;"><p>* To view the message, please use an HTML compatible email viewer. This is a system generated email. Please do not reply.</p></div>';
$config['app_email_header'] = $html_email_header;
$config['app_email_footer'] = $html_email_footer;

// App name, other static texts
$config['app_html_title'] = 'MyApp - United Exploration India';
$config['app_html_title_admin'] = '';
$config['app_name'] = 'MyApp';

// Site Meta
$config['app_meta_keywords'] = 'Employee Portal, ESS Portal, Self Service Portal, Employee Login, Timesheet Portal';
$config['app_meta_description'] = '';
$config['app_meta_author'] = '';

// Footer copy right, versions
$config['app_copy_right'] = '&copy; '.date('Y').' United Exploration. All Rights Reserved.';
$config['app_admin_copy_right'] = 'Copyright &copy; '.date('Y').' United Exploration.</a>';
$config['app_version'] = 'App v11.0'; // Recommended format CIVerMajor.RelVer.UIVer


