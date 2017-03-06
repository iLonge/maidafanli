    // 入口函数 
    if (window.localStorage) {  
       initJs("jquery", "../../js/jquery.min.js");
       initCss("amazeui", "../../css/amazeui.css");   
    } else {  
       alert("未知错误，请您重新加载！");
    } 

   // 第一步：加载页面js：先加载jQuery后加载用户脚本  
   function initJs(name,url) {  
       var xhr;  
       var js = window.localStorage ? localStorage.getItem(name) : "";  
       if (js == null || js.length == 0) {  
           if (window.ActiveXObject) {  
               xhr = new ActiveXObject("Microsoft.XMLHTTP");  
           } else if (window.XMLHttpRequest) {  
               xhr = new XMLHttpRequest();  
           }  
          xhr.open("GET", url);  
          xhr.send(null);  
          xhr.onreadystatechange = function () {  
            if (xhr.readyState == 4 && xhr.status == 200) {  
              js = xhr.responseText;  
              localStorage.setItem(name, js);  
              js = js == null ? "" : js;  
              addTxt(js, "js");  
              initTurntable();         //确保先引用Jquery  
            }   
          };  
       } else {  
           addTxt(js, "js");  
           initTurntable();  
       }  
   }  

  // 加载自定义脚本  
  function initTurntable() {  
     var name = "amazeui";  
     var url = "../../js/amazeui.min.js";  
     var xhr;  
     var js = window.localStorage ? localStorage.getItem(name) : "";  
     if (js == null || js.length == 0) {  
         if (window.ActiveXObject) {  
             xhr = new ActiveXObject("Microsoft.XMLHTTP");  
         } else if (window.XMLHttpRequest) {  
             xhr = new XMLHttpRequest();  
         }  
         xhr.open("GET", url);  
         xhr.send(null);  
         xhr.onreadystatechange = function () {  
             if (xhr.readyState == 4 && xhr.status == 200) {  
                 js = xhr.responseText;  
                 localStorage.setItem(name, js);  
                 js = js == null ? "" : js;  
                 addTxt(js, "js");  
             }  
         };  
     } else {  
         addTxt(js, "js");  
     }  
  }  

   //第二步：初始化Css  
   function initCss(name, url) {  
       var xhr;  
       var css = window.localStorage ? localStorage.getItem(name) : "";  
       if (css == null || css.length == 0) {  
           if (window.ActiveXObject) {  
               xhr = new ActiveXObject("Microsoft.XMLHTTP");  
           } else if (window.XMLHttpRequest) {  
               xhr = new XMLHttpRequest();  
           }  
           xhr.open("GET", url);  
           xhr.send(null);  
           xhr.onreadystatechange = function () {  
               if (xhr.readyState == 4 && xhr.status == 200) {  
                   css = xhr.responseText;  
                   localStorage.setItem(name, css);  
                   css = css == null ? "" : css;  
                   css = css.replace(/images\//g, "style/images/");  
                   addTxt(css, "css");  
               }  
           };  
       } else {  
           css = css.replace(/images\//g, "style/images/");  
           addTxt(css, "css");  
       }  
   }  

  // 辅助方法1：动态添加js，css文件引用  
  function addFile(url, fileType) {  
    var head = document.getElementsByTagName('HEAD').item(0);  
    var link;  
    if (fileType == "js") {  
       link = document.createElement("script");  
       link.type = "text/javascript";  
       link.src = url;  
    } else {  
       link = document.createElement("link");  
       link.type = "text/css";  
       link.rel = "stylesheet";  
       link.rev = "stylesheet";  
       link.media = "screen";  
       link.href = url;
    }  
    head.appendChild(link);  
  }  

  // 辅助方法2：动态添加js，css文件内容   
  function addTxt(text, fileType) {  
    var head = document.getElementsByTagName('HEAD').item(0);  
    var link;  
    if (fileType == "js") {  
       link = document.createElement("script");  
       link.type = "text/javascript";  
       link.innerHTML = text;  
    } else {  
       link = document.createElement("style");  
       link.type = "text/css";  
       link.innerHTML = text;  
    }  
    head.appendChild(link);  
  } 