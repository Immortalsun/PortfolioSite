//Note that at present, this bit of code relies on three other source JS documents
//in order to run (from three.js):
//<script src="js/threejs/three.js-master/build/three.js"></script> <!--threejs library for displaying 3D stl files-->
//<script src="js/threejs/three.js-master/examples/js/loaders/STLLoader.js"></script><!--Handles .stl model files-->
//<script src="js/threejs/three.js-master/examples/js/controls/OrbitControls.js"></script><!--Handles the camera rotating around 3d models-->

var controlsList = [];
var rendererList = [];

//STL loader to reuse and to save memory
const stlLoader = new THREE.STLLoader();

//Turn a given element into a 3d display
function setUpStaticDisplay(displayElement, stlToDisplay, interactive)
{
    let sceneViewport = document.getElementById(displayElement);
    let controls;

    //Need a scene, with lighting and background
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xddbbdd);
    let lighting = new THREE.AmbientLight(0x404040, 100);
    scene.add(lighting);

    //Need a camera
    camera = new THREE.PerspectiveCamera(40,sceneViewport.clientWidth/sceneViewport.clientHeight, 1, 5000);

    //Need a renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(sceneViewport.clientWidth, sceneViewport.clientHeight);

    //Attach renderer
    sceneViewport.appendChild(renderer.domElement);

    //Load and prepare the STL model
    let sceneModel = loadModel(scene, stlToDisplay, camera);

    //Add to the appropriate animation lists, depending on if
    //the model is interactive or not
    if (interactive)
    {
        //Setting up manual orbit controls for each display
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.rotateSpeed = 0.05;
        controls.dampingFactor = 0.1;
        controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 3.5;

        controlsList.push(controls);
    }
    rendererList.push([renderer,scene,camera]);
}

function loadModel(targetScene,stl,currentCamera)
{
    let model;

    stlLoader.load
    (
        //Resource URL
        stl,
        //If it loads, ready it
        function (geometry)
        {
            //Make a material to use on the geometry
            let material = new THREE.MeshNormalMaterial
            (
                {
                    //Potential properties for the material
                    //MeshNormalMaterial doesn't use many properties
                }
            );

            //Scene needs a mesh, so make one with the geometry
            //and material, and add it to the scene
            model = new THREE.Mesh(geometry, material);
            targetScene.add(model);

            //Finalize camera setup, based on the model
            let modelMiddle = new THREE.Vector3();
            geometry.computeBoundingBox();
            geometry.boundingBox.getCenter(modelMiddle);
            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(-modelMiddle.x,-modelMiddle.y,-modelMiddle.z));
            //Get reasonable baseline position based on the computed bounding box
            let largestDimension = Math.max
            (
                geometry.boundingBox.max.x,
                geometry.boundingBox.max.y,
                geometry.boundingBox.max.z
            );
            currentCamera.position.z = largestDimension*2.5;
        },
        //Called while loading is in progress to display the amount of progress
        function (xhr)
        {
            console.log((xhr.loaded/xhr.total)*100);
        },
        //Called if there is an error in loading the model
        function (error)
        {
            console.log("An error has occurred when attempting to load this STL model: " + stl);
        }
    );

    return model;
}

//EXTEND DISPLAY SET-UP FUNCTION HERE
//FOR VARIANT WITH CONTROLS


//Initialize, then animate

function animate()
{
    requestAnimationFrame(animate);
    for (let i = 0; i < controlsList.length; i++)
    {
        controlsList[i].update();
    }
    for (let j = 0; j < rendererList.length; j++)
    {
        rendererList[j][0].render(rendererList[j][1],rendererList[j][2]);
    }
}