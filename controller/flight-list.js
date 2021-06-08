let selectedJournies = {
    "sourceToDestination": [],
    "destinationToSource": []
};
let returnJournyFooterPannelElement = document.getElementById('multi-flight-summary-container');
let resultTokenOne = '';
let resultTokenTwo = '';
let JourneyType = '';

let sourceToDestination = function (flights) {

    console.log("Source to source: ", flights)

    document.getElementById("flight_logo").src = `http://demo.liamlifestyleandservices.com/images/airlinelogo/${flights.FlightDetails.Details[0][0].OperatorCode}.gif`;
    document.getElementById('flight_operator_name').innerText = flights.FlightDetails.Details[0][0].OperatorName;
    
    let origin = flights.FlightDetails.Details[0][0].Origin;
    let destination = flights.FlightDetails.Details[0][0].Destination;
    
    document.getElementById('journyStartAirportName').innerText = `${origin.AirportName}(${origin.AirportCode})`;
    document.getElementById('originDepartureTime').innerText = origin.DateTime.split(' ')[1]

    document.getElementById('journyEndAirportName').innerText = `${destination.AirportName}(${destination.AirportCode})`;
    document.getElementById('destinationArivalTime').innerText = destination.DateTime.split(' ')[1];  
    resultTokenOne = flights.ResultToken;
    returnJournyFooterPannelElement.style.display = 'block';
}


let destinationToSource = function (flights) {

    document.getElementById("RetImg").src = `http://demo.liamlifestyleandservices.com/images/airlinelogo/${flights.FlightDetails.Details[0][0].OperatorCode}.gif`;
    document.getElementById('Retfname').innerText = flights.FlightDetails.Details[0][0].OperatorName;

    let origin = flights.FlightDetails.Details[0][0].Origin;
    let destination = flights.FlightDetails.Details[0][0].Destination;
    
    document.getElementById('Retarrname').innerText = `${origin.AirportName}(${origin.AirportCode})`;
    document.getElementById('retdeptime').innerText = origin.DateTime.split(' ')[1]

    document.getElementById('Retdepname').innerText = `${destination.AirportName}(${destination.AirportCode})`;
    document.getElementById('retarrtime').innerText = destination.DateTime.split(' ')[1];
    resultTokenTwo = flights.ResultToken;
    returnJournyFooterPannelElement.style.display = 'block';
}


let bookJourny = function () {
    window.location.href = `flight-detailed.html?tokenOne=${resultTokenOne}&tokenTwo=${resultTokenTwo}&JourneyType=${JourneyType}`;
}

$(document).ready(function() {


    /**
     * @author Khan Usama
     * Date 10/18/2020
     * 
     * @param {Object} flights
     * @param {String} id 
     * 
     * @returns html template
     */
  
    let twoWayTripCard = function(flights, id, type) {

        let new_flight_data = JSON.stringify(flights);
        let _journyType = type;
        // console.log("new_flight_data => ", new_flight_data);
        // return;

        let appendButton = '';
        if (_journyType === "STD") {
            appendButton = `<button class="bookallbtn mfb-btn" id='btn${id}' onclick='sourceToDestination(${new_flight_data})'>Select</button>`;
        } else if (_journyType === "DTS") {
            appendButton = `<button class="bookallbtn mfb-btn" id='btn${id}' onclick='destinationToSource(${new_flight_data})'>Select</button>`;
        }
       

        let origintime = flights.FlightDetails.Details[0][0].Origin.DateTime;
        let destinationtime = flights.FlightDetails.Details[0][0].Destination.DateTime;
        let oDate = origintime.slice(0, -9);
        let oTime = origintime.slice(10, -3);
        let dDate = destinationtime.slice(0, -9);
        let dTime = destinationtime.slice(10, -3);
  
        let airpath = 'http://demo.liamlifestyleandservices.com/images/airlinelogo/'
        if (flights.Attr.IsRefundable == false) {
            var refund = "Refundable";
        } else {
            var refund = "Non Refundable";
        }
  
        let hourstime = flights.FlightDetails.Details[0][0].Duration;
  
        function timeConvert(hourstime) {
            let num = hourstime;
            let hours = (num / 60);
            let rhours = Math.floor(hours);
            let minutes = (hours - rhours) * 60;
            let rminutes = Math.round(minutes);
            //return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
            return rhours + "h " + rminutes + "m";
        }
  
        let showtume = timeConvert(hourstime);
  
        return `<div class="left">
        <div class="round-domestk">
            <div class="">
                <div class="rowright rowresult  p-0 r-r-i t-w-i-2 active">
                    <div class="madgrid" data-key="${id}">
                        <div class="f-s-d-w col-xs-8 nopad wayeght full_same">
                            <div class="allsegments outer-segment-0" id="cloneone${id}">
                                <div class="quarter_wdth nopad col-xs-3">
                                    <div class="fligthsmll"><img class="airline-logo" alt="I5 icon" id="comeairlinelogo${id}" src="${airpath}${flights.FlightDetails.Details[0][0].OperatorCode}.gif"></div>
                                    <div class="m-b-0 text-center">
                                        <div class="a-n airlinename" id="comeairlinename${id}" data-code="I5">${flights.FlightDetails.Details[0][0].OperatorName} </div>
                                        <strong> ${flights.FlightDetails.Details[0][0].FlightNumber} </strong>
                                    </div>
                                </div>
                                <div class="col-xs-3 nopad quarter_wdth">
                                    <div class="insidesame">
                                        <span id="comeairlinesmalltime${id}" class="fdtv hide">${oTime}</span>
                                        <div id="airlinebigtime${id}" class="f-d-t bigtimef">${oTime}</div>
                                        <div id="comeairlineorigincode${id}" class="from-loc smalairport_code">${flights.FlightDetails.Details[0][0].Origin.AirportCode}</div>
                                        <div id="comeairlineoriginname${id}" class="from-loc smalairport">${id} ${flights.FlightDetails.Details[0][0].Origin.AirportName} (${flights.FlightDetails.Details[0][0].Origin.AirportCode})</div>
                                        <span class="dep_dt hide" data-category="4" data-datetime="1593522000000"></span>
                                    </div>
                                </div>
                                <div class="col-md-1 p-tb-10 hide">
                                    <div class="arocl fa fa-long-arrow-right"></div>
                                </div>
                                <div class="smal_udayp nopad col-xs-3">
                                    <span class="f-d hide">495</span>
                                    <div class="insidesame">
                                        <div id="comeairlinedurtime${id}" class="durtntime">${showtume}</div>
                                        <div class="city_code1"></div>
                                        <div class="cabinclass hide">Economy</div>
                                    </div>
                                </div>
                                <div class="col-xs-3 nopad quarter_wdth">
                                    <div class="insidesame">
                                        <span class="fatv hide">0245</span>
                                        <div id="comeairportarrtime${id}" class="f-a-t bigtimef">${dTime}</div>
                                        <div id="comeairportorgcode${id}" class="to-loc smalairport">${flights.FlightDetails.Details[0][0].Destination.AirportName} (${flights.FlightDetails.Details[0][0].Destination.AirportCode})</div>
                                        <div id="comeairportdescode${id}" class="smalairport_code">${flights.FlightDetails.Details[0][0].Destination.AirportCode}</div>
                                        <span class="arr_dt hide" data-category="1" data-datetime="1593551700000"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 nopad wayfour full_same">
                            <span class="hide stp" data-stp="1" data-category="2"></span>
                            <div class="priceanbook">
                                <div class="col-xs-6 nopad wayprice">
                                    <div class="insidesame">
                                        <div id="comeairportprice${id}" class="priceflights"><strong> Rs </strong><span class="f-p">${flights.Price.TotalDisplayFare}</span></div>
                                        <span class="hide price" data-price="5514" data-currency="Rs"></span>
                                        <div data-val="1" class="n-r n-r-t">${refund}</div>
                                    </div>
                                </div>
                                <div class="col-xs-6 nopad waybook">
                                    <div class="form-wrapper bookbtlfrt"> 
                                        ${appendButton}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="mrinfrmtn"><a class="detailsflt iti-btn" data-toggle="modal" data-id="${flights.FlightDetails.Details[0][0].Attr.AvailableSeats}" data-target="#FMmoda${id}"><span class="fal fa-info-circle fldetail" data-toggle="tooltip" title="" data-original-title="Flight Itinerary"></span>Flight Details | </a><i>This is a Economy Promo fare.</i></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="FMmoda${id}" role="dialog">
            <div class="modal-dialog modal-lg">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Modal Header</h4>
                    </div>
                    <div class="modal-body">
                        <div role="tabpanel">
                            <!-- Nav tabs -->
                            <ul class="nav nav-pills" role="tablist">
                                <li role="presentation" class="active"><a href="#uploadTab${id}" aria-controls="uploadTab" role="tab" data-toggle="tab">Itinerary</a>
                                </li>
                                <li role="presentation"><a href="#browseTab${id}" onload="myFunction(browseTab${id})" aria-controls="browseTab" role="tab" data-toggle="tab">Fare Details</a>
                                </li>
                            </ul>
                            <!-- Tab panes -->
                            <div class="tabmarg">
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane active" id="uploadTab${id}">
                                        <div class="alltwobnd">
                                            <div class="row">
                                                <div class="col-xs-8 nopad full_wher">
                                                    <div class="inboundiv seg-0">
                                                        <div class="hedtowr">${flights.FlightDetails.Details[0][0].Origin.AirportName} to ${flights.FlightDetails.Details[0][0].Destination.AirportName} <strong>(${showtume})</strong></div>
                                                        <div class="flitone">
                                                            <div class="col-xs-4 nopad5">
                                                                <div class="imagesmflt"><img alt="G8 icon" src="${airpath}${flights.FlightDetails.Details[0][0].OperatorCode}.gif"></div>
                                                                <div class="flitsmdets">Goair<strong>G8 423 </strong>
                                                                </div>
                                                            </div>
                                                            <div class="col-xs-6 nopad5">
                                                                <div class="col-xs-5 nopad5">
                                                                    <div class="dateone">${oTime}</div>
                                                                    <div class="dateone">${oDate}</div>
                                                                    <div class="termnl">${flights.FlightDetails.Details[0][0].Origin.AirportName} (${flights.FlightDetails.Details[0][0].Origin.AirportCode})</div>
                                                                </div>
                                                                <div class="col-xs-2 nopad">
                                                                    <div class="arocl fa fa-long-arrow-right"></div>
                                                                </div>
                                                                <div class="col-xs-5 nopad5">
                                                                    <div class="dateone">${dTime}</div>
                                                                    <div class="dateone">${dDate}</div>
                                                                    <div class="termnl">${flights.FlightDetails.Details[0][0].Destination.AirportName} (${flights.FlightDetails.Details[0][0].Destination.AirportCode})</div>
                                                                </div>
                                                            </div>
                                                            <div class="col-xs-2 nopad5">
                                                                <div class="ritstop">
                                                                    <div class="termnl">${showtume}</div>
                                                                    <div class="termnl1">Stop : 0</div>
                                                                </div>
                                                            </div>
                                                            <span style="float:left"><b></b></span>
                                                            <div class="Baggage_block">
                                                                <div class="termnl1 flo_w"><em><i class="fa fa-suitcase bag_icon"></i>${flights.FlightDetails.Details[0][0].Attr.Baggage}</em></div>
                                                                <div class="termnl1 flo_w"><em><i class="air_seat timings icseats"></i>${flights.FlightDetails.Details[0][0].Attr.AvailableSeats}</em></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-4 nopad full_wher">
                                                    <div class="inboundiv sidefare">
                                                        <h4 class="farehdng">Total Fare Breakup</h4>
                                                        <div class="inboundivinr">
                                                            <div class="rowfare">
                                                                <div class="col-xs-8 nopad"><span class="infolbl">Total Base Fare</span></div>
                                                                <div class="col-xs-4 nopad"><span class="pricelbl">${flights.Price.PriceBreakup.BasicFare}</span></div>
                                                            </div>
                                                            <div class="rowfare">
                                                                <div class="col-xs-8 nopad"><span class="infolbl">Taxes &amp; Fees</span></div>
                                                                <div class="col-xs-4 nopad"><span class="pricelbl">${flights.Price.PriceBreakup.Tax}</span></div>
                                                            </div>
                                                            <div class="rowfare grandtl">
                                                                <div class="col-xs-8 nopad"><span class="infolbl">Grand Total</span></div>
                                                                <div class="col-xs-4 nopad"><span class="pricelbl">${flights.Price.TotalDisplayFare}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="browseTab${id}">
                                        <div class="text-center" id="dynResponse${id}">Please Wait</div>
                                        <input type="hidden" value="${flights.ResultToken}" id="dyninp${id}">
                                        <div class="i-s-s-c tabmarg">
                                            <div class="col-xs-12 nopad">
                                                <div class="inboundiv splfares">
                                                    <h4 class="farehdng">Fare Rules</h4>
                                                    <div class="flight-fare-rules rowfare">
                                                        <div class="lablfare">${flights.FlightDetails.Details[0][0].Origin.AirportName} <span class="fa fa-long-arrow-right"></span> ${flights.FlightDetails.Details[0][0].Destination.AirportName}</div>
                                                        <div class="feenotes" id="feenote${id}">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }


    let inernationFlightTemplate = function (flights, id) {

        // console.log(" = > ", flights);
        // console.log(" = > ", flights.FlightDetails.Details[0][1]);
        // console.log(" = > ", flights.FlightDetails);
        // console.log(" = > ", flights);
        //console.log(" = > ", flights.FlightDetails.Details[0][0].Origin.DateTime);
        // console.log(" = > ", flights.FlightDetails.Details[0][0].Origin.DateTime);

        let origintime = flights.FlightDetails.Details[0][0].Origin.DateTime;
        let destinationtime = flights.FlightDetails.Details[0][0].Destination.DateTime;
        var oDate = origintime.slice(0, -9);
        var oTime = origintime.slice(10, -3);
        var dDate = destinationtime.slice(0, -9);
        var dTime = destinationtime.slice(10, -3);


        let retorigintime = flights.FlightDetails.Details[1][0].Origin.DateTime;
        let retdestinationtime = flights.FlightDetails.Details[1][0].Destination.DateTime;
        var retoDate = retorigintime.slice(0, -9);
        var retoTime = retorigintime.slice(10, -3);
        var retdDate = retdestinationtime.slice(0, -9);
        var retdTime = retdestinationtime.slice(10, -3);
        
        if (flights.Attr.IsRefundable == false) {
            var refund = "Refundable";
        } else {
            var refund = "Non Refundable";
        }

        let hourstime = flights.FlightDetails.Details[0][0].Duration;
        let rethourstime = flights.FlightDetails.Details[1][0].Duration;

        function timeConvert(hourstime) {
            var num = hourstime;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
            //return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
            return rhours + "h " + rminutes + "m";
        }

        let showtume = timeConvert(hourstime);
        let retshowtime = timeConvert(rethourstime);

        return `
    <div class="row round-trip">
        <div class="rondnone r-w-g nopad">
            <div class="rowresult p-0 r-r-i t-w-i-1">
                <div class="madgrid" data-key="10">
                    <div class="f-s-d-w col-xs-8 nopad wayeght full_same">
                        <div class="allsegments outer-segment-0">
                            <div class="quarter_wdth nopad col-xs-3">
                                <div class="fligthsmll"><img class="airline-logo" alt="EK icon" src="/extras/system/library/images/airline_logo/EK.gif"></div>
                                <div class="m-b-0 text-center">
                                    <div class="a-n airlinename" data-code="EK">${flights.FlightDetails.Details[0][0].OperatorName} </div>
                                    <strong> ${flights.FlightDetails.Details[0][0].FlightNumber} </strong>
                                </div>
                            </div>
                            <div class="col-xs-3 nopad quarter_wdth">
                                <div class="insidesame">
                                    <span class="fdtv hide">${oTime}</span>
                                    <div class="f-d-t bigtimef">${oTime}</div>
                                    <div class="from-loc smalairport_code">${flights.FlightDetails.Details[0][0].Origin.AirportCode}</div>
                                    <div class="from-loc smalairport">${flights.FlightDetails.Details[0][0].Origin.AirportName} (${flights.FlightDetails.Details[0][0].Origin.AirportCode})</div>
                                    <span class="dep_dt hide" data-category="1" data-datetime="1598396400000"></span>
                                </div>
                            </div>
                            <div class="col-md-1 p-tb-10 hide">
                                <div class="arocl fa fa-long-arrow-right"></div>
                            </div>
                            <div class="smal_udayp nopad col-xs-3">
                                <span class="f-d hide">180</span>
                                <div class="insidesame">
                                    <div class="durtntime">${showtume}</div>
                                    <div class="stop_image"><img src="/extras/system/template_list/template_v3/images/stop_0.png" alt="stop_0"></div>
                                    <div class="stop-value"><span class="fa fa-arrow-right"></span></div>
                                    <div class="cabinclass hide">Economy</div>
                                </div>
                            </div>
                            <div class="col-xs-3 nopad quarter_wdth">
                                <div class="insidesame">
                                    <span class="fatv hide">${dTime}</span>
                                    <div class="f-a-t bigtimef">${dTime}</div>
                                    <div class="to-loc smalairport">${flights.FlightDetails.Details[0][0].Destination.AirportName} (${flights.FlightDetails.Details[0][0].Destination.AirportCode})</div>
                                    <div class="smalairport_code">${flights.FlightDetails.Details[0][0].Destination.AirportCode}</div>
                                    <span class="arr_dt hide" data-category="2" data-datetime="1598401800000"></span>
                                </div>
                            </div>
                        </div>
                        <div class="allsegments outer-segment-1">
                            <div class="quarter_wdth nopad col-xs-3">
                                <div class="fligthsmll"><img class="airline-logo" alt="EK icon" src="/extras/system/library/images/airline_logo/EK.gif"></div>
                                <div class="m-b-0 text-center">
                                    <div class="a-n airlinename" data-code="EK">${flights.FlightDetails.Details[1][0].OperatorName}</div>
                                    <strong> ${flights.FlightDetails.Details[1][0].FlightNumber} </strong>
                                </div>
                            </div>
                            <div class="col-xs-3 nopad quarter_wdth">
                                <div class="insidesame">
                                    <span class="fdtv hide">0330</span>
                                    <div class="f-d-t bigtimef">${retoTime}</div>
                                    <div class="from-loc smalairport_code">${flights.FlightDetails.Details[1][0].Origin.AirportCode}</div>
                                    <div class="from-loc smalairport">${flights.FlightDetails.Details[1][0].Origin.AirportName} (${flights.FlightDetails.Details[1][0].Origin.AirportCode})</div>
                                    <span class="dep_dt hide" data-category="1" data-datetime="1598565600000"></span>
                                </div>
                            </div>
                            <div class="col-md-1 p-tb-10 hide">
                                <div class="arocl fa fa-long-arrow-right"></div>
                            </div>
                            <div class="smal_udayp nopad col-xs-3">
                                <span class="f-d hide">190</span>
                                <div class="insidesame">
                                    <div class="durtntime">${retshowtime} </div>
                                    <div class="stop_image"><img src="/extras/system/template_list/template_v3/images/stop_0.png" alt="stop_0"></div>
                                    <div class="stop-value"></div>
                                    <div class="cabinclass hide">Economy</div>
                                </div>
                            </div>
                            <div class="col-xs-3 nopad quarter_wdth">
                                <div class="insidesame">
                                    <span class="fatv hide">0810</span>
                                    <div class="f-a-t bigtimef">${retdTime}</div>
                                    <div class="to-loc smalairport">${flights.FlightDetails.Details[1][0].Destination.AirportName} (${flights.FlightDetails.Details[1][0].Destination.AirportCode})</div>
                                    <div class="smalairport_code">${flights.FlightDetails.Details[1][0].Destination.AirportCode}</div>
                                    <span class="arr_dt hide" data-category="2" data-datetime="1598582400000"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 nopad wayfour full_same">
                        <span class="hide stp" data-stp="0" data-category="1"></span>
                        <div class="priceanbook">
                            <div class="col-xs-6 nopad wayprice">
                                <div class="insidesame">
                                    <div class="priceflights"><strong> Rs </strong><span class="f-p">${flights.Price.TotalDisplayFare}</span></div>
                                    <span class="hide price" data-price="38730" data-currency="Rs"></span>
                                    <div data-val="0" class="n-r n-r-t">${refund}</div>
                                </div>
                            </div>
                            <div class="col-xs-6 nopad waybook">
                                <div class="form-wrapper bookbtlfrt">
                                    <a class="b-btn bookallbtn" href="flight-detailed.html?resultToken=${flights.ResultToken}&JourneyType=${JourneyType}">Book Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="mrinfrmtn"><a class="detailsflt iti-btn" data-toggle="modal" data-target="#FMmoda${id}"><span class="fal fa-info-circle fldetail" data-toggle="tooltip" title="" data-original-title="Flight Itinerary"></span>Flight Details </a><i></i></div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="FMmoda${id}" role="dialog">
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Modal Header</h4>
                </div>
                <div class="modal-body">
                    <div role="tabpanel">
                        <!-- Nav tabs -->
                        <ul class="nav nav-pills" role="tablist">
                            <li role="presentation" class="active"><a href="#uploadTab${id}" aria-controls="uploadTab" role="tab" data-toggle="tab">Itinerary</a>
                            </li>
                            <li role="presentation"><a href="#browseTab${id}" onload="myFunction(browseTab${id})" aria-controls="browseTab" role="tab" data-toggle="tab">Fare Details</a>
                            </li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tabmarg">
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane active" id="uploadTab${id}">
                                    <div class="alltwobnd">
                                        <div class="col-xs-8 nopad full_wher">
                                            <div class="inboundiv seg-0">
                                                <div class="hedtowr">${flights.FlightDetails.Details[0][0].Origin.AirportName} to ${flights.FlightDetails.Details[0][0].Destination.AirportName} <strong>(${showtume})</strong></div>
                                                <div class="flitone">
                                                    <div class="col-xs-4 nopad5">
                                                        <div class="imagesmflt"><img alt="SG icon" src="/extras/system/library/images/airline_logo/SG.gif"></div>
                                                        <div class="flitsmdets">${flights.FlightDetails.Details[1][0].OperatorName}<strong>${flights.FlightDetails.Details[0][0].FlightNumber} </strong>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-7 nopad5">
                                                        <div class="col-xs-5 nopad5">
                                                            <div class="dateone">${oTime}</div>
                                                            <div class="dateone">${oDate}</div>
                                                            <div class="termnl">${flights.FlightDetails.Details[0][0].Origin.AirportName} (${flights.FlightDetails.Details[0][0].Origin.AirportCode})</div>
                                                        </div>
                                                        <div class="col-xs-2 nopad">
                                                            <div class="arocl fa fa-long-arrow-right"></div>
                                                        </div>
                                                        <div class="col-xs-5 nopad5">
                                                            <div class="dateone">${dTime}</div>
                                                            <div class="dateone">${dDate}</div>
                                                            <div class="termnl">${flights.FlightDetails.Details[0][0].Destination.AirportName} (${flights.FlightDetails.Details[0][0].Destination.AirportCode})</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-1 nopad5">
                                                        <div class="ritstop">
                                                            <div class="termnl">${showtume}</div>
                                                            <div class="termnl1">Stop : 0</div>
                                                        </div>
                                                    </div>
                                                    <span style="float:left"><b></b></span>
                                                    <div class="Baggage_block">
                                                        <div class="termnl1 flo_w"><em><i class="fa fa-suitcase bag_icon"></i>${flights.FlightDetails.Details[0][0].Attr.Baggage}</em></div>
                                                        <div class="termnl1 flo_w"><em><i class="air_seat timings icseats"></i>${flights.FlightDetails.Details[0][0].Attr.AvailableSeats}</em></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="inboundiv seg-1">
                                                <div class="hedtowr">${flights.FlightDetails.Details[1][0].Origin.AirportName} to ${flights.FlightDetails.Details[1][0].Destination.AirportName} <strong>${retshowtime}</strong></div>
                                                <div class="flitone">
                                                    <div class="col-xs-4 nopad5">
                                                        <div class="imagesmflt"><img alt="SG icon" src="/extras/system/library/images/airline_logo/SG.gif"></div>
                                                        <div class="flitsmdets">${flights.FlightDetails.Details[1][0].OperatorName}<strong>${flights.FlightDetails.Details[1][0].FlightNumber} </strong>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-7 nopad5">
                                                        <div class="col-xs-5 nopad5">
                                                            <div class="dateone">${retoTime}</div>
                                                            <div class="dateone">${retoDate}</div>
                                                            <div class="termnl">${flights.FlightDetails.Details[1][0].Destination.AirportName} (${flights.FlightDetails.Details[1][0].Destination.AirportCode})</div>
                                                        </div>
                                                        <div class="col-xs-2 nopad">
                                                            <div class="arocl fa fa-long-arrow-right"></div>
                                                        </div>
                                                        <div class="col-xs-5 nopad5">
                                                            <div class="dateone">${retdTime}</div>
                                                            <div class="dateone">${retdDate}</div>
                                                            <div class="termnl">${flights.FlightDetails.Details[1][0].Origin.AirportName} (${flights.FlightDetails.Details[1][0].Origin.AirportCode})</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-1 nopad5">
                                                        <div class="ritstop">
                                                            <div class="termnl">${retshowtime}</div>
                                                            <div class="termnl1">Stop : 0</div>
                                                        </div>
                                                    </div>
                                                    <span style="float:left"><b></b></span>
                                                    <div class="Baggage_block">
                                                        <div class="termnl1 flo_w"><em><i class="fa fa-suitcase bag_icon"></i>${flights.FlightDetails.Details[1][0].Attr.Baggage}</em></div>
                                                        <div class="termnl1 flo_w"><em><i class="air_seat timings icseats"></i>${flights.FlightDetails.Details[1][0].Attr.AvailableSeats}</em></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 nopad full_wher">
                                            <div class="inboundiv sidefare">
                                                <h4 class="farehdng">Total Fare Breakup</h4>
                                                <div class="inboundivinr">
                                                    <div class="rowfare">
                                                        <div class="col-xs-8 nopad"><span class="infolbl">Total Base Fare</span></div>
                                                        <div class="col-xs-4 nopad"><span class="pricelbl">${flights.Price.PriceBreakup.BasicFare}</span></div>
                                                    </div>
                                                    <div class="rowfare">
                                                        <div class="col-xs-8 nopad"><span class="infolbl">Taxes &amp; Fees</span></div>
                                                        <div class="col-xs-4 nopad"><span class="pricelbl">${flights.Price.PriceBreakup.Tax}</span></div>
                                                    </div>
                                                    <div class="rowfare grandtl">
                                                        <div class="col-xs-8 nopad"><span class="infolbl">Grand Total</span></div>
                                                        <div class="col-xs-4 nopad"><span class="pricelbl">${flights.Price.TotalDisplayFare}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane" id="browseTab${id}">
                                    <div class="text-center" id="dynResponse${id}">Please Wait</div>
                                    <input type="hidden" value="${flights.ResultToken}" id="dyninp${id}">
                                    <div class="i-s-s-c tabmarg">
                                        <div class="col-xs-12 nopad">
                                            <div class="inboundiv splfares">
                                                <h4 class="farehdng">Fare Rules</h4>
                                                <div class="flight-fare-rules rowfare">
                                                    <div class="lablfare">${flights.FlightDetails.Details[0][0].Origin.AirportName} <span class="fa fa-long-arrow-right"></span> ${flights.FlightDetails.Details[0][0].Destination.AirportName}</div>
                                                    <div class="feenotes" id="feenote${id}">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    };
  
    var counter = 0;
    let requestLoader = document.getElementById('showLoader');
    let request_query = getUrlVars();
    console.log(request_query);
  
    requestLoader.style.display = 'block';
  
    /**
     * For testing purpose only
     */
  
    let oneWayRootElement = document.getElementById("onWayJourny");
    let returnJournyRootElement = document.getElementById("twoWayJourny");
    let internation_two_wrapper = document.getElementById("internation_two_wrapper");
    let internationTwoWayElement = document.getElementById("internationTwoWay");
  
    let DepartureDate = request_query["DepartureDate"];
    let flightSearchRequestBody = JSON.stringify({
        "AdultCount": parseInt(request_query.AdultCount),
        "ChildCount": parseInt(request_query.ChildCount),
        "InfantCount": parseInt(request_query.InfantCount),
        "JourneyType": request_query.JourneyType,
        "CabinClass": request_query.CabinClass,
        "Segments": [{
            "Origin": request_query.CityId,
            "Destination": request_query.Destination,
            "DepartureDate": request_query.DepartureDate,
            "ReturnDate": request_query.ArrivalDate
        }]
    });

    console.log("selectedCountryCities => :::", request_query.source_country, request_query.dest_country);
    JourneyType = request_query.source_country.toLowerCase() === "india" 
    && request_query.dest_country.toLowerCase() === "india" ? request_query.JourneyType : 'International';

    // JourneyType = 'International';
    /**
     * ===========================================================
     * Temp code will delete later
     * ===========================================================
     * 
     * International two way
     * 
     * 
     */

    // let flightdetails = response.Search.FlightDataList.JourneyList;
    // console.log("flightdetails ---> international : ", flightdetails)
    // let flighCardsList = '';
    // flightdetails[0].forEach((element, id) => {
    //     flighCardsList += inernationFlightTemplate(element, id);
    // });
    // requestLoader.style.display = 'none';
    // if (flighCardsList != "") {
    //     internationTwoWayElement.innerHTML = flighCardsList
    // }
    // internation_two_wrapper.style.display = 'block';

    // ====================================================================================

  
    console.log(JSON.parse(flightSearchRequestBody));
    $.ajax({
        url: 'http://test.services.travelomatix.com/webservices/index.php/flight/service/Search',
        headers: {
            'x-Username': 'test253477',
            'x-DomainKey': 'TMX8012531575436219',
            'x-system': 'test',
            'x-Password': 'test@253'
        },
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: flightSearchRequestBody,
  
        success: function(result) {
            if (result.Status === 0) {
                try {
                    requestLoader.style.display = 'none';
                    alert('No flights Found');
                } catch (NotFoundxception) {
                    alert('Something Went Wrong');
                    console.log(NotFoundxception);
                } finally {
                    // document.getElementById('loadMoreflightss').style.display = 'none'; 
                }
            } else if (result.Status === 1) {
  
                requestLoader.style.display = 'none';

                /**
                 * Multiple journy type in a single file
                 * Date 10/20/2020
                 */
  
                switch(JourneyType) {
                    case 'OneWay':
                    {
                        let flightdetails = result.Search.FlightDataList.JourneyList;
                        document.getElementById('fl-lid').innerHTML = flightdetails[0].length;
                        console.log("Flightdetails : ", flightdetails);
                        console.log("Flight data : ", flightdetails[0][0].FlightDetails.Details);
                        console.log("Flight data : ", flightdetails[0][0].FlightDetails.Details[0][0]);
  
                        let flighCardsList = '';
                        flightdetails[0].forEach((element, id) => {
                            flighCardsList += createSingleCards(element, id)
                        });
                        if (flighCardsList != "") {
                            document.getElementById('flight_search_result').innerHTML = flighCardsList
                        }
                        oneWayRootElement.style.display = 'block';
  
                        $('a[data-toggle="tab"]').bind('click', function(e) {
                            console.log("IM HERE ");
                            e.preventDefault();
                            var tab = $(this).attr("href");
                            var url = '';
                            var nno = tab.slice(10);
                            var n = tab.includes("browseTab");
                            if (typeof url !== "undefined") {
                                var pane = $(this);
                                if (n == true) {
                                    var dynamicid = "dyninp" + nno;
                                    var feeareid = "fareid" + nno;
                                    var feenote = "feenote" + nno;
                                    var dynamicResp = "dynResponse" + nno;
                                    var tabinput = document.getElementById(dynamicid).value;
                                    if (counter == 0) {
                                        console.log("COMING HERE FIRST =====>" + dynamicid);
                                        $.ajax({
                                            url: 'http://test.services.travelomatix.com/webservices/index.php/flight/service/FareRule',
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
                                                if (result.Status == 1) {
                                                    document.getElementById(dynamicResp).style.display = "none";
                                                    document.getElementById(feeareid).style.display = "block";
                                                    document.getElementById(feenote).innerHTML = result.FareRule.FareRuleDetail[0].FareRules;
                                                }
                                            },
                                            error: function(error) {}
                                        }).done(function(result) {});
                                    }
                                }
                            } else {
                                $(this).tab('show');
                            }
                        });
                    }
                        break;
                    
                    case 'Return':
  
                        /**
                         * Date 27/10/2020
                         * @author Khan Usama
                         * 
                         * Return journy 
                         */
  
                        // =================Two Way Journy=========================================
                        
                        // Goin Journy
                        let fromSourceToDestinationTemplate = '';
                        let fromDestinationToSourceTemplate = '';
  
                        async.parallel([
                            function(callback) {
                                try {
                                    let fromSourceToDestination = result.Search.FlightDataList.JourneyList[0];
                                    fromSourceToDestination.forEach((element, index) => {
                                        fromSourceToDestinationTemplate += twoWayTripCard(element, index, "STD");
                                    });
                                    callback(null, true)
  
                                } catch (Exception) {
                                    console.error(Exception)
                                    callback(Exception, null)
                                }
                                
                            },
                            function(callback) {
  
                                try {
                                    // Return Journy
                                    let fromDestinationToSource = result.Search.FlightDataList.JourneyList[1];
                                    fromDestinationToSource.forEach((element, index) => {
                                        fromDestinationToSourceTemplate += twoWayTripCard(element, index, "DTS");
                                    });   
                                    
                                    callback(null, true)
  
                                } catch (Exception) {
                                    console.error(Exception)
                                    callback(Exception, null)
                                }
                            }
                        ],
                        // optional callback
                        function(err, results) {
                            // the results array will equal ['one','two'] even though
                            // the second function had a shorter timeout.
  
                            if (!err) {
                                document.getElementById('left-div').innerHTML = fromSourceToDestinationTemplate;
                                document.getElementById('right-div').innerHTML = fromDestinationToSourceTemplate;
  
                                returnJournyRootElement.style.display = 'block';
                            }
                        });
                        break;
                    
                    case 'International':
                        switch (request_query.JourneyType) {
                            case 'OneWay':
                                {
                                    let flightdetails = result.Search.FlightDataList.JourneyList;
                                    document.getElementById('fl-lid').innerHTML = flightdetails[0].length;
                                    console.log("Flightdetails : ", flightdetails);
                                    console.log("Flight data : ", flightdetails[0][0].FlightDetails.Details);
                                    console.log("Flight data : ", flightdetails[0][0].FlightDetails.Details[0][0]);
              
                                    let flighCardsList = '';
                                    flightdetails[0].forEach((element, id) => {
                                        flighCardsList += createSingleCards(element, id)
                                    });
                                    if (flighCardsList != "") {
                                        document.getElementById('flight_search_result').innerHTML = flighCardsList
                                    }
                                    oneWayRootElement.style.display = 'block';
              
                                    $('a[data-toggle="tab"]').bind('click', function(e) {
                                        console.log("IM HERE ");
                                        e.preventDefault();
                                        var tab = $(this).attr("href");
                                        var url = '';
                                        var nno = tab.slice(10);
                                        var n = tab.includes("browseTab");
                                        if (typeof url !== "undefined") {
                                            var pane = $(this);
                                            if (n == true) {
                                                var dynamicid = "dyninp" + nno;
                                                var feeareid = "fareid" + nno;
                                                var feenote = "feenote" + nno;
                                                var dynamicResp = "dynResponse" + nno;
                                                var tabinput = document.getElementById(dynamicid).value;
                                                if (counter == 0) {
                                                    console.log("COMING HERE FIRST =====>" + dynamicid);
                                                    $.ajax({
                                                        url: 'http://test.services.travelomatix.com/webservices/index.php/flight/service/FareRule',
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
                                                            if (result.Status == 1) {
                                                                document.getElementById(dynamicResp).style.display = "none";
                                                                document.getElementById(feeareid).style.display = "block";
                                                                document.getElementById(feenote).innerHTML = result.FareRule.FareRuleDetail[0].FareRules;
                                                            }
                                                        },
                                                        error: function(error) {}
                                                    }).done(function(result) {});
                                                }
                                            }
                                        } else {
                                            $(this).tab('show');
                                        }
                                    });
                                }
                                break;
                            case 'Return':
                                {
                                    /**
                                     * Internation two way
                                     * Date 15/11/2020
                                     */

                                    let flightdetails = result.Search.FlightDataList.JourneyList;
                                    console.log("flightdetails ---> international : ", flightdetails)
                                    let flighCardsList = '';
                                    flightdetails[0].forEach((element, id) => {
                                        flighCardsList += inernationFlightTemplate(element, id);
                                    });
                                    if (flighCardsList != "") {
                                        internationTwoWayElement.innerHTML = flighCardsList
                                    }
                                    internation_two_wrapper.style.display = 'block';
                                }
                                break;
                        }
                        break;
                }
                
                
            }
        },
        error: function(error) {}
    });
    var createSingleCards = function(flights, id) {
        let origintime = flights.FlightDetails.Details[0][0].Origin.DateTime;
        let destinationtime = flights.FlightDetails.Details[0][0].Destination.DateTime;
        var oDate = origintime.slice(0, -9);
        var oTime = origintime.slice(10, -3);
        var dDate = destinationtime.slice(0, -9);
        var dTime = destinationtime.slice(10, -3);
        if (flights.Attr.IsRefundable == false) {
            var refund = "Refundable";
        } else {
            var refund = "Non Refundable";
        }
        var airpath = 'http://demo.liamlifestyleandservices.com/images/airlinelogo/'
        let hourstime = flights.FlightDetails.Details[0][0].Duration;
  
        function timeConvert(hourstime) {
            var num = hourstime;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
            return rhours + "h " + rminutes + "m";
        }
        let showtume = timeConvert(hourstime);
        return `<div class="rondnone r-w-g nopad" id="t-w-i-1">
      <div class="rowresult p-0 r-r-i t-w-i-1">
          <div class="madgrid" data-key="10">
              <div class="f-s-d-w col-xs-8 nopad wayeght full_same">
                  <div class="allsegments outer-segment-0">
                      <div class="quarter_wdth nopad col-xs-3">
                          <div class="fligthsmll"><img class="airline-logo" alt="6E icon" src="${airpath}${flights.FlightDetails.Details[0][0].OperatorCode}.gif" /></div>
                          <div class="m-b-0 text-center">
                              <div class="a-n airlinename" data-code="6E">${flights.FlightDetails.Details[0][0].OperatorName}</div>
                              <strong>${flights.FlightDetails.Details[0][0].FlightNumber}</strong><strong> Operated By ${flights.FlightDetails.Details[0][0].OperatorName}</strong>
                          </div>
                      </div>
                      <div class="col-xs-3 nopad quarter_wdth">
                          <div class="insidesame">
                              <span class="fdtv hide">${oTime}</span>
                              <div class="f-d-t bigtimef">${oTime}</div>
                              <div class="from-loc smalairport_code">${flights.FlightDetails.Details[0][0].Origin.AirportCode}</div>
                              <div class="from-loc smalairport">${flights.FlightDetails.Details[0][0].Origin.AirportName} (${flights.FlightDetails.Details[0][0].Origin.AirportCode})</div>
                              <span class="dep_dt hide" data-category="1" data-datetime="1592352300000"></span>
                          </div>
                      </div>
                      <div class="col-md-1 p-tb-10 hide">
                          <div class="arocl fa fa-long-arrow-right"></div>
                      </div>
                      <div class="smal_udayp nopad col-xs-3">
                          <span class="f-d hide">70</span>
                          <div class="insidesame">
                              <div class="durtntime">${showtume}</div>
                              <div class="stop_image"><img src="https://demo.travelomatix.com/extras/system/template_list/template_v3/images/stop_0.png" alt="stop_0" /></div>
                              <div class="stop-value">Stop:0</div>
                              <div class="cabinclass hide">Economy</div>
                          </div>
                      </div>
                      <div class="col-xs-3 nopad quarter_wdth">
                          <div class="insidesame">
                              <span class="fatv hide">0645</span>
                              <div class="f-a-t bigtimef">${dTime}</div>
                              <div class="to-loc smalairport">${flights.FlightDetails.Details[0][0].Destination.AirportName} (${flights.FlightDetails.Details[0][0].Destination.AirportCode})</div>
                              <div class="smalairport_code">${flights.FlightDetails.Details[0][0].Destination.AirportCode}</div>
                              <span class="arr_dt hide" data-category="2" data-datetime="1592356500000"></span>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xs-4 nopad wayfour full_same">
                  <span class="hide stp" data-stp="0" data-category="1"></span>
                  <div class="priceanbook">
                      <div class="col-xs-6 nopad wayprice">
                          <div class="insidesame">
                              <div class="priceflights"><strong> Rs </strong><span class="f-p">${flights.Price.TotalDisplayFare}</span></div>
                              <span class="hide price" data-price="1199" data-currency="Rs"></span>
                              <div data-val="1" class="n-r n-r-t">${refund}</div>
                          </div>
                      </div>
                      <div class="col-xs-6 nopad waybook">
                          <div class="form-wrapper bookbtlfrt">
                              <a class="b-btn bookallbtn" href="flight-detailed.html?resultToken=${flights.ResultToken}">Book Now</a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="clearfix"></div>
              <div class="mrinfrmtn">
                  <a class="detailsflt iti-btn" data-toggle="modal" id="delete_model_btn" data-id="${flights.FlightDetails.Details[0][0].Attr.AvailableSeats}" data-target="#FMmodal${id}">
                      <span class="fal fa-info-circle fldetail"></span>Flight Details </a>
                  <i>SME Fare</i>
              </div>
          </div>
      </div>
  </div>
  <div class="modal fade" id="FMmodal${id}" role="dialog">
      <div class="modal-dialog modal-lg">
          <!-- Modal content-->
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">${flights.FlightDetails.Details[0][0].Origin.AirportName} <span class="fa fa-long-arrow-right"></span> ${flights.FlightDetails.Details[0][0].Destination.AirportName}</h4>
              </div>
              <div class="modal-body">
                  <div role="tabpanel">
                      <!-- Nav tabs -->
                      <ul class="nav nav-pills" role="tablist">
                          <li role="presentation" class="active"><a href="#uploadTab${id}" aria-controls="uploadTab" role="tab" data-toggle="tab">Itinerary</a></li>
                          <li role="presentation"><a href="#browseTab${id}" aria-controls="browseTab" role="tab" data-toggle="tab">Fare Details</a></li>
                      </ul>
                      <!-- Tab panes -->
                      <div class="tabmarg">
                          <div class="tab-content">
                              <div role="tabpanel" class="tab-pane active" id="uploadTab${id}">
                                  <div class="alltwobnd">
                                      <div class="col-xs-8 nopad full_wher">
                                          <div class="inboundiv seg-0">
                                              <div class="hedtowr"> ${flights.FlightDetails.Details[0][0].Origin.AirportName} to ${flights.FlightDetails.Details[0][0].Destination.AirportName} <strong>(${showtume})</strong></div>
                                              <div class="flitone">
                                                  <div class="col-xs-4 nopad5">
                                                      <div class="imagesmflt"><img alt="G8 icon" src="${airpath}${flights.FlightDetails.Details[0][0].OperatorCode}.gif" /></div>
                                                      <div class="flitsmdets">Goair<strong>G8 423 </strong></div>
                                                  </div>
                                                  <div class="col-xs-6 nopad5">
                                                      <div class="col-xs-5 nopad5">
                                                          <div class="dateone">${oTime}</div>
                                                          <div class="dateone">${oDate}</div>
                                                          <div class="termnl">${flights.FlightDetails.Details[0][0].Origin.AirportName} (${flights.FlightDetails.Details[0][0].Origin.AirportCode})</div>
                                                      </div>
                                                      <div class="col-xs-2 nopad">
                                                          <div class="arocl fa fa-long-arrow-right"></div>
                                                      </div>
                                                      <div class="col-xs-5 nopad5">
                                                          <div class="dateone">${dTime}</div>
                                                          <div class="dateone">${dDate}</div>
                                                          <div class="termnl">${flights.FlightDetails.Details[0][0].Destination.AirportName} (${flights.FlightDetails.Details[0][0].Destination.AirportCode})</div>
                                                      </div>
                                                  </div>
                                                  <div class="col-xs-2 nopad5">
                                                      <div class="ritstop">
                                                          <div class="termnl">${showtume}</div>
                                                          <div class="termnl1">Stop : 0</div>
                                                      </div>
                                                  </div>
                                                  <span style="float: left;"><b></b></span>
                                                  <div class="Baggage_block">
                                                      <div class="termnl1 flo_w">
                                                          <em><i class="fa fa-suitcase bag_icon"></i>${flights.FlightDetails.Details[0][0].Attr.Baggage}</em>
                                                      </div>
                                                      <div class="termnl1 flo_w">
                                                          <em><i class="air_seat timings icseats"></i>${flights.FlightDetails.Details[0][0].Attr.AvailableSeats}</em>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="col-xs-4 nopad full_wher">
                                          <div class="inboundiv sidefare">
                                              <h4 class="farehdng">Total Fare Breakup</h4>
                                              <div class="inboundivinr">
                                                  <div class="rowfare">
                                                      <div class="col-xs-8 nopad"><span class="infolbl">Total Base Fare</span></div>
                                                      <div class="col-xs-4 nopad"><span class="pricelbl">${flights.Price.PriceBreakup.BasicFare}</span></div>
                                                  </div>
                                                  <div class="rowfare">
                                                      <div class="col-xs-8 nopad"><span class="infolbl">Taxes &amp; Fees</span></div>
                                                      <div class="col-xs-4 nopad"><span class="pricelbl">${flights.Price.PriceBreakup.Tax}</span></div>
                                                  </div>
                                                  <div class="rowfare grandtl">
                                                      <div class="col-xs-8 nopad"><span class="infolbl">Grand Total</span></div>
                                                      <div class="col-xs-4 nopad"><span class="pricelbl">${flights.Price.TotalDisplayFare}</span></div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div role="tabpanel" class="tab-pane" id="browseTab${id}">
                                  <div class="text-center" id="dynResponse${id}">Please Wait</div>
                                  <input type="hidden" value="${flights.ResultToken}" id="dyninp${id}" />
                                  <div class="i-s-s-c tabmarg">
                                      <div class="col-xs-12 nopad" id="fareid${id}" style="display: none;">
                                          <div class="inboundiv splfares">
                                              <h4 class="farehdng">Fare Rules</h4>
                                              <div class="flight-fare-rules rowfare">
                                                  <div class="lablfare">${flights.FlightDetails.Details[0][0].Origin.AirportName} <span class="fa fa-long-arrow-right"></span> ${flights.FlightDetails.Details[0][0].Destination.AirportName}</div>
                                                  <div class="feenotes" id="feenote${id}"></div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`;
    };
  
  
  
  
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            vars[key] = value;
        });
        return vars;
    }
  });