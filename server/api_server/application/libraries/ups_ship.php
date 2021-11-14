<?php
class ups_ship{
	
	var $CI;

    function  __construct(){
        $this->CI =& get_instance();
    }
	
	function get_shipping_rate($to_zip,$to_city){
	   $rate = "";
	   $Url = join("&", array("http://www.ups.com/using/services/rave/qcostcgi.cgi?accept_UPS_license_agreement=yes",
	   "10_action=3",
	   "13_product=".'GND',
	   "14_origCountry=".'US',
	   "15_origPostal=".'98052',
	   "origCity=".'Redmond',
	   "19_destPostal=".$to_zip,
	   "20_destCity=".$to_city,
	   "22_destCountry=".'US',
	   "23_weight=.5",
	   "47_rateChart=".'Regular+Daily+Pickup',
	   "48_container=00",
	   "49_residential=01",
	   "25_length=0",
	   "26_width=.5",
	   "27_height=.01")); 
   
   		#echo $Url; die();

	   $Resp = fopen($Url, "r");
	   while(!feof($Resp)){   
		  $Result = fgets($Resp, 500);
		  $Result = explode("%", $Result);
		  $Err = substr($Result[0], -1);
	
		  switch($Err){
			 case 3:
			 $ResCode = $Result[8];
			 break;
			 case 4:
			 $ResCode = $Result[8];
			 break;
			 case 5:
			 $ResCode = $Result[1];
			 break;
			 case 6:
			 $ResCode = $Result[1];
			 break;
		  }
	   }
	   fclose($Resp);
	   if(!$ResCode){
		  $ResCode = "An error occured.";
	   }
	   return $ResCode;
	}

}
?>
