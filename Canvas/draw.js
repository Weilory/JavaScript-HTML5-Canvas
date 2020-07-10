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

class Group{
  static centroid(pts){
    var rx = 0; 
    var ry = 0; 
    for(let i = 0; i < pts.length; i++){
      rx += pts[i].x
      ry += pts[i].y;
    }
    return {
      x: (Math.round(1000*rx/pts.length))/1000,
      y: (Math.round(1000*ry/pts.length))/1000, 
    }; 
  }

  constructor(){
    this._pathsry = []; 
    this._indicate = []; 
    this._linestyle = []; 
    this._gradient = []; 
    this._diravitive = [];
    this._filling = [];
    this._centers = [];
    this._hardcore = [];
    this.center = null; 
    this.associated = null; 
  }

  initialize(ind){
    // ind => moving: current MOVE index
    for(let i=ind; i<pathsry.length; i++){
      if(['move', 'rotate', 'scale', 'group move', 'group rotate', 'group scale'].includes(indicate[i])){continue;};
      if(indicate[i] == 'group'){
        this.appender(pathsry[i]); 
        continue; 
      }
      this._indicate.push(indicate[i]);
      this._gradient.push(gradient[i]);
      this._diravitive.push(diravitive[i]);
      this._filling.push(filling[i]);   
      this._centers.push({x:centers[i].x,y:centers[i].y});
      var patcol = []; 
      for(let j=0;j<pathsry[i].length;j++){
        patcol.push({x: pathsry[i][j].x, y: pathsry[i][j].y}); 
      }
      this._pathsry.push(patcol); 
      var ficol = [];
      var secol = [];  
      for(let j=0;j<hardcore[i][0].length;j++){
        ficol.push(hardcore[i][0][j]);
        secol.push(hardcore[i][1][j]);
      }
      this._hardcore.push([ficol, secol]); 
      var lscol = []; 
      for(let j=0;j<linestyle[i].length;j++){
        lscol.push(linestyle[i][j]); 
      }
      this._linestyle.push(lscol); 
    }
    this.center = Group.centroid(this._centers);  
  }

  clone(){
    var newG = new Group();
    for(let i=0; i<this._pathsry.length; i++){
      newG._indicate.push(this._indicate[i]);
      newG._gradient.push(this._gradient[i]);
      newG._diravitive.push(this._diravitive[i]);
      newG._filling.push(this._filling[i]);
      newG._centers.push(this._centers[i]);
      var patcol = []; 
      for(let j=0;j<this._pathsry[i].length;j++){
        patcol.push({x: this._pathsry[i][j].x, y: this._pathsry[i][j].y}); 
      } 
      newG._pathsry.push(patcol);
      var ficol = [];
      var secol = []; 
      for(let j=0;j<this._hardcore[i][0].length;j++){
        ficol.push(this._hardcore[i][0][j]); 
        secol.push(this._hardcore[i][1][j]);
      }
      newG._hardcore.push([ficol, secol]);
      var lscol = []; 
      for(let j=0;j<this._linestyle[i].length;j++){
        lscol.push(this._linestyle[i][j]); 
      }
      newG._linestyle.push(lscol);
    }
    newG.center = Group.centroid(newG._centers); 
    return newG; 
  }

  appender(cls){
    for(let i=0;i<cls._pathsry.length;i++){
      this._indicate.push(cls._indicate[i]);
      this._gradient.push(cls._gradient[i]); 
      this._diravitive.push(cls._diravitive[i]);
      this._filling.push(cls._filling[i]);
      this._centers.push(cls._centers[i]);
      var patcol = []; 
      for(let j=0;j<cls._pathsry[i].length;j++){
        patcol.push({x: cls._pathsry[i][j].x, y: cls._pathsry[i][j].y}); 
      } 
      this._pathsry.push(patcol);
      var ficol = [];
      var secol = [];
      for(let j=0;j<cls._hardcore[i][0].length;j++){
        ficol.push(cls._hardcore[i][0][j]);
        secol.push(cls._hardcore[i][1][j]);
      }
      this._hardcore.push([ficol, secol]); 
      var lscol = []; 
      for(let j=0;j<cls._linestyle[i].length;j++){
        lscol.push(cls._linestyle[i][j]); 
      }
      this._linestyle.push(lscol); 
    }
    this.center = Group.centroid(this._centers); 
    return this; 
  }

  op_group(){
    for(let d=0;d<this._pathsry.length;d++){
      ctx.lineWidth = this._diravitive[d]; 
      ctx.strokeStyle = this._gradient[d]
      ctx.setLineDash(this._linestyle[d]); 
      var patarr = this._pathsry[d];
      switch(this._indicate[d]){
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
            op_poly(patarr);
          break;
          case 'polygon':
            op_poly(patarr);
          break; 
        }
        if(this._filling[d]){
          ctx.fillStyle = this._gradient[d];
            ctx.fill();
        }
    }
  }

  group_move(e, that){
    var dif = get_dif(e); 
    for(let i=0;i<that._centers.length;i++){
      this._centers[i] = {x:that._centers[i].x + dif[0], y:that._centers[i].y + dif[1]}; 
    }
    for(let i=0;i<that._pathsry.length;i++){
        if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon', 'erase'].includes(that._indicate[i])){
          var want = []; 
          that._pathsry[i].forEach(pt=>{
             want.push({x: pt.x + dif[0], y: pt.y + dif[1]});
          }); 
          this._pathsry[i] = want; 
        }else{
          this._pathsry[i] = [
            {x: that._pathsry[i][0].x + dif[0], y: that._pathsry[i][0].y + dif[1]},
              {x: that._pathsry[i][1].x + dif[0], y: that._pathsry[i][1].y + dif[1]}
          ];
        }
    }
    this.center = Group.centroid(this._centers);
    drawPaths(); 
  }

  group_rotate(e, that){
    var rt = rotate_degree(that.center, previous, oMousePos(e)); 
    for(let i=0;i<that._pathsry.length;i++){
        if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon', 'erase'].includes(that._indicate[i])){
          var want = []; 
          that._pathsry[i].forEach(pt=>{
            want.push(rotate_one(that.center, pt, rt)); 
          }); 
          this._pathsry[i] = want; 
      }else{
        this._pathsry[i] = [
          rotate_one(that.center, that._pathsry[i][0], rt),
          rotate_one(that.center, that._pathsry[i][1], rt)
        ]; 
      }
    }
    drawPaths(); 
  }

  static push_ratio(mou, cen){
    return {x:(mou.x-cen.x)/(previous.x-cen.x), y:(mou.y-cen.y)/(previous.y-cen.y)}; 
  }

  group_scale(e, that){
    var ratio = Group.push_ratio(oMousePos(e), this.center); 
    for(let i=0;i<that._pathsry.length;i++){
        if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon', 'erase'].includes(that._indicate[i])){
          var want = []; 
          that._pathsry[i].forEach(pt=>{
              want.push({x: (pt.x-that.center.x)*ratio.x+that.center.x, y: (pt.y-that.center.y)*ratio.y+that.center.y});
          }); 
          this._pathsry[i] = want; 
      }else{
        this._pathsry[i] = [
          {x: (that._pathsry[i][0].x-that.center.x)*ratio.x+that.center.x, y: (that._pathsry[i][0].y-that.center.y)*ratio.y+that.center.y},
              {x: (that._pathsry[i][1].x-that.center.x)*ratio.x+that.center.x, y: (that._pathsry[i][1].y-that.center.y)*ratio.y+that.center.y}
        ];
      }
    }
    drawPaths(); 
  }

  publish(){
    for(let i=0; i<this._pathsry.length; i++){
      oneSvgPath(this._pathsry[i], this._indicate[i], this._linestyle[i], this._hardcore[i], this._diravitive[i], this._filling[i]);
    }
  }

  static regret(){
    var i = Object.keys(moved)[Object.keys(moved).length - 1];
    pathsry[moved[i][0]] = moved[i][1];
    delete moved[i]; 
    step_down();
    drawPaths();
  }
}

function ctrl_c_group(){
  if(moving == null) return; 
  var gg = new Group();
  gg.initialize(moving); 
  var cgg = gg.clone(); 
  cgg.associated = gg; 
  pathsry.push(cgg); 
  indicate.push('group'); 
  linestyle.push(null); 
  gradient.push(null); 
  hardcore.push(null); 
  diravitive.push(null); 
  filling.push(null); 
  centers.push(null); 
  drawPaths(); 
  assign_l_l(); 
}

function md_base_group(e, name){
  var tg = pathsry[moving]; 
  tg.associated = tg.clone();
  previous = oMousePos(e); 
  indicate.push(name);
  pathsry.push(null);
  linestyle.push(null);
  gradient.push(null);
  hardcore.push(null);
  diravitive.push(null);
  filling.push(null);
  centers.push(null); 
  var cc = indicate.length-1;
  moved[cc] = [moving, pathsry[moving].clone()];
}

function mm_move_group(e){
  var th = pathsry[moving]; 
  var that = th.associated; 
  th.group_move(e, that); 
}

function mm_rotate_group(e){
  var th = pathsry[moving];
  var that = th.associated; 
  th.group_rotate(e, that);
}

function mm_scale_group(e){
  var th = pathsry[moving];
  var that = th.associated;
  th.group_scale(e, that); 
}

class Singleton{
  constructor(){
    this.ids = 0; 
  }

  new_id(){
    this.ids += 1; 
    return `gra${this.ids}`; 
  }

  last_id(){
    return `gra${this.ids}`;
  }

  rein(){
    this.ids = 0; 
  }
}

const sgl = new Singleton(); 

class SvgParser{
  constructor(){
    this.mstr = ""; 
    this.str = ""; 
  }

  tostr(strexp){
    this.str += strexp; 
  }

  establish(){
    var res = `<svg viewBox="0 0 ${window.innerWidth} ${window.innerHeight}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="white">${this.str}</svg>`;
    this.mstr = ""; 
    this.str = ""; 
    return res; 
  }
}

const str = new SvgParser();

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
var softcore = [[0], ['black']]; 
var hardcore = []; 
var ongoing = false;
var diravitive = [];
var dashed = [];
var linestyle = [];
var filling = [];
var centers = [];
var polyc = null; 

var moving = null;
var moved = {};

var isolate = false; 

let drawing = false;
let finished = true;
let sticked = false;
let points = [];
let pathsry = [];
let esp = true;

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
  };
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
  hardcore.push(softcore);
}

function step_down(){
  pathsry.splice(-1, 1);
  indicate.splice(-1, 1);
  linestyle.splice(-1, 1);
  gradient.splice(-1, 1);
  hardcore.splice(-1, 1);
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
    softcore = [[0], ['black']]; 
    hardcore = [];
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
      softcore = [[0], [arr[0]]]; 
    break;
    case 2:
      var rc = canvas.getBoundingClientRect();
      current = ctx.createLinearGradient(rc.left, rc.top, rc.right, rc.bottom);
      current.addColorStop(0, arr[0]);
      current.addColorStop(1, arr[1]);
      softcore = [[0, 1], [arr[0], arr[1]]]; 
    break;
    case 3:
      var rc = canvas.getBoundingClientRect();
      current = ctx.createLinearGradient(rc.left, rc.top, rc.right, rc.bottom);
      current.addColorStop(0, arr[0]);
      current.addColorStop(0.5, arr[1]);
      current.addColorStop(1, arr[2]);
      softcore = [[0, 0.5, 1], [arr[0], arr[1], arr[2]]]; 
    break;
    case 4:
      var rc = canvas.getBoundingClientRect();
      current = ctx.createLinearGradient(rc.left, rc.top, rc.right, rc.bottom);
      current.addColorStop(0, arr[0]);
      current.addColorStop(0.33, arr[1]);
      current.addColorStop(0.67, arr[2]);
      current.addColorStop(1, arr[3]);
      softcore = [[0, 0.33, 0.67, 1], [arr[0], arr[1], arr[2], arr[3]]]; 
    break;
    case 5:
      var rc = canvas.getBoundingClientRect();
      current = ctx.createLinearGradient(rc.left, rc.top, rc.right, rc.bottom);
      current.addColorStop(0, arr[0]);
      current.addColorStop(0.25, arr[1]);
      current.addColorStop(0.5, arr[2]);
      current.addColorStop(0.75, arr[3]);
      current.addColorStop(1, arr[4]);
      softcore = [[0, 0.25, 0.5, 0.75, 1], [arr[0], arr[1], arr[2], arr[3], arr[4]]]; 
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
  previous = {x:mouse.x,y:mouse.y};
  mouse = oMousePos(e);
  points.push({x:mouse.x,y:mouse.y});
  ctx.beginPath();
  ctx.moveTo(previous.x,previous.y);
  ctx.lineTo(mouse.x,mouse.y);
  ctx.stroke();
}

function mu_draw(e){
  pathsry.push(points);
  step_up('free hand');
  diravitive.push(parseInt(put.value));
  ctx.beginPath();
  drawPaths();
}

function md_rectangle(e){
  assign_previous(e);
}

function md_erase(e){
  assign_previous(e);
}

function mm_rectangle(e){
  drawPaths();
  mouse = oMousePos(e);
  ctx.strokeStyle = current;
  ctx.setLineDash(dashed);
  ctx.lineWidth = parseInt(put.value);
  op_poly([{x:previous.x,y:previous.y},{x:previous.x,y:mouse.y},{x:mouse.x,y:mouse.y},{x:mouse.x,y:previous.y}]);
}

function mm_erase(e){
  drawPaths();
  mouse = oMousePos(e);
  ctx.strokeStyle = 'white';
  ctx.setLineDash(dashed);
  ctx.lineWidth = parseInt(put.value);
  op_poly([{x:previous.x,y:previous.y},{x:previous.x,y:mouse.y},{x:mouse.x,y:mouse.y},{x:mouse.x,y:previous.y}]);
  ctx.fillStyle = 'white'; 
  ctx.fill(); 
}

function mu_rectangle(e){
  mouse = oMousePos(e);
  op_poly([{x:previous.x,y:previous.y},{x:previous.x,y:mouse.y},{x:mouse.x,y:mouse.y},{x:mouse.x,y:previous.y}]);
  pathsry.push([{x:previous.x,y:previous.y},{x:previous.x,y:mouse.y},{x:mouse.x,y:mouse.y},{x:mouse.x,y:previous.y}]);
  step_up('rectangle');
  diravitive.push(parseInt(put.value));
}

function mu_erase(e){
  mouse = oMousePos(e);
  op_poly([{x:previous.x,y:previous.y},{x:previous.x,y:mouse.y},{x:mouse.x,y:mouse.y},{x:mouse.x,y:previous.y}]);
  ctx.fill(); 
  pathsry.push([{x:previous.x,y:previous.y},{x:previous.x,y:mouse.y},{x:mouse.x,y:mouse.y},{x:mouse.x,y:previous.y}]);
  indicate.push('erase'); 
  linestyle.push([]); 
  gradient.push('white'); 
  hardcore.push([[0], ['white']]);
  diravitive.push(parseInt(put.value));
}

function md_circ(e){
  assign_previous(e);
}

function mm_circ(e){
  drawPaths();
  ctx.strokeStyle = current;
  ctx.setLineDash(dashed);
  ctx.lineWidth = parseInt(put.value);
  mouse = oMousePos(e);
  op_circ([previous, mouse]);
}

function mu_circ(e){
  mouse = oMousePos(e);
  op_circ([previous, mouse]);
  pathsry.push([{x: previous.x, y: previous.y}, {x: mouse.x, y: mouse.y}]);
  step_up('two point circle');
  diravitive.push(parseInt(put.value));
}

function md_circl(e){
  assign_previous(e);
}

function mm_circl(e){
  drawPaths();
  ctx.strokeStyle = current;
  ctx.setLineDash(dashed);
  ctx.lineWidth = parseInt(put.value);
  mouse = oMousePos(e);
  op_circl([previous, mouse]);
}

function mu_circl(e){
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
  return collect; 
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
  mouse = oMousePos(e);
  var la = pathsry[pathsry.length - 1];
  pathsry[pathsry.length - 1][la.length - 1] = {x: mouse.x, y: mouse.y}
  drawPaths();
}

function mu_bezi(e){
  mouse = oMousePos(e);
  var la = pathsry[pathsry.length - 1];
  pathsry[pathsry.length - 1][la.length - 1] = {x: mouse.x, y: mouse.y}
  drawPaths();
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
  while(['move', 'rotate', 'scale', 'group move', 'group rotate', 'group scale'].includes(it)){
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
  while(['move', 'rotate', 'scale', 'group move', 'group rotate', 'group scale'].includes(it)){
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
  if(['group move', 'group rotate', 'group scale', 'group'].includes(indicate[indicate.length-1])) return; 
  if(mode == 8){
    centers.push(null);
    var i = Object.keys(moved)[Object.keys(moved).length - 1];
    var m = moved[Object.keys(moved)[Object.keys(moved).length - 1]][0];
    var p = moved[Object.keys(moved)[Object.keys(moved).length - 1]][1];
    if(indicate[m] == 'rectangle' || indicate[m] == 'erase'){
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
  }else if(mode == 3 || mode == 7){
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
  indicate.push(name);
  pathsry.push(null);
  linestyle.push(null);
  gradient.push(null);
  hardcore.push(null);
  diravitive.push(null);
  filling.push(null);

  previous = oMousePos(e);

  var cc = indicate.length - 1;
  var ca = [];
  var te = [];
  if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon', 'erase'].includes(indicate[moving])){
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
  if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon', 'erase'].includes(indicate[moving])){
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
  move_it(get_dif(e));
  drawPaths();
}

function mu_move(e){
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
  if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon', 'erase'].includes(indicate[moving])){
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
    rotate_it(rotate_degree(centers[moving], previous, oMousePos(e)));
    drawPaths();
}

function mu_rotate(e){
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
  if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon', 'erase'].includes(indicate[moving])){
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
  scale_it(drag_ratio(oMousePos(e)));
  drawPaths();
}

function mu_scale(e){
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
  assign_previous(e); 
}

function mm_poly(e){
  drawPaths();
  mouse = oMousePos(e);
  ctx.strokeStyle = current;
  ctx.setLineDash(dashed);
  ctx.lineWidth = parseInt(put.value);
  op_poly(nPolyDots(polyc, previous, oMousePos(e))); 
}

function mu_poly(e){
  mouse = oMousePos(e);
  var this_path = nPolyDots(polyc, previous, oMousePos(e)); 
  op_poly(this_path); 
  pathsry.push(this_path); 
  step_up('polygon')
  diravitive.push(parseInt(put.value));
}

function md(e){
  drawing = true; 
  ctx.lineWidth = parseInt(put.value);
  ctx.strokeStyle = current;
  ctx.setLineDash(dashed);
  if(finished && (!ongoing) && (!([8, 9, 10].includes(mode)))){
    if(f_clicked || mode == 7){
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
      if(indicate[moving]=='group'){
        md_base_group(e, 'group move'); 
      }else{
        md_base(e, 'move');
      }
      break;
    case 9:
      if(moving==null) return; 
      if(indicate[moving]=='group'){
        md_base_group(e, 'group rotate'); 
      }else{
        md_base(e, 'rotate');
      }
      break; 
    case 10:
      if(moving==null) return; 
      if(indicate[moving]=='group'){
        md_base_group(e, 'group scale'); 
      }else{
        md_base(e, 'scale');
      }
      break; 
    case 11:
      md_poly(e); 
      break; 
  }
}

function mm(e){
  if(!drawing) return; 
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
      if(indicate[moving]=='group'){
        mm_move_group(e); 
      }else{
        mm_move(e);
      }
      break;
    case 9:
      if(moving==null) return; 
      if(indicate[moving]=='group'){
        mm_rotate_group(e); 
      }else{
        mm_rotate(e);
      }
      break;
    case 10:
      if(moving==null) return; 
      if(indicate[moving]=='group'){
        mm_scale_group(e);
      }else{
        mm_scale(e);
      }      
      break; 
    case 11:
      mm_poly(e); 
      break; 
  }
  if(f_clicked && drawing && (mode != 7)){
    ctx.fillStyle = current;
    ctx.fill();
  }
}

function mu(e){
  drawing = false; 
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
      if(indicate[indicate.length-1]=='group move'){
        mm_move_group(e);
      }else{
        mu_move(e);
      }  
      break;
    case 9:
      if(moving==null) return; 
      if(indicate[indicate.length-1]=='group rotate'){
        mm_rotate_group(e);
      }else{
        mu_rotate(e);
      }  
      break; 
    case 10:
      if(moving==null) return; 
      if(indicate[indicate.length-1]=='group scale'){
        mm_scale_group(e);
      }else{
        mu_scale(e);
      }  
      break; 
    case 11:
      mu_poly(e); 
      break; 
  }
  if(f_clicked && (mode != 7)){
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

function drawPaths(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let d = 0; d < pathsry.length; d++){
    let indarr = indicate[d];
    if(['move', 'rotate', 'scale', 'group move', 'group rotate', 'group scale'].includes(indarr)){continue;};
    let patarr = pathsry[d];
    let ls = linestyle[d];
    let tf = filling[d];
    if(indarr != 'group'){
      ctx.lineWidth = diravitive[d];
      ctx.strokeStyle = gradient[d];
      ctx.setLineDash(linestyle[d]);
    }
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
        op_poly(patarr);
      break;
      case 'polygon':
        op_poly(patarr);
      break; 
      case 'group':
        patarr.op_group(); 
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
  md(e);
});

canvas.addEventListener('mousemove', e=>{
  mm(e);
});

canvas.addEventListener('mouseup', e=>{
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
    if(['free hand', 'point sketch', 'rectangle', 'bezier curve', 'polygon', 'erase'].includes(indicate[mpc[0]])){
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
    case 'group move':
      Group.regret(); 
      break; 
    case 'group rotate':
      Group.regret(); 
      break; 
    case 'group scale':
      Group.regret(); 
      break; 
    default:
      step_down();
      drawPaths();
  }
  assign_l_l();
}

undo.addEventListener('click', u_n_d_o);
grp.addEventListener('click', ctrl_c_group);

function set_stick(){
  isolate = false; 
  l_clicked = button_click(l_clicked, stick);
  turn_of();
  if(sticked){
    sticked = false;
  }else{
    sticked = true;
  }
}

stick.addEventListener('click', set_stick);

function set_dash(){
  if(dashed.length == 0){
    if(put.value <= 0){
      window.alert('Please enter a positive number')
      dashed = [10, 10];
    }else{
      dashed = [parseInt(put.value), parseInt(put.value)];
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

function set_fill(){
  isolate = false; 
  f_clicked = button_click(f_clicked, filled);
  turn_of();
}

filled.addEventListener('click', set_fill);

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

function svg_line(patharr){
  str.tostr('<path d="'); 
  str.tostr(`M${patharr[0].x} ${patharr[0].y}`);
  for(let i = 1; i < patharr.length; i++){
    str.tostr(`L${patharr[i].x} ${patharr[i].y}`); 
  } 
  str.tostr('"'); 
}

function svg_poly(patharr){
  str.tostr('<path d="'); 
  str.tostr(`M${patharr[0].x} ${patharr[0].y}`);
  for(let i = 1; i < patharr.length; i++){
    str.tostr(`L${patharr[i].x} ${patharr[i].y}`); 
  } 
  str.tostr('Z"');
}

function svg_bezi(patharr){
  var ref = bezier(patharr, 100); 
  svg_line(ref); 
}

function distance(pt1, pt2){
  return (Math.round((((pt2.x-pt1.x)**2)+((pt2.y-pt1.y)**2))**0.5)*1000)/1000; 
}

function svg_two_c(patharr){
  var scen = clc(patharr[0], patharr[1]); 
  var srad = distance(scen, patharr[1]);
  str.tostr(`<circle cx="${scen.x}" cy="${scen.y}" r="${srad}"`); 
}

function svg_circ(patharr){
  var scen = patharr[0]; 
  var srad = distance(scen, patharr[1]);
  str.tostr(`<circle cx="${scen.x}" cy="${scen.y}" r="${srad}"`); 
}

function svg_grad(thecore){
  str.tostr(`<defs><linearGradient id="${sgl.new_id()}">`);
  for(let i=0; i<thecore[0].length; i++){
    str.tostr(`<stop offset="${thecore[0][i]}" stop-color="${thecore[1][i]}" />`);
  }
  str.tostr('</linearGradient></defs>');
}

function svg_color(strep, strfill){
  if(strfill){
    str.tostr(` stroke="${strep}" fill="${strep}"`);
  }else{
    str.tostr(` stroke="${strep}" fill="none"`);
  }
}

function svg_dash(strdash, strdera){
  str.tostr(` stroke-width="${strdera}"`); 
  if(strdash.length != 0){
    str.tostr(` stroke-dasharray="${strdash.join(',')}"`);
  }else{
    str.tostr(` stroke-linecap="round"`); 
  }
  str.tostr(" />"); 
}

function dprocess(svg_func, args){
  if(args[3][0].length == 1){
    svg_func(args[0]); 
    svg_color(args[3][1][0], args[5]); 
  }else{
    svg_grad(args[3]); 
    svg_func(args[0]); 
    svg_color(`url(\'#${sgl.last_id()}\')`, args[5]); 
  }
  svg_dash(args[2], args[4]); 
}

// args =  [_pathsry, _indicate, _linestyle, _hardcore, _diravitive, _filling] 
function oneSvgPath(...args){
  switch (args[1]) {
    case 'free hand': 
      dprocess(svg_line, args); 
    break; 
    case 'point sketch':
      dprocess(svg_line, args); 
    break; 
    case 'rectangle':
      dprocess(svg_poly, args); 
    break; 
    case 'polygon':
      dprocess(svg_poly, args); 
    break; 
    case 'two point circle':
      dprocess(svg_two_c, args); 
    break; 
    case 'circle':
      dprocess(svg_circ, args); 
    break; 
    case 'bezier curve':
      dprocess(svg_bezi, args); 
    break; 
    case 'erase':
      dprocess(svg_poly, args); 
    break;       
  }
}

function svgPaths(){
    for(let d = 0; d < pathsry.length; d++){
      if(['move', 'rotate', 'scale'].includes(indicate[d])){continue;};
      if(indicate[d] == 'group'){
        pathsry[d].publish(); 
      }else{
        oneSvgPath(pathsry[d], indicate[d], linestyle[d], hardcore[d], diravitive[d], filling[d]); 
      }
  }
  sgl.rein();
  return str.establish(); 
}

function set_save(){
  const el = document.createElement('textarea');
  el.value = svgPaths();
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  window.alert('Successfully copied to your clipboard!'); 
}

sv.addEventListener('click', set_save);

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
  }else if (evtobj.keyCode == 68){
    turn_of();
    set_dash();
    if(d_clicked){
      dash.classList.remove('pressdown');
      d_clicked = false;
    }else{
      dash.classList.add('pressdown');
      d_clicked = true;
    }
  }else if (evtobj.keyCode == 37){
    jump_previous(); 
  }else if (evtobj.keyCode == 39){
    jump_next(); 
  }else if (evtobj.keyCode == 83){
    set_stick();
  }else if (evtobj.keyCode == 70){
    set_fill(); 
  }else if(evtobj.keyCode == 67 && evtobj.ctrlKey){
    ctrl_c_group(); 
  }
}

document.onkeydown = KeyPress;
