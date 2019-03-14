function externalFunction() {
 document.addEventListener("DOMContentLoaded", function (event) {
            //var g1,g2,g3,g4;
            var n1_pm1 = new JustGage({
                id: 'n1_pm1',
                value: 25,
                min: 0,
                max: 500,
                symbol: 'AQI',
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
                gaugeWidthScale: 0.6,
                counter: true,
                relativeGaugeSize: true,
                donut: true
            });
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
                value: 0,
                min: 0,
                max: 200,
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
            var n2_airhumid = new JustGage({
                id: "n2_airhumid",
                value: 0,
                min: 0,
                max: 100,
                title: "Custom Width",
                label: "",
                gaugeWidthScale: 0.2
            });
            var n2_airtemp = new JustGage({
                id: "n2_airtemp",
                value: 0,
                min: 0,
                max: 100,
                title: "Custom Width",
                label: "",
                gaugeWidthScale: 0.2
            });
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
                value: 0,
                min: 0,
                max: 200,
                title: "Wind Speed",
                label: "(m/s)",
                gaugeWidthScale: 0.2
            });
            (function poll() {
                setTimeout(function () {
                    $.ajax({
                        url: "/dash/getdata?gid=" + '<%= device %>' + "&id=5555",
                        success: function (data) {
                            try {
                                n1_airtemp.refresh(data[0].airTemp);
                                n1_airhumid.refresh(data[0].airHumid);
                                n1_wind.refresh(data[0].wind);
                                n1_soil.refresh(data[0].soilHumid);
                                var current_progress = data[0].pm1;
                                $("#pm1_bar")
                                    .css("width", current_progress)
                                    .attr("aria-valuenow", current_progress)
                                    .text(current_progress + " AQN");
                                $('#pm1_badge').text(current_progress + " AQN");
                                current_progress = data[0].pm25
                                $("#pm25_bar")
                                    .css("width", current_progress)
                                    .attr("aria-valuenow", current_progress)
                                    .text(current_progress + " AQN");
                                $('#pm25_badge').text(current_progress + " AQN");
                                current_progress = data[0].pm10
                                $("#pm10_bar")
                                    .css("width", current_progress)
                                    .attr("aria-valuenow", current_progress)
                                    .text(current_progress + " AQN");
                                $('#pm10_badge').text(current_progress + " AQN");
                                $('#raining_status').attr("src","image/rainy.png");
                                if(data[0].rain === "1"){
                                    $('#raining_status').attr("src","image/cloudy.png");
                                    $('#raining_status_text').text('Status :not raining')
                                }else{
                                    $('#raining_status').attr("src","image/rainy.png");
                                    $('#raining_status_text').text('Status :raining')
                                }
                            } catch (err) {
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
                }, 1000);
            })();
        });
    }
