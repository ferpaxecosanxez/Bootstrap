/***************** FUNCIONES GENERALES *************************************
i would like to protect Copy&Paste  and Print functions in a web application.
How do i disable  Ctrl+C,Ctrl+V,Ctrl+P,Ctrl+N and Alt+PrintScreen keys.
i am using win2k and IE browser. 
****************************************************************************/

//TO disable right click on theimages add the following code from the thread

//<!-- Begin
function right(e) {
if (navigator.appName == 'Netscape' &&
(e.which == 3 || e.which == 2))
return false;
else if (navigator.appName == 'Microsoft Internet Explorer' &&
(event.button == 2 || event.button == 3)) {
alert("Right click disabled.");
return false;
}
return true;
}
document.onmousedown=right;
if (document.layers) window.captureEvents(Event.MOUSEDOWN);
window.onmousedown=right;
//  End -->

//I can able to disable Alt+PrintScreen ,Copy & Paste but when i use Ctrl+P to Print the page ,it prints the page.

//NO right click.
//NO print screen key.
//No Ctrl + C
//No Highlighting anything with the mouse.
//All print functions (Ctrl+P, Print Icon, File>>Print) deliver a BLANK PAGE.
//<!--
hp_ok=true;
function hp_d00(s)
{
  if(!hp_ok)return;
  document.write(s)
}
//-->
function hp_ne()
{
  return true
}
onerror=hp_ne;
function hp_dn(a)
{
  return false
}
function hp_cm()
{
  alert("\u0054\u0068\u0069\u0073\u0020\u0070\u0061\u0067\u0065\u0020\u0068\u0061\u0073\u0020\u0062\u0065\u0065\u006E\u0020\u0070\u0072\u006F\u0074\u0065\u0063\u0074\u0065\u0064\u002E\u0020\u0050\u0072\u0065\u0076\u0069\u0065\u0077\u0020\u006F\u006E\u006C\u0079\u002E");
  return false
}
function hp_de(e)
{
  return(e.target.tagName!=null&&e.target.tagName.search('^(INPUT|TEXTAREA|BUTTON|SELECT)$')!=-1)
};
function hp_md(e)
{
  mac=navigator.userAgent.indexOf('Mac')!=-1;
  if(document.all)
  {
    if(event.button==2||(mac&&(event.ctrlKey||event.keyCode==91)))
    {
      alert("\u0054\u0068\u0069\u0073\u0020\u0070\u0061\u0067\u0065\u0020\u0068\u0061\u0073\u0020\u0062\u0065\u0065\u006E\u0020\u0070\u0072\u006F\u0074\u0065\u0063\u0074\u0065\u0064\u002E\u0020\u0050\u0072\u0065\u0076\u0069\u0065\u0077\u0020\u006F\u006E\u006C\u0079\u002E");
      return(false)
    }
  }
  else
  {
    if(e.which==3||(mac&&(e.modifiers==2||e.ctrlKey)))
    {
      alert("\u0054\u0068\u0069\u0073\u0020\u0070\u0061\u0067\u0065\u0020\u0068\u0061\u0073\u0020\u0062\u0065\u0065\u006E\u0020\u0070\u0072\u006F\u0074\u0065\u0063\u0074\u0065\u0064\u002E\u0020\u0050\u0072\u0065\u0076\u0069\u0065\u0077\u0020\u006F\u006E\u006C\u0079\u002E");
      return false
    }
    else if(e.which==1)
    {
      window.captureEvents(Event.MOUSEMOVE);
      window.onmousemove=hp_dn
    }
  }
}
function hp_mu(e)
{
  if(e.which==1)
  {
    window.releaseEvents(Event.MOUSEMOVE);
    window.onmousemove=null
  }
}
if(navigator.appName.indexOf('Internet Explorer')==-1||(navigator.userAgent.indexOf('MSIE')!=-1&&document.all.length!=0))
{
  if(document.all)
  {
    mac=navigator.userAgent.indexOf('Mac')!=-1;
    version=parseFloat('0'+navigator.userAgent.substr(navigator.userAgent.indexOf('MSIE')+5),10);
    if(!mac&&version>4)
    {
      document.oncontextmenu=hp_cm
    }
    else
    {
      document.onmousedown=hp_md;
      document.onkeydown=hp_md;
    }
    document.onselectstart=hp_dn
  }
  else if(document.layers)
  {
    window.captureEvents(Event.MOUSEDOWN|Event.modifiers|Event.KEYDOWN|Event.MOUSEUP);
    window.onmousedown=hp_md;window.onkeydown=hp_md;
    window.onmouseup=hp_mu
  }
  else if(document.getElementById&&!document.all)
  {
    document.oncontextmenu=hp_cm;document.onmousedown=hp_de
  }
}
function hp_dp1()
{
  for(i=0;i<document.all.length;i++)
  {
    if(document.all[i].style.visibility!="hidden")
    {
      document.all[i].style.visibility="hidden";document.all[i].id="hp_id"
    }
  }
};
function hp_dp2()
{
  for(i=0;i<document.all.length;i++)
  {
    if(document.all[i].id=="hp_id")document.all[i].style.visibility=""
  }
};
window.onbeforeprint=hp_dp1;
window.onafterprint=hp_dp2;
document.write('<style type="text/css" media="print"><!--body{display:none}--></style>');
function hp_dc()
{
  hp_ta.createTextRange().execCommand("Copy");
  setTimeout("hp_dc()",300)
}
if(navigator.appName.indexOf('Internet Explorer')==-1||(navigator.userAgent.indexOf('MSIE')!=-1&&document.all.length!=0))
{
  if(document.all&&navigator.userAgent.indexOf('Opera')==-1)
  {
    document.write('<div style="position:absolute;left:-1000px;top:-1000px"><input type="textarea" name="hp_ta" value=" " style="visibility:hidden"></div>');
    hp_dc()
  }
}
function hp_ndd()
{
  return false
}
document.ondragstart=hp_ndd;

   