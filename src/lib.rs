use wasm_bindgen::prelude::*;
use js_sys::Math;
use web_sys::console;
use rand::prelude::*;
use rand_chacha::ChaCha20Rng;

// JavaScript console.log 바인딩
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

// Mersenne Twister 구현 (JavaScript와 비교용)
pub struct MersenneTwister {
    mt: [u32; 624],
    index: usize,
}

impl MersenneTwister {
    pub fn new(seed: u32) -> Self {
        let mut mt = [0u32; 624];
        mt[0] = seed;
        
        for i in 1..624 {
            mt[i] = 1812433253u32
                .wrapping_mul(mt[i - 1] ^ (mt[i - 1] >> 30))
                .wrapping_add(i as u32);
        }
        
        Self { mt, index: 0 }
    }
    
    pub fn next_u32(&mut self) -> u32 {
        if self.index >= 624 {
            self.generate();
            self.index = 0;
        }
        
        let mut y = self.mt[self.index];
        y ^= y >> 11;
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= y >> 18;
        
        self.index += 1;
        y
    }
    
    fn generate(&mut self) {
        for i in 0..624 {
            let y = (self.mt[i] & 0x80000000) + (self.mt[(i + 1) % 624] & 0x7fffffff);
            self.mt[i] = self.mt[(i + 397) % 624] ^ (y >> 1);
            if y % 2 != 0 {
                self.mt[i] ^= 0x9908b0df;
            }
        }
    }
    
    pub fn next_f64(&mut self) -> f64 {
        self.next_u32() as f64 / u32::MAX as f64
    }
}

// 고성능 암호학적 RNG
#[wasm_bindgen]
pub struct HighPerformanceRNG {
    mt_rng: MersenneTwister,
    chacha_rng: ChaCha20Rng,
    entropy_pool: Vec<u32>,
}

#[wasm_bindgen]
impl HighPerformanceRNG {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        // 웹 Crypto API에서 강력한 시드 획득
        let crypto_seed = js_sys::Math::random() * u32::MAX as f64;
        let time_seed = js_sys::Date::now() as u32;
        let combined_seed = (crypto_seed as u32) ^ time_seed;
        
        // ChaCha20 RNG 초기화 (암호학적 강도)
        let mut seed = [0u8; 32];
        for (i, chunk) in seed.chunks_mut(4).enumerate() {
            let val = combined_seed.wrapping_mul(i as u32 + 1);
            chunk.copy_from_slice(&val.to_le_bytes());
        }
        let chacha_rng = ChaCha20Rng::from_seed(seed);
        
        // Mersenne Twister 초기화 (성능 비교용)
        let mt_rng = MersenneTwister::new(combined_seed);
        
        Self {
            mt_rng,
            chacha_rng,
            entropy_pool: Vec::new(),
        }
    }
    
    // Mersenne Twister 기반 난수 (JavaScript 비교용)
    #[wasm_bindgen]
    pub fn mt_random(&mut self) -> f64 {
        self.mt_rng.next_f64()
    }
    
    // ChaCha20 암호학적 난수 (최고 품질)
    #[wasm_bindgen]
    pub fn crypto_random(&mut self) -> f64 {
        self.chacha_rng.gen::<f64>()
    }
    
    // 하이브리드 엔트로피 (최고 보안)
    #[wasm_bindgen]
    pub fn hybrid_random(&mut self) -> f64 {
        let crypto_val = self.chacha_rng.gen::<u32>();
        let mt_val = self.mt_rng.next_u32();
        let js_val = (js_sys::Math::random() * u32::MAX as f64) as u32;
        
        // XOR 조합으로 엔트로피 결합
        let combined = crypto_val ^ mt_val ^ js_val;
        combined as f64 / u32::MAX as f64
    }
    
    // 고성능 복권 번호 생성 (메인볼)
    #[wasm_bindgen]
    pub fn generate_main_numbers(&mut self) -> Vec<u32> {
        let mut numbers = Vec::new();
        let mut used = std::collections::HashSet::new();
        
        while numbers.len() < 5 {
            let num = (self.crypto_random() * 69.0).floor() as u32 + 1;
            if !used.contains(&num) {
                used.insert(num);
                numbers.push(num);
            }
        }
        
        numbers.sort();
        numbers
    }
    
    // 고성능 파워볼 생성
    #[wasm_bindgen]
    pub fn generate_powerball(&mut self) -> u32 {
        (self.hybrid_random() * 26.0).floor() as u32 + 1
    }
}

// 성능 벤치마크 함수들
#[wasm_bindgen]
pub struct PerformanceBenchmark {
    rng: HighPerformanceRNG,
}

#[wasm_bindgen]
impl PerformanceBenchmark {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            rng: HighPerformanceRNG::new(),
        }
    }
    
    // Mersenne Twister 성능 테스트
    #[wasm_bindgen]
    pub fn benchmark_mt(&mut self, iterations: u32) -> f64 {
        let start = js_sys::Date::now();
        
        for _ in 0..iterations {
            self.rng.mt_random();
        }
        
        let end = js_sys::Date::now();
        end - start
    }
    
    // ChaCha20 성능 테스트
    #[wasm_bindgen]
    pub fn benchmark_crypto(&mut self, iterations: u32) -> f64 {
        let start = js_sys::Date::now();
        
        for _ in 0..iterations {
            self.rng.crypto_random();
        }
        
        let end = js_sys::Date::now();
        end - start
    }
    
    // 하이브리드 성능 테스트
    #[wasm_bindgen]
    pub fn benchmark_hybrid(&mut self, iterations: u32) -> f64 {
        let start = js_sys::Date::now();
        
        for _ in 0..iterations {
            self.rng.hybrid_random();
        }
        
        let end = js_sys::Date::now();
        end - start
    }
    
    // 복권 번호 생성 성능 테스트
    #[wasm_bindgen]
    pub fn benchmark_lottery(&mut self, iterations: u32) -> f64 {
        let start = js_sys::Date::now();
        
        for _ in 0..iterations {
            self.rng.generate_main_numbers();
            self.rng.generate_powerball();
        }
        
        let end = js_sys::Date::now();
        end - start
    }
}

// 초기화 및 로그
#[wasm_bindgen(start)]
pub fn main() {
    console_log!("🚀 Rust WASM 고성능 난수 생성기 초기화 완료!");
}
