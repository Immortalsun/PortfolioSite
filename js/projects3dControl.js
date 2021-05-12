let scene1, scene2, scene3,
camera1, camera2, camera3,
renderer1, renderer2, renderer3,
model1, model2, model3,
controls1, controls2, controls3;
let project1Viewport = document.getElementById("project1");
let project2Viewport = document.getElementById("project2");
let project3Viewport = document.getElementById("project3");

function init()
{
    //Need a scene, a camera, and a renderer.
    //Create scenes, add bgcolors
    scene1 = new THREE.Scene();
    scene1.background = new THREE.Color(0xddbbdd);
    scene2 = new THREE.Scene();
    scene2.background = new THREE.Color(0xddffdd);
    scene3 = new THREE.Scene();
    scene3.background = new THREE.Color(0xddaadd);

    //Set up and add lighting for each scene
    let lighting1 = new THREE.AmbientLight(0x404040, 100);
    scene1.add(lighting1);
    let lighting2 = new THREE.AmbientLight(0x77a6f2, 100);
    scene2.add(lighting2);
    let lighting3 = new THREE.AmbientLight(0x404040, 100);
    scene3.add(lighting3);

    //Set up cameras
    camera1 = new THREE.PerspectiveCamera(40, project1Viewport.clientWidth / project1Viewport.clientHeight, 1, 5000);
    camera2 = new THREE.PerspectiveCamera(40, project2Viewport.clientWidth / project2Viewport.clientHeight, 1, 5000);
    camera3 = new THREE.PerspectiveCamera(40, project3Viewport.clientWidth / project3Viewport.clientHeight, 1, 5000);

    //Set up renderer
    renderer1 = new THREE.WebGLRenderer({ antialias: true });
    renderer1.setSize(project1Viewport.clientWidth, project1Viewport.clientHeight);
    renderer2 = new THREE.WebGLRenderer({ antialias: true });
    renderer2.setSize(project2Viewport.clientWidth, project2Viewport.clientHeight);
    renderer3 = new THREE.WebGLRenderer({ antialias: true });
    renderer3.setSize(project3Viewport.clientWidth, project3Viewport.clientHeight);

    //Setting up manual orbit controls for each display
    controls1 = new THREE.OrbitControls(camera1, renderer1.domElement);
    controls1.enableDamping = true;
    controls1.rotateSpeed = 0.05;
    controls1.dampingFactor = 0.1;
    controls1.enableZoom = true;
    controls1.autoRotate = true;
    controls1.autoRotateSpeed = 3.5;

    controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
    controls2.enableDamping = true;
    controls2.rotateSpeed = 0.05;
    controls2.dampingFactor = 0.1;
    controls2.enableZoom = true;
    controls2.autoRotate = true;
    controls2.autoRotateSpeed = 0.75;

    controls3 = new THREE.OrbitControls(camera3, renderer3.domElement);
    controls3.enableDamping = true;
    controls3.rotateSpeed = 0.05;
    controls3.dampingFactor = 0.1;
    controls3.enableZoom = true;
    controls3.autoRotate = true;
    controls3.autoRotateSpeed = -0.75;

    //Attach for viewing
    project1Viewport.appendChild(renderer1.domElement);
    project2Viewport.appendChild(renderer2.domElement);
    project3Viewport.appendChild(renderer3.domElement);

    //Create an STL loader
    const objLoader = new THREE.STLLoader();

    //Fetch and attach the models to the appropriate places in the scenes
    //MODEL1--MODEL1--MODEL1--MODEL1--MODEL1--MODEL1--MODEL1--MODEL1--MODEL1--MODEL1--MODEL1--MODEL1
    objLoader.load(
        //ResourceURL
        'stl/Gripper Mechanism Coverv1.2.stl',
        //Add it after the object is loaded
        function (geometry)
        {
            //Make a material to go with the geometry
            let material = new THREE.MeshNormalMaterial
            (
                {
                    //MeshNormalMaterials don't accept color, specular, OR shininess,
                    //   so these have been commented out.
                    //color: 0x0000ff,
                    //specular: 50,
                    //shininess: 50
                }
            );
            //Add the completed model to the scene
            model1 = new THREE.Mesh(geometry,material);
            scene1.add(model1);

            //Compute and set a midpoint, using bounding boxes, to center the object in the scene
            let middle = new THREE.Vector3();
            geometry.computeBoundingBox();
            geometry.boundingBox.getCenter(middle);
            model1.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(-middle.x, -middle.y, -middle.z));

            //Try to find a reasonable baseline position for the camera
            let largestDimension = Math.max
            (
                geometry.boundingBox.max.x,
                geometry.boundingBox.max.y,
                geometry.boundingBox.max.z
            );
            camera1.position.z = largestDimension*2.5;
        },
        //Called while loading is in progress
        function (xhr)
        {
            console.log((xhr.loaded / xhr.total * 100) + "% loaded");
        },
        //Called if there is an error when loading
        function (error)
        {
            console.log("An error has occurred when loading the 3d object resource.");
        }
    );
    //MODEL2--MODEL2--MODEL2--MODEL2--MODEL2--MODEL2--MODEL2--MODEL2--MODEL2--MODEL2--MODEL2--MODEL2
    objLoader.load(
        //ResourceURL
        'stl/NEMA 8 Sleeve Mountv1.0.stl',
        //Add it after the object is loaded
        function (geometry)
        {
            //Make a material to go with the geometry
            let material = new THREE.MeshNormalMaterial
            (
                {
                    //MeshNormalMaterials don't accept color, specular, OR shininess,
                    //   so these have been commented out.
                    //color: 0x0000ff,
                    //specular: 50,
                    //shininess: 50
                }
            );
            //Add the completed model to the scene
            model2 = new THREE.Mesh(geometry,material);
            scene2.add(model2);

            //Compute and set a midpoint, using bounding boxes, to center the object in the scene
            let middle = new THREE.Vector3();
            geometry.computeBoundingBox();
            geometry.boundingBox.getCenter(middle);
            model2.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(-middle.x, -middle.y, -middle.z));

            //Try to find a reasonable baseline position for the camera
            let largestDimension = Math.max
            (
                geometry.boundingBox.max.x,
                geometry.boundingBox.max.y,
                geometry.boundingBox.max.z
            );
            camera2.position.z = largestDimension*2.5;
        },
        //Called while loading is in progress
        function (xhr)
        {
            console.log((xhr.loaded / xhr.total * 100) + "% loaded");
        },
        //Called if there is an error when loading
        function (error)
        {
            console.log("An error has occured when loading the 3d object resource.");
        }
    );
    //MODEL3--MODEL3--MODEL3--MODEL3--MODEL3--MODEL3--MODEL3--MODEL3--MODEL3--MODEL3--MODEL3--MODEL3
    objLoader.load(
        //ResourceURL
        'stl/LCD Stand V3.0.stl',
        //Add it after the object is loaded
        function (geometry)
        {
            //Make a material to go with the geometry
            let material = new THREE.MeshNormalMaterial
            (
                {
                    //MeshNormalMaterials don't accept color, specular, OR shininess,
                    //   so these have been commented out.
                    //color: 0x0000ff,
                    //specular: 50,
                    //shininess: 50
                }
            );
            //Add the completed model to the scene
            model3 = new THREE.Mesh(geometry,material);
            scene3.add(model3);

            //Compute and set a midpoint, using bounding boxes, to center the object in the scene
            let middle = new THREE.Vector3();
            geometry.computeBoundingBox();
            geometry.boundingBox.getCenter(middle);
            model3.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(-middle.x, -middle.y, -middle.z));

            //Try to find a reasonable baseline position for the camera
            let largestDimension = Math.max
            (
                geometry.boundingBox.max.x,
                geometry.boundingBox.max.y,
                geometry.boundingBox.max.z
            );
            camera3.position.z = largestDimension*3.5;
        },
        //Called while loading is in progress
        function (xhr)
        {
            console.log((xhr.loaded / xhr.total * 100) + "% loaded");
        },
        //Called if there is an error when loading
        function (error)
        {
            console.log("An error has occured when loading the 3d object resource.");
        }
    );
}

function animate()
{
    requestAnimationFrame(animate);
    controls1.update();
    renderer1.render(scene1, camera1);
    controls2.update();
    renderer2.render(scene2, camera2);
    controls3.update();
    renderer3.render(scene3, camera3);
}

init();
animate();