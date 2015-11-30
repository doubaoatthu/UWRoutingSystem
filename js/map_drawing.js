var canvas;
var stage;
var cluearea;
var curBuilding;
var curFloor;
var popup;
var data = {
    data: {
      paths: [
      [],
      ],
      survey: [],
      id:[],
    }
  };
var exited = false;
var nearlift = false;
var nearexit = false;
//mcx: x-1, dcx: x+3
var stairsList = [[[253.34592847039806,126.16112970369765],[877.1896679463864,119.76165211003183],[823.8498686603353,137.1316627214105],[869.0727419680743,215.75381601501917],[921.2529804000808,310.8317688351971],[1018.6560921398262,522.9287405109786],[835.4454772007813,632.634070688107],[239.43119822186299,618.0066933311566],[138.54940391998383,303.51808015672185],[201.16569003839157,127.98955187331646],[491.0559035495386,348.31442331238264],[870.2323028221189,216.66802709982858]],
                  [[252.18636761635346,149.01640682393273],[835.4454772007813,148.10219573912332],[913.1360544217687,364.7702228389519],[820.3711860982016,656.4035588931515],[251.02680676230887,644.5188147906293]],
                  [[106.08170000673536,150.84482899355154],[710.2129049639658,151.75904007836093],[770.5100693742843,375.74075585666475],[691.6599312992523,673.7735695045302],[103.76257829864619,660.0604032323891]],
                  [[124.63467367144877,168.2148396049302],[821.5307469522462,168.2148396049302],[851.6793291574055,444.30658721736995]],
                  [[690.5003704452077,546.3978450738715],[688.1812487371186,841.2570402416129],[885.3065939246985,844.0519141294587],[886.4661547787432,547.7952820177944],[927.0507846703038,118.78214023345032],[976.911901394221,191.44886131744346],[980.3905839563548,519.8465431393355],[981.5501448103994,866.4109052322259],[980.3905839563548,990.782793241368]],
                  [[66.65663096921936,533.820912578565],[65.49707011517478,913.923761325606],[128.11335623358255,874.7955268957636],[339.15343166969757,916.7186352134519],[392.49323095574863,877.5904007836094],[576.8634067488381,825.8852338584605],[671.9473967804944,874.7955268957636],[870.2323028221189,877.5904007836094],[997.7839967670236,1025.7187168394416],[1000.1031184751128,905.5391396620684],[998.9435576210682,543.6029711860256],[1000.1031184751128,209.61554158844174],[946.7633191890617,117.38470328952738],[870.2323028221189,567.3593992327156],[671.9473967804944,565.9619622887927],[576.8634067488381,619.0645661578646],[394.81235266383777,571.5517100644845],[339.15343166969757,535.2183495224879]],
                  [[171.0171078332323,61.48722553260958],[547.8743853977235,64.28209942045547],[545.5552636896342,333.98742959758385],[174.49579039536607,328.3976818218921],[209.2826160167037,385.6925965227328],[513.0875597763858,382.8977226348869],[259.143732740621,567.3593992327156],[460.90732134437934,567.3593992327156],[511.9279989223412,662.385111419476],[208.1230551626591,659.59023753163],[205.80393345456994,856.6288466247653],[513.0875597763858,859.4237205126111],[60.85882669899643,982.3981715778303],[183.77227722772275,987.9879193535221],[538.5978985653667,981.0007346339074],[869.0727419680743,983.7956085217533],[208.1230551626591,114.58982940168148]]];
var liftList = [[[288.1327540917357,40.22528773161374],[319.4408971509396,40.22528773161374],[763.5527042500169,696.6288466247653],[792.5417256011315,697.5430577095747]],
                [[284.65407152960194,56.681087258183],[314.80265373476124,58.50950942780181]],
                [[142.0280864821176,59.42372051261121],[169.8575469791877,59.42372051261121]],
                [[168.69798612514313,63.08056485184883],[202.32525089243617,62.16635376703942]],
                [[712.5320266720549,598.1030119990204]],
                [[725.2871960665454,621.8594400457105]],
                [[456.26907792820094,709.8979675128561]]];
var exitList = [[[881.8279113625648,128.90376295812587],[1022.1347747019599,526.5855848502163]],
                [[204.64437260052534,77.70794220879928],[195.36788576816863,142.61692923026692],[878.349228800431,132.56060729736348],[979.2310231023102,363.8560117541425],[1037.2090658045397,548.526650885642],[213.92085943288205,661.8888254020079]],
                [],
                [],
                [[627.8840843268,855.2314096808424],[625.5649626187109,532.423475634642],[997.7839967670236,831.4749816341523],[903.859567589412,311.62843849481675],[903.859567589412,160.70524855113868],[905.0191284434566,81.05134274753081]],
                [],
                []];
var dc1350=[780,820];
var isfirst = true;
$(document).ready(function() {
  canvas = document.getElementById("map");
  cluearea = document.getElementById("clue");
  popup = document.getElementById("popup_div");
  stage = new createjs.Stage(canvas);
  $("#Search_btn").on("click", search);
  $("#Finish_btn").on("click", submitroute);
  $("#map").on("click", clickMap);
  $("#upstairs_btn").on("click", upstairs);
  $("#downstairs_btn").on("click", downstairs);
  $("#exit_btn").on("click", exitbuilding);
  $("#enter_btn").on("click", enterbuilding);
  $("#submit_btn").on("click", submittoServer);
  //test();
});

function popuptest (event){
  //getting height and width of the message box
  var height = $('#popuup_div').height();
  var width = $('#popuup_div').width();
  //calculating offset for displaying popup message
  leftVal=e.pageX-(width/2)+"px";
  topVal=e.pageY-(height/2)+"px";
  //show the popup message and hide with fading effect
  console.log("popopopopop");
  $('#popuup_div').css({left:leftVal,top:topVal}).show().fadeOut(1500);
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
  xhr.send(JSON.stringify(data));
  location.href="questionare.html?id="+data.data.id[0];
}

function submittoServer(event){
  var survey = [];
  survey.push(document.URL.slice(-13));
  for(var i = 1; i < 6; i++){
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
  xhr.open('POST', "/sendpath");
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () { // 处理函数
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
  }
  xhr.send(JSON.stringify(survey));
  document.getElementById("question_canvas").innerHTML="Thank You!";
}

function canGoup(x, y, floor){
  nearlift = false;
  $.each(stairsList[floor], function (i, pos){
    var distance = (pos[0]-x)*(pos[0]-x) + (pos[1]-y)*(pos[1]-y);
    if(distance <= 300){
        nearlift = true;
        cluearea.innerHTML="You are close to the STAIRS, you can now click Up/Dn on the left side to go upstairs or downstairs.";
    }
  });
  $.each(liftList[floor], function (i, pos){
    var distance = (pos[0]-x)*(pos[0]-x) + (pos[1]-y)*(pos[1]-y);
    if(distance <= 300){
        nearlift = true;
        cluearea.innerHTML="You are close to the ELEVATOR, you can now click Up/Dn on the left side to go upstairs or downstairs.";
    }
  });
}

function canExit(x, y, floor){
  nearexit = false;
  $.each(exitList[floor], function (i, pos){
    var distance = (pos[0]-x)*(pos[0]-x) + (pos[1]-y)*(pos[1]-y);
    if(distance <= 300){
        nearexit = true;
        cluearea.innerHTML="You are close to an EXIT of building "+curBuilding+" , you can now click Ex on the right side to exit the building.";

    }
  });
}

function downstairs(event){
  if(!nearlift && !exited) return;
  curFloor -= 1;
  if(curFloor <= 0){
    curFloor += 1;
    return;
  }
  cluearea.innerHTML="You are now on Floor "+ curFloor + " of "+curBuilding+" building! If you still want to go up/down on the stairs, please keep click the left buttons. If you want to enter this floor, please click the En button first and then click on the map."
  var firstmap = {
    mapURL: "maps/"+curBuilding+curFloor+".png",
    pointList:[]
  }
  data.data.paths[0].push(firstmap);
  drawAllPaths(data.data);
}

function upstairs(event){
  if(!nearlift && !exited) return;
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
  cluearea.innerHTML="You are now on Floor "+ curFloor + " of "+curBuilding+" building! If you still want to go up/down on the stairs, please keep click the left buttons. If you want to enter this floor, please click the En button first and then click on the map."

  data.data.paths[0].push(firstmap);
  drawAllPaths(data.data);
}

function exitbuilding(event){
  if(!nearexit) return;
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
      curBuilding = "dc";
      curFloor += 1;
    }
  }
  var firstmap = {
    mapURL: "maps/"+curBuilding+curFloor+".png",
    pointList:[]
  }
  cluearea.innerHTML="You have now exited Floor "+lastfloor+" of "+lastbuilding+" building. Now you are presented the Entrance on Floor "+ curFloor + " of "+curBuilding+" building! If this is not the Entrance you expected, please keep the Up/Dn buttons to adjust the floor levels. If you want to enter this entrance, please click on the En button on the right."
  data.data.paths[0].push(firstmap);
  drawAllPaths(data.data);
}

function enterbuilding(event){
  exited = false;
  cluearea.innerHTML="You have now entered Floor"+curFloor+" of "+curBuilding+" building. Please click on the map to record you route!";
}

function clickMap(event) {
  $("#survey-dialog").dialog();
  newpoint(event);
}

function newpoint(event) {
  if(exited)  return;
  console.log("newpoint");
    var xx = event.clientX;
    var yy = event.clientY;
    var pt = stage.globalToLocal(xx, yy);
    pt.x = stage.mouseX;
    pt.y = stage.mouseY;
    if(isfirst){
    	var distance = (dc1350[0]-pt.x)*(dc1350[0]-pt.x) + (dc1350[1]-pt.y)*(dc1350[1]-pt.y);
    	if(distance > 300)
    		return;
    }
    isfirst = false;
    var arrlen = data.data.paths[0].length;
    data.data.paths[0][arrlen-1].pointList.push(pt);
    var myindex = (curBuilding.valueOf() == "mc".valueOf())? -1:3;
    myindex += curFloor;
    cluearea.innerHTML="Recording......  You are now on Floor "+curFloor+" of "+curBuilding+" building.";
    canGoup(pt.x, pt.y, myindex);
    canExit(pt.x, pt.y, myindex);
    console.log(data.data);
    drawAllPaths(data.data);
    popup.css('left','100px');
    popup.css('right','100px');
    popup.show();
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
  cluearea.innerHTML="Please click the BLUE SQUARE to start! You can start record your route now! You are now on Floor "+curFloor+" of "+curBuilding+" building. Please click on the map to record your route. Please make sure that you have clicked each time you turn.";
  data.data.paths[0].push(firstmap);
  var day = new Date();
  data.data.id.push(day.getTime());
  console.log("id:"+data.data.id[0]);
  console.log("in search");
  console.log(data.data);
  drawAllPaths(data.data);
  console.log(document.URL);
}

function drawAllPaths(data) {
  console.log(data.paths);
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
  line.graphics.setStrokeStyle(3).beginStroke("#00F5FF");
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
      circle.graphics.beginFill("blue").drawRect(point.x-10, point.y-10, 20,20);
      drawSegment(line.graphics, offset, lastPoint, point);
      lastPoint = point;
    });
    drawStairs(circle);
    stage.addChild(circle);
    stage.addChild(line);
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
