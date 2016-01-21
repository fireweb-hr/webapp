/**
 * Created by joriregter on 10/12/15.
 */
function degToCompass(num) {
    if(num < 0) num += 360 ;
    if(num >= 360) num -= 360 ;
    let val = Math.round( (num -11.25 ) / 22.5 );
    let arr = ["N","NNO","NO","ONO","O","OZO", "ZO",
        "ZZO","Z","ZZW","ZW","WZW","W","WNW","NW","NNW"];
    console.log(arr[ Math.abs(val) ]);
    return arr[ Math.abs(val) ] ;
}
Template.windSpd.onCreated(function () {
    this.subscribe('dataCurrent', Session.get('selectedNodeId'));
});

Template.windSpd.helpers({
    wind: function () {
        let data = SensorData.findOne({}, {sort: {outputTime: -1},
            fields: {wind: 1}, limit: 1});

        data.wind.direction = ("deg" in data.wind) ? degToCompass(data.wind.deg) : "Wind speed too slow to determine direction.";
        return data.wind;
    }
});
