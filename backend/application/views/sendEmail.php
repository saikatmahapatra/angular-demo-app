<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<form method="POST" action="sendEmail">
    <div>
    <input type="text" name="to" value="" placeholder="To Address" require>
    </div>
    <div>
    <input type="text" name="subject" placeholder="subject" require>
    </div>
    <div>
    <textarea name="message" placeholder="message" require></textarea>
    </div>
    <div>
     <button type="submit" class="btn btn-primary">Send</button>
    </div>
</form>