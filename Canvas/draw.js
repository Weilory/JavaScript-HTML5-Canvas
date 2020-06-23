const canvas = document.querySelector('#paint');
const ctx = canvas.getContext('2d');

const draw = document.querySelector('.draw');
const line = document.querySelector('.line');
const rectangle = document.querySelector('.rectangle');
const poly = document.querySelector('.poly');
const circ = document.querySelector('.circ');
const circl = document.querySelector('.circl');
const bezi = document.querySelector('.bezi');
const erase = document.querySelector('.erase');
const sweep = document.querySelector('.sweep');
const ovem = document.querySelector('.move');
const rotat = document.querySelector('.rotat');
const scal = document.querySelector('.scal');

const put = document.querySelector('.put');
const sel = document.querySelector('.sel');
const gal = document.querySelector('.gal');
const mel = document.querySelector('.mel');
const dal = document.querySelector('.dal');
const pal = document.querySelector('.pal');

const _m = document.querySelector('.move_prev');
const __m = document.querySelector('.move_firs');
const m_ = document.querySelector('.move_next');
const m__ = document.querySelector('.move_last');
const l_l = document.querySelector('.label')

const opti = document.querySelector('.option');
const topl = document.querySelector('.topl');

const pw = 80;
const ph = 50;
const arrow_up = document.querySelector('.arrow-up');
const arrow_down = document.querySelector('.arrow-down');
const arrow_left = document.querySelector('.arrow-left');
const arrow_right = document.querySelector('.arrow-right');

var ind1 = true;
var ind2 = true;

var u_clicked = false;
var l_clicked = false;
var d_clicked = false;
var f_clicked = false;

var previous = {x: 0, y: 0};
var mouse = {x: 0, y: 0};
var mode = 0;
var indicate = [];
var gradient = [];
var current = 'black';
var ongoing = false;
var diravitive = [];
var dashed = [];
var linestyle = [];
var filling = [];
var centers = [];
var polyc = null; 

var moving = null;
var moved = {};

let drawing = false;
let finished = true;
let sticked = false;
let points = [];
let pathsry = [];
let esp = true;
var isolate = false; 

put.addEventListener('click', ()=>{
  isolate = true; 
}); 

window.addEventListener('load', ()=>{
  opti.style.left = window.innerWidth - pw + "px";
  topl.style.top = window.innerHeight - ph + "px";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  arrow_up.classList.add('hid');
  arrow_left.classList.add('hid');
  l_l.textContent = 'Move';
});

function oMousePos(e){
  var rc = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rc.left,
    y: e.clientY - rc.top,
  }
}

function turn_of(){
  finished = true;
  ongoing = false;
  drawing = false;
}

function step_up(indi){
  indicate.push(indi);
  linestyle.push(dashed);
  gradient.push(current);
}

function step_down(){
  pathsry.splice(-1, 1);
  indicate.splice(-1, 1);
  linestyle.splice(-1, 1);
  gradient.splice(-1, 1);
  diravitive.splice(-1, 1);
  filling.splice(-1, 1);
  centers.splice(-1, 1);
}

draw.addEventListener('click', ()=>{
  isolate = false; 
  esp = false;
  mode = 1;
  turn_of();
});

line.addEventListener('click', ()=>{
  isolate = false; 
  esp = false;
  mode = 2;
  turn_of();
});

rectangle.addEventListener('click', ()=>{
  isolate = false; 
  esp = false;
  mode = 3;
  turn_of();
});

circ.addEventListener('click', ()=>{
  isolate = false; 
  esp = false;
  mode = 4;
  turn_of();
});

circl.addEventListener('click', ()=>{
  isolate = false; 
  esp = false;
  mode = 5;
  turn_of();
})

bezi.addEventListener('click', ()=>{
  isolate = false; 
  esp = false;
  mode = 6;
  turn_of();
})

erase.addEventListener('click', ()=>{
  isolate = false; 
  esp = false;
  mode = 7;
  turn_of();
})

ovem.addEventListener('click', ()=>{
  isolate = false; 
  esp = false;
  mode = 8;
  turn_of();
})

rotat.addEventListener('click', ()=>{
  isolate = false; 
  esp = false;
  mode = 9;
  turn_of();
})

scal.addEventListener('click', ()=>{
  isolate = false; 
  esp = false;
  mode = 10;
  turn_of();
})

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

poly.addEventListener('click', ()=>{
  var colp = prompt("Polygon", 5); 
  if(colp != null){
    if(!isInt(colp)){
      window.alert("Please enter a whole number");
    }else{
      colp = parseInt(colp); 
      if(colp < 3){
        window.alert("Please enter a larger number"); 
        return
      }
      isolate = false; 
      esp = false;
      mode = 11;
      turn_of();
      polyc = colp; 
    }
  }
})

sweep.addEventListener('click', ()=>{
  isolate = false; 
  var confi = confirm('Are you sure? This cannot be undone, and will delete everything that you have drawn.');
  if(confi == true){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    esp = true;
    drawing = false;
    finished = true;
    points = [];
    pathsry = [];
    previous = {x: 0, y: 0};
    mouse = {x: 0, y: 0};
    mode = 0;
    indicate = [];
    gradient = [];
    ongoing = false;
    diravitive = [];
    linestyle = [];
    filling = [];
  }
});

ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

function color_sel(){
  turn_of();
  isolate = false; 
  var arr = [];
  [sel.value, gal.value, mel.value, dal.value, pal.value].forEach(cc=>{
    if(cc != 'none'){
      arr.push(cc);
    }
  });
  switch(arr.length){
    case 1:
      current = arr[0];
    break;
    case 2:
      var rc = canvas.getBoundingClientRect();
      current = ctx.createLinearGradient(rc.left, rc.top, rc.right, rc.bottom);
      current.addColorStop(0, arr[0]);
      current.addColorStop(1, arr[1]);
    break;
    case 3:
      var rc = canvas.getBoundingClientRect();
      current = ctx.createLinearGradient(rc.left, rc.top, rc.right, rc.bottom);
      current.addColorStop(0, arr[0]);
      current.addColorStop(0.5, arr[1]);
      current.addColorStop(1, arr[2]);
    break;
    case 4:
      var rc = canvas.getBoundingClientRect();
      current = ctx.createLinearGradient(rc.left, rc.top, rc.right, rc.bottom);
      current.addColorStop(0, arr[0]);
      current.addColorStop(0.33, arr[1]);
      current.addColorStop(0.67, arr[2]);
      current.addColorStop(1, arr[3]);
    break;
    case 5:
      var rc = canvas.getBoundingClientRect();
      current = ctx.createLinearGradient(rc.left, rc.top, rc.right, rc.bottom);
      current.addColorStop(0, arr[0]);
      current.addColorStop(0.25, arr[1]);
      current.addColorStop(0.5, arr[2]);
      current.addColorStop(0.75, arr[3]);
      current.addColorStop(1, arr[4]);
    break;
  }
}

sel.addEventListener('click', color_sel);
gal.addEventListener('click', color_sel);
mel.addEventListener('click', color_sel);
dal.addEventListener('click', color_sel);
pal.addEventListener('click', color_sel);

function assign_previous(e){
  if(sticked && pathsry.length != 0 && pathsry[pathsry.length - 1].length != 0){
    var lt = pathsry[pathsry.length - 1];
    var ltl = lt[lt.length - 1];
    previous = {x: ltl.x, y: ltl.y};
  }else{
    previous = oMousePos(e);
  }
}

function md_line(e){
  if(finished){
      step_up('point sketch'); 
      diravitive.push(parseInt(put.value));
      finished = false;
      assign_previous(e);
      pathsry.push([{x: previous.x, y: previous.y}]);
  }
}

function mm_line(e){
  if(finished || !drawing) return;
  drawPaths();
  mouse = oMousePos(e);
  ctx.beginPath();
  ctx.moveTo(previous.x, previous.y);
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
}

function mu_line(e){
  mouse = oMousePos(e);
  previous = {x: mouse.x, y: mouse.y};
  pathsry[pathsry.length - 1].push({x: mouse.x, y: mouse.y});
  drawPaths();
  if(indicate[indicate.length - 1] != 'point sketch'){
    step_up('point sketch');
    diravitive.push(parseInt(put.value));
  }
}

function md_draw(e){
  drawing = true;
  mouse = oMousePos(e);
  points = [];
  ctx.strokeStyle = current;
  ctx.setLineDash([]);
  ctx.lineWidth = parseInt(put.value);
  if(sticked){
    assign_previous(e);
    ctx.beginPath();
    ctx.moveTo(previous.x, previous.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
    points.push({x:previous.x, y:previous.y});
  }
  points.push({x:mouse.x,y:mouse.y});
  mm_draw(e);
}

function mm_draw(e){
  if(!drawing) return;
  ctx.setLineDash([]);
  previous = {x:mouse.x,y:mouse.y};
  mouse = oMousePos(e);
  points.push({x:mouse.x,y:mouse.y});
  ctx.beginPath();
  ctx.moveTo(previous.x,previous.y);
  ctx.lineTo(mouse.x,mouse.y);
  ctx.stroke();
}

function mu_draw(e){
  drawing = false;
  pathsry.push(points);
  step_up('free hand');
  diravitive.push(parseInt(put.value));
  ctx.beginPath();
  drawPaths();
}

function md_rectangle(e){
  drawing = true;
  assign_previous(e);
}

function mm_rectangle(e){
  if(!drawing) return;
  drawPaths();
  mouse = oMousePos(e);
  ctx.strokeStyle = current;
  ctx.setLineDash(dashed);
  ctx.lineWidth = parseInt(put.value);
  op_poly([{x:previous.x,y:previous.y},{x:previous.x,y:mouse.y},{x:mouse.x,y:mouse.y},{x:mouse.x,y:previous.y}]);
}

function mu_rectangle(e){
  drawing = false;
  mouse = oMousePos(e);
  op_poly([{x:previous.x,y:previous.y},{x:previous.x,y:mouse.y},{x:mouse.x,y:mouse.y},{x:mouse.x,y:previous.y}]);
  pathsry.push([{x:previous.x,y:previous.y},{x:previous.x,y:mouse.y},{x:mouse.x,y:mouse.y},{x:mouse.x,y:previous.y}]);
  step_up('rectangle');
  diravitive.push(parseInt(put.value));
}

function md_circ(e){
  drawing = true;
  assign_previous(e);
}

function mm_circ(e){
  if(!drawing) return;
  drawPaths();
  ctx.strokeStyle = current;
  ctx.setLineDash(dashed);
  ctx.lineWidth = parseInt(put.value);
  mouse = oMousePos(e);
  op_circ([previous, mouse]);
}

function mu_circ(e){
  drawing = false;
  mouse = oMousePos(e);
  op_circ([previous, mouse]);
  pathsry.push([{x: previous.x, y: previous.y}, {x: mouse.x, y: mouse.y}]);
  step_up('two point circle');
  diravitive.push(parseInt(put.value));
}

function md_circl(e){
  drawing = true;
  assign_previous(e);
}

function mm_circl(e){
  if(!drawing) return;
  drawPaths();
  ctx.strokeStyle = current;
  ctx.setLineDash(dashed);
  ctx.lineWidth = parseInt(put.value);
  mouse = oMousePos(e);
  op_circl([previous, mouse]);
}

function mu_circl(e){
  drawing = false;
  mouse = oMousePos(e);
  op_circl([previous, mouse]);
  pathsry.push([{x: previous.x, y: previous.y}, {x: mouse.x, y: mouse.y}]);
  step_up('circle');
  diravitive.push(parseInt(put.value));
}


function red(num){
  if(num == 0) return 1;
  var val = 1;
  for(let i = 1; i < num + 1; i++){
    val *= i;
  }
  return val
}

function pascal(row, col){
  return red(row) / (red(col) * red(row - col))
}

function beach(t, pts){
  var row = pts.length - 1;
  dx = 0;
  dy = 0
  for(let i = 0; i <= row; i++){
    let pre = pascal(row, i) * ((1 - t) ** (row - i)) * (t ** i);
    dx += pre * pts[i].x;
    dy += pre * pts[i].y;
  }
  return {x: Math.round(dx*1000)/1000,
          y: Math.round(dy*1000)/1000}
}

function bezier(pts, n){
  var ad = 0;
  var part = 1 / (n - 1);
  var collect = [];
  for(let i = 0; i < n; i++){
    collect.push(beach(ad, pts));
    ad += part;
  }
  return collect
}

function ctx_bezier(pts, n){
  var ref = bezier(pts, n);
  ctx.beginPath();
  ctx.moveTo(ref[0].x, ref[0].y);
  for(let i = 0; i < ref.length; i ++){
    ctx.lineTo(ref[i].x, ref[i].y);
  }
  ctx.stroke();
}

function md_bezi(e){
  drawing = true;
  mouse = oMousePos(e);
  if(!ongoing){
    ongoing = true;
    points = [];
    step_up('bezier curve');
    diravitive.push(parseInt(put.value));
    if(sticked){
      assign_previous(e);
      pathsry.push([{x: previous.x, y: previous.y}, {x: mouse.x, y: mouse.y}, null])
    }else{
      pathsry.push([{x: mouse.x, y: mouse.y}, null]);
    }
  }else{
    pathsry[pathsry.length - 1].push(null);
  }
}

function mm_bezi(e){
  if(!drawing) return;
  mouse = oMousePos(e);
  var la = pathsry[pathsry.length - 1];
  pathsry[pathsry.length - 1][la.length - 1] = {x: mouse.x, y: mouse.y}
  drawPaths();
}

function mu_bezi(e){
  drawing = false;
  mouse = oMousePos(e);
  var la = pathsry[pathsry.length - 1];
  pathsry[pathsry.length - 1][la.length - 1] = {x: mouse.x, y: mouse.y}
  drawPaths();
}

function md_erase(e){
  drawing = true;
  assign_previous(e);
}

function mm_erase(e){
  if(!drawing) return;
  drawPaths();
  mouse = oMousePos(e);
  ctx.lineWidth = 1;
  op_erase([previous, mouse]);
}

function mu_erase(e){
  drawing = false;
  mouse = oMousePos(e);
  op_erase([previous, mouse]);
  pathsry.push([{x: previous.x, y: previous.y}, {x: mouse.x, y: mouse.y}]);
  indicate.push('erase');
  gradient.push('black');
  linestyle.push(dashed);
  diravitive.push(1);
}


function before_escape(indices){
  // first, previous
  if(indicate.length == 0){
    moving = null;
    l_l.textContent = 'Move';
    return null; 
  }else if(indices < 0 || indices > indicate.length - 1){
    return null;
  }
  var it = indicate[indices];
  while(['move', 'rotate', 'scale'].includes(it)){
    if(indices < 0){
      return null;
    }
    indices -= 1;
    it = indicate[indices];
  }
  return indices;
}

function after_escape(indices){
  // next, last
  if(indicate.length == 0){
    moving = null;
    l_l.textContent = 'Move';
    return null; 
  }else if(indices < 0 || indices > indicate.length - 1){
    return null;
  }
  var it = indicate[indices];
  while(['move', 'rotate', 'scale'].includes(it)){
    if(indices > indicate.length-1){
      return null;
    }
    indices += 1;
    it = indicate[indices];
    if(it == null) return null; 
  }
  return indices;
}

function display_label(){
  var keyl = Object.keys(moved);
  var flow = 0;
  keyl.forEach(k=>{
    if(k < moving){
      flow += 1;
    }
  });
  l_l.textContent = (moving + 1 - flow + ' ' + indicate[moving])
}

function jump_first(){
  isolate = false; 
  var be = before_escape(0);
  if(be != null){
    moving = be;
    display_label();
  }
}

function jump_previous(){
  isolate = false; 
  var be = before_escape(moving - 1);
  if(be != null){
    moving = be;
    display_label();
  }
}

function jump_next(){
  isolate = false; 
  var ae = after_escape(moving + 1);
  if(ae != null){
    moving = ae;
    display_label();
  }
}

function jump_last(){
  isolate = false; 
  var ae = after_escape(indicate.length - 1);
  if(ae != null){
    moving = ae;
    display_label();
  }
}

__m.addEventListener('click', jump_first);
_m.addEventListener('click', jump_previous);
m_.addEventListener('click', jump_next);
m__.addEventListener('click', jump_last);

function assign_l_l(){
  if([8, 9, 10].includes(mode)) return; 
  var be = before_escape(indicate.length - 1);
  if(be != null){
    moving = be;
    display_label();
  }
}

function right_hide(){
  isolate = false; 
  arrow_left.classList.remove('hid');
  arrow_right.classList.add('hid');
}

function right_show(){
  isolate = false; 
  arrow_left.classList.add('hid');
  arrow_right.classList.remove('hid');
}

function top_hide(){
  isolate = false; 
  arrow_up.classList.add('hid');
  arrow_down.classList.remove('hid');
}

function top_show(){
  isolate = false; 
  arrow_up.classList.remove('hid');
  arrow_down.classList.add('hid');
}

arrow_up.addEventListener('click', top_control);
arrow_down.addEventListener('click', top_control);
arrow_left.addEventListener('click', right_control);
arrow_right.addEventListener('click', right_control);

function button_click(cond, butt){
  if(cond){
    butt.classList.remove('pressdown');
    return false;
  }else{
    butt.classList.add('pressdown');
    return true;
  }
}

function clc(pt1, pt2){
  return {x:(pt1.x+pt2.x)/2,y:(pt1.y+pt2.y)/2}; 
}

function avoid_lim(pair){
  if(pair[0].x  == pair[1].x){
    return [{x:pair[0].x+0.01,y:pair[0].y}, pair[1]]; 
  }else{
    return pair; 
  }
  if(pair[0].y == pair[1].y){
    return [{x:pair[0].x, y:pair[0].y+0.01}, pair[1]]; 
  }else{
    return pair; 
  }
}

function ili(pa1, pa2){
  pa1 = avoid_lim(pa1); 
  pa2 = avoid_lim(pa2);
  var m1 = (pa1[1].y-pa1[0].y)/(pa1[1].x-pa1[0].x);
  var c1 = pa1[0].y-m1*pa1[0].x;
  var m2 = (pa2[1].y-pa2[0].y)/(pa2[1].x-pa2[0].x);
  var c2 = pa2[0].y-m2*pa2[0].x;
  return {
    x: (c2-c1)/(m1-m2), 
    y: m1*((c2-c1)/(m1-m2))+c1, 
  }
}

function polygon_centre(cpoints){
  if(cpoints.length%2==0){
    var p1 = cpoints[0];
    var p2 = cpoints[cpoints.length/2];
    return clc(p1, p2); 
  }else{
    if(cpoints.length == 3){
      var s1 = cpoints[0];
      var l1 = clc(cpoints[1], cpoints[2]); 
      var s2 = cpoints[1]; 
      var l2 = clc(cpoints[0], cpoints[2]);  
    }else{
      var s1 = cpoints[0];
      var l1 = clc(cpoints[((cpoints.length-1)/2)], cpoints[((cpoints.length-1)/2)+1]); 
      var s2 = cpoints[1];
      var l2 = clc(cpoints[((cpoints.length-1)/2)+1], cpoints[((cpoints.length-1)/2)+2]); 
    }
    return ili([s1, l1], [s2, l2]); 
  }
}

function calc_centre(){
  if(pathsry.length == 0) return; 
  if(mode == 8){
    centers.push(null);
    var i = Object.keys(moved)[Object.keys(moved).length - 1];
    var m = moved[Object.keys(moved)[Object.keys(moved).length - 1]][0];
    var p = moved[Object.keys(moved)[Object.keys(moved).length - 1]][1];
    if(indicate[m] == 'rectangle'){
      var p1 = pathsry[m][0];
      var p2 = pathsry[m][2];
      centers[m] = clc(p1, p2);
      return
    }else if(indicate[m] == 'polygon'){
      centers[m] = polygon_centre(pathsry[m]); 
      return
    }
    var p1 = pathsry[m][0];
    var p2 = pathsry[m][(pathsry[m]).length-1];
    centers[m] = clc(p1, p2);
    return
  }else if(mode == 9 || mode == 10){
    centers.push(null);
    return
  }else if(mode == 3){
    var p1 = pathsry[pathsry.length-1][0];
    var p2 = pathsry[pathsry.length-1][2];
    centers.push(clc(p1, p2));
    return
  }else if(mode == 11){
    centers.push(polygon_centre(pathsry[pathsry.length-1])); 
    return
  }
  var p1 = pathsry[pathsry.length-1][0];
  var p2 = pathsry[pathsry.length-1][(pathsry[pathsry.length-1]).length-1];
  if(centers.length >= pathsry.length) centers.pop();
  centers.push(clc(p1, p2));
}

function md_base(e, name){
  if(moving == null) return;
  drawing = true;
  indicate.push(name);
  pathsry.push(null);
  linestyle.push(null);
  gradient.push(null);
  diravitive.push(null);
  filling.push(null);

  previous = oMousePos(e);

  var cc = indicate.length - 1;
  var ca = [];
  var te = [];
  if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon'].includes(indicate[moving])){
    pathsry[moving].forEach(pt=>{
      te.push({x:pt.x, y:pt.y});
    });
  }else{
    te.push([
        {x:pathsry[moving][0].x, y:pathsry[moving][0].y},
        {x:pathsry[moving][1].x, y:pathsry[moving][1].y}
      ]);
  }
  ca = [moving, te, centers[moving]];
  moved[cc] = ca;
}

function get_dif(e){
  movedpoint = oMousePos(e);
  x_dif = movedpoint.x - previous.x;
  y_dif = movedpoint.y - previous.y;
  return [x_dif, y_dif]
}

function move_it(dif){
  if(moving == null) return;
  var te = [];
  var referred = moved[Object.keys(moved)[Object.keys(moved).length - 1]][1];
  if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon'].includes(indicate[moving])){
    var want = [];
    referred.forEach(pt=>{
      want.push({x: pt.x + dif[0], y: pt.y + dif[1]});
    });
    pathsry[moving] = want;
  }else{
    pathsry[moving] = [
      {x: referred[0][0].x + dif[0], y: referred[0][0].y + dif[1]},
      {x: referred[0][1].x + dif[0], y: referred[0][1].y + dif[1]}
    ];
  }
}

function mm_move(e){
  if(!drawing) return;
  move_it(get_dif(e));
  drawPaths();
}

function mu_move(e){
  drawing = false;
  move_it(get_dif(e));
  drawPaths();
}

function get_rad(x, y){
  var rad = Math.atan(y/x);
  if(x < 0 && y > 0){
    rad = Math.PI + rad; 
  }else if(x < 0 && y < 0){
    rad = Math.PI + rad; 
  }else if(x > 0 && y < 0){
    rad = 2 * Math.PI + rad; 
  }
  return rad; 
}

function rotate_degree(cen, mou, pre){
  pre_rad = get_rad(pre.x-cen.x, cen.y-pre.y); 
  mou_rad = get_rad(mou.x-cen.x, cen.y-mou.y);
  return mou_rad - pre_rad; 
}

function rotate_by_origin(pt, rt){
  var phi = get_rad(pt.x, pt.y) + rt;
  var r = (pt.x**2+pt.y**2)**0.5; 
  if(phi > 2*Math.PI){
    phi -= 2*Math.PI;
  }
  if(0 < phi < Math.PI*0.5){
    return{x: Math.cos(phi)*r, y: Math.sin(phi)*r}; 
  }else if(Math.PI*0.5 < phi < Math.PI){
    phi -= 0.5*Math.PI;
    return{x: -Math.cos(phi)*r, y: Math.sin(phi)*r}; 
  }else if(Math.PI < phi < Math.PI*(2/3)){
    phi -= Math.PI; 
    return{x: -Math.cos(phi)*r, y: -Math.sin(phi)*r}; 
  }else{
    phi -= (2/3)*Math.PI; 
    return{x: Math.cos(phi)*r, y: -Math.sin(phi)*r}; 
  }
}

function rotate_one(ori, pt, rt){
  var bk = {x:pt.x - ori.x, y:pt.y - ori.y}; 
  var rbk = rotate_by_origin(bk, rt); 
  return {x: rbk.x + ori.x, y: rbk.y + ori.y}; 
}

function rotate_it(rt){
  if(moving == null) return;
  var te = [];
  var referred = moved[Object.keys(moved)[Object.keys(moved).length - 1]][1];
  if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon'].includes(indicate[moving])){
    var want = [];
    referred.forEach(pt=>{
      want.push(rotate_one(centers[moving], pt, rt));
    });
    pathsry[moving] = want;
  }else{
    pathsry[moving] = [
      rotate_one(centers[moving], referred[0][0], rt),
      rotate_one(centers[moving], referred[0][1], rt),
    ];
  }
}

function mm_rotate(e){
  if(!drawing) return;
    rotate_it(rotate_degree(centers[moving], previous, oMousePos(e)));
    drawPaths();
}

function mu_rotate(e){
  drawing = false;
  rotate_it(rotate_degree(centers[moving], previous, oMousePos(e)));
  drawPaths();
}

function drag_ratio(mou){
  var cen = centers[moving];
  return {x:(mou.x-cen.x)/(previous.x-cen.x), y:(mou.y-cen.y)/(previous.y-cen.y)}; 
}

function scale_it(ratio){
  if(moving == null) return;
  var cen = centers[moving];
  var te = [];
  var referred = moved[Object.keys(moved)[Object.keys(moved).length - 1]][1];
  if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon'].includes(indicate[moving])){
    var want = [];
    referred.forEach(pt=>{
      want.push({x: (pt.x-cen.x)*ratio.x+cen.x, y: (pt.y-cen.y)*ratio.y+cen.y});
    });
    pathsry[moving] = want;
  }else{
    pathsry[moving] = [
      {x: (referred[0][0].x-cen.x)*ratio.x+cen.x, y: (referred[0][0].y-cen.y)*ratio.y+cen.y},
      {x: (referred[0][1].x-cen.x)*ratio.x+cen.x, y: (referred[0][1].y-cen.y)*ratio.y+cen.y}
    ];
  }
}

function mm_scale(e){
  if(!drawing) return;
  scale_it(drag_ratio(oMousePos(e)));
  drawPaths();
}

function mu_scale(e){
  drawing = false;
  scale_it(drag_ratio(oMousePos(e)));
  drawPaths();
}

function nPolyDots(n, cen, pt){
  var inde = 2*Math.PI/n; 
  var cont = [];
  cont.push(pt);  
  for(let i=1; i<n; i++){
    cont.push(rotate_one(cen, pt, i*inde)); 
  }
  return cont; 
}

function md_poly(e){
  drawing = true; 
  assign_previous(e); 
}

function mm_poly(e){
  if(!drawing) return;
  drawPaths();
  mouse = oMousePos(e);
  ctx.strokeStyle = current;
  ctx.setLineDash(dashed);
  ctx.lineWidth = parseInt(put.value);
  op_poly(nPolyDots(polyc, previous, oMousePos(e))); 
}

function mu_poly(e){
  drawing = false;
  mouse = oMousePos(e);
  var this_path = nPolyDots(polyc, previous, oMousePos(e)); 
  op_poly(this_path); 
  pathsry.push(this_path); 
  step_up('polygon')
  diravitive.push(parseInt(put.value));
}

function md(e){
  ctx.lineWidth = parseInt(put.value);
  ctx.strokeStyle = current;
  ctx.setLineDash(dashed);
  if(finished && !ongoing && (!([8, 9, 10].includes(mode)))){
    if(f_clicked){
      filling.push(true);
    }else{
      filling.push(false);
    }
  }
  switch (mode) {
    case 0:
      return
    break;
    case 1:
      md_draw(e);
      break;
    case 2:
      md_line(e);
      break;
    case 3:
      md_rectangle(e);
      break;
    case 4:
      md_circ(e);
      break;
    case 5:
      md_circl(e);
      break;
    case 6:
      md_bezi(e);
      break;
    case 7:
      md_erase(e);
      break;
    case 8:
      if(moving==null) return; 
      md_base(e, 'move');
      break;
    case 9:
      if(indicate[indicate.length-1]=='erase' || moving==null) return; 
      md_base(e, 'rotate'); 
      break; 
    case 10:
      if(moving==null) return; 
      md_base(e, 'scale'); 
      break; 
    case 11:
      md_poly(e); 
      break; 
  }
}

function mm(e){
  switch (mode) {
    case 0:
      return
    break;
    case 1:
      mm_draw(e);
      break;
    case 2:
      mm_line(e);
      break;
    case 3:
      mm_rectangle(e);
      break;
    case 4:
      mm_circ(e);
      break;
    case 5:
      mm_circl(e);
      break;
    case 6:
      mm_bezi(e);
      break;
    case 7:
      mm_erase(e);
      break;
    case 8:
      if(moving==null) return; 
      mm_move(e);
      break;
    case 9:
      if(indicate[indicate.length-1]=='erase' || moving==null) return; 
      mm_rotate(e);
      break;
    case 10:
      if(moving==null) return; 
      mm_scale(e);
      break; 
    case 11:
      mm_poly(e); 
      break; 
  }
  if(f_clicked && drawing){
    ctx.fillStyle = current;
    ctx.fill();
  }
}

function mu(e){
  switch (mode) {
    case 0:
      return
    break;
    case 1:
      mu_draw(e);
      break;
    case 2:
      mu_line(e);
      break;
    case 3:
      mu_rectangle(e);
      break;
    case 4:
      mu_circ(e);
      break;
    case 5:
      mu_circl(e);
      break;
    case 6:
      mu_bezi(e);
      break;
    case 7:
      mu_erase(e);
      break;
    case 8:
      if(moving==null) return; 
      mu_move(e);
      break;
    case 9:
      if(indicate[indicate.length-1]=='erase' || moving==null) return; 
      mu_rotate(e);
      break; 
    case 10:
      if(moving==null) return; 
      mu_scale(e); 
      break; 
    case 11:
      mu_poly(e); 
      break; 
  }
  if(f_clicked){
    ctx.fillStyle = current;
    ctx.fill();
  }
  assign_l_l();
  calc_centre();
}

function op_line(patharr){
  ctx.beginPath();
  ctx.moveTo(patharr[0].x, patharr[0].y);
  for(let i = 1; i < patharr.length; i++){
    ctx.lineTo(patharr[i].x, patharr[i].y);
  }
  ctx.stroke();
}

function op_poly(patharr){
  var tatharr = []; 
  patharr.forEach(pt=>{
    tatharr.push(pt); 
  });
  tatharr.push({x:patharr[0].x, y:patharr[0].y});
  op_line(tatharr);
}

function op_circ(patharr){
  ctx.beginPath()
  ctx.arc(
    (patharr[1].x + patharr[0].x)/2.0,
    (patharr[1].y + patharr[0].y)/2.0,
    ((((patharr[1].x - patharr[0].x) ** 2) + ((patharr[1].y - patharr[0].y) ** 2)) ** 0.5) / 2.0,
    0,
    2 * Math.PI
    );
  ctx.stroke();
}

function op_circl(patharr){
  ctx.beginPath();
  ctx.arc(
    patharr[0].x,
    patharr[0].y,
    (((patharr[1].x - patharr[0].x) ** 2) + ((patharr[1].y - patharr[0].y) ** 2)) ** 0.5,
    0,
    2 * Math.PI
    );
  ctx.stroke();
}

function op_bezi(patharr){
  ctx_bezier(patharr, 100);
}

function op_erase(patharr){
  var pre = patharr[0];
  var mou = patharr[1];
  var x = 0;
  var y = 0;
  var width = 0;
  var height = 0;
  switch([previous.x < mouse.x, previous.y < mouse.y].join(" ")){
    case "true false":
      x = pre.x;
      y = mou.y;
      width = mou.x - pre.x;
      height = pre.y - mou.y;
    break;
    case "false true":
      x = mou.x;
      y = pre.y;
      width = pre.x - mou.x;
      height = mou.y - pre.y;
    break;
    case "false false":
      x = mou.x;
      y = mou.y;
      width = pre.x - mou.x;
      height = pre.y - mou.y;
    break;
    case "true true":
      x = pre.x;
      y = pre.y;
      width = mou.x - pre.x;
      height = mou.y - pre.y;
    break;
  }
  ctx.clearRect(x, y, width, height);
}

function drawPaths(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let d = 0; d < pathsry.length; d++){
    let indarr = indicate[d];
    if(['move', 'rotate', 'scale'].includes(indarr)){continue;};
    let patarr = pathsry[d];
    let ls = linestyle[d];
    let tf = filling[d];
    ctx.lineWidth = diravitive[d];
    ctx.strokeStyle = gradient[d];
    ctx.setLineDash(ls);
     switch (indarr){
      case 'free hand':
        op_line(patarr);
      break;
      case 'point sketch':
        op_line(patarr);
      break;
      case 'rectangle':
        op_poly(patarr);
      break;
      case 'two point circle':
        op_circ(patarr);
      break;
      case 'circle':
        op_circl(patarr);
      break;
      case 'bezier curve':
        op_bezi(patarr);
      break;
      case 'erase':
        op_erase(patarr);
      break;
      case 'polygon':
        op_poly(patarr);
      break; 
    }
    if(tf){
      ctx.fillStyle = gradient[d];
      ctx.fill();
    }
  }
}

canvas.addEventListener('mousedown', e=>{
  isolate = false; 
  if(esp) return;
  drawing = true;
  md(e);
});

canvas.addEventListener('mousemove', e=>{
  mm(e);
});

canvas.addEventListener('mouseup', e=>{
  drawing = false;
  mu(e);
});

function undo_line(){
  if(pathsry.length == 0) return;
  var al = pathsry.length - 1;
  if(pathsry[al].length == 2){
    finished = true;
    step_down();
  }else{
    pathsry[al].splice(-1, 1);
    var vl = pathsry[al].length - 1;
    previous = {x: pathsry[al][vl].x, y: pathsry[al][vl].y};
  }
  drawPaths();
}

function undo_base(){
    var i = Object.keys(moved)[Object.keys(moved).length - 1];
    var mpc = moved[Object.keys(moved)[Object.keys(moved).length - 1]];
    step_down();
    if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon'].includes(indicate[mpc[0]])){
      pathsry[mpc[0]] = mpc[1];
      centers[mpc[0]] = mpc[2]; 
    }else{
      pathsry[mpc[0]] = mpc[1][0];
      centers[mpc[0]] = mpc[2]; 
    }
    drawPaths();
    delete moved[i];
}

function u_n_d_o(){
  isolate = false; 
  var lt = indicate[indicate.length - 1];
  switch (lt) {
    case 'point sketch':
      undo_line();
      break;
    case 'bezier curve':
      undo_line();
      break;
    case 'move':
      undo_base();
      break;
    case 'rotate':
      undo_base();
      break;
    case 'scale':
      undo_base();
      break;
    default:
      step_down();
      drawPaths();
  }
  assign_l_l();
}

undo.addEventListener('click', u_n_d_o);

stick.addEventListener('click', ()=>{
  isolate = false; 
  l_clicked = button_click(l_clicked, stick);
  turn_of();
  if(sticked){
    sticked = false;
  }else{
    sticked = true;
  }
});

function set_dash(){
  if(dashed.length == 0){
    if(put.value <= 0){
      window.alert('Please enter a positive number')
      dashed = [10, 10];
    }else{
      dashed = [put.value, put.value];
    }
  }else{
    dashed = [];
  }
}

dash.addEventListener('click', ()=>{
  isolate = false; 
  d_clicked = button_click(d_clicked, dash);
  turn_of();
  set_dash();
})

filled.addEventListener('click', ()=>{
  isolate = false; 
  f_clicked = button_click(f_clicked, filled);
  turn_of();
})

function top_control(){
  if(ind2){
    // hide top panel
    top_show();
    ind2 = false;
    topl.classList.remove('vis');
    topl.classList.add('hid');
  }else{
    // show top panel
    top_hide();
    ind2 = true;
    topl.style.top = window.innerHeight - ph + "px";
    topl.classList.remove('hid');
    topl.classList.add('vis');
  }
}

function right_control(){
  if(ind1){
    // hide right panel
    right_hide();
    ind1 = false;
    opti.classList.remove('vis');
    opti.classList.add('hid');
  }else{
    // show right panel
    right_show();
    ind1 = true;
    opti.style.left = window.innerWidth - pw + "px";
    opti.classList.remove('hid');
    opti.classList.add('vis');
  }
}

window.addEventListener('resize', ()=>{
  isolate = false; 
  opti.style.left = window.innerWidth - pw + "px";
  topl.style.top = window.innerHeight - ph + "px";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawPaths();
});

function KeyPress(e) {
  if(isolate) return; 
  var evtobj = window.event? event : e
  if (evtobj.keyCode == 90 && evtobj.ctrlKey){
    turn_of();
    u_n_d_o();
  }else if (evtobj.keyCode == 188) {
    top_control()
  }else if (evtobj.keyCode == 190) {
    right_control();
  }else if (evtobj.keyCode == 13){
    turn_of();
    d_clicked = false;
    dash.classList.add('pressdown');
    set_dash();
    d_clicked = true;
  }else if (evtobj.keyCode == 37){
    jump_previous(); 
  }else if (evtobj.keyCode == 39){
    jump_next(); 
  }
}

document.onkeydown = KeyPress;
