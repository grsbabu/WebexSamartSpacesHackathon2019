/*********************************************************************************** 
 * WebexCC Agent Desktop API Configurations
 ***********************************************************************************/
var com = com || {};
com.cisco = com.cisco || {};
com.cisco.webexcc = com.cisco.webexcc || {};
com.cisco.webexcc.AgentDesktopAPIConfigurations = function()
{
    // Private variables used to set the application configuration values
	var self = this;
    this.logTagConstant = "WebexccAgentdesktop";
    this.agentDesktopURL = 'https://agent.ccone.net/ada-ws/ccone-ad/index.html';
    this.callOutComeForAgentNotResponding = "AgentNotResponded";
    this.uuidForWebexCCAgentDesktop = 'webexccAgentExternal';
    this.webexCCAgentDesktopframeName = 'webexccAgentDektopIFrame';
    
    this.webexTeamOAuthCode = 'ODA3ZWI2MmYtMTdiNy00YzE3LTljZTMtZTM1ZTdlZTZhNmQ1Y2EyZGNhMWYtZmU2_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f';

    this.webexTeamsSupervisorDoMId = 'my-webexteams-supervisor';
    this.webeTeamsSupervisorSpaceDestinationType = 'email';
    this.webeTeamsSupervisorSpaceDestinationId = 'arubhatt@cisco.com';

    this.webexTeamsContactDoMId = 'my-webexteams-widget';
    this.webeTeamsContactSpaceDestinationType = 'email';
    this.webeTeamsContactSpaceDestinationId = 'rguvvala@cisco.com';

    this.webexTeamsBotDoMId = 'my-webexteamBot-widget';
    this.webeTeamsBotSpaceDestinationType = 'email';
    this.webeTeamsBotSpaceDestinationId = 'webexcc@webex.bot';
    
    return{
        logTagConstant : self.logTagConstant,
        agentDesktopURL : self.agentDesktopURL,
        callOutComeForAgentNotResponding : self.callOutComeForAgentNotResponding,
        uuidForWebexCCAgentDesktop : self.uuidForWebexCCAgentDesktop,
        webexCCAgentDesktopframeName : self.webexCCAgentDesktopframeName,
        webexTeamOAuthCode:this.webexTeamOAuthCode,
        webexTeamsSupervisorDoMId : this.webexTeamsSupervisorDoMId,
        webeTeamsSupervisorSpaceDestinationType : this.webeTeamsSupervisorSpaceDestinationType,
        webeTeamsSupervisorSpaceDestinationId : this.webeTeamsSupervisorSpaceDestinationId,
        webexTeamsContactDoMId: this.webexTeamsContactDoMId,
        webeTeamsContactSpaceDestinationType : this.webeTeamsContactSpaceDestinationType,
        webeTeamsContactSpaceDestinationId: this.webeTeamsContactSpaceDestinationId,
        webexTeamsBotDoMId : this.webexTeamsBotDoMId,
        webeTeamsBotSpaceDestinationType : this.webeTeamsBotSpaceDestinationType,
        webeTeamsBotSpaceDestinationId : this.webeTeamsBotSpaceDestinationId

        };
}();