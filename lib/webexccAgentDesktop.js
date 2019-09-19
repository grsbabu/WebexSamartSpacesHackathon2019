/*********************************************************************************** 
 * WebexCC Agent Desktop 
 ***********************************************************************************/
var com = com || {};
com.cisco = com.cisco || {};
com.cisco.webexcc = com.cisco.webexcc || {};
com.cisco.webexcc.AgentDesktop = function()
{
        //Private variables
        var self = this;
        this.configValues = com.cisco.webexcc.AgentDesktopAPIConfigurations;
        this.webexCCAgentDesktopAPI = com.cisco.webexcc.AgentDesktopAPI;
        this.webexteamAPI = com.cisco.webexcc.webexTeamAPI; 
        
        this.webexTeamSpaceForSupervisorInitialized = false;
        this.webexTeamSpaceForSupervisorDoMElement;
        this.webexTeamSpaceForContactInitialized = false;
        this.webexTeamSpaceForContactDoMElement;
        this.webexTeamSpaceForBotDoMElement;

        this.loadAgentDesktop = function()
        {
           try
           {

            var ada = document.createElement('div');
            ada.id = 'webexcc-dv';
            ada.style.border = '0px solid';
            ada.style.position = 'fixed';
            ada.style.textAlign = 'center';
            ada.setAttribute('class','webexcc-agent-desktop-show');

            var adaf = document.createElement('iframe');
            adaf.id = self.configValues.webexCCAgentDesktopframeName;
            adaf.style.height = '100%';
            adaf.style.width = '100%';
            adaf.frameBorder = '1';
	          adaf.scrolling = 'auto';
            adaf.sandbox = 'allow-same-origin allow-scripts allow-popups allow-forms';
            adaf.src = self.configValues.agentDesktopURL;	
            
            ada.appendChild(adaf);
           
            document.body.appendChild(ada);

            self.webexCCAgentDesktopAPI.onContactConnectedEventHandler(self.createContactWebexTMWidget);

            self.webexCCAgentDesktopAPI.onAvailableEventHandler((eventArgs)=>{
          
              if(eventArgs.action == 'ON_AVAILABLE'){
                if(!self.webexTeamSpaceForSupervisorInitialized)
                {
                    webexTeamSpaceForSupervisorDoMElement = window.document.getElementById(self.configValues.webexTeamsSupervisorDoMId);
                    //(domElement,eventHandler,destinationType,destinationId)
                    com.cisco.webexcc.webexTeamAPI.initializeWebexTeamWidget(webexTeamSpaceForSupervisorDoMElement,self.webexTeamsSupervisorSapaceEventHandler,
                    self.configValues.webeTeamsSupervisorSpaceDestinationType,self.configValues.webeTeamsSupervisorSpaceDestinationId);
                    self.webexTeamSpaceForSupervisorInitialized = true;
                    self.addEventListenersForWebexTMSSupervisorSpace();
                    self.hideWebexTMsSupervisorSpace();

                    self.createWebexTMBotWidget();
                    self.addEventListenersForWebexTMSBotSpace();
                   
                }

                if(self.webexTeamSpaceForContactInitialized){
                  com.cisco.webexcc.webexTeamAPI.removeWebexTeamWidget(webexTeamSpaceForContactDoMElement);
                  self.webexTeamSpaceForContactInitialized = false;
                }

                self.hideWebexTMsContactSpace();
              }
            });

           
            
           self.webexCCAgentDesktopAPI.onIdleEventHandler((eventArgs)=>{
              
                if(eventArgs.action == 'ON_IDLE')
                { 
                  self.hideWebexTMsSupervisorSpace();
                  self.hideWebexTMsContactSpace();
                }
              
            });

            self.showWebexCCAgentDesktop();

           }
           catch(e)
           {
            self.message = `[Method(com.cisco.webexcc.AgentDesktop.loadAgentDesktop)]:[Exception caught while loading webexcc agentdesktop and details:${e.message}]`;
            console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
           }
        };

        this.createContactWebexTMWidget = function(eventArgs)
        {
            try
            {
              if(eventArgs.action == 'CONTACT_CONNECTED'){
                if(!self.webexTeamSpaceForContactInitialized)
                {
                  webexTeamSpaceForContactDoMElement = window.document.getElementById(self.configValues.webexTeamsContactDoMId);
                  //(domElement,eventHandler,destinationType,destinationId)
                  com.cisco.webexcc.webexTeamAPI.initializeWebexTeamWidget(webexTeamSpaceForContactDoMElement,self.webexTeamsSupervisorSapaceEventHandler,
                  self.configValues.webeTeamsContactSpaceDestinationType,self.configValues.webeTeamsContactSpaceDestinationId);
                  self.webexTeamSpaceForContactInitialized = true;
                  self.showWebexTMsContactSpace();
                }
              }
            }
            catch(e)
            {

            }
        };

        this.createWebexTMBotWidget = function()
        {
            try
            {
              
                webexTeamSpaceForBotDoMElement = window.document.getElementById(self.configValues.webexTeamsBotDoMId);
                  //(domElement,eventHandler,destinationType,destinationId)
                  com.cisco.webexcc.webexTeamAPI.initializeWebexTeamWidget(webexTeamSpaceForBotDoMElement,self.webexTeamsSupervisorSapaceEventHandler,
                  self.configValues.webeTeamsBotSpaceDestinationType,self.configValues.webeTeamsBotSpaceDestinationId);
                  self.hideWebexTMsBotSpace();
            }
            catch(e)
            {
              self.message = `[Method(com.cisco.webexcc.AgentDesktop.createWebexTMBotWidget)]:[Exception caught while creating webex team bot widget and details:${e.message}]`;
              console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
            }
        };

        this.showWebexCCAgentDesktop = function()
        {
          try
          {
            var ada = window.document.getElementById('webexcc-dv');
            ada.setAttribute('class','webexcc-agent-desktop-show');
          }
          catch(e)
          {
            self.message = `[Method(com.cisco.webexcc.AgentDesktop.showWebexCCAgentDesktop)]:[Exception caught while showing webexcc agentdesktop and details:${e.message}]`;
            console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
          }
        };

      
       
        this.showWebexTMsSupervisorSpace = function()
        {
          try
          {
            self.hideWebexTMsSupervisorSpace();
            var wtmsSupervisor = window.document.getElementById('webextmSupervisor-dv');
            wtmsSupervisor.setAttribute('class','webex-teams-show-supervisor-space')
            wtmsSupervisor.removeAttribute('webex-teams-hide-supervisor-space');
            self.hideWebexTMsBotSpaceImage();
          }
          catch(e)
          {

          }
        };

        this.hideWebexTMsSupervisorSpace = function()
        {
          try
          {
            var wtmsSupervisor = window.document.getElementById('webextmSupervisor-dv');
            wtmsSupervisor.setAttribute('class','webex-teams-hide-supervisor-space')
            wtmsSupervisor.removeAttribute('webex-teams-show-supervisor-space');
            self.hideWebexTMsBotSpace();
           
          }
          catch(e)
          {

          }
        };

        this.showWebexTMsContactSpace = function()
        {
          try
          {
            self.hideWebexTMsContactSpace();
            var wtmsContact = window.document.getElementById('webextm-dv');
            wtmsContact.setAttribute('class','webex-teams-show-contact-space');
            wtmsContact.removeAttribute('webex-teams-hide-contact-space');
          }
          catch(e)
          {

          }
          
        };

        this.hideWebexTMsContactSpace = function()
        {
          try
          {
            var wtmsContact = window.document.getElementById('webextm-dv');
            wtmsContact.setAttribute('class','webex-teams-hide-contact-space');
            wtmsContact.removeAttribute('webex-teams-show-contact-space');
          }
          catch(e)
          {

          }
          
        };

        this.hideWebexTMsBotSpace = function()
        {
          try
          {
            var wtmsBot = window.document.getElementById('webextmBot-dv');
            wtmsBot.setAttribute('class','webex-teams-hide-bot-space');
            wtmsBot.removeAttribute('webex-teams-show-bot-space');
            wtmsBot.removeAttribute('webex-teams-show-bot-space-image');
          }
          catch(e)
          {

          }
        };

        this.hideWebexTMsBotSpaceImage = function()
        {
          try
          {
            var wtmsBot = window.document.getElementById('webextmBot-dv');
            wtmsBot.setAttribute('class','webex-teams-hide-bot-space-image');
            wtmsBot.removeAttribute('webex-teams-show-bot-space');
            wtmsBot.removeAttribute('webex-teams-hide-bot-space');
          }
          catch(e)
          {

          }
        };

        this.showWebexTMsBotSpace = function()
        {
          try
          {
            var wtmsBot = window.document.getElementById('webextmBot-dv');
            wtmsBot.setAttribute('class','webex-teams-show-bot-space');
            wtmsBot.removeAttribute('webex-teams-hide-bot-space');
            wtmsBot.removeAttribute('webex-teams-hide-bot-space-image');
          }
          catch(e)
          {

          }
        };

        this.showWebexTMsBotSpaceImage = function()
        {
           try
           {
            var wtmsBot = window.document.getElementById('webextmBot-dv');
            wtmsBot.removeAttribute('webex-teams-hide-bot-space-image');
            wtmsBot.setAttribute('class','webex-teams-show-bot-space');

           }
           catch(e)
           {

           }
        };

        this.addEventListenersForWebexTMSBotSpace = function(){

          try
          {
              // Adding on mouse over and mouse out event handlers for supervisor tm space
              var webexTMBotSpaceDiv = window.document.getElementById('webextmBot-dv');
              webexTMBotSpaceDiv.addEventListener('mouseover',(event)=>{
                self.showWebexTMsBotSpace();
              });

              webexTMBotSpaceDiv.addEventListener('mouseout',(event)=>{
                self.hideWebexTMsBotSpace();
              });
          }
          catch(e)
          {

            

          }
        };

        this.addEventListenersForWebexTMSSupervisorSpace = function(){

          try
          {
              // Adding on mouse over and mouse out event handlers for supervisor tm space
              var webexTMSupervisorSpaceDiv = window.document.getElementById('webextmSupervisor-dv');
              webexTMSupervisorSpaceDiv.addEventListener('mouseover',(event)=>{
                self.showWebexTMsSupervisorSpace();
              });

              webexTMSupervisorSpaceDiv.addEventListener('mouseout',(event)=>{
                self.hideWebexTMsSupervisorSpace();
              });
          }
          catch(e)
          {

            

          }
        };

        var start = function()
        {
            try
            {
                  self.webexCCAgentDesktopAPI.initializeWebexCCAgentDesktopAPI();
                  self.loadAgentDesktop();
            }
            catch(e)
            {
                self.message = `[Method(com.cisco.webexcc.AgentDesktop.start)]:[Exception caught while starting webexcc agentdesktop and details:${e.message}]`;
                console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
            }
        };

        this.webexTeamsSupervisorSapaceEventHandler = function(eventName,eventArgs)
        {
          try
          {
            self.message = `[Method(com.cisco.webexcc.AgentDesktop.webexTeamsSupervisorSapaceEventHandler)]:[Event Name:${name};Detail:${JSON.stringify(detail)}]`;
            console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
         
          }
          catch(e)
          {

          }
        };

        return{
            start : start,
            showWebexCCAgentDesktop:this.showWebexCCAgentDesktop,
            hideWebexCCAgentDesktop:this.hideWebexCCAgentDesktop,
            showWebexCCAgentDesktopAndWebexTeams : this.showWebexCCAgentDesktopAndWebexTeams

        }

}();