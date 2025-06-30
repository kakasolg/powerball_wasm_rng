console.log('🎮 Pentagon Rotation System Loading...');
// Pentagon Rotation System - 5각형 회전으로 클릭 편의성 극대화
// 🔥 WebCrypto 하드웨어 엔트로피 기반 난수 생성 시스템

import * as THREE from 'three';

// 🎯 직접 DOM 조작으로 메시지 표시 (안전한 방식)
function showRealtimeMessage(message) {
    console.log('🔥 showRealtimeMessage 호출됨:', message); // 디버깅
    try {
        const display = document.getElementById('messageDisplay');
        console.log('🔍 messageDisplay 요소:', display); // 디버깅
        if (!display) {
            console.log('❌ messageDisplay 요소를 찾을 수 없음');
            return;
        }
        
        // 50자 제한 적용
        let shortMessage = message.length > 50 ? message.substring(0, 47) + '...' : message;
        console.log('📝 처리할 메시지:', shortMessage); // 디버깅
        
        // 🎯 강력한 시각적 피드백으로 업그레이드
        display.textContent = shortMessage;
        display.style.color = '#ffff00';  // 밝은 노란색
        display.style.backgroundColor = '#333';  // 배경색 추가
        display.style.fontWeight = 'bold';  // 굵게
        display.style.border = '2px solid #ffff00';  // 테두리 추가
        display.style.animation = 'blink 0.5s ease-in-out 3';  // 깜빡임 효과
        console.log('✅ 실시간 메시지 표시됨:', shortMessage);
        console.log('🎨 요소 상태:', {
            textContent: display.textContent,
            color: display.style.color,
            visibility: display.style.visibility,
            display: display.style.display
        }); // 디버깅
        
        // 자동 제거 제거 - 다음 메시지가 올 때까지 유지
    } catch (error) {
        console.error('❌ showRealtimeMessage 오류:', error);
    }
}

// 🔐 WebCrypto 하드웨어 기반 안전한 난수 생성기
class SecureRandomGenerator {
    constructor() {
        console.log('🔥 SecureRandomGenerator constructor 시작!'); // 디버깅
        this.clickContextHistory = [];
        this.webCryptoCallCount = 0;
        console.log('🔐 SecureRandomGenerator initialized - WebCrypto + Context Entropy');
        try {
            console.log('🔥 window.print 호출 예정...'); // 디버깅
            if (typeof window !== 'undefined' && window.print) {
                window.print('🔐 SecureRandomGenerator initialized');
                console.log('✅ window.print 호출 완료'); // 디버깅
            } else {
                console.log('❌ window.print 함수가 정의되지 않음'); // 디버깅
            }
        } catch (error) {
            console.error('❌ window.print 호출 오류:', error);
        }
    }
    
    // 🎯 하드웨어 기반 기본 시드 생성
    async generateHardwareSeed() {
        console.log('🔐 [WebCrypto] Hardware entropy generation started...');
        showRealtimeMessage('🔐 [WebCrypto] Hardware entropy generation started');
        
        const cryptoArray = new Uint32Array(4);
        crypto.getRandomValues(cryptoArray);
        this.webCryptoCallCount++;
        
        console.log('🔐 [WebCrypto] Hardware raw values:', {
            value1: cryptoArray[0],
            value2: cryptoArray[1], 
            value3: cryptoArray[2],
            value4: cryptoArray[3],
            hex: cryptoArray.map(v => '0x' + v.toString(16).toUpperCase())
        });
        showRealtimeMessage('🎯 [WebCrypto] Hardware raw values');
        
        // 4개 값을 XOR로 조합하여 단일 시드 생성
        const seed = cryptoArray.reduce((acc, val, i) => acc ^ (val << (i * 8)), 0);
        const finalSeed = seed >>> 0; // unsigned 32bit 보장
        
        console.log('🔐 [WebCrypto] Final hardware seed:', {
            rawSeed: seed,
            finalSeed: finalSeed,
            hex: '0x' + finalSeed.toString(16).toUpperCase(),
            binary: finalSeed.toString(2).padStart(32, '0'),
            totalCalls: this.webCryptoCallCount
        });
        
        return finalSeed;
    }
    
    // 🎯 클릭 컨텍스트 엔트로피 수집
    generateClickContext(ball = null, event = null) {
        console.log('🎯 [Context] Click context entropy collection started...');
        
        const now = performance.now();
        
        // 기본 타이밍 엔트로피
        const timeEntropy = {
            timestamp: now,
            microsecond: (now * 1000) % 100,
            frameCount: this.webCryptoCallCount
        };
        
        console.log('🎯 [Context] Timing entropy:', {
            timestamp: timeEntropy.timestamp.toFixed(6),
            microsecond: timeEntropy.microsecond.toFixed(2),
            frameCount: timeEntropy.frameCount
        });
        showRealtimeMessage(`🎯 Timing entropy: {timestamp: '${timeEntropy.timestamp.toFixed(6)}'`);
        
        // 볼 위치 엔트로피 (있을 경우)
        let ballEntropy = { x: 0, y: 0, z: 0, rotation: 0 };
        if (ball && ball.position) {
            ballEntropy = {
                x: Math.abs(ball.position.x * 1000) % 1000,
                y: Math.abs(ball.position.y * 1000) % 1000,
                z: Math.abs(ball.position.z * 1000) % 1000,
                rotation: Math.abs((ball.rotation.y || 0) * 1000) % 1000
            };
            
            console.log('🎯 [Context] 3D ball entropy:', {
                ballType: ball.userData ? ball.userData.ballType : 'unknown',
                position: {
                    x: ball.position.x.toFixed(3),
                    y: ball.position.y.toFixed(3),
                    z: ball.position.z.toFixed(3)
                },
                entropy: ballEntropy
            });
        } else {
            console.log('🎯 [Context] No ball data, using default values');
        }
        
        // 마우스 엔트로피 (있을 경우)
        let mouseEntropy = { x: 0, y: 0 };
        if (event) {
            mouseEntropy = {
                x: (event.clientX || 0) % 1000,
                y: (event.clientY || 0) % 1000
            };
            
            console.log('🎯 [Context] Mouse entropy:', {
                clientX: event.clientX,
                clientY: event.clientY,
                entropy: mouseEntropy
            });
        } else {
            console.log('🎯 [Context] No mouse event, using default values');
        }
        
        // 전체 컨텍스트 엔트로피 계산
        const contextEntropy = (
            timeEntropy.microsecond +
            ballEntropy.x + ballEntropy.y + ballEntropy.z + ballEntropy.rotation +
            mouseEntropy.x + mouseEntropy.y +
            timeEntropy.frameCount * 123
        ) % 0xFFFFFFFF;
        
        console.log('🎯 [Context] Final context entropy:', {
            components: {
                time: timeEntropy.microsecond,
                ballX: ballEntropy.x,
                ballY: ballEntropy.y,
                ballZ: ballEntropy.z,
                ballRotation: ballEntropy.rotation,
                mouseX: mouseEntropy.x,
                mouseY: mouseEntropy.y,
                frameMultiplier: timeEntropy.frameCount * 123
            },
            totalEntropy: contextEntropy,
            hex: '0x' + contextEntropy.toString(16).toUpperCase()
        });
        showRealtimeMessage('🎯Final context entropy: {components: {...}');
        
        return {
            time: timeEntropy,
            ball: ballEntropy,
            mouse: mouseEntropy,
            entropy: contextEntropy
        };
    }
    
    // 🔥 최종 안전한 난수 생성 (WebCrypto + 컨텍스트)
    async generateSecureNumber(min, max, ball = null, event = null) {
        if (min >= max) return min;
        
        // 1. 하드웨어 시드 생성
        const hardwareSeed = await this.generateHardwareSeed();
        
        // 2. 클릭 컨텍스트 엔트로피
        const context = this.generateClickContext(ball, event);
        
        // 3. 하이브리드 시드 조합
        // 3. 하이브리드 시드 조합 (unsigned 32bit 보장)
        const hybridSeed = ((hardwareSeed ^ Math.floor(context.entropy) ^ Date.now()) >>> 0);
        
        // 4. 범위 내 번호 생성 (절댓값 처리)
        const range = max - min;
        const safeRandom = Math.abs(hybridSeed) % range;
        const randomValue = safeRandom + min;
        
        // 5. 범위 검증
        const finalValue = Math.max(min, Math.min(max - 1, randomValue));
        
        // 로그 출력 (디버깅용)
        console.log(`🔐 SecureRandom: ${finalValue} (hw:${hardwareSeed}, ctx:${context.entropy}, hybrid:${hybridSeed})`);
        
        return finalValue;
    }
    
    // 🎲 중복 없는 메인 볼 번호 생성
    async generateUniqueMainNumber(excludeNumbers = [], ball = null, event = null) {
        console.log('🎲 [UniqueRNG] Unique main number generation started:', {
            excludeNumbers: excludeNumbers,
            excludeCount: excludeNumbers.length
        });
        
        let attempts = 0;
        let number;
        
        do {
            number = await this.generateSecureNumber(1, 70, ball, event);
            attempts++;
            
            if (excludeNumbers.includes(number)) {
                console.log('🎲 [UniqueRNG] Duplicate number found, retrying:', {
                    attempt: attempts,
                    duplicateNumber: number,
                    excludeNumbers: excludeNumbers
                });
            }
        } while (excludeNumbers.includes(number) && attempts < 100);
        
        if (attempts >= 100) {
            console.warn('⚠️ [UniqueRNG] Too many attempts, using fallback');
            // 폴백: 사용되지 않은 번호 중 무작위 선택
            const available = [];
            for (let i = 1; i <= 69; i++) {
                if (!excludeNumbers.includes(i)) available.push(i);
            }
            
            console.log('🎲 [UniqueRNG] Available numbers:', {
                availableCount: available.length,
                availableNumbers: available.slice(0, 10) + (available.length > 10 ? '...' : '')
            });
            
            if (available.length > 0) {
                const randomIndex = await this.generateSecureNumber(0, available.length);
                number = available[randomIndex];
                
                console.log('🎲 [UniqueRNG] Number selected by fallback:', {
                    randomIndex: randomIndex,
                    selectedNumber: number
                });
            }
        }
        
        console.log('🎆 [UniqueRNG] Final unique number:', {
            finalNumber: number,
            totalAttempts: attempts,
            success: !excludeNumbers.includes(number)
        });
        
        return number;
    }
    
    // 📊 통계 정보
    getStats() {
        return {
            webCryptoCallCount: this.webCryptoCallCount,
            contextHistoryLength: this.clickContextHistory.length
        };
    }
}

export class ThreeEngine {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.balls = [];
        this.selectedMainNumbers = [];
        this.selectedPowerBall = null;
        this.isInitialized = false;
        this.isRendering = false;
        
        // 🔥 WebCrypto 보안 난수 생성기 추가
        this.secureRandom = new SecureRandomGenerator();
        this.currentClickEvent = null;  // 클릭 이벤트 저장용
        
        // 🎯 PENTAGON ROTATION SYSTEM
        this.currentRotation = 0;  // 현재 5각형 회전 각도
        this.frontBallIndex = 0;   // 현재 앞에 있는 볼 인덱스
        this.isRotating = false;   // 회전 중인지 여부
        
        // Callback functions
        this.onBallClick = null;
        this.onGameComplete = null;
        
        // 🎯 PENTAGON POSITIONS - 5각형 배치 + 회전 시스템
        this.PENTAGON_RADIUS = 3;  // 5각형 반지름
        this.FRONT_Z = 3;          // 앞 볼의 Z 위치 (클릭하기 쉬운 위치)
        this.POWERBALL_POS = { x: 0, y: 4, z: 0 };  // 파워볼 고정 위치
        
        console.log('🎮 Pentagon Rotation ThreeEngine constructor completed with WebCrypto!');
        showRealtimeMessage('🎮 Pentagon Rotation ThreeEngine constructor completed');
    }

    // 🎯 5각형 위치 계산 함수 (사용자 직관적 순서)
    calculatePentagonPosition(index, rotationAngle = 0) {
        const angleStep = (2 * Math.PI) / 5;  // 72도씩
        
        // 🎯 사용자 직관적 순서로 조정: index 0이 정면 앞에 오도록
        // +π/3 회전으로 index 0을 정면에 배치 (우측앞→정면으로)
        const baseAngle = Math.PI / 3; // +60도 회전 (90도에서 줄임)
        const angle = index * angleStep + rotationAngle + baseAngle;
        
        return {
            x: Math.sin(angle) * this.PENTAGON_RADIUS,
            y: 1.5,
            z: Math.cos(angle) * this.PENTAGON_RADIUS + this.FRONT_Z
        };
    }

    async init() {
        if (this.isInitialized) {
            console.log('🎮 Pentagon system already initialized');
            return;
        }

        try {
            this.initScene();
            this.initCamera();
            this.initRenderer();
            this.initLighting();
            this.initFloor();
            await this.createBalls();
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('🎮 ✨ PENTAGON ROTATION SYSTEM initialized! ✨');
            
        } catch (error) {
            console.error('❌ Pentagon system initialization failed:', error);
            throw error;
        }
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);
    }

    initCamera() {
        const generationScreen = document.getElementById('generationScreen');
        const containerWidth = generationScreen.clientWidth;
        const containerHeight = generationScreen.clientHeight;
        
        console.log('📐 Container dimensions:', containerWidth, 'x', containerHeight);
        
        this.camera = new THREE.PerspectiveCamera(
            75, 
            containerWidth / containerHeight,
            0.1, 
            1000
        );
        // 5각형을 잘 보기 위한 카메라 각도
        this.camera.position.set(6, 5, 8);
        this.camera.lookAt(0, 1.5, this.FRONT_Z);
    }

    initRenderer() {
        const generationScreen = document.getElementById('generationScreen');
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.renderer.setSize(generationScreen.clientWidth, generationScreen.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0x000000, 0);
        
        generationScreen.appendChild(this.renderer.domElement);
    }

    initLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(15, 15, 10);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        
        // Pentagon highlight light (앞 볼 강조)
        const frontLight = new THREE.PointLight(0x00ffff, 1.0, 20);
        frontLight.position.set(0, 3, this.FRONT_Z + 2);
        this.scene.add(frontLight);
        
        // Ambient pentagon light
        const pentagonLight = new THREE.PointLight(0xff3333, 0.5, 30);
        pentagonLight.position.set(0, 6, this.FRONT_Z - 3);
        this.scene.add(pentagonLight);
    }

    initFloor() {
        const floorGeometry = new THREE.CircleGeometry(15, 32);
        const floorMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2a2a2a,
            transparent: true,
            opacity: 0.3
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -1;
        floor.receiveShadow = true;
        this.scene.add(floor);
    }

    createTextTexture(text, ballType = 'main', isQuantumState = true, isSelected = false) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        canvas.width = 128;
        canvas.height = 128;
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        let bgColor, textColor, borderColor;
        
        if (isSelected) {
            // 선택된 볼
            if (ballType === 'powerball') {
                bgColor = '#ff3333';
                borderColor = '#ff0000';
                textColor = '#ffffff';
            } else {
                bgColor = '#ffff00';
                borderColor = '#ffaa00';
                textColor = '#000000';
            }
        } else if (isQuantumState) {
            // 양자 중첩 상태
            const shimmer = Math.sin(Date.now() * 0.01) * 0.3 + 0.7;
            if (ballType === 'powerball') {
                bgColor = `rgba(255, ${Math.floor(100 * shimmer)}, ${Math.floor(100 * shimmer)}, 0.9)`;
                borderColor = '#ff0066';
                textColor = '#ffffff';
            } else {
                bgColor = `rgba(${Math.floor(100 * shimmer)}, 255, 255, 0.9)`;
                borderColor = '#0066ff';
                textColor = '#000000';
            }
        }
        
        // 원형 배경
        const gradient = context.createRadialGradient(64, 64, 20, 64, 64, 60);
        gradient.addColorStop(0, bgColor);
        gradient.addColorStop(1, isSelected ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)');
        
        context.beginPath();
        context.arc(64, 64, 60, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.fill();
        
        // 테두리
        context.strokeStyle = borderColor;
        context.lineWidth = isSelected ? 4 : 3;
        if (!isSelected && isQuantumState) {
            context.setLineDash([8, 4]);
            context.lineDashOffset = Date.now() * 0.01;
        }
        context.stroke();
        context.setLineDash([]);
        
        // 텍스트
        context.shadowColor = textColor;
        context.shadowBlur = isSelected ? 0 : 10;
        context.font = 'bold 42px Arial';
        context.fillStyle = textColor;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 64, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    async createBalls() {
        console.log('🎯 [CreateBalls] 3D ball creation started - WebCrypto based initial numbers...');
        showRealtimeMessage('🎯 [CreateBalls] 3D ball creation started');
        this.balls = [];
        
        // 🎯 Create 5 main balls in pentagon formation
        for (let i = 0; i < 5; i++) {
            console.log(`🎯 [CreateBalls] Creating main ball #${i + 1}...`);
            const initialNumber = await this.secureRandom.generateSecureNumber(1, 70);
            const textTexture = this.createTextTexture(initialNumber.toString(), 'main', true, false);
            
            const sphereGeometry = new THREE.SphereGeometry(1.0, 32, 32);  // 적당한 크기로 조정
            const sphereMaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                map: textTexture,
                shininess: 100,
                transparent: true,
                opacity: 0.9
            });
            
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            
            // 🎯 5각형 위치 계산
            const pos = this.calculatePentagonPosition(i, this.currentRotation);
            sphere.position.set(pos.x, pos.y, pos.z);
            
            sphere.castShadow = true;
            sphere.receiveShadow = true;
            
            sphere.userData = {
                ballType: 'main',
                isQuantumState: true,
                isSelected: false,
                fixedNumber: null,
                currentNumber: initialNumber,
                changeSpeed: 0.1 + Math.random() * 0.05,
                changeTimer: Math.random(),
                rotationSpeed: 0.005 + Math.random() * 0.01,
                pulseSpeed: 0.03 + Math.random() * 0.02,
                originalY: sphere.position.y,
                ballIndex: i,
                selectedRotationSpeed: 0,
                pentagonIndex: i  // 5각형에서의 위치
            };
            
            this.balls.push(sphere);
            this.scene.add(sphere);
        }
        
        // 🎯 Create powerball - 중앙 위 고정
        console.log('🔴 [CreateBalls] Creating powerball...');
        const powerballNumber = await this.secureRandom.generateSecureNumber(1, 27);
        console.log(`🔴 [CreateBalls] Powerball initial number: ${powerballNumber}`);
        const powerballTexture = this.createTextTexture(powerballNumber.toString(), 'powerball', true, false);
        
        const powerballGeometry = new THREE.SphereGeometry(1.1, 32, 32);  // 파워볼도 조금 조정
        const powerballMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: powerballTexture,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        
        const powerball = new THREE.Mesh(powerballGeometry, powerballMaterial);
        powerball.position.set(
            this.POWERBALL_POS.x, 
            this.POWERBALL_POS.y, 
            this.POWERBALL_POS.z
        );
        powerball.castShadow = true;
        powerball.receiveShadow = true;
        
        powerball.userData = {
            ballType: 'powerball',
            isQuantumState: true,
            isSelected: false,
            fixedNumber: null,
            currentNumber: powerballNumber,
            changeSpeed: 0.08,
            changeTimer: 0,
            rotationSpeed: 0.008,
            pulseSpeed: 0.04,
            originalY: powerball.position.y,
            selectedRotationSpeed: 0
        };
        
        this.balls.push(powerball);
        this.scene.add(powerball);
        
        console.log('🎆 [CreateBalls] All 3D balls creation completed!', {
            mainBalls: 5,
            powerball: 1,
            totalBalls: this.balls.length,
            webCryptoCallsUsed: this.secureRandom.getStats().webCryptoCallCount
        });
    }

    setupEventListeners() {
        this.renderer.domElement.addEventListener('click', async (event) => {
            await this.onMouseClick(event);
        });
        
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });
    }

    async onMouseClick(event) {
        if (this.isRotating) return;  // 회전 중에는 클릭 불가
        
        // 🔥 클릭 이벤트 저장 (컨텍스트 엔트로피용)
        this.currentClickEvent = event;
        
        const mouse = new THREE.Vector2();
        const rect = this.renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.balls);
        
        if (intersects.length > 0) {
            const clickedBall = intersects[0].object;
            
            if (clickedBall.userData.ballType === 'powerball') {
                // 파워볼은 언제든 클릭 가능
                this.selectBall(clickedBall);
            } else {
                // 메인볼은 앞에 있는 것만 클릭 가능 (frontBallIndex)
                if (clickedBall.userData.pentagonIndex === this.frontBallIndex && !clickedBall.userData.isSelected) {
                    this.selectBall(clickedBall);
                    this.rotatePentagon();  // 🎯 5각형 회전!
                }
            }
        }
    }

    async selectBall(ball) {
        const userData = ball.userData;
        
        console.log('🎯 Selecting ball with WebCrypto:', userData.ballType, 'pentagon index:', userData.pentagonIndex);
        
        // 🔥 WebCrypto 하이브리드 엔트로피로 번호 결정
        let finalNumber;
        if (userData.ballType === 'powerball') {
            finalNumber = await this.secureRandom.generateSecureNumber(1, 27, ball, this.currentClickEvent);
            this.selectedPowerBall = finalNumber;
        } else {
            finalNumber = await this.secureRandom.generateUniqueMainNumber(this.selectedMainNumbers, ball, this.currentClickEvent);
            this.selectedMainNumbers.push(finalNumber);
            this.selectedMainNumbers.sort((a, b) => a - b);
        }
        
        // 📊 WebCrypto 통계 정보 로그
        const stats = this.secureRandom.getStats();
        console.log(`🔥 WebCrypto Stats - Calls: ${stats.webCryptoCallCount}, Final Number: ${finalNumber}`);
        
        // 볼 상태 업데이트
        userData.isQuantumState = false;
        userData.isSelected = true;
        userData.fixedNumber = finalNumber;
        userData.selectedRotationSpeed = 0.05;
        
        // 텍스처 업데이트
        const newTexture = this.createTextTexture(
            finalNumber.toString(), 
            userData.ballType, 
            false,
            true
        );
        ball.material.map = newTexture;
        ball.material.needsUpdate = true;
        
        // 색상 변경
        if (userData.ballType === 'powerball') {
            ball.material.color.setHex(0xff3333);
        } else {
            ball.material.color.setHex(0xffff00);
        }
        
        // 콜백
        if (this.onBallClick) {
            this.onBallClick({
                numbers: this.selectedMainNumbers,
                powerball: this.selectedPowerBall
            });
        }
        
        // 게임 완료 체크
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
    }

    // 🎯 5각형 회전 함수
    rotatePentagon() {
        if (this.isRotating) return;
        
        this.isRotating = true;
        const rotationStep = (2 * Math.PI) / 5;  // 72도
        this.currentRotation += rotationStep;  // 🔄 시계방향 회전 (자연스러운 시각적 효과)
        this.frontBallIndex = (this.frontBallIndex - 1 + 5) % 5;  // 하지만 인덱스는 반대로 (다음 볼이 앞으로)
        
        console.log('🔄 Rotating pentagon! Next front ball index:', this.frontBallIndex);
        
        // 모든 메인볼의 위치를 부드럽게 이동
        const mainBalls = this.balls.filter(ball => ball.userData.ballType === 'main');
        
        mainBalls.forEach((ball, index) => {
            const targetPos = this.calculatePentagonPosition(ball.userData.pentagonIndex, this.currentRotation);
            this.animatePosition(ball, targetPos, 1.0);
        });
        
        // 회전 완료 후 플래그 해제
        setTimeout(() => {
            this.isRotating = false;
            console.log('✅ Pentagon rotation completed!');
            showRealtimeMessage('✅ Pentagon rotation completed!');
        }, 1000);
    }

    animatePosition(ball, targetPos, duration = 1.0) {
        const startPos = { ...ball.position };
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            
            ball.position.x = startPos.x + (targetPos.x - startPos.x) * eased;
            ball.position.y = startPos.y + (targetPos.y - startPos.y) * eased;
            ball.position.z = startPos.z + (targetPos.z - startPos.z) * eased;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        
        const generationScreen = document.getElementById('generationScreen');
        const containerWidth = generationScreen.clientWidth;
        const containerHeight = generationScreen.clientHeight;
        
        this.camera.aspect = containerWidth / containerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(containerWidth, containerHeight);
    }

    startRendering() {
        if (this.isRendering) return;
        
        this.isRendering = true;
        this.animate();
        console.log('🎬 ✨ PENTAGON ROTATION rendering started! ✨');
    }

    animate() {
        if (!this.isRendering) return;
        
        requestAnimationFrame(() => this.animate());
        
        this.balls.forEach((ball, index) => {
            const userData = ball.userData;
            
            if (userData.isSelected) {
                // 선택된 볼 - 회전 효과
                ball.rotation.y += userData.selectedRotationSpeed;
                ball.rotation.x += userData.selectedRotationSpeed * 0.3;
                userData.selectedRotationSpeed *= 0.98;
                ball.material.opacity = 1.0;
                
            } else {
                // 양자 상태 볼
                ball.rotation.y += userData.rotationSpeed;
                ball.rotation.x += userData.rotationSpeed * 0.3;
                
                // 번호 변화
                userData.changeTimer += userData.changeSpeed;
                if (userData.changeTimer >= 1.0) {
                    userData.changeTimer = 0;
                    
                    const maxNumber = userData.ballType === 'powerball' ? 26 : 69;
                    // 🔥 양자 상태용 빠른 난수 (성능상 Math.random 사용, 클릭시 WebCrypto 사용)
                    userData.currentNumber = Math.floor(Math.random() * maxNumber) + 1;
                    
                    const newTexture = this.createTextTexture(
                        userData.currentNumber.toString(), 
                        userData.ballType, 
                        true,
                        false
                    );
                    ball.material.map = newTexture;
                    ball.material.needsUpdate = true;
                }
                
                // 🎯 앞에 있는 볼(클릭 가능한 볼) 강력한 시각적 표시
                const isFrontBall = (userData.ballType === 'main' && userData.pentagonIndex === this.frontBallIndex);
                
                if (isFrontBall) {
                    // ✨ 앞 볼: 강력한 시각적 표시
                    const glowIntensity = 0.3 + Math.sin(Date.now() * 0.02) * 0.2; // 0.1 ~ 0.5 사이
                    
                    // 🔵 밝은 파란색 발광 효과
                    ball.material.color.setHex(0x00ffff);
                    ball.material.emissive.setHex(0x002244);
                    ball.material.emissiveIntensity = glowIntensity;
                    
                    // 📏 크기 변화 (10% 더 크게)
                    const scaleBonus = 1.0 + Math.sin(Date.now() * 0.01) * 0.1; // 1.0 ~ 1.1 사이
                    ball.scale.set(scaleBonus, scaleBonus, scaleBonus);
                    
                    // 🎯 위아래 펄스 (강함)
                    const frontPulse = Math.sin(Date.now() * 0.02) * 0.3;
                    ball.position.y = userData.originalY + frontPulse;
                    
                    // 💎 완전 불투명
                    ball.material.opacity = 1.0;
                    
                } else {
                    // 🌫️ 뒤 볼들: 기본 상태
                    ball.material.color.setHex(0xffffff);
                    ball.material.emissive.setHex(0x000000);
                    ball.material.emissiveIntensity = 0;
                    
                    // 기본 크기
                    ball.scale.set(1.0, 1.0, 1.0);
                    
                    // 약한 펄스
                    const backPulse = Math.sin(Date.now() * userData.pulseSpeed * 0.01) * 0.05;
                    ball.position.y = userData.originalY + backPulse;
                    
                    // 반투명
                    const baseOpacity = 0.6;
                    const shimmer = baseOpacity + Math.sin(Date.now() * 0.008 + index) * 0.1;
                    ball.material.opacity = shimmer;
                }
            }
        });
        
        this.renderer.render(this.scene, this.camera);
    }

    stopRendering() {
        this.isRendering = false;
        console.log('⏸️ Pentagon rendering stopped');
    }

    resetGame() {
        this.selectedMainNumbers = [];
        this.selectedPowerBall = null;
        this.currentRotation = 0;
        this.frontBallIndex = 0;
        this.isRotating = false;
        
        // 모든 볼을 양자 상태로 리셋
        this.balls.forEach((ball, index) => {
            const userData = ball.userData;
            userData.isQuantumState = true;
            userData.isSelected = false;
            userData.fixedNumber = null;
            userData.selectedRotationSpeed = 0;
            ball.material.color.setHex(0xffffff);
            
            // 메인볼들을 원래 5각형 위치로
            if (userData.ballType === 'main') {
                const pos = this.calculatePentagonPosition(userData.pentagonIndex, 0);
                ball.position.set(pos.x, pos.y, pos.z);
            }
        });
        
        console.log('🔄 Pentagon system reset!');
    }

    getSelectedNumbers() {
        return {
            main: [...this.selectedMainNumbers],
            powerball: this.selectedPowerBall
        };
    }

    generateTestNumbers() {
        // 순서대로 자동 선택 (테스트용)
        setTimeout(() => {
            const frontBall = this.balls.find(ball => 
                ball.userData.ballType === 'main' && 
                ball.userData.pentagonIndex === this.frontBallIndex &&
                !ball.userData.isSelected
            );
            if (frontBall) {
                this.selectBall(frontBall);
                this.rotatePentagon();
                if (this.selectedMainNumbers.length < 5) {
                    this.generateTestNumbers();  // 재귀적으로 계속 선택
                }
            }
        }, 1500);
        
        return this.getSelectedNumbers();
    }
}

console.log('🎮 ✨ PENTAGON ROTATION SYSTEM - Perfect Click Experience! ✨');
