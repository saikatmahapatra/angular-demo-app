<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/*
  | -------------------------------------------------------------------------
  | Hooks
  | -------------------------------------------------------------------------
  | This file lets you define "hooks" to extend CI without hacking the core
  | files.  Please see the user guide for info:
  |
  |	http://codeigniter.com/user_guide/general/hooks.html
  |
 */
$hook['pre_controller'][] = array(
    'class' => 'ExceptionHook',
    'function' => 'SetExceptionHandler',
    'filename' => 'ExceptionHook.php',
    'filepath' => 'hooks'
);

$hook['pre_system'][] = array(
  'class'     => 'site_down',
  'function' => 'offline_check',
  'filename' => 'site_down.php',
  'filepath' => 'hooks'
);