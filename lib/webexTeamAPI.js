/*********************************************************************************** 
 * Webex Team API
 ***********************************************************************************/

var com = com || {};
com.cisco = com.cisco || {};
com.cisco.webexcc = com.cisco.webexcc || {};
com.cisco.webexcc.webexTeamAPI = function()
{
    //Private variables
    var self = this;
    this.configValues = com.cisco.webexcc.AgentDesktopAPIConfigurations;
    this.message = '';

    this.initializeWebexTeamWidget = function(domElement,eventHandler,destinationType,destinationId)
    {
        try
        {
                ciscospark.widget(domElement).spaceWidget({
                accessToken: self.configValues.webexTeamOAuthCode,
                destinationType: destinationType,
                destinationId: destinationId,
                onEvent: eventHandler});
        }
        catch(e)
        {
            self.message = `[Method(com.cisco.webexcc.AgentDesktop.initializeWebexTeamWidget)]:[Exception caught while initializing webex team widget and details:${e.message}]`;
            console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
        }
    };

    this.removeWebexTeamWidget = function(domElement,eventHandler)
    {
        try
        {
            ciscospark.widget(domElement).remove(eventHandler);
        }
        catch(e)
        {
            self.message = `[Method(com.cisco.webexcc.AgentDesktop.removeWebexTeamWidget)]:[Exception caught while remove webex team widget and details:${e.message}]`;
            console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
        }
    };

    return{
        initializeWebexTeamWidget : this.initializeWebexTeamWidget,
        removeWebexTeamWidget : this.removeWebexTeamWidget
    };

}();