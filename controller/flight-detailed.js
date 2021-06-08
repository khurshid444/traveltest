$(document).ready(function() {
    var dispresult = '';
    flighCardsList = '';
    travelCards = '';
    AdultCards = '';
    journeyCard = '';
    var airpath = 'http://demo.liamlifestyleandservices.com/images/airlinelogo/'

// khursid changed here 

    function timeConvert(hourstime) {
        var num = hourstime;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + "h " + rminutes + "m";
    }

    let request_query = getUrlVars();
    //console.log(request_query);                            
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            vars[key] = value;
        });
        return vars;
    }
    var tabinput = request_query.resultToken;

    if (request_query.JourneyType === 'Return') {

        console.log("One : ", request_query.tokenOne);
        console.log("Two : ", request_query.tokenTwo);

        async.parallel([
            function(callback) {
                $.ajax({
                    url: 'http://test.services.travelomatix.com/webservices/index.php/flight/service/UpdateFareQuote',
                    headers: {
                        'x-Username': 'test253477',
                        'x-DomainKey': 'TMX8012531575436219',
                        'x-system': 'test',
                        'x-Password': 'test@253'
                    },
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        "ResultToken": request_query.tokenOne
                    }),

                    success: function(result) {
                        console.log(result);

                        if (result.Status == 1) {
                            console.log("Result of token one : ");
                        } else {
                            console.log("");
                        }

                        callback(null, result);
                    },
                    error: function(error) {
                        console.log("Error", error);
                        callback(error, null)
                    }
                });    
            },
            function(callback) {

                $.ajax({
                    url: 'http://test.services.travelomatix.com/webservices/index.php/flight/service/UpdateFareQuote',
                    headers: {
                        'x-Username': 'test253477',
                        'x-DomainKey': 'TMX8012531575436219',
                        'x-system': 'test',
                        'x-Password': 'test@253'
                    },
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        "ResultToken": request_query.tokenTwo
                    }),

                    success: function(result) {
                        console.log(result);

                        if (result.Status == 1) {
                            console.log("Result of token two : ");
                        } else {
                            console.log("");
                        }

                        callback(null, result);
                    },
                    error: function(error) {
                        console.log("Error", error);
                        callback(error, null)
                    }
                });
                
            }
        ],

        // optional callback
        function(err, results) {
            if (err) {
                alert(err)
            } else {
                alert('API called finish');
                document.getElementById('flightJourney').innerText = JSON.stringify(results);
            }
        });
        
    } else if (request_query.JourneyType === 'International') {

        $.ajax({
            url: 'http://test.services.travelomatix.com/webservices/index.php/flight/service/UpdateFareQuote',
            headers: {
                'x-Username': 'test253477',
                'x-DomainKey': 'TMX8012531575436219',
                'x-system': 'test',
                'x-Password': 'test@253'
            },
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                "ResultToken": request_query.resultToken
            }),

            success: function(result) {
                if (result.Status == 1) {
                    alert('International Booking Two Way'+ JSON.stringify(result));
                    document.getElementById('flightJourney').innerText = JSON.stringify(result);
                } else {
                    alert(result.Message + '  Token  ' +request_query.tokenOne);
                }
            },
            error: function(error) {
                alert(error)
            }
        });

    } else {
        $.ajax({
            url: 'http://test.services.travelomatix.com/webservices/index.php/flight/service/UpdateFareQuote',
            headers: {
                'x-Username': 'test253477',
                'x-DomainKey': 'TMX8012531575436219',
                'x-system': 'test',
                'x-Password': 'test@253'
            },
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                "ResultToken": tabinput
            }),
            success: function(result) {
                console.log(result);
                if (result.Status == 1) {
                    
                    // var flightdetailed = {
                    //     "Status": 1,
                    //     "Message": "",
                    //     "UpdateFareQuote": {
                    //         "FareQuoteDetails": {
                    //             "JourneyList": {
                    //                 "FlightDetails": {
                    //                     "Details": [
                    //                         [{
                    //                             "Origin": {
                    //                                 "AirportCode": "BLR",
                    //                                 "CityName": "Bangalore",
                    //                                 "AirportName": "Bangalore",
                    //                                 "DateTime": "2020-09-16 20:45:00"
                    //                             },
                    //                             "Destination": {
                    //                                 "AirportCode": "DEL",
                    //                                 "CityName": "Delhi",
                    //                                 "AirportName": "Delhi",
                    //                                 "DateTime": "2020-09-16 23:35:00"
                    //                             },
                    //                             "OperatorCode": "SG",
                    //                             "DisplayOperatorCode": "",
                    //                             "OperatorName": "SpiceJet",
                    //                             "FlightNumber": "198",
                    //                             "CabinClass": "U",
                    //                             "Operatedby": "",
                    //                             "equipment": "",
                    //                             "Duration": 170,
                    //                             "Attr": {
                    //                                 "Baggage": "15 KG",
                    //                                 "CabinBaggage": "7 KG"
                    //                             }
                    //                         }]
                    //                     ]
                    //                 },
                    //                 "Price": {
                    //                     "Currency": "INR",
                    //                     "TotalDisplayFare": 23735.62,
                    //                     "PriceBreakup": {
                    //                         "BasicFare": 17185,
                    //                         "Tax": 6550.62,
                    //                         "AgentCommission": 933.58,
                    //                         "AgentTdsOnCommision": 46.679
                    //                     },
                    //                     "PassengerBreakup": {
                    //                         "ADT": {
                    //                             "BasePrice": 10504,
                    //                             "Tax": 4318.068,
                    //                             "TotalPrice": 14822.068,
                    //                             "PassengerCount": 4
                    //                         },
                    //                         "CHD": {
                    //                             "BasePrice": 5252,
                    //                             "Tax": 2159.034,
                    //                             "TotalPrice": 7411.034,
                    //                             "PassengerCount": 2
                    //                         },
                    //                         "INF": {
                    //                             "BasePrice": 1429,
                    //                             "Tax": 73.517,
                    //                             "TotalPrice": 1502.517,
                    //                             "PassengerCount": 0
                    //                         }
                    //                     }
                    //                 },
                    //                 "ResultToken": "aae79cb8b5fe9872d10c90bf1156d529*_*17*_*yMx7gDxVibWgJ894",
                    //                 "Attr": {
                    //                     "IsRefundable": true,
                    //                     "AirlineRemark": "#- API Fare.",
                    //                     "IsLCC": true
                    //                 },
                    //                 "HoldTicket": false
                    //             }
                    //         }
                    //     }
                    // }             
                    // console.log(flightdetailed);
                    console.log(result);

                    // var dispresult = flightdetailed; 
                    var dispresult = result;



                    let createTravellAdultFroms = function(title, initial, id, c) {
                        // return `
                        //     <div class="form-group row">
                        //         <div class="col-xs-2 col-sm-2 col-md-2">
                        //             <h2>${title} ${c}</h2>
                        //         </div>
                        //         <div class="col-xs-2 col-sm-2 col-md-2">
                        //             <select name="Adultsalutation" id="pasenger_salutation${initial}${id}" class="form-control" style="opacity: 1" required />
                        //                 <option value="Mr">Mr</option>
                        //                 <option value="Ms">Ms</option>
                        //                 <option value="Mrs">Mrs</option>
                        //             </select>
                        //         </div>
                        //         <div class="col-xs-5 col-sm-4 col-md-4">
                        //             <input type="text" name="firstname" id="firstName${initial}${id}" placeholder="First Name" class="form-control" required />
                        //         </div>
                        //         <div class="col-xs-5 col-sm-4 col-md-4">
                        //             <input type="text" name="lastname" id="lastName${initial}${id}" class="form-control" value="" placeholder="Last Name" required />
                        //         </div>
                        //     </div>
                        // `;
                        return `
                            <div class="passinput">
                                <div class="form-group row">
                                    <div class="col-sm-3 col-md-3 no-padding">
                                        <div class="adltnom">${title} ${c}<sup class="text-danger">*</sup></div>
                                    </div>
                                    <div class="col-sm-2 col-md-3 no-padding">
                                        <select name="salutation${initial}${id}" id="pasenger_salutation${initial}${id}" class="form-control" style="opacity: 1" required />
                                        <option value="Mr">Mr</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Miss">Miss</option>
                                        <option value="Mstr">Mstr</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-4 col-md-3">
                                        <input type="text" class="form-control full-width" name="${initial}FirstName${id}" id="firstName${initial}${id}" value="" placeholder="First Name" required />
                                    </div>
                                    <div class="col-sm-3 col-md-3">
                                        <input type="text" class="form-control full-width" name="${initial}lastName${id}" id="lastName${initial}${id}" value="" placeholder="Last Name" required />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-2 col-md-2"></div>
                                    <div class="col-sm-5 col-md-4">
                                        <div class="">
                                            <input type='text' class="form-control inputdate" name="${initial}dob${id}" id="dob${initial}${id}" placeholder="D.O.B" required />
                                        </div>
                                    </div>
                                    <div class="col-sm-5 col-md-4">
                                        <label> Gender : </label>
                                        <input type="radio" id="${title}male${id}" name="${initial}PaxGender${id}" value="1" checked>
                                        <label class="radio-inline" for="male">Male</label>
                                        <input type="radio" id="${title}female${id}" name="${initial}PaxGender${id}" value="2">
                                        <label class="radio-inline" for="female">Female</label>
                                    </div>
                                </div>
                            </div>
                        `;
                    }



                    let createAdultTravellFrom = function(title, initial, id) {
                        // console.log(title, initial, id);

                        // $('.addmore').on('click', function() {
                        //     $(".mytemplate").clone().removeClass("mytemplate").show().appendTo(".dates");
                        // });
                        // $(document).on("focus", ".datepicker", function() {
                        //     $(this).datepicker();
                        // });

                        // console.log(result.UpdateFareQuote.FareQuoteDetails.JourneyList.FlightDetails.Details[0].length);

                        let rettemp = `
                            <div class="passinput">
                                <div class="form-group row">
                                    <div class="col-sm-6 col-md-2">
                                        <div class="adltnom">${title} ${id}<sup class="text-danger">*</sup></div>
                                    </div>
                                    <div class="col-sm-6 col-md-3">
                                        <input type="text" class="form-control full-width" name="${initial}Name[]" id="firstName${initial}${id}" value="" placeholder="First Name" required />
                                    </div>
                                    <div class="col-sm-6 col-md-3">
                                        <input type="text" class="form-control full-width" name="${initial}Name[]" id="lastName${initial}${id}" value="" placeholder="Last Name" required />
                                    </div>
                                    <div class="col-sm-6 col-md-3">
                                        <div class="form-group">
                                            <div class='input-group date'>
                                                <input type='text' class="form-control inputdate" name="${initial}Name[]" id='${initial}${id}' placeholder="D.O.B" required />
                                                <span class="input-group-addon">
                                                    <span class="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;

                        let singaltemp = `
                            <div class="passinput">
                                <div class="form-group row">
                                    <div class="col-sm-3 col-md-3 no-padding">
                                        <div class="adltnom">${title} ${id}<sup class="text-danger">*</sup></div>
                                    </div>
                                    <div class="col-sm-2 col-md-3 no-padding">
                                        <select name="salutation${initial}${id}" id="pasenger_salutation${initial}${id}" class="form-control" style="opacity: 1" required />
                                            <option value="">Select</option>
                                            <option value="Mr">Mr</option>
                                            <option value="Ms">Ms</option>
                                            <option value="Mrs">Mrs</option>
                                            <option value="Miss">Miss</option>
                                            <option value="Mstr">Mstr</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-4 col-md-3">
                                        <input type="text" class="form-control full-width" name="${initial}FirstName${id}" id="firstName${initial}${id}" value="" placeholder="First Name" required />
                                    </div>
                                    <div class="col-sm-3 col-md-3">
                                        <input type="text" class="form-control full-width" name="${initial}lastName${id}" id="lastName${initial}${id}" value="" placeholder="Last Name" required />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-2 col-md-2"></div>
                                    <div class="col-sm-5 col-md-4">
                                        <div class="">
                                            <input type='text' class="form-control inputdate" name="${initial}dob${id}" id="dob${initial}${id}" placeholder="D.O.B" required />
                                        </div>
                                    </div>
                                    <div class="col-sm-5 col-md-4">
                                        <label> Gender : </label>
                                        <input type="radio" id="${title}male${id}" name="${initial}PaxGender${id}" value="1" checked>
                                        <label class="radio-inline" for="male">Male</label>
                                        <input type="radio" id="${title}female${id}" name="${initial}PaxGender${id}" value="2">
                                        <label class="radio-inline" for="female">Female</label>
                                    </div>
                                </div>
                            </div>
                        `;

                        if (dispresult.UpdateFareQuote.FareQuoteDetails.JourneyList.FlightDetails.Details[0].length == 1) {
                            return singaltemp
                        } else {
                            return rettemp
                        }
                    }

                    let createTravellFrom = function(traveldetails) {
                        console.log(traveldetails)
                        if (traveldetails.ADT.PassengerCount > 1) {
                            console.log(traveldetails.ADT.PassengerCount);
                            let formContainer = document.getElementById('Adult-Details');
                            
                            // for (let i = 1; i < (traveldetails.ADT.PassengerCount - 1); i++) {
                                // for (let i = 0; i < (traveldetails.ADT.PassengerCount); i++) {
                                    // formContainer.innerHTML += createAdultTravellFrom('Adult Details', 'Adult', i);
                                    for (let i = 0, count = 1; i < (traveldetails.ADT.PassengerCount - 1); i++, count++) {
                                        // formContainer.innerHTML += createAdultTravellFroms('Adult Details', 'Adult', i,count);
                                        formContainer.innerHTML += createTravellAdultFroms('Adult Details', 'Adult', i, count);
                                    }
                                // }
                            // }
                        }
                        if (traveldetails.CHD) {
                            if (traveldetails.CHD.PassengerCount > 0) {
                                console.log(traveldetails.CHD.PassengerCount);
                                let formContainer = document.getElementById('Child-Details');
                                for (let i = 0; i < (traveldetails.CHD.PassengerCount); i++) {
                                    formContainer.innerHTML += createAdultTravellFrom('Child Details', 'Child', i);
                                }
                            }
                        }
                        if (traveldetails.INF) {
                            if (traveldetails.INF.PassengerCount > 0) {
                                console.log(traveldetails.INF.PassengerCount);
                                let formContainer = document.getElementById('Infant-Details');
                                for (let i = 0; i < (traveldetails.INF.PassengerCount); i++) {
                                    formContainer.innerHTML += createAdultTravellFrom('Infant Details', 'Infant', i);
                                }
                            }
                        }
                    }

                    let createTraveldetails = function(alldatas) {
                        console.log(alldatas.PassengerBreakup.ADT);
                        console.log(alldatas.PassengerBreakup.CHD);
                        console.log(alldatas.PassengerBreakup.INF);
                        var template = '';
                        if (alldatas.PassengerBreakup.ADT && alldatas.PassengerBreakup.CHD && alldatas.PassengerBreakup.INF) {
                            console.log("Adult CHD INF ");
                            template = `<div class="insiefare">
                            <div class="farehd arimobold">Fare Summary</div>
                            <div class="fredivs">
                                <div class="kindrest">
                                    <div class="freshd">Base Fare</div>
                                    <div class="reptallt">
                                        <div class="col-xs-8 nopadding">
                                            <div class="faresty">${alldatas.PassengerBreakup.ADT.PassengerCount} ADT(s) &lrm;(1 X ${alldatas.PassengerBreakup.ADT.BasePrice})</div>
                                        </div>
                                        <div class="col-xs-4 nopadding">
                                            <div class="amnter">Rs ${alldatas.PassengerBreakup.ADT.PassengerCount*alldatas.PassengerBreakup.ADT.BasePrice}</div>
                                        </div>
                                    </div>
                                    <div class="reptallt">
                                        <div class="col-xs-8 nopadding">
                                            <div class="faresty">${alldatas.PassengerBreakup.CHD.PassengerCount} CHD(s) &lrm;(1 X ${alldatas.PassengerBreakup.CHD.BasePrice})</div>
                                        </div>
                                        <div class="col-xs-4 nopadding">
                                            <div class="amnter">Rs ${alldatas.PassengerBreakup.CHD.PassengerCount*alldatas.PassengerBreakup.CHD.BasePrice}</div>
                                        </div>
                                    </div>
                                    <div class="reptallt">
                                        <div class="col-xs-8 nopadding">
                                            <div class="faresty">${alldatas.PassengerBreakup.INF.PassengerCount} INF(s) &lrm;(1 X ${alldatas.PassengerBreakup.INF.BasePrice})</div>
                                        </div>
                                        <div class="col-xs-4 nopadding">
                                            <div class="amnter">Rs ${alldatas.PassengerBreakup.INF.PassengerCount*alldatas.PassengerBreakup.INF.BasePrice}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="kindrest">
                                    <div class="freshd">Taxes</div>
                                    <div class="reptallt">
                                        <div class="col-xs-8 nopadding">
                                            <div class="faresty">Taxes &amp; Fees</div>
                                        </div>
                                        <div class="col-xs-4 nopadding">
                                            <div class="amnter arimobold">Rs ${alldatas.PriceBreakup.Tax} </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="reptalltftr">
                                    <div class="col-xs-6 nopadding">
                                        <div class="farestybig">Grand Total</div>
                                    </div>
                                    <div class="col-xs-6 nopadding ">
                                        <div class="amnterbig arimobold grandtotal">Rs ${alldatas.TotalDisplayFare} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="insiefare">
                            <div class="farehd arimobold">Fare Summary</div>
                            <div class="fredivs">
                                <div class="kindrest">
                                    <div class="freshd">Base Fare</div>
                                    <div class="reptallt">
                                        <div class="col-xs-8 nopadding">
                                            <div class="faresty">${alldatas.PassengerBreakup.ADT.PassengerCount} ADT(s) &lrm;(1 X ${alldatas.PassengerBreakup.ADT.BasePrice})</div>
                                        </div>
                                        <div class="col-xs-4 nopadding">
                                            <div class="amnter">Rs ${alldatas.PassengerBreakup.ADT.PassengerCount*alldatas.PassengerBreakup.ADT.BasePrice}</div>
                                        </div>
                                    </div>
                                    <div class="reptallt">
                                        <div class="col-xs-8 nopadding">
                                            <div class="faresty">${alldatas.PassengerBreakup.CHD.PassengerCount} CHD(s) &lrm;(1 X ${alldatas.PassengerBreakup.CHD.BasePrice})</div>
                                        </div>
                                        <div class="col-xs-4 nopadding">
                                            <div class="amnter">Rs ${alldatas.PassengerBreakup.CHD.PassengerCount*alldatas.PassengerBreakup.CHD.BasePrice}</div>
                                        </div>
                                    </div>
                                    <div class="reptallt">
                                        <div class="col-xs-8 nopadding">
                                            <div class="faresty">${alldatas.PassengerBreakup.INF.PassengerCount} INF(s) &lrm;(1 X ${alldatas.PassengerBreakup.INF.BasePrice})</div>
                                        </div>
                                        <div class="col-xs-4 nopadding">
                                            <div class="amnter">Rs ${alldatas.PassengerBreakup.INF.PassengerCount*alldatas.PassengerBreakup.INF.BasePrice}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="kindrest">
                                    <div class="freshd">Taxes</div>
                                    <div class="reptallt">
                                        <div class="col-xs-8 nopadding">
                                            <div class="faresty">Taxes &amp; Fees</div>
                                        </div>
                                        <div class="col-xs-4 nopadding">
                                            <div class="amnter arimobold">Rs ${alldatas.PriceBreakup.Tax} </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="reptalltftr">
                                    <div class="col-xs-6 nopadding">
                                        <div class="farestybig">Grand Total</div>
                                    </div>
                                    <div class="col-xs-6 nopadding ">
                                        <div class="amnterbig arimobold grandtotal">Rs ${alldatas.TotalDisplayFare} </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

                        } else if (alldatas.PassengerBreakup.CHD.PassengerCount > 0) {
                            console.log("Child IF");
                            template = `<div class="insiefare">
                            <div class="farehd arimobold">Fare Summary</div>
                            <div class="fredivs">
                                <div class="kindrest">
                                    <div class="freshd">Base Fare</div>
                                    <div class="reptallt">
                                        <div class="col-xs-8 nopadding">
                                            <div class="faresty">${alldatas.PassengerBreakup.ADT.PassengerCount} ADT(s) &lrm;(1 X ${alldatas.PassengerBreakup.ADT.BasePrice})</div>
                                        </div>
                                        <div class="col-xs-4 nopadding">
                                            <div class="amnter">Rs ${alldatas.PassengerBreakup.ADT.PassengerCount*alldatas.PassengerBreakup.ADT.BasePrice}</div>
                                        </div>
                                    </div>
                                    <div class="reptallt">
                                        <div class="col-xs-8 nopadding">
                                            <div class="faresty">${alldatas.PassengerBreakup.CHD.PassengerCount} CHD(s) &lrm;(1 X ${alldatas.PassengerBreakup.CHD.BasePrice})</div>
                                        </div>
                                        <div class="col-xs-4 nopadding">
                                            <div class="amnter">Rs ${alldatas.PassengerBreakup.CHD.PassengerCount*alldatas.PassengerBreakup.CHD.BasePrice}</div>
                                        </div>
                                    </div>
                                    <div class="kindrest">
                                        <div class="freshd">Taxes</div>
                                        <div class="reptallt">
                                            <div class="col-xs-8 nopadding">
                                                <div class="faresty">Taxes &amp; Fees</div>
                                            </div>
                                            <div class="col-xs-4 nopadding">
                                                <div class="amnter arimobold">Rs 2622.83 </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="reptalltftr">
                                        <div class="col-xs-6 nopadding">
                                            <div class="farestybig">Grand Total</div>
                                        </div>
                                        <div class="col-xs-6 nopadding ">
                                            <div class="amnterbig arimobold grandtotal">Rs 19,523.62 </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            console.log("Infant IF");
                            template = `<div class="insiefare">
                            <div class="farehd arimobold">Fare Summary</div>
                            <div class="fredivs">
                                <div class="kindrest">
                                    <div class="freshd">Base Fare</div>
                                    <div class="reptallt">
                                        <div class="col-xs-8 nopadding">
                                            <div class="faresty">${alldatas.PassengerBreakup.ADT.PassengerCount} ADT(s) &lrm;(1 X ${alldatas.PassengerBreakup.ADT.BasePrice})</div>
                                        </div>
                                        <div class="col-xs-4 nopadding">
                                            <div class="amnter">Rs ${alldatas.PassengerBreakup.ADT.PassengerCount*alldatas.PassengerBreakup.ADT.BasePrice}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="kindrest">
                                    <div class="freshd">Taxes</div>
                                    <div class="reptallt">
                                        <div class="col-xs-8 nopadding">
                                            <div class="faresty">Taxes &amp; Fees</div>
                                        </div>
                                        <div class="col-xs-4 nopadding">
                                            <div class="amnter arimobold">Rs 2622.83 </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="reptalltftr">
                                    <div class="col-xs-6 nopadding">
                                        <div class="farestybig">Grand Total</div>
                                    </div>
                                    <div class="col-xs-6 nopadding ">
                                        <div class="amnterbig arimobold grandtotal">Rs 19,523.62 </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                        }
                        return template;
                    }
                    /* 
                    $(function() {
                        $('#Useronedate').datetimepicker({
                            minDate: new Date(),
                            format: 'DD/MM/YYYY',
                            format: 'L',
                        });
                    });*/

                    let createTravellAdultFrom = function(alldatas, airpath) {
                        let origintime0 = alldatas.FlightDetails.Details[0][0].Origin.DateTime;
                        let destinationtime0 = alldatas.FlightDetails.Details[0][0].Destination.DateTime;
                        var oDate0 = origintime0.slice(0, -9);
                        var oTime0 = origintime0.slice(10, -3);
                        var dDate0 = destinationtime0.slice(0, -9);
                        var dTime0 = destinationtime0.slice(10, -3);
                        let hourstime = alldatas.FlightDetails.Details[0][0].Duration;
                        let showtume = timeConvert(hourstime);
                        var template = `
                        <div class="allboxflt">
                            <div class="col-xs-3 nopadding width_adjst">
                                <div class="jetimg"><img alt="I5" src="${airpath}${alldatas.FlightDetails.Details[0][0].OperatorCode}.gif"></div>
                                <div class="alldiscrpo">${alldatas.FlightDetails.Details[0][0].OperatorName}<span class="sgsmal">${alldatas.FlightDetails.Details[0][0].OperatorCode} ${alldatas.FlightDetails.Details[0][0].FlightNumber}</span>
                                </div>
                            </div>
                            <div class="col-xs-7 nopadding width_adjst">
                                <div class="col-xs-6"><span class="airlblxl">${oDate0}, ${oTime0}</span><span class="portnme">${alldatas.FlightDetails.Details[0][0].Origin.AirportName} (${alldatas.FlightDetails.Details[0][0].Origin.AirportCode})</span></div>
                                <div class="col-xs-6"><span class="airlblxl">${dDate0}, ${dTime0}</span><span class="portnme">${alldatas.FlightDetails.Details[0][0].Destination.AirportName} (${alldatas.FlightDetails.Details[0][0].Destination.AirportCode})</span></div>
                            </div>
                            <div class="col-xs-2 nopadding width_adjst"><span class="portnme textcntr">${showtume} </span><span class="portnme textcntr"></span></div>
                        </div>
                        <div class="travlrs">Travellers: <span class="fa fa-male"></span> 1 | <span class="fa fa-child"></span> 0 | <span class="infantbay"><img src="/extras/system/template_list/template_v3/images/infant.png" alt=""></span> 0</div>`;
                        return template;
                    }

                    let JourneyDetails = function(alldatas) {
                        console.log(alldatas);
                        let showtume = timeConvert(alldatas.Duration);
                        
                        // let  template =`
                        // <h4 class="box-title">${alldatas.Origin.AirportName} to ${alldatas.Destination.AirportName}<small>Oneway flight</small></h4>
                        // <div class="table-wrapper flights">
                        //     <div class="table-row first-flight">
                        //         <div class="table-cell logo">
                        //             <img src="${airpath}${alldatas.OperatorCode}.gif" alt="">
                        //             <label>${alldatas.OperatorCode}-${alldatas.FlightNumber}</label>
                        //         </div>
                        //         <div class="table-cell timing-detail">
                        //             <div class="timing">
                        //                 <div class="check-in">
                        //                     <label>Take off</label>
                        //                     <span>${alldatas.Origin.DateTime}</span>
                        //                 </div>
                        //                 <div class="duration text-center">
                        //                     <i class="soap-icon-clock"></i>
                        //                     <span>${showtume}</span>
                        //                 </div>
                        //                 <div class="check-out">
                        //                     <label>landing</label>
                        //                     <span>${alldatas.Destination.DateTime}</span>
                        //                 </div>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div>
                        // `; 
                        // return template


                        let template = `
                        <div class="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <h4 class="box-title">${alldatas.Origin.AirportName} to ${alldatas.Destination.AirportName}</h4>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <h4 class="box-title">Oneway flight</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4 col-md-4">
                                <div class="">
                                    <img class="img-responsive" src="${airpath}${alldatas.OperatorCode}.gif" alt="">
                                    <label>${alldatas.OperatorCode}-${alldatas.FlightNumber}</label>
                                </div>
                            </div>
                            <div class="col-sm-8  col-md-8">
                                <div class="timing">
                                    <div class="check-in">
                                        <label>Take off</label>
                                        <span>${alldatas.Origin.DateTime}</span>
                                    </div>
                                    <div class="duration text-center">
                                        <i class="soap-icon-clock"></i>
                                        <span>${showtume}</span>
                                    </div>
                                    <div class="check-out">
                                        <label>landing</label>
                                        <span>${alldatas.Destination.DateTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        return template
                    }

                    journeyCard += JourneyDetails(dispresult.UpdateFareQuote.FareQuoteDetails.JourneyList.FlightDetails.Details[0][0]);
                    travelCards += createTraveldetails(dispresult.UpdateFareQuote.FareQuoteDetails.JourneyList.Price);
                    // travelCards += createTraveldetails(dispresult.UpdateFareQuote.FareQuoteDetails.JourneyList.Price);
                    createTravellFrom(dispresult.UpdateFareQuote.FareQuoteDetails.JourneyList.Price.PassengerBreakup);
                    document.getElementById('other-details-ID').innerHTML = travelCards;
                    document.getElementById('flightJourney').innerHTML = journeyCard;
                }
            },
            error: function(error) {}
        });
    }

});



var isoCountries = [{
    "name": "Afghanistan",
    "code": "AF"
}, {
    "name": "land Islands",
    "code": "AX"
}, {
    "name": "Albania",
    "code": "AL"
}, {
    "name": "Algeria",
    "code": "DZ"
}, {
    "name": "American Samoa",
    "code": "AS"
}, {
    "name": "AndorrA",
    "code": "AD"
}, {
    "name": "Angola",
    "code": "AO"
}, {
    "name": "Anguilla",
    "code": "AI"
}, {
    "name": "Antarctica",
    "code": "AQ"
}, {
    "name": "Antigua and Barbuda",
    "code": "AG"
}, {
    "name": "Argentina",
    "code": "AR"
}, {
    "name": "Armenia",
    "code": "AM"
}, {
    "name": "Aruba",
    "code": "AW"
}, {
    "name": "Australia",
    "code": "AU"
}, {
    "name": "Austria",
    "code": "AT"
}, {
    "name": "Azerbaijan",
    "code": "AZ"
}, {
    "name": "Bahamas",
    "code": "BS"
}, {
    "name": "Bahrain",
    "code": "BH"
}, {
    "name": "Bangladesh",
    "code": "BD"
}, {
    "name": "Barbados",
    "code": "BB"
}, {
    "name": "Belarus",
    "code": "BY"
}, {
    "name": "Belgium",
    "code": "BE"
}, {
    "name": "Belize",
    "code": "BZ"
}, {
    "name": "Benin",
    "code": "BJ"
}, {
    "name": "Bermuda",
    "code": "BM"
}, {
    "name": "Bhutan",
    "code": "BT"
}, {
    "name": "Bolivia",
    "code": "BO"
}, {
    "name": "Bosnia and Herzegovina",
    "code": "BA"
}, {
    "name": "Botswana",
    "code": "BW"
}, {
    "name": "Bouvet Island",
    "code": "BV"
}, {
    "name": "Brazil",
    "code": "BR"
}, {
    "name": "British Indian Ocean Territory",
    "code": "IO"
}, {
    "name": "Brunei Darussalam",
    "code": "BN"
}, {
    "name": "Bulgaria",
    "code": "BG"
}, {
    "name": "Burkina Faso",
    "code": "BF"
}, {
    "name": "Burundi",
    "code": "BI"
}, {
    "name": "Cambodia",
    "code": "KH"
}, {
    "name": "Cameroon",
    "code": "CM"
}, {
    "name": "Canada",
    "code": "CA"
}, {
    "name": "Cape Verde",
    "code": "CV"
}, {
    "name": "Cayman Islands",
    "code": "KY"
}, {
    "name": "Central African Republic",
    "code": "CF"
}, {
    "name": "Chad",
    "code": "TD"
}, {
    "name": "Chile",
    "code": "CL"
}, {
    "name": "China",
    "code": "CN"
}, {
    "name": "Christmas Island",
    "code": "CX"
}, {
    "name": "Cocos (Keeling) Islands",
    "code": "CC"
}, {
    "name": "Colombia",
    "code": "CO"
}, {
    "name": "Comoros",
    "code": "KM"
}, {
    "name": "Congo",
    "code": "CG"
}, {
    "name": "Congo, The Democratic Republic of the",
    "code": "CD"
}, {
    "name": "Cook Islands",
    "code": "CK"
}, {
    "name": "Costa Rica",
    "code": "CR"
}, {
    "name": "Cote D'Ivoire",
    "code": "CI"
}, {
    "name": "Croatia",
    "code": "HR"
}, {
    "name": "Cuba",
    "code": "CU"
}, {
    "name": "Cyprus",
    "code": "CY"
}, {
    "name": "Czech Republic",
    "code": "CZ"
}, {
    "name": "Denmark",
    "code": "DK"
}, {
    "name": "Djibouti",
    "code": "DJ"
}, {
    "name": "Dominica",
    "code": "DM"
}, {
    "name": "Dominican Republic",
    "code": "DO"
}, {
    "name": "Ecuador",
    "code": "EC"
}, {
    "name": "Egypt",
    "code": "EG"
}, {
    "name": "El Salvador",
    "code": "SV"
}, {
    "name": "Equatorial Guinea",
    "code": "GQ"
}, {
    "name": "Eritrea",
    "code": "ER"
}, {
    "name": "Estonia",
    "code": "EE"
}, {
    "name": "Ethiopia",
    "code": "ET"
}, {
    "name": "Falkland Islands (Malvinas)",
    "code": "FK"
}, {
    "name": "Faroe Islands",
    "code": "FO"
}, {
    "name": "Fiji",
    "code": "FJ"
}, {
    "name": "Finland",
    "code": "FI"
}, {
    "name": "France",
    "code": "FR"
}, {
    "name": "French Guiana",
    "code": "GF"
}, {
    "name": "French Polynesia",
    "code": "PF"
}, {
    "name": "French Southern Territories",
    "code": "TF"
}, {
    "name": "Gabon",
    "code": "GA"
}, {
    "name": "Gambia",
    "code": "GM"
}, {
    "name": "Georgia",
    "code": "GE"
}, {
    "name": "Germany",
    "code": "DE"
}, {
    "name": "Ghana",
    "code": "GH"
}, {
    "name": "Gibraltar",
    "code": "GI"
}, {
    "name": "Greece",
    "code": "GR"
}, {
    "name": "Greenland",
    "code": "GL"
}, {
    "name": "Grenada",
    "code": "GD"
}, {
    "name": "Guadeloupe",
    "code": "GP"
}, {
    "name": "Guam",
    "code": "GU"
}, {
    "name": "Guatemala",
    "code": "GT"
}, {
    "name": "Guernsey",
    "code": "GG"
}, {
    "name": "Guinea",
    "code": "GN"
}, {
    "name": "Guinea-Bissau",
    "code": "GW"
}, {
    "name": "Guyana",
    "code": "GY"
}, {
    "name": "Haiti",
    "code": "HT"
}, {
    "name": "Heard Island and Mcdonald Islands",
    "code": "HM"
}, {
    "name": "Holy See (Vatican City State)",
    "code": "VA"
}, {
    "name": "Honduras",
    "code": "HN"
}, {
    "name": "Hong Kong",
    "code": "HK"
}, {
    "name": "Hungary",
    "code": "HU"
}, {
    "name": "Iceland",
    "code": "IS"
}, {
    "name": "India",
    "code": "IN"
}, {
    "name": "Indonesia",
    "code": "ID"
}, {
    "name": "Iran, Islamic Republic Of",
    "code": "IR"
}, {
    "name": "Iraq",
    "code": "IQ"
}, {
    "name": "Ireland",
    "code": "IE"
}, {
    "name": "Isle of Man",
    "code": "IM"
}, {
    "name": "Israel",
    "code": "IL"
}, {
    "name": "Italy",
    "code": "IT"
}, {
    "name": "Jamaica",
    "code": "JM"
}, {
    "name": "Japan",
    "code": "JP"
}, {
    "name": "Jersey",
    "code": "JE"
}, {
    "name": "Jordan",
    "code": "JO"
}, {
    "name": "Kazakhstan",
    "code": "KZ"
}, {
    "name": "Kenya",
    "code": "KE"
}, {
    "name": "Kiribati",
    "code": "KI"
}, {
    "name": "Korea, Democratic People'S Republic of",
    "code": "KP"
}, {
    "name": "Korea, Republic of",
    "code": "KR"
}, {
    "name": "Kuwait",
    "code": "KW"
}, {
    "name": "Kyrgyzstan",
    "code": "KG"
}, {
    "name": "Lao PeopleS Democratic Republic",
    "code": "LA"
}, {
    "name": "Latvia",
    "code": "LV"
}, {
    "name": "Lebanon",
    "code": "LB"
}, {
    "name": "Lesotho",
    "code": "LS"
}, {
    "name": "Liberia",
    "code": "LR"
}, {
    "name": "Libyan Arab Jamahiriya",
    "code": "LY"
}, {
    "name": "Liechtenstein",
    "code": "LI"
}, {
    "name": "Lithuania",
    "code": "LT"
}, {
    "name": "Luxembourg",
    "code": "LU"
}, {
    "name": "Macao",
    "code": "MO"
}, {
    "name": "Macedonia, The Former Yugoslav Republic of",
    "code": "MK"
}, {
    "name": "Madagascar",
    "code": "MG"
}, {
    "name": "Malawi",
    "code": "MW"
}, {
    "name": "Malaysia",
    "code": "MY"
}, {
    "name": "Maldives",
    "code": "MV"
}, {
    "name": "Mali",
    "code": "ML"
}, {
    "name": "Malta",
    "code": "MT"
}, {
    "name": "Marshall Islands",
    "code": "MH"
}, {
    "name": "Martinique",
    "code": "MQ"
}, {
    "name": "Mauritania",
    "code": "MR"
}, {
    "name": "Mauritius",
    "code": "MU"
}, {
    "name": "Mayotte",
    "code": "YT"
}, {
    "name": "Mexico",
    "code": "MX"
}, {
    "name": "Micronesia, Federated States of",
    "code": "FM"
}, {
    "name": "Moldova, Republic of",
    "code": "MD"
}, {
    "name": "Monaco",
    "code": "MC"
}, {
    "name": "Mongolia",
    "code": "MN"
}, {
    "name": "Montenegro",
    "code": "ME"
}, {
    "name": "Montserrat",
    "code": "MS"
}, {
    "name": "Morocco",
    "code": "MA"
}, {
    "name": "Mozambique",
    "code": "MZ"
}, {
    "name": "Myanmar",
    "code": "MM"
}, {
    "name": "Namibia",
    "code": "NA"
}, {
    "name": "Nauru",
    "code": "NR"
}, {
    "name": "Nepal",
    "code": "NP"
}, {
    "name": "Netherlands",
    "code": "NL"
}, {
    "name": "Netherlands Antilles",
    "code": "AN"
}, {
    "name": "New Caledonia",
    "code": "NC"
}, {
    "name": "New Zealand",
    "code": "NZ"
}, {
    "name": "Nicaragua",
    "code": "NI"
}, {
    "name": "Niger",
    "code": "NE"
}, {
    "name": "Nigeria",
    "code": "NG"
}, {
    "name": "Niue",
    "code": "NU"
}, {
    "name": "Norfolk Island",
    "code": "NF"
}, {
    "name": "Northern Mariana Islands",
    "code": "MP"
}, {
    "name": "Norway",
    "code": "NO"
}, {
    "name": "Oman",
    "code": "OM"
}, {
    "name": "Pakistan",
    "code": "PK"
}, {
    "name": "Palau",
    "code": "PW"
}, {
    "name": "Palestinian Territory, Occupied",
    "code": "PS"
}, {
    "name": "Panama",
    "code": "PA"
}, {
    "name": "Papua New Guinea",
    "code": "PG"
}, {
    "name": "Paraguay",
    "code": "PY"
}, {
    "name": "Peru",
    "code": "PE"
}, {
    "name": "Philippines",
    "code": "PH"
}, {
    "name": "Pitcairn",
    "code": "PN"
}, {
    "name": "Poland",
    "code": "PL"
}, {
    "name": "Portugal",
    "code": "PT"
}, {
    "name": "Puerto Rico",
    "code": "PR"
}, {
    "name": "Qatar",
    "code": "QA"
}, {
    "name": "Reunion",
    "code": "RE"
}, {
    "name": "Romania",
    "code": "RO"
}, {
    "name": "Russian Federation",
    "code": "RU"
}, {
    "name": "RWANDA",
    "code": "RW"
}, {
    "name": "Saint Helena",
    "code": "SH"
}, {
    "name": "Saint Kitts and Nevis",
    "code": "KN"
}, {
    "name": "Saint Lucia",
    "code": "LC"
}, {
    "name": "Saint Pierre and Miquelon",
    "code": "PM"
}, {
    "name": "Saint Vincent and the Grenadines",
    "code": "VC"
}, {
    "name": "Samoa",
    "code": "WS"
}, {
    "name": "San Marino",
    "code": "SM"
}, {
    "name": "Sao Tome and Principe",
    "code": "ST"
}, {
    "name": "Saudi Arabia",
    "code": "SA"
}, {
    "name": "Senegal",
    "code": "SN"
}, {
    "name": "Serbia",
    "code": "RS"
}, {
    "name": "Seychelles",
    "code": "SC"
}, {
    "name": "Sierra Leone",
    "code": "SL"
}, {
    "name": "Singapore",
    "code": "SG"
}, {
    "name": "Slovakia",
    "code": "SK"
}, {
    "name": "Slovenia",
    "code": "SI"
}, {
    "name": "Solomon Islands",
    "code": "SB"
}, {
    "name": "Somalia",
    "code": "SO"
}, {
    "name": "South Africa",
    "code": "ZA"
}, {
    "name": "South Georgia and the South Sandwich Islands",
    "code": "GS"
}, {
    "name": "Spain",
    "code": "ES"
}, {
    "name": "Sri Lanka",
    "code": "LK"
}, {
    "name": "Sudan",
    "code": "SD"
}, {
    "name": "Suriname",
    "code": "SR"
}, {
    "name": "Svalbard and Jan Mayen",
    "code": "SJ"
}, {
    "name": "Swaziland",
    "code": "SZ"
}, {
    "name": "Sweden",
    "code": "SE"
}, {
    "name": "Switzerland",
    "code": "CH"
}, {
    "name": "Syrian Arab Republic",
    "code": "SY"
}, {
    "name": "Taiwan, Province of China",
    "code": "TW"
}, {
    "name": "Tajikistan",
    "code": "TJ"
}, {
    "name": "Tanzania, United Republic of",
    "code": "TZ"
}, {
    "name": "Thailand",
    "code": "TH"
}, {
    "name": "Timor-Leste",
    "code": "TL"
}, {
    "name": "Togo",
    "code": "TG"
}, {
    "name": "Tokelau",
    "code": "TK"
}, {
    "name": "Tonga",
    "code": "TO"
}, {
    "name": "Trinidad and Tobago",
    "code": "TT"
}, {
    "name": "Tunisia",
    "code": "TN"
}, {
    "name": "Turkey",
    "code": "TR"
}, {
    "name": "Turkmenistan",
    "code": "TM"
}, {
    "name": "Turks and Caicos Islands",
    "code": "TC"
}, {
    "name": "Tuvalu",
    "code": "TV"
}, {
    "name": "Uganda",
    "code": "UG"
}, {
    "name": "Ukraine",
    "code": "UA"
}, {
    "name": "United Arab Emirates",
    "code": "AE"
}, {
    "name": "United Kingdom",
    "code": "GB"
}, {
    "name": "United States",
    "code": "US"
}, {
    "name": "United States Minor Outlying Islands",
    "code": "UM"
}, {
    "name": "Uruguay",
    "code": "UY"
}, {
    "name": "Uzbekistan",
    "code": "UZ"
}, {
    "name": "Vanuatu",
    "code": "VU"
}, {
    "name": "Venezuela",
    "code": "VE"
}, {
    "name": "Viet Nam",
    "code": "VN"
}, {
    "name": "Virgin Islands, British",
    "code": "VG"
}, {
    "name": "Virgin Islands, U.S.",
    "code": "VI"
}, {
    "name": "Wallis and Futuna",
    "code": "WF"
}, {
    "name": "Western Sahara",
    "code": "EH"
}, {
    "name": "Yemen",
    "code": "YE"
}, {
    "name": "Zambia",
    "code": "ZM"
}, {
    "name": "Zimbabwe",
    "code": "ZW"
}]


options = "";
options += '<option value="">Select Country</option>';
for (var i = 0; i < isoCountries.length; i++) {
    options += "<option class ='form-control' value='" + isoCountries[i]["code"] + "'>" + isoCountries[i]["name"] + "</option>";
}

document.getElementById('LeadPaxCountryId').innerHTML = options;

$(function() {
    $(document).on("focus", ".inputdate", function() {
        $(this).datetimepicker({
            format: 'DD-MM-YYYY',
            format: 'L',
        });

    });
});



var flightBasicInformation = localStorage.getItem('flight_search_query');
flightBasicInformation = JSON.parse(flightBasicInformation);
console.log(flightBasicInformation);
var totadult = flightBasicInformation.AdultCount;
var totchild = flightBasicInformation.ChildCount;
var totinfant = flightBasicInformation.InfantCount;
console.log("ADULT==>" + totadult + "CHILD===>" + totchild + "InFant===>" + totinfant);

$('#PAXbutton').submit(function(e) {
    e.preventDefault();
    alert("hello");
    let salutation = $.trim($('#LeadPAxSalutationID').val());
    let pesengerFirstName = $.trim($('#LeadPAxFaID').val());
    let pesengerLastName = $.trim($('#LeadPAxLaID').val());
    let passengerdob = $.trim($('#LeadPAxDobId').val());
    let pesengerEmailAddress = $.trim($('#LeadPAxEmailid').val());
    let phoneNumber = $.trim($('#LeadPAxContID').val());
    let passengergender = $.trim($("input[name='gender']:checked").val());
    let passengercity = $.trim($('#LeadPAxCityId').val());
    let passengerpincode = $.trim($('#LeadPAxPinId').val());
    let passengeraddress = $.trim($('#LeadPAxAdd1Id').val());
    let passengeraddress2 = $.trim($('#LeadPAxAdd2Id').val());
    let passengercountry = $.trim($("#LeadPaxCountryId option:selected").text());
    let passengercCode = $.trim($("#LeadPaxCountryId option:selected").val());

    var SequenceID = 0;
    var collection = [];
    let pesengerDetails = {
        "Title": salutation,
        "FirstName": pesengerFirstName,
        "LastName": pesengerLastName,
        "PaxType": 1,
        "Gender": passengergender,
        "DateOfBirth": passengerdob,
        "PassportNumber": "PP900078",
        "PassportExpiry": "2034-04-15",
        "CountryCode": passengercCode,
        "CountryName": passengercountry,
        "ContactNo": phoneNumber,
        "City": passengercity,
        "PinCode": passengerpincode,
        "AddressLine1": passengeraddress,
        "AddressLine2": passengeraddress2,
        "Email": pesengerEmailAddress

    };
    collection.push(pesengerDetails);
    /* ------------------------FORM FOR ADULT ------------------------*/

    if (totadult > 1) {
        let initial = 'Adult';
        for (let i = 0; i < (totadult - 1); i++) {
            let Adultpaxsal = `pasenger_salutation${initial}${i}`
            let Adultpaxdob = `dob${initial}${i}`
            let Paxinpgender = $("input[name=" + `${initial}PaxGender${i}` + "]:checked").val();
            let travellerInfo = {
                "Title": document.getElementById(Adultpaxsal).value,
                "FirstName": document.getElementById(`firstName${initial}${i}`).value,
                "LastName": document.getElementById(`lastName${initial}${i}`).value,
                "DateOfBirth": document.getElementById(Adultpaxdob).value,
                "PaxType": "1",
                "Gender": Paxinpgender,
                "CountryCode": passengercCode,
                "CountryName": passengercountry,
                "ContactNo": phoneNumber,
                "City": passengercity,
                "PinCode": passengerpincode,
                "AddressLine1": passengeraddress,
                "AddressLine2": passengeraddress,
                "Email": pesengerEmailAddress
            }
            collection.push(travellerInfo);
        }
    }

    /* ------------------------FORM FOR Child ------------------------*/
    if (totchild > 0) {
        let initial = 'Child';
        for (let i = 0; i < (totchild); i++) {
            let Adultpaxdob = `dob${initial}${i}`
            let Paxchpgender = $("input[name=" + `${initial}PaxGender${i}` + "]:checked").val();
            let Childpax = `pasenger_salutation${initial}${i}`
            let travellerInfo = {
                "Title": document.getElementById(Childpax).value,
                "FirstName": document.getElementById(`firstName${initial}${i}`).value,
                "LastName": document.getElementById(`lastName${initial}${i}`).value,
                "DateOfBirth": document.getElementById(Adultpaxdob).value,
                "PaxType": "2",
                "Gender": Paxchpgender,
                "CountryCode": passengercCode,
                "CountryName": passengercountry,
                "ContactNo": phoneNumber,
                "City": passengercity,
                "PinCode": passengerpincode,
                "AddressLine1": passengeraddress,
                "AddressLine2": passengeraddress,
                "Email": pesengerEmailAddress
            }
            collection.push(travellerInfo);
        }
    }

    /* ------------------------FORM FOR INfant ------------------------*/
    if (totinfant > 0) {
        let initial = 'Infant';
        for (let i = 0; i < (totinfant); i++) {
            console.log("Infant I", i)
            let infantpax = `pasenger_salutation${initial}${i}`
            let Adultpaxdob = `dob${initial}${i}`
            let Paxinfpgender = $("input[name=" + `${initial}PaxGender${i}` + "]:checked").val();
            let travellerInfo = {
                "Title": document.getElementById(infantpax).value,
                "FirstName": document.getElementById(`firstName${initial}${i}`).value,
                "LastName": document.getElementById(`lastName${initial}${i}`).value,
                "DateOfBirth": document.getElementById(Adultpaxdob).value,
                "PaxType": "3",
                "Gender": Paxinfpgender,
                "CountryCode": passengercCode,
                "CountryName": passengercountry,
                "ContactNo": phoneNumber,
                "City": passengercity,
                "PinCode": passengerpincode,
                "AddressLine1": passengeraddress,
                "AddressLine2": passengeraddress,
                "Email": pesengerEmailAddress
            }
            collection.push(travellerInfo);
        }
    }
    console.log("Final Collection : ", collection);


    let getRandomId = function() {
        let key = '0123456789'
        let randomString = '';
        for (let x = 0; x < 6; x++) {
            randomString += key.charAt(Math.floor(Math.random() * key.length));
        }
        return randomString;
    }

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            vars[key] = value;
        });
        return vars;
    }

    let request_query = getUrlVars();
    let _date = new Date(Date.now());
    let year = _date.getFullYear().toString();
    let AppReference = 'FB' + year.slice(0, 2) + '-' + getRandomId().slice(0, 4) + _date.getDate() + (_date.getMonth() + 1) + year + '-' + getRandomId()
    console.log(AppReference);
    console.log(request_query);

    let requestBody = JSON.stringify({
        "ResultToken": request_query['resultToken'],
        "SequenceNumber": SequenceID,
        "AppReference": AppReference,
        "Passengers": [
            collection,
        ]
    });

    console.log(requestBody);

    /* document.getElementById('showLoader').style.display = 'block';*/
    let bookFlight = 'http://test.services.travelomatix.com/webservices/index.php/flight/service/CommitBooking';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.Status === 0) {
                /*     document.getElementById('showLoader').style.display = 'none';*/
                alert(response.Message);
            } else if (response.Status === 1) {
                /*  document.getElementById('showLoader').style.display = 'none';
                            alert("Booking Success");
                            hotel-thankyou.html
                            */
                local_storage_data = Object.assign({
                    BookingDetails: response.CommitBooking.BookingDetails
                }, local_storage_data);
                localStorage.setItem('search_query', JSON.stringify(local_storage_data));
                // window.location.href = `hotel-thankyou.html`;
            }
        } else {
            console.log(this.responseText);
        }
    };

    xhttp.open("POST", bookFlight, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-Username", "test253477");
    xhttp.setRequestHeader("x-DomainKey", "TMX8012531575436219");
    xhttp.setRequestHeader("x-system", "test");
    xhttp.setRequestHeader("x-Password", "test@253");
    xhttp.send(requestBody);

    return true;
});