
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
function initializeViewer(modelPath, idCanvas) {
    // Récupérer le canvas existant
    const canvas = document.getElementById(idCanvas);
    if (!canvas) {
        console.error("Canvas avec l'ID '" + idCanvas + "'  introuvable.");
        return;
    }

    // Création de la scène
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1); // Définit le fond en blanc
    renderer.setPixelRatio(window.devicePixelRatio); // Améliore la qualité sur les écrans haute résolution




    function setSize(width, height) {
        renderer.setSize(width, height, true);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }


    setSize(500, 500)

    let model;
    const pivot = new THREE.Group();
    scene.add(pivot);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10); // Position de la lumière
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Lumière douce
    scene.add(ambientLight);

    // Chargement du modèle GLB avec gestion des erreurs
    const loader = new GLTFLoader();
    loader.load(
        modelPath,
        function (gltf) {
            model = gltf.scene;

            // Centrer le modèle sur son pivot
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            pivot.add(model);
        },
        undefined,
        function (error) {
            console.error('Erreur lors du chargement du modèle:', error);
        }
    );

    // Position de la caméra
    camera.position.set(0, 0, 35);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false; // Désactiver le déplacement de la caméra
    controls.dampingFactor = 0.1; // Diminuer la vitesse de rotation
    controls.enableDamping = true; // Activer le damping pour un mouvement plus fluide
    controls.minAzimuthAngle = -Math.PI / 2; // -90°
    controls.maxAzimuthAngle = Math.PI / 2;  // 90°
    controls.minDistance = 25; // Distance minimale (zoom avant)
    controls.maxDistance = 50; // Distance maximale (zoom arrière)

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }
    animate();

    // Ajuster la scène au redimensionnement
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}

// Vérifiez si un canvas avec un ID spécifique existe
if (document.getElementById('canvas-football-4u')) {
    initializeViewer('../../assets/3D/football4u.glb', "canvas-football-4u");
}
if (document.getElementById('canvas-football-4u1')) {
    initializeViewer('../../assets/3D/football4u.glb', "canvas-football-4u1");
}