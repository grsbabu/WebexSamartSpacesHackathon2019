/*********************************************************************************** 
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
