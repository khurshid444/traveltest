var hotelformData = document.getElementById('search-hotels');
var  hotelul = document.getElementById('hotelcistyResid');
var hotelcity_ID = '';
var hotelcountry_code = '';
var hotelcityName = '';
var hotelcountry_name = '';
var selectedhotelroom='';

var hotelonListItemSelect = function (hotelcity_name, hotelcity_code, hotel_country_code_, hotel_country_name_) {
  hotelcityName = document.getElementById('UBserCityID').value = hotelcity_name;
  hotelcity_ID = document.getElementById('UBserCityID').name=hotelcity_code;
  hotelcountry_code = hotel_country_code_;
  hotelcountry_name = hotel_country_name_;
  hotelul.innerHTML = '';
}


$('.datepicker-wrap input').each(function() {
  var minDate = $(this).data("min-date");
  if (typeof minDate == "undefined") {
    minDate = 0;
  }
  $(this).datepicker({
    buttonImage: 'images/icon/blank.png',
    buttonText: '',
    // changeYear: false,
    changeMonth: true,
    changeYear: true,
    minDate: minDate,
    dateFormat: "dd/mm/yy",
    dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
    onClose: function(selectedDate) {
      if ( $(this).attr('name') == 'date_from' ) {
        if ( $(this).closest('form').find('input[name="date_to"]').length > 0 ) {
          $(this).closest('form').find('input[name="date_to"]').datepicker("option", "minDate", selectedDate);
        }
      }
      if ( $(this).attr('name') == 'date_to' ) {
        if ( $(this).closest('form').find('input[name="date_from"]').length > 0 ) {
          $(this).closest('form').find('input[name="date_from"]').datepicker("option", "maxDate", selectedDate);
        }

        var hotelstart = $("#hotel-Date_From").datepicker("getDate");
        var hotelend = $("#hotel-Date_To").datepicker("getDate");
        var hdays = (hotelend - hotelstart)  / (1000 * 60 * 60 * 24);
        if (hdays == 0) {
          document.getElementById('nightIPError').innerHTML ="Minumum 1 Night is Required";                        
          document.getElementById('no_of_rooms').value = 0;                      
          $("#no_of_rooms").prop('required',true);  
        }else if(hdays >= 11 ){
          document.getElementById('nightIPError').innerHTML ="maximum 10 Night are allowed";                        
        }else{
          document.getElementById('nightIPError').innerHTML ="";                        
          document.getElementById('no_of_rooms').value = (hotelend - hotelstart)  / (1000 * 60 * 60 * 24)+ " Nights";                                        
        }
        console.log(hotelstart.toISOString().slice(0, -5));
        console.log(hotelend.toISOString().slice(0, -5));
      }
    }
  });
});

$('.add_rooms').click(function() {
  if ($('#rowone2').css('display') == "none") {
    $(".remove_rooms").fadeIn();  
    $("#rowone2").fadeIn();  
  } else if ($('#rowone3').css('display') == "none") {
    $("#rowone3").fadeIn();  
  }
})

$("select#hotelroomcountID").change(function(){
 $("#chldrnageONEID").show();    
 selectedhotelroom = $(this).children("option:selected").val();
 console.log(selectedhotelroom);
 if (selectedhotelroom == 1) {
  $("#rowone1").show(1000);    
  $("#rowone2").hide(1000);    
  $("#rowone3").hide(1000);    
}else if (selectedhotelroom == 2) {
  $("#rowone1").show(1000);    
  $("#rowone2").show(1000);    
  $("#rowone3").hide(1000);    
} else if( selectedhotelroom == 3 ){
 $("#rowone1").show(1000);    
 $("#rowone2").show(1000);    
 $("#rowone3").show(1000);    
}
});


$("#room1childno1ID").change(function(){   
  var roomonechildinp = $("#room1childno1ID").val();
  console.log(roomonechildinp);
  if (roomonechildinp == 0){
    $("#chilagedivRoomoneID").hide(1000);    
    $("#chilagedivRoomTwoID").hide(1000);    
  }else if( roomonechildinp == 1 ){
   $("#chilagedivRoomoneID").show(1000);    
   $("#chilagedivRoomTwoID").hide(1000);    
 }else{
   $("#chilagedivRoomoneID").show(1000);    
   $("#chilagedivRoomTwoID").show(1000);    
 }

});

$("#room2childno1ID").change(function(){   
  var roomtwochildinp = $("#room2childno1ID").val();
  console.log(roomtwochildinp);
  if (roomtwochildinp == 0) {
    $("#room2chilagedivRoomoneID").hide(1000);    
    $("#room2chilagedivRoomtwoID").hide(1000);    
  } else if( roomtwochildinp == 1 ){    
    console.log("INSIDE THE Room"+roomtwochildinp);
    $("#room2chilagedivRoomoneID").show(1000);    
    $("#room2chilagedivRoomtwoID").hide(1000);    
  } else{
    console.log("INSIDE THE Room"+roomtwochildinp);
    $("#room2chilagedivRoomoneID").show(1000);    
    $("#room2chilagedivRoomtwoID").show(1000);    
  }

});


$("#room3childno1ID").change(function(){   
  var roomthreechildinp = $("#room3childno1ID").val();
  console.log(roomthreechildinp);
  if (roomthreechildinp == 0) {
    $("#room3chilagedivRoomoneID").hide(1000);    
    $("#room3chilagedivRoomtwoID").hide(1000);    
  } else if( roomthreechildinp == 1 ){
   $("#room3chilagedivRoomoneID").show(1000);    
   $("#room3chilagedivRoomtwoID").hide(1000);    
 } else{
   $("#room3chilagedivRoomoneID").show(1000);    
   $("#room3chilagedivRoomtwoID").show(1000);    
 }

});

$(function () {
 $( ".childCSage" ).change(function() {
  var max = parseInt($(this).attr('max'));
  var min = parseInt($(this).attr('min'));
  if ($(this).val() > max)
  {
    $(this).val(max);
  }
  else if ($(this).val() < min)
  {
    $(this).val(min);
  }       
}); 
});


$(function () {
 $( ".childCScount" ).change(function() {
  var max = parseInt($(this).attr('max'));
  var min = parseInt($(this).attr('min'));
  if ($(this).val() > max)
  {
    $(this).val(max);
  }
  else if ($(this).val() < min)
  {
    $(this).val(min);
  }       
}); 
});

$(function () {
  $( ".adultCScount" ).change(function() {
    var max = parseInt($(this).attr('max'));
    var min = parseInt($(this).attr('min'));
    if ($(this).val() > max)
    {
      $(this).val(max);
    }
    else if ($(this).val() < min)
    {
      $(this).val(min);
    }       
  }); 
});


$('#search-hotels').on('submit', function(e) {
  e.preventDefault();
  let cityId = document.getElementById('UBserCityID').value;
  let cityIdID = document.getElementById('UBserCityID').name;
  var CheckIn = $('#hotel-Date_From').val();  
  var CheckOut = $('#hotel-Date_To').val();  
  var indate = $('#hotel-Date_From').datepicker({ dateFormat: 'dd/mm/yy' }).val();
  var outdate = $('#hotel-Date_To').datepicker({ dateFormat: 'dd/mm/yy' }).val();
  var Nonights   = $('#no_of_rooms').val().replace(/\D/g,'');
  var roomsvalue= document.getElementById('hotelroomcountID').value;
  
  if ((cityId !== null) && (cityId !== '')){
    $('#hotelsearch').html('');
  }else{
    $('#hotelsearch').html('Required');
    return false;
  }
  if ((CheckIn !== null) && (CheckIn !== '')){
    $('#hotelfromdate').html('');
  }else{
    $('#hotelfromdate').html('Required');
    return false;
  }
  if ((CheckOut !== null) && (CheckOut !== '')){
    $('#hoteltodate').html('');
  }else{
    $('#hoteltodate').html('Required');
    return false;
  }
  if (( roomsvalue!== null) && (roomsvalue !== '')){
    $('#hotelroomselect').html('');
  }else{
    $('#hotelroomselect').html('Required');
    return false;
  }
  if (( Nonights !== null) && (Nonights !== '')){
    $('#hotelnightip').html('');
  }else{
    $('#hotelnightip').html('Required');
    return false;
  }

  if (roomsvalue == 1) {
    console.log("No OF Rooms====> " + roomsvalue);    
    document.getElementById('rowone1').style.display="block";            
    var room1adult= document.getElementById('room1adultnoID').value;
    var room1child= document.getElementById('room1childno1ID').value;
    console.log("Child Count ====> " +room1child);    
    if (room1child ==0){
      console.log("No child selected");

    } else if (room1child == 1) {
      var roomchild1age= document.getElementById('room1childno1ageID').value;  
      console.log("Room1 Child no " +roomchild1age);
      if((roomchild1age !== null) && (roomchild1age !== '')){
        console.log("Room 1 Child 1 AGE "+roomchild1age);
        document.getElementById('room1childno1ageval').innerHTML = "";
      }else{
        document.getElementById('room1childno1ageval').innerHTML = "ENTER THE CHILD AGE";
        console.log("Room 1 Child 1 AGE "+roomchild1age);
        return false;
      }
    } else {
      var roomchild1age=document.getElementById('room1childno1ageID').value;
      var roomchild2age=document.getElementById('room1childno2ageID').value;
      if(((roomchild1age !== null) && (roomchild1age !== '')) && ((roomchild2age !== null) && (roomchild2age !== '')))  {
        console.log("Room 1 Child 1 AGE "+roomchild1age);
        console.log("Room 1 Child 2 AGE "+roomchild2age);
        document.getElementById('room1childno1ageval').innerHTML = "";
        document.getElementById('room1childno2ageval').innerHTML = "";
      }else{
        document.getElementById('room1childno1ageval').innerHTML = "ENTER THE CHILD AGE";
        document.getElementById('room1childno2ageval').innerHTML = "ENTER THE CHILD AGE";
        return false;
      }
    } 

    document.getElementById('room1childno1ageval').innerHTML = "";
    document.getElementById('room1childno2ageval').innerHTML = "";
    console.log("all fine");
    var Room1Adult = $("#room1adultnoID").val();  
    var Room1child1 = $("#room1childno1ageID").val();  
    var Room1child2 = $("#room1childno2ageID").val();  
    console.log("Room 1 child 1 AGE==> "+Room1child1+"ROOM 1 child 2 age ==> "+Room1child2);

    localStorage.setItem('hotel_find_request', JSON.stringify({
      CheckInDate: indate,
      CheckOutDate: outdate,
      NoOfNights: Nonights,
      CityId: cityIdID,
      GuestNationality:hotelcountry_code,
      CountryCode: hotelcountry_code,
      cityName: hotelcityName,
      country_name: hotelcountry_name,
      NoOfRooms: roomsvalue,
      NoOfRoom1Adults: Room1Adult,
      NoOfRoom2Adults: Room2Adult,
      NoOfRoom1Child: room1child,
      NoOfRoom2Child: room2child,
      NoOfRoom1child1age: Room1child1,
      NoOfRoom1child2age: Room1child2,
      NoOfRoom2child1age: Room2child1,
      NoOfRoom2child2age: Room2child2,
    }));      
    document.getElementById("search-hotels").reset();
    window.location.href = `hotel-list-view.html?CheckInDate=${indate}&CheckOutDate=${outdate}&NoOfNights=${Nonights}&CityId=${cityIdID}&GuestNationality=${hotelcountry_code}&NoOfRooms=${roomsvalue}&NoOfRoom1Adults=${Room1Adult}&NoOfRoom1Child1=${Room1child1}&NoOfRoom1Child2=${Room1child2}&NoOfRoom1Child=${room1child}`;
  } else if(roomsvalue == 2){

    console.log("No OF Rooms====> " + roomsvalue);    
    document.getElementById('rowone1').style.display="block";            
    var room1adult= document.getElementById('room1adultnoID').value;
    var room1child= document.getElementById('room1childno1ID').value;
    console.log("Child Count ====> " +room1child);    
    if (room1child ==0){
      console.log("No  room 1 child selected");
    } else if (room1child == 1) {
      var roomchild1age= document.getElementById('room1childno1ageID').value;  
      console.log("Room1 Child no " +roomchild1age);
      if((roomchild1age !== null) && (roomchild1age !== '')){
        console.log("Room 1 Child 1 AGE "+roomchild1age);
        document.getElementById('room1childno1ageval').innerHTML = "";
      }else{
        document.getElementById('room1childno1ageval').innerHTML = "ENTER THE CHILD AGE";
        console.log("Room 1 Child 1 AGE "+roomchild1age);
        return false;
      }
    } else {
      var roomchild1age=document.getElementById('room1childno1ageID').value;
      var roomchild2age=document.getElementById('room1childno2ageID').value;
      if(((roomchild1age !== null) && (roomchild1age !== '')) && ((roomchild2age !== null) && (roomchild2age !== '')))  {
        console.log("Room 1 Child 1 AGE "+roomchild1age);
        console.log("Room 1 Child 2 AGE "+roomchild2age);
        document.getElementById('room1childno1ageval').innerHTML = "";
        document.getElementById('room1childno2ageval').innerHTML = "";
      }else{
        console.log("Enter Child AGE 2 ");
        document.getElementById('room1childno1ageval').innerHTML = "ENTER THE CHILD AGE";
        document.getElementById('room1childno2ageval').innerHTML = "ENTER THE CHILD AGE";
        return false;
      }
    } 

    var room2adult= document.getElementById('room2adultnoID').value;
    console.log(room2adult);
    if (room2adult ==0){
      console.log("minimum 1 Adult Required");
      return false;
    }else{      
      console.log("Atleast 1 Adult selected");
    }

    var room2child= document.getElementById('room2childno1ID').value;
    console.log("Room 2 Child Count ====> " +room2child);    
    if (room2child ==0){
      console.log("No child selected");

    } else if (room2child == 1) {
      var room2child1age= document.getElementById('room2childno1ageID').value;  
      console.log("Room1 Child no " +room2child1age);
      if((room2child1age !== null) && (room2child1age !== '')){
        console.log("Room 2 Child 1 AGE "+room2child1age);
        document.getElementById('room2childno1ageval').innerHTML = "";
      }else{
        document.getElementById('room2childno1ageval').innerHTML = "ENTER THE CHILD AGE";
        console.log("Room 2 Child 1 AGE "+room2child1age);
        return false;
      }
    } else {
      console.log("Room 2 Child Count ====> " +room2child);    
      var room2child1age=document.getElementById('room2childno1ageID').value;
      var room2child2age=document.getElementById('room2childno2ageID').value;
      if(((room2child1age !== null) && (room2child1age !== '')) && ((room2child2age !== null) && (room2child2age !== '')))  {
        console.log("Room 2 Child 1 AGE "+room2child1age);
        console.log("Room 2 Child 2 AGE "+room2child2age);
        document.getElementById('room2childno1ageval').innerHTML = "";
        document.getElementById('room2childno2ageval').innerHTML = "";
      }else{
        document.getElementById('room2childno1ageval').innerHTML = "ENTER THE CHILD AGE";
        document.getElementById('room2childno2ageval').innerHTML = "ENTER THE CHILD AGE";
        return false;
      }
    } 

    var Room1Adult = $("#room1adultnoID").val();  
    var Room2Adult = $("#room2adultnoID").val();  
    var Room1child1 = $("#room1childno1ageID").val();  
    var Room1child2 = $("#room1childno2ageID").val();  
    var Room2child1 = $("#room2childno1ageID").val();  
    var Room2child2 = $("#room2childno2ageID").val();  
    console.log("Room 1 child 1 AGE==> "+Room1child1+"ROOM 1 child 2 age ==> "+Room1child2+"ROOM 2 Child 1 age ==>"+Room2child1+"ROOM 2 Child 2 age ==>"+Room2child1);
    localStorage.setItem('hotel_find_request', JSON.stringify({
      CheckInDate: indate,
      CheckOutDate: outdate,
      NoOfNights: Nonights,
      CityId: cityIdID,
      GuestNationality:hotelcountry_code,
      CountryCode: hotelcountry_code,
      cityName: hotelcityName,
      country_name: hotelcountry_name,
      NoOfRooms: roomsvalue,
      NoOfRoom1Adults: Room1Adult,
      NoOfRoom2Adults: Room2Adult,
      NoOfRoom1Child: room1child,
      NoOfRoom2Child: room2child,
      NoOfRoom1child1age: Room1child1,
      NoOfRoom1child2age: Room1child2,
      NoOfRoom2child1age: Room2child1,
      NoOfRoom2child2age: Room2child2,
    }));
    document.getElementById("search-hotels").reset();
    window.location.href = `hotel-list-view.html?CheckInDate=${indate}&CheckOutDate=${outdate}&NoOfNights=${Nonights}&CityId=${cityIdID}&GuestNationality=${hotelcountry_code}&NoOfRooms=${roomsvalue}&NoOfRoom1Adults=${Room1Adult}&NoOfRoom2Adults=${Room2Adult}&NoOfRoom1Child1=${Room1child1}&NoOfRoom1Child=${room1child}&NoOfRoom2Child=${room2child}&NoOfRoom1Child2=${Room1child2}&NoOfRoom2Child1=${Room2child1}&NoOfRoom2Child2=${Room2child2}`;

  }else{
   console.log(roomsvalue);
   document.getElementById('rowone1').style.display="block";            
   document.getElementById('rowone2').style.display="block";            
   document.getElementById('rowone3').style.display="block";           
   var room1adult= document.getElementById('room1adultnoID').value;
   var room1child= document.getElementById('room1childno1ID').value;
   console.log("Room 1 Child no " + room1child);
   if (room1child ==1) {
    var roomchild1age= document.getElementById('room1childno1ageID').value;  
    console.log("Room 1 Child no " +roomchild1age);
    if((roomchild1age !== null) && (roomchild1age !== '')){
      console.log("Room 1 Child 1 AGE "+roomchild1age);
      document.getElementById('room1childno1ageval').innerHTML = "";
    }else{
      document.getElementById('room1childno1ageval').innerHTML = "ENTER THE CHILD AGE";
    }
  } else {
    var roomchild1age=document.getElementById('room1childno1ageID').value;
    var roomchild2age=document.getElementById('room1childno2ageID').value;
    if(((roomchild1age !== null) && (roomchild1age !== '')) && ((roomchild2age !== null) && (roomchild2age !== '')))  {
      console.log("Room 1 Child 1 AGE "+roomchild1age);
      console.log("Room 1 Child 2 AGE "+roomchild2age);
      document.getElementById('room1childno1ageval').innerHTML = "";
      document.getElementById('room1childno2ageval').innerHTML = "";
    }else{
      document.getElementById('room1childno1ageval').innerHTML = "ENTER THE CHILD AGE";
      document.getElementById('room1childno2ageval').innerHTML = "ENTER THE CHILD AGE";
    }

  }

  var room2adult= document.getElementById('room2adultnoID').value;
  var  room2child= document.getElementById('room2childno1ID').value;
  console.log("Room 2 ==>"+room2child);
  if (room2child ==1) {
    var room2child1age=document.getElementById('room2childno1ageID').value;
    if((room2child1age !== null) && (room2child1age !== '')){
      console.log("Room 2 Child 1 AGE "+room2child1age);
      document.getElementById('room2childno1ageval').innerHTML = "";
    }else{
      document.getElementById('room2childno1ageval').innerHTML = "ENTER THE CHILD AGE";
    }
  } else {
    var room2child1age=document.getElementById('room2childno1ageID').value;
    var room2child2age=document.getElementById('room2childno2ageID').value;   
    if(((room2child1age !== null) && (room2child1age !== '')) && ((room2child2age !== null) && (room2child2age !== '')))  {
      console.log("Room 2 Child 1 AGE  "+room2child1age);
      console.log("Room 2 Child 2 AGE"+room2child2age);
      document.getElementById('room2childno1ageval').innerHTML = "";
      document.getElementById('room2childno2ageval').innerHTML = "";
    }else{
      document.getElementById('room2childno1ageval').innerHTML = "ENTER THE CHILD AGE";
      document.getElementById('room2childno2ageval').innerHTML = "ENTER THE CHILD AGE";
    }
  }

  var room3adult= document.getElementById('room3adultnoID').value;
  var room3child= document.getElementById('room3childno1ID').value;
  console.log("Room 3 Child no "+room3child);
  if (room3child !=0) {
    if (room3child ==1) {
      var room3child1age=document.getElementById('room3childno1ageID').value;
      if((room3child1age !== null) && (room3child1age !== '')){
        document.getElementById('room3childno1ageval').innerHTML = "";
        console.log("Room 3 Child 1 AGE "+room3child1age);
      }else{
        document.getElementById('room3childno1ageval').innerHTML = "ENTER THE CHILD AGE";
      }
    } else {
      var room3child1age=document.getElementById('room3childno1ageID').value;
      var room3child2age=document.getElementById('room3childno2ageID').value;
      if(((room3child1age !== null) && (room3child1age !== '')) && ((room3child2age !== null) && (room3child2age !== ''))){
        console.log("Room 3 Child 1 AGE "+room3child1age);
        console.log("Room 3 Child 2 AGE "+room3child2age);
        document.getElementById('room3childno1ageval').innerHTML = "";
        document.getElementById('room3childno2ageval').innerHTML = "";
      }else{          
        document.getElementById('room3childno1ageval').innerHTML = "ENTER THE CHILD AGE";
        document.getElementById('room3childno2ageval').innerHTML = "ENTER THE CHILD AGE";
      }
    }
  }
  var Room1Adult = $("#room1adultnoID").val();  
  var Room2Adult = $("#room2adultnoID").val();  
  var Room3Adult = $("#room3adultnoID").val();  
  var room1child = $("#room1childno1ID").val();  
  var room2child = $("#room2childno1ID").val();  
  var room3child = $("#room3childno1ID").val();  
  var Room1child1 = $("#room1childno1ageID").val();  
  var Room1child2 = $("#room1childno2ageID").val();  
  var Room2child1 = $("#room2childno1ageID").val();  
  var Room2child2 = $("#room2childno2ageID").val();  
  var Room3child1 = $("#room3childno1ageID").val();  
  var Room3child2 = $("#room3childno2ageID").val();  
  console.log("Room 1 child 1 AGE==> "+Room1child1+"ROOM 1 child 2 age ==> "+Room1child2+"ROOM 2 Child 1 age ==>"+Room2child1+"ROOM 2 Child 2 age ==>"+Room2child1+"ROOM 2 Child 1 age ==>"+Room3child1+"ROOM 2 Child 2 age ==>"+Room3child2);
  localStorage.setItem('hotel_find_request', JSON.stringify({
    CheckInDate: indate,
    CheckOutDate: outdate,
    NoOfNights: Nonights,
    CityId: cityIdID,
    GuestNationality:hotelcountry_code,
    CountryCode: hotelcountry_code,
    cityName: hotelcityName,
    country_name: hotelcountry_name,
    NoOfRooms: roomsvalue,
    NoOfRoom1Adults: Room1Adult,
    NoOfRoom2Adults: Room2Adult,
    NoOfRoom3Adults: Room3Adult,
    NoOfRoom1Child: room1child,
    NoOfRoom2Child: room2child,
    NoOfRoom3Child: room3child,
    NoOfRoom1child1age: Room1child1,
    NoOfRoom1child2age: Room1child2,
    NoOfRoom2child1age: Room2child1,
    NoOfRoom2child2age: Room2child2,
    NoOfRoom3child1age: Room3child1,
    NoOfRoom3child2age: Room3child2,
  }));
  document.getElementById("search-hotels").reset();
  window.location.href = `hotel-list-view.html?CheckInDate=${indate}&CheckOutDate=${outdate}&NoOfNights=${Nonights}&CityId=${cityIdID}&GuestNationality=${hotelcountry_code}&NoOfRooms=${roomsvalue}&NoOfRoom1Adults=${Room1Adult}&NoOfRoom2Adults=${Room2Adult}&NoOfRoom1Child1=${Room1child1}&NoOfRoom1Child=${room1child}&NoOfRoom2Child=${room2child}&NoOfRoom1Child2=${Room1child2}&NoOfRoom2Child1=${Room2child1}&NoOfRoom2Child2=${Room2child2}&NoOfRoom3Adults=${Room3Adult}&NoOfRoom3Child=${room3child}&NoOfRoom3Child1=${Room3child1}&NoOfRoom3Child2=${Room3child2}`;
}

});


document.getElementById('UBserCityID').classList.remove('hsloading');
let hoteldelay = (() => {
  let hoteltimer = 0;
  return function (callback, ms) {
   clearTimeout(hoteltimer);
   hoteltimer = setTimeout(callback, ms);
 };
})();
jQuery('#UBserCityID').keyup(function () {
 document.getElementById('UBserCityID').classList.add('hsloading');
//             jQuery("#UBserCityID").addClass("hsloading");
var query = jQuery(this).val();
if (query != '') {
 hoteldelay(function () {
  jQuery.ajax({
   url: 'https://demo.liamlifestyleandservices.com/citysearch.php',
   type: 'POST',
   data: {
    query: query
  },
  success: function (data) {
    let response = JSON.parse(data);
    console.log(response);
    console.log(response.Status);
    if (response.Status == 1) {
      let template = '';
      response.hotellist.forEach((item, index) => {
       template += `<li onclick="hotelonListItemSelect('${item.city_name}', '${item.city_code}', '${item.country_code}', '${item.country_name}')" class="list-hover list-group-item list-group-item-action">${item.city_name} ,<strong> ${item.country_name} </strong></li>`;
     });
      document.getElementById('UBserCityID').classList.remove('hsloading');
      console.log(template);
      jQuery('#hotelcistyResid').fadeIn(1000);
      jQuery('#hotelcistyResid').html(template);
    } else {
      let template = '';
      document.getElementById('UBserCityID').classList.remove('hsloading');
      template += `<li class="list-hover list-group-item list-group-item-action"> No Record Found <strong> </strong></li>`;
      console.log(template);
      document.getElementById('UBserCityID').value='';      
      jQuery('#hotelcistyResid').html(template);
    }
  }
});
}, 2000);
} else {
 jQuery('#hotelcistyResid').fadeOut();
 jQuery('#hotelcistyResid').html("");
}

}); 
