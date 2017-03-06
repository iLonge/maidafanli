function modal(){ 
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
      omaskContet.innerHTML = "<img src='images/remind.png' width='75%' height=50% /><button id='sureBtn'>确 认</button>";
      //omaskContet.innerHTML = "<div class='personal-code'><h2 class='personal-code-title'>扫描啊烦得很</h2><img src='images/personal-code.png' class='img-responsive'></div>";
      document.body.appendChild(omaskContet);

      omaskContet.onclick=function(){
      document.body.removeChild(oMask);
      document.body.removeChild(omaskContet);
  }
}     