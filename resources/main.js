const b = 10;

function drawNetworks(){
    drawUSNetwork();
    drawChinaNetwork();
}

function drawUSNetwork(){
    var IDS={
        "Facebook": {id: 100000, color: "#3b5998", image:"resources/icons/facebook.png"}, 
        "Google": {id:200000, color: "#DB4437", image:"resources/icons/google.png"}, 
        "Twitter": {id:300000, color: "#A9F7FC", image:"resources/icons/twitter.png"}, 
        "Yahoo": {id:400000, color: "#b25ed6", image:"resources/icons/yahoo.png"}, 
        "LinkedIn": {id:500000, color: "#0077B5", image:"resources/icons/linkedin.png"}, 
        "Amazon": {id:600000, color: "#ff9900", image:"resources/icons/amazon.png"}
    };
    var container = 'us_network';
    draw(IDS, US_DATA, container, 6);
}

function drawChinaNetwork(){
    //Wechat,QQ,Weibo,Baidu,Github,LinkedIn,Taobao,Douban,Ren,Facebook,Google

    var IDS={
        "WeChat": {id: 100000, color: "#7bb32e", image:"resources/icons/wechat.png"}, 
        "QQ": {id:200000, color: "#69B3E7", image:"resources/icons/qq.png"}, 
        "Baidu": {id:300000, color: "#A9F7FC", image:"resources/icons/baidu.png"}, 
        "Taobao": {id:400000, color: "#ff4200", image:"resources/icons/taobao.png"}, 
        "Douban": {id:500000, color: "#2e963d", image:"resources/icons/douban.png"}, 
        "Renren": {id:600000, color: "#005baa", image:"resources/icons/renren.jpg"},
        "Weibo": {id:700000, color: "#bb3e3e", image:"resources/icons/weibo.png"}
    };
    var container = 'china_network';
    draw(IDS, CHINA_DATA, container, 7);
}


function draw(IDS, DATASET, container_id, numCore){
    var nodes = [];

    var i =0;
    for(var login in IDS){
        var r = 300;
        if(numCore == 7) r = 350;
        var coreX = r * Math.cos(i*2*Math.PI/numCore);
        var coreY = r * Math.sin(i*2*Math.PI/numCore);
        i++;

        // push the CORE image nodes
        nodes.push({
            id: IDS[login].id,
            label: login,
            group: "core",
            x: coreX,
            y: coreY,
            size: 80,
            color: IDS[login].color,
            image: IDS[login].image,
            shape: "image",
            font: {
                size: 60
            }
        });
    }

    var edges =[];


    for(var i=0; i<DATASET.length; i++){
        var data = DATASET[i];
        var rank = i+1;

        // each website in top 200
        obj = {
            id: i,
            label: data["url"],
            x: circleX(rank),
            y: circleY(rank),
            size: scale(rank),
            color:{
                background: rainbow[(i*20) % 200],
                border: rainbow[(i*20) % 200],
                hover: {
                    background: rainbow[(i*20) % 200],
                    border: 'white'
                }
            },
            font: {
                size: scaleFont(rank)
            }
        };


        nodes.push(obj);
        for(var social in data.logins){
            var socialName = data.logins[social];

            if(socialName == "Wechat") socialName = "WeChat";
            if(socialName == "Ren") socialName = "Renren";

            // if not contained in IDS, skip it!
            if(IDS[socialName] == undefined){
                console.log(socialName);
                continue;
            }
            var toNode = IDS[socialName].id;
            var c = IDS[socialName].color;
            edges.push({
                from: i,
                to: toNode,
                color: {
                    hover: c,
                    color: 'rgba(192, 192, 192, .25)',
                }
            })
        }
    }

    console.log(nodes);
    console.log(edges);

    // create a network
    var container = document.getElementById(container_id);
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        autoResize: true,
        nodes: {
            shape: 'dot',
            font: {
                face: "Avenir Next",
                color: '#ffffff'
            },
            color: {
                highlight: {
                    background: 'white',
                    border: 'red'
                }
            },
            borderWidth: 2
        },
        edges: {
            width: 4,
            hoverWidth: 0
        },
        layout: {
            improvedLayout: false
        },
        interaction: {
            zoomView: true,
            dragView: true,
            dragNodes: false,
            hover: true,
            selectable: false
        },
        physics: false,

        groups: {
            hidden: {
                color:{background:'gray'},
                borderWidth: 0
            }
        }
    };
    var network = new vis.Network(container, data, options); 

    network.on("zoom",function(){ //while zooming 
        if(network.getScale() <= 0.2 )//the limit you want to stop at
        {
            network.moveTo({
                scale: 0.2,
            }); 
        } 
    });

    console.log(network);
}


function circleX(rank){
    var r = getRadius(rank);
    var t = getRelativePosition(rank);

    return r*Math.cos(t);
}


function circleY(rank){
    var r = getRadius(rank);
    var t = getRelativePosition(rank);

    return r*Math.sin(t);
}


const groups = [10, 30, 55, 100, 140, 200];
const radii = [600, 830, 1100, 1300, 1500, 1650];

function getRadius(rank){
    for(var i = 0; i<groups.length; i++){
        if(rank <= groups[i]){
            return radii[i];
        }
    }
}

function getRelativePosition(rank){
    for(var i = 0; i<groups.length; i++){
        if(rank <= groups[i]){
            // we are in this group
            // find total number of people in this group
            var total = groups[i] - (i==0 ? 0 : groups[i-1]);

            return rank * 2*Math.PI/total;
        }
    }
}

// quadratic scaling between: max-min;
function scale(rank){
    var min = 10; // max: 30 
    var s = 0.00075*rank*rank-0.3*rank+30;

    s += min;

    return s;
}

function scaleFont(rank){
    var min = 20;
    var max = 45;

    return (201-rank)/200 * (max-min) + min;
}

var size = 200;
var rainbow = new Array(size);

for (var i=0; i<size; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

  rainbow[i] = "#"+ red + green + blue;
}

function sin_to_hex(i, phase) {
    var sin = Math.sin(Math.PI / size * 2 * i + phase);
    var int = Math.floor(sin * 127) + 128;
    var hex = int.toString(16);

    return hex.length === 1 ? "0"+hex : hex;
}

