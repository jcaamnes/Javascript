var x,y,w,body, hit;

function Ball(x,y,w){
    this.x = x;
    this.y = y;
    this.w = w;
    this.body = Bodies.circle(x,y,w/2);
    this.body.friction = 0.2;
    this.body.restitution = 0.9;
    this.hit = false;
    
    World.add(world, this.body);

    this.show = function (){
        if(this.hit==false){
            var pos = this.body.position;
            var angle = this.body.angle;

            push();
            translate(pos.x,pos.y);
            rotate(angle);
            imageMode(CENTER);
            image(img_ball,0,0,w,w);
            pop();
        }
    };

    this.update = function(){

    };

    this.hitBoundary = function(boundary){
        this.collision = Matter.SAT.collides(this.body, boundary.body);
        if(this.collision.collided){
            this.hit = true;
            //World.remove(world,this.body);
        };
        return this.hit;
    }
}