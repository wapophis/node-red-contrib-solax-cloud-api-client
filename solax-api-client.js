const axios = require('axios');
const LocalDateTime = require('@js-joda/core').LocalDateTime;
const ChronoUnit=require("@js-joda/core").ChronoUnit;
const DateTimeFormatter=require('@js-joda/core').DateTimeFormatter;
const ZoneId=require("@js-joda/timezone").ZoneId;

module.exports = function(RED) {
    var looperTimeout=null;

    function SolaxCloudApiClientNode(config) {
        
        
        RED.nodes.createNode(this,config);
        var node = this;
        
        var apiToken=config.apiToken;
        var apiSn=config.apiSn;
        var endPoint=config.endPoint;
        var refreshPeriod=config.refreshPeriod||300;

        this.on('close', function() {
            clearTimeout(looperTimeout);
        });

        queryServer();
        

        // node.on('input', function(msg) {
        //     msg.payload = msg.payload.toLowerCase();
        //     node.send(msg);
        // });



        function queryServer(){   
            axios
              .get(endPoint,{params:{
                tokenId:apiToken
                ,sn:apiSn
              }
            })
              .then(res => {
                setNodeStatus(res);
                  var msg={};
                  msg.payload=res.data.result;
                  node.send(msg);

               // console.log(res);
                looperTimeout=setTimeout(queryServer, calcTimeOutToCall(res.data.result.uploadTime), msg);
              
                
              })
              .catch(error => {
                console.error(error);
              });
        }

        function setNodeStatus(res){
            if(res.status===200){
                if(res.data.success){
                    node.status({fill:"green",shape:"dot",text:"connected"});
                }else{
                    node.status({fill:"orange",shape:"dot",text:"Chech parameters: "+res.data.exception});
                }
            }else{
                node.status({fill:"red",shape:"dot",text:"Cannot connect: "+res.status});
            }
        }

        function calcTimeOutToCall(lastUpdated){
            let dateTimeformater=DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss');
            let nexUpdateAt=LocalDateTime.parse(lastUpdated,dateTimeformater).plusSeconds(refreshPeriod);
            let gap=(LocalDateTime.now().until(nexUpdateAt,ChronoUnit.SECONDS))*1000;
            if(gap<=0){
                return 15000;
            }
            console.log("next reload at "+gap);
            node.status({fill:"green",shape:"dot",text:"Refresh at "+nexUpdateAt+" "});
            return gap;
        }
    }

    
    RED.nodes.registerType("solax-cloud-api-client",SolaxCloudApiClientNode);
}
