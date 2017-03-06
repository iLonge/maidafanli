window.onload=function(){
    var oscanCode = document.getElementById("scanCode");
      oscanCode.onclick = function(){
        popMask();
      }
    }

function popMask(){ 
  var cHeight=document.documentElement.clientHeight;
  var cWidth=document.documentElement.clientWidth;

  var oMask = document.createElement("div");
    oMask.id = "mask";
    oMask.style.width = cWidth+"px";
    oMask.style.height = cHeight+"px";
    document.body.appendChild(oMask);

  var omaskContet = document.createElement("div");
    omaskContet.id = "maskContet";
    omaskContet.style.width = cWidth+"px";
    omaskContet.style.height = cHeight+"px";
    omaskContet.innerHTML = "<img src='../../images/share.png' class='img-responsive'>";
    document.body.appendChild(omaskContet);

     omaskContet.onclick=function(){
      document.body.removeChild(oMask);
      document.body.removeChild(omaskContet);
    }
}