function node1Get(gid, nid1, nid2) {
    document.addEventListener("DOMContentLoaded", function (event) {
        //var g1,g2,g3,g4
        var n1_uv = new JustGage({
            id: 'n1_uv',
            title: "UV Power",
            decimals: 2,
            value: 0,
            min: 0.0,
            max: 3.0,
            label: "mW/cm2",
            pointer: true,
            pointerOptions: {
                toplength: -15,
                bottomlength: 10,
                bottomwidth: 12,
                color: '#8e8e93',
                stroke: '#ffffff',
                stroke_width: 3,
                stroke_linecap: 'round'
            },
            gaugeWidthScale: 0.2,
            counter: true,
            relativeGaugeSize: true,
            donut: true
        });
        ////////
        $('#n1_uv').hide()
        /////////
        var n1_soil = new JustGage({
            id: "n1_soil",
            value: 0,
            min: 0,
            max: 100,
            title: "Soil Humidity",
            label: "(%)",
            gaugeWidthScale: 0.2
        });
        var n1_wind = new JustGage({
            id: "n1_wind",
            decimals: 2,
            value: 0,
            min: 0,
            max: 30,
            title: "Wind Speed",
            label: "(m/s)",
            gaugeWidthScale: 0.2
        });
        var n1_airhumid = new JustGage({
            id: "n1_airhumid",
            value: 0,
            min: 0,
            max: 100,
            title: "Air Humidity",
            label: "(%)",
            gaugeWidthScale: 0.2
        });
        var n1_airtemp = new JustGage({
            id: "n1_airtemp",
            value: 0,
            min: 0,
            max: 150,
            title: "Air temperature",
            label: "(celsius)",
            gaugeWidthScale: 0.2
        });
        ///////
        var n2_uv = new JustGage({
            id: 'n2_uv',
            title: "UV Power",
            decimals: 2,
            value: 0,
            min: 0.0,
            max: 3.0,
            label: "mW/cm2",
            pointer: true,
            pointerOptions: {
                toplength: -15,
                bottomlength: 10,
                bottomwidth: 12,
                color: '#8e8e93',
                stroke: '#ffffff',
                stroke_width: 3,
                stroke_linecap: 'round'
            },
            gaugeWidthScale: 0.2,
            counter: true,
            relativeGaugeSize: true,
            donut: true
        });
        $('#n2_uv').hide()
        var n2_soil = new JustGage({
            id: "n2_soil",
            value: 0,
            min: 0,
            max: 100,
            title: "Soil Humidity",
            label: "(%)",
            gaugeWidthScale: 0.2
        });
        var n2_wind = new JustGage({
            id: "n2_wind",
            decimals: 2,
            value: 0,
            min: 0,
            max: 30,
            title: "Wind Speed",
            label: "(m/s)",
            gaugeWidthScale: 0.2
        });
        var n2_airhumid = new JustGage({
            id: "n2_airhumid",
            value: 0,
            min: 0,
            max: 100,
            title: "Air Humidity",
            label: "(%)",
            gaugeWidthScale: 0.2
        });
        var n2_airtemp = new JustGage({
            id: "n2_airtemp",
            value: 0,
            min: 0,
            max: 150,
            title: "Air temperature",
            label: "(celsius)",
            gaugeWidthScale: 0.2
        });
        (function poll() {
            setTimeout(function () {
                $.ajax({
                    url: "/dash/getdata?gid=" + gid +
                        "&id=" + nid1,
                    success: function (data) {
                        try {
                            var thTime = data[0].dt.toLocaleString("en-US", {timeZone: "asia/bangkok"});
                            console.log("time is :"+new Date(thTime));
                            $('#last_update').text("Last update :" + new Date(thTime));
                            n1_airtemp.refresh(data[0].airTemp);
                            n1_airhumid.refresh(data[0].airHumid);
                            n1_wind.refresh(data[0].wind);
                            n1_soil.refresh(data[0].soilHumid);
                            n1_uv.refresh(data[0].uv);
                            $('#n1_uv').hide()
                            var current_progress = data[0].pm1;
                            $("#pm1_bar")
                                .css("width", current_progress)
                                .attr("aria-valuenow", current_progress)
                                .text(current_progress + " AQN");
                            $('#pm1_badge').text(current_progress +
                                " AQN");
                            current_progress = data[0].pm25
                            $("#pm25_bar")
                                .css("width", current_progress)
                                .attr("aria-valuenow", current_progress)
                                .text(current_progress + " AQN");
                            $('#pm25_badge').text(current_progress +
                                " AQN");
                            current_progress = data[0].pm10
                            $("#pm10_bar")
                                .css("width", current_progress)
                                .attr("aria-valuenow", current_progress)
                                .text(current_progress + " AQN");
                            $('#pm10_badge').text(current_progress +
                                " AQN");
                            $('#raining_status').attr("src",
                                "image/rainy.png");
                            if (data[0].rain === "1") {
                                $('#raining_status').attr("src",
                                    "image/cloudy.png");
                                $('#raining_status_text').text(
                                    'Status :not raining')
                            } else {
                                $('#raining_status').attr("src",
                                    "image/rainy.png");
                                $('#raining_status_text').text(
                                    'Status :raining')
                            }
                        } catch (err) {
                            console.log(err.message);
                        }
                    },
                    error: function () {
                        //if(confirm("Error no value from server.")) document.location = '/';

                        console.log('ERROR')
                        //g1.refresh(-1);
                    },
                    dataType: "json",
                    type: 'GET',
                    complete: poll
                });
            }, 1500);
        })();
        ///////
        (function poll() {
            setTimeout(function () {
                $.ajax({
                    url: "/dash/getdata?gid=" + gid +
                        "&id=" + nid2,
                    success: function (data) {
                        try {
                            var thTime = data[0].dt.toLocaleString("en-US", {timeZone: "asia/bangkok"});
                            console.log("time is :"+new Date(thTime));
                            $('#last_update2').text("Last update :" + new Date(thTime));
                            n2_airtemp.refresh(data[0].airTemp);
                            n2_airhumid.refresh(data[0].airHumid);
                            n2_wind.refresh(data[0].wind);
                            n2_soil.refresh(data[0].soilHumid);
                            n2_uv.refresh(data[0].uv);
                            var current_progress = data[0].pm1;
                            $("#pm1_bar2")
                                .css("width", current_progress)
                                .attr("aria-valuenow", current_progress)
                                .text(current_progress + " AQN");
                            $('#pm1_badge2').text(current_progress +
                                " AQN");
                            current_progress = data[0].pm25
                            $("#pm25_bar2")
                                .css("width", current_progress)
                                .attr("aria-valuenow", current_progress)
                                .text(current_progress + " AQN");
                            $('#pm25_badge2').text(current_progress +
                                " AQN");
                            current_progress = data[0].pm10
                            $("#pm10_bar2")
                                .css("width", current_progress)
                                .attr("aria-valuenow", current_progress)
                                .text(current_progress + " AQN");
                            $('#pm10_badge2').text(current_progress +
                                " AQN");
                            $('#raining_status2').attr("src",
                                "image/rainy.png");
                            if (data[0].rain === "1") {
                                $('#raining_status2').attr("src",
                                    "image/cloudy.png");
                                $('#raining_status_text2').text(
                                    'Status :not raining')
                            } else {
                                $('#raining_status2').attr("src",
                                    "image/rainy.png");
                                $('#raining_status_text2').text(
                                    'Status :raining')
                            }
                        } catch (err) {
                            //if(confirm("Error no value from server.")) document.location = '/';
                            console.log(err.message);
                        }
                    },
                    error: function () {
                        console.log('ERROR')
                        //g1.refresh(-1);
                    },
                    dataType: "json",
                    type: 'GET',
                    complete: poll
                });
            }, 1500);
        })();
        //////
    });
}
//////////