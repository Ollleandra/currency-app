/**
 * Functions that get utm variables from query and put it into form hidden fields & cookie
 */
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
jQuery(document).ready(function() {
    jQuery('form').find('input.utm_source').each(function() {
        var a = getQueryVariable('utm_source');
        if(a){
            jQuery(this).val(a);
        }
    });
    jQuery('form').find('input.utm_medium').each(function() {
        var a = getQueryVariable('utm_medium');
        if(a){
            jQuery(this).val(a);
        }
    });
    jQuery('form').find('input.utm_campaign').each(function() {
        var a = getQueryVariable('utm_campaign');
        if(a){
            jQuery(this).val(a);
        }
    });
    jQuery('form').find('input.utm_term').each(function() {
        var a = getQueryVariable('utm_term');
        if(a){
            jQuery(this).val(a);
        }
    });
    jQuery('form').find('input.utm_content').each(function() {
        var a = getQueryVariable('utm_content');
        if(a){
            jQuery(this).val(a);
        }
    });
    jQuery('form').find('input.client_id').each(function() {
        var a = getQueryVariable('client_id');
        if(a){
            jQuery(this).val(a);
        }
    });
    jQuery('form').find('input.utm_scale_entrance').each(function() {
        var a = getQueryVariable('utm_scale_entrance');
        if(a){
            jQuery(this).val(a);
        }
    });
    jQuery('form').find('input.utm_avatar').each(function() {
        var a = getQueryVariable('utm_avatar');
        if(a){
            jQuery(this).val(a);
        }
    });
});

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name,"",-1);
}
var c_name = "_aaa_utmz";
if(getQueryVariable("utm_source") != "") {
    createCookie("_aaa_utmz", getQueryVariable("utm_source") + "|" + getQueryVariable("utm_medium")+ "|" + getQueryVariable("utm_term")+ "|" + getQueryVariable("utm_campaign")+ "|" + getQueryVariable("utm_content")+ "|" + getQueryVariable("client_id")+ "|" + getQueryVariable("utm_scale_entrance")+ "|" + getQueryVariable("utm_avatar"), 60);
}
else if (readCookie(c_name)){
    c_start=readCookie(c_name);
    var _pipe = c_start.split("|");
    jQuery("input[name=utm_source], .utm_source").val(_pipe[0]);
    jQuery("input[name=utm_medium], .utm_medium").val(_pipe[1]);
    jQuery("input[name=utm_term], .utm_term").val(_pipe[2]);
    jQuery("input[name=utm_campaign], .utm_campaign").val(_pipe[3]);
    jQuery("input[name=utm_content], .utm_content").val(_pipe[4]);
    jQuery("input[name=client_id], .client_id").val(_pipe[5]);
    jQuery("input[name=utm_scale_entrance], .utm_scale_entrance").val(_pipe[6]);
    jQuery("input[name=utm_avatar], .utm_avatar").val(_pipe[7]);
}