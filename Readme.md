# Solax Cloud api client for Node-red
This node gives you access to solax cloud readings in a node-red node. 

Config options: 
 - Api Token: Specify the cloud api token
 - Serial Number: Specifty serial number from your dongle.
 - Endpoint: Predefined value, setup your api url.
 - Refresh in seconds: Specify the timeout in seconds to repeat cloud readings. 

 ## Output Payload: 
  Example payload returned each time api cloud is readed. 
  
 {"inverterSN":""
 ,"sn":""
 ,"acpower":1908,"yieldtoday":5.8,"yieldtotal":9862,"feedinpower":1598,"feedinenergy":8446.33,"consumeenergy":1093.28,"feedinpowerM2":null,"soc":null,"peps1":null,"peps2":null,"peps3":null,"inverterType":"4","inverterStatus":"102","uploadTime":"2022-11-20 11:23:11","batPower":null,"powerdc1":953,"powerdc2":965,"powerdc3":null,"powerdc4":null,"batStatus":null}