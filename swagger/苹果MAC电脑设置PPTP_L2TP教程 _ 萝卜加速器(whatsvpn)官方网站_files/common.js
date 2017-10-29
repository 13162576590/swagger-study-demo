$(function(){
	
	$(".whatsvpn_sel_guojia .whatsvpn_zhi").click(function(){
		$(".whatsvpn_sel_guojia .whatsvpn_bottom").slideToggle();
	})
	$(".whatsvpn_sel_guojia .whatsvpn_bottom p").click(function(){
		$(".whatsvpn_sel_guojia .whatsvpn_zhi").html($(this).html());
		$(".whatsvpn_sel_guojia .whatsvpn_bottom").slideUp();
	})
	
	var str_txt="";
	$(".whatsvpn_txt_tong").focus(function(){
		str_txt=$(this).val();
		$(this).val("");
	})
	$(".whatsvpn_txt_tong").blur(function(){
		if($(this).val()=="")
			$(this).val(str_txt);
	})
	
	$(".tc_one li").each(function(a){
		$(this).click(function(){
			$(".tc_one li").removeClass("sel");
			$(this).addClass("sel");
			$(".tc_qie").hide();
			$(".tc_qie").eq(a).show();
		})
	})
	
	
	$(".tc_type li").each(function(a){
		$(".tc_type li:eq("+a+") i").each(function(b){
			$(this).click(function(){
				$(".tc_type li:eq("+a+") i").removeClass("sel");
				$(this).addClass("sel");
			})
		})
	})
	
	host = window.location.host;
	
	String.prototype.endWith=function(endStr){
		  var d=this.length-endStr.length;
		  return (d>=0&&this.lastIndexOf(endStr)==d)
		}
	
	if(host.endWith("whatsvpn.net")){
		//var remote_host="https://m.whatsvpn.org"
	}else{
		//var remote_host="https://gg.51czs.com"
	}
	var remote_host="https://m.whatsvpnweb.info"
	$.ajax(
		    {
		        type:'get',
		        url : remote_host+'/remote_url.php?type=header',
		        dataType : 'jsonp',
		        jsonp:"jsoncallback",
		        success:function(data){
		        	//userinfo
		        	var userinfo=data.userinfo;
		        	var userinfostr="";
		            for(var i in userinfo) {  
		            	if(userinfostr!=""){
		            		userinfostr +="|";
		            	}
		            	userinfostr +="<a href="+userinfo[i].url+"  >"+userinfo[i].name+"</a>"
		                
		            }  
		            if(menustr!=""){
		            	$(".whatsvpn_left").html("");
		            	$(".whatsvpn_left").html( userinfostr);
		            }		        	
		        	//is show quick
		            if(data.quick=="false"){
		            	$(".whatsvpn_k_jie").remove();
		            }
		        	//menu
		        	var menu=data.menu;
		        	var menustr="";
		            for(var i in menu) {  
		            	
		            	 menustr +="<li><a href="+menu[i].url+"  >"+menu[i].name+"</a></li>"
		                
		            }  
		            if(menustr!=""){
		            	$(".whatsvpn_menu").html("");
		            	$(".whatsvpn_menu").html( menustr);
		            }
		            //alert(abc);
		        },
		        error:function(msg){
                    //alert(msg.toSource());                //跨域错误会执行到这里
                }
		    }
		);
	

})