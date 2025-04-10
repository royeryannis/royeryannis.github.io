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
    renderer.setSize(500, canvas.clientHeight);
    renderer.setClearColor(0xffffff, 1); // Définit le fond en blanc
    renderer.setPixelRatio(window.devicePixelRatio); // Améliore la qualité sur les écrans haute résolution

    function setSizeToParent() {
        const parent = canvas.parentElement; // Récupère le parent du canvas
        renderer.setSize(canvas.clientWidth, canvas.clientHeight); // Ajuste la taille du renderer
        camera.aspect = canvas.clientWidth / canvas.clientHeight; // Met à jour l'aspect de la caméra
        camera.updateProjectionMatrix(); // Met à jour la matrice de projection
    }

    // Appeler la fonction pour définir la taille initiale
    setSizeToParent();

    // Ajuster la taille au redimensionnement de la fenêtre
    window.addEventListener('resize', setSizeToParent);
    let model;
    const pivot = new THREE.Group();
    scene.add(pivot);

    // Ajouter plusieurs lumières directionnelles autour de l'objet
    const lightPositions = [
        [10, 10, 10],  // Lumière en haut à droite
        [-10, 10, 10], // Lumière en haut à gauche
        [10, -10, 10], // Lumière en bas à droite
        [-10, -10, 10], // Lumière en bas à gauche
        [0, 10, -10],  // Lumière derrière en haut
        [0, -10, -10]  // Lumière derrière en bas
    ];

    lightPositions.forEach(position => {
        const light = new THREE.DirectionalLight(0xffffff, 0.5); // Intensité réduite pour éviter une surexposition
        light.position.set(...position);
        scene.add(light);
    });
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
    camera.position.set(0, 0, 30);

    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enablePan = false; // Désactiver le déplacement de la caméra
    // controls.dampingFactor = 0.1; // Diminuer la vitesse de rotation
    controls.enableDamping = true; // Activer le damping pour un mouvement plus fluide
    controls.minAzimuthAngle = -Math.PI / 2; // -90°
    controls.maxAzimuthAngle = Math.PI / 2;  // 90°
    controls.minDistance = 24; // Distance minimale (zoom avant)
    controls.maxDistance = 50; // Distance maximale (zoom arrière)

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }
    animate();

    
}

// Vérifiez si un canvas avec un ID spécifique existe
if (document.getElementById('canvas-football-4u')) {
    initializeViewer('../../assets/3D/football4u.glb', "canvas-football-4u");
}
