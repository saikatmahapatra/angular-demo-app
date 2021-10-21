<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------
| BREADCRUMB CONFIG
| -------------------------------------------------------------------
| This file will contain some breadcrumbs' settings.
|
| $config['crumb_divider']		The string used to divide the crumbs
| $config['tag_open'] 			The opening tag for breadcrumb's holder.
| $config['tag_close'] 			The closing tag for breadcrumb's holder.
| $config['crumb_open'] 		The opening tag for breadcrumb's holder.
| $config['crumb_close'] 		The closing tag for breadcrumb's holder.
|
| Defaults provided for twitter bootstrap 2.0
*/

$config['crumb_divider'] = '<span class="divider"></span>';
$config['tag_open'] = '<div class="row"><div class="col-12"><nav aria-label="breadcrumb"><ol class="breadcrumb float-right">';
$config['tag_close'] = '</ol></nav></div></div>';
$config['crumb_open'] = '<li class="breadcrumb-item">';
$config['crumb_last_open'] = '<li class="breadcrumb-item active">';
$config['crumb_close'] = '</li>';


/* End of file breadcrumbs.php */
/* Location: ./application/config/breadcrumbs.php */