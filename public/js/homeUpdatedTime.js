function initHome() {
    (function poll() {
        setTimeout(function () {
            $.ajax({
                url: "/dash/getdata?gid=83&id=31",
                success: function (data) {
                    try {
                        var thTime = data[0].dt.toLocaleString("en-US", {timeZone: "asia/bangkok"});
                        $('#update2').text(new Date(thTime));
                        $('#online2').css("color","green")
                    }catch(err){
                        console.log("ERROR from home ajax.")
                    }
                },
                error: function () {
                    console.log('ERROR')
                },
                dataType: "json",
                type: 'GET',
                complete: poll
            });
        }, 1000);
    })();
    (function poll() {
        setTimeout(function () {
            $.ajax({
                url: "/dash/getdata?gid=84&id=41",
                success: function (data) {
                    try {
                        var thTime = data[0].dt.toLocaleString("en-US", {timeZone: "asia/bangkok"});
                        $('#update3').text(new Date(thTime));
                        $('#online3').css("color","green")
                    }catch(err){
                        console.log("ERROR from home ajax.")
                    }
                },
                error: function () {
                    console.log('ERROR')
                },
                dataType: "json",
                type: 'GET',
                complete: poll
            });
        }, 1000);
    })();
    (function poll() {
        setTimeout(function () {
            $.ajax({
                url: "/dash/getdata?gid=85&id=51",
                success: function (data) {
                    try {
                        var thTime = data[0].dt.toLocaleString("en-US", {timeZone: "asia/bangkok"});
                        $('#update4').text(new Date(thTime));
                        $('#online4').css("color","green")
                    }catch(err){
                        console.log("ERROR from home ajax.")
                    }
                },
                error: function () {
                    console.log('ERROR')
                },
                dataType: "json",
                type: 'GET',
                complete: poll
            });
        }, 1000);
    })();
}