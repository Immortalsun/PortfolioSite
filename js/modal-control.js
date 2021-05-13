function openModal()
{
    document.getElementById("projects-modal-opener").style.display = "none";
    document.getElementById("projects-modal").style.display = "block";
    loadModalModel(stlToDisplay = 'stl/Central Bearing Attach Mountv2.0.stl');
    modalRenderer.setSize(modalViewport.clientWidth, modalViewport.clientHeight);
    modalCamera.aspect = modalViewport.clientWidth/modalViewport.clientHeight;
    modalCamera.updateProjectionMatrix();
}

function closeModal()
{
    document.getElementById("projects-modal").style.display = "none";
    document.getElementById("projects-modal-opener").style.display = "block";
}

//Get all files in the STL folder:
var allModels =
[
    'stl/Central Bearing Attach Mountv2.0.stl',
    'stl/Central Bearing Mountv2.0.stl',
    'stl/Coupling platev1.0.stl',
    'stl/Gripper Mechanism Coverv1.2.stl',
    'stl/LCD Stand V3.0.stl',
    'stl/LID_V5.stl',
    'stl/Main Base Drumv3.stl',
    'stl/NEMA 8 Sleeve Mountv1.0.stl',
    'stl/WristMountv1.0.stl'
];
var modelIndex = 0;
var modalViewport, modalScene, modalCamera, modalRenderer, modalModel, modalControls;
var modalStlLoader = new THREE.STLLoader();

//Set up the scene, with the first model at the ready
function modalInit()
{
    //Set viewport
    modalViewport = document.getElementById("projects-modal-content");

    //Set scene, lighting, background
    modalScene = new THREE.Scene();
    modalScene.background = new THREE.Color(0xddbbdd);
    let lighting = new THREE.AmbientLight(0x404040, 100);
    modalScene.add(lighting);

    //Camera
    modalCamera = new THREE.PerspectiveCamera(40,modalViewport.clientWidth/modalViewport.clientHeight, 1, 5000);

    //Renderer
    modalRenderer = new THREE.WebGLRenderer({antialias: true});
    modalRenderer.setSize(modalViewport.clientWidth, modalViewport.clientHeight);
    modalViewport.appendChild(modalRenderer.domElement);

    //Load and prepare the STL model
    loadModalModel(stlToDisplay = 'stl/Central Bearing Attach Mountv2.0.stl');

    //Setting up manual orbit controls for each display
    modalControls = new THREE.OrbitControls(modalCamera, modalRenderer.domElement);
    modalControls.enableDamping = true;
    modalControls.rotateSpeed = 0.20;
    modalControls.dampingFactor = 0.1;
    modalControls.enableZoom = true;
    modalControls.autoRotate = true;
    modalControls.autoRotateSpeed = 3.5;

    //Make sure the whole thing can handle being resized:
    window.addEventListener('resize',function ()
    {
        modalRenderer.setSize(modalViewport.clientWidth, modalViewport.clientHeight);
        modalCamera.aspect = modalViewport.clientWidth/modalViewport.clientHeight;
        modalCamera.updateProjectionMatrix();
    })

    animateModal();
}

function loadModalModel(stlFile)
{
    modalStlLoader.load
    (
        //Resource URL
        stlFile,
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
            if (modalModel!=(null||undefined))
            {
                console.log("Removing old modal model...")
                modalScene.remove(modalModel);
            }

            let model = new THREE.Mesh(geometry, material);
            modalModel = model;
            modalScene.add(modalModel);

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
            modalCamera.position.z = largestDimension*2.5;
        },
        //Called while loading is in progress to display the amount of progress
        function (xhr)
        {
            console.log((xhr.loaded/xhr.total)*100);
        },
        //Called if there is an error in loading the model
        function (error)
        {
            console.log("An error has occurred when attempting to load this STL model for the ModalPopup: " + stl);
        }
    );
}

function nextModel(direction)
{
    if (direction == "left")
    {
        modelIndex--;
        if (modelIndex<0)
        {
            modelIndex = allModels.length - 1;
        }
    }
    else
    {
        modelIndex++;
        if (modelIndex>=allModels.length)
        {
            modelIndex = 0;
        }
    }
    //Index of next model to load is now known. So, load it up:
    loadModalModel(allModels[modelIndex]);
}

function animateModal()
{
    requestAnimationFrame(animateModal);
    modalControls.update();
    modalRenderer.render(modalScene, modalCamera);
}