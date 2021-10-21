<h1><?php echo $title; ?></h1>
<script>
    var timeleft = 10;
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "0";
    } else {
        document.getElementById("countdown").innerHTML = timeleft;
    }
    timeleft -= 1;
    }, 1000);
    setTimeout(function(){ window.location.href= '<?php echo base_url();?>'; }, 10000);
</script>