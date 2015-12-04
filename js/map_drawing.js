var canvas;
var stage;
var footprinturl = "/maps/footprint.png";
var cluearea;
var curBuilding;
var curFloor;
var data = {
    data: {
      paths: [
      [],
      ],
      id:[],
      feature:[],
    }
  };
var exited = false;
var nearlift = false;
var nearstair = false;
var nearexit = false;
var nearhall = false;
//mcx: x-1, dcx: x+3
var stairsList = [[[253.34592847039806,126.16112970369765],[877.1896679463864,119.76165211003183],[823.8498686603353,137.1316627214105],[869.0727419680743,215.75381601501917],[921.2529804000808,310.8317688351971],[1018.6560921398262,522.9287405109786],[835.4454772007813,632.634070688107],[239.43119822186299,618.0066933311566],[138.54940391998383,303.51808015672185],[201.16569003839157,127.98955187331646],[491.0559035495386,348.31442331238264],[870.2323028221189,216.66802709982858]],
                  [[129.125841146334,318.796992481203],[252.18636761635346,149.01640682393273],[835.4454772007813,148.10219573912332],[913.1360544217687,364.7702228389519],[820.3711860982016,656.4035588931515],[251.02680676230887,644.5188147906293]],
                  [[106.08170000673536,150.84482899355154],[710.2129049639658,151.75904007836093],[770.5100693742843,375.74075585666475],[691.6599312992523,673.7735695045302],[103.76257829864619,660.0604032323891]],
                  [[136,761.33],[796.53,767.34],[124.63467367144877,168.2148396049302],[821.5307469522462,168.2148396049302],[851.6793291574055,444.30658721736995]],
                  [[340.9647481933025,882.6638023630505],[338.62828965969624,488.453276047261],[78.50257291819817,504.54350161117077],[73.05083633978354,878.0665950590762],[690.5003704452077,546.3978450738715],[688.1812487371186,841.2570402416129],[885.3065939246985,844.0519141294587],[886.4661547787432,547.7952820177944],[927.0507846703038,118.78214023345032],[976.911901394221,191.44886131744346],[980.3905839563548,519.8465431393355],[981.5501448103994,866.4109052322259],[980.3905839563548,990.782793241368]],
                  [[66.65663096921936,533.820912578565],[65.49707011517478,913.923761325606],[128.11335623358255,874.7955268957636],[339.15343166969757,916.7186352134519],[392.49323095574863,877.5904007836094],[576.8634067488381,825.8852338584605],[671.9473967804944,874.7955268957636],[870.2323028221189,877.5904007836094],[997.7839967670236,1025.7187168394416],[1000.1031184751128,905.5391396620684],[998.9435576210682,543.6029711860256],[1000.1031184751128,209.61554158844174],[946.7633191890617,117.38470328952738],[870.2323028221189,567.3593992327156],[671.9473967804944,565.9619622887927],[576.8634067488381,619.0645661578646],[394.81235266383777,571.5517100644845],[339.15343166969757,535.2183495224879]],
                  [[71.49319731737936,533.2760472610097],[66.82028025016682,917.1428571428571],[90.96368509743161,874.6186895810956],[341.7435677045046,537.8732545649839],[371.33870913018404,575.8002148227712],[338.62828965969624,917.1428571428571],[364.3293335293652,875.7679914070892],[567.6012259531108,624.0708915145005],[563.7071283971003,833.2438238453276],[658.7231087637552,574.6509129967776],[664.1748453421699,883.813104189044],[871.3408353219259,873.469387755102],[869.0043767883195,581.546723952739],[991.2790400470477,541.3211600429646],[989.7214010246436,210.32223415682063],[985.8273034686331,907.9484425349087],[996.7307766254623,1026.3265306122448]]
                  ];
var liftList = [[[288.1327540917357,40.22528773161374],[319.4408971509396,40.22528773161374],[763.5527042500169,696.6288466247653],[792.5417256011315,697.5430577095747]],
                [[284.65407152960194,56.681087258183],[314.80265373476124,58.50950942780181]],
                [[142.0280864821176,59.42372051261121],[169.8575469791877,59.42372051261121],[660,751]],
                [[168.69798612514313,63.08056485184883],[202.32525089243617,62.16635376703942]],
                [[712.5320266720549,598.1030119990204]],
                [[725.2871960665454,621.8594400457105]],
                [[710.1251965030932,620.6229860365198]]];
var exitList = [[[881.8279113625648,128.90376295812587],[1022.1347747019599,526.5855848502163],[178.654,126.315]],
                [[891.5901426131802,674.5435016111708],[204.64437260052534,77.70794220879928],[195.36788576816863,142.61692923026692],[878.349228800431,132.56060729736348],[979.2310231023102,363.8560117541425],[1037.2090658045397,548.526650885642],[213.92085943288205,661.8888254020079]],
                [[30,47]],
                [[13,37]],
                [[1009.1918888046957,567.7551020408164],[627.8840843268,855.2314096808424],[625.5649626187109,532.423475634642],[997.7839967670236,831.4749816341523],[903.859567589412,311.62843849481675],[903,241],[903.859567589412,160.70524855113868],[905.0191284434566,81.05134274753081]],
                [[926.63,48.72]],
                [[935,40]]
                ];
var tim_hortons = [[],[],[],[],[[970.0893719806763,312.5193098072562],[590.6304347826086,553.936543367347]],[],[]];
var printer = [[],[],[],[],[[392.45410628019323,694.6621669501134]],[],[]];
var bathroom = [[[970.7391304347825,545.6774376417234],[827.1425120772947,700.7794784580499],[303.43719806763283,653.6139455782313],[255.3550724637681,46.81122448979592],[793.3550724637681,109.39625850340136]],
[[239.76086956521738,63.13775510204081],[791.4057971014493,117.55952380952381],[826.4927536231884,727.9903628117913],[293.69082125603865,670.8475056689342]],
[[102.66183574879227,46.81122448979592],[155.94202898550725,697.1513605442177],[695.2415458937198,743.4098639455782],[660.1545893719806,118.46655328798185]],
[[109.80917874396135,60.416666666666664],[762.8164251207729,143.86337868480726],[179.33333333333331,785.1332199546486]],[[936.3019323671497,648.562393707483],[484.07004830917873,809.9116000566894]],[[283.94444444444446,832.9614866780046],[292.39130434782606,613.3809878117913],[998.0289855072464,604.8889243197278],[994.7801932367149,828.108878968254]],[[278.7463768115942,607.3152281746031],[279.3961352657005,836.6009424603175],[996.0797101449275,841.4535501700681],[988.9323671497584,598.8231646825396]]];
var dc1350=[780,820];
var isfirst = true;

var stair_num = 0;
var elevator_num = 0;
var exit_num = 0;
var neartim = false;
var nearprinter = false;
var nearbathroom = false;
var wakingdis = 0;
var keepinside = true;




$(document).ready(function() {
  canvas = document.getElementById("map");
  //cluearea = document.getElementById("clue");
  stage = new createjs.Stage(canvas);
  $("#Search_btn").on("click", search);
  $("#Finish_btn").on("click", submitroute);
  $("#map").on("click", clickMap);
  $("#submit_btn").on("click", submittoServer);
  $("#goup").on("click", upstairs);
  $("#godown").on("click", downstairs);
  $("#goexit").on("click", exitbuilding);
  $("#goenter").on("click", enterbuilding);
  $("#findroute_btn").on("click", findroute);
  var map = new createjs.Bitmap("/maps/map_colour.png");
  stage.addChild(map);
  map.image.onload = function() { stage.update(); };
  stage.update();
});

function findroute(event){
  var survey = [];
  var day = new Date();
  var myid = day.getTime();
  survey.push(myid);
  for(var i = 9; i < 21; i++){
    var results = document.getElementsByName("qu"+i);
    var getN;
    for(var j = 0; j < results.length; j++){
      if(results[j].checked)
        getN = results[j].value;
    }
    survey.push(getN);
  }
  console.log("getn"+survey);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', "/getpath");
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () { // 处理函数
    if (xhr.readyState == 4 && xhr.status == 200) {
        location.href="showmap.html?id="+xhr.responseText;
    }
  }
  xhr.send(JSON.stringify(survey));
}

function submitroute(event){
	console.log("finish");
	var xhr = new XMLHttpRequest();
  	xhr.open('POST', "/sendpath");
 	xhr.setRequestHeader('Content-Type', 'application/json');
  	xhr.onreadystatechange = function () { // 处理函数
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
  }
  $.each(data.data.paths, function (i, mypath){
    var lastx = 0;
    var lasty = 0;
    console.log(mypath);
    $.each(mypath, function(k, path){
      $.each(path.pointList, function(j, point){
        if(j == 0){
          lastx = point.x;
          lasty = point.y;
        }else{
          wakingdis += Math.sqrt((point.x - lastx)*(point.x - lastx) + (point.y - lasty)*(point.y - lasty));
          lastx = point.x;
          lasty = point.y;
        }
    });
    });
  });

  data.data.feature.push(stair_num);
  data.data.feature.push(elevator_num);
  data.data.feature.push(exit_num);
  data.data.feature.push(neartim);
  data.data.feature.push(nearprinter);
  data.data.feature.push(nearbathroom);
  data.data.feature.push(wakingdis);
  data.data.feature.push(keepinside);
  xhr.send(JSON.stringify(data));
  var map = new createjs.Bitmap("/maps/thankyou.png");
  map.y = 100;
  stage.removeAllChildren();
  stage.update();
  stage.addChild(map);
  map.image.onload = function() { stage.update(); };
  stage.update();
}

function submittoServer(event){
  var survey = [];
  var day = new Date();
  var myid = day.getTime();
  survey.push(myid);
  for(var i = 9; i < 21; i++){
    var results = document.getElementsByName("q"+i);
    var getN;
    for(var j = 0; j < results.length; j++){
      if(results[j].checked)
        getN = results[j].value;
    }
    survey.push(getN);
  }
  console.log("getn"+survey);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', "/sendsurvey");
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () { // 处理函数
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
  }
  xhr.send(JSON.stringify(survey));
  console.log(myid);
  location.href="index.html?id="+myid;
}
function nearFacility(x, y, floor){
  $.each(tim_hortons[floor], function (i, pos){
    var distance = (pos[0]-x)*(pos[0]-x) + (pos[1]-y)*(pos[1]-y);
    if(distance <= 400){
        neartim = true;
    }
  });

  $.each(bathroom[floor], function (i, pos){
    var distance = (pos[0]-x)*(pos[0]-x) + (pos[1]-y)*(pos[1]-y);
    if(distance <= 400){
        nearbathroom = true;
    }
  });

  $.each(printer[floor], function (i, pos){
    var distance = (pos[0]-x)*(pos[0]-x) + (pos[1]-y)*(pos[1]-y);
    if(distance <= 400){
        nearprinter = true;
    }
  });
}

function canGoup(x, y, floor){
  nearlift = false;
  nearstair = false;
  $.each(stairsList[floor], function (i, pos){
    var distance = (pos[0]-x)*(pos[0]-x) + (pos[1]-y)*(pos[1]-y);
    if(distance <= 400){
        nearstair = true;
        //cluearea.innerHTML="You are close to the STAIRS, you can now click Up/Dn on the left side to go upstairs or downstairs.";
        return true;
    }
  });
  $.each(liftList[floor], function (i, pos){
    var distance = (pos[0]-x)*(pos[0]-x) + (pos[1]-y)*(pos[1]-y);
    if(distance <= 400){
        nearlift = true;
        //cluearea.innerHTML="You are close to the ELEVATOR, you can now click Up/Dn on the left side to go upstairs or downstairs.";
        return true;
    }
  });
  return false;
}

function canExit(x, y, floor){
  nearexit = false;
  nearhall = false;
  $.each(exitList[floor], function (i, pos){
    var distance = (pos[0]-x)*(pos[0]-x) + (pos[1]-y)*(pos[1]-y);
    if(distance <= 400){
        if(floor > 2 || (floor == 2 && curBuilding.valueOf() == "dc".valueOf())) nearhall=true;
        else nearexit = true;
        //cluearea.innerHTML="You are close to an EXIT of building "+curBuilding+" , you can now click Ex on the right side to exit the building.";

    }
  });
}

function downstairs(event){
  if(!(nearlift||nearstair) && !exited) return;
  curFloor -= 1;
  if(curFloor <= 0){
    curFloor += 1;
    return;
  }
  //cluearea.innerHTML="You are now on Floor "+ curFloor + " of "+curBuilding+" building! If you still want to go up/down on the stairs, please keep click the left buttons. If you want to enter this floor, please click the En button first and then click on the map."
  var firstmap = {
    mapURL: "maps/"+curBuilding+curFloor+".png",
    pointList:[]
  }
  $("#stairs-dialog").dialog('close');
  data.data.paths[0].push(firstmap);
  drawAllPaths(data.data);
  if(nearlift)
    elevator_num += 1;
  else if(nearstair)
    stair_num += 1;
}

function upstairs(event){
  if(!(nearlift||nearstair) && !exited) return;
  curFloor += 1;
  if(curBuilding.valueOf() == "mc".valueOf()){
    if(curFloor > 4){
      curFloor -=1;
      return;
    }
  }else{
    if(curFloor > 3){
      curFloor-=1;
      return;
    }
  }
  var firstmap = {
    mapURL: "maps/"+curBuilding+curFloor+".png",
    pointList:[]
  }
  //cluearea.innerHTML="You are now on Floor "+ curFloor + " of "+curBuilding+" building! If you still want to go up/down on the stairs, please keep click the left buttons. If you want to enter this floor, please click the En button first and then click on the map."
  $("#stairs-dialog").dialog('close');
  data.data.paths[0].push(firstmap);
  drawAllPaths(data.data);
  if(nearlift)
    elevator_num += 1;
  else if(nearstair)
    stair_num += 1;
}

function exitbuilding(event){
  if(!(nearexit||nearhall)) return;
  exited = true;
  var lastbuilding = curBuilding;
  var lastfloor = curFloor;
  if(curBuilding.valueOf() == "mc".valueOf()){
    if(curFloor == 1 || curFloor == 2){
      curBuilding = "dc";
      curFloor = 1;
    }else if(curFloor == 3 || curFloor == 4){
      curBuilding = "dc";
      curFloor -= 1;
    }
  }else{
    if(curFloor == 1){
      curBuilding = "mc";
      curFloor = 1;
    }else if(curFloor == 2 || curFloor == 3){
      curBuilding = "mc";
      curFloor += 1;
    }
  }
  var firstmap = {
    mapURL: "maps/"+curBuilding+curFloor+".png",
    pointList:[]
  }
  $("#exit-dialog").dialog('close');
  //cluearea.innerHTML="You have now exited Floor "+lastfloor+" of "+lastbuilding+" building. Now you are presented the Entrance on Floor "+ curFloor + " of "+curBuilding+" building! If this is not the Entrance you expected, please keep the Up/Dn buttons to adjust the floor levels. If you want to enter this entrance, please click on the En button on the right."
  data.data.paths[0].push(firstmap);
  drawAllPaths(data.data);
  if(nearexit) {exit_num += 1; keepinside=false;}
}

function enterbuilding(event){
  exited = false;
  //cluearea.innerHTML="You have now entered Floor"+curFloor+" of "+curBuilding+" building. Please click on the map to record you route!";
  $("#exit-dialog").dialog('close');
  newpoint(event);
}

function clickMap(event) {
    console.log("click map");
    console.log(data);
    event.preventDefault = true;
    var xx = event.clientX;
    var yy = event.clientY;
    var pt = stage.globalToLocal(xx, yy);
    pt.x = stage.mouseX;
    pt.y = stage.mouseY;
    var myindex = (curBuilding.valueOf() == "mc".valueOf())? -1:3;
    myindex += curFloor;
    canGoup(pt.x, pt.y, myindex);
    canExit(pt.x, pt.y, myindex);
    nearFacility(pt.x, pt.y, myindex);
    if(nearlift||nearstair){
      $("#stairs-dialog").dialog({position: {of:event}});
    }
    if(nearexit || nearhall){
      $("#exit-dialog").dialog({position: {of:event}});
      $("#exit-dialog").dialog("option", "position", {of: event});
    }
  newpoint(event);
}

function newpoint(event) {
  if(exited)  return;
  console.log("newpoint");
    var pt = {x:stage.mouseX, y:stage.mouseY};
    if(isfirst){
    	var distance = (dc1350[0]-pt.x)*(dc1350[0]-pt.x) + (dc1350[1]-pt.y)*(dc1350[1]-pt.y);
    	if(distance > 500)
    		return;
    }
    isfirst = false;
    var arrlen = data.data.paths[0].length;
    data.data.paths[0][arrlen-1].pointList.push(pt);
    var myindex = (curBuilding.valueOf() == "mc".valueOf())? -1:3;
    myindex += curFloor;
    canGoup(pt.x, pt.y, myindex);
    canExit(pt.x, pt.y, myindex);
    console.log(data.data);
    drawAllPaths(data.data);
}

function search(event) {
  var sbuilding = $("#startBui").val();
  var sroom = $("#startRoom").val();
  var ebuilding = $("#endBui").val();
  var eroom = $("#endRoom").val();
  curBuilding = sbuilding;
  curFloor = parseInt(sroom.substring(0,1));
  if(curBuilding.valueOf() == "00".valueOf() || curFloor.valueOf() == "0".valueOf()){
    return;
  }
  var firstmap = {
    mapURL: "maps/"+curBuilding+curFloor+".png",
    pointList:[]
  }
  //cluearea.innerHTML="Please click the BLUE SQUARE to start! You can start record your route now! You are now on Floor "+curFloor+" of "+curBuilding+" building. Please click on the map to record your route. Please make sure that you have clicked each time you turn.";
  data.data.paths[0].push(firstmap);
  data.data.id.push(document.URL.slice(-13));
  data.data.feature.push(0);
  console.log("id:"+data.data.id[0]);
  console.log("in search");
  console.log(data.data);
  drawAllPaths(data.data);
  console.log(document.URL);
}

function drawAllPaths(data) {
  console.log(data.paths);
  stage.removeAllChildren();
stage.update();
  $.each(data.paths, function (i, path) {
      drawPath(stage, i, path);
  });
  stage.update();
}

function drawPath(stage, indexOfpath, path) {
//  console.log("I am INDEX"+indexOfpath);
//  console.log(path);
  var lastPoint;
  var offset = {x: 0, y: 0};
  var line = new createjs.Shape();
  var circle = new createjs.Shape();
  line.graphics.setStrokeStyle(4).beginStroke("grey");
  var segment = path[path.length-1];
  var mapURL = segment.mapURL;
    //var width = segment.mapWidth;
    //var height = segment.mapHeight;
    if(curBuilding.valueOf() == "mc".valueOf())
      canvas.height=800;
    else
      canvas.height=1070;
    var pointList = segment.pointList;
    var map = new createjs.Bitmap(mapURL);
    stage.addChild(map);
    map.image.onload = function() { stage.update(); };
    //console.log(mapURL);
    //console.log(pointList);
    $.each(pointList, function (j, point) {
      //console.log(point);
      var footprint = new createjs.Bitmap(footprinturl);
      footprint.x = point.x+10;
      footprint.y = point.y+10;
      footprint.regX = 30;
      footprint.regY = 30;
      //circle.graphics.beginFill("blue").drawCircle(point.x-10, point.y-10, 15);
      drawSegment(line.graphics, offset, lastPoint, point);
      stage.addChild(footprint);
      lastPoint = point;
    });
    //drawStairs(circle);
    //stage.addChild(circle);
    stage.addChild(line);
    $.each(pointList, function (j, point) {
      //console.log(point);
      var footprint = new createjs.Bitmap(footprinturl);
      footprint.x = point.x+10;
      footprint.y = point.y+10;
      footprint.regX = 30;
      footprint.regY = 30;
      stage.addChild(footprint);
      footprint.image.onload = function(){stage.update(); };
      console.log("in pointList:"+j)
    });
    stage.update();
}

function drawSegment(graphics, offset, pStart, pEnd) {
  if (!pStart) return;
  graphics.moveTo(pStart.x + offset.x, pStart.y + offset.y);
  graphics.lineTo(pEnd.x + offset.x, pEnd.y + offset.y);
}

function drawStairs(circle){
  var myindex = (curBuilding.valueOf() == "mc".valueOf())? -1:3;
  myindex += curFloor;
 // console.log(myindex);
 // console.log(stairsList[myindex]);
  $.each(stairsList[myindex], function (i, pos){
    circle.graphics.beginFill("red").drawCircle(pos[0],pos[1],10);
  });
  $.each(liftList[myindex], function (i, pos){
    circle.graphics.beginFill("yellow").drawCircle(pos[0],pos[1],10);
  });
  $.each(exitList[myindex], function (i, pos){
    circle.graphics.beginFill("green").drawCircle(pos[0],pos[1],10);
  });
  if(curFloor == 1 && curBuilding.valueOf() == "dc")
	  circle.graphics.beginFill("blue").drawRect(dc1350[0], dc1350[1], 20,20);
}
