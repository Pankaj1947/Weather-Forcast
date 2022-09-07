var input = document.getElementById("city");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("myBtn").click();
    }
});
document.getElementById("myBtn").addEventListener("click", getWhether)
let container = document.getElementById("container");
async function getWhether() {
    let city = document.getElementById("city").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d1f6ef0c4c70918d09adb5eb587f2687&units=metric`;

    try {
        let res = await fetch(url);
        let data = await res.json();
        console.log("data:", data);
        appendData(data);
        let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,hourly,minutely&appid=d1f6ef0c4c70918d09adb5eb587f2687&units=metric`;
        let res2 = await fetch(url2);
        let data2 = await res2.json();
        console.log("data2:", data2);
        sevenDaysData(data2);
    } catch (err) {
        console.log("err:", err);
    }
}

function appendData(data) {
    if (data.cod === "404") {
        container.innerHTML = "";
        document.getElementById("container2").innerHTML = null;
        document.getElementById("errorcontainer").innerHTML = null;
        var img1 = document.createElement("img");
        img1.setAttribute("id", "errorimage");
        img1.src =
            "https://media1.giphy.com/media/UoeaPqYrimha6rdTFV/200w.webp?cid=ecf05e47c3fkgu8tgmezw74ps2ivsz2a4v4w0nl4b3h1crp9&rid=200w.webp&ct=g";
        var div = document.createElement("div");
        div.setAttribute("id", "error");
        var line = document.createElement("h3");
        line.textContent = "City Not Found";
        div.append(line);
        errorcontainer.append(img1, div);
    } else {
        container.innerHTML = null;
        document.getElementById("container2").innerHTML = null;
        document.getElementById("errorcontainer").innerHTML = null;
        var maindiv = document.getElementById("container");

        var leftdiv = document.createElement("div");
        leftdiv.setAttribute("id", "leftdiv");
        let name = document.createElement("h2");
        name.innerText = data.name;
        var tempdiv = document.createElement("div");
        tempdiv.setAttribute("id", "tempdiv");
        let temp = document.createElement("h1");
        temp.innerText = `${data.main.temp.toFixed(0)}°C`;
        var icon = document.createElement("img");
        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        tempdiv.append(temp, icon);

        let div1 = document.createElement("div");
        let mintemp = document.createElement("h4");
        mintemp.innerText = `Min: ${data.main.temp_min.toFixed(0)}°C`;
        let maxtemp = document.createElement("h4");
        maxtemp.innerText = `Max: ${data.main.temp_max.toFixed(0)}°C`;
        div1.append(mintemp, maxtemp);

        let div2 = document.createElement("div");
        let wind = document.createElement("h4");
        wind.innerText = `Wind Speed : ${data.wind.speed} m/s`;
        let clouds = document.createElement("h4");
        clouds.innerText = `Clouds : ${data.clouds.all}`;
        div2.append(wind, clouds);

        var div3 = document.createElement("div");
        var risediv = document.createElement("div");
        risediv.setAttribute("class", "sundivs");
        var sunriseilogo = document.createElement("img");
        sunriseilogo.src =
            `http://openweathermap.org/img/wn/01d@4x.png`;
        var sunrise = document.createElement("h4");
        sunrise.innerText = `Sunrise : ${window
            .moment(data.sys.sunrise * 1000)
            .format("HH:mm a")}`;
        risediv.append(sunrise, sunriseilogo);
        var setdiv = document.createElement("div");
        setdiv.setAttribute("class", "sundivs");
        var sunsetilogo = document.createElement("img");
        sunsetilogo.src =
            `http://openweathermap.org/img/wn/01n@4x.png`;
        var sunset = document.createElement("h4");
        sunset.innerText = `sunset : ${window
            .moment(data.sys.sunset * 1000)
            .format("HH:mm a")}`;
        setdiv.append(sunset, sunsetilogo);
        div3.append(risediv, setdiv);

        leftdiv.append(name, tempdiv, div1, div2, div3);

        let iframe = document.createElement("iframe");
        iframe.setAttribute("id", "iframe");
        iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        maindiv.append(leftdiv, iframe);
    }
}

function sevenDaysData(data2) {
    document.getElementById("container2").innerHTML = null;
    document.getElementById("errorcontainer").innerHTML = null;
    data2.daily.forEach(function (elem, index) {
        var div = document.createElement("div");
        var days = document.createElement("h3");
        days.innerText = `${window.moment(elem.dt * 1000).format("ddd")}`;
        console.log("days:", days.innerText);
        var icon = document.createElement("img");
        icon.src = `http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`;
        console.log("icon:", icon);
        var day = document.createElement("h4");
        day.innerText = `Day: ${elem.temp.day.toFixed(0)}°C`;
        var night = document.createElement("h4");
        night.innerText = `Night: ${elem.temp.night.toFixed(0)}°C`;

        div.append(days, icon, day, night);

        document.getElementById("container2").append(div);
    });
}