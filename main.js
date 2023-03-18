f = document.getElementById('form_f');
function myFunction(){
    f.style.border = "1px solid var(--main-color)"
}

function myFunction2(){
    f.style.border = "0.5px solid rgba(255, 255, 255, 0.1)"
}

if(localStorage.getItem('ville')){
    ville=localStorage.getItem('ville')
}else{
    ville='bouira'
    localStorage.setItem('ville','Bouira')
}


const data = null;
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        result = JSON.parse(this.responseText)

        Location_data = JSON.parse(this.responseText).location
        Curent_data = JSON.parse(this.responseText).current
        Forcast_data = JSON.parse(this.responseText).forecast.forecastday

        villeSelected.innerText = ville +", "+ Location_data.country
        nom.innerHTML = Location_data.name
        region.innerHTML = Location_data.region
        country.innerHTML = Location_data.country
        localtime.innerHTML = Location_data.localtime

        l_u.innerText = Location_data.localtime.slice(11,16);
        tempC.innerText = Curent_data.temp_c+"°";
        img_st.style.backgroundImage = "url(http:"+(Curent_data.condition.icon)+")";
        preloader.style.display="none";
        
        document.getElementById('pp1').style.height = Forcast_data[0].hour[0].temp_c* 100 / 40 + "%";
        document.getElementById('pp2').style.height = Forcast_data[0].hour[6].temp_c* 100 / 40 + "%";
        document.getElementById('pp3').style.height = Forcast_data[0].hour[12].temp_c* 100 / 40 + "%";
        document.getElementById('pp4').style.height = Forcast_data[0].hour[18].temp_c* 100 / 40 + "%";
        document.getElementById('pp5').style.height = Forcast_data[0].hour[23].temp_c* 100 / 40 + "%";

        for (let i = 0; i < 3; i++) {
            ww.innerHTML+= 
            '<div class="box"><span class="day">day '+(i+1)+'</span><span class="stat" id="stt'+i+'"></span><span class="temp">'+Forcast_data[i]["hour"][i]["temp_c"]+'°</span></div>';   
            document.getElementById('stt'+i).style.backgroundImage = "url(http:"+(Forcast_data[i]['hour']['8']['condition']['icon'])+")";
        }
      
    }
});

function myfunction1() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2501bc847fmsh7ecbaac873c34e8p1d8083jsn7fa997d96f70',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    villes = ['london','paris','oran']
    for (let i = 0; i < villes.length; i++) {
        citys.innerHTML+= 
        '<div class="city"><div class="c1"><p class="c1_pays" id="country_b_'+(i+1)+'"></p><p class="c1_city" id="city_b_'+(i+1)+'"></p><p class="c1_sit" id="sit_b_'+(i+1)+'"></p></div><div class="c2"><div class="c2_img" id="c2Img'+(i+1)+'"></div><div class="c2_temp" id="c2tmp'+(i+1)+'"></div></div></div>'
        const element = villes[i];
        const url = "https://weatherapi-com.p.rapidapi.com/forecast.json?q="+element
        fetch(url, options).then(response => { return response.json() }).then(data => {
            document.getElementById('country_b_' + (i + 1)).innerText = data.location.country
            document.getElementById('city_b_' + (i + 1)).innerText = data.location.name
            document.getElementById('sit_b_' + (i + 1)).innerText = data.current.condition.text
            document.getElementById('c2Img' + (i + 1)).style.backgroundImage = "url(http:" + (data.current.condition.icon) + ")"
            document.getElementById('c2tmp' + (i + 1)).innerText = data.current.temp_c + " °"
        })
        .catch(err => console.error(err));

    }

    xhr.open("GET", "https://weatherapi-com.p.rapidapi.com/forecast.json?q="+ville+"&days=7");
    xhr.setRequestHeader("X-RapidAPI-Key", "2501bc847fmsh7ecbaac873c34e8p1d8083jsn7fa997d96f70");
    xhr.setRequestHeader("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com"); 
    xhr.send(data);
}
function updateVille(){
    ville=localStorage.setItem('ville',villeS.value)
    myfunction1()
}
window.onload = myfunction1()
