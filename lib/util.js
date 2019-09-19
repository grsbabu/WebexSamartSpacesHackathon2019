/*********************************************************************************** 
 * WebexCC Agent Desktop Util
 ***********************************************************************************/
var com = com || {};
com.cisco = com.cisco || {};
com.cisco.webexcc = com.cisco.webexcc || {};
com.cisco.webexcc.Util = function()
{
   
    var self =this;
    this.url = 'https://ivrcon.cjp.cisco.com/xda/xdaIntf';
    this.params = '';

    this.sendAjaxRequest = function(url,params)
    {
        try
        {
            var xmlhttp = null;
            if (window.XMLHttpRequest) {
                // code for modern browsers
                xmlhttp = new XMLHttpRequest();
             } else {
                // code for old IE browsers
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xmlhttp.open('POST', url, true);
            
            //Send the proper header information along with the request
            xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                {
                    self.message = `[Method(com.cisco.webexcc.Util.sendAjaxRequest)]:[http.responseText:${xmlhttp.responseText}]`;
                    console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
                   
                }
            }

            xmlhttp.send(params);

        }
        catch(e)
        {
            self.message = `[Method(com.cisco.webexcc.Util.sendAjaxRequest)]:[Exception caught while sending the request and details:${e.message}]`;
            console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
        }
    };

    var sendNewCallRequest = function(dnis,ani)
    {
       self.params = `<?xml version="1.0" encoding="UTF-8"?>
       <router-call-data 
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns="http://cha.transerainc.com/gen/extrouter"
           callId="8b2d1f30-e002-4071-8cac-c0fe8bef8bdss" 
           ani="${ani}"
           dnis="${dnis}"
           ivrDn="${dnis}"
           eventType="new-call" 
           location="pop-lax" 
           timestamp="1568653800">
       </router-call-data>`;
       self.sendAjaxRequest(self.url,self.params);
    }; 

    var sendCallRouteRequest = function(dnis,ani)
    {
       self.params = `<?xml version="1.0" encoding="UTF-8"?>
       <router-call-data 
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns="http://cha.transerainc.com/gen/extrouter"
           callId="8b2d1f30-e002-4071-8cac-c0fe8bef8bdss"
           ani="${ani}"
           dnis="${dnis}"
           ivrDn="${dnis}"
           eventType="route-request" 
           location="pop-lax" 
           virtualTeamId="1014739"
           timestamp="1568653809">
           <call-associated-data name="XDA_AccountNumber" value="8095506689"/>
		   <call-associated-data name="TranseraQueue" value="Sales"/>
       </router-call-data>`;

       self.sendAjaxRequest(self.url,self.params);
    }; 
    
    return{
        sendNewCallRequest : sendNewCallRequest,
        sendCallRouteRequest : sendCallRouteRequest
    };
}();

//5163407083
//2145046961
//9783994485

