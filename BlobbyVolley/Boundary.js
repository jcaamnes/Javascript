var x,y,w,h,body, c, hit;

function Boundary(x,y,w,h,c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.hit = false;
    this.body = Bodies.rectangle(x, y, w, h, { isStatic: true });
    World.add(world, this.body);

    this.show = function (){
        push();
        translate(this.x,this.y);
        rectMode(CENTER);
        fill(c);
        rect(0,0,this.w,this.h);
        pop();
    };
}