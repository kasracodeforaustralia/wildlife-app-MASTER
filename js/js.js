// global variables
comeFromMap = 0; //if this variable is equal to 1, #btns should be shown otherwise it's hidden
var noOrFAid; // this variable says what to do when DONE (in panel.php) is pressed.
var leftArrowVisibility = 0; //this var determines where this icon should be shown and what should be done based on that

//var addresses = []; // Keeps the addresses of the wildlife centers
//var LatLngs = [] // Keeps lat and lng of markers
//var centersInDb = [] // keeps all details of centers which retrived from DB

var icons = []; // Keeps the wildlife speciallities to set the icons based on that
var tmp = 'home'; // possible values for this var are: home/isLive/WhatHapn/
var LandRiverSeaSky = 'commonSpecies';
var moreLessText = 'more';
var Wname;
var imgSource;
var imgQuestionOrText = 'Is animal alive?';
var firstAidAdvice = "<p><b>Caution!</b> This animal may be dangerous.<br>Stay calm, speak softly and move slowly to avoid distress to the animal.<br>Do not approach the animal or attempt to catch it - chasing it may result in a worse injury and unnecessary stress for the animal. Secure the area and try to prevent pets or other people from approaching the injured animal.<br>Call a licenced wildlife shelter to capture the animal or call DELWP on 136 185 to be put in touch with a Wildlife Officer.<br>In the event of a traffic collision or an animal on the road, the police can also be contacted on 000 for assistance. Check the area to make sure a pouch young has not been thrown out during the collision. dddd dddddddddddddddd ddddddddddddddddd dddddddd d  ddddddddddd dddddddddd ddddd d ddddddd ddddd dddddddd dddddd ddddddd dddd dddddddd ddddddd ddddddd ddddddddd ddddddd dddd dddddddddddddddd ddddddddddddddddd dddddddd d  ddddddddddd dddddddddd ddddd d ddddddd ddddd dddddddd dddddd ddddddd dddd dddddddd ddddddd ddddddd ddddddddd ddddddddddd dddddddddddddddd ddddddddddddddddd dddddddd d  ddddddddddd dddddddddd ddddd d ddddddd ddddd dddddddd dddddd ddddddd dddd dddddddd ddddddd ddddddd ddddddddd ddddddddddd dddddddddddddddd ddddddddddddddddd dddddddd d  ddddddddddd dddddddddd ddddd d ddddddd ddddd dddddddd dddddd ddddddd dddd dddddddd ddddddd ddddddd ddddddddd ddddddddddd dddddddddddddddd ddddddddddddddddd dddddddd d  ddddddddddd dddddddddd ddddd d ddddddd ddddd dddddddd dddddd ddddddd dddd dddddddd ddddddd ddddddd ddddddddd ddddddddddd dddddddddddddddd ddddddddddddddddd dddddddd d  ddddddddddd dddddddddd ddddd d ddddddd ddddd dddddddd dddddd ddddddd dddd dddddddd ddddddd ddddddd ddddddddd ddddddddddd dddddddddddddddd ddddddddddddddddd dddddddd d  ddddddddddd dddddddddd ddddd d ddddddd ddddd dddddddd dddddd ddddddd dddd dddddddd ddddddd ddddddd ddddddddd ddddddddddd dddddddddddddddd ddddddddddddddddd dddddddd d  ddddddddddd dddddddddd ddddd d ddddddd ddddd dddddddd dddddd ddddddd dddd dddddddd ddddddd ddddddd ddddddddd ddddddd</p>";

var deadTxt ="Unfortunately, at this stage, if the animal is not alive, not much can be done, other that removing the animal from dangerous locations such as the road. <br> Please remain calm, do not call the police. Make sure the scene is safe for others and move on.<br> If you would like to inform DELWP, please call this number and someone will note the location of the animal. <br> <a href='136 186'><u>136 186</u> </a>";

//____________________
var winWidth; 
var winHeight; 
var panelPos; 

$(document).ready(function(){
    initMap();
    winWidth = $(document).width();
    winHeight = $(document).height();
    panelPos = winWidth*0.96;
    //defaul position of the panel
    $('.panel').animate({
        width: panelPos,
        right: -panelPos
    });    
    
});
$(window).resize(function(){
    winWidth = $(document).width();
    winHeight = $(document).height();
    panelPos = winWidth*.96;
    //defaul position of the panel
    $('.panel').animate({
        width: panelPos,
        right: -panelPos
    });  
});

$('#filterMammLand').click(function(){
    $('.commonSpecies,.waterMammals,.birds,.reptilesAmphibians, .introduced, #filterBlackBg , .filterBox').hide();
    $('.land').show();
    LandRiverSeaSky = 'land';
});
$('#filterWaterLand').click(function(){
    $('.commonSpecies,.land,.birds,.reptilesAmphibians, .introduced, #filterBlackBg , .filterBox').hide();
    $('.waterMammals').show();
    LandRiverSeaSky = 'waterMammals';
});

$('#filterReptilesAmphibians').click(function(){
    $('.commonSpecies,.land,.birds,.waterMammals, .introduced, #filterBlackBg , .filterBox').hide();
    $('.reptilesAmphibians').show();
    LandRiverSeaSky = 'reptilesAmphibians';
});

$('#filterBirds').click(function(){
    $('.commonSpecies,.land,.birds,.waterMammals, .introduced, .reptilesAmphibians, #filterBlackBg , .filterBox').hide();
    $('.birds').show();
    LandRiverSeaSky = 'birds';
});
$('#filterIntroSpec').click(function(){
    $('.commonSpecies,.land,.birds,.waterMammals, reptilesAmphibians, #filterBlackBg , .filterBox').hide();
    $('.introduced').show();
    LandRiverSeaSky = 'introduced';
});
$('#filterIdonKnow' ).click(function(){
    alert('Sorry, this button is not working for the moment!');
    $('#filterBlackBg , .filterBox').hide();
});

$('#arrow-down').click(function(){
    
    $('.toggleDiv, #arrow-up').show(1200);
    $('#arrow-down').hide(); 
    //moreLessText = 'less';
    $('#moreLess').text('Less');
    $('body, html').animate({ scrollTop: 1000 }, 1500);
    
});
$('#arrow-up').click(function(){
    $('.toggleDiv').hide(1200);
    $('#arrow-up').hide();
    $('#arrow-down').show();
    //moreLessText = 'more';
    $('#moreLess').text('More');
});
$('#moreLess').click(function(){
    if($('#moreLess').text() === 'More'){
       $('#arrow-down').click(); 
    }else if($('#moreLess').text() === 'Less'){
        $('#arrow-up').click();
    }
});

 // -------------------------------------

function liveDead(src, txt){
    $('#WS, .cont, .land, .waterMammals, .birds, .introduced, .reptilesAmphibians, #arrow-down, #arrow-up, #moreLess, #underUtility').hide();
    $('#liveDead').show();
    
    tmp = 'isLive';
    
    if(tmp == 'isLive'){
        leftArrowVisibility = 1;
        imgQuestionOrText = 'Is animal alive?';
    } else if(leftArrowVisibility == 'whatHapn'){
        leftArrowVisibility = 2;
        imgQuestionOrText = 'What has happened?';
    } else if( leftArrowVisibility == 'map'){
        leftArrowVisibility = 3;
        imgQuestionOrText= 'First Aid Advice';
    }
    
    if(comeFromMap==1){$('#btns').show(); comeFromMap =0; }
    
    imgSource = src;
    var srcArr = imgSource.split('/');
    var source = 
        srcArr[(srcArr.length-4)] +'/'+
        srcArr[(srcArr.length-3)] +'/'+
        srcArr[(srcArr.length-2)] +'/'+ srcArr[(srcArr.length-1)];
    //$("#insIMG").append("<img class='theImg' src='" + source + "'>");
    
    
    Wn = (srcArr[(srcArr.length-1)].slice(0, -4)).replace(/\%20/g, ' ');
    
    //console.log(srcArr[(srcArr.length-1)].slice(0, -4));
    
    $(".imgQuestion").append( Wn+ '<br> '+ txt);
    $('#leftArrow').show();
}

$('#leftArrow').click(function(){
    if(leftArrowVisibility ==1){ 
        
        $('.cont, #arrow-down , #moreLess, #WhatSpe, #srch, #underUtility').show();
        $('#liveDead, .toggleDiv, #leftArrow').hide();
        
        if( LandRiverSeaSky== 'commonSpecies' ){        
            $('.commonSpeices').show();
            $('.land,.waterMammals,.reptilesAmphibians,.introduced, .birds').hide();
        }else if( LandRiverSeaSky== 'land' ){        
            $('.land').show();
            $('.commonSpecies,.waterMammals,.birds,.reptilesAmphibians, .introduced').hide();
        }else if( LandRiverSeaSky== 'waterMammals' ){        
            $('.waterMammals').show();
            $('.commonSpecies,.land,.birds,.reptilesAmphibians, .introduced').hide();
        }else if( LandRiverSeaSky== 'birds' ){        
            $('.birds').show();
            $('.commonSpecies,.waterMammals,.land,.reptilesAmphibians, .introduced').hide();
        }else if( LandRiverSeaSky== 'reptilesAmphibians' ){        
            $('.reptilesAmphibians').show();
            $('.commonSpecies,.waterMammals,.birds,.land, .introduced').hide();
        }else if( LandRiverSeaSky== 'introduced' ){        
            $('.introduced').show();            $('.commonSpecies,.waterMammals,.birds,.land, .reptilesAmphibians,').hide();
        }
        
        $('#moreLess').text('more');
        $('.theImg').remove();
        $(".imgQuestion").empty();
        
       // liveDead(imgSource,imgQuestionOrText);
        
        //checkRadioBtn();
        leftArrowVisibility =0;
        tmp ='home';
    } else if(leftArrowVisibility ==2){
        //console.log('leftArrow2: ' +leftArrowVisibility);
        
        $('#btns, #leftArrow, #liveDead, .bckNxt, .footer').show();
        $('#whatHapn').hide();
        $(".imgQuestion").empty();
        liveDead(imgSource,imgQuestionOrText);
        leftArrowVisibility =1;
        tmp ='isLive';
    }else if(leftArrowVisibility ==3){
        //console.log('leftArrow3: ' +leftArrowVisibility);
        
        $(' #map-canvas, #mapFooter').hide();
        $('#liveDead, #whatHapn, .footer').show();
        //$('body').css('overflow', 'auto');

        leftArrowVisibility =2;
        tmp ='whatHapn';
    }
});


$('#yes, #donKnow').click(function(){
    $('#btns, .footer, #leftArrow').hide();
    var src = $('.theImg').attr('src');
    $('.theImg').remove(); $(".imgQuestion").empty();
    liveDead(imgSource, 'What has happend?');
    $('#whatHapn').show(); 
    leftArrowVisibility =2;
    tmp ='whatHapn';
});

$('#no').click(function(){
    //noOrFAid ='no';
    //getCoordinates('3 Point Addis Rd');
    var src = $('.theImg').attr('src');
    var src = imgSource;
    Wname = getWildlifeName(src);
    
    //imgSource = "<img src='img/wildlife/" + Wname + "' class='theImg' >";
    
    $("#panelIMG >img").remove();
    //$("#panelIMG").html(imgSource);
    $("#panelTxt").empty();
    wnArr= Wname.split('/');
    $("#panelTxt").html(wnArr[1].slice(0, -4));
    $('#firstAidAdvice').html(deadTxt); 

    $('.shelter, .keys, .centers').hide();
    $('.firstAidOrDead').show();
    $('.panel').show();
    $( ".panel" ).animate({right: 0}, 700);
    
    setFooterHeight(56);
});

function getWildlifeName(src){
// this func returns the name of the species from it's image url
    var srcArr = src.split('/');    
    var Wn = srcArr[(srcArr.length-2)] +'/'+srcArr[(srcArr.length-1)].replace(/\%20/g, ' '); 

    return  Wn   
}


$('.close').click(function(){
    $( ".panel" ).animate({right: (-panelPos)}, 700, function(){
        $( ".panel" ).hide();
    });
});
$('#closeMapMenu').click(function(){
    $('#mapModal').toggle(500);
    $('#mapMenuModal').toggle(500);
});
$( "#FAid, #mapFA" ).click(function(){
    //noOrFAid ='FAid';
    var src = imgSource;
    Wname = getWildlifeName(src);
    wnArr = Wname.split('/');
    
    $("#panelIMG >img").remove();
    $("#panelIMG").html(imgSource);
    var txt = "<br> First Aid Advice.";
    $("#panelTxt").empty();
    $("#panelTxt").html(wnArr[1].slice(0, -4) + txt);
    $('#firstAidAdvice').html(firstAidAdvice); 

    $('.firstAidOrDead').show();
    $('.keys, .centers, .shelter').hide();
    
    $('.panel').show();
    $( ".panel" ).animate({right: 0}, 700);
    setFooterHeight(56);
});

$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
         $( ".panel" ).animate({right: (-panelPos)}, 700, function(){ $( ".panel" ).hide();});
         
    }
});

$('#done').click(function(){
    $( ".panel" ).animate({right: (-panelPos)}, 700, function(){ $( ".panel" ).hide(); });
    
    if(noOrFAid == 'FAid'){
        alert('Hide exteral elements and show the Map!');
    }
});
$('#Kdone, #Cdone, #sdone').click(function(){
    $( ".panel" ).animate({right: (-panelPos)}, 700, function(){ $( ".panel" ).hide();});
    
});

$('#DesOrOpen').click(function(){
    if($('#divTxt').text() =='Opening Hours'){
        $('#divTxt').text('Description');
        
        $('#DesArrow').hide();
        $('#OpenHArrow').show();
        
        $('#shelterDes').hide(1000);
        $('#openingHours').show(1000);
        $('#hr').show();
        
    }else if($('#divTxt').text() =='Description'){
        $('#divTxt').text('Opening Hours');
        
        $('#OpenHArrow').hide();
        $('#DesArrow').show();
        $('#hr').hide();
        
        $('#shelterDes').show(1000);
        $('#openingHours').hide(1000);
    }
    
});

$('.Qbtns').click(function(){
    $('#liveDead, #whatHapn, .footer').hide();
    $('#map-canvas, #mapFooter, #mapModal, #LocationBox').show();
    resizeMap();
    
    plotMarkers(); 
    
    // set the width of the search field dynamically
    $('.searchInput').animate({
        width: ($(window).width()*0.50)
    });
    /*$('#Pcode').animate({
        paddingLeft: ( ($(window).width()*0.83-($('.searchBtn').width()+$('.searchInput').width()) )/4 )
    });*/ 
    $('.titlePane').animate({height: '25px'});

    leftArrowVisibility =3;
    tmp ='map';
});

$('#listicon-alt').click(function(){
    $('#mapMenu').toggle(250);
    $('#listicon').toggle(400);
    $('#mapLoc').toggle(550);
    $('#mapKey').toggle(700);
    $('#mapFA').toggle(850);

});
$('#mapKey').click(function(){
    $('.firstAidOrDead, .shelter, .centers').hide();
    $('.keys').show();
    $('.panel').show();
    $( ".panel" ).animate({right: 0}, 700); 
    
    setFooterHeight($('.keysFooter').height());
});
$('#mapMenu').click(function(){
    $('#mapModal').toggle(500);
    $('#mapMenuModal').toggle(500);   
});

$('#mapCenters').click(function(){
    $('.firstAidOrDead, .shelter, .keys').hide();
    $('.centers').show();
    $('.panel').show();
    $( ".panel" ).animate({right: 0}, 700);    
});

$('#mapHome').click(function(){
    $('.firstAidOrDead, #leftArrow, .shelter, .keys, #map-canvas, .centers, .toggleDiv, #mapMenu, #mapMenuModal, #mapKey, #mapModal, #mapLoc, #mapFA, #mapFooter').hide();
    $('.theImg').remove(); $(".imgQuestion").empty();
    $('.cont, #arrow-down, #underUtility, #moreLess').show(); 
    
    if( LandRiverSeaSky== 'commonSpeices' ){        
        $('.commonSpeices').show();
        $('.reptilesAmphibians,.waterMammals,.birds,.land, .introduced').hide();
    }else if( LandRiverSeaSky== 'land' ){        
        $('.land').show();
        $('.commonSpecies,.waterMammals,.birds,.reptilesAmphibians, .introduced').hide();
    }else if( LandRiverSeaSky== 'waterMammals' ){        
        $('.waterMammals').show();
        $('.commonSpecies,.reptilesAmphibians,.birds,.land, .introduced').hide();
    }else if( LandRiverSeaSky== 'birds' ){        
        $('.birds').show();
        $('.commonSpecies,.waterMammals,.reptilesAmphibians,.land, .introduced').hide();
    }else if( LandRiverSeaSky== 'reptilesAmphibians' ){        
        $('.reptilesAmphibians').show();
        $('.commonSpecies,.waterMammals,.birds,.land, .introduced').hide();
    }else if( LandRiverSeaSky== 'introduced' ){        
            $('.introduced').show();            $('.commonSpecies,.waterMammals,.birds,.land, .reptilesAmphibians').hide();
        }
    
    //$('body').css('overflow', 'auto');
    comeFromMap = 1;
    //checkRadioBtn();
    
    leftArrowVisibility =0;
    tmp ='home';
    
});
 $('#mapModalClose').click(function(){
     $('#mapModal, #LocationBox').hide();
 });
$('#mapYes').click(function(){
    centersDetails = []; //empty this array
    $('#mapModal, #LocationBox').hide();
    $('.firstAidOrDead, .keys, .shelter').hide();
    navigator.geolocation.getCurrentPosition(showPosition);
    
    //if(ifShowPosWorks == 0){
       //IPaddressLocator(); 
    //}
    
});

$('#listicon').click(function(){
    //$('#mapModal, #LocationBox').show();
    $('#mapModal, #LocationBox').hide();
    $('.firstAidOrDead, .keys, .shelter').hide();
    $('.centers, .panel').show();
    $( ".panel" ).animate({right: 0}, 700);
});

$('#mapLoc').click(function(){
    $('#mapModal, #LocationBox').show();
});

$('.centersRow').click(function(){
    var imgTag = $(this).find('img').attr('src');
    var spanTag = $(this).find('span').text();
    var spTag = spanTag.replace(/\d+([)]\d+)?/g, '');
    
    var srcArr = imgTag.split('/');
    
    makeShelterPage(srcArr[(srcArr.length-1)], spTag)

    $('.firstAidOrDead, .keys, .centers').hide();
    $('.shelter').show();
    $('.panel').show();
    $( ".panel" ).animate({right: 0}, 700);
    
});

/*
function checkRadioBtn(){
    if(LandRiverSeaSky == 'land'){
        $('#rdo-land').prop("checked", true);
        $('.land').show();
        $('.sea, .river, .sky').hide();
    }else if(LandRiverSeaSky =='sea'){
        $('#rdo-sea').prop("checked", true);
        $('.sea').show();
        $('.land, .river, .sky').hide();
    }else if(LandRiverSeaSky=='river'){
        $('#rdo-river').prop("checked", true);
        $('.river').show();
        $('.sea, .land, .sky').hide();
    } else if(LandRiverSeaSky =='sky'){
        $('#rdo-sky').prop("checked", true);
        $('.sky').show();
        $('.sea, .river, .land').hide();
    }else{
        $('#rdo-land,#rdo-sea,#rdo-sky,#rdo-river').prop("checked", false);
    }
}
*/
$('#locBoxSrch').click(function(){
    $('#LocationBox').show();
});

$('.AutoUL').on('mouseover', '.AutoLi' ,function(){
    $(this).css({'backgroundColor':'#cfcfcf'})
});
$('.AutoUL').on('mouseout', '.AutoLi' ,function(){
    $(this).css({'backgroundColor':'#FFF'})
});
$('.AutoUL').on('click', '.AutoLi', function(){
    autoCompFunc($(this).text())
});
function autoCompFunc(text){
    $('#srch').val( text);
    $('#species').html('');
    CName = (text.split(' - ') );
    Wname = CName[0];
    
    liveDead('img/wildlife/any/'+CName[0]+'.png', 'Is animal alive?');   
}
$('#warnFooter').click(function(){ $('.warning').hide(); });
$('#XIdonKnow').click(function(){ $('.warning').hide(); });

$(document).keydown(function (e) {
  if (e.keyCode == 13) {
    $('.warning').hide();
  }
});

$('#filter').click(function(){
    $('#filterBlackBg, .filterBox').show();
    $('#filterTitle').css({
        marginLeft: ( ($('#filterHead').width() -$('#filterTitle').width() )/2  )
    });
});
$('#filterDone').click(function(){
    $('#filterBlackBg , .filterBox').hide();
});

$('#mylist img').bind('click', function(){
    alert( $('#mylist img').index(this) );
});


$(document).on('click', '.sss', function(e){
    //console.log($(this).attr('id') ); 
    var id = $(this).attr('id');
    $.each(centersDetails, function( i, val ) {
      if(val.user_id == id ){
          
          var iconUrl = iconIdentifier(val.spec);
          makeShelterPage(iconUrl,val.org_name);
      }

    });
    
    $( ".panel" ).animate({right: -($(window).width()*0.95) }, 700, function(){
        $('.centers').hide();
        $('.firstAidOrDead, .keys').hide();
        $('.shelter').show();
        $( ".panel" ).animate({right: 0}, 700);
    });

    //console.log($(e.currentTarget).attr('id') );
});
$('#bdone').click(function(){
    $( ".panel" ).animate({right:-($(window).width()*0.95) }, 700, function(){
        $('.shelter, .firstAidOrDead, .keys').hide();
        $('.centers').show();
        $( ".panel" ).animate({right: 0}, 700);
    });
});

function appendListOfClosestCentersToPanel(user_id, iconURL,orgName, contactNo){
    
    $(".centersContent").append(
        "<div class='sss row' id='"+user_id+"'>" +
            "<div class='col s5 m5 l5'>" +
                "<div>" +
                    "<img class='CCIMG' src=' " + iconURL + "'>" +
                "</div>" +
            "</div>" +
            "<div class='col s7 m7 l7'>" +
                "<div class='fontCol' style='font-size:16px; font-weight:bold; padding:5% 12% 0% 0%'>"+
                    "<div>"+
                        "<span >"+orgName +"</span>"+
                    "</div>" +
                    "<div><a href=' " +contactNo +">"+
                        "<span class='fontCol;'>"+contactNo +
                        "</span></a>"+
                    "</div>" +
                "</div>"+
            "</div>" +    
            
            
        "</div> <hr>");
}



function makeShelterPage(src, cntrNme){
    if($("#Cimage").find('img')){
        $("#Cimage > img").remove();
    }
    $("#Cimage").append("<img style='width:100%; padding:0% 0% 30% 15%;' src='" + src + "'>");
    $('#Cname').text(cntrNme);
}


$('#IdonKnow').click(function(){
    $('#warnBox').hide();
    $('.warning, #blackBg, #IdonKnowBox').show();
});



/*
"<div class='col s2 m2 l2'>"+
                "<div >"+
                    "<img class='CCIMGI'"+ "src='img/keys/informationicon.png'>"+
                "</div>"+
            "</div>"+
            */


$('#trapezoidMenu').click(function(){
    $('#wrapper').animate({left:- ($(window).width()*.85 ), right:( $(window).width()*.85 )}, 700);   
});

$('#closeMenu').click(function(){
    console.log('Ya Ahmad Al Hassan');
    $('#wrapper').animate({left:0, right:0}, 700);   
});




























