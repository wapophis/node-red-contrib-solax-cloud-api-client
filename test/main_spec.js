var should = require("should");
var helper = require("node-red-node-test-helper");
var solaxClientNode = require("../solax-api-client.js");

helper.init(require.resolve('node-red'));

describe('first-test ', function () {

    beforeEach(function (done) {
        helper.startServer(done);
    });
  
    afterEach(function (done) {
        helper.unload();
        helper.stopServer(done);
    });
  
    it('should be initialized properly', function (done) {
      var flow = [{ id: "n1", type: "solax-cloud-api-client", name: "api-client-URL"
        ,endPoint:"https://global.solaxcloud.com/api/v2/dataAccess/realtimeInfo/get",apiToken:"x",apiSn:"szxxxxxxm",loop:false }];
      helper.load(solaxClientNode, flow, function () {
        var n1 = helper.getNode("n1");
        try {
          n1.should.have.property('name', 'api-client-URL');
          done();
        } catch(err) {
          done(err);
        }
      });
    });
});