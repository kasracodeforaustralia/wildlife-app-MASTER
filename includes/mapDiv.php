
    <!--div id="mapDiv"-->
    <div id="map-canvas">
    </div>  
    <!-- This section will be shown when the mapDiv page is loaded -->        
        <div id="mapModal">

        </div>        
        <div id="LocationBox">
            <div style="position:absolute; right: 4%; top:1.5%;">
                <span id="mapModalClose" style="font-size:22px;">X</span>
            </div>

            <div class="mapDGeoQ" >
                <br>
                <span style="font-weight:bold; font-size:110%; color:#00b7bd;">Can we use your current location?</span>
            </div>
            <div class="mapDGeoQ">
                <a id="mapYes" class="waves-effect waves-light btn buttons" style="width:40%; font-size:100%;" >Yes</a>
            </div>
            <div class="mapDGeoQ">
                <span style="font-weight:bold; font-size:110%; color:#00b7bd;">Or enter your address bellow</span>
            </div>
            <div style="text-align:center;">
                <input type="text" id="Pcode" placeholder="Postcode.." style="text-align:center; color:black;">
            </div>
            <div>
                 <!--a id="" class="waves-effect waves-light btn buttons" style=" font-size:80%;" >Show all Wildlife Centers</a-->
            </div>
            
        </div>
        <!--?php include('includes/mapMenuModal.php');?-->
    
        <div class="row" id="mapFooter">
            <!-- First Aid Button -->
            <div class="row" style="bottom:4%;">
                <div class="col s12 m12 l12">
                    
                    <!--div>
                        <img class=" MFB" id="listicon-alt" src="img/keys/listicon-alt.png">
                    </div-->
                    <div>
                        <img class=" MFB" id="mapLoc" src="img/keys/location.png">
                    </div>
                    <div>
                        <img class=" MFB" id="listicon" src="img/keys/list.png">
                    </div>
                    <!--div>
                        <img class=" MFB" id="mapKey" src="img/keys/keyicon-alt.png">
                    </div-->
                    <div>
                        <img class=" MFB" id="mapFA" src="img/keys/firstaid.png">
                    </div>
                    
                </div>
  

            </div>

 
        </div>
        
        
    <!--/div-->