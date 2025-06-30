console.log('🎮 Three.js Engine loading...');
// Three.js Engine for Ultimate WebCrypto Layout
// Handles 3D ball rendering, animations, and user interactions

import * as THREE from 'three';
import { gsap } from 'gsap';

export class ThreeEngine {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.balls = [];
        this.selectedMainNumbers = [];
        this.selectedPowerBall = null;
        this.frontBallIndex = 0;
        this.isInitialized = false;
        this.isRendering = false;
        
        // Callback functions
        this.onBallClick = null;
        this.onGameComplete = null;
        
        // Position constants
        this.POSITIONS = {
            CENTER: { x: 0, y: 1.5, z: 2 },
            SELECTED: [
                { x: 5, y: 1, z: 0 },
                { x: 5, y: 1, z: -1.5 },
                { x: 5, y: 1, z: 1.5 },
                { x: 6.5, y: 1, z: -0.75 },
                { x: 6.5, y: 1, z: 0.75 }
            ],
            POWERBALL: { x: 0, y: 2.5, z: 0 },
            WAITING: [
                { x: -2, y: 1, z: -3 },
                { x: 0, y: 1, z: -4 },
                { x: 2, y: 1, z: -3 },
                { x: -1, y: 1, z: -5 },
                { x: 1, y: 1, z: -5 }
            ]
        };
    }

    async init() {
        if (this.isInitialized) {
            console.log('🎮 Three.js engine already initialized');
            return;
        }

        try {
            this.initScene();
            this.initCamera();
            this.initRenderer();
            this.initLighting();
            this.initFloor();
            this.createBalls();
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('🎮 Three.js engine initialized successfully!');
            
        } catch (error) {
            console.error('❌ Three.js engine initialization failed:', error);
            throw error;
        }
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initCamera() {
        // Get the actual container dimensions
        const generationScreen = document.getElementById('generationScreen');
        const containerWidth = generationScreen.clientWidth;
        const containerHeight = generationScreen.clientHeight;
        
        this.camera = new THREE.PerspectiveCamera(
            75, 
            containerWidth / containerHeight,  // Use container aspect ratio instead of window
            0.1, 
            1000
        );
        this.camera.position.set(8, 6, 8);
        this.camera.lookAt(0, 0, 0);
    }

    initRenderer() {
        // Find the generation screen container
        const generationScreen = document.getElementById('generationScreen');
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(generationScreen.clientWidth, generationScreen.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // 캔버스가 결과 슬롯을 가리지 않도록 position을 static으로 설정
        this.renderer.domElement.style.position = 'static';
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        // Add canvas to generation screen
        generationScreen.appendChild(this.renderer.domElement);
    }

    initLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        
        // Point lights
        const pointLight1 = new THREE.PointLight(0x00ffff, 0.8, 100);
        pointLight1.position.set(-5, 5, 5);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xff3333, 0.6, 100);
        pointLight2.position.set(5, -3, -5);
        this.scene.add(pointLight2);
    }

    initFloor() {
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            side: THREE.DoubleSide
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -2;
        floor.receiveShadow = true;
        this.scene.add(floor);
    }

    createTextTexture(text, ballType = 'main', isCollapsed = false) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        canvas.width = 128;
        canvas.height = 128;
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        let bgColor, textColor;
        
        if (isCollapsed) {
            bgColor = ballType === 'powerball' ? '#ff3333' : '#ffff00';
            textColor = ballType === 'powerball' ? '#ffffff' : '#000000';
        } else {
            bgColor = ballType === 'powerball' ? '#ff6666' : '#00ffff';
            textColor = '#000000';
        }
        
        // Circle background
        context.beginPath();
        context.arc(64, 64, 60, 0, Math.PI * 2);
        context.fillStyle = bgColor;
        context.fill();
        
        // Border
        context.strokeStyle = '#333333';
        context.lineWidth = isCollapsed ? 4 : 2;
        if (!isCollapsed) {
            context.setLineDash([5, 5]);
        }
        context.stroke();
        context.setLineDash([]);
        
        // Text
        context.font = 'bold 45px Arial';
        context.fillStyle = textColor;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 64, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    createBalls() {
        this.balls = [];
        
        // Create 5 main balls
        for (let i = 0; i < 5; i++) {
            const initialNumber = Math.floor(Math.random() * 69) + 1;
            const textTexture = this.createTextTexture(initialNumber.toString(), 'main', false);
            
            const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
            const sphereMaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                map: textTexture,
                shininess: 100,
                specular: 0x222222,
                reflectivity: 0.3,
                transparent: true,
                opacity: 0.9
            });
            
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            
            // Set initial position
            if (i === 0) {
                // First ball in center
                sphere.position.set(
                    this.POSITIONS.CENTER.x, 
                    this.POSITIONS.CENTER.y, 
                    this.POSITIONS.CENTER.z
                );
            } else {
                // Others in waiting positions
                const waitPos = this.POSITIONS.WAITING[i - 1];
                sphere.position.set(waitPos.x, waitPos.y, waitPos.z);
            }
            
            sphere.castShadow = true;
            sphere.receiveShadow = true;
            
            sphere.userData = {
                ballType: 'main',
                isCollapsed: false,
                fixedNumber: null,
                currentNumber: initialNumber,
                changeSpeed: 0.12,
                changeTimer: Math.random(),
                rotationSpeed: 0.008 + Math.random() * 0.015,
                pulseSpeed: 0.04 + Math.random() * 0.02,
                originalY: sphere.position.y,
                index: i,
                state: i === 0 ? 'center' : 'waiting',
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1
                )
            };
            
            this.balls.push(sphere);
            this.scene.add(sphere);
        }
        
        // Create powerball
        const powerballNumber = Math.floor(Math.random() * 26) + 1;
        const powerballTexture = this.createTextTexture(powerballNumber.toString(), 'powerball', false);
        
        const powerballGeometry = new THREE.SphereGeometry(0.9, 32, 32);
        const powerballMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: powerballTexture,
            shininess: 100,
            specular: 0x222222,
            reflectivity: 0.3,
            transparent: true,
            opacity: 0.9
        });
        
        const powerball = new THREE.Mesh(powerballGeometry, powerballMaterial);
        powerball.position.set(
            this.POSITIONS.POWERBALL.x, 
            this.POSITIONS.POWERBALL.y, 
            this.POSITIONS.POWERBALL.z
        );
        powerball.castShadow = true;
        powerball.receiveShadow = true;
        
        powerball.userData = {
            ballType: 'powerball',
            isCollapsed: false,
            fixedNumber: null,
            currentNumber: powerballNumber,
            changeSpeed: 0.08,
            changeTimer: 0,
            rotationSpeed: 0.008,
            pulseSpeed: 0.04,
            originalY: powerball.position.y,
            state: 'powerball',
            velocity: new THREE.Vector3(0, 0, 0)
        };
        
        this.balls.push(powerball);
        this.scene.add(powerball);
    }

    setupEventListeners() {
        // Mouse click handler
        this.renderer.domElement.addEventListener('click', (event) => {
            this.onMouseClick(event);
        });
        
        // Touch event handlers for mobile
        this.renderer.domElement.addEventListener('touchstart', (event) => {
            this.onTouchStart(event);
        }, { passive: false });
        
        this.renderer.domElement.addEventListener('touchend', (event) => {
            this.onTouchEnd(event);
        }, { passive: false });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });
    }

    onMouseClick(event) {
        const mouse = new THREE.Vector2();
        const rect = this.renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.balls);
        
        if (intersects.length > 0) {
            const clickedBall = intersects[0].object;
            
            if (!clickedBall.userData.isCollapsed && 
                (clickedBall.userData.state === 'center' || clickedBall.userData.ballType === 'powerball')) {
                this.collapseBall(clickedBall);
            }
        }
    }

    // Touch event support
    onTouchStart(event) {
        event.preventDefault();
        this.touchStartTime = Date.now();
        
        if (event.touches && event.touches.length > 0) {
            const touch = event.touches[0];
            this.touchPosition = { x: touch.clientX, y: touch.clientY };
        }
    }

    onTouchEnd(event) {
        event.preventDefault();
        
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - this.touchStartTime;
        
        if (touchDuration < 300 && event.changedTouches && event.changedTouches.length > 0) {
            const touch = event.changedTouches[0];
            
            const deltaX = Math.abs(touch.clientX - this.touchPosition.x);
            const deltaY = Math.abs(touch.clientY - this.touchPosition.y);
            
            if (deltaX < 10 && deltaY < 10) {
                // Simulate mouse click
                const fakeEvent = {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                };
                this.onMouseClick(fakeEvent);
            }
        }
    }

    async collapseBall(ball) {
        const userData = ball.userData;
        
        // Generate random number
        let finalNumber;
        if (userData.ballType === 'powerball') {
            finalNumber = Math.floor(Math.random() * 26) + 1;
            this.selectedPowerBall = finalNumber;
        } else {
            do {
                finalNumber = Math.floor(Math.random() * 69) + 1;
            } while (this.selectedMainNumbers.includes(finalNumber));
            
            this.selectedMainNumbers.push(finalNumber);
            this.selectedMainNumbers.sort((a, b) => a - b);
        }
        
        // Collapse state
        userData.isCollapsed = true;
        userData.fixedNumber = finalNumber;
        
        // Update texture
        const newTexture = this.createTextTexture(
            finalNumber.toString(), 
            userData.ballType, 
            true
        );
        ball.material.map = newTexture;
        ball.material.needsUpdate = true;
        
        // Change color
        if (userData.ballType === 'powerball') {
            ball.material.color.setHex(0xff3333);
        } else {
            ball.material.color.setHex(0xffff00);
        }
        
        // Animate to selected position
        if (userData.ballType === 'main') {
            const selectedIndex = this.selectedMainNumbers.length - 1;
            const targetPos = this.POSITIONS.SELECTED[selectedIndex];
            
            gsap.to(ball.position, {
                x: targetPos.x,
                y: targetPos.y,
                z: targetPos.z,
                duration: 1.0,
                ease: "power2.out"
            });
            
            userData.state = 'selected';
            
            // Move next ball to center
            this.moveNextBallToCenter();
        } else {
            userData.state = 'selected';
        }
        
        // Notify game logic
        if (this.onBallClick) {
            this.onBallClick({
                numbers: this.selectedMainNumbers,
                powerball: this.selectedPowerBall
            });
        }
        
        // Check if game is complete
        if (this.selectedMainNumbers.length === 5 && this.selectedPowerBall) {
            setTimeout(() => {
                if (this.onGameComplete) {
                    this.onGameComplete({
                        numbers: this.selectedMainNumbers,
                        powerball: this.selectedPowerBall
                    });
                }
            }, 1000);
        }
        
        console.log(`🎯 ${userData.ballType} collapsed! Number ${finalNumber} observed`);
    }

    moveNextBallToCenter() {
        const waitingBalls = this.balls.filter(ball => 
            ball.userData.ballType === 'main' && 
            !ball.userData.isCollapsed && 
            ball.userData.state === 'waiting'
        );
        
        if (waitingBalls.length > 0) {
            const nextBall = waitingBalls[0];
            
            gsap.to(nextBall.position, {
                x: this.POSITIONS.CENTER.x,
                y: this.POSITIONS.CENTER.y,
                z: this.POSITIONS.CENTER.z,
                duration: 1.0,
                ease: "power2.out"
            });
            
            nextBall.userData.state = 'center';
            
            this.rearrangeWaitingBalls();
        }
    }

    rearrangeWaitingBalls() {
        const waitingBalls = this.balls.filter(ball => 
            ball.userData.ballType === 'main' && 
            !ball.userData.isCollapsed && 
            ball.userData.state === 'waiting'
        );
        
        waitingBalls.forEach((ball, index) => {
            if (index < this.POSITIONS.WAITING.length) {
                const targetPos = this.POSITIONS.WAITING[index];
                gsap.to(ball.position, {
                    x: targetPos.x,
                    y: targetPos.y,
                    z: targetPos.z,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: index * 0.1
                });
            }
        });
    }

    resetGame() {
        // Clear selected numbers
        this.selectedMainNumbers = [];
        this.selectedPowerBall = null;
        
        // Remove all balls from scene
        this.balls.forEach(ball => {
            this.scene.remove(ball);
        });
        this.balls = [];
        
        // Create new balls
        this.createBalls();
        
        console.log('🔄 Three.js game reset complete');
    }

    startRendering() {
        if (this.isRendering) return;
        
        this.isRendering = true;
        this.animate();
        console.log('🎬 Three.js rendering started');
    }

    stopRendering() {
        this.isRendering = false;
        console.log('⏸️ Three.js rendering stopped');
    }

    animate() {
        if (!this.isRendering) return;
        
        requestAnimationFrame(() => this.animate());
        
        // Animate balls
        this.balls.forEach(ball => {
            const userData = ball.userData;
            
            // Rotation animation
            ball.rotation.y += userData.rotationSpeed;
            
            if (!userData.isCollapsed) {
                // Number changing (quantum superposition state)
                userData.changeTimer += userData.changeSpeed;
                if (userData.changeTimer >= 1.0) {
                    userData.changeTimer = 0;
                    
                    const maxNumber = userData.ballType === 'powerball' ? 26 : 69;
                    userData.currentNumber = Math.floor(Math.random() * maxNumber) + 1;
                    
                    const newTexture = this.createTextTexture(
                        userData.currentNumber.toString(), 
                        userData.ballType, 
                        false
                    );
                    ball.material.map = newTexture;
                    ball.material.needsUpdate = true;
                }
                
                // Pulse effect for center ball and powerball
                if (userData.state === 'center' || userData.ballType === 'powerball') {
                    ball.position.y = userData.originalY + 
                        Math.sin(Date.now() * userData.pulseSpeed * 0.01) * 0.15;
                }
                
                // Glow effect
                const glowIntensity = 0.7 + Math.sin(Date.now() * 0.006) * 0.3;
                ball.material.opacity = glowIntensity;
            } else {
                // Fixed state - stable opacity
                ball.material.opacity = 1.0;
            }
        onWindowResize() {
            if (!this.camera || !this.renderer) return;
            
            // Get the actual container dimensions
            const generationScreen = document.getElementById('generationScreen');
            const containerWidth = generationScreen.clientWidth;
            const containerHeight = generationScreen.clientHeight;
            
            this.camera.aspect = containerWidth / containerHeight;  // Use container aspect ratio
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(containerWidth, containerHeight);  // Use container size
        }
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    getSelectedNumbers() {
        return {
            main: [...this.selectedMainNumbers],
            powerball: this.selectedPowerBall
        };
    }
}
