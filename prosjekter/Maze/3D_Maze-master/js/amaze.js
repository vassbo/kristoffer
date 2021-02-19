// Copyright (C) 2013 by Henry Kroll
/* Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

function decodeURL(){
    var ret;
    function q2obj(url){
        var qfrag,
            qArr = url.split('&'),
            qObj = {},
            i =-1;
        while(++i<qArr.length) {
            qfrag = qArr[i].split('=');
            qObj[qfrag[0]] = decodeURIComponent(qfrag[1].replace(/\+/g, '%20'));
        } return qObj;
    }
    // see if script was passed parameters from the src
    var scripts = document.getElementsByTagName('script');
    var myScript = scripts[ scripts.length - 1 ];
    var queryString = myScript.src.replace(/^[^\?]+\??/,'');
    if(queryString) ret=q2obj(queryString)
    // if not, try to get them from the URL
    else if(location.search){
        ret = q2obj(location.search.slice(1));
    } return ret;
}
function amaze(id)
{
function def(item,val){
    if(typeof id[item]=="undefined")id[item]=val;
    if(element=document.getElementById(item))element.value=id[item];
}
if(typeof id=="undefined")var id={};
//~ default values in case no parameters were passed
def("rows",10);
def("cols",10);
def("color","FF0000");
def("bgcolor","000000");
def("sz","10px");
def("blank"," ");
def("wall","<em>#</em>");
var style=document.getElementById("mazeStyle");
if(!style){
    // create style element if we ain't got it
    var css = '',
        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        style.id = "mazeStyle";
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
}
style.innerHTML="pre em{background:#"+id.bgcolor+";color:#"+id.color+";}\npre{font-size:"+id.sz+";line-height:.85em;}";
var maze="",a;
function mazeInit(){
    for(var i=0;i<2*id.rows+1;i++){
        for(j=0;j<2*id.cols+1;j++){
            maze+="@";
        } maze +="\n";
    }
    a=maze.split("\n");
    for(var i=a.length;i--;)a[i]=a[i].split('');
}
function mazeStep(r,c){
    var i,vector=[[0,0],[0,0],[0,0]]; /* 3 possible directions */
    function R(val){
        if(typeof val=="undefined")return vector[i][0];
        vector[i][0]=val;
    }
    function C(val){
        if(typeof val=="undefined")return vector[i][1];
        vector[i][1]=val;
    }
    while(1){
        i=0; /* create a list of possible options */
        if(r>1            &&a[r-2][c]!==" "){R(r-2);C(c);i++;}
        if(r< id.rows*2-1 &&a[r+2][c]!==" "){R(r+2);C(c);i++;}
        if(c>1            &&a[r][c-2]!==" "){R(r);C(c-2);i++;}
        if(c< id.cols*2-1 &&a[r][c+2]!==" "){R(r);C(c+2);i++;}
        /* i is never > 3 because path behind is cleared */
        if(i==0)break; /* check for dead end */
        i=Math.floor((Math.random()*i))|0; /* random direction */
        a[R()][C()]=" "; /* knock out block */
        a[(R()+r)/2|0][(C()+c)/2|0]=" "; /* clear to it */
        mazeStep(R(),C());
    }
}
function mazeWalk(){
	var i,r,c;
	c=id.cols|1;
	a[0][c]=' ';a[2*id.rows|0][c]=' ';
	i=Math.floor((Math.random()*2));
	c=(i) ? 1|0 :(2*id.cols-1);
  r=id.rows|1;
  a[r][c]=' ';
	mazeStep(r,c);
}
mazeInit();
mazeWalk();
for(var i=a.length;i--;)a[i]=a[i].join('');
maze=a.join('\n').replace(/ /g,id.blank).replace(/@/g,id.wall);
//~ var node=document.createElement("pre");
//~ var textnode=document.createTextNode(maze);
//~ node.appendChild(textnode);
//~ this.parentNode.appendChild(node);
document.write("<pre>"+maze+"</pre>");

//document.getElementById("maze").innerHTML=maze;
}

amaze(decodeURL());
