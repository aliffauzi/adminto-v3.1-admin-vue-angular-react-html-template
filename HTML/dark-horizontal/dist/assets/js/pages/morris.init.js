!function(e){"use strict";var a=function(){};a.prototype.createLineChart=function(e,a,r,o,t,i,b,s,l){Morris.Line({element:e,data:a,xkey:r,ykeys:o,labels:t,fillOpacity:i,pointFillColors:b,pointStrokeColors:s,behaveLikeLine:!0,gridLineColor:"#323a46",gridTextColor:"#98a6ad",hideHover:"auto",lineWidth:"3px",pointSize:0,preUnits:"$ ",resize:!0,lineColors:l})},a.prototype.createAreaChart=function(e,a,r,o,t,i,b,s){Morris.Area({element:e,pointSize:0,lineWidth:0,data:o,xkey:t,ykeys:i,labels:b,hideHover:"auto",resize:!0,gridLineColor:"#323a46",gridTextColor:"#98a6ad",lineColors:s})},a.prototype.createAreaChartDotted=function(e,a,r,o,t,i,b,s,l,y){Morris.Area({element:e,pointSize:3,lineWidth:1,data:o,xkey:t,ykeys:i,labels:b,hideHover:"auto",pointFillColors:s,pointStrokeColors:l,resize:!0,gridLineColor:"#323a46",gridTextColor:"#98a6ad",lineColors:y})},a.prototype.createBarChart=function(e,a,r,o,t,i){Morris.Bar({element:e,data:a,xkey:r,ykeys:o,labels:t,hideHover:"auto",resize:!0,gridLineColor:"#323a46",gridTextColor:"#98a6ad",barSizeRatio:.4,barColors:i})},a.prototype.createStackedChart=function(e,a,r,o,t,i){Morris.Bar({element:e,data:a,xkey:r,ykeys:o,stacked:!0,labels:t,hideHover:"auto",resize:!0,gridLineColor:"#323a46",gridTextColor:"#98a6ad",barColors:i})},a.prototype.createDonutChart=function(e,a,r){Morris.Donut({element:e,data:a,resize:!0,colors:r,backgroundColor:"#323a46",labelColor:"#fff"})},a.prototype.init=function(){this.createLineChart("morris-line-example",[{y:"2008",a:50,b:0},{y:"2009",a:75,b:50},{y:"2010",a:30,b:80},{y:"2011",a:50,b:50},{y:"2012",a:75,b:10},{y:"2013",a:50,b:40},{y:"2014",a:75,b:50},{y:"2015",a:100,b:70}],"y",["a","b"],["Series A","Series B"],["0.1"],["#ffffff"],["#999999"],["#ff8acc","#5b69bc"]);this.createAreaChart("morris-area-example",0,0,[{y:"2009",a:10,b:20},{y:"2010",a:75,b:65},{y:"2011",a:50,b:40},{y:"2012",a:75,b:65},{y:"2013",a:50,b:40},{y:"2014",a:75,b:65},{y:"2015",a:90,b:60}],"y",["a","b"],["Series A","Series B"],["#5b69bc","#35b8e0"]);this.createAreaChartDotted("morris-area-with-dotted",0,0,[{y:"2009",a:10,b:20},{y:"2010",a:75,b:65},{y:"2011",a:50,b:40},{y:"2012",a:75,b:65},{y:"2013",a:50,b:40},{y:"2014",a:75,b:65},{y:"2015",a:90,b:60}],"y",["a","b"],["Series A","Series B"],["#ffffff"],["#999999"],["#5b69bc","#35b8e0"]);this.createBarChart("morris-bar-example",[{y:"2009",a:100,b:90,c:40},{y:"2010",a:75,b:65,c:20},{y:"2011",a:50,b:40,c:50},{y:"2012",a:75,b:65,c:95},{y:"2013",a:50,b:40,c:22},{y:"2014",a:75,b:65,c:56},{y:"2015",a:100,b:90,c:60}],"y",["a","b","c"],["Series A","Series B","Series C"],["#ff8acc","#5b69bc","#35b8e0"]);this.createStackedChart("morris-bar-stacked",[{y:"2005",a:45,b:180},{y:"2006",a:75,b:65},{y:"2007",a:100,b:90},{y:"2008",a:75,b:65},{y:"2009",a:100,b:90},{y:"2010",a:75,b:65},{y:"2011",a:50,b:40},{y:"2012",a:75,b:65},{y:"2013",a:50,b:40},{y:"2014",a:75,b:65},{y:"2015",a:100,b:90}],"y",["a","b"],["Series A","Series B"],["#71b6f9","#ebeff2"]);this.createDonutChart("morris-donut-example",[{label:"Download Sales",value:12},{label:"In-Store Sales",value:30},{label:"Mail-Order Sales",value:20}],["#ff8acc","#5b69bc","#35b8e0"])},e.MorrisCharts=new a,e.MorrisCharts.Constructor=a}(window.jQuery),function(e){"use strict";window.jQuery.MorrisCharts.init()}();