<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class ExceptionHook {

    public function SetExceptionHandler() {
        set_exception_handler(array($this, 'HandleExceptions'));
    }

    public function HandleExceptions($exception) {
        $msg = 'Exception of type \'' . get_class($exception) . '\' occurred with Message: ' . $exception->getMessage() . ' in File ' . $exception->getFile() . ' at Line ' . $exception->getLine();
        $msg .="\r\n Backtrace \r\n";
        $msg .=$exception->getTraceAsString();
        log_message('error', $msg, TRUE);
        mail('mahapatra.saikat@gmail.com', 'UEIPL Portal - An Exception Occurred', $msg, 'From: webuidevs@gmail.com');
    }

}
