module.exports = function(app) {
    var udp = require('./udp');

    var fullArmPayload = "5aa5aa555aa5aa55000000000000000000000000000000000000000000000000f2df000022276a00c980eff7da0d43b401000000c9be00001db2459c305ed8773a0bd4a2342907e532fdfe4cd08e5016f4dd67b2de9384d8161bc8557c42b64c49861e9b0b8e0a41";
    var partArmPayload = "5aa5aa555aa5aa550000000000000000000000000000000000000000000000004ee0000022276a000a82eff7da0d43b401000000c8be000097537cd033f4a9206073637f61b0bd37336d23648f91d29ecde4004e391b6b5af2ada297a36a8ea676500b5bcf56d927";
    var disarmPayload = "5aa5aa555aa5aa550000000000000000000000000000000000000000000000007cdf000022276a005c82eff7da0d43b401000000c7be0000d21e8ac861821d026c620caf678da6415aacbe1ddb7585b9e152c2f7ab6db3080fc622954727912d8505972589fc3469";

    app.get('/alarm/check', function(req, res) {
            var statusNow = app.storage.getItem("alarm");
            res.send('"' + statusNow + '"');
    })

    app.get('/alarm/arm/:state', function(req, res) {
        var updateState = function(app) {
            var newStatus = app.storage.setItem("alarm" , newState);
            res.send('"Status Changed"');
        };
        var newState = req.params.state;
        switch (newState){
            case "stay":
                newState = 0;
                updateState(app);
                udp(disarmPayload, function (err) {
                    console.log(err);
                 });
                break;
            case "away":
                newState = 1;
                updateState(app);
                udp(fullArmPayload, function (err) {
                    console.log(err);
                 });
                break;
            case "night":
                newState = 2;
                updateState(app);
                udp(partArmPayload, function (err) {
                    console.log(err);
                 });
                break;
        }
    })

     app.get('/alarm/disarm', function(req, res) {
        var newState = 3;
        udp(disarmPayload, function (err) {
                    console.log(err);
                 });
        var newStatus = app.storage.setItem("alarm" , newState);
        res.send('"Status Changed"');
    })
    

}