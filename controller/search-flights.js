let formData = document.getElementById('search-hotels');
let ul = document.getElementById('cistyResid');
let city_ID = '';
let country_code = '';
let cityName = '';
let country_name = '';
let ul_two = document.getElementById('cistyResid_2');
let city_ID_two = '';
let country_code_two = '';
let cityName_two = '';
let country_name_two = '';

let selectedCountryCities = {};

let onListItemSelect = function(city_name, airport_code, _country_code_, _country_name_) {
  cityName = document.getElementById('flight_ubsercityid_one').value = city_name;
  city_ID = airport_code;
  country_code = _country_code_;
  country_name = _country_name_;

  /**
   * @author Khan Usama
   * Date 11/11/2020
   * 
   * This is used for identify internation trip
   */
  selectedCountryCities = Object.assign({
    sourceCoutryName: _country_name_
  }, selectedCountryCities);
  ul.innerHTML = '';
}
let onSecondListItemSelect = function(city_name, airport_code, _country_code_, _country_name_) {
  cityName_two = document.getElementById('flight_ubsercityid_two').value = city_name;
  city_ID_two = airport_code;
  country_code_two = _country_code_;
  country_name_two = _country_name_;

  /**
   * @author Khan Usama
   * Date 11/11/2020
   * 
   * This is used for identify internation trip
   */
  selectedCountryCities = Object.assign({
    destinationCountryName: _country_name_
  }, selectedCountryCities);

  ul_two.innerHTML = '';
}
/* CSS START FOR MEDIA QUERIES  */

function adjustStyle(width) {
  width = parseInt(width);
  console.log(width);
  if (width < 701) {
    console.log("LOADING HTML AND CSS FOR MOBILE FOR Width ", width);
    $("#size-stylesheet").attr("href", "css/narrow.css");
    $('#desktopID').hide();
    $('#MobileID').show();
  } else if (width < 900) {
    console.log("LOADING HTML AND CSS FOR MOBILE FOR Width ", width);
    $("#size-stylesheet").attr("href", "css/medium.css");
  }
}

$(function() {
  adjustStyle($(this).width());
  $(window).resize(function() {
    adjustStyle($(this).width());
  });
});

/* CSS END FOR MEDIA QUERIES  */

$('input[type=radio][name=input-group-radio]').change(function() {
  if (this.id == 'customRadioInline1') {
    functionsinglejourney();
  } else if (this.id == 'customRadioInline2') {
    functionjourney();
  } else {
    functionMultiJourney();
  }
});

function functionsinglejourney() {
  document.getElementById("arrival_id").disabled = true;
  document.getElementById("arrival_id").value = "";
  document.getElementById("arrival_id").style.opacity = 0.3;
  // document.getElementById("oneDateID").style.display ="block";
  // document.getElementById("twoDateID").style.display ="none";
}

function functionjourney() {
  document.getElementById("arrival_id").disabled = false;
  document.getElementById("arrival_id").style.opacity = 1;
  // document.getElementById("oneDateID").style.display ="block";
  // document.getElementById("twoDateID").style.display ="none";
}

function functionMultiJourney() {
  document.getElementById("oneDateID").style.display = "none";
  document.getElementById("twoDateID").style.display = "block";
}

$('#search-flight').on('submit', function(e) {
  // Prevent form submission by the browser
  e.preventDefault();

  /*
  function onDualFormSubmit() {  */
  console.log("INSIDE ON SUBMIT FORM");
  console.log("INSIDE ON SUBMIT FORM");
  let cityId = document.getElementById('flight_ubsercityid_one').value;
  let cityId_two = document.getElementById('flight_ubsercityid_two').value;
  let triptype = $("input[name='input-group-radio']:checked").val();
  let DepartDate = document.getElementById('departure_id').value;
  console.log("Depart Date===>" + DepartDate);
  if (triptype !== "OneWay") {
    console.log("INSIDE TRIP TYPE ==>" + triptype);
    var ArrivalDate = document.getElementById('arrival_id').value;
  }
  let CabinClass = document.getElementById('cabin_id').value;
  let NoOfAdults = document.getElementById('flightadult_id').value;
  let NoOfChild = document.getElementById('flightchild_id').value;
  let NoOfInfant = document.getElementById('flightinfant_id').value;

  console.log("Departure ==>" + cityId + "Arrival==>" + cityId_two + "CabinClass===>" + CabinClass + "Adult==>" + NoOfAdults + "Child==>" + NoOfChild + "INFANT==> " + NoOfInfant);
  // save data in the local storage for future used

  localStorage.setItem('flight_search_query', JSON.stringify({
    AdultCount: NoOfAdults,
    ChildCount: NoOfChild ? NoOfChild : 0,
    InfantCount: NoOfInfant ? NoOfInfant : 0,
    JourneyType: triptype,
    CabinClass: CabinClass,
    Origin: city_ID,
    Destination: city_ID_two,
    DepartureDate: DepartDate,
    ReturnDate: ArrivalDate,
    selectedCountryCities: selectedCountryCities
  }));

  let source_country  = selectedCountryCities.sourceCoutryName;
  let dest_country = selectedCountryCities.destinationCountryName;

  if (triptype !== "OneWay") {
    alert("GOING VIA");
    document.getElementById("search-flight").reset();
    window.location.href = `new-list.html?DepartureDate=${DepartDate}&AdultCount=${NoOfAdults}&CityId=${city_ID}&CabinClass=${CabinClass}&ChildCount=${NoOfChild}&InfantCount=${NoOfInfant}&ArrivalDate=${ArrivalDate}&CountryCode=${country_code}&Destination=${city_ID_two}&JourneyType=${triptype}&source_country=${source_country}&dest_country=${dest_country}`;
  } else {
    alert("GOING Oneway");
    document.getElementById("search-flight").reset();
    window.location.href = `new-list.html?DepartureDate=${DepartDate}&AdultCount=${NoOfAdults}&CityId=${city_ID}&CabinClass=${CabinClass}&ChildCount=${NoOfChild}&InfantCount=${NoOfInfant}&CountryCode=${country_code}&Destination=${city_ID_two}&JourneyType=${triptype}&source_country=${source_country}&dest_country=${dest_country}`;
  }
  /* }*/

  return false;
});

$(document).on('focus', ':input', function() {
  $(this).attr('autocomplete', 'off');
});

var maxpaxcount = 9;
var adultcount = 0;
var childcount = 0;
var infantcount = 0;
var newmaxchildcount = 0;

$('body').on('change', '#flightadult_id', function() {
  var maxpax = 9;
  var $this = $(this);
  var $name = $this.attr('name');
  var adpaxid = $this.val();
  console.log($this.val());
  var newmaxchildcount = maxpaxcount - adpaxid;
  childcount = newmaxchildcount;
  // var newmaxchildcount =maxpaxcount-adpaxid;
  console.log("Child Value", newmaxchildcount);
  $('#flightchild_id').prop('disabled', true);
  $('#flightinfant_id').prop('disabled', true);
  $('#flightinfant_id').removeAttr("disabled");
  $('#flightchild_id').removeAttr("disabled");
  $("#flightchild_id").attr({
    "max": newmaxchildcount,
    "min": 0
  });
  console.log(" NEW count", newmaxchildcount);

  options = "";
  options += '<option value="">Select Child</option>';
  for (var i = 0; i < newmaxchildcount; i++) {
    options += "<option value='" + i + "'>" + i + "</option>";
  }
  // console.log(options);
  document.getElementById('flightchild_id').innerHTML = options;

  /*var max = parseInt($(this).attr('max'));
  var min = parseInt($(this).attr('min'));
  if ($(this).val() > max)
  {
    $(this).val(max);
  }
  else if ($(this).val() < min)
  {
    $(this).val(min);
  }       
  */

});

$('body').on('change', '#flightchild_id', function() {
  var $this = $(this);
  var $name = $this.attr('name');
  var childpaxid = $this.val();
  console.log($this.val());
  var newmaxinfantcount = childcount - childpaxid;
  console.log(" Child count", newmaxinfantcount);
  // console.log(" NEW Infant count",childcount);

  infoptions = "";
  infoptions += '<option value="">Select Infant</option>';
  for (var i = 0; i < newmaxinfantcount; i++) {
    infoptions += "<option value='" + i + "'>" + i + "</option>";
  }
  // console.log(options);
  document.getElementById('flightinfant_id').innerHTML = infoptions;

});

$(function() {
  $(".childCSage").change(function() {
    var max = parseInt($(this).attr('max'));
    var min = parseInt($(this).attr('min'));
    if ($(this).val() > max) {
      $(this).val(max);
    } else if ($(this).val() < min) {
      $(this).val(min);
    }
  });
});

$(function() {
  $(".childCScount").change(function() {
    var max = parseInt($(this).attr('max'));
    var min = parseInt($(this).attr('min'));
    if ($(this).val() > max) {
      $(this).val(max);
    } else if ($(this).val() < min) {
      $(this).val(min);
    }
  });
});

$(function() {
  $(".adultCScount").change(function() {
    var max = parseInt($(this).attr('max'));
    var min = parseInt($(this).attr('min'));
    if ($(this).val() > max) {
      $(this).val(max);
    } else if ($(this).val() < min) {
      $(this).val(min);
    }
  });
});

$("#departure_id").datepicker({
  minDate: 0,
  // maxDate: '+6M',
  changeMonth: true,
  changeYear: true,
  dateFormat: 'yy-mm-dd',
  onSelect: function(dateStr) {
    var min = $(this).datepicker('getDate'); // Get selected date
    console.log(min);
    $("#arrival_id").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
  }
});

$("#arrival_id").datepicker({
  minDate: '0',
  // maxDate: '+6M',
  changeMonth: true,
  changeYear: true,
  onSelect: function(dateStr) {
    var max = $(this).datepicker('getDate'); // Get selected date
    // $('#datepicker').datepicker('option', 'maxDate', max || '+1Y+6M'); // Set other max, default to +18 months
    var start = $("#departure_id").datepicker("getDate");
    var end = $("#arrival_id").datepicker("getDate");
    var days = (end - start) / (1000 * 60 * 60 * 24);
    console.log(days);
    // $("#TextBox3").val(days);
  }
});

document.getElementById('flight_ubsercityid_one').classList.remove('hsloading');
let delay = (() => {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

$('#flight_ubsercityid_one').keyup(function() {
  document.getElementById('flight_ubsercityid_one').classList.add('hsloading');
  var query = $(this).val();
  if (query != '') {
    delay(function() {
      $.ajax({
        url: 'https://demo.liamlifestyleandservices.com/flightsearch.php',
        type: 'POST',
        data: {
          query: query
        },
        success: function(data) {
          let response = JSON.parse(data);
          if (response.Status === 0) {
            return;
          }

          if (response.Status === 1) {
            console.log(response);
            console.log(response.airportlist);
            let template = '';
            
            /**
             * @author Khan Usama
             * Date 11 OCT 2020
             * 
             * @description If some enter wrong city name then errors comes, need to handle error
             */
            if (Array.isArray(response.airportlist)) {
              response.airportlist.forEach((item, index) => {
                template += `<li onclick="onListItemSelect('${item.city_name}', '${item.airport_code}', '${item.airport_name}', '${item.country_name}')" class="list-hover list-group-item list-group-item-action flight-listli ">${item.airport_name} (${item.city_name}) <strong class="airstrong"> ${item.airport_code} </strong></li>`;
                /*          template += `<li  onclick="onListItemSelect('${item.city_name}', '${item.airport_code}', '${item.airport_name}', '${item.country_name}')" role="option" id="react-autowhatever-1-section-1-item-1" aria-selected="false" class="react-autosuggest__suggestion" data-section-index="1" data-suggestion-index="1"> <div class="makeFlex hrtlCenter"> <div class="calc60"> <p class="font14 appendBottom5 blackText">${item.city_name},${item.country_name}</p> <p class="font12 greyText appendBottom3">${item.airport_name}</p> </div> <div class="pushRight font14 lightGreyText latoBold">${item.airport_code}</div> </div> </li>`;*/
              });
              document.getElementById('flight_ubsercityid_one').classList.remove('hsloading');
    
              $('#cistyResid').fadeIn();
              $('#cistyResid').html(template);
            }
          }
        }
      });
    }, 1000);

  } else {
    $('#cistyResid').fadeOut();
    $('#cistyResid').html("");
  }
});

$('#flight_ubsercityid_two').keyup(function() {
  document.getElementById('flight_ubsercityid_two').classList.add('hsloading');
  var query = $(this).val();
  if (query != '') {
    delay(function() {
      $.ajax({
        url: 'https://demo.liamlifestyleandservices.com/flightsearch.php',
        type: 'POST',
        data: {
          query: query
        },
        success: function(data) {
          let response = JSON.parse(data);
          if (response.Status === 0) {
            return;
          }

          if (response.Status === 1) {
            let template_two = '';
            if (Array.isArray(response.airportlist)) {
              response.airportlist.forEach((item, index) => {
                template_two += `<li onclick="onSecondListItemSelect('${item.city_name}', '${item.airport_code}', '${item.airport_name}', '${item.country_name}')" class="list-hover list-group-item list-group-item-action flight-listli ">${item.airport_name} (${item.city_name}) <strong class="airstrong"> ${item.airport_code} </strong></li>`;
                // template_two += `<li onclick="onSecondListItemSelect('${item.city_name}', '${item.airport_code}', '${item.airport_name}', '${item.country_name}')" class="list-hover list-group-item list-group-item-action">${item.city_name} ,<strong> ${item.country_name} </strong></li>`;
              });
              document.getElementById('flight_ubsercityid_two').classList.remove('hsloading');
              $('#cistyResid_2').fadeIn();
              $('#cistyResid_2').html(template_two);
            }
          }
        }
      });
    }, 1000);
  } else {
    $('#cistyResid_2').fadeOut();
    $('#cistyResid_2').html("");
  }
});

$(function() {
  $('[data-toggle="popover"]').popover({
    html: true,
    placement: 'bottom',
    sanitize: false,
    content: function() {
      return $("#PopoverContent").html();
    }
  });
})

$(function() {
  $('[data-toggle="popoverone"]').popover({
    html: true,
    placement: 'bottom',
    sanitize: false,
    content: function() {
      console.log("calling one");
      return $("#PopoverContentone").html();
    }
  });
})

/*var rCount = 1;
var aCount = 0;
var cCount = 0;
$('body').on('change', 'select', function(){
  var $this = $(this);
  var $name = $this.attr('name');

  if ($name === 'roomCount'){
    rCount = $this.toArray().reduce(function(prev, current){
      prev += parseInt($(current).val());
      return prev;
    },0);
        // console.log('am im Adult');
      }else if ($name === '_root.rooms__1.adultcount'){
        aCount = $this.toArray().reduce(function(prev, current){
          prev += parseInt($(current).val());
          return prev;
        },0);
        // console.log('am im Child');
      }else if ($name === 'childcount'){
        cCount = $this.toArray().reduce(function(prev, current){
          prev += parseInt($(current).val());
          return prev;
        },0);
        // console.log('am im Infant');
      }
      $('#allcountdomestic').val('Adult: '+rCount+' Child:' +aCount+ ' Infant: ' +cCount);
      var totalval=$("#allcountdomestic").val().replace(/[^0-9]/g,''); 
      $('#allcountmulti').val('Adult: '+rCount+' Child:' +aCount+ ' Infant: ' +cCount);
      var totalvals=$("#allcountmulti").val().replace(/[^0-9]/g,''); 
      console.log("Total here ===>",totalval);

    } );*/