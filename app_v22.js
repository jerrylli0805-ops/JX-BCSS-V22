// ==========================================
// --- OFFLINE ICON SYSTEM (豪華完整版) ---
// ==========================================
import { BleClient, numberToUUID } from '@capacitor-community/bluetooth-le';
const OFFLINE_ICONS = { 
    'power': '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>',
    'layers': '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    'minimize-2': '<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/>',
    // --- [NEW] 同步與 QR Code 相關 (補上這塊) ---
    'qr-code': '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',
    'scan': '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>',
    'scan-line': '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/>',
    // --- 核心導航與箭頭 (補齊缺失的箭頭) ---
    'plane': '<path d="M2 12h20"/><path d="M13 2l9 10"/><path d="M13 22l9-10"/><path d="M2 12l5-5"/><path d="M2 12l5 5"/>',
    'arrow-left': '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
    'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
    'chevron-down': '<polyline points="6 9 12 15 18 9"/>',
    'chevron-up': '<polyline points="18 15 12 9 6 15"/>',
    'x': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    'menu': '<line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/>',
    'arrow-right-left': '<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>',
    
    // --- 功能按鈕 (Save, Load, Sync, Edit) ---
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    'save': '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
    'refresh-cw': '<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>',
    'edit': '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
    'trash-2': '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    'check': '<polyline points="20 6 9 17 4 12"/>',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    'minus': '<line x1="5" y1="12" x2="19" y2="12"/>',
    'search': '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    'settings': '<path d="M12.22 2h-.44a2 2 0 0 1-2-1.2l-.1-1.7a1 1 0 0 0-1.1-1.1l-1.7.1a2 2 0 0 1-1.2-2L6 11.78a1 1 0 0 0-1.1-1.1l-1.7.1a2 2 0 0 1-1.2-2L1.78 6a1 1 0 0 0-1.1-1.1l-1.7.1a2 2 0 0 1-1.2-2L2 2.22a1 1 0 0 0 1.1 1.1l1.7-.1a2 2 0 0 1 1.2 2L6 4.22a1 1 0 0 0 1.1 1.1l1.7-.1a2 2 0 0 1 1.2 2L11.78 6a1 1 0 0 0 1.1-1.1l.1-1.7a2 2 0 0 1 2-1.2L16 2.22a1 1 0 0 0 1.1-1.1l.1-1.7a2 2 0 0 1 2-1.2L20 4.22a1 1 0 0 0 1.1 1.1l1.7-.1a2 2 0 0 1 1.2 2L22 11.78a1 1 0 0 0-1.1 1.1l-1.7-.1a2 2 0 0 1-1.2 2L18.22 22a1 1 0 0 0-1.1-1.1l-1.7.1a2 2 0 0 1-1.2-2L14 19.78a1 1 0 0 0-1.1-1.1l-1.7.1a2 2 0 0 1-1.2 2L9.78 22a1 1 0 0 0-1.1-1.1l-1.7.1a2 2 0 0 1-1.2-2L6 19.78a1 1 0 0 0-1.1-1.1l-1.7.1a2 2 0 0 1-1.2-2L2.22 18a1 1 0 0 0-1.1-1.1l-1.7.1a2 2 0 0 1-1.2-2L2 14.22a1 1 0 0 0 1.1-1.1l1.7.1a2 2 0 0 1 1.2-2L6 11.78z"/><circle cx="12" cy="12" r="3"/>',
    
    // --- 餐飲與服務 ---
    'utensils': '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    'flame': '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3a9 9 0 0 9-9Z"/>',
    'moon': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    'sun': '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    'coffee': '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>',
    'wine': '<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>',
    'soup': '<path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M7 21h10"/><path d="M19.5 12 22 6"/><path d="M16.25 3c.27.1.8.53.75 1.36-.05.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/><path d="M11.25 3c.27.1.8.53.75 1.36-.05.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/><path d="M6.25 3c.27.1.8.53.75 1.36-.05.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/>',
    'ice-cream': '<path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11"/><path d="M17 7A5 5 0 0 0 7 7"/><path d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"/>',
    'apple': '<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/>',
    'cake': '<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5-2 4-2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>',

    // --- 乘客標籤與狀態 ---
    'baby': '<path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>',
    'sticky-note': '<path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M15 3v6h6"/>',
    'bell-off': '<path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .5 5"/><path d="M17 17H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><line x1="2" y1="2" x2="22" y2="22"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    'timer': '<line x1="10" y1="2" x2="14" y2="2"/><line x1="12" y1="14" x2="15" y2="11"/><circle cx="12" cy="14" r="8"/>',
    'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'crown': '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>',
    'mountain': '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
    'compass': '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    'shield-alert': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    'hand': '<path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    'alert-circle': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    'info': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'
};
// 配置 Tailwind CSS
tailwind.config = { theme: { extend: { colors: { 'starlux-dark': '#0d1a26', 'starlux-gold': '#d9a74a' } } } }

const STORAGE_KEY = 'STARLUX_FLIGHT_BACKUP_V1';

let galleySideFilter = 'ALL'; // 'ALL', 'L', 'R'
let galleyBevDoneState = {};  // 記錄 Galley 飲料是否已完成
let currentGalleyTab = 'MEALS'; // 'MEALS' or 'BEVERAGES'
let currentBevSubTab = 'M1'; 

// 2. 定義切換函式，並掛載到 window
window.switchBevSubTab = function(tab) {
    console.log("Switching Beverage Tab to:", tab); // 讓您可以在 Console 看到點擊反應
    currentBevSubTab = tab;
    renderGalleyDashboard(); // 重新渲染介面
};

// ==========================================
// [重要] 請確保這兩個變數與函式放在最外層 (Global Scope)
// 否則每次點擊切換時，狀態都會被重置，導致無法切換到 Meal 2
// ==========================================


// [FIXED] 渲染函式：自動處理樣式與大小
function safeRenderIcons() {
    const elements = document.querySelectorAll('[data-lucide]');
    
    elements.forEach(element => {
        const iconName = element.getAttribute('data-lucide');
        
        // 檢查圖示是否存在
        if (OFFLINE_ICONS && OFFLINE_ICONS[iconName]) {
            const svgContent = OFFLINE_ICONS[iconName];
            
            element.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                     stroke-linejoin="round" class="lucide lucide-${iconName}">
                     ${svgContent}
                </svg>`;
            // 建立 SVG
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            
            // 設定標準 SVG 屬性
            svg.setAttribute('width', '24');
            svg.setAttribute('height', '24');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '2');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');
            
            // 繼承原本的 class
            const originalClass = element.getAttribute('class') || '';
            svg.setAttribute('class', `lucide lucide-${iconName} ${originalClass}`);
            
            // [關鍵優化] 如果沒有指定寬高，強制設定預設大小 (防止圖示變超大)
            if (!originalClass.includes('w-') && !element.style.width) {
                 svg.style.width = '16px'; // 預設 16px
                 svg.style.height = '16px';
            }
            // 讓 SVG 繼承原本元素的行內樣式 (例如 style="color: red")
            if (element.style.cssText) {
                svg.style.cssText += element.style.cssText;
            }

            // 填入內容並替換
            svg.innerHTML = svgContent;
            element.replaceWith(svg);
        }
    });
}

// --- [GLOBAL UTILS] 顯示/隱藏視窗的統一管理函式 ---
//這能確保無論 CSS 是否載入成功，或是 style 是否殘留，視窗都能正確開關
function showModal(element) {
    if (!element) return;
    element.classList.remove('hidden');
    element.classList.add('flex');
    element.style.display = 'flex'; // 強制寫入 inline style (最高權重)
}

function hideModal(element) {
    if (!element) return;
    element.classList.add('hidden');
    element.classList.remove('flex');
    element.style.display = 'none'; // 強制寫入 inline style (最高權重)
}

// 1. 自動儲存當前狀態
function saveSystemState() {
    if (!flightNumber) return; // 如果還沒設定航班，就不儲存

    const state = {
        timestamp: Date.now(),
        flightNumber,
        currentAircraftType,
        activeAircraftConfig,
        currentRoute,
        mealInventory_1,
        mealInventory_2,
        appetizerInventory, // 記得也要存前菜庫存
        orders,
        currentMode,        // 儲存當前模式 (Order/Service)
        currentServicePhase // 儲存當前階段 (Meal 1/Meal 2)
    };

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        // console.log('Auto-saved at', new Date().toLocaleTimeString());
    } catch (e) {
        console.error('Auto-save failed:', e);
    }
}
// [FIXED] checkAndRestoreState - 改為回傳布林值，並優化取消邏輯
function checkAndRestoreState() {
    const backup = localStorage.getItem(STORAGE_KEY);
    if (!backup) return false; // 沒有備份

    try {
        const data = JSON.parse(backup);
        const backupTime = new Date(data.timestamp).toLocaleString();
        
        // 詢問使用者是否還原
        if (confirm(`Detected an unsaved session for flight ${data.flightNumber} from ${backupTime}.\nDo you want to restore it?`)) {
            
            // --- A. 使用者選擇「是」：還原資料 ---
            flightNumber = data.flightNumber;
            currentAircraftType = data.currentAircraftType;
            activeAircraftConfig = data.activeAircraftConfig;
            currentRoute = data.currentRoute;
            mealInventory_1 = data.mealInventory_1 || {};
            mealInventory_2 = data.mealInventory_2 || {};
            appetizerInventory = data.appetizerInventory || {};
            orders = data.orders;
            currentMode = data.currentMode || MODES.ORDER_MODE;
            currentServicePhase = data.currentServicePhase || 'MEAL_1';

            // 還原 UI
            appElements.displayFlightNo.textContent = flightNumber;
            appElements.aircraftSelect.value = currentAircraftType;
            appElements.routeSelect.value = currentRoute;
            
            // 隱藏 Setup，顯示主畫面
            appElements.inventoryModal.classList.replace('flex', 'hidden');
            appElements.inventoryModal.classList.add('hidden'); // 雙重確保
            
            ['seatLayoutContainer', 'summarySection', 'controlPanel'].forEach(el => appElements[el].classList.remove('hidden'));
            if (appElements.editInventoryBtn) appElements.editInventoryBtn.classList.remove('hidden');

            // 還原模式顯示
            if (currentMode === MODES.SERVICE_MODE) {
                appElements.modeToggleBtn.textContent = 'Switch to ORDER MODE';
                appElements.displayMode.textContent = `SERVICE MODE (${currentServicePhase === 'MEAL_1' ? 'Meal 1' : 'Meal 2'})`;
                appElements.displayMode.classList.replace('text-green-400', 'text-red-400');
                appElements.endFlightBtn.classList.remove('hidden');
                if (activeMeals_2.length > 0) {
                    appElements.phaseToggleBtn.classList.remove('hidden');
                    appElements.phaseToggleBtn.textContent = currentServicePhase === 'MEAL_1' ? 'START 2ND MEAL' : '1ST MEAL';
                }
            }

            // 處理走道視窗顯示
            if (activeAircraftConfig.seatLetters.length > 2) {
                appElements.aisleViewControls.classList.remove('hidden');
            } else {
                appElements.aisleViewControls.classList.add('hidden');
            }
            setAisleView('ALL');

            // 重新載入菜單定義
            const routeMenus = MENUS[currentRoute] || { meal_1: [], meal_2: [] };
            activeMeals_1 = routeMenus.meal_1 || [];
            activeMeals_2 = routeMenus.meal_2 || [];

            renderSeatLayout();
            showMessage('Session Restored Successfully!', false);
            return true; // 還原成功
        } else {
            // --- B. 使用者選擇「否」：清除舊資料，回傳失敗以便開啟 Setup ---
            localStorage.removeItem(STORAGE_KEY);
            return false; // 不還原
        }
    } catch (e) {
        console.error('Restore failed:', e);
        localStorage.removeItem(STORAGE_KEY); // 資料壞掉就刪除
        return false;
    }
}

// --- 核心資料結構 ---
const TITLES = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];
const MODES = { ORDER_MODE: 'ORDER MODE', SERVICE_MODE: 'SERVICE MODE' };
const TAGS = {
    'sitc': { icon: 'user', color: 'text-slate-400', label: 'SITC' },
    'titc': { icon: 'mountain', color: 'text-amber-400', label: 'TITC' },
    'aitc': { icon: 'compass', color: 'text-sky-400', label: 'AITC' },
    'ritc': { icon: 'CROWN', color: 'text-amber-400', label: 'RITC' },
   
   
    'vip': { icon: 'crown', color: 'text-yellow-400', label: 'VIP' },
    'birthday': { icon: 'cake', color: 'text-pink-400', label: 'Birthday' },
    'allergic': { icon: 'shield-alert', color: 'text-red-400', label: 'Allergy' },
    'help': { icon: 'hand', color: 'text-blue-400', label: 'Needs Assistance' }
};

    
// [NEW] ICAO SPML Codes
const ICAO_SPML_CODES = {
    'BBML': 'Baby Meal (BBML)',
    'CHML': 'Child Meal (CHML)',
    'VGML': 'Vegetarian Vegan Meal (VGML)',
    'VJML': 'Vegetarian Jain Meal (VJML)',
    'VOML': 'Vegetarian Oriental Meal (VOML)',
    'VLML': 'Vegetarian Lacto-Ovo Meal (VLML)',
    'RVML': 'Raw Vegetarian Meal (RVML)',
    'AVML': 'Vegetarian Hindu Meal (AVML)',
    'KSML': 'Kosher Meal (KSML)',
    'MOML': 'Muslim Meal (MOML)',
    'HNML': 'Hindu Non-Vegetarian Meal (HNML)',
    'DBML': 'Diabetic Meal (DBML)',
    'LCML': 'Low-Calorie Meal (LCML)',
    'LFML': 'Low-Fat Meal (LFML)',
    'GFML': 'Gluten-Free Meal (GFML)',
    'LSML': 'Low-Sodium Meal (LSML)',
    'NLML': 'Non-Lactose Meal (NLML)',
    'SFML': 'Seafood Meal (SFML)',
    'FPML': 'Fruit Platter Meal (FPML)',
    'SPML': 'Special Special Meal (SPML)',
    'OTHER': 'Other (Please Specify)'
};

const MENUS = {
    // --- SS: Super Short (One Tray) ---
    'TPE-HKG': {
        meal_1: [
            { 
                code: 'MSE1', 
                name: 'STARLUX Edition: Watercress Herbal Soup', 
                chinese: '水田芥四神湯・和牛肉丸・蔥油餅', 
                dessert: 'ONE TRAY SERVICE' 
            },
            { 
                code: 'MDK1', 
                name: 'Roasted Honey Duck Breast', 
                chinese: '爐烤蜂蜜鴨胸・蒜烤洋芋', 
                dessert: 'ONE TRAY SERVICE' 
            },
            { 
                code: 'MFI1', 
                name: 'Pan Seared Halibut', 
                chinese: '香煎比目魚・昆布奶油醬', 
                dessert: 'ONE TRAY SERVICE' 
            },
        ],
    }, // 這裡原本多了一個 }，已移除，並補上逗號

    // SS 航線沒有 appetizers，也沒有 meal_2
    'TPE-SHI': {
        meal_1: [
            { code: 'MFI1', name: 'Exclusive International', chinese: '國際精選料理 ', dessert: 'ONE TRAY SERVICE' },
        ],
    }, // 這裡原本多了一個 }，已移除，並補上逗號

    'HKG-TPE': {
        meal_1: [
            { 
                code: 'MSE1', 
                name: 'STARLUX Edition: Dim Sum Set', 
                chinese: '脆炸蜂蜜牛肉・鮮肉蝦仁灌湯餃・釀虎皮尖椒', 
                dessert: 'Honey Ginger Jelly' 
            },
            { 
                code: 'MSF1', 
                name: 'INT-Garlic Sauteed Prawns', 
                chinese: '蒜片香炒大蝦・蔬菜炒飯', 
                dessert: 'Lime Mousse Cake' 
            },
            { 
                code: 'MCK1', 
                name: 'INT-Roasted Chicken Thigh', 
                chinese: '烤雞腿排・松露奶油醬', 
                dessert: 'Lime Mousse Cake' 
            },
        ],
    }, // 這裡原本多了一個 }，已移除，並補上逗號

    'MFM-TPE': {
        meal_1: [
            { 
                code: 'MSE1', 
                name: 'STARLUX Edition: BBQ Chicken Salad', 
                chinese: '香料烤雞腿排・鮪魚黃瓜捲・菠菜沙拉', 
                dessert: 'Mango Coconut Pudding' 
            },
            { 
                code: 'MCK1', 
                name: 'INT-Wok Fried Chicken', 
                chinese: '鹿茸菇炒雞・蒜香飯', 
                dessert: 'Black Sesame Cake' 
            },
            { 
                code: 'MSF1', 
                name: 'INT-Shrimp and Clams Pasta', 
                chinese: '蒜香白酒蛤蜊蝦仁・義式寬麵', 
                dessert: 'Black Sesame Cake' 
            },
        ],
    },

    // --- TPE <-> SHI (下地島 - 冷餐/輕食) ---
    'TPE-SHI': {
        meal_1: [
            { 
                code: 'MPK1', 
                name: 'Light Meal: Stracciatella & Sandwich', 
                chinese: '絲綢乳酪沙拉・雞蛋沙拉三明治', 
                dessert: 'Cranberry Scone' 
            },
        ],
        // Note: No heating required (Cold Meal)
    },

    'TPE-OKA': {
        meal_1: [
            { code: 'MPK1', name: 'Spiced Roast Pork Shoulder', chinese: '香料烤豬肩義式寬麵', dessert: 'ONE TRAY SERVICE' },
            { code: 'MFI1', name: 'Seared Halibut w/ Truffle Potatoes', chinese: '炙烤比目魚松露洋芋', dessert: 'ONE TRAY SERVICE' },
            { code: 'MSE1', name: 'STARLUX Edition', chinese: '星宇精選佳餚', dessert: 'ONE TRAY SERVICE' },
        ],
    },

    // --- S: Short (Full Course, No Choice of App) ---
    'TPE-NRT': {
        meal_1: [
           { code: 'MHT1', name: 'Online Exclusive-HUTONG Wagyu Steak', chinese: '胡同味噌日本和牛牛排', dessert: 'HT-Dorayaki' },
            { code: 'MDK1', name: 'INT-Roasted Honey Duck Breast', chinese: '爐烤蜂蜜鴨胸・蒜烤洋芋', dessert: 'INT-Yuzu Choco Mousse' },
            { code: 'MFI1', name: 'INT-Pan Seared Halibut', chinese: '香煎比目魚・寬扁麵', dessert: 'INT-Yuzu Choco Mousse' },
            { code: 'MCK1', name: 'ASIA-Miso Grilled Chicken Thigh', chinese: '雞腿味噌燒・釜飯', dessert: 'ASIA-Matcha Tart' },
        ],
    },
    'TPE-BKK': {
        meal_1: [
            { code: 'MHT1', name: 'Online Exclusive-HUTONG Short Rib Donburi', chinese: '胡同醬燒Prime牛小排丼', dessert: 'HT-Ninao Gelato' },
            { code: 'MDK1', name: 'INT-Roasted Honey Duck Breast', chinese: '爐烤蜂蜜鴨胸・蒜烤洋芋', dessert: 'INT-Yuzu Mousse' },
            { code: 'MFI1', name: 'INT-Pan Seared Halibut', chinese: '香煎比目魚・寬扁麵', dessert: 'INT-Yuzu Mousse' },
            { code: 'MCF1', name: 'ASIA-Wagyu Hamburger Steak', chinese: '和牛漢堡排・三星蔥油餅', dessert: 'ASIA-Red Bean Tiramisu' },
        ],
        // S 航線無前菜選項
    },
    // --- M: Medium (Appetizer Choice) ---
    'TPE-SIN': {
        meal_1: [
            { code: 'MDK1', name: 'INT-Roasted Honey Duck Breast', chinese: '爐烤蜂蜜鴨胸・蒜烤洋芋', dessert: 'INT-Dessert' },
            { code: 'MFI1', name: 'INT-Pan Seared Halibut', chinese: '香煎比目魚・寬扁麵', dessert: 'INT-Dessert' },
            { code: 'MCF1', name: 'ASIA-Wagyu Hamburger Steak', chinese: '和牛漢堡排・三星蔥油餅', dessert: 'ASIA-Red Bean Tiramisu' },
            { code: 'MHT1', name: 'Online Exclusive-HUTONG Short Rib Donburi', chinese: '胡同醬燒Prime牛小排丼', dessert: 'HT-Dessert' },
        ],
        appetizers: [
            { code: 'SCK1', name: 'Sous Vide Chicken Citrus Salad', chinese: '舒肥雞胸柑橘沙拉' }, 
            { code: 'SWS1', name: 'Creamy Mushroom Soup', chinese: '奶油蕈菇濃湯' }, 
        ]
    },

    'TPE-CTS':{
        meal_1: [
            { code: 'MDK1', name: 'INT-Roasted Honey Duck Breast', chinese: '爐烤蜂蜜鴨胸・蒜烤洋芋', dessert: 'INT-Dessert' },
            { code: 'MFI1', name: 'INT-Pan Seared Halibut', chinese: '香煎比目魚・寬扁麵', dessert: 'INT-Dessert' },
            { code: 'MCF1', name: 'ASIA-Wagyu Hamburger Steak', chinese: '和牛漢堡排・三星蔥油餅', dessert: 'ASIA-Red Bean Tiramisu' },
            { code: 'MHT1', name: 'Online Exclusive-HUTONG Wagyu Steak', chinese: '胡同味噌日本和牛牛排', dessert: 'HT-Dessert' },
        ],
        appetizers: [
            { code: 'SCK1', name: 'Sous Vide Chicken Citrus Salad', chinese: '舒肥雞胸柑橘沙拉' }, 
            { code: 'SWS1', name: 'Creamy Mushroom Soup', chinese: '奶油蕈菇濃湯' }, 
        ]
    },
    'TPE-KMJ': {
        meal_1: [
            { code: 'MDK1', name: 'INT-Roasted Honey Duck Breast', chinese: '爐烤蜂蜜鴨胸・蒜烤洋芋', dessert: 'ONE TRAY SERVICE' },
            { code: 'MFI1', name: 'INT-Pan Seared Halibut', chinese: '香煎比目魚・寬扁麵', dessert: 'ONE TRAY SERVICE' },
            { code: 'MCK1', name: 'ASIA-Miso Grilled Chicken Thigh', chinese: '雞腿味噌燒・釜飯', dessert: 'ONE TRAY SERVICE' },
        ],
    },
    'KMJ-TPE': {
        meal_1: [
            { 
                code: 'MBF1', 
                name: 'INT-Russian Beef Stroganoff', 
                chinese: '俄式酸奶燉牛肉・義式寬麵', 
                dessert: 'ONE TRAY SERVICE' 
            },
            { 
                code: 'MCK1', 
                name: 'INT-Roasted Chicken Thigh', 
                chinese: '爐烤雞腿・番薯泥', 
                dessert: 'ONE TRAY SERVICE' 
            },
            { 
                code: 'MSP1', 
                name: 'ASIA-Tianjin Style Omurice', 
                chinese: '天津鮮蝦蛋包飯', 
                dessert: 'ONE TRAY SERVICE' 
            },
        ],
        // KMJ 航線通常不需要選前菜(隨餐附)，所以不需要 appetizers 陣列
    },
    'OKA-TPE': {
        meal_1: [
            { code: 'MBF1', name: 'INT-Russian Beef Stroganoff', chinese: '俄式酸奶燉牛肉・義式寬麵', dessert: 'ONE TRAY SERVICE' },
            { code: 'MCK1', name: 'INT-Roasted Chicken Thigh', chinese: '爐烤雞腿・番薯泥', dessert: 'ONE TRAY SERVICE' },
            { code: 'MSP1', name: 'ASIA-Tianjin Style Omurice', chinese: '天津鮮蝦蛋包飯', dessert: 'ONE TRAY SERVICE' },
        ],
        // OKA 特殊規定: 不提供熱湯
    },
    // --- L: Long (Appetizer Choice + 2nd Meal) ---
    'TPE-LAX': {
        meal_1: [
            { 
                code: 'MYJ1', 
                name: 'Star Gourmet-Tea Smoked Iberico Pork', 
                chinese: '元紀茶燻伊比利豬梅肉・澎湖米苔目', 
                dessert: 'Guava Sago' 
            },
            { 
                code: 'MCK1', 
                name: 'INT-Lemon Butter Roasted Herbs Chicken', 
                chinese: '檸檬奶油烤香草雞腿・南瓜麵疙瘩', 
                dessert: 'Dessert' 
            },
            { 
                code: 'MFI1', 
                name: 'INT-Roasted Salmon Fillet', 
                chinese: '爐烤鮭魚排・青醬藜麥米型麵', 
                dessert: 'Dessert' 
            },
            { 
                code: 'MBV1', 
                name: 'Online Exclusive-Pan Seared Veal Steak', 
                chinese: '嫩煎紐西蘭犢牛肋排', 
                dessert: 'Dessert' 
            },
            { 
                code: 'MPO1', 
                name: 'Co-branding: Lions Mane Mushroom', 
                chinese: '鈺善閣麻香猴菇・芋香紅藜御米', 
                dessert: 'Dessert' 
            },
        ],
        
        meal_2: [
            { code: 'MCG2', name: 'Taiwanese Congee', chinese: '清粥小菜', dessert: 'Fruit' },
            { code: 'MEG2', name: 'Smoked Salmon Egg Roll', chinese: '燻鮭魚乳酪櫛瓜蛋捲', dessert: 'Fruit' },
            { code: 'MCK2', name: 'Truffle Chicken Thigh', chinese: '嫩煎松露雞腿排', dessert: 'Fruit' },
        ],
        'MYJ1': {
            appetizer: { code: 'SYJ1', name: 'Calamari Salad', chinese: '醋溜軟絲鮮蔬' },
            soup:      { code: 'SYJ2', name: 'Pu-erh Chicken Soup', chinese: '普洱雞湯' }
        },
        // 規則 B: 其他主餐 (Standard) 通用搭配
        'STANDARD': {
            appetizer: { code: 'SPO1', name: 'Yam & Fruit Salad', chinese: '花果山藥沙拉' },
            soup:      { code: 'SWS2', name: 'Onion Soup', chinese: '洋蔥濃湯' }
        }
    },

    'LAX-TPE': {
        meal_1: [
            { 
                code: 'MBF1', 
                name: 'INT-Braised Beef Cheek', 
                chinese: '紅酒燉牛頰・辣根奶油洋芋泥', 
                dessert: 'Dessert' 
            },
            { 
                code: 'MCK1', 
                name: 'INT-Roasted Rosemary Chicken', 
                chinese: '迷迭香烤雞腿排・檸檬蒜香奶油醬', 
                dessert: 'Dessert' 
            },
            { 
                code: 'MPK1', 
                name: 'INT-Braised Pork Shoulder Thai Curry', 
                chinese: '泰紅咖哩燉豬肩・香米飯', 
                dessert: 'Dessert' 
            },
            { 
                code: 'MVG1', 
                name: 'Plant-based: Mushroom Risotto', 
                chinese: '炙烤蘆筍野菇燉飯', 
                dessert: 'Dessert' 
            },
            { 
                code: 'MLB1', 
                name: 'Online Exclusive-Brown Butter Lobster', 
                chinese: '焦化奶油龍蝦・南瓜義大利餃', 
                dessert: 'Dessert' 
            },
        ],
        // [L航線前菜邏輯] 先上鮮蝦莎莎醬杏仁脆飯餅 (沙拉)，再上馬鈴薯甜菜根濃湯 (湯)
        'LAX-TPE': {
        'STANDARD': {
            appetizer: { code: 'SASS', name: 'Almond Shrimp Salsa', chinese: '鮮蝦莎莎醬杏仁脆飯餅' },
            soup:      { code: 'SPBS', name: 'Beetroot Soup', chinese: '馬鈴薯甜菜根奶油濃湯' }
        }
    },
        meal_2: [
            { code: 'MCG2', name: 'Taiwanese Congee', chinese: '清粥小菜', dessert: 'Fruit' },
            { code: 'MEG2', name: 'Scrambled Egg Crepes', chinese: '韭蔥嫩蛋可麗餅', dessert: 'Fruit' },
            { code: 'MPK2', name: 'Bacon Avocado Toast', chinese: '炙烤培根酪梨吐司', dessert: 'Fruit' },
        ]
    },

    // 3. PHX -> TPE (Exclusive Menu)
    'PHX-TPE': {
        meal_1: [
            { 
                code: 'MBS1', 
                name: 'INT-Grilled Prime Tenderloin', 
                chinese: '炙烤美國 Prime 菲力牛排', 
                dessert: 'Dessert' 
            },
            { 
                code: 'MSP1', 
                name: 'INT-Grilled Shrimp Squid Ink Pasta', 
                chinese: '爐烤鮮蝦・墨魚義大利麵', 
                dessert: 'Dessert' 
            },
            { 
                code: 'MFI1', 
                name: 'INT-Saikyo Miso Black Cod', 
                chinese: '黑鱈西京燒・野菇炊飯', 
                dessert: 'Dessert' 
            },
            { 
                code: 'MVG1', 
                name: 'Plant-based: Roasted Portobella', 
                chinese: '爐烤波特貝勒菇・孢子甘藍', 
                dessert: 'Dessert' 
            },
            { 
                code: 'MLB1', 
                name: 'Online Exclusive-Lobster Gratin', 
                chinese: '焗烤龍蝦・馬鈴薯千層', 
                dessert: 'Dessert' 
            },
        ],
        appetizers: [
            { code: 'SASS', name: 'Almond Shrimp Salsa', chinese: '鮮蝦莎莎醬杏仁脆飯餅' }, 
            { code: 'SPBS', name: 'Potato & Beetroot Soup', chinese: '馬鈴薯甜菜根奶油濃湯' }, 
        ],
        meal_2: [
            { code: 'MCG2', name: 'Spinach Whitebait Congee', chinese: '菠菜魚片粥', dessert: 'Fruit' },
            { code: 'MEG2', name: 'French Egg Crepe', chinese: '法式雞蛋可麗餅', dessert: 'Fruit' },
            { code: 'MPE2', name: 'Lasagna Bolognese', chinese: '波隆那肉醬千層麵', dessert: 'Fruit' },
        ]
    },
};

const AIRCRAFT_CONFIGS = {
    'A321neo': { 
        name: 'Airbus A321neo',
        gridCols: 'grid-template-columns: repeat(2, 1fr) 80px repeat(2, 1fr);', // 2+走道+2 (共5欄)
        rows: ['2', '3'],
        seatLetters: ['A', 'C', 'H', 'K'],
        // [新增] 指定座位所在的欄位
        colMap: { 'A': 1, 'C': 2, 'H': 4, 'K': 5 }
    },
    'A330-900neo': {
        name: 'Airbus A330-900neo',
        gridCols: 'grid-template-columns: 1fr 50px 1fr 1fr 50px 1fr;', // 1+走道+2+走道+1 (共6欄)
        rows: ['2','3','4','5','6','7','8'],
        seatLetters: ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'K'],
        // [新增] 即使 A330 座位交錯，我們將它們對應到視覺上的同一欄
        colMap: { 
            'A': 1, 'C': 1,  // 左窗
            'D': 3, 'E': 3,  // 中左
            'F': 4, 'G': 4,  // 中右
            'H': 6, 'K': 6   // 右窗
        }
    },
    'A350-900': { 
        name: 'Airbus A350-900',
        gridCols: 'grid-template-columns: 1fr 50px 1fr 1fr 50px 1fr;', // 1+走道+2+走道+1 (共6欄)
        rows: ['2','3','4','5','6','7', '8'],
        seatLetters: ['A', 'D', 'G', 'K'],
        // [新增] 指定座位所在的欄位
        colMap: { 'A': 1, 'D': 3, 'G': 4, 'K': 6 }
    },
    'A350-1000': {
        name: 'Airbus A350-1000',
        gridCols: 'grid-template-columns: 1fr 50px 1fr 1fr 50px 1fr;',
        rows: ['2','3','4','5','6','7','8', '9', '10', '11'],
        seatLetters: ['A', 'D', 'G', 'K'],
        // [新增] 指定座位所在的欄位
        colMap: { 'A': 1, 'D': 3, 'G': 4, 'K': 6 }
    }
};

const ROUTES = [
    // --- SS (Super Short) 超短程 ---
    // 包含 HKG, MFM, FUK (如您所述，這些是 SS)
    // 這些航線通常是 One Tray Service，沒有前菜選擇
    { id: 'TPE-HKG', name: 'Taipei - HKG/MFM/CRK/MNL (SS)', type: 'SS' },
    //{ id: 'TPE-OKA', name: 'Taipei - OKA', type: 'SS' },
    { id: 'TPE-SHI', name: 'Taipei - SHI (USS)', type: 'SS' },
    { id: 'TPE-KMJ', name: 'Taipei - OKA/FUK/KMJ (SS)', type: 'SS' },
    { id: 'HKG-TPE', name: 'Hong Kong - Taipei (SS)', type: 'SS' },
    { id: 'KMJ-TPE', name: 'KMJ/OKA - Taipei (SS)', type: 'SS' },
    { id: 'SHI-TPE', name: 'SHI-TPE (USS)', type: 'SS' },
    { id: 'MFM-TPE', name: 'MFM - Taipei (SS)', type: 'SS' },
    // --- S (Short) 短程 ---
    // 包含 NRT, KIX, SDJ (共用 TPE-NRT 菜單)
    // 這些航線有完整的熱餐，但通常沒有 Soup/Salad 二選一
    { id: 'TPE-NRT', name: 'Taipei - NRT/KIX/SDJ/NGO/UKB (S)', type: 'S' },
    { id: 'TPE-BKK', name: 'Taipei - DAD/HAN/SGN/CEB/PQC/BKK/CNX/GUM', type: 'S' },
    // --- M (Medium) 中程 ---
    // 包含 SIN, KUL, CGK
    // [新功能] 這些航線會有 Soup/Salad 的選擇
    { id: 'TPE-SIN', name: 'Taipei - SIN/KUL/CGK (M)', type: 'M' },
    { id: 'TPE-CTS', name: 'Taipei - CTS/HKD (M)', type: 'M' },
    // --- L (Long) 長程 ---
    // [新功能] 這些航線有 Soup/Salad + 第二餐
    { id: 'TPE-LAX', name: 'Taipei - LAX/SFO/SEA/ONT/PHX (L)', type: 'L' },
    { id: 'LAX-TPE', name: 'LAX/SFO/SEA/ONT (L) - TPE', type: 'L' },
    { id: 'PHX-TPE', name: 'PHX (L) - TPE', type: 'L' },


    
];



// [MODIFIED] Replaced with user's new BEVERAGE_CATEGORIES
const BEVERAGE_CATEGORIES = {
    'WATER': [
        { full: 'Water', short: 'Water', type: 'ice' },
        { full: 'Sparkling Water', short: 'Spark.', type: 'ice' },
    ],
    'Specialty Cocktails': [
        { full: 'Sci-Fi Cosmos 2.0', short: 'Sci-Fi' },
        { full: 'Star Mojito', short: 'Star Mojito' },
        { full: 'Citrus Mist', short: 'Citrus Mist' },
        { full: 'Bi Luo Chun Galaxy', short: 'BLC Galaxy' },
    ],
     'Cocktails': [
        { full: 'Screwdriver', short: 'Screwdriver' },
        { full: 'Gin Tonic', short: 'Gin Tonic' },
        { full: 'Martini', short: 'Martini' },
        { full: 'Whiskey Coke', short: 'Whiskey Coke' },
    ],
    'Mocktails (Non-alcoholic)': [
        { full: 'Apple Sparkling', short: 'AJ Sparkling', type:'Juice' },
        { full: 'Peach Sparkling', short: 'PJ Sparkling', type:'Juice' },
        { full: 'Orange Fizz', short: 'Orange Fizz', type:'Juice' },
        { full: 'Green Tea Special', short: 'GT Special', type:'Juice' },
        { full: 'Virgin Mary', short: 'Virgin Mary', type:'Juice' },
    ],
    'Champagne & White Wine': [
        { full: 'Laurent-Perrier La Cuvée', short: 'Champagane.' },
        { full: 'Masi Masianco Pinot Grigio', short: 'Italy W.W.' },
        { full: 'Albert Bichot Chablis 1er Cru', short: 'French W.W' },
    ],
    'Red Wine & Port': [
        { full: 'CHATEAU CROIZET-BAGES 2018(French R.W.)', short: 'French R.Wine' },
        { full: 'Penfolds Koonunga Hill Shiraz Cabernet (Australian R.W.)', short: 'AUS R.Wine' },
        { full: 'Dow\'s Fine Tawny Port', short: 'Port' },
    ],
    'Whisky': [
        { full: 'Talisker Storm Single Malt', short: 'Talisker', type: 'whisky' },
        { full: 'Kavalan Classic Single Malt', short: 'Kavalan', type: 'whisky' },
        { full: 'Jack Daniel\'s No.7', short: 'Jack D.', type: 'whisky' },
        { full: 'Mars Maltage "COSMO" Blend Malt Japanese Whisky', short: 'Mars Maltage "COSMO"', type: 'whisky' },
    ],
    'Spirits & Liqueurs': [
        { full: 'Umenishiki Sake ', short: 'Sake' },
        { full: 'Hakutsuru Awayuki Sparkling Sake', short: 'Sparkling Sake'},
        { full: 'Rémy Martin X.O.', short: 'XO' , type: 'whisky'},
        { full: 'Baileys Irish Cream', short: 'Baileys' , type: 'whisky'},
        { full: 'Choya Top Grade Umeshu', short: 'Umeshu', type:'ice' , type: 'whisky'},
        { full: 'Bacardi Rum', short: 'Rum' , type: 'whisky'},
        { full: 'Grey Goose Vodka', short: 'Vodka', type: 'whisky' },
        { full: 'Hendrick\'s Gin', short: 'Gin' , type: 'whisky'},
    ],
    'Beer': [
        { full: 'Mikkeller IPA', short: 'Mikkeller', type: 'juice' },
        { full: 'Taiwan Gold Medal Beer', short: 'TW Beer', type: 'juice' },
        { full: 'Heineken Lager', short: 'Heineken', type: 'juice' },
        { full: 'Asahi Super Dry', short: 'Asahi', type: 'juice' },
    ],
    'Soda & Soft Dr.': [
        { full: 'Coke-Cola', short: 'Coke', type: 'soda_ice' },
        { full: 'Coke-Cola Zero', short: 'Coke Zero', type: 'soda_ice' }, 
        { full: 'Sprite', short: 'Sprite', type: 'soda_ice' },
        { full: 'Ginger Ale', short: 'Ginger Ale', type: 'soda_ice' },
        { full: 'Soda Water', short: 'Soda', type: 'soda_ice' },
        { full: 'Tonic Water', short: 'Tonic', type: 'soda_ice' },
        { full: 'Iced Green Tea', short: 'GT.', type: 'soda_ice' }, 
        { full: 'Calpis Water', short: 'Calpis', type: 'soda_ice' },
    ],
    'Juices & Milks': [
        { full: 'Apple Juice', short: 'AJ', type: 'juice' },
        { full: 'Orange Juice', short: 'OJ', type: 'juice' },
        { full: 'Peach Juice', short: 'PJ', type: 'juice' },
        { full: 'Tomato Juice', short: 'TJ', type: 'juice' },
        { full: 'Carrot Juice (VDS)', short: 'VDS', type: 'juice' },
        { full: 'Cold Brew Juice', short: 'Cold Brew Juice', type: 'Juice' },
        { full: 'Whole Milk', short: 'Milk', type: 'temp' },
        { full: 'Low Fat Milk', short: 'LF-Milk', type: 'temp' }, 
        { full: 'Oat Milk', short: 'Oat Milk', type: 'temp' },
    ],
    'Coffee, Teas & Others': [
        { full: 'Espresso', short: 'Espresso', type: 'temp'},
        { full: 'Black Coffee', short: 'Black Coffee', type: 'temp' }, 
        { full: 'Latte', short: 'Latte', type: 'temp' }, 
        { full: 'Cappuccino', short: 'Cappuccino', type: 'temp' },
        { full: 'Decaffeinated Coffee', short: 'Decaff. Coffee', },
        { full: 'Baileys Coffee Latte', short: 'Baileys Latte', type: 'temp' },
        { full: 'Bi Luo Chun Tea', short: 'Bi Liu Chun', type: 'temp' },
        { full: 'Dong Ding Oolong Tea', short: 'Oolong', type: 'temp' },
        { full: 'Sun Moon Assam Black Tea', short: 'Sun Moon Assam', type: 'temp' },
        { full: 'English Breakfast Tea', short: 'EG Breakfast', type: 'temp' },
        { full: 'Earl Grey Tea', short: 'Earl Grey', type: 'temp' },
        { full: 'Sleepy Tea', short: 'Sleepy Tea', type: 'temp' },
        { full: 'Apple & Elderflower Tea', short: 'Apple Eldr', type: 'temp' },
        { full: 'Hot Chocolate', short: 'Hot Coco' },
    ],
    'STARLUX Limited': [
        { full: 'Boba Tea Latte', short: 'Boba', type: 'soda_ice' },
        { full: 'Hojicha Latte', short: 'Hojicha', type: 'soda_ice' }, 
        { full: 'Hot Red Bean Water', short: 'Red Bean',},
    ],
};

// [新增] Galley View 按鈕事件
    const galleyBtn = document.getElementById('galley-view-btn');
    const closeGalleyBtn = document.getElementById('close-galley-btn');
    
    if(galleyBtn) {
        galleyBtn.addEventListener('click', renderGalleyDashboard);
    }
    if(closeGalleyBtn) {
        closeGalleyBtn.addEventListener('click', () => {
            document.getElementById('galley-modal').classList.add('hidden');
            document.getElementById('galley-modal').classList.remove('flex');
        });
    }

const ALL_BEVERAGES = Object.values(BEVERAGE_CATEGORIES).flat();

// [NEW] 長程線主餐與前菜/湯品的綁定邏輯
// 請放在 CONSTANT 定義區 (例如 ROUTES 或 MENUS 附近)
const LONG_HAUL_RULES = {
    'TPE-LAX': {
        // 規則 A: 元紀 (MYJ1) 專屬搭配
        'MYJ1': {
            appetizer: { code: 'SYJ1', name: 'Calamari Salad', chinese: '醋溜軟絲鮮蔬' },
            soup:      { code: 'SYJ2', name: 'Pu-erh Chicken Soup', chinese: '普洱雞湯' }
        },
        // 規則 B: 其他主餐 (Standard) 通用搭配
        'STANDARD': {
            appetizer: { code: 'SPO1', name: 'Yam & Fruit Salad', chinese: '花果山藥沙拉' },
            soup:      { code: 'SWS2', name: 'Onion Soup', chinese: '洋蔥濃湯' }
        }
    },
    // 外站回程 (全部一樣)
    'LAX-TPE': {
        'STANDARD': {
            appetizer: { code: 'SASS', name: 'Almond Shrimp Salsa', chinese: '鮮蝦莎莎醬杏仁脆飯餅' },
            soup:      { code: 'SPBS', name: 'Beetroot Soup', chinese: '馬鈴薯甜菜根奶油濃湯' }
        }
    },
    // PHX 航線比照辦理
    'PHX-TPE': {
        'STANDARD': {
            appetizer: { code: 'SASS', name: 'Almond Shrimp Salsa', chinese: '鮮蝦莎莎醬杏仁脆飯餅' },
            soup:      { code: 'SPBS', name: 'Beetroot Soup', chinese: '馬鈴薯甜菜根奶油濃湯' }
        }
    }
};

// [MODIFIED] Added beverages_2
const createInitialOrder = (id) => ({
    id: id, lastName: '', title: 'Mr.', status: 'PENDING', 
    isPreSelect: false, isAppetizerPreSelect: false, isMeal2PreSelect: false,

    appetizerChoice: '', 
    appetizerServed: false, appetizerSkipped: false, appetizerCancelled: false, // [新增]
    
    soupServed: false, soupSkipped: false, soupCancelled: false, // [新增]

    // 1st Meal
    mealCode: '', mealName: 'N/A', isSPML: false,
    mealServed: false, mealSkipped: false, mealCancelled: false, // [新增]
    dessertServed: false, dessertSkipped: false, dessertCancelled: false, // [新增]
    
    // 2nd Meal
    mealCode_2: '', mealName_2: 'N/A', isSPML_2: false,
    mealServed_2: false, mealSkipped_2: false, mealCancelled_2: false, // [新增]
    
    yogurtServed: false, yogurtSkipped: false, yogurtCancelled: false, // [新增]
    fruitServed: false, fruitSkipped: false, fruitCancelled: false, // [新增]
    
    // 飲料結構不動，我們會在飲料物件內部加入 cancelled 屬性
    beverages: [],
    beverages_2: [], 
    
    delayUntil: 0, delayDuration: 0,
    serviceClosed: false,
    remark: '',
    tags: [],
    notificationShown: false,
    
    // [新增] 嬰兒與過敏欄位 (保留您之前的需求)
    hasInfant: false,
    allergyNote: '',
});

let orders = [];

let mealInventory_1 = {}, mealInventory_2 = {}, flightNumber = '', currentSeatId = null, currentMode = MODES.ORDER_MODE;
let isEditingInventory = false;
let countdownInterval = null, serviceTarget = null, currentServiceItemIndex = null;
let activeMeals_1 = [], activeMeals_2 = [], activeAircraftConfig = {};
let appetizerInventory = {}; // 新增前菜庫存變數
let currentRoute = '', audioCtx;
let currentAircraftType = '';
let currentServicePhase = 'MEAL_1'; // 'MEAL_1' or 'MEAL_2'
let currentAisleView = 'ALL'; // [NEW] State for aisle view: 'ALL', 'L_SIDE', 'R_SIDE'
let beverageSummaryDoneState = {};


// --- DOM 元素快取 ---
const appElements = {
    serviceModeActions: document.getElementById('service-mode-actions'),
    btnAddBeverage: document.getElementById('btn-add-beverage'),
    seatLayoutContainer: document.getElementById('seat-layout-container'), 
    seatLayout: document.getElementById('seat-layout'), 
    summarySection: document.getElementById('summary-section'),
    orderModal: document.getElementById('order-modal'), closeModalBtn: document.getElementById('close-modal-btn'),
    submitOrderBtn: document.getElementById('submit-order-btn'), modalSeatIdDisplay: document.getElementById('modal-seat-id'),
    mealOptionsContainer: document.getElementById('meal-options-container'),
    beverageOptionsContainer: document.getElementById('beverage-options-container'),
    summaryList: document.getElementById('summary-list'), emptySummaryMessage: document.getElementById('empty-summary-message'),
    inventoryModal: document.getElementById('inventory-modal'), inventoryInputsContainer: document.getElementById('inventory-inputs-container'),
    saveInventoryBtn: document.getElementById('save-inventory-btn'), 
    editInventoryBtn: document.getElementById('edit-inventory-btn'),
    inventoryModalTitle: document.getElementById('inventory-modal-title'), 
    flightNumberInput: document.getElementById('flight-number-input'),
    aircraftSelect: document.getElementById('aircraft-select'),
    routeSelect: document.getElementById('route-select'),
    aircraftDisplay: document.getElementById('aircraft-display'),
    aircraftTypeDisplay: document.getElementById('aircraft-type-display'),
    displayFlightNo: document.getElementById('display-flight-no'), displayMode: document.getElementById('display-mode'),
    modeToggleBtn: document.getElementById('mode-toggle-btn'), controlPanel: document.getElementById('control-panel'),
    lastNameInput: document.getElementById('last-name-input'), titleSelect: document.getElementById('title-select'),
    remarkInput: document.getElementById('remark-input'),
    remarkTagsContainer: document.getElementById('remark-tags-container'),
    serviceStatusRadios: document.querySelectorAll('input[name="service-status"]'), mealBeverageSelection: document.getElementById('meal-beverage-selection'),
    delayTimeInputContainer: document.getElementById('delay-time-input-container'), delayTimeSelect: document.getElementById('delay-time-select'),
    currentTimeDisplay: document.getElementById('current-time-display'), serviceActionModal: document.getElementById('service-action-modal'),
    messageDisplay: document.getElementById('message-display'), endFlightBtn: document.getElementById('end-flight-btn'),
    saveFlightBtn: document.getElementById('save-flight-btn'),
    loadFlightInput: document.getElementById('load-flight-input'),
    passengerInfoSection: document.getElementById('passenger-info-section'), serviceStatusSection: document.getElementById('service-status-section'),
    mealOptionsWrapper: document.getElementById('meal-options-wrapper'), 
    delayActionModal: document.getElementById('delay-action-modal'),
    delayModalSeatId: document.getElementById('delay-modal-seat-id'),
    dndActionModal: document.getElementById('dnd-action-modal'),
    dndModalSeatId: document.getElementById('dnd-modal-seat-id'),
    dessertDisplay: document.getElementById('dessert-display'), dessertType: document.getElementById('dessert-type'),
    closeServiceContainer: document.getElementById('close-service-container'),
    closeServiceBtn: document.getElementById('close-service-btn'),
    spmlSection: document.getElementById('spml-section'),
    spmlCheckbox: document.getElementById('spml-checkbox'),
    spmlInputContainer: document.getElementById('spml-input-container'),
    spmlSelect: document.getElementById('spml-select'),
    spmlInputOther: document.getElementById('spml-input-other'),
    swapSeatsModal: document.getElementById('swap-seats-modal'),
    openSwapModalBtn: document.getElementById('open-swap-modal-btn'),
    cancelSwapBtn: document.getElementById('cancel-swap-btn'),
    confirmSwapBtn: document.getElementById('confirm-swap-btn'),
    swapSeat1: document.getElementById('swap-seat-1'),
    swapSeat2: document.getElementById('swap-seat-2'),
    dueServiceAlertModal: document.getElementById('due-service-alert-modal'),
    dueServiceAlertMessage: document.getElementById('due-service-alert-message'),
    dismissDueServiceAlertBtn: document.getElementById('dismiss-due-service-alert-btn'),
    phaseToggleBtn: document.getElementById('phase-toggle-btn'),
    orderPhaseTabs: document.getElementById('order-phase-tabs'),
    orderTab1: document.getElementById('order-tab-1'),
    orderTab2: document.getElementById('order-tab-2'),
    orderTabContent1: document.getElementById('order-tab-content-1'),
    orderTabContent2: document.getElementById('order-tab-content-2'),
    spmlSection2: document.getElementById('spml-section-2'),
    spmlCheckbox2: document.getElementById('spml-checkbox-2'),
    spmlInputContainer2: document.getElementById('spml-input-container-2'),
    spmlSelect2: document.getElementById('spml-select-2'),
    spmlInputOther2: document.getElementById('spml-input-other-2'),
    mealOptionsWrapper2: document.getElementById('meal-options-wrapper-2'),
    mealOptionsContainer2: document.getElementById('meal-options-container-2'),
    beverageOptionsWrapper: document.getElementById('beverage-options-wrapper'),
    beverageOptionsWrapper2: document.getElementById('beverage-options-wrapper-2'),
    beverageOptionsContainer2: document.getElementById('beverage-options-container-2'),
    // [NEW] Aisle view buttons
    aisleViewControls: document.getElementById('aisle-view-controls'),
    viewLBtn: document.getElementById('view-l-btn'),
    viewAllBtn: document.getElementById('view-all-btn'),
    viewRBtn: document.getElementById('view-r-btn'),
    sideFilter: document.getElementById('side-filter'), // 新增這一行
};

// --- 輔助函數 ---
const showMessage = (text, isError = false) => {
    appElements.messageDisplay.textContent = text;
    appElements.messageDisplay.classList.remove('hidden', isError ? 'bg-green-600' : 'bg-red-600');
    appElements.messageDisplay.classList.add(isError ? 'bg-red-600' : 'bg-green-600');
    setTimeout(() => appElements.messageDisplay.classList.add('hidden'), 3000);
};
const getOrder = seatId => orders.find(order => order.id === seatId);
const getMeal1 = code => activeMeals_1.find(m => m.code === code);
const getMeal2 = code => activeMeals_2.find(m => m.code === code);
const getBeverageShort = full => (ALL_BEVERAGES.find(b => b.full === full) || {short: full}).short;

function toggleBeverageDone(category, drinkName) {
    // 產生唯一的 key (類別_飲料名)
    const key = `${category}_${drinkName}`;
    
    // 切換狀態 (True <-> False)
    if (beverageSummaryDoneState[key]) {
        delete beverageSummaryDoneState[key]; // 如果已完成，則取消
    } else {
        beverageSummaryDoneState[key] = true; // 標記為完成
    }
    
    // 重新渲染 Summary 區域以更新畫面
    renderOrderSummaryAggregate();
}
window.toggleBeverageDone = toggleBeverageDone;

function toggleGalleyBev(key) {
    // 切換勾選狀態
    if (galleyBevDoneState[key]) {
        delete galleyBevDoneState[key];
    } else {
        galleyBevDoneState[key] = true;
    }

    // 步驟 A: 記錄當前捲軸位置
    const scrollContainer = document.getElementById('galley-scroll-container');
    const savedScrollTop = scrollContainer ? scrollContainer.scrollTop : 0;

    // 步驟 B: 重新渲染畫面
    renderGalleyDashboard();

    // 步驟 C: 還原捲軸位置 (使用 setTimeout 確保 DOM 渲染完成後執行)
    setTimeout(() => {
        const newContainer = document.getElementById('galley-scroll-container');
        if (newContainer) {
            newContainer.scrollTop = savedScrollTop;
        }
    }, 0);
}

// --- [NEW] 快速送餐函式 (雙擊專用) ---
function handleQuickServe(seatId, itemType, index = null) {
    const order = getOrder(seatId);
    if (!order) return;

    // 1. 執行 Served 邏輯 (這段邏輯複製自 handleServiceAction)
    if (itemType === 'meal_1') { 
        order.mealServed = true; order.mealSkipped = false; order.mealCancelled = false;
        // One Tray 連動邏輯
        const meal = getMeal1(order.mealCode);
        if ((meal && meal.dessert === 'ONE TRAY SERVICE') || (order.isSPML && ['TPE-HKG', 'TPE-SHI', 'TPE-OKA'].includes(currentRoute))) {
            order.dessertServed = true; order.dessertSkipped = false; order.dessertCancelled = false;
            order.soupServed = true; order.soupSkipped = false; order.soupCancelled = false;
        }
    } 
    else if (itemType === 'appetizer') { order.appetizerServed = true; order.appetizerSkipped = false; order.appetizerCancelled = false; } 
    else if (itemType === 'soup') { order.soupServed = true; order.soupSkipped = false; order.soupCancelled = false; }
    else if (itemType === 'meal_2') { order.mealServed_2 = true; order.mealSkipped_2 = false; order.mealCancelled_2 = false; } 
    else if (itemType === 'yogurt') { order.yogurtServed = true; order.yogurtSkipped = false; order.yogurtCancelled = false; }
    else if (itemType === 'fruit') { order.fruitServed = true; order.fruitSkipped = false; order.fruitCancelled = false; }
    else if (itemType === 'dessert') { order.dessertServed = true; order.dessertSkipped = false; order.dessertCancelled = false; }
    
    // 飲料處理
    else if (itemType === 'drink_1' && index !== null) { 
        if(order.beverages[index]) {
            order.beverages[index].served = true; 
            order.beverages[index].skipped = false;
            order.beverages[index].cancelled = false;
        }
    } 
    else if (itemType === 'drink_2' && index !== null) { 
        if(order.beverages_2[index]) {
            order.beverages_2[index].served = true; 
            order.beverages_2[index].skipped = false;
            order.beverages_2[index].cancelled = false;
        }
    }

    // 2. 強制關閉可能因為第一下點擊而打開的選單
    const actionModal = document.getElementById('service-action-modal');
    if (actionModal) actionModal.classList.add('hidden');

    // 3. 存檔並重繪
    saveSystemState();
    renderSeatLayout();
    
    // (選用) 顯示一個小提示
    // showMessage(`${seatId} ${itemType} Served!`, false);
}

// 公開給全域 (防止 App 版找不到)
window.handleQuickServe = handleQuickServe;

// [UPGRADED] 優化版音效：機上廣播提示音 (Ding-Dong)
function playNotificationSound() {
    // 1. 初始化 AudioContext (瀏覽器兼容寫法)
    if (!audioCtx) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        } catch (e) {
            console.error('Web Audio API not supported');
            return;
        }
    }

    // 如果 Context 被暫停 (Chrome 常見行為)，嘗試恢復
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // --- 輔助函式：播放單一個鐘聲 ---
    // freq: 頻率, startTime: 開始時間, duration: 持續長度
    const playChimeTone = (freq, startTime, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine'; // 使用正弦波，聲音最圓潤
        osc.frequency.setValueAtTime(freq, startTime);

        // 連接節點: Oscillator -> Gain -> Speaker
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        // --- 設定音量包絡線 (ADSR) ---
        // 1. 初始靜音
        gain.gain.setValueAtTime(0, startTime);
        
        // 2. 快速淡入 (Attack): 0.05秒內升到最大音量 (避免爆音，增加柔和感)
        gain.gain.linearRampToValueAtTime(0.4, startTime + 0.05);
        
        // 3. 緩慢淡出 (Decay/Release): 模擬金屬餘韻，指數型衰減
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        // 啟動與停止
        osc.start(startTime);
        osc.stop(startTime + duration);
    };

    // --- 播放雙音 (Ding-Dong) ---
    // 第一聲 (Ding): E5 (約 659.25 Hz)
    playChimeTone(659.25, now, 1.5);

    // 第二聲 (Dong): C5 (約 523.25 Hz)，延遲 0.6 秒播放
    // 這是一個 "大三度" 下行音程，非常經典的航空提示音
    playChimeTone(523.25, now + 0.6, 2.0);
}

// [NEW] 顯示服務到期提醒視窗   
function showDueServiceAlert(seatId) {
    // 讓手機震動一下 (如果有支援)
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    
    appElements.dueServiceAlertMessage.textContent = `Delay timer for Seat ${seatId} has expired!\nPlease start service.`;
    appElements.dueServiceAlertModal.classList.replace('hidden', 'flex');
    
    // 重新渲染圖示 (因為 Modal 剛顯示出來)
    safeRenderIcons();
}

// [修正版] toggleServiceMode: 
// 1. 進入 Service Mode 時：只隱藏 Edit 和 Save (設定類)。
// 2. 保留 Sync 和 Swap (功能類) 讓它們繼續在選單中顯示。
function toggleServiceMode() {
    const isLongHaul = activeMeals_2.length > 0;

    if (currentMode === MODES.ORDER_MODE) {
        // --- 進入 SERVICE MODE ---
        currentMode = MODES.SERVICE_MODE;
        currentServicePhase = 'MEAL_1'; 
        
        // 1. UI 更新 (加回 icon)
        appElements.modeToggleBtn.innerHTML = '<i data-lucide="refresh-cw" class="w-4 h-4"></i> Switch to ORDER MODE'; 
        appElements.displayMode.textContent = 'SERVICE MODE (Meal 1)';
        appElements.displayMode.classList.replace('text-green-400', 'text-red-400');
        
        // 2. [修正重點] 只隱藏「純設定類」按鈕
        // ❌ 移除隱藏 Swap 和 Sync 的指令，讓它們在選單中保持可見
        if(appElements.editInventoryBtn) appElements.editInventoryBtn.classList.add('hidden');
        if(appElements.saveFlightBtn) appElements.saveFlightBtn.classList.add('hidden');
        
        // 3. 智慧顯示 End Flight (長程線隱藏，短程線顯示)
        if (isLongHaul) {
            appElements.endFlightBtn.classList.add('hidden');
            appElements.phaseToggleBtn.classList.remove('hidden');
            appElements.phaseToggleBtn.textContent = 'START MEAL 2';
        } else {
            appElements.endFlightBtn.classList.remove('hidden');
            appElements.phaseToggleBtn.classList.add('hidden');
        }

        // 4. 啟動計時器 (保持不變)
        const now = Date.now();
        orders.forEach(order => {
            if (order.status === 'DELAYED') {
                if (order.delayDuration === undefined || order.delayDuration === null) order.delayDuration = 30;
                if (parseInt(order.delayDuration) > 0) {
                    if (!order.delayUntil || order.delayUntil === 0) order.delayUntil = now + (order.delayDuration * 60000);
                } else {
                    order.delayUntil = 0;
                }
            }
        });
        if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){} }
        startCountdown(); 
        showMessage('Switched to SERVICE MODE (Meal 1)', false);
        
    } else {
        // --- 回到 ORDER MODE ---
        currentMode = MODES.ORDER_MODE;
        
        appElements.modeToggleBtn.innerHTML = '<i data-lucide="refresh-cw" class="w-4 h-4"></i> Switch to SERVICE MODE';
        appElements.displayMode.textContent = MODES.ORDER_MODE;
        appElements.displayMode.classList.replace('text-red-400', 'text-green-400');
        
        // 5. 顯示回所有按鈕
        if(appElements.editInventoryBtn) appElements.editInventoryBtn.classList.remove('hidden');
        if(appElements.saveFlightBtn) appElements.saveFlightBtn.classList.remove('hidden');
        
        // (這裡可以保留 remove hidden，確保 Swap/Sync 萬一被藏起來時能恢復)
        if(appElements.openSwapModalBtn) appElements.openSwapModalBtn.classList.remove('hidden');
        if(syncElements.btn) syncElements.btn.classList.remove('hidden');

        appElements.endFlightBtn.classList.add('hidden');
        appElements.phaseToggleBtn.classList.add('hidden');
        
        stopCountdown(); 
        showMessage('Switched to ORDER MODE', false);
    }
    
    // 重新渲染圖示以確保按鈕內的 icon 正常顯示
    if(typeof safeRenderIcons === 'function') safeRenderIcons();
    renderSeatLayout();
}

// 請補回這兩個函式
function startCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);
    
    // 立即執行一次渲染，避免要等 30 秒才看到變化
    renderSeatLayout();
    
    // 設定每 30 秒 (30000ms) 更新一次
    countdownInterval = setInterval(() => {
        renderSeatLayout();
    }, 30000); 
}

function stopCountdown() {
    if (countdownInterval) { 
        clearInterval(countdownInterval); 
        countdownInterval = null; 
    }
}

// [NEW] 顯示 Hold 餐點的詳細清單 (DND & Delay)
window.showHoldDetails = function() {
    // 1. 篩選出所有 Hold 的訂單
    const holdOrders = orders.filter(o => o.status === 'DND' || o.status === 'DELAYED');

    if (holdOrders.length === 0) {
        alert("No active HOLD items currently.");
        return;
    }

    // 2. 建立彈出視窗 HTML
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in";
    modal.onclick = (e) => { if(e.target === modal) modal.remove(); }; // 點擊背景關閉

    let contentHtml = `
        <div class="bg-[#1e1e1e] border border-[#d4b982]/30 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div class="bg-gradient-to-r from-[#24211f] to-[#1a1918] p-5 border-b border-white/10 flex justify-between items-center">
                <h3 class="text-xl font-bold text-[#d4b982] flex items-center gap-2">
                    <i data-lucide="pause-circle" class="w-6 h-6"></i> HOLD LIST
                </h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white transition"><i data-lucide="x" class="w-6 h-6"></i></button>
            </div>
            <div class="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
    `;

    // DND Group
    const dndList = holdOrders.filter(o => o.status === 'DND');
    if (dndList.length > 0) {
        contentHtml += `
            <div>
                <h4 class="text-red-400 font-bold text-sm uppercase tracking-wider mb-2 border-b border-red-900/50 pb-1">Do Not Disturb (DND)</h4>
                <div class="space-y-2">
                    ${dndList.map(o => `
                        <div class="flex justify-between items-center bg-red-900/10 border border-red-500/20 p-3 rounded-lg">
                            <div class="flex items-center gap-3">
                                <span class="text-xl font-black text-white font-mono bg-red-500/20 px-2 py-1 rounded">${o.id}</span>
                                <div>
                                    <div class="text-sm font-bold text-gray-200">${o.mealCode || 'No Meal'}</div>
                                    <div class="text-xs text-gray-500">${o.lastName || 'Passenger'}</div>
                                </div>
                            </div>
                            <span class="text-xs font-bold text-red-400">DND</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Delay Group
    const delayList = holdOrders.filter(o => o.status === 'DELAYED');
    if (delayList.length > 0) {
        contentHtml += `
            <div class="mt-4">
                <h4 class="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2 border-b border-blue-900/50 pb-1">Delayed Service</h4>
                <div class="space-y-2">
                    ${delayList.map(o => {
                        const timeLeft = o.delayUntil ? Math.ceil((o.delayUntil - Date.now())/60000) : 'Manual';
                        return `
                        <div class="flex justify-between items-center bg-blue-900/10 border border-blue-500/20 p-3 rounded-lg">
                            <div class="flex items-center gap-3">
                                <span class="text-xl font-black text-white font-mono bg-blue-500/20 px-2 py-1 rounded">${o.id}</span>
                                <div>
                                    <div class="text-sm font-bold text-gray-200">${o.mealCode || 'No Meal'}</div>
                                    <div class="text-xs text-gray-500">${o.lastName || 'Passenger'}</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="text-xs font-bold text-blue-400 block">DELAYED</span>
                                <span class="text-[10px] text-gray-400">${timeLeft > 0 ? timeLeft + 'm left' : 'Wait'}</span>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </div>
        `;
    }

    contentHtml += `</div></div>`; // Close containers
    modal.innerHTML = contentHtml;
    document.body.appendChild(modal);
    safeRenderIcons();
};



// ==========================================
// [全新功能] POS 風格數字鍵盤 (Numpad)
// ==========================================
let currentNumpadTargetId = null;

// 顯示數字鍵盤
window.openNumpad = function(inputId) {
    currentNumpadTargetId = inputId;
    const inputEl = document.getElementById(inputId);
    if(!inputEl) return;

    // 取得目前數值 (如果是 0 則清空，方便直接輸入)
    const currentVal = inputEl.value === '0' ? '' : inputEl.value;
    
    // 建立或取得 Numpad Modal
    let modal = document.getElementById('numpad-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'numpad-modal';
        modal.className = 'fixed inset-0 z-[200] flex items-end justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-200 opacity-0 pointer-events-none';
        modal.innerHTML = `
            <div class="bg-[#1a1918] w-full max-w-md mx-auto rounded-t-2xl shadow-2xl border-t border-[#d4b982]/30 p-6 transform translate-y-full transition-transform duration-300 ease-out" id="numpad-panel">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-[#d4b982] text-xs font-bold tracking-[0.2em] uppercase">Quick Entry</span>
                    <div class="bg-white/10 px-4 py-2 rounded-lg w-32 text-right">
                        <span id="numpad-display" class="text-3xl font-mono text-white font-bold"></span>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-3">
                    <button onclick="numpadInput('1')" class="h-14 rounded-lg bg-white/5 border border-white/10 text-2xl font-medium text-white hover:bg-white/10 active:scale-95 transition-all">1</button>
                    <button onclick="numpadInput('2')" class="h-14 rounded-lg bg-white/5 border border-white/10 text-2xl font-medium text-white hover:bg-white/10 active:scale-95 transition-all">2</button>
                    <button onclick="numpadInput('3')" class="h-14 rounded-lg bg-white/5 border border-white/10 text-2xl font-medium text-white hover:bg-white/10 active:scale-95 transition-all">3</button>
                    
                    <button onclick="numpadInput('4')" class="h-14 rounded-lg bg-white/5 border border-white/10 text-2xl font-medium text-white hover:bg-white/10 active:scale-95 transition-all">4</button>
                    <button onclick="numpadInput('5')" class="h-14 rounded-lg bg-white/5 border border-white/10 text-2xl font-medium text-white hover:bg-white/10 active:scale-95 transition-all">5</button>
                    <button onclick="numpadInput('6')" class="h-14 rounded-lg bg-white/5 border border-white/10 text-2xl font-medium text-white hover:bg-white/10 active:scale-95 transition-all">6</button>
                    
                    <button onclick="numpadInput('7')" class="h-14 rounded-lg bg-white/5 border border-white/10 text-2xl font-medium text-white hover:bg-white/10 active:scale-95 transition-all">7</button>
                    <button onclick="numpadInput('8')" class="h-14 rounded-lg bg-white/5 border border-white/10 text-2xl font-medium text-white hover:bg-white/10 active:scale-95 transition-all">8</button>
                    <button onclick="numpadInput('9')" class="h-14 rounded-lg bg-white/5 border border-white/10 text-2xl font-medium text-white hover:bg-white/10 active:scale-95 transition-all">9</button>
                    
                    <button onclick="numpadAction('clear')" class="h-14 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 font-bold hover:bg-red-500/30 active:scale-95 transition-all">C</button>
                    <button onclick="numpadInput('0')" class="h-14 rounded-lg bg-white/5 border border-white/10 text-2xl font-medium text-white hover:bg-white/10 active:scale-95 transition-all">0</button>
                    <button onclick="numpadAction('confirm')" class="h-14 rounded-lg bg-[#d4b982] text-[#1a1918] text-xl font-bold shadow-lg hover:bg-[#c5aa70] active:scale-95 transition-all">OK</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // 點擊背景關閉 (視同確認)
        modal.addEventListener('click', (e) => {
            if(e.target === modal) numpadAction('confirm');
        });
    }

    // 更新顯示與狀態
    const display = document.getElementById('numpad-display');
    display.textContent = currentVal;
    
    // 顯示動畫
    modal.classList.remove('pointer-events-none', 'opacity-0');
    setTimeout(() => {
        document.getElementById('numpad-panel').classList.remove('translate-y-full');
    }, 10);
};

// 處理數字輸入
window.numpadInput = function(num) {
    const display = document.getElementById('numpad-display');
    // 修改這裡：將 3 改成 5，允許輸入例如 "JX0800" (雖然只能打數字) 的長度
    if (display.textContent.length < 5) { 
        // 處理開頭是 0 且只有一位數的情況 (把 0 蓋掉)，除非你想輸入 0
        if (display.textContent === '0') display.textContent = num;
        else display.textContent += num;
    }
};
// 處理功能鍵
window.numpadAction = function(action) {
    const display = document.getElementById('numpad-display');
    const modal = document.getElementById('numpad-modal');
    const panel = document.getElementById('numpad-panel');
    const input = document.getElementById(currentNumpadTargetId);

    if (action === 'clear') {
        display.textContent = '';
    } else if (action === 'confirm') {
        if (input) {
            input.value = display.textContent === '' ? 0 : parseInt(display.textContent);
            // 觸發 change 事件以確保邏輯同步 (如果有綁定監聽)
            input.dispatchEvent(new Event('change'));
        }
        
        // 關閉動畫
        panel.classList.add('translate-y-full');
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('pointer-events-none');
        }, 300);
        currentNumpadTargetId = null;
    }
};

// 輔助函式：切換 Tab 並重繪
window.switchGalleyTab = function(tabName) {
    currentGalleyTab = tabName;
    renderGalleyDashboard(); // 重新渲染整個儀表板
};

// --- Galley Dashboard Helpers ---
window.setGalleySide = function(side) {
    galleySideFilter = side;
    renderGalleyDashboard(); // 重新渲染以套用過濾
};

window.toggleGalleyBev = function(key) {
    if (galleyBevDoneState[key]) {
        delete galleyBevDoneState[key];
    } else {
        galleyBevDoneState[key] = true;
    }
    renderGalleyDashboard(); // 重新渲染以更新打勾狀態
};

// [UI 優化版] toggleServicePhase: 智慧控制 End Flight 顯示
function toggleServicePhase() {
    if (currentServicePhase === 'MEAL_1') {
        // ---> 切換到 MEAL 2
        currentServicePhase = 'MEAL_2';
        appElements.phaseToggleBtn.textContent = 'VIEW 1STMEAL'; // 改成 Back 比較直覺
        appElements.displayMode.textContent = 'SERVICE MODE (Meal 2)';
        
        // [優化] 這是最後一餐了，顯示 End Flight
        appElements.endFlightBtn.classList.remove('hidden');
        
        showMessage('Switched to Meal 2 Service Phase', false);
    } else {
        // ---> 切換回 MEAL 1
        currentServicePhase = 'MEAL_1';
        appElements.phaseToggleBtn.textContent = 'VIEW 2ND MEAL';
        appElements.displayMode.textContent = 'SERVICE MODE (Meal 1)';
        
        // [優化] 回到第一餐，隱藏 End Flight
        appElements.endFlightBtn.classList.add('hidden');
        
        showMessage('Switched to Meal 1 Service Phase', false);
    }
    renderSeatLayout();
}



// --- [NEW] Aisle View Control Function ---
// [修正版] setAisleView - 確保會更新隱藏的 input 值
function setAisleView(view) {
    currentAisleView = view;
    
    // --- [關鍵修正] 強制更新 HTML 中的隱藏欄位，讓 renderSeatLayout 讀取到最新狀態 ---
    if (appElements.sideFilter) {
        appElements.sideFilter.value = view; 
    }
    
    // Add/remove class to body to trigger CSS font size changes
    document.body.classList.toggle('aisle-view-active', view !== 'ALL');
    
    // Update button active states (請注意這裡我把判斷條件簡化為 L, R, ALL)
    if (appElements.viewLBtn) appElements.viewLBtn.classList.toggle('active', view === 'L');
    if (appElements.viewAllBtn) appElements.viewAllBtn.classList.toggle('active', view === 'ALL');
    if (appElements.viewRBtn) appElements.viewRBtn.classList.toggle('active', view === 'R');
    
    // Re-render the layout
    renderSeatLayout();
}


// [FIXED] renderSeatLayout - 解決捲動跳動問題 + 修正長程線顯示邏輯
function renderSeatLayout() {
    // 1. 在重繪前，紀錄所有卡片的捲動位置
    const scrollMap = {};
    const existingCards = document.querySelectorAll('.seat-card');
    existingCards.forEach(card => {
        const seatId = card.getAttribute('data-seat-id');
        const scrollContainer = card.querySelector('.custom-scrollbar');
        if (seatId && scrollContainer) {
            scrollMap[seatId] = scrollContainer.scrollTop;
        }
    });

    const filter = appElements.sideFilter ? appElements.sideFilter.value : 'ALL';
    const isSingleSideView = filter !== 'ALL'; 
    
    appElements.seatLayout.innerHTML = '';
    if (!activeAircraftConfig || !activeAircraftConfig.rows) return;

    const routeInfo = ROUTES.find(r => r.id === currentRoute);
    const isMRoute = routeInfo && routeInfo.type === 'M';
    const isLongHaul = routeInfo && ['L', 'UL'].includes(routeInfo.type);
    const isSSRoute = routeInfo && routeInfo.type === 'SS';

    // Helper: 服務按鈕樣式
    const getServiceBtnClass = (served, skipped, cancelled) => {
        if (cancelled) return 'w-full py-1.5 px-2 mb-1 rounded border border-red-900/50 bg-red-900/10 text-red-400 text-xs line-through opacity-60 shrink-0'; 
        return 'w-full py-2 px-3 mb-1.5 rounded-lg border border-[#74a397] bg-[#4a7a70] hover:bg-[#5b8c82] hover:border-[#fbbf24] text-white text-sm font-bold transition-all shadow-md active:scale-95 overflow-hidden shrink-0';
    };

    activeAircraftConfig.rows.forEach(row => {
        const rowContainer = document.createElement('div');
        rowContainer.className = 'grid gap-6 w-full mb-6';

        if (!isSingleSideView) {
            rowContainer.style.cssText = activeAircraftConfig.gridCols.replace(/1fr/g, 'minmax(0, 1fr)');
        } else {
            rowContainer.style.cssText = 'grid-template-columns: minmax(0, 1fr) 80px minmax(0, 1fr);';
        }

        activeAircraftConfig.seatLetters.forEach(letter => {
            if (filter === 'L' && !['A', 'C', 'D', 'E'].includes(letter)) return;
            if (filter === 'R' && !['F', 'G', 'H', 'K'].includes(letter)) return;

            const seatId = `${row}${letter}`;
            const order = getOrder(seatId);
            if (!order) return;

            // --- 卡片顏色 ---
            let bgClass = 'bg-[#2A423D] border-gray-600 hover:border-gray-400';
            let shadowClass = 'shadow-md';
            let delayDisplayHtml = ''; 
            let dndDisplayHtml = ''; 

            if (order.serviceClosed) {
                bgClass = 'bg-[#15201c]/60 border-gray-800 opacity-50';
            }
            else if (order.status === 'ORDERED') {
                bgClass = 'bg-[#1E3630] border-[#8C5845] ring-1 ring-[#8C5845]/30';
                shadowClass = 'shadow-[0_0_15px_rgba(140,88,69,0.15)]';
            }
            else if (order.status === 'DND') {
                bgClass = 'bg-[#1a0f0f] border-red-900/60';
                dndDisplayHtml = `
                    <div class="mt-2 w-full bg-red-900/20 border border-red-800/50 rounded-lg py-2 px-3 flex flex-row items-center justify-center gap-2 text-red-400 shadow-inner shrink-0">
                        <i data-lucide="bell-off" class="w-4 h-4 shrink-0"></i>
                        <span class="text-xs font-bold tracking-wider font-mono leading-none">DND</span>
                    </div>`;
            }
            else if (order.status === 'DELAYED') {
                if (!order.delayUntil || order.delayUntil === 0) {
                    bgClass = 'bg-[#0f172a] border-blue-800';
                    delayDisplayHtml = `
                        <div class="mt-2 w-full bg-blue-900/20 border border-blue-800/50 rounded-lg py-2 px-3 flex flex-row items-center justify-center gap-2 text-blue-300 shadow-inner shrink-0">
                            <i data-lucide="clock" class="w-4 h-4 shrink-0"></i>
                            <span class="text-xs font-bold tracking-wider font-mono leading-none">Waiting</span>
                        </div>`;
                } else {
                    const now = Date.now();
                    const diffMins = Math.ceil((order.delayUntil - now) / 60000); 
                    if ((order.delayUntil - now) > 0) {
                        bgClass = 'bg-[#0f172a] border-blue-600';
                        delayDisplayHtml = `
                            <div class="mt-2 w-full bg-blue-900/30 border border-blue-500/50 rounded-lg py-2 px-3 flex flex-row items-center justify-center gap-2 text-blue-200 shadow-inner shrink-0">
                                <i data-lucide="timer" class="w-4 h-4 shrink-0 animate-pulse"></i>
                                <span class="text-xs font-bold tracking-wider font-mono leading-none">${diffMins}m left</span>
                            </div>`;
                    } else {
                        bgClass = 'bg-[#2a1a10] border-amber-500 animate-pulse ring-2 ring-amber-500/50';
                        delayDisplayHtml = `
                            <div class="mt-2 w-full bg-amber-900/90 border border-amber-500 rounded-lg py-2 px-3 flex flex-row items-center justify-center gap-2 text-white shadow-lg animate-bounce shrink-0">
                                <i data-lucide="bell-ring" class="w-4 h-4 shrink-0"></i>
                                <span class="text-xs font-bold tracking-wider leading-none">SERVICE DUE</span>
                            </div>`;
                        if (!order.notificationShown && currentMode === MODES.SERVICE_MODE) {
                            playNotificationSound(); showDueServiceAlert(seatId); order.notificationShown = true; saveSystemState();
                        }
                    }
                }
            }

            const seatCard = document.createElement('div');
            seatCard.setAttribute('data-seat-id', seatId);
            seatCard.className = `seat-card p-4 rounded-xl text-center border transition-all duration-300 flex flex-col items-center gap-2 h-full w-full ${bgClass} ${shadowClass}`;
            seatCard.style.fontFamily = '"Inter", sans-serif';

            // 座標定位
            if (!isSingleSideView) {
                if (activeAircraftConfig.colMap && activeAircraftConfig.colMap[letter]) {
                    seatCard.style.gridColumn = activeAircraftConfig.colMap[letter];
                }
            } else {
                let targetCol = 1; 
                if (currentAircraftType === 'A321neo') {
                    if (filter === 'L' && letter === 'C') targetCol = 3;
                    if (filter === 'R' && letter === 'K') targetCol = 3;
                } else {
                    if (filter === 'L' && ['D', 'E'].includes(letter)) targetCol = 3;
                    else if (filter === 'R' && ['H', 'K'].includes(letter)) targetCol = 3;
                }
                seatCard.style.gridColumn = targetCol;
            }

            // --- Header ---
            const header = document.createElement('div');
            header.className = 'flex justify-between items-start mb-1 shrink-0 w-full';
            let infantHtml = order.hasInfant ? `<span class="ml-2 inline-flex items-center justify-center bg-pink-600/80 text-white rounded-full p-1"><i data-lucide="baby" class="w-4 h-4"></i></span>` : '';
            header.innerHTML = `<div class="flex items-center"><p class="text-3xl font-black text-[#fbbf24] tracking-tight text-shadow-sm">${seatId}</p>${infantHtml}</div>`;

            // Tags
            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'flex gap-1 flex-wrap justify-end max-w-[60%]';
            if (order.tags) {
                order.tags.forEach(tagId => {
                    const tag = TAGS[tagId];
                    if (tag) {
                        if (tagId === 'allergic' && order.allergyNote) {
                            tagsDiv.innerHTML += `<div class="flex items-center bg-red-900/50 border border-red-700/50 rounded px-1.5 py-0.5"><i data-lucide="${tag.icon}" class="w-3 h-3 text-red-400 mr-1"></i><span class="text-[9px] font-bold text-red-300 uppercase max-w-[50px] truncate">${order.allergyNote}</span></div>`;
                        } else {
                            const borderColor = tag.color.replace('text-', 'border-').replace('400', '500/50');
                            const bgColor = tag.color.replace('text-', 'bg-').replace('400', '500/10');
                            tagsDiv.innerHTML += `
                                <span class="text-[10px] font-black px-1.5 py-0.5 rounded border ${borderColor} ${bgColor} ${tag.color} tracking-tight">
                                    ${tag.label}
                                </span>`;
                        }
                    }
                });
            }
            header.appendChild(tagsDiv);
            seatCard.appendChild(header);

            if (delayDisplayHtml) seatCard.innerHTML += delayDisplayHtml;
            if (dndDisplayHtml) seatCard.innerHTML += dndDisplayHtml;

            // Name
            const nameEl = document.createElement('p');
            nameEl.className = 'text-base font-bold text-white border-b border-gray-500/50 pb-2 mb-2 truncate shrink-0 w-full';
            nameEl.textContent = `${order.title || ''} ${order.lastName || 'VACANT'}`;
            seatCard.appendChild(nameEl);

            // Remark
            if (order.remark) {
                seatCard.innerHTML += `<div class="text-left bg-amber-900/20 border border-amber-700/30 rounded p-1.5 mb-2 flex items-start gap-1.5 shrink-0 w-full"><i data-lucide="sticky-note" class="w-3 h-3 text-amber-500 mt-0.5 shrink-0"></i><span class="text-xs text-amber-200/90 italic leading-tight break-words">${order.remark}</span></div>`;
            }

            // --- Items Container (動態高度) ---
            const itemsContainer = document.createElement('div');
            const maxHeightClass = isSingleSideView ? 'max-h-[350px]' : 'max-h-[260px]';
            itemsContainer.className = `flex flex-col gap-1 w-full ${maxHeightClass} overflow-y-auto custom-scrollbar pr-1 relative`;

            if (order.status === 'ORDERED' && !order.serviceClosed) {
                
                const createBtnContent = (iconName, text, subText = '', cnx = false) => {
                    const cnxText = cnx ? ' (CNX)' : '';
                    return `
                        <div class="flex flex-row items-center justify-center gap-2 w-full max-w-full px-1 pointer-events-none overflow-hidden">
                            ${iconName ? `<i data-lucide="${iconName}" class="w-4 h-4 shrink-0 ${cnx ? 'text-red-400' : 'text-white'}"></i>` : ''}
                            <span class="truncate text-sm tracking-wide leading-none mt-[1px] ${cnx ? 'line-through' : ''}">${text}${cnxText}</span>
                            ${subText}
                        </div>
                    `;
                };

                if (currentServicePhase === 'MEAL_1') {
                    // --- [MODIFIED] 長程線自動對應顯示邏輯 ---
                    let appDisplayLabel = order.appetizerChoice || 'Standard';
                    let soupDisplayLabel = 'Soup';
                    
                    if (isLongHaul && LONG_HAUL_RULES[currentRoute]) {
                        const ruleSet = LONG_HAUL_RULES[currentRoute];
                        // 依據主餐代碼找規則，找不到就用 STANDARD
                        const rule = ruleSet[order.mealCode] || ruleSet['STANDARD'];
                        if (rule) {
                            if (rule.appetizer) appDisplayLabel = rule.appetizer.code;
                            if (rule.soup) soupDisplayLabel = rule.soup.code;
                        }
                    }
                    // ----------------------------------------

                    const showStarter = isLongHaul || (isMRoute && order.appetizerChoice);
                    
                    if (showStarter && ((!order.appetizerServed && !order.appetizerSkipped) || order.appetizerCancelled)) {
                        const btn = document.createElement('div');
                        btn.className = getServiceBtnClass(false, false, order.appetizerCancelled);
                        btn.innerHTML = createBtnContent('utensils', `Starter: ${appDisplayLabel}`, '', order.appetizerCancelled);
                        btn.onclick = e => { e.stopPropagation(); handleServiceClick(e, seatId, 'appetizer'); };
                        btn.ondblclick = e => { e.stopPropagation(); handleQuickServe(seatId, 'appetizer'); };
                        itemsContainer.appendChild(btn);
                    }
                    
                    if (isLongHaul && ((!order.soupServed && !order.soupSkipped) || order.soupCancelled)) {
                        const btn = document.createElement('div');
                        btn.className = getServiceBtnClass(false, false, order.soupCancelled);
                        btn.innerHTML = createBtnContent('soup', `Soup: ${soupDisplayLabel}`, '', order.soupCancelled);
                        btn.onclick = e => { e.stopPropagation(); handleServiceClick(e, seatId, 'soup'); };
                        btn.ondblclick = e => { e.stopPropagation(); handleQuickServe(seatId, 'soup'); };
                        itemsContainer.appendChild(btn);
                    }
                    
                    if (order.mealCode && ((!order.mealServed && !order.mealSkipped) || order.mealCancelled)) {
                        const btn = document.createElement('div');
                        btn.className = `${getServiceBtnClass(false, false, order.mealCancelled)} border-l-4 border-l-[#A08C5B]`;
                        btn.innerHTML = createBtnContent(null, `Main: ${order.mealCode}`, '', order.mealCancelled);
                        btn.onclick = e => { e.stopPropagation(); handleServiceClick(e, seatId, 'meal_1'); };
                        btn.ondblclick = e => { e.stopPropagation(); handleQuickServe(seatId, 'meal_1'); };
                        itemsContainer.appendChild(btn);
                    }
                    
                    let showDessertBtn = false;
                    let dessertName = 'Dessert';
                    if (order.isSPML) { if (!isSSRoute) showDessertBtn = true; } 
                    else {
                        const mData = getMeal1(order.mealCode);
                        if (mData && mData.dessert && mData.dessert !== 'ONE TRAY SERVICE') { showDessertBtn = true; dessertName = mData.dessert; }
                    }
                    if (showDessertBtn && ((!order.dessertServed && !order.dessertSkipped) || order.dessertCancelled)) {
                        const btn = document.createElement('div');
                        btn.className = getServiceBtnClass(false, false, order.dessertCancelled);
                        btn.innerHTML = createBtnContent('ice-cream', dessertName, '', order.dessertCancelled);
                        btn.onclick = e => { e.stopPropagation(); handleServiceClick(e, seatId, 'dessert'); };
                        btn.ondblclick = e => { e.stopPropagation(); handleQuickServe(seatId, 'dessert'); };
                        itemsContainer.appendChild(btn);
                    }
                } else {
                    // MEAL 2 Logic
                    const m2Code = order.mealCode_2;
                    const isCongee = m2Code && (m2Code.includes('CON') || m2Code.includes('MCF'));
                    
                    if (isLongHaul) {
                        if (!isCongee && ((!order.yogurtServed && !order.yogurtSkipped) || order.yogurtCancelled)) {
                            const btn = document.createElement('div');
                            btn.className = getServiceBtnClass(false, false, order.yogurtCancelled);
                            btn.innerHTML = createBtnContent(null, 'Yogurt', '', order.yogurtCancelled);
                            btn.onclick = e => { e.stopPropagation(); handleServiceClick(e, seatId, 'yogurt'); };
                            btn.ondblclick = e => { e.stopPropagation(); handleQuickServe(seatId, 'yogurt'); };
                            itemsContainer.appendChild(btn);
                        }
                        if (order.mealCode_2 && ((!order.mealServed_2 && !order.mealSkipped_2) || order.mealCancelled_2)) {
                            const btn = document.createElement('div');
                            btn.className = `${getServiceBtnClass(false, false, order.mealCancelled_2)} border-l-4 border-l-blue-400`;
                            btn.innerHTML = createBtnContent(null, `M2: ${order.mealCode_2}`, '', order.mealCancelled_2);
                            btn.onclick = e => { e.stopPropagation(); handleServiceClick(e, seatId, 'meal_2'); };
                            btn.ondblclick = e => { e.stopPropagation(); handleQuickServe(seatId, 'meal_2'); };
                            itemsContainer.appendChild(btn);
                        }
                        if ((!order.fruitServed && !order.fruitSkipped) || order.fruitCancelled) {
                            const btn = document.createElement('div');
                            btn.className = getServiceBtnClass(false, false, order.fruitCancelled);
                            btn.innerHTML = createBtnContent('apple', 'Fruit', '', order.fruitCancelled);
                            btn.onclick = e => { e.stopPropagation(); handleServiceClick(e, seatId, 'fruit'); };
                            btn.ondblclick = e => { e.stopPropagation(); handleQuickServe(seatId, 'fruit'); };
                            itemsContainer.appendChild(btn);
                        }
                    }
                }

                // --- 飲料顯示 ---
                const currentBevs = (currentServicePhase === 'MEAL_1') ? order.beverages : order.beverages_2;
                if (currentBevs && currentBevs.length > 0) {
                    currentBevs.forEach((bev, idx) => {
                        if ((!bev.served && !bev.skipped) || bev.cancelled) {
                            const btn = document.createElement('div');
                            btn.className = `${getServiceBtnClass(false, false, bev.cancelled)}`;
                            
                            const displayName = getBeverageShort(bev.name);
                            const hasStyle = bev.style && bev.style !== 'Normal';

                            btn.innerHTML = `
                                <div class="flex flex-row items-center justify-center gap-2 w-full max-w-full px-2 pointer-events-none overflow-hidden text-center">
                                    <i data-lucide="coffee" class="w-4 h-4 shrink-0 text-white/90"></i> 
                                    <div class="flex flex-col items-center justify-center min-w-0 flex-1">
                                        <span class="truncate text-sm font-bold tracking-wide leading-tight w-full text-center">${displayName}</span>
                                        ${hasStyle ? `<span class="truncate text-[12px] text-amber-300 font-medium leading-tight w-full mt-0.5 text-center">${bev.style}</span>` : ''}
                                    </div>
                                </div>
                            `;
                            
                            const targetType = (currentServicePhase === 'MEAL_1') ? 'drink_1' : 'drink_2';
                            btn.onclick = e => { e.stopPropagation(); handleServiceClick(e, seatId, targetType, idx); };
                            btn.ondblclick = e => { e.stopPropagation(); handleQuickServe(seatId, targetType, idx); };
                            itemsContainer.appendChild(btn);
                        }
                    });
                }
            }
            seatCard.appendChild(itemsContainer);

            // Summary
            const summaryDiv = document.createElement('div');
            summaryDiv.className = 'text-xs text-center flex flex-col gap-0.5 mt-auto pt-2 shrink-0 w-full';
            
            if (order.mealServed) {
                summaryDiv.innerHTML = `<div class="text-[#fbbf24] font-bold border-t border-gray-600/30 pt-1">✓ ${order.mealCode} Served</div>`;
            } else if (order.mealServed_2) {
                summaryDiv.innerHTML = `<div class="text-[#fbbf24] font-bold border-t border-gray-600/30 pt-1">✓ M2: ${order.mealCode_2} Served</div>`;
            }

            seatCard.appendChild(summaryDiv);

            seatCard.onclick = () => {
                if (order.status === 'DND') openDndActionModal(seatId);
                else if (order.status === 'DELAYED') openDelayActionModal(seatId);
                else openOrderModal(seatId);
            };

            rowContainer.appendChild(seatCard);
        }); 

        if (rowContainer.children.length > 0) appElements.seatLayout.appendChild(rowContainer);
    });

    // 2. 還原捲動位置
    Object.keys(scrollMap).forEach(id => {
        const card = document.querySelector(`.seat-card[data-seat-id="${id}"]`);
        if (card) {
            const container = card.querySelector('.custom-scrollbar');
            if (container) {
                container.scrollTop = scrollMap[id];
            }
        }
    });

    safeRenderIcons();
    renderOrderSummaryAggregate();
}

// [最終修正版] renderOrderSummaryAggregate - 解決捲動跳回頂部的問題
function renderOrderSummaryAggregate() {
    // --- [關鍵修正 1] 重繪前，先記住目前的捲動位置 ---
    const scrollContainer = document.getElementById('beverage-scroll-container');
    let savedScrollTop = 0;
    if (scrollContainer) {
        savedScrollTop = scrollContainer.scrollTop;
    }
    // ----------------------------------------------

    appElements.summaryList.innerHTML = '';

    // --- 1. 資料統計 ---
    const mealCounts = {};
    const bevCounts = {}; 
    let totalMealOrders = 0;

    orders.forEach(o => {
        if (['ORDERED', 'DELAYED', 'DND'].includes(o.status)) {
            
            // A. 統計主餐
            let code = (currentServicePhase === 'MEAL_1') ? o.mealCode : o.mealCode_2;
            if (code && code !== 'NO MEAL') {
                totalMealOrders++;
                mealCounts[code] = (mealCounts[code] || 0) + 1;
            }

            // B. 統計飲料
            const currentBevs = (currentServicePhase === 'MEAL_1') ? o.beverages : o.beverages_2;
            if (currentBevs && currentBevs.length > 0) {
                currentBevs.forEach(b => {
                    if (!b.served && !b.skipped) {
                        // 1. 找出類別
                        let category = 'Others';
                        for (const [catName, list] of Object.entries(BEVERAGE_CATEGORIES)) {
                            if (list.some(item => item.full === b.name)) {
                                category = catName;
                                break;
                            }
                        }
                        // 2. 初始化並計數
                        if (!bevCounts[category]) bevCounts[category] = {};
                        const fullName = b.name + (b.style ? ` (${b.style})` : '');
                        bevCounts[category][fullName] = (bevCounts[category][fullName] || 0) + 1;
                    }
                });
            }
        }
    });

    // --- 2. 產生 HTML (左欄：餐點) ---
    const mealPhaseTitle = (currentServicePhase === 'MEAL_1') ? '1st Meal' : '2nd Meal';
    let leftPanelHtml = `
        <div class="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg h-full">
            <h3 class="text-amber-400 font-bold  uppercase text-lg mb-4 border-l-4 border-amber-500 pl-3">
                Meals Summary <span class="text-gray-400 text-sm font-normal">(${totalMealOrders} seats)</span>
            </h3>
            <div class="space-y-4">
                <div>
                    <h4 class="text-amber-200/80 font-bold text-sm uppercase mb-2 border-b border-gray-700 pb-1">${mealPhaseTitle}</h4>
                    <div class="space-y-2">`;
    
    if (Object.keys(mealCounts).length === 0) {
        leftPanelHtml += `<p class="text-gray-500 italic text-sm">No meals ordered yet.</p>`;
    } else {
        for (const [code, count] of Object.entries(mealCounts)) {
            leftPanelHtml += `
                <div class="flex justify-between items-center text-gray-200">
                    <span class="font-medium">${code}</span>
                    <span class="font-bold text-amber-400 text-lg">${count}</span>
                </div>`;
        }
    }
    leftPanelHtml += `</div></div></div></div>`;

    // --- 3. 產生 HTML (右欄：飲料 - 含打勾功能) ---
    // [關鍵修正 2] 這裡加上 id="beverage-scroll-container" 讓我們可以抓到它
    let rightPanelHtml = `
        <div class="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg h-full flex flex-col">
            <h3 class="text-amber-400 font-bold uppercase text-lg mb-4 border-l-4 border-amber-500 pl-3 shrink-0">
                Beverages Summary
            </h3>
            <h4 class="text-white font-bold text-sm uppercase mb-4 border-b border-gray-600 pb-2 shrink-0">
                ${mealPhaseTitle} Beverages
            </h4>
            <div id="beverage-scroll-container" class="space-y-5 custom-scrollbar overflow-y-auto pr-2 flex-1">`;

    const categoryOrder = Object.keys(BEVERAGE_CATEGORIES);
    
    if (Object.keys(bevCounts).length === 0) {
        rightPanelHtml += `<p class="text-gray-500 italic text-sm">No pending beverages.</p>`;
    } else {
        categoryOrder.forEach(catName => {
            const items = bevCounts[catName];
            if (items) {
                rightPanelHtml += `
                    <div>
                        <h5 class="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-2 sticky top-0 bg-gray-800 py-1 z-10">${catName}</h5>
                        <div class="space-y-1.5">`;
                
                for (const [name, count] of Object.entries(items)) {
                    // 產生 Key 並檢查是否已打勾
                    const key = `${catName}_${name}`;
                    const isDone = beverageSummaryDoneState[key];
                    
                    // 處理單引號跳脫問題 (例如 Jack Daniel's)
                    const safeCat = catName.replace(/'/g, "\\'");
                    const safeName = name.replace(/'/g, "\\'");

                    // 根據狀態決定 Icon 樣式
                    const iconHtml = isDone 
                        ? `<div class="w-5 h-5 rounded-full bg-green-500 border border-green-500 flex items-center justify-center text-white shadow-md transition-all scale-110"><i data-lucide="check" class="w-3 h-3 stroke-[3]"></i></div>` // 實心勾勾
                        : `<div class="w-5 h-5 rounded-full border-2 border-gray-500 hover:border-amber-400 hover:bg-gray-700 transition-all"></div>`; // 空心圓圈
                    
                    // 整個項目 (Row) 點擊都可以觸發
                    const opacityClass = isDone ? 'opacity-40' : 'opacity-100'; // 打勾後整行變半透明
                    
                    rightPanelHtml += `
                        <div class="flex justify-between items-center group cursor-pointer select-none p-1 rounded hover:bg-white/5 transition-colors ${opacityClass}" 
                             onclick="toggleBeverageDone('${safeCat}', '${safeName}')">
                            <span class="text-gray-300 text-sm group-hover:text-white transition-colors">${name}</span>
                            <div class="flex items-center gap-3">
                                <span class="font-bold text-white text-lg">${count}</span>
                                ${iconHtml}
                            </div>
                        </div>`;
                }
                rightPanelHtml += `</div></div>`;
            }
        });
    }
    rightPanelHtml += `</div></div>`;

    appElements.summaryList.innerHTML = leftPanelHtml + rightPanelHtml;
    safeRenderIcons(); // 重新渲染勾勾圖示

    // --- [關鍵修正 3] 重繪完成後，馬上恢復捲動位置 ---
    const newScrollContainer = document.getElementById('beverage-scroll-container');
    if (newScrollContainer) {
        newScrollContainer.scrollTop = savedScrollTop;
    }
    // ----------------------------------------------
}

// --- [NEW] Summary 顯示控制 ---
let isSummaryExpanded = false; // 預設為 false (只顯示當前餐期)

window.toggleSummaryView = function(seatId) {
    isSummaryExpanded = !isSummaryExpanded; // 切換狀態
    const order = getOrder(seatId);
    
    // 強制重新渲染 Summary 內容
    if (appElements.orderTabContent1) {
        appElements.orderTabContent1.innerHTML = renderServiceSummary(order);
        safeRenderIcons(); // 補上 icon
    }
};

// [UI 最終版] renderServiceSummary: 支援長程線單餐過濾 + 全覽切換 + 飲料對齊 + 餐點全名
function renderServiceSummary(order) {
    const routeInfo = ROUTES.find(r => r.id === currentRoute);
    const isLongHaul = routeInfo && ['L', 'UL'].includes(routeInfo.type);

    const showMeal1 = !isLongHaul || isSummaryExpanded || currentServicePhase === 'MEAL_1';
    const showMeal2 = isLongHaul && (isSummaryExpanded || currentServicePhase === 'MEAL_2');

    let html = '<div class="space-y-3 p-4 bg-gray-50 rounded-lg text-sm transition-all duration-300">';
    
    // Toggle Button Logic
    const toggleBtn = isLongHaul 
        ? `<button onclick="toggleSummaryView('${order.id}')" class="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition flex items-center gap-2 shadow-sm"><i data-lucide="${isSummaryExpanded ? 'minimize-2' : 'layers'}" class="w-3 h-3"></i>${isSummaryExpanded ? 'Focus View' : 'View Full Flight'}</button>`
        : '';

    html += `<div class="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
                <h4 class="text-lg font-semibold text-gray-800 flex items-center gap-2">SERVICE SUMMARY <span class="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">${order.id}</span></h4>
                ${toggleBtn}
             </div>`;
    
    // getStatusRow Helper
    const getStatusRow = (label, served, skipped, cancelled, itemType, index = null) => {
        const isDone = served || skipped || cancelled;
        let statusText = 'Pending';
        let color = 'text-gray-500';
        let icon = '○';
        let rowClass = 'py-3 border-b border-gray-200'; 

        if (served) { statusText = 'Served'; color = 'text-green-600 font-bold'; icon = '✓'; }
        else if (skipped) { statusText = 'Skipped'; color = 'text-yellow-600'; icon = '⊘'; }
        else if (cancelled) { statusText = 'Cancelled'; color = 'text-red-500 font-bold'; icon = '✕'; rowClass += ' bg-red-50/50'; }
        
        const undoBtn = isDone ? `<button onclick="handleUndoService('${order.id}', '${itemType}'${index !== null ? `, ${index}` : ''})" class="ml-3 px-3 py-1 bg-white border border-gray-300 rounded text-xs font-bold text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-300 shadow-sm transition-all">Undo</button>` : '';
        const labelStyle = cancelled ? 'line-through text-gray-400' : 'font-medium text-gray-700 text-[15px]';

        return `<div class="flex justify-between items-center ${rowClass}"><span class="${labelStyle}">${label}</span><div class="flex items-center"><span class="${color} flex items-center gap-1 text-xs uppercase font-bold tracking-wide">${icon} ${statusText}</span>${undoBtn}</div></div>`;
    };

    // --- 1st MEAL FLOW ---
    if (showMeal1 && order.mealCode) {
        html += `<div class="mt-4 mb-2 flex items-center gap-2 animate-fade-in"><h5 class="font-bold text-amber-600 text-base">1st MEAL</h5><div class="h-px bg-amber-200 flex-1"></div></div>`;
        
        if (order.appetizerChoice) html += getStatusRow(`Starter: ${order.appetizerChoice}`, order.appetizerServed, order.appetizerSkipped, order.appetizerCancelled, 'appetizer');
        if (isLongHaul) {
             // [MODIFIED] Summary 這裡也顯示正確的湯品代號
             const ruleSet = LONG_HAUL_RULES[currentRoute];
             const rule = ruleSet ? (ruleSet[order.mealCode] || ruleSet['STANDARD']) : null;
             const soupLabel = (rule && rule.soup) ? rule.soup.code : 'Standard';
             html += getStatusRow(`Soup: ${soupLabel}`, order.soupServed, order.soupSkipped, order.soupCancelled, 'soup');
        }

        // [MODIFIED] 顯示主餐全名
        const m1 = getMeal1(order.mealCode);
        const m1Label = m1 ? `${order.mealCode} - <span class="text-xs text-gray-500">${m1.name}</span>` : order.mealCode;
        html += getStatusRow(`Main: ${m1Label}`, order.mealServed, order.mealSkipped, order.mealCancelled, 'meal_1');
        
        const isOneTray = (m1 && m1.dessert === 'ONE TRAY SERVICE');
        if (!isOneTray) {
            const dessertName = m1 ? m1.dessert : 'Dessert';
            html += getStatusRow(`Dessert: ${dessertName}`, order.dessertServed, order.dessertSkipped, order.dessertCancelled, 'dessert');
        }
        if (order.beverages && order.beverages.length > 0) {
            html += `<div class="mt-3 mb-1 text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Beverages (Meal 1)</div>`;
            order.beverages.forEach((b, idx) => {
                const label = `${b.name} ${b.style ? `(${b.style})` : ''}`;
                html += getStatusRow(label, b.served, b.skipped, b.cancelled, 'drink_1', idx);
            });
        }
    }

    // --- 2nd MEAL FLOW ---
    if (showMeal2 && order.mealCode_2) {
        html += `<div class="mt-8 mb-2 flex items-center gap-2 animate-fade-in"><h5 class="font-bold text-blue-600 text-base">2nd MEAL</h5><div class="h-px bg-blue-200 flex-1"></div></div>`;
        
        const m2Code = order.mealCode_2;
        const isCongee = m2Code.includes('CON') || m2Code.includes('MCF') || (order.mealName_2 && order.mealName_2.toUpperCase().includes('CONGEE'));

        if (isLongHaul && !isCongee) html += getStatusRow(`Yogurt: Standard`, order.yogurtServed, order.yogurtSkipped, order.yogurtCancelled, 'yogurt');
        
        // [MODIFIED] 顯示第二餐全名
        const m2 = getMeal2(order.mealCode_2);
        const m2Label = m2 ? `${order.mealCode_2} - <span class="text-xs text-gray-500">${m2.name}</span>` : order.mealCode_2;
        html += getStatusRow(`Main: ${m2Label}`, order.mealServed_2, order.mealSkipped_2, order.mealCancelled_2, 'meal_2');

        if (isLongHaul) html += getStatusRow(`Fruit: Standard`, order.fruitServed, order.fruitSkipped, order.fruitCancelled, 'fruit');

        if (order.beverages_2 && order.beverages_2.length > 0) {
             html += `<div class="mt-3 mb-1 text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Beverages (Meal 2)</div>`;
            order.beverages_2.forEach((b, idx) => {
                const label = `${b.name} ${b.style ? `(${b.style})` : ''}`;
                html += getStatusRow(label, b.served, b.skipped, b.cancelled, 'drink_2', idx);
            });
        }
    }
    
    html += '</div>';
    return html;
}

// --- Inventory and Modal Logic (Setup, Open, Close, Submit) ---
function setupInitialSelectors() {
    appElements.aircraftSelect.innerHTML = Object.keys(AIRCRAFT_CONFIGS).map(key => `<option value="${key}">${AIRCRAFT_CONFIGS[key].name}</option>`).join('');
    appElements.routeSelect.innerHTML = ROUTES.map(r => `<option value="${r.id}">${r.name}</option>`).join('');
    
    // [NEW] Populate SPML dropdowns
    const spmlOptions = Object.keys(ICAO_SPML_CODES).map(code => `<option value="${code}">${ICAO_SPML_CODES[code]}</option>`).join('');
    appElements.spmlSelect.innerHTML = spmlOptions;
    appElements.spmlSelect2.innerHTML = spmlOptions;
}

// [UPDATED] renderGalleyDashboard - 新增 Starter (前菜) 統計功能
function renderGalleyDashboard() {
    
    // --- 0. 準備資料 ---
    // 重新取得當前航線的前菜定義 (確保 M 航線有資料)
    const routeMenus = MENUS[currentRoute] || { meal_1: [], meal_2: [], appetizers: [] };
    const activeAppetizers = routeMenus.appetizers || [];

    // --- 1. 資料結構初始化 ---
    const dashboardData = {
        m1: {}, m2: {}, spml: {}, beverages: {},
        starter: {}, // [新增] Starter 統計容器
        totalPax: 0, 
        stats: { dnd: 0, delay: 0, special: 0, infant: 0 }
    };

    const initMealData = (sourceList, inventory, targetObj) => {
        sourceList.forEach(m => {
            targetObj[m.code] = { name: m.name, loaded: inventory[m.code] || 0, total: 0, served: 0, L: 0, R: 0, seats: [] };
        });
    };
    
    // 初始化各類餐點
    initMealData(activeMeals_1, mealInventory_1, dashboardData.m1);
    initMealData(activeMeals_2, mealInventory_2, dashboardData.m2);
    initMealData(activeAppetizers, appetizerInventory, dashboardData.starter); // [新增] 初始化前菜

    // --- 2. 遍歷訂單進行統計 ---
    orders.forEach(o => {
        if (['ORDERED', 'DELAYED', 'DND'].includes(o.status)) {
            dashboardData.totalPax++;
            if (o.status === 'DND') dashboardData.stats.dnd++;
            if (o.status === 'DELAYED') dashboardData.stats.delay++;
            
            const isLeft = ['A', 'B', 'C', 'D', 'E'].some(letter => o.id.includes(letter));
            const sideKey = isLeft ? 'L' : 'R';

            // 統計 SPML
            if (o.isSPML) {
                const code = o.mealCode || 'SPML';
                if (!dashboardData.spml[code]) dashboardData.spml[code] = { name: 'Special Meal', loaded: 0, total: 0, served: 0, L: 0, R: 0, seats: [] };
                const data = dashboardData.spml[code];
                data.total++;
                if (sideKey === 'L') data.L++; else data.R++;
            } 
            // 統計一般主餐 (M1)
            else if (o.mealCode && o.mealCode !== 'NO MEAL') {
                const data = dashboardData.m1[o.mealCode];
                if (data) { data.total++; if (sideKey === 'L') data.L++; else data.R++; }
            }

            // [新增] 統計 Starter (前菜)
            // 條件：有選前菜 且 不是 SPML (SPML通常有固定前菜，不佔一般庫存)
            if (activeAppetizers.length > 0 && !o.isSPML && o.appetizerChoice) {
                const data = dashboardData.starter[o.appetizerChoice];
                if (data) { 
                    data.total++; 
                    if (sideKey === 'L') data.L++; else data.R++; 
                }
            }

            // 統計第二餐 (M2)
            if (activeMeals_2.length > 0 && !o.isSPML_2 && o.mealCode_2 && o.mealCode_2 !== 'NO MEAL') {
                const data = dashboardData.m2[o.mealCode_2];
                if (data) { data.total++; if (sideKey === 'L') data.L++; else data.R++; }
            }

            // 統計飲料 (保持不變)
            const targetBevs = (currentBevSubTab === 'M1') ? o.beverages : o.beverages_2;
            if (targetBevs && targetBevs.length > 0) {
                targetBevs.forEach(bev => {
                    if (!bev.cancelled) {
                        let category = 'Others';
                        for (const [catName, list] of Object.entries(BEVERAGE_CATEGORIES)) {
                            if (list.some(item => item.full === bev.name)) { category = catName; break; }
                        }
                        const fullName = bev.name + ((bev.style && bev.style !== 'Normal') ? ` (${bev.style})` : '');
                        
                        if (!dashboardData.beverages[category]) dashboardData.beverages[category] = {};
                        if (!dashboardData.beverages[category][fullName]) {
                            dashboardData.beverages[category][fullName] = { name: bev.name, style: bev.style, total: 0, served: 0, L: 0, R: 0 };
                        }
                        const bData = dashboardData.beverages[category][fullName];
                        bData.total++;
                        if (sideKey === 'L') bData.L++; else bData.R++;
                        if (bev.served) bData.served++;
                    }
                });
            }
        }
    });

    // --- 3. UI 建構 (Header) ---
    const totalHold = dashboardData.stats.dnd + dashboardData.stats.delay;
    const holdButtonClass = totalHold > 0 ? "bg-red-500/10 border-red-500/50 text-red-400 animate-pulse" : "bg-white/5 border-white/10 text-gray-500";
    
    const headerHtml = `
        <div class="bg-[#1a1918] border-b border-white/10 px-6 pt-14 pb-4 flex flex-col xl:flex-row justify-between items-center gap-6 shrink-0 shadow-xl relative z-20">
            <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4b982] via-[#a8905e] to-[#d4b982] opacity-60"></div>
            
            <div class="flex items-center gap-6 w-full xl:w-auto">
                <h2 class="text-xl font-bold text-white tracking-[0.15em]">GALLEY DASHBOARD</h2>
                <div class="hidden md:block w-px h-8 bg-white/10 mx-2"></div>
                <div class="flex items-center gap-3">
                    <div class="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                        <span class="text-[10px] text-gray-400 font-bold uppercase">Total Pax</span>
                        <span class="text-xl font-mono font-black text-white leading-none">${dashboardData.totalPax}</span>
                    </div>
                    <button onclick="${totalHold > 0 ? 'showHoldDetails()' : ''}" class="px-4 py-1.5 rounded-lg border flex items-center gap-2 ${holdButtonClass}">
                        <i data-lucide="${totalHold > 0 ? 'pause-circle' : 'check'}" class="w-3.5 h-3.5"></i>
                        <span class="text-[10px] font-bold uppercase">${totalHold > 0 ? "HOLD" : "ACTIVE"}</span>
                        <span class="text-xl font-mono font-black leading-none ml-1">${totalHold}</span>
                    </button>
                </div>
            </div>

            <div class="bg-black/40 p-1 rounded-lg border border-white/10 flex shadow-inner">
                <button onclick="switchGalleyTab('MEALS')" class="px-8 py-2 rounded-md text-xs font-bold tracking-widest transition-all ${currentGalleyTab === 'MEALS' ? 'bg-[#d4b982] text-[#1a1918] shadow-lg' : 'text-gray-400 hover:text-white'}">MEALS</button>
                <button onclick="switchGalleyTab('BEVERAGES')" class="px-8 py-2 rounded-md text-xs font-bold tracking-widest transition-all ${currentGalleyTab === 'BEVERAGES' ? 'bg-[#d4b982] text-[#1a1918] shadow-lg' : 'text-gray-400 hover:text-white'}">BEVERAGES</button>
            </div>

            <div class="flex bg-black/40 p-1 rounded-lg border border-white/10">
                <button onclick="setGalleySide('L')" class="px-4 py-1.5 rounded text-xs font-bold transition-all ${galleySideFilter === 'L' ? 'bg-white/20 text-white' : 'text-gray-500'}">L</button>
                <button onclick="setGalleySide('ALL')" class="px-4 py-1.5 rounded text-xs font-bold transition-all ${galleySideFilter === 'ALL' ? 'bg-[#d4b982] text-[#1a1918]' : 'text-gray-500'}">ALL</button>
                <button onclick="setGalleySide('R')" class="px-4 py-1.5 rounded text-xs font-bold transition-all ${galleySideFilter === 'R' ? 'bg-white/20 text-white' : 'text-gray-500'}">R</button>
            </div>
            
            <button class="bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white p-2.5 rounded-lg border border-white/10" onclick="document.getElementById('galley-modal').classList.add('hidden'); document.getElementById('galley-modal').classList.remove('flex');">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
    `;

    let contentHtml = `<div class="p-8 max-w-[1600px] mx-auto pb-24">`;

    // ===== TAB 1: MEALS (餐點頁籤) =====
    if (currentGalleyTab === 'MEALS') {
        const createMealCard = (code, data) => {
            let displayCount = 0;
            if (galleySideFilter === 'ALL') displayCount = data.total;
            else if (galleySideFilter === 'L') displayCount = data.L;
            else displayCount = data.R;
            if (displayCount === 0) return '';
            
            const stockLeft = data.loaded - data.total;
            const inventoryInfo = galleySideFilter === 'ALL' ? `<span class="text-xs font-mono ${stockLeft < 2 ? 'text-red-400' : 'text-gray-500'}">STK: ${stockLeft}</span>` : '';

            return `
                <div class="bg-white/[0.03] rounded-2xl border border-white/10 p-5 flex flex-col relative overflow-hidden group">
            <div class="flex justify-between items-start mb-4">
                <div class="pr-4 flex-1 min-w-0">
                    <h3 class="text-4xl font-thin text-white mb-1 leading-none">${code}</h3>
                    <p class="text-sm text-gray-400 truncate tracking-wide" title="${data.name}">${data.name}</p>
                </div>
                <div class="text-right shrink-0">
                    <span class="block text-5xl font-black text-[#d4b982] leading-none">${displayCount}</span>
                    <div class="mt-2 px-2 py-0.5 rounded bg-black/20 border border-white/5 inline-block">${inventoryInfo}</div>
                </div>
            </div>
        </div>`;
        };

        // A. First Meal (主餐)
        contentHtml += `<div class="mb-12">
            <div class="flex items-center gap-4 mb-6"><span class="text-5xl font-thin text-[#d4b982]">01</span><h3 class="text-base font-bold text-white uppercase tracking-[0.3em] opacity-80 border-b border-white/10 pb-1 flex-1">First Meal</h3></div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">${Object.keys(dashboardData.m1).map(code => createMealCard(code, dashboardData.m1[code])).join('')}</div>
        </div>`;

        // [新增] B. Starter (前菜) - 只有當有前菜數據時才顯示
        if (Object.keys(dashboardData.starter).length > 0) {
            contentHtml += `<div class="mb-12">
                <div class="flex items-center gap-4 mb-6"><span class="text-5xl font-thin text-emerald-400">ST</span><h3 class="text-base font-bold text-white uppercase tracking-[0.3em] opacity-80 border-b border-white/10 pb-1 flex-1">Starter</h3></div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">${Object.keys(dashboardData.starter).map(code => createMealCard(code, dashboardData.starter[code])).join('')}</div>
            </div>`;
        }

        // C. Second Meal (第二餐)
        if (activeMeals_2.length > 0) {
            contentHtml += `<div class="mb-12">
                <div class="flex items-center gap-4 mb-6"><span class="text-5xl font-thin text-blue-400">02</span><h3 class="text-base font-bold text-white uppercase tracking-[0.3em] opacity-80 border-b border-white/10 pb-1 flex-1">Second Meal</h3></div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">${Object.keys(dashboardData.m2).map(code => createMealCard(code, dashboardData.m2[code])).join('')}</div>
            </div>`;
        }

        // D. Special Meal (特別餐)
        if (Object.keys(dashboardData.spml).length > 0) {
            contentHtml += `<div class="mb-12">
                <div class="flex items-center gap-4 mb-6"><span class="text-5xl font-thin text-purple-400">SP</span><h3 class="text-base font-bold text-white uppercase tracking-[0.3em] opacity-80 border-b border-white/10 pb-1 flex-1">Special</h3></div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">${Object.keys(dashboardData.spml).map(code => createMealCard(code, dashboardData.spml[code])).join('')}</div>
            </div>`;
        }
    }

    // ===== TAB 2: BEVERAGES (飲料頁籤 - 保持不變) =====
    if (currentGalleyTab === 'BEVERAGES') {
        const hasMeal2 = activeMeals_2.length > 0;
        
        contentHtml += `
            <div class="flex justify-center mb-8 pt-2">
                <div class="bg-black/60 backdrop-blur-xl p-1 rounded-xl border border-white/10 inline-flex shadow-xl">
                    <button onclick="window.switchBevSubTab('M1')" 
                            class="px-6 py-2 rounded-lg text-[11px] font-bold tracking-widest transition-all duration-200 flex items-center gap-2
                            ${currentBevSubTab === 'M1' ? 'bg-[#d4b982] text-[#1a1918] shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
                        <i data-lucide="sun" class="w-3.5 h-3.5"></i>
                        <span>1ST MEAL</span>
                    </button>
                    ${hasMeal2 ? `
                    <button onclick="window.switchBevSubTab('M2')" 
                            class="px-6 py-2 rounded-lg text-[11px] font-bold tracking-widest transition-all duration-200 flex items-center gap-2
                            ${currentBevSubTab === 'M2' ? 'bg-blue-400 text-[#1a1918] shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
                        <i data-lucide="moon" class="w-3.5 h-3.5"></i>
                        <span>2ND MEAL</span>
                    </button>` : ''}
                </div>
            </div>
        `;

        const phaseColor = currentBevSubTab === 'M1' ? 'text-[#d4b982]' : 'text-blue-400';
        
        contentHtml += `
            <div class="animate-fade-in-up">
                <div class="flex items-center gap-4 mb-6 border-b border-white/5 pb-2">
                    <h3 class="text-xl font-light text-white tracking-tight flex items-center gap-2">
                        <i data-lucide="${currentBevSubTab === 'M1' ? 'sun' : 'moon'}" class="w-5 h-5 ${phaseColor}"></i>
                        ${currentBevSubTab === 'M1' ? 'First' : 'Second'} Meal Beverages
                    </h3>
                    <div class="flex-1"></div>
                    <span class="text-[10px] font-mono text-gray-500 border border-white/10 px-3 py-1 rounded bg-white/5">FILTER: ${galleySideFilter}</span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        `;

        const bevCategories = Object.keys(dashboardData.beverages);
        const sortOrder = ['Water', 'Soft Drinks', 'Juices & Milks', 'Coffee, Teas & Others', 'Beer', 'Wine', 'Cocktails'];
        bevCategories.sort((a, b) => {
            let idxA = sortOrder.findIndex(k => a.includes(k));
            let idxB = sortOrder.findIndex(k => b.includes(k));
            if(idxA === -1) idxA = 99; if(idxB === -1) idxB = 99;
            return idxA - idxB;
        });

        if (bevCategories.length === 0) {
            contentHtml += `
                <div class="col-span-full py-16 flex flex-col items-center justify-center text-center border border-white/5 rounded-2xl bg-white/[0.02]">
                    <i data-lucide="coffee" class="w-10 h-10 text-gray-600 mb-3 opacity-50"></i>
                    <p class="text-gray-500 font-light text-sm">No beverages ordered.</p>
                </div>`;
        } else {
            bevCategories.forEach(cat => {
                const items = dashboardData.beverages[cat];
                const hasItems = Object.values(items).some(d => (galleySideFilter === 'L' ? d.L : galleySideFilter === 'R' ? d.R : d.total) > 0);
                if (!hasItems) return;

                contentHtml += `
                    <div class="bg-[#1e1e1e] rounded-xl border border-white/10 overflow-hidden shadow-lg h-full flex flex-col">
                        <h4 class="bg-black/30 ${phaseColor} text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-3 border-b border-white/5">
                            ${cat}
                        </h4>
                        <div class="divide-y divide-white/5 flex-1">
                `;

                for (const [key, data] of Object.entries(items)) {
                    let count = 0;
                    if (galleySideFilter === 'ALL') count = data.total;
                    else if (galleySideFilter === 'L') count = data.L;
                    else count = data.R;

                    if (count > 0) {
                        const mealTag = currentBevSubTab; 
                        const stateKey = `galley_${mealTag}_${cat}_${key}`;
                        const isDone = galleyBevDoneState[stateKey];
                        const safeKey = stateKey.replace(/'/g, "\\'"); 

                        const rowClass = isDone ? 'bg-green-900/10' : 'hover:bg-white/[0.04] transition-colors cursor-pointer';
                        const textClass = isDone ? 'text-gray-500 line-through decoration-gray-600' : 'text-gray-200 font-medium';
                        const countClass = isDone ? 'text-gray-600' : 'text-white font-bold';
                        
                        const checkIcon = isDone 
                            ? `<div class="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center text-[#0f172a] shadow-lg scale-100 transition-all"><i data-lucide="check" class="w-3 h-3 stroke-[4]"></i></div>`
                            : `<div class="w-5 h-5 rounded-full border-2 border-gray-600 group-hover:border-[#d4b982] transition-colors bg-white/[0.02]"></div>`;

                        contentHtml += `
                            <div class="flex justify-between items-center px-4 py-3 group select-none transition-all ${rowClass}" onclick="window.toggleGalleyBev('${safeKey}')">
                                <div class="flex-1 pr-4">
                                    <div class="text-sm ${textClass}">${data.name}</div>
                                    ${data.style ? `<div class="text-[10px] text-[#d4b982] font-mono mt-0.5 tracking-wide opacity-80">${data.style}</div>` : ''}
                                </div>
                                <div class="flex items-center gap-4">
                                    <span class="text-xl ${countClass}">${count}</span>
                                    ${checkIcon}
                                </div>
                            </div>
                        `;
                    }
                }
                contentHtml += `</div></div>`;
            });
        }
        contentHtml += `</div></div>`;
    }
    contentHtml += `</div>`; 

    const modal = document.getElementById('galley-modal');
    modal.innerHTML = headerHtml + `
        <div id="galley-scroll-container" class="flex-1 overflow-y-auto bg-gradient-to-br from-[#1a1918] to-[#2d2a26] custom-scrollbar relative">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d4b982]/5 rounded-full blur-[100px] pointer-events-none"></div>
            ${contentHtml}
        </div>
    `;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    const scrollContainer = document.getElementById('galley-scroll-container');
    if (scrollContainer && window._savedGalleyScroll) {
        scrollContainer.scrollTop = window._savedGalleyScroll;
    }

    if (typeof safeRenderIcons === 'function') safeRenderIcons();
}



window.switchBevSubTab = function(tab) {
    currentBevSubTab = tab;
    renderGalleyDashboard(); 
};

// [FIXED] renderPreSelectInputs: Now pre-fills data from existing orders
function renderPreSelectInputs() {
    const grid = document.getElementById('preselect-grid');
    grid.innerHTML = '';
    
    const aircraftType = appElements.aircraftSelect.value;
    const config = AIRCRAFT_CONFIGS[aircraftType];
    const routeId = appElements.routeSelect.value;
    
    const meals1 = MENUS[routeId]?.meal_1 || [];
    const meals2 = MENUS[routeId]?.meal_2 || []; 
    const appetizers = MENUS[routeId]?.appetizers || [];
    
    const routeInfo = ROUTES.find(r => r.id === routeId);
    const isMRoute = routeInfo && routeInfo.type === 'M';
    const isLongHaul = routeInfo && ['L', 'UL'].includes(routeInfo.type);

    if (!config || !meals1.length) return;

    const seatIds = [];
    config.rows.forEach(row => {
        config.seatLetters.forEach(letter => {
             if (aircraftType === 'A350-900' && row === '8' && (letter === 'A' || letter === 'K')) return;
             if (aircraftType === 'A330-900neo') {
                const isEven = parseInt(row) % 2 === 0;
                if (isEven && !['A','E','F','K'].includes(letter)) return;
                if (!isEven && !['C','D','G','H'].includes(letter)) return;
             }
            seatIds.push(`${row}${letter}`);
        });
    });

    seatIds.forEach(seatId => {
        // --- [關鍵修改] 嘗試取得已存在的訂單資料 ---
        const existingOrder = getOrder(seatId); 
        const lastNameVal = existingOrder ? (existingOrder.lastName || '') : '';
        const currentMealCode = existingOrder ? existingOrder.mealCode : '';
        const currentMealCode2 = existingOrder ? existingOrder.mealCode_2 : '';
        const currentApp = existingOrder ? existingOrder.appetizerChoice : '';
        const isSPML = existingOrder ? existingOrder.isSPML : false;
        // ----------------------------------------

        const div = document.createElement('div');
        div.className = 'bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3 transition-all duration-300 hover:border-[#8C5845]/50 hover:shadow-md';
        div.id = `preselect-card-${seatId}`;
        
        const selectClass = "w-full text-[12px] p-2 border border-gray-300 rounded bg-white text-[#424649] outline-none focus:border-[#8C5845] focus:ring-1 focus:ring-[#8C5845]/20";
        const labelClass = "text-[10px] text-gray-500 font-bold uppercase block mb-1";

        // 產生 Meal 1 選項 (如果有值就 selected)
        let meal1Options = `<option value="">-- No Meal --</option>`;
        meals1.forEach(m => { 
            const isSelected = (!isSPML && m.code === currentMealCode) ? 'selected' : '';
            meal1Options += `<option value="${m.code}" ${isSelected}>${m.code}</option>`; 
        });

        // 產生 SPML 選項 (如果有值就 selected)
        let spmlOptions = `<option value="">-- Select SPML --</option>`;
        Object.keys(ICAO_SPML_CODES).forEach(code => {
            const isSelected = (isSPML && code === currentMealCode) ? 'selected' : '';
            spmlOptions += `<option value="${code}" ${isSelected}>${ICAO_SPML_CODES[code]}</option>`;
        });

        let meal2SectionHTML = '';
        if (isLongHaul && meals2.length > 0) {
            let meal2Options = `<option value="">-- No Meal 2 --</option>`;
            meals2.forEach(m => { 
                const isSelected = (!isSPML && m.code === currentMealCode2) ? 'selected' : '';
                meal2Options += `<option value="${m.code}" ${isSelected}>${m.code}</option>`; 
            });
            meal2SectionHTML = `
                <div id="m2-container-${seatId}" class="pt-2 border-t border-dashed border-gray-200">
                    <label class="${labelClass} text-[#85724E]">2nd Meal Choice</label>
                    <select id="preselect-m2-${seatId}" class="${selectClass} border-[#85724E]/30 focus:border-[#85724E]">
                        ${meal2Options}
                    </select>
                </div>
            `;
        }

        let appSectionHTML = '';
        if (isMRoute && appetizers.length > 0) {
            let appOptions = `<option value="">-- No App. --</option>`;
            appetizers.forEach(a => { 
                const isSelected = (!isSPML && a.code === currentApp) ? 'selected' : '';
                appOptions += `<option value="${a.code}" ${isSelected}>${a.code}</option>`; 
            });
            appSectionHTML = `
                <div id="app-container-${seatId}" class="pt-2 border-t border-dashed border-gray-200">
                    <label class="${labelClass} text-[#8C5845]">Pre-Select Appetizer</label>
                    <select id="preselect-app-${seatId}" class="${selectClass} border-[#8C5845]/30 focus:border-[#8C5845]">
                        ${appOptions}
                    </select>
                </div>
            `;
        }

        div.innerHTML = `
            <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-black px-2 py-0.5 rounded bg-[#8C5845]/10 text-[#8C5845] border border-[#8C5845]/20">${seatId}</span>
                <span class="text-[10px] text-gray-400 font-bold uppercase">Online Record</span>
            </div>
            <input type="text" id="preselect-name-${seatId}" class="${selectClass} placeholder-gray-300 font-bold uppercase tracking-wide" placeholder="LAST NAME" value="${lastNameVal}">

            <div class="space-y-3">
                <div id="normal-meal-container-${seatId}">
                    <label class="${labelClass}">1st Meal Choice</label>
                    <select id="preselect-${seatId}" class="${selectClass}">
                        ${meal1Options}
                    </select>
                </div>
                
                ${meal2SectionHTML}
                ${appSectionHTML}

                <div id="spml-container-${seatId}" class="hidden">
                    <div class="flex justify-between items-center mb-1">
                        <label class="${labelClass} text-[#0d1a26]">Special Meal (SPML)</label>
                        <button type="button" onclick="toggleSPMLMode('${seatId}', false)" class="text-[9px] text-[#8C5845] underline hover:text-[#9C6D56]">Back to Normal</button>
                    </div>
                    <select id="preselect-spml-${seatId}" class="${selectClass} border-[#0d1a26]/30 text-[#0d1a26] bg-[#0d1a26]/5">
                        ${spmlOptions}
                    </select>
                </div>

                <button type="button" id="btn-spml-toggle-${seatId}" onclick="toggleSPMLMode('${seatId}', true)" 
                        class="w-full py-1.5 border border-[#0d1a26]/20 text-[#0d1a26] text-[11px] font-bold rounded-lg hover:bg-[#0d1a26]/5 transition-colors flex items-center justify-center gap-1">
                    <i data-lucide="star" class="w-3 h-3"></i> Switch to SPML
                </button>
            </div>
        `;
        grid.appendChild(div);

        // --- [關鍵修改] 如果原本就是 SPML，載入時就要切換顯示狀態 ---
        if (isSPML) {
            // 這裡我們直接呼叫 toggleSPMLMode 來設定 UI 狀態
            // 注意：因為上面 HTML 已經產生並 append 了，所以 toggleSPMLMode 可以抓到元素
            toggleSPMLMode(seatId, true);
        }
    });
    safeRenderIcons();
}

// 控制 SPML 切換的邏輯
window.toggleSPMLMode = function(seatId, isSPML) {
    const normalSelect = document.getElementById(`preselect-${seatId}`);
    const normalContainer = document.getElementById(`normal-meal-container-${seatId}`);
    const spmlContainer = document.getElementById(`spml-container-${seatId}`);
    const spmlSelect = document.getElementById(`preselect-spml-${seatId}`);
    const toggleBtn = document.getElementById(`btn-spml-toggle-${seatId}`);
    
    // 可選容器
    const m2Container = document.getElementById(`m2-container-${seatId}`);
    const appContainer = document.getElementById(`app-container-${seatId}`);
    const card = document.getElementById(`preselect-card-${seatId}`);

    if (isSPML) {
        normalSelect.value = ""; normalSelect.disabled = true;
        normalContainer.classList.add('opacity-40');
        spmlContainer.classList.remove('hidden');
        toggleBtn.classList.add('hidden');
        if (m2Container) m2Container.classList.add('hidden');
        if (appContainer) appContainer.classList.add('hidden');
        card.classList.add('ring-1', 'ring-purple-200', 'bg-purple-50/20');
    } else {
        spmlSelect.value = ""; normalSelect.disabled = false;
        normalContainer.classList.remove('opacity-40');
        spmlContainer.classList.add('hidden');
        toggleBtn.classList.remove('hidden');
        if (m2Container) m2Container.classList.remove('hidden');
        if (appContainer) appContainer.classList.remove('hidden');
        card.classList.remove('ring-1', 'ring-purple-200', 'bg-purple-50/20');
    }
};
// [FIXED] handleSaveInventory - 修正無法關閉視窗的問題 (清除 Inline Style)
function handleSaveInventory() {
    flightNumber = appElements.flightNumberInput.value.trim().toUpperCase();
    currentAircraftType = appElements.aircraftSelect.value;
    currentRoute = appElements.routeSelect.value;

    if (!flightNumber) { showMessage('Flight Number is required.', true); return; }
    
    activeAircraftConfig = AIRCRAFT_CONFIGS[currentAircraftType];
    const routeMenus = MENUS[currentRoute] || { meal_1: [], meal_2: [] };
    activeMeals_1 = routeMenus.meal_1 || [];
    activeMeals_2 = routeMenus.meal_2 || [];
    
    // 處理走道顯示控制
    if (activeAircraftConfig.seatLetters.length > 2) {
        appElements.aisleViewControls.classList.remove('hidden');
    } else {
        appElements.aisleViewControls.classList.add('hidden');
    }
    setAisleView('ALL');

    // 建立座位 ID 列表
    let seatIds = [];
    activeAircraftConfig.rows.forEach(row => {
        activeAircraftConfig.seatLetters.forEach(letter => {
             if (currentAircraftType === 'A350-900' && row === '8' && (letter === 'A' || letter === 'K')) return;
             if (currentAircraftType === 'A330-900neo') {
                const isEven = parseInt(row) % 2 === 0;
                if (isEven && !['A','E','F','K'].includes(letter)) return;
                if (!isEven && !['C','D','G','H'].includes(letter)) return;
             }
             seatIds.push(`${row}${letter}`);
        });
    });

    // 初始化訂單
    orders = seatIds.map(createInitialOrder);

    // 讀取預選資料
    orders.forEach(order => {
        const nameEl = document.getElementById(`preselect-name-${order.id}`);
        const mainMealEl = document.getElementById(`preselect-${order.id}`);
        const spmlEl = document.getElementById(`preselect-spml-${order.id}`);
        const appSelectEl = document.getElementById(`preselect-app-${order.id}`);
        const m2SelectEl = document.getElementById(`preselect-m2-${order.id}`);

        if (nameEl && nameEl.value.trim()) {
            order.lastName = nameEl.value.trim().toUpperCase();
            order.status = 'ORDERED';
        }

        if (spmlEl && spmlEl.value) {
            order.status = 'ORDERED';
            order.isSPML = true;
            order.mealCode = spmlEl.value;
            order.mealName = 'Special Meal';
            if (activeMeals_2.length > 0) {
                order.isSPML_2 = true;
                order.mealCode_2 = spmlEl.value;
                order.mealName_2 = 'Special Meal';
            }
        } else if (mainMealEl && mainMealEl.value) {
            order.status = 'ORDERED';
            order.mealCode = mainMealEl.value;
            const mealData = activeMeals_1.find(m => m.code === mainMealEl.value);
            order.mealName = mealData ? mealData.name : 'N/A';
            order.isPreSelect = true; 
        }

        if (appSelectEl && appSelectEl.value) {
            order.appetizerChoice = appSelectEl.value;
            order.isAppetizerPreSelect = true;
            if (order.status === 'PENDING') order.status = 'ORDERED';
        }
        if (m2SelectEl && m2SelectEl.value && !order.isSPML) {
            order.mealCode_2 = m2SelectEl.value;
            const mealData = activeMeals_2.find(m => m.code === m2SelectEl.value);
            order.mealName_2 = mealData ? mealData.name : 'N/A';
            order.isMeal2PreSelect = true;
            if (order.status === 'PENDING') order.status = 'ORDERED';
        }
    });

    // 讀取庫存 (加入 null check 防止當機)
    let allValid = true;
    mealInventory_1 = {};
    activeMeals_1.forEach(meal => {
        const input = document.getElementById(`qty-1-${meal.code}`);
        if (input) {
            const value = parseInt(input.value, 10);
            if (isNaN(value) || value < 0) allValid = false;
            mealInventory_1[meal.code] = value;
        }
    });
    
    mealInventory_2 = {};
    activeMeals_2.forEach(meal => {
        const input = document.getElementById(`qty-2-${meal.code}`);
        if (input) {
            const value = parseInt(input.value, 10);
            if (isNaN(value) || value < 0) allValid = false;
            mealInventory_2[meal.code] = value;
        }
    });

    appetizerInventory = {};
    const routeMenusApp = MENUS[currentRoute] || { appetizers: [] };
    const activeAppetizers = routeMenusApp.appetizers || [];
    activeAppetizers.forEach(app => {
        const input = document.getElementById(`qty-appetizer-${app.code}`);
        if (input) {
            const value = parseInt(input.value, 10);
            if (isNaN(value) || value < 0) allValid = false;
            appetizerInventory[app.code] = value;
        }
    });

   if (allValid) {
        appElements.displayFlightNo.textContent = flightNumber;

        // --- [改用工具函式] ---
        hideModal(appElements.inventoryModal);
        // ---------------------

        if (appElements.editInventoryBtn) appElements.editInventoryBtn.classList.remove('hidden');
        ['seatLayoutContainer', 'summarySection', 'controlPanel'].forEach(el => appElements[el].classList.remove('hidden'));
        
        if (!audioCtx) {
            try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
        }
        
        renderSeatLayout();
        saveSystemState(); 
        showMessage('Setup Confirmed! System ready.', false);
    } else { 
        showMessage("Invalid quantities. Check numbers.", true); 
    }
}

function toggleMealBeverageVisibility() {
    const selectedStatus = document.querySelector('input[name="service-status"]:checked').value;
    const isMealStatus = selectedStatus === 'ORDERED' || selectedStatus === 'DELAYED' || selectedStatus === 'DND';
    appElements.mealBeverageSelection.classList.toggle('hidden', !isMealStatus);
    appElements.delayTimeInputContainer.classList.toggle('hidden', selectedStatus !== 'DELAYED');
}


// [Fix] setupMealOptions - 解決長菜名跑版問題 (自動換行)
function setupMealOptions(container, mealList, inventory, radioName, currentMealCode, orderStatus) {
    container.innerHTML = '';
    
    mealList.forEach(meal => {
        // 計算庫存邏輯 (保持不變)
        const totalOrdered = orders.filter(o => 
            ((radioName === 'meal_1' && o.mealCode === meal.code) || 
             (radioName === 'meal_2' && o.mealCode_2 === meal.code)) &&
            (o.status === 'ORDERED' || o.status === 'DELAYED') &&
            !o.isPreSelect && !o.isMeal2PreSelect &&
            !o.isSPML && !o.isSPML_2
        ).length;
        
        const remaining = (inventory[meal.code] || 0) - totalOrdered;
        const isCurrentlySelected = meal.code === currentMealCode;
        const isDisabled = remaining <= 0 && !isCurrentlySelected;

        const label = document.createElement('label');
        // [關鍵修改] items-center -> items-start: 讓圓點對齊第一行，避免多行時跑版
        label.className = `flex items-start p-3 border rounded-lg transition cursor-pointer shadow-sm ${isDisabled ? 'disabled-option bg-gray-100' : 'hover:bg-gray-50'}`;
        
        const qtyDisplay = remaining <= 0 && !isCurrentlySelected 
            ? `<span class="font-bold text-red-500">0</span>` 
            : `<span class="font-bold text-green-600">${remaining}</span>`;

        label.innerHTML = `
            <div class="flex items-center h-5 mt-0.5"> <input type="radio" name="${radioName}" value="${meal.code}" class="form-radio h-5 w-5 text-amber-500" ${isDisabled ? 'disabled' : ''}>
            </div>
            <div class="ml-3 flex-1 min-w-0"> <span class="block font-medium ${isDisabled ? 'text-gray-500' : 'text-gray-800'} whitespace-normal break-words leading-tight">
                    ${meal.code} - ${meal.name} (Qty: ${qtyDisplay})
                </span>
                <span class="text-xs text-gray-500 block mt-0.5 whitespace-normal break-words leading-tight">
                    ${meal.chinese}
                </span>
            </div>`;
        container.appendChild(label);
    });

    // "NO MEAL" 選項
    const noMealLabel = document.createElement('label');
    noMealLabel.className = 'flex items-center p-3 border rounded-lg transition cursor-pointer shadow-sm hover:bg-gray-50';
    noMealLabel.innerHTML = `
        <input type="radio" name="${radioName}" value="NO MEAL" class="form-radio h-5 w-5 text-gray-500">
        <span class="ml-3 font-medium text-gray-800">NO MEAL (不需主餐)</span>
    `;
    container.appendChild(noMealLabel);
    
    // 恢復選取狀態
    if (currentMealCode === 'NO MEAL') {
        noMealLabel.querySelector('input').checked = true;
    }
    const existingRadio = container.querySelector(`input[name="${radioName}"][value="${currentMealCode}"]`);
    if (existingRadio) {
        existingRadio.checked = true;
    }
}

// [FIXED] setupBeverageOptions - 補回 class 標記，解決 "+Lemon" 等客製選項無法存檔的問題
function setupBeverageOptions(container, selectedBeverages = [], checkboxName = 'beverage') {
    container.innerHTML = '';

    // --- 1. 定義資料結構 ---
    const FILTERS = [
        { id: 'ALL', label: 'All', categories: 'ALL' },
        { id: 'SOFT', label: 'Soft & Juice', categories: ['WATER', 'Mocktails (Non-alcoholic)', 'Soda & Soft Dr.', 'Juices & Milks'] },
        { id: 'COFFEE', label: 'Coffee & Tea', categories: ['Coffee, Teas & Others', 'STARLUX Limited'] },
        { id: 'ALCOHOL', label: 'Alcohol', categories: ['Specialty Cocktails', 'Cocktails', 'Champagne & White Wine', 'Red Wine & Port', 'Whisky', 'Spirits & Liqueurs', 'Beer'] }
    ];

    const STYLE_MAP = {
        'ice': ['Normal', 'Less Ice', 'No Ice', 'Warm','+Lemon','Ice+Lemon','Less Ice + Lemon','No Ice + Lemon','Warm with Lemon' ],
        'temp': ['Hot', 'Iced','Warm','Hot With Milk', 'Hot With Sugar', 'Hot With Milk & Sugar','Iced With Milk', 'Iced With Sugar', 'Iced With Milk & Sugar'],
        'whisky': ['Neat', 'On the Rocks', 'Water Splash','Mizuwali'],
        'soda_ice': ['Normal', 'Less Ice', 'No Ice','with Lemon','Less Ice + Lemon','No Ice + Lemon'],
        'juice': ['Normal','With Ice', 'Less Ice', 'No Ice']
    };

    const GROUP_STRUCTURE = [
        { title: 'SOFT DRINKS & COFFEE', icon: 'coffee', categories: ['WATER', 'Mocktails (Non-alcoholic)', 'Soda & Soft Dr.', 'Juices & Milks', 'Coffee, Teas & Others', 'STARLUX Limited'] },
        { title: 'WINE & COCKTAILS', icon: 'wine', categories: ['Specialty Cocktails', 'Cocktails', 'Champagne & White Wine', 'Red Wine & Port', 'Whisky', 'Spirits & Liqueurs', 'Beer'] }
    ];

    // --- 2. 建立 UI 骨架 ---
    const filterContainer = document.createElement('div');
    filterContainer.className = 'flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide border-b border-gray-100';

    const splitViewContainer = document.createElement('div');
    splitViewContainer.className = 'flex flex-row h-[450px] border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm';

    const leftMenu = document.createElement('div');
    leftMenu.className = 'w-1/3 bg-slate-50 border-r border-gray-200 overflow-y-auto custom-scrollbar flex flex-col';

    const rightContent = document.createElement('div');
    rightContent.className = 'w-2/3 bg-white overflow-y-auto custom-scrollbar relative';

    let activeFilter = 'ALL';
    const leftMenuButtons = {};
    const rightPanels = {};

    // --- 3. 核心邏輯：預先渲染所有內容 ---
    const allCategories = Object.keys(BEVERAGE_CATEGORIES);
    
    allCategories.forEach(category => {
        const panel = document.createElement('div');
        panel.className = 'p-4 hidden';
        panel.id = `panel-${category.replace(/\s+/g, '-')}`;
        
        const header = document.createElement('div');
        header.className = 'flex items-center justify-between mb-4 pb-2 border-b border-gray-100';
        header.innerHTML = `<h4 class="text-base font-black text-slate-700">${category}</h4>`;
        panel.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 gap-3';

        BEVERAGE_CATEGORIES[category].forEach(bev => {
            const existing = selectedBeverages.find(b => b.name === bev.full);
            const isChecked = !!existing;
            const options = bev.type ? STYLE_MAP[bev.type] : null;

            const card = document.createElement('div');
            // [關鍵修正] 這裡加上了 'beverage-item-card' class，讓存檔功能找得到它
            const baseCardClass = "beverage-item-card relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer group";
            const checkedCardClass = "border-amber-500 bg-amber-50 shadow-sm";
            const uncheckedCardClass = "border-gray-100 hover:border-amber-200 hover:bg-gray-50";

            card.className = `${baseCardClass} ${isChecked ? checkedCardClass : uncheckedCardClass}`;

            let html = `
                <label class="flex items-center w-full cursor-pointer pointer-events-none">
                    <div class="relative flex items-center justify-center h-5 w-5 shrink-0">
                        <input type="checkbox" name="${checkboxName}" value="${bev.full}" 
                               class="peer appearance-none h-5 w-5 border-2 border-gray-300 rounded checked:bg-amber-500 checked:border-amber-500 transition-colors pointer-events-auto" 
                               ${isChecked ? 'checked' : ''}>
                        <i data-lucide="check" class="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none"></i>
                    </div>
                    <div class="ml-3 flex-1 flex flex-col justify-center min-h-[24px]">
                        <span class="font-bold block text-gray-700 text-sm leading-tight group-hover:text-amber-800 transition-colors">${bev.full}</span>
                    </div>
                </label>
            `;

            if (options) {
                const savedStyle = existing ? existing.style : '';
                const selectHideClass = isChecked ? '' : 'hidden';
                let optionsHtml = options.map(opt => 
                    `<option value="${opt}" ${opt === savedStyle ? 'selected' : ''}>${opt}</option>`
                ).join('');
                
                html += `
                    <div class="mt-2 pl-8 style-container ${selectHideClass}">
                        <select class="beverage-style-select w-full p-1.5 text-xs font-medium border border-gray-300 rounded bg-white text-gray-700 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20" onclick="event.stopPropagation()">
                            ${optionsHtml}
                        </select>
                    </div>
                `;
            }

            card.innerHTML = html;
            
            card.onclick = (e) => {
                if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
                const checkbox = card.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            };

            grid.appendChild(card);

            const checkbox = card.querySelector('input[type="checkbox"]');
            const styleContainer = card.querySelector('.style-container');
            
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    card.className = `${baseCardClass} ${checkedCardClass}`;
                    if (styleContainer) {
                        styleContainer.classList.remove('hidden');
                        styleContainer.animate([{opacity: 0, transform: 'translateY(-5px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 200});
                    }
                } else {
                    card.className = `${baseCardClass} ${uncheckedCardClass}`;
                    if (styleContainer) styleContainer.classList.add('hidden');
                }
                updateLeftMenuBadge(category);
            });
        });

        panel.appendChild(grid);
        rightContent.appendChild(panel);
        rightPanels[category] = panel;
    });

    // --- 4. 更新左側計數球 ---
    const updateLeftMenuBadge = (category) => {
        const btn = leftMenuButtons[category];
        if (!btn) return;
        const panel = rightPanels[category];
        const count = panel.querySelectorAll('input[type="checkbox"]:checked').length;
        const badge = btn.querySelector('.badge');
        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove('scale-0');
        } else {
            badge.classList.add('scale-0');
        }
    };

    // --- 5. 渲染左側選單 ---
    const renderLeftMenu = () => {
        leftMenu.innerHTML = '';
        let firstVisibleCategory = null;

        GROUP_STRUCTURE.forEach(group => {
            const visibleCategories = group.categories.filter(cat => {
                if (activeFilter === 'ALL') return true;
                const filterDef = FILTERS.find(f => f.id === activeFilter);
                return filterDef.categories.includes(cat);
            });

            if (visibleCategories.length === 0) return;

            const groupTitle = document.createElement('div');
            groupTitle.className = 'px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 border-y border-gray-200 sticky top-0 z-10';
            groupTitle.innerHTML = `<i data-lucide="${group.icon}" class="inline w-3 h-3 mr-1.5 relative -top-px"></i>${group.title}`;
            leftMenu.appendChild(groupTitle);

            visibleCategories.forEach(cat => {
                if (!firstVisibleCategory) firstVisibleCategory = cat;

                const btn = document.createElement('button');
                btn.className = `w-full text-left px-4 py-3.5 text-sm font-bold border-l-4 transition-all relative flex justify-between items-center group
                    ${'border-transparent text-gray-500 hover:bg-white hover:text-gray-700'}`;
                
                btn.innerHTML = `
                    <span class="group-hover:translate-x-1 transition-transform duration-200">${cat}</span>
                    <span class="badge bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm transition-transform duration-200 scale-0">0</span>
                `;

                btn.onclick = () => switchCategory(cat);

                leftMenuButtons[cat] = btn;
                leftMenu.appendChild(btn);
                setTimeout(() => updateLeftMenuBadge(cat), 0);
            });
        });
        return firstVisibleCategory;
    };

    // --- 6. 切換顯示分類 ---
    let currentActiveCategory = null;
    const switchCategory = (category) => {
        if (currentActiveCategory && leftMenuButtons[currentActiveCategory]) {
            const prevBtn = leftMenuButtons[currentActiveCategory];
            prevBtn.className = prevBtn.className.replace('bg-white text-amber-700 border-amber-500 shadow-sm', 'border-transparent text-gray-500 hover:bg-white hover:text-gray-700');
        }
        
        if (leftMenuButtons[category]) {
            const nextBtn = leftMenuButtons[category];
            nextBtn.className = nextBtn.className.replace('border-transparent text-gray-500 hover:bg-white hover:text-gray-700', 'bg-white text-amber-700 border-amber-500 shadow-sm');
            nextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        Object.values(rightPanels).forEach(p => p.classList.add('hidden'));
        if (rightPanels[category]) {
            rightPanels[category].classList.remove('hidden');
            rightContent.scrollTop = 0;
            if (typeof safeRenderIcons === 'function') safeRenderIcons();
        }
        currentActiveCategory = category;
    };

    // --- 7. 渲染頂部過濾器 ---
    FILTERS.forEach(filter => {
        const btn = document.createElement('button');
        const isActive = filter.id === 'ALL';
        const baseClass = "px-4 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap snap-start";
        const activeClass = "bg-amber-600 text-white border-amber-600 shadow-md transform scale-105";
        const inactiveClass = "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300";

        btn.className = `${baseClass} ${isActive ? activeClass : inactiveClass}`;
        btn.textContent = filter.label;

        btn.onclick = (e) => {
            e.preventDefault();
            Array.from(filterContainer.children).forEach(b => b.className = `${baseClass} ${inactiveClass}`);
            btn.className = `${baseClass} ${activeClass}`;
            
            activeFilter = filter.id;
            const firstCat = renderLeftMenu();
            if (firstCat) switchCategory(firstCat);
            if (typeof safeRenderIcons === 'function') safeRenderIcons();
        };
        filterContainer.appendChild(btn);
    });

    splitViewContainer.appendChild(leftMenu);
    splitViewContainer.appendChild(rightContent);
    container.appendChild(filterContainer);
    container.appendChild(splitViewContainer);

    const initialCat = renderLeftMenu();
    if (initialCat) switchCategory(initialCat);
    setTimeout(() => { if (typeof safeRenderIcons === 'function') safeRenderIcons(); }, 50);
}

// [修正版] openOrderModal: 修正 Cancel 後無法 Close Service 的問題
function openOrderModal(seatId) {
    isSummaryExpanded = false; // 🔥 [新增這行] 每次開啟視窗都重置為「精簡模式」
    currentSeatId = seatId;
    const order = getOrder(seatId);
    appElements.modalSeatIdDisplay.textContent = seatId;
    appElements.orderModal.classList.replace('hidden', 'flex');
   
    
    const show = (el, visible) => el.classList.toggle('hidden', !visible);
    
    // 取得航線資訊
    const routeInfo = ROUTES.find(r => r.id === currentRoute);
    const isSSRoute = routeInfo && routeInfo.type === 'SS';
    const isMRoute = routeInfo && routeInfo.type === 'M';
    const isLongHaul = routeInfo && ['L', 'UL'].includes(routeInfo.type); // 定義長程線邏輯

    appElements.orderTabContent1.innerHTML = '';
    appElements.orderTabContent2.innerHTML = '';
    
    // (Restoring elements...)
    appElements.orderTabContent1.appendChild(appElements.spmlSection);
    appElements.orderTabContent1.appendChild(appElements.mealOptionsWrapper);
    appElements.orderTabContent1.appendChild(appElements.dessertDisplay);
    appElements.orderTabContent1.appendChild(appElements.beverageOptionsWrapper);
    appElements.orderTabContent2.appendChild(appElements.spmlSection2);
    appElements.orderTabContent2.appendChild(appElements.mealOptionsWrapper2);
    appElements.orderTabContent2.appendChild(appElements.beverageOptionsWrapper2);

    const isFullOrderMode = currentMode === MODES.ORDER_MODE || order.status === 'DND' || order.status === 'PENDING';
    
    // 判定是否應該有甜點按鈕
    let hasSeparateDessertButton = false;
    if (order.isSPML) {
        hasSeparateDessertButton = !isSSRoute;
    } else {
        const m = getMeal1(order.mealCode);
        hasSeparateDessertButton = m && m.dessert && m.dessert !== 'ONE TRAY SERVICE';
    }

    // 🔥 [修正重點] 檢查服務是否完成 (加入 Cancelled 判斷)
    
    // 1. 餐點與甜點 (只要是 Served / Skipped / Cancelled 其中之一就算完成)
    const isMeal1Done = order.mealServed || order.mealSkipped || order.mealCancelled;
    
    // 判斷是否需要前菜
    const needsAppetizer = isLongHaul || (isMRoute && order.appetizerChoice);
    const isAppetizerDone = !needsAppetizer || (order.appetizerServed || order.appetizerSkipped || order.appetizerCancelled);

    // 判斷是否需要湯品
    const needsSoup = isLongHaul;
    const isSoupDone = !needsSoup || (order.soupServed || order.soupSkipped || order.soupCancelled);

    // 判斷甜點
    const isDessertDone = !hasSeparateDessertButton || (order.dessertServed || order.dessertSkipped || order.dessertCancelled);

    // 2. 飲料 (過濾掉已 Served / Skipped / Cancelled 的，必須全部清空才算完成)
    const allBeveragesDone = order.beverages.filter(b => !b.served && !b.skipped && !b.cancelled).length === 0;
    
    // 3. 第二餐與附餐
    const isMeal2Done = !isLongHaul || (order.mealServed_2 || order.mealSkipped_2 || order.mealCancelled_2);
    
    const m2Code = order.mealCode_2 || '';
    const isCongee = m2Code.includes('CON') || m2Code.includes('MCF') || (order.mealName_2 && order.mealName_2.toUpperCase().includes('CONGEE'));
    
    const isYogurtDone = !isLongHaul || isCongee || (order.yogurtServed || order.yogurtSkipped || order.yogurtCancelled);
    const isFruitDone = !isLongHaul || (order.fruitServed || order.fruitSkipped || order.fruitCancelled);
    
    const allBeveragesDone_2 = (order.beverages_2 || []).filter(b => !b.served && !b.skipped && !b.cancelled).length === 0;
    
    // 最終判斷
    const isServiceComplete = 
        order.status !== 'PENDING' &&
        isMeal1Done && 
        isAppetizerDone && 
        isSoupDone && 
        isDessertDone && 
        allBeveragesDone &&
        isMeal2Done && 
        isYogurtDone && 
        isFruitDone && 
        allBeveragesDone_2;

    show(appElements.passengerInfoSection, isFullOrderMode);
    show(appElements.serviceStatusSection, isFullOrderMode);
    show(appElements.closeServiceContainer, !isFullOrderMode && isServiceComplete && !order.serviceClosed);
    show(appElements.mealBeverageSelection, true);

   if (!isFullOrderMode && isServiceComplete) {
    // 情況 A: 服務已完全結束 (顯示 Summary 並允許更新資訊)
    show(appElements.orderPhaseTabs, false);
    show(appElements.orderTabContent1, true);
    appElements.orderTabContent1.innerHTML = renderServiceSummary(order);
    
    show(appElements.submitOrderBtn, true);
    appElements.submitOrderBtn.textContent = "Update Info / Save Remarks";
    appElements.submitOrderBtn.classList.replace('bg-amber-500', 'bg-slate-600');
    
    show(appElements.serviceModeActions, false); // 隱藏加點按鈕

} else if (!isFullOrderMode && !isServiceComplete) {
    // 情況 B: 服務進行中 (即你截圖中的畫面)
    show(appElements.orderPhaseTabs, false);
    show(appElements.orderTabContent1, true);
    appElements.orderTabContent1.innerHTML = renderServiceSummary(order);
    
    // 【關鍵修改】：讓存檔按鈕也顯示出來
    show(appElements.submitOrderBtn, true); 
    appElements.submitOrderBtn.textContent = "Save Changes / Update Info";
    // 建議換個顏色區分，例如使用深灰色
    appElements.submitOrderBtn.classList.add('bg-slate-600', 'mt-2'); 
    
    // 原有的加點飲料區域繼續保持顯示
    show(appElements.serviceModeActions, true);
    appElements.serviceModeActions.classList.replace('hidden', 'grid');

    } else {
    
        
        // ... (原本的 Order Mode 邏輯保持不變) ...
        // (Order Mode setup)
        show(appElements.orderPhaseTabs, isLongHaul);
        appElements.orderTab1.classList.add('active');
        appElements.orderTab2.classList.remove('active');
        show(appElements.orderTabContent1, true);
        show(appElements.orderTabContent2, false);

        appElements.remarkInput.value = order.remark || '';
        
        appElements.spmlCheckbox.checked = order.isSPML;
        show(appElements.spmlInputContainer, order.isSPML);
        show(appElements.mealOptionsWrapper, !order.isSPML);
        if(order.isSPML) {
            const spmlCode = order.mealCode;
            if(ICAO_SPML_CODES[spmlCode]) {
                appElements.spmlSelect.value = spmlCode;
                show(appElements.spmlInputOther, false);
            } else {
                appElements.spmlSelect.value = 'OTHER';
                appElements.spmlInputOther.value = spmlCode;
                show(appElements.spmlInputOther, true);
            }
        } else {
            appElements.spmlSelect.value = 'AVML'; 
            show(appElements.spmlInputOther, false);
        }

        appElements.spmlCheckbox2.checked = order.isSPML_2;
        show(appElements.spmlInputContainer2, order.isSPML_2);
        show(appElements.mealOptionsWrapper2, !order.isSPML_2);
        if(order.isSPML_2) {
            const spmlCode2 = order.mealCode_2;
            if(ICAO_SPML_CODES[spmlCode2]) {
                appElements.spmlSelect2.value = spmlCode2;
                show(appElements.spmlInputOther2, false);
            } else {
                appElements.spmlSelect2.value = 'OTHER';
                appElements.spmlInputOther2.value = spmlCode2;
                show(appElements.spmlInputOther2, true);
            }
        } else {
            appElements.spmlSelect2.value = 'AVML'; 
            show(appElements.spmlInputOther2, false);
        }
        
        syncSPML(order.isSPML);

        const statusRadio = document.querySelector(`input[name="service-status"][value="${order.status}"]`);
        if (statusRadio) statusRadio.checked = true;
        toggleMealBeverageVisibility();
        appElements.titleSelect.innerHTML = TITLES.map(t => `<option value="${t}">${t}</option>`).join('');
        appElements.titleSelect.value = order.title;
        appElements.lastNameInput.value = order.lastName;
        appElements.delayTimeSelect.value = order.delayDuration || '30';
        
        setupMealOptions(appElements.mealOptionsContainer, activeMeals_1, mealInventory_1, 'meal_1', order.mealCode, order.status);
        setupBeverageOptions(appElements.beverageOptionsContainer, order.beverages, 'beverage_1');

        // Appetizer Logic
        const activeAppetizers = MENUS[currentRoute]?.appetizers || [];
        let appContainer = document.getElementById('appetizer-options-container');
        if (!appContainer) { 
            appContainer = document.createElement('div');
            appContainer.id = 'appetizer-options-container';
            appContainer.className = 'mt-4 border-t pt-4 mb-4 hidden';
            appElements.mealOptionsWrapper.appendChild(appContainer);
        }

        if (isMRoute && activeAppetizers.length > 0 && !order.isSPML) {
            appContainer.classList.remove('hidden');
            appContainer.innerHTML = `<label class="block text-lg font-semibold text-gray-700 mb-2">Appetizer (前菜)</label>`;
            const listContainer = document.createElement('div');
            listContainer.className = 'space-y-3';
            
            activeAppetizers.forEach(app => {
                const totalOrdered = orders.filter(o => o.appetizerChoice === app.code && !o.isAppetizerPreSelect).length;
                const remaining = (appetizerInventory[app.code] || 0) - totalOrdered;
                const isSelected = order.appetizerChoice === app.code;
                const isDisabled = remaining <= 0 && !isSelected;

                const label = document.createElement('label');
                label.className = `flex items-center p-3 border rounded-lg transition cursor-pointer shadow-sm ${isDisabled ? 'disabled-option bg-gray-100' : 'hover:bg-gray-50'}`;
                label.innerHTML = `
                    <input type="radio" name="appetizer_choice" value="${app.code}" class="form-radio h-5 w-5 text-amber-500" ${isDisabled ? 'disabled' : ''} ${isSelected ? 'checked' : ''}>
                    <span class="ml-3 font-medium ${isDisabled ? 'text-gray-500' : 'text-gray-800'}">
                        ${app.code} - ${app.name} (Qty: <span class="font-bold ${remaining <= 0 && !isSelected ? 'text-red-500' : 'text-green-600'}">${remaining}</span>)
                        <span class="text-xs text-gray-500 block">(${app.chinese})</span>
                    </span>
                `;
                listContainer.appendChild(label);
            });
            
            const noAppLabel = document.createElement('label');
            noAppLabel.className = 'flex items-center p-3 border rounded-lg transition cursor-pointer shadow-sm hover:bg-gray-50';
            noAppLabel.innerHTML = `
                <input type="radio" name="appetizer_choice" value="" class="form-radio h-5 w-5 text-gray-500" ${!order.appetizerChoice ? 'checked' : ''}>
                <span class="ml-3 font-medium text-gray-800">None / Default (不需前菜/預設)</span>
            `;
            listContainer.appendChild(noAppLabel);
            appContainer.appendChild(listContainer);
        } else {
            appContainer.classList.add('hidden');
        }

        if (isLongHaul) {
            setupMealOptions(appElements.mealOptionsContainer2, activeMeals_2, mealInventory_2, 'meal_2', order.mealCode_2, order.status);
            setupBeverageOptions(appElements.beverageOptionsContainer2, order.beverages_2, 'beverage_2');
            show(appElements.beverageOptionsWrapper2, true);
        } else {
            show(appElements.beverageOptionsWrapper2, false);
        }

        appElements.remarkTagsContainer.innerHTML = '';
        Object.keys(TAGS).forEach(tagId => {
            const tag = TAGS[tagId];
            const btn = document.createElement('button');
            btn.className = `tag-btn flex items-center gap-1.5 px-3 py-1 border rounded-full text-sm font-medium ${order.tags.includes(tagId) ? 'selected' : 'bg-gray-100'}`;
            btn.dataset.tagId = tagId;
            btn.innerHTML = `<i data-lucide="${tag.icon}" class="w-5 h-5"></i> ${tag.label}`;
            btn.onclick = () => {
                btn.classList.toggle('selected');
                btn.classList.toggle('bg-gray-100');
            };
            appElements.remarkTagsContainer.appendChild(btn);
        });
        safeRenderIcons();
        appElements.submitOrderBtn.textContent = 'Confirm Order';
        show(appElements.submitOrderBtn, true);
        appElements.orderModal.querySelector('.bg-white').scrollTop = 0;
    }
}

function closeModal() {
    appElements.orderModal.classList.replace('flex', 'hidden');
    currentSeatId = null;
}

// [NEW] Helper function to get SPML code from inputs
function getSPMLCode(selectEl, inputEl) {
    const selected = selectEl.value;
    if (selected === 'OTHER') {
        return inputEl.value.trim().toUpperCase();
    }
    return selected;
}

// [NEW] Helper function to sync SPML 1 to SPML 2
function syncSPML(isSPML) {
    const show = (el, visible) => el.classList.toggle('hidden', !visible);
    
    appElements.spmlCheckbox2.checked = isSPML;
    appElements.spmlCheckbox2.disabled = isSPML;
    
    show(appElements.spmlInputContainer2, isSPML);
    show(appElements.mealOptionsWrapper2, !isSPML);

    if(isSPML) {
        const spmlCode = getSPMLCode(appElements.spmlSelect, appElements.spmlInputOther);
        if(ICAO_SPML_CODES[spmlCode]) {
            appElements.spmlSelect2.value = spmlCode;
            show(appElements.spmlInputOther2, false);
        } else {
            appElements.spmlSelect2.value = 'OTHER';
            appElements.spmlInputOther2.value = spmlCode;
            show(appElements.spmlInputOther2, true);
        }
        appElements.spmlSelect2.disabled = true;
        appElements.spmlInputOther2.disabled = true;
    } else {
        appElements.spmlSelect2.disabled = false;
        appElements.spmlInputOther2.disabled = false;
    }
}

/**
 * 完整修正版 handleSubmitOrder
 * 解決：Service Mode 備註存檔、長程線判斷、SPML 同步邏輯
 */
function handleSubmitOrder() {
    // 1. 取得當前操作的訂單對象
    const orderToUpdate = getOrder(currentSeatId);
    if (!orderToUpdate) {
        showMessage('Error: No seat selected.', true);
        closeModal();
        return;
    }

    // 2. 取得航線與模式判定 (統一判定標準)
    const routeInfo = ROUTES.find(r => r.id === currentRoute);
    const isMRoute = routeInfo && routeInfo.type === 'M';
    const isLongHaul = activeMeals_2.length > 0; // 以是否有第二餐清單作為長程判定

    // ============================================================
    // 3. 通用資訊儲存 (無論什麼模式，只要打開視窗點確認，就更新這些)
    // ============================================================
    
    // 儲存文字備註 (Remark)
    if (appElements.remarkInput) {
        orderToUpdate.remark = appElements.remarkInput.value;
    }

    // 儲存稱謂與姓氏 (Title & Last Name)
    if (appElements.lastNameInput && appElements.lastNameInput.value.trim()) {
        orderToUpdate.lastName = appElements.lastNameInput.value.trim().toUpperCase();
        orderToUpdate.title = appElements.titleSelect.value;
    }

    // 儲存標籤 (Tags)
    if (appElements.remarkTagsContainer) {
        const selectedTags = Array.from(appElements.remarkTagsContainer.querySelectorAll('.tag-btn.selected'));
        orderToUpdate.tags = selectedTags.map(btn => btn.dataset.tagId);
    }

    // ============================================================
    // 4. 模式分流處理
    // ============================================================

    if (currentMode === MODES.SERVICE_MODE) {
        /**
         * 【SERVICE MODE 邏輯】
         * 主要處理：加點飲料、修改旅客資訊/備註
         */
        const btnText = appElements.submitOrderBtn.textContent;

        // 如果按鈕顯示為 "Add Beverage"，代表使用者是在「服務中加點」
        if (btnText.includes('Add Beverage')) {
            const getNewBevs = (container, checkboxName) => {
                if (!container) return [];
                return Array.from(container.querySelectorAll(`input[name="${checkboxName}"]:checked`)).map(node => {
                    const card = node.closest('.beverage-item-card');
                    const styleSelect = card ? card.querySelector('.beverage-style-select') : null;
                    return {
                        name: node.value,
                        style: (styleSelect && !styleSelect.classList.contains('hidden')) ? styleSelect.value : 'Normal',
                        served: false,
                        skipped: false,
                        cancelled: false
                    };
                });
            };

            const phase = currentServicePhase; // 根據目前服務階段決定加在 M1 還是 M2
            if (phase === 'MEAL_1') {
                const newBevs = getNewBevs(appElements.beverageOptionsContainer, 'beverage_1');
                orderToUpdate.beverages.push(...newBevs);
            } else {
                const newBevs = getNewBevs(appElements.beverageOptionsContainer2, 'beverage_2');
                if (!orderToUpdate.beverages_2) orderToUpdate.beverages_2 = [];
                orderToUpdate.beverages_2.push(...newBevs);
            }
            showMessage(`Added beverages to ${orderToUpdate.id}`, false);
        } else {
            // 純修改備註或資訊
            showMessage('Passenger info updated.', false);
        }

    } else {
        /**
         * 【ORDER MODE 邏輯】
         * 主要處理：完整的餐點與初始飲料選取
         */
        
        // A. 更新服務狀態 (Ordered/DND/Delayed)
        const selectedStatus = document.querySelector('input[name="service-status"]:checked').value;
        orderToUpdate.status = selectedStatus;

        if (['ORDERED', 'DELAYED', 'DND'].includes(selectedStatus)) {
            
            // B. 第一餐與前菜處理
            const isSPML = appElements.spmlCheckbox.checked;
            orderToUpdate.isSPML = isSPML;

            if (isSPML) {
                const spmlCode = getSPMLCode(appElements.spmlSelect, appElements.spmlInputOther);
                orderToUpdate.mealCode = spmlCode;
                orderToUpdate.mealName = 'Special Meal';
                // 特別餐通常前菜隨餐，這裡同步代碼
                if (isMRoute || isLongHaul) orderToUpdate.appetizerChoice = spmlCode;
            } else {
                const mealRadio = document.querySelector('input[name="meal_1"]:checked');
                if (mealRadio) {
                    orderToUpdate.mealCode = mealRadio.value;
                    const mData = activeMeals_1.find(m => m.code === mealRadio.value);
                    orderToUpdate.mealName = mData ? mData.name : 'N/A';
                }

                // 前菜邏輯 (M 航線手選，L 航線自動對應)
                if (isLongHaul && LONG_HAUL_RULES[currentRoute]) {
                    const rule = LONG_HAUL_RULES[currentRoute][orderToUpdate.mealCode] || LONG_HAUL_RULES[currentRoute]['STANDARD'];
                    orderToUpdate.appetizerChoice = rule.appetizer.code;
                } else if (isMRoute) {
                    const appRadio = document.querySelector('input[name="appetizer_choice"]:checked');
                    orderToUpdate.appetizerChoice = appRadio ? appRadio.value : '';
                }
            }

            // C. 第一餐飲料處理 (完整重設)
            const getBevData = (container, name) => {
                if (!container) return [];
                return Array.from(container.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => {
                    const card = cb.closest('.beverage-item-card');
                    const styleSel = card ? card.querySelector('.beverage-style-select') : null;
                    return {
                        name: cb.value,
                        style: (styleSel && !styleSel.classList.contains('hidden')) ? styleSel.value : 'Normal',
                        served: false,
                        skipped: false,
                        cancelled: false
                    };
                });
            };
            orderToUpdate.beverages = getBevData(appElements.beverageOptionsContainer, 'beverage_1');

            // D. 第二餐處理 (長程線)
            if (isLongHaul) {
                const meal2Radio = document.querySelector('input[name="meal_2"]:checked');
                if (meal2Radio) {
                    orderToUpdate.mealCode_2 = meal2Radio.value;
                    const m2Data = activeMeals_2.find(m => m.code === meal2Radio.value);
                    orderToUpdate.mealName_2 = m2Data ? m2Data.name : 'N/A';
                }
                orderToUpdate.beverages_2 = getBevData(appElements.beverageOptionsContainer2, 'beverage_2');
            }
        }
        showMessage(`Order confirmed for ${orderToUpdate.id}`, false);
    }

    // 5. 存檔、刷新介面並關閉視窗
    saveSystemState();
    renderSeatLayout();
    closeModal();
}

// [UI FIX] handleServiceClick - 加入邊界檢測，防止選單超出螢幕
function handleServiceClick(event, seatId, itemType, itemIndex = null) {
    if (currentMode !== MODES.SERVICE_MODE) {
        // 行為 A: 如果你希望在 Order Mode 點擊餐點時，直接打開「編輯視窗」 (建議這個，體驗較好)
        openOrderModal(seatId);
        return;

        // 行為 B: 如果你希望在 Order Mode 點擊餐點時「完全沒反應」
        // return; 
    }
    event.stopPropagation();
    currentSeatId = seatId; 
    serviceTarget = itemType; 
    currentServiceItemIndex = itemIndex;
    
    // 取得點擊按鈕的位置資訊
    const rect = event.currentTarget.getBoundingClientRect();
    const modal = appElements.serviceActionModal;
    
    // 1. 設定選單的預估高度 (Served/Skip/Cancel 三個按鈕約 120-130px)
    const modalHeight = 135; 
    const viewportHeight = window.innerHeight;
    
    // 2. 判斷下方空間是否足夠
    let topPos;
    // 如果 (按鈕底部位置 + 選單高度) 超出視窗高度 -> 改為「向上彈出」
    if ((rect.bottom + modalHeight) > viewportHeight) {
        // 位置 = 當前捲軸 + 按鈕頂部 - 選單高度 - 緩衝間距
        topPos = window.scrollY + rect.top - modalHeight - 5;
    } else {
        // 空間足夠 -> 維持「向下彈出」
        topPos = window.scrollY + rect.bottom + 5;
    }

    // 3. 套用位置
    Object.assign(modal.style, { 
        top: `${topPos}px`, 
        left: `${window.scrollX + rect.left}px`
    });

    modal.classList.remove('hidden');
    
    // 點擊其他地方關閉選單
    document.addEventListener('click', () => modal.classList.add('hidden'), { once: true });
}

// [NEW] 負責將畫面從「狀態檢視」切換成「加點飲料模式」
function renderServiceBeverageMenu() {
    const isLongHaul = activeMeals_2.length > 0;
    const show = (el, visible) => el.classList.toggle('hidden', !visible);
    
    // 隱藏狀態按鈕，顯示確認按鈕
    show(appElements.serviceModeActions, false);
    show(appElements.submitOrderBtn, true);
    appElements.submitOrderBtn.textContent = 'Add Beverage(s)';

    // 依照目前的 Phase 顯示對應內容 (無分頁)
    show(appElements.orderPhaseTabs, false);

    if (currentServicePhase === 'MEAL_1') {
        show(appElements.orderTabContent1, true);
        show(appElements.orderTabContent2, false);
    } else {
        show(appElements.orderTabContent1, false);
        show(appElements.orderTabContent2, true);
    }

    // 清空並重建飲料選單
    appElements.orderTabContent1.innerHTML = '';
    appElements.orderTabContent1.appendChild(appElements.beverageOptionsWrapper);
    appElements.orderTabContent2.innerHTML = '';
    appElements.orderTabContent2.appendChild(appElements.beverageOptionsWrapper2);

    setupBeverageOptions(appElements.beverageOptionsContainer, [], 'beverage_1');
    setupBeverageOptions(appElements.beverageOptionsContainer2, [], 'beverage_2');
    
    // 只顯示飲料區塊
    show(appElements.spmlSection, false); show(appElements.mealOptionsWrapper, false); show(appElements.dessertDisplay, false); show(appElements.beverageOptionsWrapper, true);
    show(appElements.spmlSection2, false); show(appElements.mealOptionsWrapper2, false); show(appElements.beverageOptionsWrapper2, true);
}

// [NEW] 處理服務動作 (Served / Skip / Cancel)
// [修改] handleServiceAction - 改為標記取消，而非刪除資料
function handleServiceAction(action) {
    const order = getOrder(currentSeatId);
    if (!order) return;
    appElements.serviceActionModal.classList.add('hidden');
    
    // --- 區塊 A: Served / Skip (保持不變) ---
    if (action === 'Served' || action === 'Skip') {
        const isServed = action === 'Served';
        const isSkipped = action === 'Skip';
        
        // 注意：如果原本是 Cancelled 狀態，設為 Served/Skip 時應自動取消 Cancelled
        if (serviceTarget === 'meal_1') { 
            order.mealServed = isServed; order.mealSkipped = isSkipped; order.mealCancelled = false;
            // One Tray 邏輯保持...
            const meal = getMeal1(order.mealCode);
            if ((meal && meal.dessert === 'ONE TRAY SERVICE') || (order.isSPML && ['TPE-HKG', 'TPE-SHI', 'TPE-OKA'].includes(currentRoute))) {
                order.dessertServed = isServed; order.dessertSkipped = isSkipped; order.dessertCancelled = false;
                order.soupServed = isServed; order.soupSkipped = isSkipped; order.soupCancelled = false;
            }
        } 
        else if (serviceTarget === 'appetizer') { order.appetizerServed = isServed; order.appetizerSkipped = isSkipped; order.appetizerCancelled = false; } 
        else if (serviceTarget === 'soup') { order.soupServed = isServed; order.soupSkipped = isSkipped; order.soupCancelled = false; }
        else if (serviceTarget === 'meal_2') { order.mealServed_2 = isServed; order.mealSkipped_2 = isSkipped; order.mealCancelled_2 = false; } 
        else if (serviceTarget === 'yogurt') { order.yogurtServed = isServed; order.yogurtSkipped = isSkipped; order.yogurtCancelled = false; }
        else if (serviceTarget === 'fruit') { order.fruitServed = isServed; order.fruitSkipped = isSkipped; order.fruitCancelled = false; }
        else if (serviceTarget === 'drink_1' && currentServiceItemIndex !== null) { 
            if(order.beverages[currentServiceItemIndex]) {
                order.beverages[currentServiceItemIndex].served = isServed; 
                order.beverages[currentServiceItemIndex].skipped = isSkipped;
                order.beverages[currentServiceItemIndex].cancelled = false;
            }
        } 
        else if (serviceTarget === 'drink_2' && currentServiceItemIndex !== null) { 
            if(order.beverages_2[currentServiceItemIndex]) {
                order.beverages_2[currentServiceItemIndex].served = isServed; 
                order.beverages_2[currentServiceItemIndex].skipped = isSkipped;
                order.beverages_2[currentServiceItemIndex].cancelled = false;
            }
        } 
        else if (serviceTarget === 'dessert') { order.dessertServed = isServed; order.dessertSkipped = isSkipped; order.dessertCancelled = false; }
    } 
    
    // --- 區塊 B: Cancel (核心修改) ---
    else if (action === 'Cancel') {
         // 不刪除資料，只標記 Cancelled
         if (serviceTarget === 'meal_1') { order.mealCancelled = true; order.mealServed = false; order.mealSkipped = false; }
         else if (serviceTarget === 'appetizer') { order.appetizerCancelled = true; order.appetizerServed = false; order.appetizerSkipped = false; }
         else if (serviceTarget === 'soup') { order.soupCancelled = true; order.soupServed = false; order.soupSkipped = false; }
         else if (serviceTarget === 'meal_2') { order.mealCancelled_2 = true; order.mealServed_2 = false; order.mealSkipped_2 = false; }
         else if (serviceTarget === 'yogurt') { order.yogurtCancelled = true; order.yogurtServed = false; order.yogurtSkipped = false; }
         else if (serviceTarget === 'fruit') { order.fruitCancelled = true; order.fruitServed = false; order.fruitSkipped = false; }
         else if (serviceTarget === 'dessert') { order.dessertCancelled = true; order.dessertServed = false; order.dessertSkipped = false; }
         
         else if (serviceTarget === 'drink_1' && currentServiceItemIndex !== null) {
            if(order.beverages[currentServiceItemIndex]) {
                order.beverages[currentServiceItemIndex].cancelled = true;
                order.beverages[currentServiceItemIndex].served = false;
            }
         } 
         else if (serviceTarget === 'drink_2' && currentServiceItemIndex !== null) {
            if(order.beverages_2[currentServiceItemIndex]) {
                order.beverages_2[currentServiceItemIndex].cancelled = true;
                order.beverages_2[currentServiceItemIndex].served = false;
            }
         }
         
         showMessage(`${serviceTarget} marked as CANCELLED.`, false);
    }
    
    if (action !== 'Cancel') showMessage(`${order.id}'s ${serviceTarget} marked as ${action}.`, false);
    renderSeatLayout();
    saveSystemState();
}

// [NEW] 復原服務狀態 (Undo)
// [修改] handleUndoService - 支援復原 Cancelled 狀態
function handleUndoService(seatId, itemType, index = null) {
    const order = getOrder(seatId);
    if (!order) return;

    // Helper: Reset all status flags
    const reset = (prefix) => {
        order[`${prefix}Served`] = false;
        order[`${prefix}Skipped`] = false;
        order[`${prefix}Cancelled`] = false; // 重置 Cancelled
    };

    if (itemType === 'appetizer') reset('appetizer');
    else if (itemType === 'soup') reset('soup');
    else if (itemType === 'meal_1') { 
        reset('meal');
        // One Tray 連帶重置
        const meal = getMeal1(order.mealCode);
        if ((meal && meal.dessert === 'ONE TRAY SERVICE') || (order.isSPML && ['TPE-HKG', 'TPE-SHI', 'TPE-OKA'].includes(currentRoute))) {
            reset('dessert');
            reset('soup');
        }
    }
    else if (itemType === 'dessert') reset('dessert');
    else if (itemType === 'meal_2') {
         order.mealServed_2 = false; order.mealSkipped_2 = false; order.mealCancelled_2 = false; 
    }
    else if (itemType === 'yogurt') reset('yogurt');
    else if (itemType === 'fruit') reset('fruit');
    
    else if (itemType === 'drink_1' && index !== null) { 
        if(order.beverages[index]) { 
            order.beverages[index].served = false; 
            order.beverages[index].skipped = false;
            order.beverages[index].cancelled = false; // 重置
        }
    }
    else if (itemType === 'drink_2' && index !== null) { 
        if(order.beverages_2[index]) { 
            order.beverages_2[index].served = false; 
            order.beverages_2[index].skipped = false; 
            order.beverages_2[index].cancelled = false; // 重置
        }
    }

    saveSystemState();
    renderSeatLayout();
    openOrderModal(seatId);
}

window.handleUndoService = handleUndoService;   

function handleCloseService() {
    const order = getOrder(currentSeatId);
    if (order) {
        order.serviceClosed = true;
        showMessage(`Service for seat ${currentSeatId} has been closed.`, false);
    }
    closeModal();
    renderSeatLayout();
}

function openDelayActionModal(seatId) {
    currentSeatId = seatId;
    appElements.delayModalSeatId.textContent = seatId;
    appElements.delayActionModal.classList.replace('hidden', 'flex');
}
function closeDelayActionModal() {
    appElements.delayActionModal.classList.replace('flex', 'hidden');
    currentSeatId = null;
}
function handleDelayAction(action, value = 0) {
    const order = getOrder(currentSeatId);
    if (!order) return;
    if (action === 'start_now') {
        order.status = 'ORDERED';
        order.delayUntil = 0;
        order.delayDuration = 0;
        showMessage(`Service for seat ${order.id} will start now.`, false);
    } else if (action === 'delay') {
        order.status = 'DELAYED';
        order.delayUntil = Date.now() + (value * 60000);
        order.notificationShown = false;
        showMessage(`Service for seat ${order.id} delayed by ${value} minutes.`, false);
    }
    closeDelayActionModal();
    renderSeatLayout();
    saveSystemState(); // <--- [加入這行] 自動存檔
}

function openDndActionModal(seatId) {
    currentSeatId = seatId;
    appElements.dndModalSeatId.textContent = seatId;
    appElements.dndActionModal.classList.replace('hidden', 'flex');
}
function closeDndActionModal() {
    appElements.dndActionModal.classList.replace('flex', 'hidden');
    currentSeatId = null;
}
function handleDndAction(action) {
    const order = getOrder(currentSeatId);
    if (!order) {
        closeDndActionModal();
        return;
    }
    if (action === 'start_service') {
        order.status = 'ORDERED';
        showMessage(`Service for seat ${order.id} will start now (DND cancelled).`, false);
        renderSeatLayout();
        saveSystemState();
        closeDndActionModal();
    } else if (action === 'edit_order') {
        appElements.dndActionModal.classList.replace('flex', 'hidden'); 
        openOrderModal(order.id);
    } else if (action === 'close') {
        closeDndActionModal();
    }
}

// [FIXED] openSwapModal: Shows seat ID AND Last Name
function openSwapModal() {
    // 修改 map 邏輯：如果有名字就顯示名字，沒有就只顯示 ID
    const seatOptions = orders.map(o => {
        const displayText = o.lastName ? `${o.id} (${o.lastName})` : o.id;
        return `<option value="${o.id}">${displayText}</option>`;
    }).join('');

    appElements.swapSeat1.innerHTML = seatOptions;
    appElements.swapSeat2.innerHTML = seatOptions;
    appElements.swapSeatsModal.classList.replace('hidden', 'flex');
}

function closeSwapModal() {
     appElements.swapSeatsModal.classList.replace('flex', 'hidden');
}

function handleSwapSeats() {
    const seatId1 = appElements.swapSeat1.value;
    const seatId2 = appElements.swapSeat2.value;
    if(seatId1 === seatId2) {
        showMessage('Please select two different seats to swap.', true);
        return;
    }
    const order1 = getOrder(seatId1);
    const order2 = getOrder(seatId2);
    
    const tempOrder = {...order1, id: 'temp'};
    Object.assign(order1, {...order2, id: seatId1 });
    Object.assign(order2, {...tempOrder, id: seatId2 });

    showMessage(`Seats ${seatId1} and ${seatId2} have been swapped.`, false);
    closeSwapModal();
    renderSeatLayout();
    saveSystemState(); // <--- [加入這行]
}

// --- Save/Load and Reporting Functions ---
function handleSaveFlight() {
    const flightData = {
        flightNumber,
        currentAircraftType,
        activeAircraftConfig,
        currentRoute,
        mealInventory_1,
        mealInventory_2,
        orders
    };
    const jsonString = JSON.stringify(flightData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `starlux-flight-${flightNumber}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMessage('Flight data saved!', false);
}

// [MODIFIED] handleLoadFlight
function handleLoadFlight(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const loadedData = JSON.parse(e.target.result);
            
            flightNumber = loadedData.flightNumber;
            currentAircraftType = loadedData.currentAircraftType;
            activeAircraftConfig = loadedData.activeAircraftConfig;
            currentRoute = loadedData.currentRoute;
            mealInventory_1 = loadedData.mealInventory_1 || loadedData.mealInventory || {}; 
            mealInventory_2 = loadedData.mealInventory_2 || {};
            orders = loadedData.orders;
            
            // [NEW] Ensure loaded orders have the new beverages_2 array
            orders.forEach(order => {
                if (!order.beverages_2) {
                    order.beverages_2 = [];
                }
            });
            
            const routeMenus = MENUS[currentRoute] || { meal_1: [], meal_2: [] };
            activeMeals_1 = routeMenus.meal_1 || [];
            activeMeals_2 = routeMenus.meal_2 || [];
            
            appElements.displayFlightNo.textContent = flightNumber;
            appElements.aircraftTypeDisplay.textContent = `Business Class Meal & Beverage Selection (${activeAircraftConfig.name})`;
            appElements.inventoryModal.classList.replace('flex', 'hidden');
        if (appElements.editInventoryBtn) appElements.editInventoryBtn.classList.remove('hidden');
            ['seatLayoutContainer', 'summarySection', 'controlPanel'].forEach(el => appElements[el].classList.remove('hidden'));
            
            // [NEW] Show/Hide aisle view controls based on loaded aircraft type
            if (activeAircraftConfig.seatLetters.length > 2) {
                appElements.aisleViewControls.classList.remove('hidden');
            } else {
                appElements.aisleViewControls.classList.add('hidden');
            }
            setAisleView('ALL'); // Reset to 'ALL' view
            
            renderSeatLayout();
            showMessage('Flight data loaded successfully!', false);
        } catch (err) {
            console.error("Failed to load flight data:", err);
            showMessage('Error reading or parsing file. Please ensure it is a valid flight data file.', true);
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
}

function generatePDFReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString();

    doc.setFontSize(22);
    doc.text("STARLUX Business Class Service Report", 105, 20, { align: "center" });
    doc.setFontSize(16);
    doc.text(`Flight: ${flightNumber}`, 105, 40, { align: "center" });
    doc.text(`Aircraft: ${activeAircraftConfig.name}`, 105, 50, { align: "center" });
    doc.text(`Date: ${today}`, 105, 60, { align: "center" });

    doc.addPage();
    doc.setFontSize(18);
    doc.text("Meal Summary", 14, 22);
    
    const mealCounts = {};
     orders.forEach(order => {
        if (order.status !== 'PENDING') {
           if (order.mealCode) {
                const id = order.isSPML ? `SPML-1 (${order.mealCode})` : order.mealCode;
                mealCounts[id] = (mealCounts[id] || 0) + 1;
            }
            if (order.mealCode_2) {
                const id = order.isSPML_2 ? `SPML-2 (${order.mealCode_2})` : order.mealCode_2;
                mealCounts[id] = (mealCounts[id] || 0) + 1;
            }
        }
    });

    let yPos = 35;
    doc.setFontSize(12);
    doc.text("Meal Code", 14, yPos);
    doc.text("Initial", 80, yPos);
    doc.text("Ordered", 110, yPos);
    doc.text("Remaining", 140, yPos);
    yPos += 10;
    
    if (activeMeals_1.length > 0) {
        doc.setFontSize(14);
        doc.text("1ST MEAL", 14, yPos);
        yPos += 7;
        doc.setFontSize(12);
        activeMeals_1.forEach(meal => {
            const ordered = mealCounts[meal.code] || 0;
            const initial = mealInventory_1[meal.code] || 0;
            doc.text(meal.code, 14, yPos);
            doc.text(initial.toString(), 80, yPos);
            doc.text(ordered.toString(), 110, yPos);
            doc.text((initial - ordered).toString(), 140, yPos);
            yPos += 7;
            delete mealCounts[meal.code];
        });
    }

    if (activeMeals_2.length > 0) {
        yPos += 5;
        doc.setFontSize(14);
        doc.text("2ND MEAL", 14, yPos);
        yPos += 7;
        doc.setFontSize(12);
        activeMeals_2.forEach(meal => {
            const ordered = mealCounts[meal.code] || 0;
            const initial = mealInventory_2[meal.code] || 0;
            doc.text(meal.code, 14, yPos);
            doc.text(initial.toString(), 80, yPos);
            doc.text(ordered.toString(), 110, yPos);
            doc.text((initial - ordered).toString(), 140, yPos);
            yPos += 7;
            delete mealCounts[meal.code];
        });
    }
    
    yPos += 5;
    doc.setFontSize(14);
    doc.text("Special Meals (SPML)", 14, yPos);
    yPos += 7;
    doc.setFontSize(12);
     Object.keys(mealCounts).filter(k => k.startsWith('SPML')).forEach(spmlCode => {
        doc.text(spmlCode, 14, yPos);
        doc.text("N/A", 80, yPos);
        doc.text(mealCounts[spmlCode].toString(), 110, yPos);
        doc.text("N/A", 140, yPos);
        yPos += 7;
     });

    if (yPos > 240) { doc.addPage(); yPos = 20; }
    yPos += 10;
    doc.setFontSize(18);
    doc.text("Beverage Summary", 14, yPos);
    yPos += 10;
    doc.setFontSize(12);

    const beverageCounts = {};
    orders.forEach(o => {
        o.beverages.forEach(b => beverageCounts[b.name] = (beverageCounts[b.name] || 0) + 1)
        if(o.beverages_2) o.beverages_2.forEach(b => beverageCounts[b.name] = (beverageCounts[b.name] || 0) + 1)
    });
    Object.keys(beverageCounts).forEach(bevName => {
        doc.text(`${bevName}: ${beverageCounts[bevName]}`, 14, yPos);
        yPos += 7;
        if (yPos > 280) { doc.addPage(); yPos = 20; }
    });

    doc.addPage();
    doc.setFontSize(18);
    doc.text("Special Remarks & Tags", 14, 22);
    yPos = 30;
    doc.setFontSize(12);

    orders.filter(o => o.remark || o.tags.length > 0).forEach(order => {
        const tagsText = order.tags.map(tId => TAGS[tId].label).join(', ');
        doc.text(`Seat ${order.id} (${order.lastName || 'N/A'}):`, 14, yPos);
        yPos += 7;
        if (tagsText) {
            doc.text(`  Tags: ${tagsText}`, 20, yPos);
            yPos += 7;
        }
        if (order.remark) {
            doc.text(`  Remark: ${order.remark}`, 20, yPos);
            yPos += 7;
        }
        yPos += 3; 
        if (yPos > 280) { doc.addPage(); yPos = 20; }
    });
    
    doc.save(`Flight-Report-${flightNumber}-${today}.pdf`);
}



// --- [GLOBAL] 用來暫存最後一筆航班資料 (為了在重置後還能印報表) ---
let lastFlightData = null;

// [MODIFIED] handleEndOfFlight - 先重置系統，再顯示感謝畫面
function handleEndOfFlight() {
    if (!confirm('Are you ready to end this flight? The system will reset immediately.')) return;

    // 1. Snapshot Data (暫存資料給報表用)
    lastFlightData = {
        flightNumber,
        activeAircraftConfig,
        orders: JSON.parse(JSON.stringify(orders)), // Deep copy
        mealInventory_1: {...mealInventory_1},
        mealInventory_2: {...mealInventory_2},
        activeMeals_1,
        activeMeals_2
    };

    // 2. Reset System Immediately (立刻重置系統)
    localStorage.removeItem(STORAGE_KEY); 
    resetSystem(); 

    // 3. Show Thank You Modal (顯示感謝畫面)
    const modal = document.getElementById('end-flight-modal');
    const bgImg = document.getElementById('end-flight-bg-img');

    if (modal) {
        modal.classList.remove('hidden');
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
            if(bgImg) {
                bgImg.classList.remove('scale-110');
                bgImg.classList.add('scale-100');
            }
        });
    }
}

// [MODIFIED] handleFinalReport - 使用暫存資料產生報表
function handleFinalReport() {
    if (!lastFlightData) {
        showMessage('No flight data available.', true);
        return;
    }

    showMessage('Generating PDF report...', false);

    // 暫時還原全域變數以供 generatePDFReport 使用
    const originalFlightNum = flightNumber; // 應該是空的
    
    // 還原資料
    flightNumber = lastFlightData.flightNumber;
    activeAircraftConfig = lastFlightData.activeAircraftConfig;
    orders = lastFlightData.orders;
    mealInventory_1 = lastFlightData.mealInventory_1;
    mealInventory_2 = lastFlightData.mealInventory_2;
    activeMeals_1 = lastFlightData.activeMeals_1;
    activeMeals_2 = lastFlightData.activeMeals_2;

    try {
        generatePDFReport();
    } catch(e) {
        console.error("PDF generation failed:", e);
        showMessage('Error generating PDF report.', true);
    }

    // 產生完畢後，再次執行重置以確保變數清空 (Silent Reset)
    // 這裡我們手動清空變數即可，不需要呼叫完整的 resetSystem (避免 UI 閃爍)
    flightNumber = '';
    orders = [];
    mealInventory_1 = {};
    mealInventory_2 = {};
    currentSeatId = null;
}

// [MODIFIED] handleFinalRestart - 只是關閉 Modal (因為系統已經重置了)
// [CHECK] 確保您的 handleFinalRestart 邏輯如下
function handleFinalRestart() {
    const modal = document.getElementById('end-flight-modal');
    const bgImg = document.getElementById('end-flight-bg-img');
    
    if (modal) {
        // 1. 開始淡出
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        if(bgImg) bgImg.classList.add('scale-110');
        
        // 2. 等待淡出動畫結束後隱藏，此時使用者就會看到背後早已準備好的 Start Screen
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 500); 
    }
}

// [NEW] 關閉 Modal (返回)
function closeEndFlightModal() {
    const modal = document.getElementById('end-flight-modal');
    const bgImg = document.getElementById('end-flight-bg-img');
    
    if (modal) {
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        if(bgImg) bgImg.classList.add('scale-110');
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 500); // 等待淡出動畫結束
    }
}

// [UI 優化] setupInventoryInputs - 移除加減符號，改為純淨的 Numpad 觸發區
function setupInventoryInputs() {
    
    // (選擇性) 隱藏瀏覽器預設的 input 小箭頭
    if (!document.getElementById('hide-spin-style')) {
        const style = document.createElement('style');
        style.id = 'hide-spin-style';
        style.innerHTML = `
            input[type=number]::-webkit-outer-spin-button,
            input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
            input[type=number] { -moz-appearance: textfield; }
        `;
        document.head.appendChild(style);
    }

    const selectedRouteId = appElements.routeSelect.value;
    const routeInfo = ROUTES.find(r => r.id === selectedRouteId);
    
    const routeMenus = MENUS[selectedRouteId] || { meal_1: [], meal_2: [], appetizers: [] };
    activeMeals_1 = routeMenus.meal_1 || [];
    activeMeals_2 = routeMenus.meal_2 || [];
    const activeAppetizers = routeMenus.appetizers || [];
    
    const needsAppetizer = routeInfo && ['M', 'L', 'UL'].includes(routeInfo.type);
    const needsSecondMeal = routeInfo && ['L', 'UL'].includes(routeInfo.type);

    appElements.inventoryInputsContainer.innerHTML = '';
    
    // Helper: 產生極簡化輸入條 (移除 + - 按鈕，優化點擊區域)
    const createInputRow = (code, name, chinese, qtyId, existingQty) => `
        <div class="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-xl mb-2 shadow-sm active:scale-[0.99] transition-transform select-none cursor-pointer" onclick="openNumpad('${qtyId}')">
            
            <div class="flex-1 pr-4 overflow-hidden">
                <div class="font-bold text-[#424649] text-base mb-0.5 tracking-wide">${code}</div>
                <div class="text-xs text-gray-500 font-medium truncate">${name}</div>
                <div class="text-[10px] text-gray-400 italic truncate">${chinese || ''}</div>
            </div>

            <div class="relative group">
                <input type="text" id="${qtyId}" 
                    class="w-16 py-2 px-1 bg-slate-100 border-2 border-slate-200 rounded-lg text-center font-black text-xl text-[#8C5845] pointer-events-none" 
                    value="${existingQty}" placeholder="0" readonly>
                <div class="absolute inset-0 rounded-lg ring-2 ring-[#8C5845] opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
        </div>
    `;

    // 1. Starter
    if (needsAppetizer && activeAppetizers.length > 0) {
        appElements.inventoryInputsContainer.innerHTML += `
            <div class="sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 py-2 border-b border-gray-200 mb-2">
                <h4 class="text-[11px] font-bold text-[#8C5845] flex items-center gap-2 uppercase tracking-widest px-1">
                    <i data-lucide="utensils" class="w-3.5 h-3.5"></i> Starter Inventory
                </h4>
            </div>`;
        activeAppetizers.forEach(app => {
            const qty = (isEditingInventory && appetizerInventory) ? (appetizerInventory[app.code] || 0) : 0;
            appElements.inventoryInputsContainer.innerHTML += createInputRow(app.code, app.name, app.chinese, `qty-appetizer-${app.code}`, qty);
        });
    }

    // 2. 1st Meal
    if (activeMeals_1.length > 0) {
        appElements.inventoryInputsContainer.innerHTML += `
            <div class="sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 py-2 border-b border-gray-200 mb-2 mt-4">
                <h4 class="text-[11px] font-bold text-[#8C5845] flex items-center gap-2 uppercase tracking-widest px-1">
                    <i data-lucide="flame" class="w-3.5 h-3.5"></i> 1st Meal Inventory
                </h4>
            </div>`;
        activeMeals_1.forEach(meal => {
            const qty = (isEditingInventory && mealInventory_1) ? (mealInventory_1[meal.code] || 0) : 0;
            appElements.inventoryInputsContainer.innerHTML += createInputRow(meal.code, meal.name, meal.chinese, `qty-1-${meal.code}`, qty);
        });
    }

    // 3. 2nd Meal
    const container2 = document.getElementById('inventory-inputs-container-2');
    if (container2) {
        const showSecondMeal = needsSecondMeal && activeMeals_2.length > 0;
        container2.innerHTML = '';
        container2.classList.toggle('hidden', !showSecondMeal);
        
        if (showSecondMeal) {
            container2.innerHTML += `
                <div class="sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 py-2 border-b border-gray-200 mb-2">
                    <h4 class="text-[11px] font-bold text-[#85724E] flex items-center gap-2 uppercase tracking-widest px-1">
                        <i data-lucide="moon" class="w-3.5 h-3.5"></i> 2nd Meal Inventory
                    </h4>
                </div>`;
            activeMeals_2.forEach(meal => {
                const qty = (isEditingInventory && mealInventory_2) ? (mealInventory_2[meal.code] || 0) : 0;
                container2.innerHTML += createInputRow(meal.code, meal.name, meal.chinese, `qty-2-${meal.code}`, qty);
            });
        }
    }
    
    if (typeof renderPreSelectInputs === 'function') {
        renderPreSelectInputs(); 
    }

    safeRenderIcons(); 
}

// [新版] Soft Reset - 手動清空變數並回到起始畫面
function resetSystem() {
    // A. 停止所有計時器與音效
    stopCountdown();
    
    // B. 清空核心變數
    flightNumber = '';
    currentAircraftType = '';
    currentRoute = '';
    orders = [];
    mealInventory_1 = {};
    mealInventory_2 = {};
    appetizerInventory = {};
    currentSeatId = null;
    isEditingInventory = false;
    currentMode = MODES.ORDER_MODE;
    currentServicePhase = 'MEAL_1';

    // C. 清空介面顯示
    appElements.flightNumberInput.value = '';
    appElements.aircraftSelect.selectedIndex = 0; // 重置選單
    appElements.routeSelect.selectedIndex = 0;
    appElements.displayFlightNo.textContent = 'N/A';
    appElements.seatLayout.innerHTML = '';
    appElements.summaryList.innerHTML = '';
    appElements.displayMode.textContent = 'ORDER MODE';
    appElements.displayMode.classList.replace('text-red-400', 'text-green-400');
    
    // D. 隱藏所有功能按鈕
    appElements.endFlightBtn.classList.add('hidden');
    appElements.phaseToggleBtn.classList.add('hidden');
    appElements.modeToggleBtn.textContent = 'Switch to SERVICE MODE';
    
    // E. 關閉主程式畫面 (`#app`)
    document.getElementById('app').classList.add('hidden');

    // F. 確保設定視窗是關閉的 (下次按 Start 時會重新判斷並打開)
    appElements.inventoryModal.classList.add('hidden');
    appElements.inventoryModal.classList.remove('flex');
    
    // G. [關鍵] 重新顯示起始畫面 (#start-screen)
    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-btn');
    const loadingSpinner = document.getElementById('loading-spinner');

    if (startScreen) {
        startScreen.style.display = ''; // 移除 display: none
        startScreen.classList.remove('opacity-0', 'pointer-events-none'); // 移除淡出效果
        
        // 重置起始畫面的按鈕狀態
        if (loadingSpinner) loadingSpinner.classList.add('hidden');
        if (startBtn) {
            startBtn.classList.remove('hidden');
            // 稍微讓它彈跳一下提示使用者已重置
            startBtn.classList.add('animate-bounce'); 
            setTimeout(() => startBtn.classList.remove('animate-bounce'), 1000);
        }
    }

    showMessage('System Reset. Ready for next flight.', false);
}

function updateClock() {
    appElements.currentTimeDisplay.textContent = new Date().toLocaleString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
        hour: 'numeric', minute: 'numeric', timeZoneName: 'short'
    });
}

// [NEW] SPML Input Listeners
function setupSPMLListeners() {
    const show = (el, visible) => el.classList.toggle('hidden', !visible);

    appElements.spmlCheckbox.addEventListener('change', () => {
        const isChecked = appElements.spmlCheckbox.checked;
        show(appElements.spmlInputContainer, isChecked);
        show(appElements.mealOptionsWrapper, !isChecked);
        if(!isChecked) show(appElements.spmlInputOther, false);
        syncSPML(isChecked);
    });
    
    appElements.spmlSelect.addEventListener('change', () => {
        const isOther = appElements.spmlSelect.value === 'OTHER';
        show(appElements.spmlInputOther, isOther);
        syncSPML(appElements.spmlCheckbox.checked);
    });

    appElements.spmlInputOther.addEventListener('input', () => {
         syncSPML(appElements.spmlCheckbox.checked);
    });
    
    // Listeners for SPML 2 (in case SPML 1 is unchecked)
     appElements.spmlCheckbox2.addEventListener('change', () => {
        const isChecked = appElements.spmlCheckbox2.checked;
        show(appElements.spmlInputContainer2, isChecked);
        show(appElements.mealOptionsWrapper2, !isChecked);
        if(!isChecked) show(appElements.spmlInputOther2, false);
    });
    
    appElements.spmlSelect2.addEventListener('change', () => {
        const isOther = appElements.spmlSelect2.value === 'OTHER';
        show(appElements.spmlInputOther2, isOther);
    });
}

function openEditInventory() {
    if (!flightNumber || !activeAircraftConfig || !currentRoute) {
        showMessage('Please finish Setup first.', true);
        return;
    }
    isEditingInventory = true;
    
    appElements.flightNumberInput.value = flightNumber;
    appElements.aircraftSelect.value = currentAircraftType;
    appElements.routeSelect.value = currentRoute;
    appElements.flightNumberInput.disabled = true;
    appElements.aircraftSelect.disabled = true;
    appElements.routeSelect.disabled = true;

    if (appElements.inventoryModalTitle) appElements.inventoryModalTitle.textContent = 'Edit Meal Inventory';
    appElements.saveInventoryBtn.textContent = 'Save Inventory';
    appElements.saveInventoryBtn.dataset.mode = 'edit';

    setupInventoryInputs();

    // --- [改用工具函式] ---
    showModal(appElements.inventoryModal);
    // ---------------------
}

// [FIXED] handleSaveInventoryEdit - 修正無法關閉視窗的問題
function handleSaveInventoryEdit() {
    let allValid = true;
    const routeMenus = MENUS[currentRoute] || { meal_1: [], meal_2: [] };
    activeMeals_1 = routeMenus.meal_1 || [];
    activeMeals_2 = routeMenus.meal_2 || [];
    const routeInfo = ROUTES.find(r => r.id === currentRoute);

    // 1. 讀取左側庫存 (加入防呆檢查)
    const inv1 = {};
    activeMeals_1.forEach(meal => {
        const input = document.getElementById(`qty-1-${meal.code}`);
        if (input) {
            const value = parseInt(input.value, 10);
            if (isNaN(value) || value < 0) allValid = false;
            inv1[meal.code] = value || 0;
        }
    });

    const inv2 = {};
    activeMeals_2.forEach(meal => {
        const input = document.getElementById(`qty-2-${meal.code}`);
        if (input) {
            const value = parseInt(input.value, 10);
            if (isNaN(value) || value < 0) allValid = false;
            inv2[meal.code] = value || 0;
        }
    });

    const invApp = {};
    const routeMenusApp = MENUS[currentRoute] || { appetizers: [] };
    const activeAppetizers = routeMenusApp.appetizers || [];
    activeAppetizers.forEach(app => {
        const input = document.getElementById(`qty-appetizer-${app.code}`);
        if (input) {
            const value = parseInt(input.value, 10);
            if (isNaN(value) || value < 0) allValid = false;
            invApp[app.code] = value || 0;
        }
    });

    if (!allValid) { 
        showMessage('Please ensure all quantities are valid non-negative numbers.', true); 
        return; 
    }

    // 2. 讀取右側乘客資料
    let seatIds = [];
    if (activeAircraftConfig && activeAircraftConfig.rows) {
        activeAircraftConfig.rows.forEach(row => {
            activeAircraftConfig.seatLetters.forEach(letter => {
                 if (currentAircraftType === 'A350-900' && row === '8' && (letter === 'A' || letter === 'K')) return;
                 if (currentAircraftType === 'A330-900neo') {
                    const isEven = parseInt(row) % 2 === 0;
                    if (isEven && !['A','E','F','K'].includes(letter)) return;
                    if (!isEven && !['C','D','G','H'].includes(letter)) return;
                 }
                 seatIds.push(`${row}${letter}`);
            });
        });
    }

    seatIds.forEach(seatId => {
        const order = getOrder(seatId);
        if (!order) return;

        const nameEl = document.getElementById(`preselect-name-${seatId}`);
        const mainMealEl = document.getElementById(`preselect-${seatId}`);
        const spmlEl = document.getElementById(`preselect-spml-${seatId}`);
        const appSelectEl = document.getElementById(`preselect-app-${seatId}`);
        const m2SelectEl = document.getElementById(`preselect-m2-${seatId}`);

        if (nameEl) order.lastName = nameEl.value.trim().toUpperCase();

        // Reset Pre-select flags
        order.isSPML = false;
        order.isSPML_2 = false;
        order.isPreSelect = false;
        order.isMeal2PreSelect = false;
        order.isAppetizerPreSelect = false;

        if (spmlEl && spmlEl.value) {
            order.status = 'ORDERED';
            order.isSPML = true;
            order.mealCode = spmlEl.value;
            order.mealName = 'Special Meal';

            if (activeMeals_2.length > 0) {
                order.isSPML_2 = true;
                order.mealCode_2 = spmlEl.value;
                order.mealName_2 = 'Special Meal';
            }
            if (activeAppetizers.length > 0 || ['L', 'UL'].includes(routeInfo?.type)) {
                order.appetizerChoice = spmlEl.value; 
            }

        } else if (mainMealEl && mainMealEl.value) {
            if (order.status !== 'CHECKED_IN' && order.status !== 'DELAYED' && order.status !== 'DND') {
                 order.status = 'ORDERED';
            }
            order.mealCode = mainMealEl.value;
            const mData = activeMeals_1.find(m => m.code === mainMealEl.value);
            order.mealName = mData ? mData.name : 'N/A';
            order.isPreSelect = true;
            
        } else {
            if (!order.mealServed) {
                order.mealCode = '';
                order.mealName = 'N/A';
            }
        }

        if (appSelectEl && appSelectEl.value && !order.isSPML) {
            order.appetizerChoice = appSelectEl.value;
            order.isAppetizerPreSelect = true;
        }

        if (m2SelectEl && m2SelectEl.value && !order.isSPML) {
            order.mealCode_2 = m2SelectEl.value;
            const mData = activeMeals_2.find(m => m.code === m2SelectEl.value);
            order.mealName_2 = mData ? mData.name : 'N/A';
            order.isMeal2PreSelect = true;
        }
    });

    // 3. 存檔與 UI 更新
    mealInventory_1 = inv1;
    mealInventory_2 = inv2;
    appetizerInventory = invApp;

    renderSeatLayout();
    saveSystemState();
    
    if (!appElements.orderModal.classList.contains('hidden') && currentSeatId) {
        openOrderModal(currentSeatId);
    }
    
    showMessage('Inventory & Passenger Records updated.', false);

    // --- [改用工具函式] ---
    hideModal(appElements.inventoryModal);
    // ---------------------

    if (appElements.editInventoryBtn) appElements.editInventoryBtn.classList.remove('hidden');
    
    appElements.flightNumberInput.disabled = false;
    appElements.aircraftSelect.disabled = false;
    appElements.routeSelect.disabled = false;
    if (appElements.inventoryModalTitle) appElements.inventoryModalTitle.textContent = 'Setup Flight & Meal Inventory';
    appElements.saveInventoryBtn.textContent = 'Confirm Setup';
    appElements.saveInventoryBtn.dataset.mode = '';
    isEditingInventory = false;
}
function init() {
    setupInitialSelectors();
    setupInventoryInputs();
    setupSPMLListeners();

    const serviceActionBtns = document.querySelectorAll('#service-action-modal button');
    serviceActionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.currentTarget.getAttribute('data-action');
            handleServiceAction(action);
        });
    });

// --- [新增] 自動關閉 Admin 選單邏輯 ---
const adminMenu = document.getElementById('admin-menu-container');
if (adminMenu) {
    // 1. 抓取選單內所有的按鈕
    const menuButtons = adminMenu.querySelectorAll('button');
    
    menuButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 點擊後移除 open 屬性，選單就會收起來
            adminMenu.removeAttribute('open');
        });
    });

    // 2. 修復: 確保外部遮罩 (Backdrop) 也能正確關閉選單
    // (這部分是為了搭配 HTML 裡的 onclick="this.parentElement..." 做雙重保險)
    const backdrop = adminMenu.querySelector('.fixed.inset-0');
    if (backdrop) {
        adminMenu.addEventListener('toggle', () => {
            // 當選單打開時顯示遮罩，關閉時隱藏遮罩
            backdrop.style.display = adminMenu.open ? 'block' : 'none';
        });
    }
}
    // 測試藍牙是否活著
    async function testBluetooth() {
    try {
        await BleClient.initialize();
        console.log('藍牙初始化成功！');
        alert('藍牙初始化成功！'); // 讓你在 iPad 上看得到
    } catch (error) {
        console.error('藍牙失敗:', error);
        alert('藍牙失敗: ' + error);
    }
}


// --- [FIX] 修復 Delay Action Modal (延後用餐) 按鈕監聽 ---
    const delayBtns = document.querySelectorAll('#delay-action-modal button');
    delayBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.currentTarget.getAttribute('data-action');
            const val = e.currentTarget.getAttribute('data-value'); // 取得延後分鐘數
            
            // [NEW] 新增 Edit Order 的邏輯
            if (action === 'edit_order') {
                // [關鍵修正]：先用變數把現在的座位 ID 存起來！
                // 因為 closeDelayActionModal() 會把 global 的 currentSeatId 清空
                const targetSeatId = currentSeatId;

                // 1. 關閉 Delay 小選單
                closeDelayActionModal();
                
                // 2. 開啟主要的編輯大視窗 (使用剛剛暫存的 ID)
                if (targetSeatId) {
                    openOrderModal(targetSeatId);
                }
            } 
            else if (action === 'cancel_delay') {
                closeDelayActionModal();
            }
            else {
                // 原本的 Start Now 或 Delay 時間調整
                handleDelayAction(action, val ? parseInt(val) : 0);
            }
        });
    });

    // --- [FIX] 修復 DND Action Modal (請勿打擾) 按鈕監聽 ---
    const dndBtns = document.querySelectorAll('#dnd-action-modal button');
    dndBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.currentTarget.getAttribute('data-action');
            handleDndAction(action);
        });
    });
    
    // --- [FIX] 確保點餐視窗內的狀態切換 (Radio Buttons) 能正確觸發 UI 變化 ---
    appElements.serviceStatusRadios.forEach(radio => {
        radio.addEventListener('change', toggleMealBeverageVisibility);
    });

    // [FIX 3] 補回點餐視窗的分頁切換 (1st Meal / 2nd Meal Tabs)
    if (appElements.orderTab1 && appElements.orderTab2) {
        appElements.orderTab1.addEventListener('click', () => {
            appElements.orderTab1.classList.add('active');
            appElements.orderTab2.classList.remove('active');
            appElements.orderTabContent1.classList.remove('hidden');
            appElements.orderTabContent2.classList.add('hidden');
        });
        
        appElements.orderTab2.addEventListener('click', () => {
            appElements.orderTab2.classList.add('active');
            appElements.orderTab1.classList.remove('active');
            appElements.orderTabContent2.classList.remove('hidden');
            appElements.orderTabContent1.classList.add('hidden');
        });
    }

// ------------------------------------------------
    appElements.btnAddBeverage.addEventListener('click', renderServiceBeverageMenu);
    appElements.routeSelect.addEventListener('change', () => setupInventoryInputs());

    appElements.aircraftSelect.addEventListener('change', () => {
        renderPreSelectInputs();
    });

    appElements.saveInventoryBtn.addEventListener('click', (e) => {
        if (appElements.saveInventoryBtn.dataset.mode === 'edit') { 
            handleSaveInventoryEdit(); 
        } else { 
            handleSaveInventory(); 
        }
    });

    appElements.loadFlightInput.addEventListener('change', handleLoadFlight);
    if (appElements.editInventoryBtn) appElements.editInventoryBtn.addEventListener('click', openEditInventory);
    appElements.saveFlightBtn.addEventListener('click', handleSaveFlight);
    appElements.closeModalBtn.addEventListener('click', closeModal);
    appElements.submitOrderBtn.addEventListener('click', handleSubmitOrder);
    appElements.modeToggleBtn.addEventListener('click', toggleServiceMode);
    appElements.phaseToggleBtn.addEventListener('click', toggleServicePhase);
    appElements.endFlightBtn.addEventListener('click', handleEndOfFlight);
    appElements.closeServiceBtn.addEventListener('click', handleCloseService);
    appElements.openSwapModalBtn.addEventListener('click', openSwapModal);
    appElements.cancelSwapBtn.addEventListener('click', closeSwapModal);
    appElements.confirmSwapBtn.addEventListener('click', handleSwapSeats);
    appElements.dismissDueServiceAlertBtn.addEventListener('click', () => {
        appElements.dueServiceAlertModal.classList.replace('flex', 'hidden');
    });
    
    // 修正過濾按鈕的點擊監聽
   if (appElements.viewLBtn) {
    appElements.viewLBtn.addEventListener('click', () => setAisleView('L'));
}
if (appElements.viewAllBtn) {
    appElements.viewAllBtn.addEventListener('click', () => setAisleView('ALL'));
}
if (appElements.viewRBtn) {
    appElements.viewRBtn.addEventListener('click', () => setAisleView('R'));
}
    setInterval(updateClock, 1000);
    updateClock();
    safeRenderIcons();
    //checkAndRestoreState(); // <--- [加入這行] 網頁載入時自動檢查是否有未存檔的飛行
} 

const finalReportBtn = document.getElementById('final-report-btn');
    const finalRestartBtn = document.getElementById('final-restart-btn');

    if (finalReportBtn) {
        // 移除舊的監聽器 (防重複)
        const newBtn = finalReportBtn.cloneNode(true);
        finalReportBtn.parentNode.replaceChild(newBtn, finalReportBtn);
        newBtn.addEventListener('click', handleFinalReport);
    }
    
    if (finalRestartBtn) {
        const newBtn = finalRestartBtn.cloneNode(true);
        finalRestartBtn.parentNode.replaceChild(newBtn, finalRestartBtn);
        newBtn.addEventListener('click', handleFinalRestart);
    }

// 最後執行初始化
window.onload = init;


 // ==========================================
// --- OFFLINE QR SYNC MODULE (FIXED NAME SYNC) ---
// ==========================================

const syncElements = {
    btn: document.getElementById('offline-sync-btn'),
    modal: document.getElementById('sync-modal'),
    closeBtn: document.getElementById('close-sync-btn'),
    tabSend: document.getElementById('tab-send'),
    tabReceive: document.getElementById('tab-receive'),
    sendSection: document.getElementById('send-section'),
    receiveSection: document.getElementById('receive-section'),
    qrDisplay: document.getElementById('qrcode-display'),
    qrError: document.getElementById('qr-error-msg'),
    scanStatus: document.getElementById('scan-status')
};

let html5QrCode = null;

// 1. 極致壓縮資料 (已加入姓氏與稱謂)
function compressFlightData() {
    // 只提取「有變動」的座位資料 (狀態非 PENDING，或有名字，或有餐點)
    const activeOrders = orders.filter(o => 
        o.status !== 'PENDING' || o.lastName || o.mealCode || o.mealCode_2 || o.beverages.length > 0
    ).map(o => {
        // i: id, s: status, m1: meal1, m2: meal2
        // ln: lastName, ti: title (NEW!)
        const minOrder = { i: o.id };
        
        // --- [新增] 同步姓名與稱謂 ---
        if (o.lastName) minOrder.ln = o.lastName;
        if (o.title) minOrder.ti = o.title;
        // ---------------------------

        if (o.status !== 'PENDING') minOrder.s = o.status.substring(0, 1); // O=ORDERED, D=DELAY, N=DND
        if (o.status === 'DND') minOrder.s = 'X'; 

        if (o.mealCode && o.mealCode !== 'NO MEAL') minOrder.m1 = o.mealCode;
        if (o.mealCode_2 && o.mealCode_2 !== 'NO MEAL') minOrder.m2 = o.mealCode_2;
        if (o.isSPML) minOrder.sp1 = 1;
        if (o.isSPML_2) minOrder.sp2 = 1;
        
        if (o.beverages.length > 0) minOrder.b1 = o.beverages.map(b => b.name);
        if (o.beverages_2 && o.beverages_2.length > 0) minOrder.b2 = o.beverages_2.map(b => b.name);
        
        if (o.mealServed) minOrder.v1 = 1;
        if (o.mealServed_2) minOrder.v2 = 1;
        if (o.appetizerChoice) minOrder.ap = o.appetizerChoice;
        
        return minOrder;
    });

    const payload = {
        f: flightNumber, 
        t: Date.now(),
        d: activeOrders
    };

    return JSON.stringify(payload);
}

// 2. 解壓縮資料並合併 (已加入姓氏還原)
function decompressAndMerge(jsonString) {
    try {
        const payload = JSON.parse(jsonString);
        
        if (payload.f !== flightNumber && flightNumber) {
            if (!confirm(`Flight Number mismatch!\nCurrent: ${flightNumber}\nScanned: ${payload.f}\nSync anyway?`)) return;
        }

        let updateCount = 0;
        payload.d.forEach(minOrder => {
            const targetOrder = getOrder(minOrder.i);
            if (targetOrder) {
                updateCount++;
                
                // --- [新增] 還原姓名與稱謂 ---
                if (minOrder.ln) targetOrder.lastName = minOrder.ln;
                if (minOrder.ti) targetOrder.title = minOrder.ti;
                // ---------------------------

                if (minOrder.s === 'O') targetOrder.status = 'ORDERED';
                else if (minOrder.s === 'X') targetOrder.status = 'DND';
                else if (minOrder.s === 'D') targetOrder.status = 'DELAYED';
                
                if (minOrder.m1) {
                    targetOrder.mealCode = minOrder.m1;
                    targetOrder.isSPML = !!minOrder.sp1;
                    if (!targetOrder.isSPML) {
                        const m = getMeal1(minOrder.m1);
                        targetOrder.mealName = m ? m.name : minOrder.m1;
                    } else { targetOrder.mealName = 'Special Meal'; }
                }

                if (minOrder.m2) {
                    targetOrder.mealCode_2 = minOrder.m2;
                    targetOrder.isSPML_2 = !!minOrder.sp2;
                    if (!targetOrder.isSPML_2) {
                        const m = getMeal2(minOrder.m2);
                        targetOrder.mealName_2 = m ? m.name : minOrder.m2;
                    } else { targetOrder.mealName_2 = 'Special Meal'; }
                }
                
                if (minOrder.v1) targetOrder.mealServed = true;
                if (minOrder.v2) targetOrder.mealServed_2 = true;
                if (minOrder.ap) targetOrder.appetizerChoice = minOrder.ap;

                if (minOrder.b1) {
                    targetOrder.beverages = minOrder.b1.map(name => ({ name: name, served: false, skipped: false }));
                }
                if (minOrder.b2) {
                    targetOrder.beverages_2 = minOrder.b2.map(name => ({ name: name, served: false, skipped: false }));
                }
            }
        });

        renderSeatLayout();
        saveSystemState(); // <--- [加入這行]
        showMessage(`Sync Success! Updated ${updateCount} seats (with Names).`, false);
        closeSyncModal();

    } catch (e) {
        console.error(e);
        showMessage('Invalid QR Data or Format Error.', true);
    }
}

// 3. UI 邏輯
function openSyncModal() {
    if(!syncElements.modal) return;
    syncElements.modal.classList.replace('hidden', 'flex');
    switchTab('send'); 
}

function closeSyncModal() {
    syncElements.modal.classList.replace('flex', 'hidden');
    stopScanner();
}

function switchTab(mode) {
    if (mode === 'send') {
        syncElements.tabSend.className = "flex-1 py-3 font-bold text-amber-600 border-b-2 border-amber-600 bg-amber-50";
        syncElements.tabReceive.className = "flex-1 py-3 font-bold text-gray-500 hover:bg-gray-50";
        syncElements.sendSection.classList.remove('hidden');
        syncElements.receiveSection.classList.add('hidden');
        stopScanner();
        setTimeout(generateQR, 100);
    } else {
        syncElements.tabSend.className = "flex-1 py-3 font-bold text-gray-500 hover:bg-gray-50";
        syncElements.tabReceive.className = "flex-1 py-3 font-bold text-teal-600 border-b-2 border-teal-600 bg-teal-50";
        syncElements.sendSection.classList.add('hidden');
        syncElements.receiveSection.classList.remove('hidden');
        startScanner();
    }
}

function generateQR() {
    syncElements.qrDisplay.innerHTML = '';
    syncElements.qrError.classList.add('hidden');
    
    const dataString = compressFlightData();
    // 姓名加入後字串會變長，放寬一點檢查限制
    if (dataString.length > 2800) {
        syncElements.qrError.classList.remove('hidden');
        return;
    }

    new QRCode(syncElements.qrDisplay, {
        text: dataString,
        width: 250,
        height: 250,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.L
    });
}

function startScanner() {
    syncElements.scanStatus.textContent = "Requesting Camera Permission...";
    
    if (html5QrCode) stopScanner();

    html5QrCode = new Html5Qrcode("reader");
    
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
    html5QrCode.start(
        { facingMode: "environment" }, 
        config,
        (decodedText) => {
            stopScanner();
            decompressAndMerge(decodedText);
        },
        (errorMessage) => {
            if(!errorMessage.includes("No MultiFormat Readers")) {
                 syncElements.scanStatus.textContent = "Scanning... Align QR Code within frame.";
            }
        }
    ).catch(err => {
        syncElements.scanStatus.textContent = "Camera Error: " + err;
        console.error(err);
    });
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
            html5QrCode = null;
        }).catch(() => {});
    }
}

// 綁定事件
if (syncElements.btn) syncElements.btn.addEventListener('click', openSyncModal);
if (syncElements.closeBtn) syncElements.closeBtn.addEventListener('click', closeSyncModal);
if (syncElements.tabSend) syncElements.tabSend.addEventListener('click', () => switchTab('send'));
if (syncElements.tabReceive) syncElements.tabReceive.addEventListener('click', () => switchTab('receive'));

// --- Start Screen Logic (FIXED VERSION) ---
// --- Start Screen Logic (FIXED FOR OFFLINE/RESTART) ---
// --- Start Screen Logic (ROBUST OFFLINE FIX) ---
document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const readyMsg = document.getElementById('ready-msg');
    
    const appContainer = document.getElementById('app');
    const inventoryModal = document.getElementById('inventory-modal');

    // 1. 初始化：強制隱藏系統層，確保 Start Screen 在最上層
    if (inventoryModal) {
        // [FIX] 使用 inline style 強制隱藏，不依賴 Tailwind class (怕離線失效)
        inventoryModal.style.display = 'none'; 
        inventoryModal.classList.add('hidden');
        inventoryModal.classList.remove('flex'); 
    }
    if (appContainer) {
        appContainer.classList.add('hidden');
    }

  // [FIXED] enterSystem: 改用 showModal 統一管理
    const enterSystem = () => {
        console.log("System Initiated...");

        if (startScreen) {
            startScreen.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => { startScreen.style.display = 'none'; }, 700);
        }

        if (appContainer) appContainer.classList.remove('hidden');

        let restored = false;
        try {
            restored = checkAndRestoreState(); 
        } catch (err) {
            console.error("Restore crashed:", err);
            restored = false;
        }

        if (!restored) {
            console.log("Opening Setup Window...");
            
            // 重置變數
            flightNumber = '';
            orders = [];
            currentSeatId = null;
            mealInventory_1 = {};
            mealInventory_2 = {};

            if (inventoryModal) {
                // --- [改用工具函式] ---
                showModal(inventoryModal); 
                // ---------------------

                if (typeof setupInitialSelectors === 'function') setupInitialSelectors();
                if (appElements.aircraftSelect) appElements.aircraftSelect.selectedIndex = 0;
                if (appElements.routeSelect) appElements.routeSelect.selectedIndex = 0;
                if (typeof setupInventoryInputs === 'function') setupInventoryInputs();
                if (typeof renderPreSelectInputs === 'function') renderPreSelectInputs();
            } else {
                alert("Error: Setup Modal not found!");
            }
        }
    };

    // 2. 檢測資源載入狀態
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingSpinner) loadingSpinner.classList.add('hidden');
            if (startBtn) {
                startBtn.classList.remove('hidden');
                // 稍微讓它彈跳一下提示使用者已就緒
                startBtn.classList.add('animate-bounce');
                setTimeout(() => startBtn.classList.remove('animate-bounce'), 1000);
            }
            
            // 離線狀態顯示
            if (readyMsg) {
                readyMsg.innerHTML = '<i data-lucide="check-circle" class="w-3 h-3"></i> SYSTEM READY';
                readyMsg.classList.remove('hidden');
                // 嘗試重新渲染圖標 (如果 lucide 有載入的話)
                if (typeof lucide !== 'undefined') safeRenderIcons();
            }

            // 綁定按鈕點擊
            if (startBtn) {
                // 先移除舊的監聽器避免重複 (雖然 reload 不會，但保險起見)
                const newBtn = startBtn.cloneNode(true);
                startBtn.parentNode.replaceChild(newBtn, startBtn);
                newBtn.addEventListener('click', enterSystem);
            }
        }, 800);
    });
});