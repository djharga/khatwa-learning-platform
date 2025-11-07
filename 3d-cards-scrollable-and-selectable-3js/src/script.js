/* ** variables ** */
const noOfCards = 10;
const initialRotation = 0.3;
const spacingBetweenCards = 0.1;
const scrollSensitivity= 0.92;
const zoomOnHover = 1.1;
const spacingOnHover = 0.1;


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry( 4, 4, 0.05 );
geometry.translate( 3, 0, 0 );

// raycaster


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {
    
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

window.addEventListener( 'pointermove', onPointerMove );

// Textures

Textures = [
    new THREE.TextureLoader().load('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'),
    new THREE.TextureLoader().load('https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'),
    new THREE.TextureLoader().load('https://images.unsplash.com/photo-1656536665219-da2b7deb314b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'),
    new THREE.TextureLoader().load('https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'),
    new THREE.TextureLoader().load('https://images.unsplash.com/photo-1607457597191-8ed4e870ceca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'),
    new THREE.TextureLoader().load('https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'),
    new THREE.TextureLoader().load('https://images.unsplash.com/photo-1555448248-2571daf6344b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'),
    new THREE.TextureLoader().load('https://images.unsplash.com/photo-1620421680010-0766ff230392?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1498&q=80'),
    new THREE.TextureLoader().load('https://images.unsplash.com/photo-1536745287225-21d689278fd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'),
    new THREE.TextureLoader().load('https://images.unsplash.com/photo-1558865869-c93f6f8482af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1481&q=80'),
];
 

// Materials
const materials = [];
for (var i=0;i<Textures.length;i++){
    const material = new THREE.MeshPhongMaterial()
    material.map = Textures[i]
    materials[i] = material
}

// Cards

var cards = new Array();

for (var i=0;i<noOfCards;i++){
    const material = new THREE.MeshPhongMaterial()
    material.color = new THREE.Color(0x6F6F6F)
    const card = new THREE.Mesh(geometry,[material,material,material,material,materials[i],material])
    card.name = `${i}`
    cards[i] = card
    card.position.set( -6, 0, 0 )
    scene.add(card)
}

// Lights

const pointLight = new THREE.PointLight(0xFFFFFF, 1)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 5
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xFFFFFF, 1)
pointLight2.position.x = 9
pointLight2.position.y = 0
pointLight2.position.z = 5
scene.add(pointLight2)

const light = new THREE.AmbientLight( 0x404040,.3 ); // soft white light
scene.add( light );



//scroll

window.addEventListener('wheel',onMouseWheel)
let y = 0
let x = 0

function onMouseWheel(event){
    y = event.deltaY*0.0001
}

/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5
scene.add(camera)

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */


// hover card

function open(inter){

    var id = parseInt(inter.name)

    //select
    
        for(var j=0; j<=id; j++){
            gsap.to(cards[j].rotation, {y: rot + initialRotation - (spacingBetweenCards * Math.round((j) * 10) / 10) + spacingOnHover})
        }

    //zoom

    gsap.to(cards[id].scale, { x: zoomOnHover, y: zoomOnHover })
}

/* button */

// add button

function addbutton() {
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'back';
    button.className = 'btn-styled';
  
    button.onclick = function() {
      stoptick = false;
      stopafterclick = true;
      tick();
      button.remove();
    };
  
    var container = document.getElementById('overlay');
    container.appendChild(button);
    }



/// select card

window.addEventListener('click', event => {
    if (intersects.length > 0 && stoptick == false){
        obj = intersects[0].object
        stopafterclick = false;
        afterclick();
        addbutton();
        stoptick = true;
    }
})

var obj;
var intersects;
var rot = 0
var stoptick = false, stopafterclick = false;


const afterclick = () =>{

    gsap.to(obj.position, {duration: 1.5, x: 10})
    gsap.to(obj.rotation, {duration: 1, y: 0})
    gsap.to(camera.position, { duration: 2, x: 13 })



    renderer.render(scene, camera)

    if (!stopafterclick){
        window.requestAnimationFrame(afterclick)
    }
}


const tick = () =>
{

/* ** normalising ** */

    for(var i=0;i<noOfCards;i++){
        gsap.to(cards[i].rotation, {y: rot + initialRotation - (spacingBetweenCards * Math.round(i * 10) / 10)})
        cards[i].material[1].color.set( 0x6F6F6F );
        gsap.to(cards[i].scale, { x: 1, y: 1 })
        gsap.to(cards[i].position, {duration: 0.7, x: -6 })
    }

/* ** rotating cards on scroll ** */

    gsap.to(camera.position, { duration: 2, x: 0})
    rot +=y
    y*=scrollSensitivity
    if (0 == Math.round(y * 100000) / 100000){
        y = 0
    }

/* ** Ray caster ** */

    raycaster.setFromCamera( pointer, camera );
    intersects = raycaster.intersectObjects( scene.children );

    if (intersects.length > 0){
        open(intersects[0].object);
		intersects[ 0 ].object.material[1].color.set( 0xF8F0E3 );
    }
    

/* ** Render ** */
    
    renderer.render(scene, camera)

    // Call tick again on the next frame
    
    if (!stoptick){
        window.requestAnimationFrame(tick)
    }

}
tick()