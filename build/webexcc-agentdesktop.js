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
}();/*********************************************************************************** 
 * WebexCC Agent Desktop API
 ***********************************************************************************/
var com = com || {};
com.cisco = com.cisco || {};
com.cisco.webexcc = com.cisco.webexcc || {};
com.cisco.webexcc.AgentDesktopAPI = function()
{
   //Private variables
    var self = this;
    this.configValues = com.cisco.webexcc.AgentDesktopAPIConfigurations;
    this.message = '';
    this.isWebexccAgentDesktopInitCompleted = false;

    //CTI Events
    this.ctiEvents = {
        ON_AGENT_DESKTOP_INIT : 'ON_AGENT_DESKTOP_INIT',

        ON_UPDATE_AGENT_DETAILS : 'ON_UPDATE_AGENT_DETAILS',
        ON_GET_AGENT_PROPERTIES : 'ON_GET_AGENT_PROPERTIES',

        ON_GET_CONTACT_PROPERTY : 'ON_GET_CONTACT_PROPERTY',
        ON_GET_CONTACT_PROPERTIES : 'ON_GET_CONTACT_PROPERTIES ',

        CONTACT_ARRIVED :'CONTACT_ARRIVED',
        ON_NOT_RESPONDING : 'ON_NOT_RESPONDING',
        CONTACT_CONNECTED : 'CONTACT_CONNECTED',
        CONTACT_DISCONNECTED : 'CONTACT_DISCONNECTED',
        ON_WRAP_UP : 'ON_WRAP_UP',
        CONTACT_COMPLETED : 'CONTACT_COMPLETED',

        CONTACT_STATE_CHANGED : 'CONTACT_STATE_CHANGED',
        ON_AGENT_STATUS_CHANGE : 'ON_AGENT_STATUS_CHANGE',

        ON_VOICE_PAUSE_RECORDING : 'ON_VOICE_PAUSE_RECORDING',
        ON_VOICE_RESUME_RECORDING: 'ON_VOICE_RESUME_RECORDING',
        ON_HOLDUNHOLD_CALL : 'ON_HOLDUNHOLD_CALL',

        ON_IDLE : 'ON_IDLE',
        ON_AVAILABLE : 'ON_AVAILABLE',

        INIT : 'INIT'

    };

    //Getting the current local time and it will be used for application logging.
    this.getCurrentLocalTimestamp = function() 
    {
        return(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString());
	}; 
	
    // Callback registeration store
    this.ctiCallbackEventHandlers = {};

    //method to verify whether the object is undefined or null
    this.nullOrEmpty = function (param) 
    {
        try
        {
            if (param === undefined || param === 'undefined'
            || param === null || param === 'null') {
                    return true;
                } else if (typeof param === 'number') {
                    return false;
                } else if (param.length && param.length > 0) {
                    return false;
                } else if (param.length == 0) {
                    return true;
                } else {
                    for (var key in param) {
                        if (hasOwnProperty.call(param, key)) {
                            return false;
                        }
                    }
                }
       
        }
        catch(e)
        {
            self.message = `[Method(com.cisco.webexcc.AgentDesktopAPI.nullOrEmpty)]:[Exception caught while processing and details:${e.message}]`;
            console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:[${self.message}]`);
            return false;
        }
        return true;
    };
     
    //Send request to webex cc agent desktop(Wrapup,Idle,Init etc)
    this.sendOutboundMessageToWebexCCAgentDesktop = function(message)
    {
       try
       {
          window.parent.frames[self.configValues.webexCCAgentDesktopframeName].contentWindow.postMessage(JSON.stringify(message),'*');
          self.message = `[Method(com.cisco.webexcc.AgentDesktopAPI.sendOutboundMessageToWebexCCAgentDesktop)]:[Request has been successfully send to webex cc agent desktop and message:${JSON.stringify(message)}]`;
          console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
        }
       catch(e)
       {
        self.message = `[Method(com.cisco.webexcc.AgentDesktopAPI.sendOutboundMessageToWebexCCAgentDesktop)]:[Exception caught while sending message to webex cc agent desktop and details:${e.message}]`;
        console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
       }
    }

   //Processing the CTI events received from webex cc and notifying the eventhandlers 
   this.processCTIEventAndNotifyEventHandlers = function(ctiEventMessage)
   {
     try
     {
         var ctiEvent = null;
         if(!nullOrEmpty(ctiEventMessage.action)) // Validating cti event received from webex cc agent desktop has valid action property
         {
            ctiEvent = ctiEventMessage.action;
            for(var ctiEvent in self.ctiCallbackEventHandlers)// Fetching all ctievent  and associated callback methods
            {
                if(self.ctiCallbackEventHandlers.hasOwnProperty(ctiEvent)) // Verifying whether the cti event has the callback methods
                {       
                    self.ctiCallbackEventHandlers[ctiEvent](ctiEventMessage);
                }
            }

         }
     }
     catch(e)
     {
        self.message = `[Method(com.cisco.webexcc.AgentDesktopAPI.processCTIEventAndNotifyEventHandlers)]:[Exception caught while message processing and details:${e.message}]`;
        console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
     }
   };

   //Registering event listener on top window to get webex cc CTI events 
   this.registerWindowCTIEventListener = function(){
       try
       {
            //Listening on top window to get WebexCC CTI Events and processing the cti events
            window.top.addEventListener('message', (message) => { 

            if(!self.nullOrEmpty(message.data)) // validate the cti event message received from webex cc agent desktop is not null
            {
                self.message =  `[Method(com.cisco.webexcc.AgentDesktopAPI.registerWindowCTIEventListener)]:[WebexCC CTI event message: ${message.data}]`;
                console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
    
                var ctiEventMessage = JSON.parse(message.data);
    
                self.processCTIEventAndNotifyEventHandlers(ctiEventMessage);
            }

            });
       }
       catch(e)
       {
            self.message = `[Method(com.cisco.webexcc.AgentDesktopAPI.registerWindowCTIEventListener)]:[Exception caught while message processing and details:${e.message}]`;
            console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
       }
   }; 

    //Registering for CTI Event Handlers, CTI Event and Callback function needs to be passed
    this.registerCTICallbackEventHandlers = function(ctiEvent,ctiCallbackEventHandler)
    {
       try
       {
          if(ctiCallbackEventHandler)
          {
            if(ctiEvents[ctiEvent])
            {
               if(ctiCallbackEventHandlers[ctiEvent])
                ctiCallbackEventHandlers[ctiEvent] = ctiCallbackEventHandlers.push(ctiCallbackEventHandler);
               else
                ctiCallbackEventHandlers[ctiEvent] = ctiCallbackEventHandler;
            }
            else
                ctiCallbackEventHandlers[ctiEvent] = ctiCallbackEventHandler;
          }
          else
          {
            self.message = `[Method(com.cisco.webexcc.AgentDesktopAPI.registerCTICallbackEventHandlers)]:[Failed to register the callback method:${callback} for event:${event}]`;
            console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);  
          }
       }
       catch(e)
       {
        self.message = `[Method(com.cisco.webexcc.AgentDesktopAPI.registerCTICallbackEventHandlers)]:[Exception caught while processing and details:${e.message}]`;
        console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
       }        
    };

    var initializeWebexCCAgentDesktopAPI = function()
    {
        try
        {
            self.registerWindowCTIEventListener();
            onAgentDesktopInitEventHandler(sendDesktopInitMessage);

        }
        catch(e)
        {
            self.message = `[Method(com.cisco.webexcc.AgentDesktopAPI.initializeWebexCCAgentDesktopAPI)]:[Exception caught while initializing WebexCCAgentDesktopAPI and details:${e.message}]`;
            console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
        }
    };

    var onAgentDesktopInitEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_AGENT_DESKTOP_INIT,eventHandlerMethod);
    };

    var onUpdateAgentDetailsEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_UPDATE_AGENT_DETAILS,eventHandlerMethod);
    };

    var onGetAgentPropertiesEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_GET_AGENT_PROPERTIES,eventHandlerMethod);
    };

    var onGetContactPropertyEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_GET_CONTACT_PROPERTY,eventHandlerMethod);
    };

    var onGetContactPropertiesEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_GET_CONTACT_PROPERTIES,eventHandlerMethod);
    };

    var onIdleEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_IDLE,eventHandlerMethod);
    };

    var onAvailableEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_AVAILABLE,eventHandlerMethod);
    };

    var onContactArrivedEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.CONTACT_ARRIVED,eventHandlerMethod);
    };

    var onNotRespondingEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_NOT_RESPONDING,eventHandlerMethod);
    };

    var onContactConnectedEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.CONTACT_CONNECTED,eventHandlerMethod);
    };

    var onContactDisconnectedEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.CONTACT_DISCONNECTED,eventHandlerMethod);
    };

    var onWrapupEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_WRAP_UP,eventHandlerMethod);
    };

    var onContactCompletedEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.CONTACT_COMPLETED,eventHandlerMethod);
    };

    var onContactStateChangedEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.CONTACT_STATE_CHANGED,eventHandlerMethod);
    };

    var onAgentStatusChangedEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_AGENT_STATUS_CHANGE,eventHandlerMethod);
    };

    var  onVoicePauseRecordingEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_VOICE_PAUSE_RECORDING,eventHandlerMethod);
    };

    var onVoiceResumeRecordingEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_VOICE_RESUME_RECORDING,eventHandlerMethod);
    };

    var onHoldUnholdCallEventHandler = function(eventHandlerMethod)
    {
       self.registerCTICallbackEventHandlers(self.ctiEvents.ON_HOLDUNHOLD_CALL,eventHandlerMethod);
    };
   
    var sendDesktopInitMessage = function()
    {
        try
        {
            if(!isWebexccAgentDesktopInitCompleted)
            {
                var initMessage = {};
                initMessage.action = ctiEvents.INIT;
                initMessage.uuid = self.configValues.uuidForWebexCCAgentDesktop;
                isWebexccAgentDesktopInitCompleted = true;
                self.sendOutboundMessageToWebexCCAgentDesktop(initMessage);
            }
           
        }
        catch(e)
        {
            self.message = `[Method(com.cisco.webexcc.AgentDesktopAPI.sendDesktopInitMessage)]:[Exception caught while sending INIT request and details:${e.message}]`;
            console.log(`[${self.configValues.logTagConstant}]:[${self.getCurrentLocalTimestamp()}]:${self.message}`);
        }
    };

    

    return{
        initializeWebexCCAgentDesktopAPI : initializeWebexCCAgentDesktopAPI,
        onAgentDesktopInitEventHandler : onAgentDesktopInitEventHandler,
        sendDesktopInitMessage : sendDesktopInitMessage,

        onUpdateAgentDetailsEventHandler : onUpdateAgentDetailsEventHandler,
        onGetAgentPropertiesEventHandler : onGetAgentPropertiesEventHandler,

        onGetContactPropertyEventHandler : onGetContactPropertyEventHandler,
        onGetContactPropertiesEventHandler : onGetContactPropertiesEventHandler,

        onIdleEventHandler : onIdleEventHandler,
        onAvailableEventHandler : onAvailableEventHandler,

        onContactArrivedEventHandler : onContactArrivedEventHandler,
        onNotRespondingEventHandler : onNotRespondingEventHandler,
        onContactConnectedEventHandler : onContactConnectedEventHandler,
        onContactDisconnectedEventHandler : onContactDisconnectedEventHandler,
        onWrapupEventHandler : onWrapupEventHandler,
        onContactCompletedEventHandler : onContactCompletedEventHandler,

        onContactStateChangedEventHandler : onContactStateChangedEventHandler,
        onAgentStatusChangedEventHandler : onAgentStatusChangedEventHandler,

        onVoicePauseRecordingEventHandler : onVoicePauseRecordingEventHandler,
        onVoiceResumeRecordingEventHandler : onVoiceResumeRecordingEventHandler,
        onHoldUnholdCallEventHandler : onHoldUnholdCallEventHandler
        };
}();
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

}();/*********************************************************************************** 
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