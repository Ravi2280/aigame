class RPGCharacterGenerator {
    constructor() {
        this.canvas = document.getElementById('characterCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        
        this.isMonsterMode = false;
        this.aiEnhancedAnimations = false;
        this.aiAnimationParameters = {};
        
        this.character = {
            race: 'human',
            head: 0,
            hair: 0,
            eyes: 0,
            helmet: null,
            armor: 0,
            boots: 0,
            gloves: 0,
            weapon: null,
            shield: null,
            cape: null,
            accessory: null,
            aura: null,
            wings: null,
            tail: null,
            horns: null,
            colors: {
                skin: '#fdbcb4',
                hair: '#8b4513',
                armor: '#4a5568',
                weapon: '#718096',
                magic: '#8b5cf6'
            }
        };
        
        this.currentAnimation = 'idle';
        this.animationFrame = 0;
        this.animationTimer = null;
        this.animationSpeed = 80; // Faster for smoother animation (was 120)
        
        this.partData = this.generatePartData();
        this.monsterPartData = this.generateMonsterPartData();
        this.presets = this.generatePresets();
        this.monsterPresets = this.generateMonsterPresets();
        
        this.init();
    }
    
    generatePartData() {
        return {
            heads: [
                { name: 'Round', color: true, style: 'classic' },
                { name: 'Square', color: true, style: 'bold' },
                { name: 'Oval', color: true, style: 'elegant' },
                { name: 'Angular', color: true, style: 'sharp' },
                { name: 'Heart', color: true, style: 'soft' },
                { name: 'Noble', color: true, style: 'regal' },
                { name: 'Rugged', color: true, style: 'rough' },
                { name: 'Lean', color: true, style: 'thin' },
                { name: 'Broad', color: true, style: 'wide' }
            ],
            hair: [
                { name: 'Short', color: true, style: 'clean' },
                { name: 'Long', color: true, style: 'flowing' },
                { name: 'Curly', color: true, style: 'textured' },
                { name: 'Bald', color: false, style: 'none' },
                { name: 'Ponytail', color: true, style: 'tied' },
                { name: 'Braided', color: true, style: 'woven' },
                { name: 'Spiky', color: true, style: 'wild' },
                { name: 'Wavy', color: true, style: 'soft' },
                { name: 'Mohawk', color: true, style: 'punk' },
                { name: 'Dreadlocks', color: true, style: 'tribal' },
                { name: 'Flowing', color: true, style: 'ethereal' },
                { name: 'Messy', color: true, style: 'unkempt' }
            ],
            eyes: [
                { name: 'Normal', color: false, style: 'human' },
                { name: 'Large', color: false, style: 'anime' },
                { name: 'Narrow', color: false, style: 'focused' },
                { name: 'Sharp', color: false, style: 'predator' },
                { name: 'Round', color: false, style: 'innocent' },
                { name: 'Glowing', color: false, style: 'magical' },
                { name: 'Closed', color: false, style: 'serene' },
                { name: 'Winking', color: false, style: 'playful' },
                { name: 'Cat-like', color: false, style: 'feline' },
                { name: 'Glowing Orbs', color: false, style: 'mystical' }
            ],
            helmets: [
                { name: 'None', color: false },
                { name: 'Leather Cap', color: true },
                { name: 'Iron Helmet', color: true },
                { name: 'Steel Helm', color: true },
                { name: 'Crown', color: true },
                { name: 'Wizard Hat', color: true },
                { name: 'Hood', color: true },
                { name: 'Barbute', color: true },
                { name: 'Winged Helm', color: true },
                { name: 'Skull Cap', color: true }
            ],
            armor: [
                { name: 'Cloth Robes', color: true },
                { name: 'Leather Armor', color: true },
                { name: 'Chain Mail', color: true },
                { name: 'Plate Armor', color: true },
                { name: 'Mage Robes', color: true },
                { name: 'Scale Mail', color: true },
                { name: 'Royal Garb', color: true },
                { name: 'Dragon Scale', color: true },
                { name: 'Crystal Armor', color: true }
            ],
            boots: [
                { name: 'Barefoot', color: false },
                { name: 'Leather Boots', color: true },
                { name: 'Iron Boots', color: true },
                { name: 'Steel Boots', color: true },
                { name: 'Magic Boots', color: true },
                { name: 'Winged Boots', color: true },
                { name: 'Heavy Boots', color: true },
                { name: 'Stealth Boots', color: true }
            ],
            gloves: [
                { name: 'None', color: false },
                { name: 'Leather Gloves', color: true },
                { name: 'Iron Gauntlets', color: true },
                { name: 'Steel Gauntlets', color: true },
                { name: 'Magic Gloves', color: true },
                { name: 'Clawed Gauntlets', color: true },
                { name: 'Spell Gloves', color: true }
            ],
            weapons: [
                { name: 'None', color: false },
                { name: 'Short Sword', color: true },
                { name: 'Long Sword', color: true },
                { name: 'Great Sword', color: true },
                { name: 'Magic Staff', color: true },
                { name: 'War Staff', color: true },
                { name: 'Bow', color: true },
                { name: 'Crossbow', color: true },
                { name: 'Dagger', color: true },
                { name: 'Twin Daggers', color: true },
                { name: 'War Axe', color: true },
                { name: 'Battle Axe', color: true },
                { name: 'War Hammer', color: true },
                { name: 'Spear', color: true },
                { name: 'Halberd', color: true },
                { name: 'Wand', color: true },
                { name: 'Crystal Orb', color: true }
            ],
            shields: [
                { name: 'None', color: false },
                { name: 'Buckler', color: true },
                { name: 'Round Shield', color: true },
                { name: 'Kite Shield', color: true },
                { name: 'Tower Shield', color: true },
                { name: 'Magic Shield', color: true },
                { name: 'Spiked Shield', color: true }
            ],
            capes: [
                { name: 'None', color: false },
                { name: 'Short Cape', color: true },
                { name: 'Long Cape', color: true },
                { name: 'Royal Cape', color: true },
                { name: 'Tattered Cape', color: true },
                { name: 'Feathered Cape', color: true },
                { name: 'Magic Cloak', color: true }
            ],
            accessories: [
                { name: 'None', color: false },
                { name: 'Necklace', color: true },
                { name: 'Ring', color: true },
                { name: 'Belt', color: true },
                { name: 'Amulet', color: true },
                { name: 'Pendant', color: true },
                { name: 'Bracers', color: true },
                { name: 'Sash', color: true }
            ],
            auras: [
                { name: 'None', color: false },
                { name: 'Fire Aura', color: true },
                { name: 'Ice Aura', color: true },
                { name: 'Lightning Aura', color: true },
                { name: 'Dark Aura', color: true },
                { name: 'Holy Aura', color: true },
                { name: 'Nature Aura', color: true }
            ],
            wings: [
                { name: 'None', color: false },
                { name: 'Angel Wings', color: true },
                { name: 'Demon Wings', color: true },
                { name: 'Dragon Wings', color: true },
                { name: 'Fairy Wings', color: true },
                { name: 'Bat Wings', color: true }
            ],
            tails: [
                { name: 'None', color: false },
                { name: 'Cat Tail', color: true },
                { name: 'Dragon Tail', color: true },
                { name: 'Devil Tail', color: true },
                { name: 'Lizard Tail', color: true }
            ],
            horns: [
                { name: 'None', color: false },
                { name: 'Small Horns', color: true },
                { name: 'Curved Horns', color: true },
                { name: 'Demon Horns', color: true },
                { name: 'Dragon Horns', color: true },
                { name: 'Antlers', color: true }
            ]
        };
    }
    
    generateMonsterPartData() {
        return {
            heads: [
                { name: 'Goblin', color: true },
                { name: 'Orc', color: true },
                { name: 'Dragon', color: true },
                { name: 'Skeleton', color: false },
                { name: 'Demon', color: true },
                { name: 'Beast', color: true },
                { name: 'Undead', color: true },
                { name: 'Elemental', color: true }
            ],
            hair: [
                { name: 'None', color: false },
                { name: 'Wild Mane', color: true },
                { name: 'Spiky', color: true },
                { name: 'Tentacles', color: true },
                { name: 'Flames', color: true }
            ],
            eyes: [
                { name: 'Red Glow', color: false },
                { name: 'Yellow Slit', color: false },
                { name: 'Empty Sockets', color: false },
                { name: 'Multiple Eyes', color: false },
                { name: 'Glowing Orbs', color: false }
            ],
            helmets: [
                { name: 'None', color: false },
                { name: 'Skull Crown', color: true },
                { name: 'Bone Helmet', color: true },
                { name: 'Spiked Helm', color: true },
                { name: 'Tribal Mask', color: true }
            ],
            armor: [
                { name: 'Natural Hide', color: true },
                { name: 'Bone Armor', color: true },
                { name: 'Spiked Leather', color: true },
                { name: 'Scale Hide', color: true },
                { name: 'Tribal Garb', color: true }
            ],
            boots: [
                { name: 'Clawed Feet', color: true },
                { name: 'Hooved', color: true },
                { name: 'Talons', color: true },
                { name: 'Bone Boots', color: true }
            ],
            gloves: [
                { name: 'Claws', color: true },
                { name: 'Bone Claws', color: true },
                { name: 'Spiked Fists', color: true },
                { name: 'Tentacle Arms', color: true }
            ],
            weapons: [
                { name: 'None', color: false },
                { name: 'Crude Club', color: true },
                { name: 'Bone Sword', color: true },
                { name: 'Spiked Mace', color: true },
                { name: 'Dark Staff', color: true },
                { name: 'Claw Weapon', color: true }
            ],
            shields: [
                { name: 'None', color: false },
                { name: 'Bone Shield', color: true },
                { name: 'Hide Shield', color: true },
                { name: 'Skull Shield', color: true }
            ],
            capes: [
                { name: 'None', color: false },
                { name: 'Tattered Cloak', color: true },
                { name: 'Bone Cape', color: true },
                { name: 'Shadow Cloak', color: true }
            ],
            accessories: [
                { name: 'None', color: false },
                { name: 'Bone Necklace', color: true },
                { name: 'Skull Trophy', color: true },
                { name: 'Tribal Paint', color: true }
            ],
            auras: [
                { name: 'None', color: false },
                { name: 'Dark Energy', color: true },
                { name: 'Poison Cloud', color: true },
                { name: 'Death Aura', color: true },
                { name: 'Rage Aura', color: true }
            ],
            wings: [
                { name: 'None', color: false },
                { name: 'Bat Wings', color: true },
                { name: 'Dragon Wings', color: true },
                { name: 'Torn Wings', color: true },
                { name: 'Bone Wings', color: true }
            ],
            tails: [
                { name: 'None', color: false },
                { name: 'Spiked Tail', color: true },
                { name: 'Dragon Tail', color: true },
                { name: 'Barbed Tail', color: true },
                { name: 'Scorpion Tail', color: true }
            ],
            horns: [
                { name: 'None', color: false },
                { name: 'Demon Horns', color: true },
                { name: 'Bull Horns', color: true },
                { name: 'Twisted Horns', color: true },
                { name: 'Bone Spikes', color: true }
            ]
        };
    }
    
    generatePresets() {
        return {
            warrior: {
                race: 'human',
                head: 1,
                hair: 0,
                eyes: 0,
                helmet: 3,
                armor: 3,
                boots: 3,
                gloves: 3,
                weapon: 1,
                shield: 3,
                cape: 0,
                accessory: 3,
                colors: {
                    skin: '#fdbcb4',
                    hair: '#8b4513',
                    armor: '#4a5568',
                    weapon: '#718096'
                }
            },
            mage: {
                race: 'elf',
                head: 0,
                hair: 1,
                eyes: 1,
                helmet: 0,
                armor: 0,
                boots: 1,
                gloves: 1,
                weapon: 2,
                shield: 0,
                cape: 2,
                accessory: 1,
                colors: {
                    skin: '#f7e6d7',
                    hair: '#dda0dd',
                    armor: '#6b46c1',
                    weapon: '#8b5cf6'
                }
            },
            rogue: {
                race: 'human',
                head: 0,
                hair: 0,
                eyes: 2,
                helmet: 1,
                armor: 1,
                boots: 1,
                gloves: 1,
                weapon: 4,
                shield: 0,
                cape: 1,
                accessory: 2,
                colors: {
                    skin: '#fdbcb4',
                    hair: '#2d1b0e',
                    armor: '#374151',
                    weapon: '#6b7280'
                }
            },
            archer: {
                race: 'elf',
                head: 0,
                hair: 1,
                eyes: 0,
                helmet: 0,
                armor: 1,
                boots: 1,
                gloves: 1,
                weapon: 3,
                shield: 0,
                cape: 0,
                accessory: 0,
                colors: {
                    skin: '#f7e6d7',
                    hair: '#8fbc8f',
                    armor: '#22c55e',
                    weapon: '#92400e'
                }
            }
        };
    }
    
    generateMonsterPresets() {
        return {
            goblin: {
                race: 'goblin',
                head: 0,
                hair: 0,
                eyes: 0,
                helmet: 0,
                armor: 0,
                boots: 0,
                gloves: 0,
                weapon: 1,
                shield: 0,
                cape: 0,
                accessory: 0,
                aura: 0,
                wings: 0,
                tail: 0,
                horns: 1,
                colors: {
                    skin: '#8fbc8f',
                    hair: '#2d1b0e',
                    armor: '#654321',
                    weapon: '#8b4513',
                    magic: '#ff4500'
                }
            },
            dragon: {
                race: 'dragon',
                head: 2,
                hair: 0,
                eyes: 1,
                helmet: 0,
                armor: 3,
                boots: 2,
                gloves: 1,
                weapon: 0,
                shield: 0,
                cape: 0,
                accessory: 0,
                aura: 1,
                wings: 2,
                tail: 1,
                horns: 4,
                colors: {
                    skin: '#dc143c',
                    hair: '#000000',
                    armor: '#8b0000',
                    weapon: '#ffd700',
                    magic: '#ff6347'
                }
            },
            skeleton: {
                race: 'skeleton',
                head: 3,
                hair: 0,
                eyes: 2,
                helmet: 1,
                armor: 1,
                boots: 3,
                gloves: 1,
                weapon: 2,
                shield: 2,
                cape: 1,
                accessory: 1,
                aura: 2,
                wings: 0,
                tail: 0,
                horns: 0,
                colors: {
                    skin: '#f5f5dc',
                    hair: '#000000',
                    armor: '#696969',
                    weapon: '#708090',
                    magic: '#9370db'
                }
            },
            demon: {
                race: 'demon',
                head: 4,
                hair: 0,
                eyes: 0,
                helmet: 0,
                armor: 2,
                boots: 0,
                gloves: 2,
                weapon: 4,
                shield: 0,
                cape: 2,
                accessory: 0,
                aura: 0,
                wings: 1,
                tail: 2,
                horns: 0,
                colors: {
                    skin: '#8b0000',
                    hair: '#000000',
                    armor: '#2f2f2f',
                    weapon: '#ff4500',
                    magic: '#dc143c'
                }
            }
        };
    }
    
    init() {
        this.setupEventListeners();
        this.setupPartSelectors();
        this.setupColorPickers();
        this.setActiveTab('body');
        this.setActiveRace('human');
        this.setActiveAnimation('idle');
        this.render();
        this.startAnimation();
    }
    
    setupEventListeners() {
        // Mode switching
        document.getElementById('characterMode').addEventListener('click', () => {
            this.switchMode(false);
        });
        
        document.getElementById('monsterMode').addEventListener('click', () => {
            this.switchMode(true);
        });
        
        // AI Generation - Updated to use modal
        document.getElementById('aiGenerate').addEventListener('click', () => {
            this.openAIModal();
        });
        
        // Modal event listeners
        this.setupModalEventListeners();
        
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                this.setActiveTab(button.dataset.tab);
            });
        });
        
        // Race selection
        document.querySelectorAll('.race-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.setActiveRace(button.dataset.race);
            });
        });
        
        // Preset selection
        document.querySelectorAll('.preset-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.applyPreset(button.dataset.preset);
            });
        });
        
        // Animation selection
        document.querySelectorAll('.animation-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.setActiveAnimation(button.dataset.animation);
            });
        });
        
        // Export buttons
        const exportPNG = document.getElementById('exportPNG');
        if (exportPNG) {
            exportPNG.addEventListener('click', () => {
                this.exportPNG();
            });
        }
        
        const exportSVG = document.getElementById('exportSVG');
        if (exportSVG) {
            exportSVG.addEventListener('click', () => {
                this.exportSVG();
            });
        }
        
        const exportSpriteSheet = document.getElementById('exportSpriteSheet');
        if (exportSpriteSheet) {
            exportSpriteSheet.addEventListener('click', () => {
                this.exportSpriteSheet();
            });
        }
        
        const exportGIF = document.getElementById('exportGIF');
        if (exportGIF) {
            exportGIF.addEventListener('click', () => {
                this.exportGIF();
            });
        }
        
        // Random and Save/Load buttons
        document.getElementById('randomize').addEventListener('click', () => {
            this.randomizeCharacter();
        });
        
        const saveCharacter = document.getElementById('saveCharacter');
        if (saveCharacter) {
            saveCharacter.addEventListener('click', () => {
                this.saveCharacter();
            });
        }
        
        const loadCharacter = document.getElementById('loadCharacter');
        if (loadCharacter) {
            loadCharacter.addEventListener('click', () => {
                this.loadCharacter();
            });
        }
    }
    
    setupModalEventListeners() {
        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeAIModal();
        });
        
        document.getElementById('closeCharacterInfo').addEventListener('click', () => {
            this.closeCharacterInfoModal();
        });
        
        // Generation type selection
        document.getElementById('characterGenType').addEventListener('click', () => {
            this.setGenerationType('character');
        });
        
        document.getElementById('monsterGenType').addEventListener('click', () => {
            this.setGenerationType('monster');
        });
        
        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('aiPromptModal').value = btn.dataset.suggestion;
            });
        });
        
        // Generation buttons
        document.getElementById('generateAI').addEventListener('click', () => {
            this.generateFromAIModal();
        });
        
        document.getElementById('randomGenerate').addEventListener('click', () => {
            this.generateRandomAI();
        });
        
        // Character info modal
        document.getElementById('acceptCharacter').addEventListener('click', () => {
            this.closeCharacterInfoModal();
        });
        
        document.getElementById('regenerateCharacter').addEventListener('click', () => {
            this.closeCharacterInfoModal();
            this.generateFromAIModal();
        });
        
        // Close modal on backdrop click
        document.getElementById('aiModal').addEventListener('click', (e) => {
            if (e.target.id === 'aiModal') this.closeAIModal();
        });
        
        document.getElementById('characterInfoModal').addEventListener('click', (e) => {
            if (e.target.id === 'characterInfoModal') this.closeCharacterInfoModal();
        });
    }
    
    switchMode(isMonster) {
        this.isMonsterMode = isMonster;
        
        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('bg-blue-600');
            btn.classList.add('bg-gray-700');
        });
        
        if (isMonster) {
            document.getElementById('monsterMode').classList.add('bg-blue-600');
            document.getElementById('monsterMode').classList.remove('bg-gray-700');
        } else {
            document.getElementById('characterMode').classList.add('bg-blue-600');
            document.getElementById('characterMode').classList.remove('bg-gray-700');
        }
        
        this.updatePresetButtons();
        this.setupPartSelectors();
        this.render();
    }
    
    updatePresetButtons() {
        const container = document.getElementById('presetContainer');
        container.innerHTML = '';
        
        const presets = this.isMonsterMode ? this.monsterPresets : this.presets;
        Object.keys(presets).forEach(presetName => {
            const button = document.createElement('button');
            button.className = 'preset-btn px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm';
            button.textContent = presetName.charAt(0).toUpperCase() + presetName.slice(1);
            button.dataset.preset = presetName;
            button.addEventListener('click', () => {
                this.applyPreset(presetName);
            });
            container.appendChild(button);
        });
    }
    
    setupPartSelectors() {
        const currentPartData = this.isMonsterMode ? this.monsterPartData : this.partData;
        
        Object.keys(currentPartData).forEach(partType => {
            const selector = document.getElementById(partType + 'Selector');
            if (!selector) return;
            
            selector.innerHTML = ''; // Clear existing options
            
            currentPartData[partType].forEach((part, index) => {
                const button = document.createElement('button');
                button.className = 'part-option bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-xs';
                button.textContent = part.name;
                button.dataset.part = partType;
                button.dataset.index = index;
                
                button.addEventListener('click', () => {
                    this.selectPart(partType, index);
                });
                
                selector.appendChild(button);
            });
        });
    }
    
    setupColorPickers() {
        const colorCategories = [
            { id: 'skinColorPicker', colors: ['#fdbcb4', '#f7e6d7', '#d2691e', '#8b4513', '#654321', '#98fb98', '#8fbc8f', '#dc143c', '#8b0000', '#f5f5dc'] },
            { id: 'hairColorPicker', colors: ['#000000', '#8b4513', '#dda0dd', '#ffd700', '#ff6347', '#8fbc8f', '#2d1b0e', '#708090'] },
            { id: 'armorColorPicker', colors: ['#4a5568', '#6b46c1', '#374151', '#22c55e', '#dc2626', '#f59e0b', '#654321', '#8b0000', '#696969', '#2f2f2f'] },
            { id: 'weaponColorPicker', colors: ['#718096', '#8b5cf6', '#6b7280', '#92400e', '#991b1b', '#059669', '#8b4513', '#ffd700', '#708090', '#ff4500'] },
            { id: 'magicColorPicker', colors: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#ff4500', '#ff6347', '#9370db', '#dc143c'] }
        ];
        
        colorCategories.forEach(category => {
            const picker = document.getElementById(category.id);
            if (!picker) return;
            
            category.colors.forEach(color => {
                const button = document.createElement('button');
                button.className = 'color-picker';
                button.style.backgroundColor = color;
                button.dataset.color = color;
                button.dataset.category = category.id.replace('ColorPicker', '');
                
                button.addEventListener('click', () => {
                    this.setColor(button.dataset.category, color);
                });
                
                picker.appendChild(button);
            });
        });
    }
    
    setActiveTab(tabName) {
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.querySelector(`.tab-content[data-tab="${tabName}"]`).classList.remove('hidden');
    }
    
    setActiveRace(race) {
        document.querySelectorAll('.race-btn').forEach(btn => {
            btn.classList.remove('bg-blue-600');
            btn.classList.add('bg-gray-700');
        });
        document.querySelector(`[data-race="${race}"]`).classList.add('bg-blue-600');
        document.querySelector(`[data-race="${race}"]`).classList.remove('bg-gray-700');
        
        this.character.race = race;
        this.render();
    }
    
    setActiveAnimation(animation) {
        document.querySelectorAll('.animation-btn').forEach(btn => {
            btn.classList.remove('bg-blue-600');
            btn.classList.add('bg-gray-700');
        });
        document.querySelector(`[data-animation="${animation}"]`).classList.add('bg-blue-600');
        document.querySelector(`[data-animation="${animation}"]`).classList.remove('bg-gray-700');
        
        this.currentAnimation = animation;
        this.animationFrame = 0;
    }
    
    selectPart(partType, index) {
        const selector = document.getElementById(partType + 'Selector');
        selector.querySelectorAll('.part-option').forEach(btn => {
            btn.classList.remove('selected');
        });
        selector.children[index].classList.add('selected');
        
        this.character[partType.replace('s', '')] = index === 0 && partType !== 'heads' && partType !== 'armor' ? null : index;
        this.render();
    }
    
    setColor(category, color) {
        this.character.colors[category] = color;
        this.render();
    }
    
    applyPreset(presetName) {
        const presets = this.isMonsterMode ? this.monsterPresets : this.presets;
        const preset = presets[presetName];
        if (!preset) return;
        
        this.character = { ...preset };
        if (!this.isMonsterMode) {
            this.setActiveRace(preset.race);
        }
        this.updateUIFromCharacter();
        this.render();
    }
    
    updateUIFromCharacter() {
        // Update part selections
        Object.keys(this.partData).forEach(partType => {
            const selector = document.getElementById(partType + 'Selector');
            if (!selector) return;
            
            selector.querySelectorAll('.part-option').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            const partValue = this.character[partType.replace('s', '')];
            const index = partValue === null ? 0 : partValue;
            if (selector.children[index]) {
                selector.children[index].classList.add('selected');
            }
        });
    }
    
    drawPixelRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }
    
    drawHead() {
        const headStyle = this.character.head;
        const skinColor = this.character.colors.skin;
        const shadowColor = chroma(skinColor).darken(0.5).hex();
        const lightColor = chroma(skinColor).brighten(0.3).hex();
        
        // Enhanced head shapes with more variety
        switch (headStyle) {
            case 0: // Round - Classic circular
                this.drawPixelRect(44, 16, 6, 6, skinColor);
                this.drawPixelRect(43, 17, 8, 4, skinColor);
                // Subtle shading
                this.drawPixelRect(48, 19, 2, 2, shadowColor);
                this.drawPixelRect(44, 17, 1, 1, lightColor);
                break;
            case 1: // Square - Bold angular
                this.drawPixelRect(43, 16, 8, 6, skinColor);
                this.drawPixelRect(49, 18, 2, 3, shadowColor);
                this.drawPixelRect(43, 16, 2, 2, lightColor);
                break;
            case 2: // Oval - Elegant elongated
                this.drawPixelRect(44, 15, 6, 8, skinColor);
                this.drawPixelRect(43, 17, 8, 4, skinColor);
                this.drawPixelRect(48, 19, 2, 4, shadowColor);
                this.drawPixelRect(44, 16, 1, 2, lightColor);
                break;
            case 3: // Angular - Sharp features
                this.drawPixelRect(44, 15, 6, 7, skinColor);
                this.drawPixelRect(43, 17, 8, 3, skinColor);
                // Sharp cheekbones
                this.drawPixelRect(42, 18, 1, 2, shadowColor);
                this.drawPixelRect(51, 18, 1, 2, shadowColor);
                this.drawPixelRect(45, 16, 1, 1, lightColor);
                break;
            case 4: // Heart - Soft romantic
                this.drawPixelRect(44, 15, 6, 7, skinColor);
                this.drawPixelRect(43, 17, 8, 3, skinColor);
                this.drawPixelRect(45, 20, 4, 2, skinColor); // Pointed chin
                this.drawPixelRect(47, 19, 2, 2, shadowColor);
                this.drawPixelRect(44, 16, 2, 1, lightColor);
                break;
            case 5: // Noble - Regal proportions
                this.drawPixelRect(43, 15, 8, 8, skinColor);
                this.drawPixelRect(42, 17, 10, 4, skinColor);
                this.drawPixelRect(49, 19, 3, 3, shadowColor);
                this.drawPixelRect(43, 16, 2, 2, lightColor);
                break;
            case 6: // Rugged - Rough weathered
                this.drawPixelRect(43, 16, 8, 6, skinColor);
                this.drawPixelRect(49, 18, 2, 3, shadowColor);
                // Battle scars
                this.drawPixelRect(46, 18, 1, 1, chroma(skinColor).darken(0.8).hex());
                this.drawPixelRect(43, 19, 1, 1, chroma(skinColor).darken(0.8).hex());
                break;
            case 7: // Lean - Thin gaunt
                this.drawPixelRect(45, 15, 4, 8, skinColor);
                this.drawPixelRect(44, 17, 6, 4, skinColor);
                this.drawPixelRect(48, 19, 1, 3, shadowColor);
                this.drawPixelRect(45, 16, 1, 1, lightColor);
                break;
            case 8: // Broad - Wide strong
                this.drawPixelRect(42, 16, 10, 6, skinColor);
                this.drawPixelRect(41, 18, 12, 3, skinColor);
                this.drawPixelRect(49, 19, 3, 2, shadowColor);
                this.drawPixelRect(42, 17, 2, 1, lightColor);
                break;
        }
        
        // Enhanced eyes with more variety
        this.drawEnhancedEyes();
        
        // Enhanced mouth with expression
        this.drawEnhancedMouth();
    }
    
    drawEnhancedEyes() {
        const eyeStyle = this.character.eyes;
        
        // White base for most eye types
        if (eyeStyle !== 6 && eyeStyle !== 2) { // Not closed or narrow
            this.drawPixelRect(45, 18, 1, 1, '#ffffff');
            this.drawPixelRect(48, 18, 1, 1, '#ffffff');
        }
        
        switch (eyeStyle) {
            case 0: // Normal
                this.drawPixelRect(45, 18, 1, 1, '#2563eb');
                this.drawPixelRect(48, 18, 1, 1, '#2563eb');
                break;
            case 1: // Large anime eyes
                this.drawPixelRect(44, 17, 3, 2, '#ffffff');
                this.drawPixelRect(47, 17, 3, 2, '#ffffff');
                this.drawPixelRect(45, 18, 2, 1, '#059669');
                this.drawPixelRect(48, 18, 2, 1, '#059669');
                // Eye shine
                this.drawPixelRect(45, 17, 1, 1, '#ffffff');
                this.drawPixelRect(48, 17, 1, 1, '#ffffff');
                break;
            case 2: // Narrow focused
                this.drawPixelRect(45, 18, 2, 1, '#7c2d12');
                this.drawPixelRect(48, 18, 2, 1, '#7c2d12');
                break;
            case 3: // Sharp predator
                this.drawPixelRect(45, 18, 1, 1, '#dc2626');
                this.drawPixelRect(48, 18, 1, 1, '#dc2626');
                // Sharp corners
                this.drawPixelRect(44, 18, 1, 1, '#991b1b');
                this.drawPixelRect(49, 18, 1, 1, '#991b1b');
                break;
            case 4: // Round innocent
                this.drawPixelRect(44, 17, 3, 2, '#ffffff');
                this.drawPixelRect(47, 17, 3, 2, '#ffffff');
                this.drawPixelRect(45, 18, 1, 1, '#3b82f6');
                this.drawPixelRect(48, 18, 1, 1, '#3b82f6');
                break;
            case 5: // Glowing magical
                this.drawPixelRect(45, 18, 1, 1, '#8b5cf6');
                this.drawPixelRect(48, 18, 1, 1, '#8b5cf6');
                // Glow effect
                this.ctx.globalAlpha = 0.6;
                this.drawPixelRect(44, 17, 3, 3, '#a855f7');
                this.drawPixelRect(47, 17, 3, 3, '#a855f7');
                this.ctx.globalAlpha = 1.0;
                break;
            case 6: // Closed serene
                this.drawPixelRect(45, 18, 2, 1, '#1f2937');
                this.drawPixelRect(48, 18, 2, 1, '#1f2937');
                break;
            case 7: // Winking playful
                this.drawPixelRect(45, 18, 2, 1, '#1f2937'); // Closed eye
                this.drawPixelRect(48, 18, 1, 1, '#059669'); // Open eye
                break;
            case 8: // Cat-like feline
                this.drawPixelRect(45, 18, 1, 2, '#fbbf24'); // Vertical pupils
                this.drawPixelRect(48, 18, 1, 2, '#fbbf24');
                break;
            case 9: // Glowing orbs mystical
                this.drawPixelRect(44, 17, 3, 3, '#06b6d4');
                this.drawPixelRect(47, 17, 3, 3, '#06b6d4');
                this.ctx.globalAlpha = 0.8;
                this.drawPixelRect(45, 18, 1, 1, '#ffffff');
                this.drawPixelRect(48, 18, 1, 1, '#ffffff');
                this.ctx.globalAlpha = 1.0;
                break;
        }
    }
    
    drawEnhancedMouth() {
        const headStyle = this.character.head;
        
        // Vary mouth based on head style
        switch (headStyle) {
            case 0: case 2: case 4: // Round, Oval, Heart - soft smile
                this.drawPixelRect(46, 20, 2, 1, '#dc2626');
                break;
            case 1: case 3: case 6: // Square, Angular, Rugged - stern line
                this.drawPixelRect(46, 20, 2, 1, '#991b1b');
                break;
            case 5: // Noble - slight upturn
                this.drawPixelRect(46, 20, 2, 1, '#dc2626');
                this.drawPixelRect(47, 19, 1, 1, '#dc2626');
                break;
            case 7: // Lean - thin line
                this.drawPixelRect(46, 20, 1, 1, '#991b1b');
                break;
            case 8: // Broad - wide grin
                this.drawPixelRect(45, 20, 4, 1, '#dc2626');
                break;
            default:
                this.drawPixelRect(46, 20, 2, 1, '#991b1b');
        }
    }
    
    drawHair() {
        if (this.character.hair === 3) return; // Bald
        
        const hairColor = this.character.colors.hair;
        const hairStyle = this.character.hair;
        
        switch (hairStyle) {
            case 0: // Short
                this.drawPixelRect(42, 14, 10, 4, hairColor);
                break;
            case 1: // Long
                this.drawPixelRect(41, 14, 12, 6, hairColor);
                this.drawPixelRect(40, 20, 14, 3, hairColor);
                break;
            case 2: // Curly
                this.drawPixelRect(42, 13, 10, 5, hairColor);
                this.drawPixelRect(41, 16, 12, 2, hairColor);
                break;
            case 3: // Ponytail
                this.drawPixelRect(42, 13, 10, 5, hairColor);
                this.drawPixelRect(41, 16, 12, 2, hairColor);
                break;
            case 4: // Braided
                this.drawPixelRect(42, 13, 10, 5, hairColor);
                this.drawPixelRect(41, 16, 12, 2, hairColor);
                break;
            case 5: // Spiky
                this.drawPixelRect(42, 13, 10, 5, hairColor);
                this.drawPixelRect(41, 16, 12, 2, hairColor);
                break;
            case 6: // Wavy
                this.drawPixelRect(42, 13, 10, 5, hairColor);
                this.drawPixelRect(41, 16, 12, 2, hairColor);
                break;
            case 7: // Mohawk
                this.drawPixelRect(42, 13, 10, 5, hairColor);
                this.drawPixelRect(41, 16, 12, 2, hairColor);
                break;
            case 8: // Dreadlocks
                this.drawPixelRect(42, 13, 10, 5, hairColor);
                this.drawPixelRect(41, 16, 12, 2, hairColor);
                break;
            case 9: // Flowing
                this.drawPixelRect(42, 13, 10, 5, hairColor);
                this.drawPixelRect(41, 16, 12, 2, hairColor);
                break;
            case 10: // Messy
                this.drawPixelRect(42, 13, 10, 5, hairColor);
                this.drawPixelRect(41, 16, 12, 2, hairColor);
                break;
        }
    }
    
    drawBody(offset = {x: 0, y: 0}) {
        const skinColor = this.character.colors.skin;
        const shadowColor = chroma(skinColor).darken(0.3).hex();
        
        // Neck with shadow
        this.drawPixelRect(46 + offset.x, 22 + offset.y, 2, 2, skinColor);
        
        // Torso with muscle definition
        this.drawPixelRect(43 + offset.x, 24 + offset.y, 8, 10, skinColor);
        // Chest muscles
        this.drawPixelRect(44 + offset.x, 25 + offset.y, 2, 3, shadowColor);
        this.drawPixelRect(48 + offset.x, 25 + offset.y, 2, 3, shadowColor);
        
        // Arms (will be drawn separately now)
        this.drawArms(offset);
        
        // Enhanced legs (will be drawn separately)
        this.drawLegs();
    }
    
    drawArms(bodyOffset = {x: 0, y: 0}) {
        const skinColor = this.character.colors.skin;
        const shadowColor = chroma(skinColor).darken(0.3).hex();
        
        // Left arm (static)
        this.drawPixelRect(40 + bodyOffset.x, 26 + bodyOffset.y, 3, 8, skinColor);
        this.drawPixelRect(41 + bodyOffset.x, 27 + bodyOffset.y, 1, 3, shadowColor);
        
        // Right arm (animated for weapons)
        const armOffset = this.animationOffsets.rightArm || {x: 0, y: 0};
        this.drawPixelRect(51 + bodyOffset.x + armOffset.x, 26 + bodyOffset.y + armOffset.y, 3, 8, skinColor);
        this.drawPixelRect(52 + bodyOffset.x + armOffset.x, 27 + bodyOffset.y + armOffset.y, 1, 3, shadowColor);
        
        // Draw gloves if equipped
        this.drawGloves(bodyOffset, armOffset);
    }
    
    drawGloves(bodyOffset = {x: 0, y: 0}, armOffset = {x: 0, y: 0}) {
        if (this.character.gloves === null || this.character.gloves === 0) return;
        
        const armorColor = this.character.colors.armor;
        const shadowColor = chroma(armorColor).darken(0.5).hex();
        
        // Left glove
        this.drawPixelRect(40 + bodyOffset.x, 32 + bodyOffset.y, 3, 2, armorColor);
        
        // Right glove
        this.drawPixelRect(51 + bodyOffset.x + armOffset.x, 32 + bodyOffset.y + armOffset.y, 3, 2, armorColor);
        
        if (this.character.gloves >= 4) { // Magic/Claw gloves
            this.drawPixelRect(41 + bodyOffset.x, 33 + bodyOffset.y, 1, 1, '#ffd700');
            this.drawPixelRect(52 + bodyOffset.x + armOffset.x, 33 + bodyOffset.y + armOffset.y, 1, 1, '#ffd700');
        }
    }
    
    drawLegs() {
        const skinColor = this.character.colors.skin;
        const shadowColor = chroma(skinColor).darken(0.3).hex();
        
        // Left leg with animation
        const leftLegOffset = this.animationOffsets.leftLeg || {x: 0, y: 0};
        this.drawPixelRect(44 + leftLegOffset.x, 34 + leftLegOffset.y, 3, 10, skinColor);
        this.drawPixelRect(45 + leftLegOffset.x, 35 + leftLegOffset.y, 1, 4, shadowColor);
        
        // Right leg with animation  
        const rightLegOffset = this.animationOffsets.rightLeg || {x: 0, y: 0};
        this.drawPixelRect(47 + rightLegOffset.x, 34 + rightLegOffset.y, 3, 10, skinColor);
        this.drawPixelRect(48 + rightLegOffset.x, 35 + rightLegOffset.y, 1, 4, shadowColor);
    }
    
    drawBoots() {
        if (this.character.boots === null || this.character.boots === 0) return;
        
        const armorColor = this.character.colors.armor;
        const lightColor = chroma(armorColor).brighten(0.5).hex();
        const shadowColor = chroma(armorColor).darken(0.5).hex();
        
        const leftLegOffset = this.animationOffsets.leftLeg || {x: 0, y: 0};
        const rightLegOffset = this.animationOffsets.rightLeg || {x: 0, y: 0};
        
        switch (this.character.boots) {
            case 1: // Leather boots
                // Left boot
                this.drawPixelRect(44 + leftLegOffset.x, 41 + leftLegOffset.y, 3, 3, armorColor);
                this.drawPixelRect(45 + leftLegOffset.x, 42 + leftLegOffset.y, 1, 1, lightColor);
                // Right boot
                this.drawPixelRect(47 + rightLegOffset.x, 41 + rightLegOffset.y, 3, 3, armorColor);
                this.drawPixelRect(48 + rightLegOffset.x, 42 + rightLegOffset.y, 1, 1, lightColor);
                break;
            case 2: // Iron boots
                // Left boot
                this.drawPixelRect(43 + leftLegOffset.x, 40 + leftLegOffset.y, 4, 4, armorColor);
                this.drawPixelRect(44 + leftLegOffset.x, 41 + leftLegOffset.y, 2, 2, lightColor);
                this.drawPixelRect(45 + leftLegOffset.x, 42 + leftLegOffset.y, 1, 1, shadowColor);
                // Right boot
                this.drawPixelRect(46 + rightLegOffset.x, 40 + rightLegOffset.y, 4, 4, armorColor);
                this.drawPixelRect(47 + rightLegOffset.x, 41 + rightLegOffset.y, 2, 2, lightColor);
                this.drawPixelRect(48 + rightLegOffset.x, 42 + rightLegOffset.y, 1, 1, shadowColor);
                break;
            case 3: // Steel boots
                // Left boot
                this.drawPixelRect(43 + leftLegOffset.x, 39 + leftLegOffset.y, 4, 5, armorColor);
                this.drawPixelRect(44 + leftLegOffset.x, 40 + leftLegOffset.y, 2, 3, lightColor);
                this.drawPixelRect(45 + leftLegOffset.x, 41 + leftLegOffset.y, 1, 2, shadowColor);
                // Right boot
                this.drawPixelRect(46 + rightLegOffset.x, 39 + rightLegOffset.y, 4, 5, armorColor);
                this.drawPixelRect(47 + rightLegOffset.x, 40 + rightLegOffset.y, 2, 3, lightColor);
                this.drawPixelRect(48 + rightLegOffset.x, 41 + rightLegOffset.y, 1, 2, shadowColor);
                break;
            case 4: // Magic boots
                // Left boot
                this.drawPixelRect(43 + leftLegOffset.x, 40 + leftLegOffset.y, 4, 4, armorColor);
                this.drawPixelRect(44 + leftLegOffset.x, 41 + leftLegOffset.y, 2, 2, '#8b5cf6');
                this.drawPixelRect(45 + leftLegOffset.x, 42 + leftLegOffset.y, 1, 1, '#ffd700');
                // Right boot
                this.drawPixelRect(46 + rightLegOffset.x, 40 + rightLegOffset.y, 4, 4, armorColor);
                this.drawPixelRect(47 + rightLegOffset.x, 41 + rightLegOffset.y, 2, 2, '#8b5cf6');
                this.drawPixelRect(48 + rightLegOffset.x, 42 + rightLegOffset.y, 1, 1, '#ffd700');
                break;
            case 5: // Winged boots
                // Left boot
                this.drawPixelRect(43 + leftLegOffset.x, 40 + leftLegOffset.y, 4, 4, armorColor);
                this.drawPixelRect(44 + leftLegOffset.x, 41 + leftLegOffset.y, 2, 2, lightColor);
                this.drawPixelRect(42 + leftLegOffset.x, 41 + leftLegOffset.y, 1, 2, '#ffd700'); // Wing
                // Right boot
                this.drawPixelRect(46 + rightLegOffset.x, 40 + rightLegOffset.y, 4, 4, armorColor);
                this.drawPixelRect(47 + rightLegOffset.x, 41 + rightLegOffset.y, 2, 2, lightColor);
                this.drawPixelRect(50 + rightLegOffset.x, 41 + rightLegOffset.y, 1, 2, '#ffd700'); // Wing
                break;
            case 6: // Heavy boots
                // Left boot
                this.drawPixelRect(43 + leftLegOffset.x, 40 + leftLegOffset.y, 4, 4, armorColor);
                this.drawPixelRect(44 + leftLegOffset.x, 41 + leftLegOffset.y, 2, 2, lightColor);
                this.drawPixelRect(45 + leftLegOffset.x, 42 + leftLegOffset.y, 1, 1, shadowColor);
                // Right boot
                this.drawPixelRect(46 + rightLegOffset.x, 40 + rightLegOffset.y, 4, 4, armorColor);
                this.drawPixelRect(47 + rightLegOffset.x, 41 + rightLegOffset.y, 2, 2, lightColor);
                this.drawPixelRect(48 + rightLegOffset.x, 42 + rightLegOffset.y, 1, 1, shadowColor);
                break;
            case 7: // Stealth boots
                // Left boot
                this.drawPixelRect(43 + leftLegOffset.x, 40 + leftLegOffset.y, 4, 4, armorColor);
                this.drawPixelRect(44 + leftLegOffset.x, 41 + leftLegOffset.y, 2, 2, lightColor);
                this.drawPixelRect(45 + leftLegOffset.x, 42 + leftLegOffset.y, 1, 1, shadowColor);
                // Right boot
                this.drawPixelRect(46 + rightLegOffset.x, 40 + rightLegOffset.y, 4, 4, armorColor);
                this.drawPixelRect(47 + rightLegOffset.x, 41 + rightLegOffset.y, 2, 2, lightColor);
                this.drawPixelRect(48 + rightLegOffset.x, 42 + rightLegOffset.y, 1, 1, shadowColor);
                break;
        }
    }
    
    drawArmor() {
        if (this.character.armor === null) return;
        
        const armorColor = this.character.colors.armor;
        const lightColor = chroma(armorColor).brighten(0.5).hex();
        const shadowColor = chroma(armorColor).darken(0.5).hex();
        const bodyOffset = this.animationOffsets.body || {x: 0, y: 0};
        
        switch (this.character.armor) {
            case 0: // Cloth Robes
                this.drawPixelRect(43 + bodyOffset.x, 24 + bodyOffset.y, 8, 10, armorColor);
                // Cloth wrinkles
                this.drawPixelRect(44 + bodyOffset.x, 26 + bodyOffset.y, 1, 1, shadowColor);
                this.drawPixelRect(49 + bodyOffset.x, 28 + bodyOffset.y, 1, 1, shadowColor);
                break;
            case 1: // Leather Armor
                this.drawPixelRect(42 + bodyOffset.x, 24 + bodyOffset.y, 10, 10, armorColor);
                // Leather details
                this.drawPixelRect(43 + bodyOffset.x, 25 + bodyOffset.y, 8, 8, lightColor);
                this.drawPixelRect(44 + bodyOffset.x, 26 + bodyOffset.y, 6, 1, shadowColor);
                this.drawPixelRect(44 + bodyOffset.x, 29 + bodyOffset.y, 6, 1, shadowColor);
                break;
            case 2: // Chain Mail
                this.drawPixelRect(42 + bodyOffset.x, 24 + bodyOffset.y, 10, 10, armorColor);
                // Enhanced chain pattern
                for (let y = 25; y < 33; y += 2) {
                    for (let x = 43; x < 51; x += 2) {
                        this.drawPixelRect(x + bodyOffset.x, y + bodyOffset.y, 1, 1, lightColor);
                        this.drawPixelRect(x + 1 + bodyOffset.x, y + 1 + bodyOffset.y, 1, 1, shadowColor);
                    }
                }
                break;
            case 3: // Plate Armor
                this.drawPixelRect(41 + bodyOffset.x, 24 + bodyOffset.y, 12, 10, armorColor);
                this.drawPixelRect(42 + bodyOffset.x, 25 + bodyOffset.y, 10, 8, lightColor);
                // Plate segments
                this.drawPixelRect(43 + bodyOffset.x, 27 + bodyOffset.y, 8, 1, shadowColor);
                this.drawPixelRect(43 + bodyOffset.x, 30 + bodyOffset.y, 8, 1, shadowColor);
                break;
            case 4: // Mage Robes
                this.drawPixelRect(41 + bodyOffset.x, 24 + bodyOffset.y, 12, 10, armorColor);
                this.drawPixelRect(42 + bodyOffset.x, 25 + bodyOffset.y, 10, 8, lightColor);
                // Robe details
                this.drawPixelRect(43 + bodyOffset.x, 27 + bodyOffset.y, 8, 1, shadowColor);
                this.drawPixelRect(43 + bodyOffset.x, 30 + bodyOffset.y, 8, 1, shadowColor);
                break;
            case 5: // Scale Mail
                this.drawPixelRect(41 + bodyOffset.x, 24 + bodyOffset.y, 12, 10, armorColor);
                this.drawPixelRect(42 + bodyOffset.x, 25 + bodyOffset.y, 10, 8, lightColor);
                // Scale details
                this.drawPixelRect(43 + bodyOffset.x, 27 + bodyOffset.y, 8, 1, shadowColor);
                this.drawPixelRect(43 + bodyOffset.x, 30 + bodyOffset.y, 8, 1, shadowColor);
                break;
            case 6: // Royal Garb
                this.drawPixelRect(41 + bodyOffset.x, 24 + bodyOffset.y, 12, 10, armorColor);
                this.drawPixelRect(42 + bodyOffset.x, 25 + bodyOffset.y, 10, 8, lightColor);
                // Royal details
                this.drawPixelRect(43 + bodyOffset.x, 27 + bodyOffset.y, 8, 1, shadowColor);
                this.drawPixelRect(43 + bodyOffset.x, 30 + bodyOffset.y, 8, 1, shadowColor);
                break;
            case 7: // Dragon Scale
                this.drawPixelRect(41 + bodyOffset.x, 24 + bodyOffset.y, 12, 10, armorColor);
                this.drawPixelRect(42 + bodyOffset.x, 25 + bodyOffset.y, 10, 8, lightColor);
                // Dragon Scale details
                this.drawPixelRect(43 + bodyOffset.x, 27 + bodyOffset.y, 8, 1, shadowColor);
                this.drawPixelRect(43 + bodyOffset.x, 30 + bodyOffset.y, 8, 1, shadowColor);
                break;
            case 8: // Crystal Armor
                this.drawPixelRect(41 + bodyOffset.x, 24 + bodyOffset.y, 12, 10, armorColor);
                this.drawPixelRect(42 + bodyOffset.x, 25 + bodyOffset.y, 10, 8, lightColor);
                // Crystal Armor details
                this.drawPixelRect(43 + bodyOffset.x, 27 + bodyOffset.y, 8, 1, shadowColor);
                this.drawPixelRect(43 + bodyOffset.x, 30 + bodyOffset.y, 8, 1, shadowColor);
                break;
        }
    }
    
    drawWeapon() {
        if (this.character.weapon === null || this.character.weapon === 0) return;
        
        const weaponColor = this.character.colors.weapon;
        const lightColor = chroma(weaponColor).brighten(0.5).hex();
        const shadowColor = chroma(weaponColor).darken(0.5).hex();
        const armOffset = this.animationOffsets.rightArm || {x: 0, y: 0};
        const bodyOffset = this.animationOffsets.body || {x: 0, y: 0};
        
        const baseX = 55 + bodyOffset.x + armOffset.x;
        const baseY = 20 + bodyOffset.y + armOffset.y;
        
        switch (this.character.weapon) {
            case 1: // Short Sword
                // Blade with fuller
                this.drawPixelRect(baseX, baseY, 2, 12, weaponColor);
                this.drawPixelRect(baseX + 1, baseY + 1, 1, 10, lightColor);
                // Enhanced crossguard
                this.drawPixelRect(baseX - 1, baseY + 11, 4, 2, shadowColor);
                // Grip
                this.drawPixelRect(baseX, baseY + 13, 2, 3, '#8b4513');
                // Pommel
                this.drawPixelRect(baseX, baseY + 16, 2, 2, shadowColor);
                break;
            case 2: // Long Sword
                // Blade with fuller
                this.drawPixelRect(baseX, baseY, 2, 12, weaponColor);
                this.drawPixelRect(baseX + 1, baseY + 1, 1, 10, lightColor);
                // Enhanced crossguard
                this.drawPixelRect(baseX - 1, baseY + 11, 4, 2, shadowColor);
                // Grip
                this.drawPixelRect(baseX, baseY + 13, 2, 3, '#8b4513');
                // Pommel
                this.drawPixelRect(baseX, baseY + 16, 2, 2, shadowColor);
                break;
            case 3: // Great Sword
                // Blade with fuller
                this.drawPixelRect(baseX, baseY, 2, 12, weaponColor);
                this.drawPixelRect(baseX + 1, baseY + 1, 1, 10, lightColor);
                // Enhanced crossguard
                this.drawPixelRect(baseX - 1, baseY + 11, 4, 2, shadowColor);
                // Grip
                this.drawPixelRect(baseX, baseY + 13, 2, 3, '#8b4513');
                // Pommel
                this.drawPixelRect(baseX, baseY + 16, 2, 2, shadowColor);
                break;
            case 4: // Magic Staff
                // Enhanced staff with crystal
                this.drawPixelRect(baseX, baseY - 2, 2, 18, '#8b4513');
                this.drawPixelRect(baseX + 1, baseY - 1, 1, 16, '#d2691e');
                // Crystal orb
                this.drawPixelRect(baseX - 1, baseY - 2, 4, 4, weaponColor);
                this.drawPixelRect(baseX, baseY - 1, 2, 2, lightColor);
                break;
            case 5: // War Staff
                // Enhanced staff with crystal
                this.drawPixelRect(baseX, baseY - 2, 2, 18, '#8b4513');
                this.drawPixelRect(baseX + 1, baseY - 1, 1, 16, '#d2691e');
                // Crystal orb
                this.drawPixelRect(baseX - 1, baseY - 2, 4, 4, weaponColor);
                this.drawPixelRect(baseX, baseY - 1, 2, 2, lightColor);
                break;
            case 6: // Bow
                this.drawPixelRect(baseX, baseY, 1, 12, '#8b4513');
                this.drawPixelRect(baseX + 1, baseY + 2, 3, 8, '#8b4513');
                // Bowstring
                this.drawPixelRect(baseX + 3, baseY + 2, 1, 8, '#f5f5dc');
                break;
            case 7: // Crossbow
                this.drawPixelRect(baseX, baseY + 4, 1, 8, '#8b4513');
                // Enhanced crossbow head
                this.drawPixelRect(baseX - 2, baseY + 2, 6, 4, weaponColor);
                this.drawPixelRect(baseX - 1, baseY + 3, 4, 2, lightColor);
                this.drawPixelRect(baseX + 2, baseY + 4, 2, 1, shadowColor);
                break;
            case 8: // Dagger
                this.drawPixelRect(baseX, baseY + 6, 2, 6, weaponColor);
                this.drawPixelRect(baseX + 1, baseY + 7, 1, 4, lightColor);
                this.drawPixelRect(baseX, baseY + 12, 2, 2, '#8b4513');
                break;
            case 9: // Twin Daggers
                this.drawPixelRect(baseX, baseY + 6, 2, 6, weaponColor);
                this.drawPixelRect(baseX + 1, baseY + 7, 1, 4, lightColor);
                this.drawPixelRect(baseX, baseY + 12, 2, 2, '#8b4513');
                break;
            case 10: // War Axe
                this.drawPixelRect(baseX, baseY + 4, 1, 8, '#8b4513');
                // Enhanced axe head
                this.drawPixelRect(baseX - 2, baseY + 2, 6, 4, weaponColor);
                this.drawPixelRect(baseX - 1, baseY + 3, 4, 2, lightColor);
                this.drawPixelRect(baseX + 2, baseY + 4, 2, 1, shadowColor);
                break;
            case 11: // Battle Axe
                this.drawPixelRect(baseX, baseY + 4, 1, 8, '#8b4513');
                // Enhanced axe head
                this.drawPixelRect(baseX - 2, baseY + 2, 6, 4, weaponColor);
                this.drawPixelRect(baseX - 1, baseY + 3, 4, 2, lightColor);
                this.drawPixelRect(baseX + 2, baseY + 4, 2, 1, shadowColor);
                break;
            case 12: // War Hammer
                this.drawPixelRect(baseX, baseY + 4, 1, 8, '#8b4513');
                // Enhanced hammer head
                this.drawPixelRect(baseX - 2, baseY + 2, 6, 4, weaponColor);
                this.drawPixelRect(baseX - 1, baseY + 3, 4, 2, lightColor);
                this.drawPixelRect(baseX + 2, baseY + 4, 2, 1, shadowColor);
                break;
            case 13: // Spear
                this.drawPixelRect(baseX, baseY + 4, 1, 8, '#8b4513');
                // Enhanced spear head
                this.drawPixelRect(baseX - 2, baseY + 2, 6, 4, weaponColor);
                this.drawPixelRect(baseX - 1, baseY + 3, 4, 2, lightColor);
                this.drawPixelRect(baseX + 2, baseY + 4, 2, 1, shadowColor);
                break;
            case 14: // Halberd
                this.drawPixelRect(baseX, baseY + 4, 1, 8, '#8b4513');
                // Enhanced halberd head
                this.drawPixelRect(baseX - 2, baseY + 2, 6, 4, weaponColor);
                this.drawPixelRect(baseX - 1, baseY + 3, 4, 2, lightColor);
                this.drawPixelRect(baseX + 2, baseY + 4, 2, 1, shadowColor);
                break;
            case 15: // Wand
                this.drawPixelRect(baseX, baseY, 2, 12, '#8b4513');
                this.drawPixelRect(baseX + 1, baseY + 1, 1, 10, lightColor);
                // Enhanced wand tip
                this.drawPixelRect(baseX, baseY + 13, 2, 2, '#ffd700');
                break;
            case 16: // Crystal Orb
                this.drawPixelRect(baseX, baseY, 2, 12, '#8b4513');
                this.drawPixelRect(baseX + 1, baseY + 1, 1, 10, lightColor);
                // Enhanced orb
                this.drawPixelRect(baseX, baseY + 13, 2, 2, '#ffd700');
                break;
        }
    }
    
    drawCape() {
        if (this.character.cape === null || this.character.cape === 0) return;
        
        const armorColor = this.character.colors.armor;
        const shadowColor = chroma(armorColor).darken(0.5).hex();
        const bodyOffset = this.animationOffsets.body || {x: 0, y: 0};
        
        switch (this.character.cape) {
            case 1: // Short Cape
                this.drawPixelRect(40 + bodyOffset.x, 22 + bodyOffset.y, 14, 8, armorColor);
                this.drawPixelRect(41 + bodyOffset.x, 23 + bodyOffset.y, 12, 6, shadowColor);
                break;
            case 2: // Long Cape
                this.drawPixelRect(39 + bodyOffset.x, 22 + bodyOffset.y, 16, 18, armorColor);
                this.drawPixelRect(40 + bodyOffset.x, 23 + bodyOffset.y, 14, 16, shadowColor);
                break;
            case 3: // Royal Cape
                this.drawPixelRect(38 + bodyOffset.x, 20 + bodyOffset.y, 18, 20, armorColor);
                this.drawPixelRect(39 + bodyOffset.x, 21 + bodyOffset.y, 16, 18, shadowColor);
                // Royal trim
                this.drawPixelRect(40 + bodyOffset.x, 22 + bodyOffset.y, 14, 1, '#ffd700');
                break;
            case 4: // Tattered Cape
                this.drawPixelRect(40 + bodyOffset.x, 22 + bodyOffset.y, 14, 12, armorColor);
                this.drawPixelRect(41 + bodyOffset.x, 23 + bodyOffset.y, 12, 10, shadowColor);
                // Tattered edges
                this.drawPixelRect(42 + bodyOffset.x, 33 + bodyOffset.y, 2, 1, armorColor);
                this.drawPixelRect(46 + bodyOffset.x, 34 + bodyOffset.y, 3, 1, armorColor);
                this.drawPixelRect(50 + bodyOffset.x, 33 + bodyOffset.y, 2, 1, armorColor);
                break;
            case 5: // Feathered Cape
                this.drawPixelRect(39 + bodyOffset.x, 22 + bodyOffset.y, 16, 16, armorColor);
                this.drawPixelRect(40 + bodyOffset.x, 23 + bodyOffset.y, 14, 14, shadowColor);
                // Feather pattern
                for (let i = 0; i < 3; i++) {
                    this.drawPixelRect(41 + i * 4 + bodyOffset.x, 25 + bodyOffset.y, 2, 3, '#ffd700');
                    this.drawPixelRect(42 + i * 4 + bodyOffset.x, 28 + bodyOffset.y, 2, 3, '#ffd700');
                }
                break;
            case 6: // Magic Cloak
                this.drawPixelRect(39 + bodyOffset.x, 22 + bodyOffset.y, 16, 16, armorColor);
                this.drawPixelRect(40 + bodyOffset.x, 23 + bodyOffset.y, 14, 14, shadowColor);
                // Magic Cloak pattern
                for (let i = 0; i < 3; i++) {
                    this.drawPixelRect(41 + i * 4 + bodyOffset.x, 25 + bodyOffset.y, 2, 3, '#ffd700');
                    this.drawPixelRect(42 + i * 4 + bodyOffset.x, 28 + bodyOffset.y, 2, 3, '#ffd700');
                }
                break;
        }
    }
    
    drawHelmet() {
        if (this.character.helmet === null || this.character.helmet === 0) return;
        
        const armorColor = this.character.colors.armor;
        const lightColor = chroma(armorColor).brighten(0.5).hex();
        const shadowColor = chroma(armorColor).darken(0.5).hex();
        
        switch (this.character.helmet) {
            case 1: // Leather Cap
                this.drawPixelRect(42, 14, 10, 6, armorColor);
                this.drawPixelRect(43, 15, 8, 4, lightColor);
                break;
            case 2: // Iron Helmet
                this.drawPixelRect(41, 13, 12, 7, armorColor);
                this.drawPixelRect(42, 14, 10, 5, lightColor);
                this.drawPixelRect(43, 15, 8, 3, shadowColor);
                break;
            case 3: // Steel Helm
                this.drawPixelRect(40, 12, 14, 8, armorColor);
                this.drawPixelRect(41, 13, 12, 6, lightColor);
                this.drawPixelRect(42, 14, 10, 4, shadowColor);
                // Visor
                this.drawPixelRect(44, 17, 6, 2, shadowColor);
                break;
            case 4: // Crown
                this.drawPixelRect(42, 12, 10, 4, '#ffd700');
                // Crown points
                this.drawPixelRect(43, 11, 1, 2, '#ffd700');
                this.drawPixelRect(46, 10, 2, 3, '#ffd700');
                this.drawPixelRect(49, 11, 1, 2, '#ffd700');
                break;
            case 5: // Wizard Hat
                this.drawPixelRect(42, 12, 10, 4, '#ffd700');
                // Wizard Hat points
                this.drawPixelRect(43, 11, 1, 2, '#ffd700');
                this.drawPixelRect(46, 10, 2, 3, '#ffd700');
                this.drawPixelRect(49, 11, 1, 2, '#ffd700');
                break;
            case 6: // Hood
                this.drawPixelRect(42, 12, 10, 4, '#ffd700');
                // Hood points
                this.drawPixelRect(43, 11, 1, 2, '#ffd700');
                this.drawPixelRect(46, 10, 2, 3, '#ffd700');
                this.drawPixelRect(49, 11, 1, 2, '#ffd700');
                break;
            case 7: // Barbute
                this.drawPixelRect(42, 12, 10, 4, '#ffd700');
                // Barbute points
                this.drawPixelRect(43, 11, 1, 2, '#ffd700');
                this.drawPixelRect(46, 10, 2, 3, '#ffd700');
                this.drawPixelRect(49, 11, 1, 2, '#ffd700');
                break;
            case 8: // Winged Helm
                this.drawPixelRect(42, 12, 10, 4, '#ffd700');
                // Winged Helm points
                this.drawPixelRect(43, 11, 1, 2, '#ffd700');
                this.drawPixelRect(46, 10, 2, 3, '#ffd700');
                this.drawPixelRect(49, 11, 1, 2, '#ffd700');
                break;
            case 9: // Skull Cap
                this.drawPixelRect(42, 12, 10, 4, '#ffd700');
                // Skull Cap points
                this.drawPixelRect(43, 11, 1, 2, '#ffd700');
                this.drawPixelRect(46, 10, 2, 3, '#ffd700');
                this.drawPixelRect(49, 11, 1, 2, '#ffd700');
                break;
        }
    }
    
    drawShield() {
        if (this.character.shield === null || this.character.shield === 0) return;
        
        const armorColor = this.character.colors.armor;
        const lightColor = chroma(armorColor).brighten(0.5).hex();
        const shadowColor = chroma(armorColor).darken(0.5).hex();
        const armOffset = this.animationOffsets.leftArm || {x: 0, y: 0};
        const bodyOffset = this.animationOffsets.body || {x: 0, y: 0};
        
        const baseX = 36 + bodyOffset.x + armOffset.x;
        const baseY = 24 + bodyOffset.y + armOffset.y;
        
        switch (this.character.shield) {
            case 1: // Buckler
                this.drawPixelRect(baseX, baseY, 4, 8, '#8b4513');
                this.drawPixelRect(baseX + 1, baseY + 1, 2, 6, '#d2691e');
                break;
            case 2: // Round Shield
                this.drawPixelRect(baseX, baseY, 4, 8, armorColor);
                this.drawPixelRect(baseX + 1, baseY + 1, 2, 6, lightColor);
                this.drawPixelRect(baseX + 2, baseY + 2, 1, 4, shadowColor);
                break;
            case 3: // Kite Shield
                this.drawPixelRect(baseX, baseY, 4, 8, '#8b4513');
                this.drawPixelRect(baseX + 1, baseY + 1, 2, 6, '#d2691e');
                break;
            case 4: // Tower Shield
                this.drawPixelRect(baseX, baseY, 4, 8, '#8b4513');
                this.drawPixelRect(baseX + 1, baseY + 1, 2, 6, '#d2691e');
                break;
            case 5: // Magic Shield
                this.drawPixelRect(baseX, baseY, 4, 8, armorColor);
                this.drawPixelRect(baseX + 1, baseY + 1, 2, 6, lightColor);
                this.drawPixelRect(baseX + 2, baseY + 2, 1, 4, shadowColor);
                break;
            case 6: // Spiked Shield
                this.drawPixelRect(baseX, baseY, 4, 8, armorColor);
                this.drawPixelRect(baseX + 1, baseY + 1, 2, 6, lightColor);
                this.drawPixelRect(baseX + 2, baseY + 2, 1, 4, shadowColor);
                // Spikes
                this.drawPixelRect(baseX + 1, baseY + 3, 1, 1, '#8b0000');
                this.drawPixelRect(baseX + 1, baseY + 4, 1, 1, '#8b0000');
                this.drawPixelRect(baseX + 1, baseY + 5, 1, 1, '#8b0000');
                this.drawPixelRect(baseX + 1, baseY + 6, 1, 1, '#8b0000');
                this.drawPixelRect(baseX + 1, baseY + 7, 1, 1, '#8b0000');
                break;
        }
    }
    
    drawMagicalEffects() {
        // Draw aura
        if (this.character.aura && this.character.aura !== 0) {
            this.drawAura();
        }
        
        // Draw wings
        if (this.character.wings && this.character.wings !== 0) {
            this.drawWings();
        }
        
        // Draw tail
        if (this.character.tail && this.character.tail !== 0) {
            this.drawTail();
        }
        
        // Draw horns
        if (this.character.horns && this.character.horns !== 0) {
            this.drawHorns();
        }
    }
    
    drawAura() {
        const magicColor = this.character.colors.magic;
        const bodyOffset = this.animationOffsets.body || {x: 0, y: 0};
        const auraFlicker = Math.sin(this.animationFrame / 5) * 0.5 + 0.5;
        
        switch (this.character.aura) {
            case 1: // Fire Aura
                this.ctx.globalAlpha = 0.6 * auraFlicker;
                this.drawPixelRect(38 + bodyOffset.x, 12 + bodyOffset.y, 18, 32, '#ff4500');
                this.drawPixelRect(40 + bodyOffset.x, 14 + bodyOffset.y, 14, 28, '#ff6347');
                break;
            case 2: // Ice Aura
                this.ctx.globalAlpha = 0.4 * auraFlicker;
                this.drawPixelRect(38 + bodyOffset.x, 12 + bodyOffset.y, 18, 32, '#87ceeb');
                this.drawPixelRect(40 + bodyOffset.x, 14 + bodyOffset.y, 14, 28, '#b0e0e6');
                break;
            case 3: // Lightning Aura
                this.ctx.globalAlpha = 0.7 * auraFlicker;
                this.drawPixelRect(38 + bodyOffset.x, 12 + bodyOffset.y, 18, 32, '#ffff00');
                this.drawPixelRect(40 + bodyOffset.x, 14 + bodyOffset.y, 14, 28, '#ffffff');
                break;
            case 4: // Dark Aura
                this.ctx.globalAlpha = 0.5 * auraFlicker;
                this.drawPixelRect(38 + bodyOffset.x, 12 + bodyOffset.y, 18, 32, '#4b0082');
                this.drawPixelRect(40 + bodyOffset.x, 14 + bodyOffset.y, 14, 28, '#2f2f2f');
                break;
            case 5: // Holy Aura
                this.ctx.globalAlpha = 0.6 * auraFlicker;
                this.drawPixelRect(38 + bodyOffset.x, 12 + bodyOffset.y, 18, 32, '#ffd700');
                this.drawPixelRect(40 + bodyOffset.x, 14 + bodyOffset.y, 14, 28, '#ffffff');
                break;
            case 6: // Nature Aura
                this.ctx.globalAlpha = 0.5 * auraFlicker;
                this.drawPixelRect(38 + bodyOffset.x, 12 + bodyOffset.y, 18, 32, '#228b22');
                this.drawPixelRect(40 + bodyOffset.x, 14 + bodyOffset.y, 14, 28, '#32cd32');
                break;
        }
        this.ctx.globalAlpha = 1.0;
    }
    
    drawWings() {
        const magicColor = this.character.colors.magic;
        const wingFlap = Math.sin(this.animationFrame / 6) * 3; // Faster wing flap
        const bodyOffset = this.animationOffsets.body || {x: 0, y: 0};
        
        switch (this.character.wings) {
            case 1: // Angel Wings - Detailed feathered wings
                // Left wing - main structure
                this.drawPixelRect(28 + bodyOffset.x, 18 + bodyOffset.y + wingFlap, 12, 16, '#ffffff');
                this.drawPixelRect(30 + bodyOffset.x, 20 + bodyOffset.y + wingFlap, 10, 12, '#f8f8ff');
                // Feather details
                this.drawPixelRect(29 + bodyOffset.x, 21 + bodyOffset.y + wingFlap, 2, 3, '#e6e6fa');
                this.drawPixelRect(31 + bodyOffset.x, 24 + bodyOffset.y + wingFlap, 2, 3, '#e6e6fa');
                this.drawPixelRect(33 + bodyOffset.x, 27 + bodyOffset.y + wingFlap, 2, 3, '#e6e6fa');
                // Wing tip curve
                this.drawPixelRect(35 + bodyOffset.x, 30 + bodyOffset.y + wingFlap, 3, 2, '#dcdcdc');
                
                // Right wing - main structure
                this.drawPixelRect(54 + bodyOffset.x, 18 + bodyOffset.y + wingFlap, 12, 16, '#ffffff');
                this.drawPixelRect(54 + bodyOffset.x, 20 + bodyOffset.y + wingFlap, 10, 12, '#f8f8ff');
                // Feather details
                this.drawPixelRect(63 + bodyOffset.x, 21 + bodyOffset.y + wingFlap, 2, 3, '#e6e6fa');
                this.drawPixelRect(61 + bodyOffset.x, 24 + bodyOffset.y + wingFlap, 2, 3, '#e6e6fa');
                this.drawPixelRect(59 + bodyOffset.x, 27 + bodyOffset.y + wingFlap, 2, 3, '#e6e6fa');
                // Wing tip curve
                this.drawPixelRect(56 + bodyOffset.x, 30 + bodyOffset.y + wingFlap, 3, 2, '#dcdcdc');
                break;
                
            case 2: // Demon Wings - Leathery bat-like wings
                // Left wing - membrane structure
                this.drawPixelRect(26 + bodyOffset.x, 16 + bodyOffset.y + wingFlap, 14, 18, '#8b0000');
                this.drawPixelRect(28 + bodyOffset.x, 18 + bodyOffset.y + wingFlap, 10, 14, '#a0522d');
                // Wing fingers/bones
                this.drawPixelRect(27 + bodyOffset.x, 17 + bodyOffset.y + wingFlap, 1, 12, '#2f2f2f');
                this.drawPixelRect(31 + bodyOffset.x, 19 + bodyOffset.y + wingFlap, 1, 10, '#2f2f2f');
                this.drawPixelRect(35 + bodyOffset.x, 21 + bodyOffset.y + wingFlap, 1, 8, '#2f2f2f');
                // Wing membrane tears
                this.drawPixelRect(30 + bodyOffset.x, 25 + bodyOffset.y + wingFlap, 2, 1, '#654321');
                
                // Right wing - membrane structure
                this.drawPixelRect(54 + bodyOffset.x, 16 + bodyOffset.y + wingFlap, 14, 18, '#8b0000');
                this.drawPixelRect(56 + bodyOffset.x, 18 + bodyOffset.y + wingFlap, 10, 14, '#a0522d');
                // Wing fingers/bones
                this.drawPixelRect(66 + bodyOffset.x, 17 + bodyOffset.y + wingFlap, 1, 12, '#2f2f2f');
                this.drawPixelRect(62 + bodyOffset.x, 19 + bodyOffset.y + wingFlap, 1, 10, '#2f2f2f');
                this.drawPixelRect(58 + bodyOffset.x, 21 + bodyOffset.y + wingFlap, 1, 8, '#2f2f2f');
                // Wing membrane tears
                this.drawPixelRect(62 + bodyOffset.x, 25 + bodyOffset.y + wingFlap, 2, 1, '#654321');
                break;
                
            case 3: // Dragon Wings - Scaled dragon wings
                // Left wing - scale structure
                this.drawPixelRect(24 + bodyOffset.x, 14 + bodyOffset.y + wingFlap, 16, 20, '#2f4f4f');
                this.drawPixelRect(26 + bodyOffset.x, 16 + bodyOffset.y + wingFlap, 12, 16, '#4682b4');
                // Scale pattern
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 3; j++) {
                        this.drawPixelRect(27 + i * 3 + bodyOffset.x, 18 + j * 4 + bodyOffset.y + wingFlap, 2, 2, '#5f9ea0');
                    }
                }
                // Wing claws
                this.drawPixelRect(25 + bodyOffset.x, 15 + bodyOffset.y + wingFlap, 2, 3, '#2f2f2f');
                
                // Right wing - scale structure
                this.drawPixelRect(54 + bodyOffset.x, 14 + bodyOffset.y + wingFlap, 16, 20, '#2f4f4f');
                this.drawPixelRect(56 + bodyOffset.x, 16 + bodyOffset.y + wingFlap, 12, 16, '#4682b4');
                // Scale pattern
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 3; j++) {
                        this.drawPixelRect(57 + i * 3 + bodyOffset.x, 18 + j * 4 + bodyOffset.y + wingFlap, 2, 2, '#5f9ea0');
                    }
                }
                // Wing claws
                this.drawPixelRect(67 + bodyOffset.x, 15 + bodyOffset.y + wingFlap, 2, 3, '#2f2f2f');
                break;
                
            case 4: // Fairy Wings - Delicate translucent wings
                // Left wing - translucent effect
                this.ctx.globalAlpha = 0.8;
                this.drawPixelRect(30 + bodyOffset.x, 16 + bodyOffset.y + wingFlap, 10, 14, magicColor);
                this.drawPixelRect(32 + bodyOffset.x, 18 + bodyOffset.y + wingFlap, 6, 10, '#ffffff');
                // Wing veins
                this.drawPixelRect(33 + bodyOffset.x, 19 + bodyOffset.y + wingFlap, 1, 8, chroma(magicColor).darken(1).hex());
                this.drawPixelRect(35 + bodyOffset.x, 20 + bodyOffset.y + wingFlap, 1, 6, chroma(magicColor).darken(1).hex());
                this.drawPixelRect(37 + bodyOffset.x, 21 + bodyOffset.y + wingFlap, 1, 4, chroma(magicColor).darken(1).hex());
                
                // Right wing - translucent effect
                this.drawPixelRect(54 + bodyOffset.x, 16 + bodyOffset.y + wingFlap, 10, 14, magicColor);
                this.drawPixelRect(56 + bodyOffset.x, 18 + bodyOffset.y + wingFlap, 6, 10, '#ffffff');
                // Wing veins
                this.drawPixelRect(60 + bodyOffset.x, 19 + bodyOffset.y + wingFlap, 1, 8, chroma(magicColor).darken(1).hex());
                this.drawPixelRect(58 + bodyOffset.x, 20 + bodyOffset.y + wingFlap, 1, 6, chroma(magicColor).darken(1).hex());
                this.drawPixelRect(56 + bodyOffset.x, 21 + bodyOffset.y + wingFlap, 1, 4, chroma(magicColor).darken(1).hex());
                this.ctx.globalAlpha = 1.0;
                break;
                
            case 5: // Bat Wings - Detailed bat wings
                // Left wing - bat membrane
                this.drawPixelRect(26 + bodyOffset.x, 16 + bodyOffset.y + wingFlap, 14, 16, '#2f2f2f');
                this.drawPixelRect(28 + bodyOffset.x, 18 + bodyOffset.y + wingFlap, 10, 12, '#1c1c1c');
                // Wing finger bones
                this.drawPixelRect(27 + bodyOffset.x, 17 + bodyOffset.y + wingFlap, 1, 10, '#666666');
                this.drawPixelRect(30 + bodyOffset.x, 18 + bodyOffset.y + wingFlap, 1, 9, '#666666');
                this.drawPixelRect(33 + bodyOffset.x, 19 + bodyOffset.y + wingFlap, 1, 8, '#666666');
                this.drawPixelRect(36 + bodyOffset.x, 20 + bodyOffset.y + wingFlap, 1, 7, '#666666');
                // Wing claw
                this.drawPixelRect(25 + bodyOffset.x, 16 + bodyOffset.y + wingFlap, 2, 2, '#8b0000');
                
                // Right wing - bat membrane
                this.drawPixelRect(54 + bodyOffset.x, 16 + bodyOffset.y + wingFlap, 14, 16, '#2f2f2f');
                this.drawPixelRect(56 + bodyOffset.x, 18 + bodyOffset.y + wingFlap, 10, 12, '#1c1c1c');
                // Wing finger bones
                this.drawPixelRect(66 + bodyOffset.x, 17 + bodyOffset.y + wingFlap, 1, 10, '#666666');
                this.drawPixelRect(63 + bodyOffset.x, 18 + bodyOffset.y + wingFlap, 1, 9, '#666666');
                this.drawPixelRect(60 + bodyOffset.x, 19 + bodyOffset.y + wingFlap, 1, 8, '#666666');
                this.drawPixelRect(57 + bodyOffset.x, 20 + bodyOffset.y + wingFlap, 1, 7, '#666666');
                // Wing claw
                this.drawPixelRect(67 + bodyOffset.x, 16 + bodyOffset.y + wingFlap, 2, 2, '#8b0000');
                break;
        }
    }
    
    drawTail() {
        const tailSway = Math.sin(this.animationFrame / 12) * 3;
        const bodyOffset = this.animationOffsets.body || {x: 0, y: 0};
        
        switch (this.character.tail) {
            case 1: // Cat Tail
                this.drawPixelRect(46 + bodyOffset.x + tailSway, 35 + bodyOffset.y, 3, 12, this.character.colors.skin);
                break;
            case 2: // Dragon Tail
                this.drawPixelRect(45 + bodyOffset.x + tailSway, 36 + bodyOffset.y, 4, 14, this.character.colors.skin);
                this.drawPixelRect(46 + bodyOffset.x + tailSway, 37 + bodyOffset.y, 2, 12, chroma(this.character.colors.skin).darken(0.3).hex());
                break;
            case 3: // Devil Tail
                this.drawPixelRect(46 + bodyOffset.x + tailSway, 35 + bodyOffset.y, 2, 14, '#8b0000');
                // Tail tip
                this.drawPixelRect(47 + bodyOffset.x + tailSway, 48 + bodyOffset.y, 3, 2, '#ff4500');
                break;
            case 4: // Lizard Tail
                this.drawPixelRect(46 + bodyOffset.x + tailSway, 35 + bodyOffset.y, 3, 16, this.character.colors.skin);
                break;
        }
    }
    
    drawHorns() {
        const hornsColor = this.character.colors.weapon;
        
        switch (this.character.horns) {
            case 1: // Small Horns
                this.drawPixelRect(44, 12, 1, 3, hornsColor);
                this.drawPixelRect(49, 12, 1, 3, hornsColor);
                break;
            case 2: // Curved Horns
                this.drawPixelRect(43, 11, 2, 4, hornsColor);
                this.drawPixelRect(49, 11, 2, 4, hornsColor);
                break;
            case 3: // Demon Horns
                this.drawPixelRect(43, 10, 2, 5, hornsColor);
                this.drawPixelRect(49, 10, 2, 5, hornsColor);
                this.drawPixelRect(44, 9, 1, 2, '#ff4500');
                this.drawPixelRect(49, 9, 1, 2, '#ff4500');
                break;
            case 4: // Dragon Horns
                this.drawPixelRect(42, 9, 3, 6, hornsColor);
                this.drawPixelRect(49, 9, 3, 6, hornsColor);
                break;
            case 5: // Antlers
                this.drawPixelRect(43, 8, 2, 7, hornsColor);
                this.drawPixelRect(49, 8, 2, 7, hornsColor);
                this.drawPixelRect(41, 10, 2, 3, hornsColor);
                this.drawPixelRect(51, 10, 2, 3, hornsColor);
                break;
        }
    }
    
    applyAnimationOffset() {
        const walkCycle = 16; // Frames per walk cycle
        const runCycle = 12; // Frames per run cycle
        const frame = this.animationFrame % walkCycle;
        const runFrame = this.animationFrame % runCycle;
        const time = this.animationFrame / 40; // Slower time progression for more realistic movement
        
        // Apply AI-enhanced parameters if enabled
        const speedMultiplier = this.aiEnhancedAnimations ? (this.aiAnimationParameters.walkSpeed || 1.0) : 1.0;
        const weightMultiplier = this.aiEnhancedAnimations ? (this.aiAnimationParameters.movementWeight || 1.0) : 1.0;
        const idleIntensity = this.aiEnhancedAnimations ? (this.aiAnimationParameters.idleIntensity || 0.5) : 0.5;
        const attackSpeed = this.aiEnhancedAnimations ? (this.aiAnimationParameters.attackSpeed || 1.0) : 1.0;
        const castingDrama = this.aiEnhancedAnimations ? (this.aiAnimationParameters.castingDrama || 1.0) : 1.0;
        
        switch (this.currentAnimation) {
            case 'walk':
                // More realistic walking with AI-enhanced parameters
                const walkPhase = (frame / walkCycle) * 2 * Math.PI * speedMultiplier;
                const leftLegPhase = Math.sin(walkPhase);
                const rightLegPhase = Math.sin(walkPhase + Math.PI); // 180 degrees out of phase
                
                return {
                    leftLeg: { 
                        x: leftLegPhase * 1.5 * weightMultiplier, 
                        y: Math.max(0, leftLegPhase * 2 * weightMultiplier) // Only lift when moving forward
                    },
                    rightLeg: { 
                        x: rightLegPhase * 1.5 * weightMultiplier, 
                        y: Math.max(0, rightLegPhase * 2 * weightMultiplier) // Only lift when moving forward
                    },
                    rightArm: { 
                        x: leftLegPhase * 2 * speedMultiplier, 
                        y: leftLegPhase * 0.5 * speedMultiplier
                    },
                    leftArm: { 
                        x: rightLegPhase * 1.5 * speedMultiplier, 
                        y: rightLegPhase * 0.3 * speedMultiplier
                    },
                    body: { 
                        x: 0, 
                        y: Math.abs(Math.sin(walkPhase * 2)) * 0.8 * weightMultiplier // Subtle bob
                    }
                };
                
            case 'run':
                // Faster, more exaggerated running animation with AI enhancement
                const runPhase = (runFrame / runCycle) * 2 * Math.PI * speedMultiplier;
                const leftRunPhase = Math.sin(runPhase);
                const rightRunPhase = Math.sin(runPhase + Math.PI);
                
                return {
                    leftLeg: { 
                        x: leftRunPhase * 2.5 * speedMultiplier, 
                        y: Math.max(0, leftRunPhase * 3 * weightMultiplier)
                    },
                    rightLeg: { 
                        x: rightRunPhase * 2.5 * speedMultiplier, 
                        y: Math.max(0, rightRunPhase * 3 * weightMultiplier)
                    },
                    rightArm: { 
                        x: leftRunPhase * 4 * speedMultiplier, 
                        y: leftRunPhase * 2 * speedMultiplier
                    },
                    leftArm: { 
                        x: rightRunPhase * 3 * speedMultiplier, 
                        y: rightRunPhase * 1.5 * speedMultiplier
                    },
                    body: { 
                        x: Math.sin(runPhase * 2) * 1.5 * speedMultiplier, 
                        y: Math.abs(Math.sin(runPhase * 2)) * 1.5 * weightMultiplier
                    }
                };
                
            case 'attack':
                // Improved attack timing with AI-enhanced speed and power
                const attackDuration = Math.floor(24 / attackSpeed); // AI-controlled attack speed
                const attackFrame = this.animationFrame % attackDuration;
                const attackProgress = attackFrame / attackDuration;
                
                let attackPhase;
                if (attackProgress < 0.3) {
                    // Wind-up
                    attackPhase = -(attackProgress / 0.3) * 0.5;
                } else if (attackProgress < 0.5) {
                    // Strike
                    attackPhase = ((attackProgress - 0.3) / 0.2) * 1.5 - 0.5;
                } else {
                    // Follow-through and recovery
                    attackPhase = 1 - ((attackProgress - 0.5) / 0.5);
                }
                
                const attackIntensity = this.aiEnhancedAnimations && this.aiAnimationParameters.personalityType === 'aggressive' ? 1.5 : 1.0;
                
                return {
                    leftLeg: { x: attackPhase * 1 * attackIntensity, y: 0 },
                    rightLeg: { x: attackPhase * 2 * attackIntensity, y: 0 },
                    rightArm: { x: attackPhase * 12 * attackIntensity, y: attackPhase * -8 * attackIntensity },
                    leftArm: { x: -attackPhase * 3 * attackIntensity, y: attackPhase * 3 * attackIntensity },
                    body: { x: attackPhase * 4 * attackIntensity, y: attackPhase * -1 * attackIntensity }
                };
                
            case 'cast':
                // Smoother casting animation with AI-enhanced drama
                const castDuration = 32;
                const castFrame = this.animationFrame % castDuration;
                const castProgress = castFrame / castDuration;
                const castPhase = Math.sin(castProgress * Math.PI);
                
                return {
                    leftLeg: { x: 0, y: 0 },
                    rightLeg: { x: 0, y: 0 },
                    rightArm: { x: castPhase * 4 * castingDrama, y: castPhase * -10 * castingDrama },
                    leftArm: { x: -castPhase * 3 * castingDrama, y: castPhase * -8 * castingDrama },
                    body: { x: 0, y: castPhase * -3 * castingDrama }
                };
                
            case 'block':
                const blockPhase = Math.sin(time * Math.PI * 0.5) * 0.3 + 0.7; // Steady blocking pose
                return {
                    leftLeg: { x: 0, y: 0 },
                    rightLeg: { x: blockPhase * 2, y: 0 },
                    rightArm: { x: -blockPhase * 5, y: -blockPhase * 4 },
                    leftArm: { x: -blockPhase * 7, y: -blockPhase * 3 },
                    body: { x: -blockPhase * 2, y: 0 }
                };
                
            case 'jump':
                const jumpDuration = 20;
                const jumpFrame = this.animationFrame % jumpDuration;
                const jumpProgress = jumpFrame / jumpDuration;
                
                let jumpHeight;
                if (jumpProgress < 0.4) {
                    // Crouch and launch
                    jumpHeight = -jumpProgress * 2;
                } else if (jumpProgress < 0.7) {
                    // In air
                    jumpHeight = -8 + ((jumpProgress - 0.4) / 0.3) * 4;
                } else {
                    // Landing
                    jumpHeight = -4 + ((jumpProgress - 0.7) / 0.3) * 4;
                }
                
                return {
                    leftLeg: { x: 0, y: jumpHeight * 0.5 },
                    rightLeg: { x: 0, y: jumpHeight * 0.5 },
                    rightArm: { x: 0, y: jumpHeight * 0.6 },
                    leftArm: { x: 0, y: jumpHeight * 0.6 },
                    body: { x: 0, y: jumpHeight }
                };
                
            case 'death':
                const deathProgress = Math.min(this.animationFrame / 60, 1); // 1.5 second death animation
                return {
                    leftLeg: { x: deathProgress * 4, y: deathProgress * 8 },
                    rightLeg: { x: -deathProgress * 3, y: deathProgress * 6 },
                    rightArm: { x: deathProgress * 8, y: deathProgress * 12 },
                    leftArm: { x: -deathProgress * 6, y: deathProgress * 10 },
                    body: { x: deathProgress * 12, y: deathProgress * 16 }
                };
                
            case 'victory':
                const victoryPhase = Math.sin(time * Math.PI * 1.5);
                return {
                    leftLeg: { x: 0, y: 0 },
                    rightLeg: { x: 0, y: 0 },
                    rightArm: { x: 0, y: victoryPhase * -10 },
                    leftArm: { x: 0, y: victoryPhase * -8 },
                    body: { x: 0, y: victoryPhase * -3 }
                };
                
            default: // idle
                const idlePhase = Math.sin(time * 0.8) * idleIntensity; // AI-controlled idle intensity
                return {
                    leftLeg: { x: 0, y: 0 },
                    rightLeg: { x: 0, y: 0 },
                    rightArm: { x: 0, y: idlePhase * 0.8 },
                    leftArm: { x: 0, y: idlePhase * 0.6 },
                    body: { x: 0, y: idlePhase * 0.8 }
                };
        }
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get animation offsets for all body parts
        this.animationOffsets = this.applyAnimationOffset();
        
        // Apply AI special effects if enabled
        if (this.aiEnhancedAnimations && this.aiAnimationParameters.specialEffects) {
            if (this.aiAnimationParameters.specialEffects.hasGlow) {
                this.ctx.shadowColor = this.character.colors.magic;
                this.ctx.shadowBlur = 5;
            }
        }
        
        // Draw character parts in proper order with individual offsets
        this.drawMagicalEffects(); // Draw aura and wings behind character
        this.drawCape();
        this.drawTail(); // Draw tail behind body
        this.drawBody(this.animationOffsets.body);
        this.drawArmor();
        this.drawBoots();
        this.drawHead();
        this.drawHair();
        this.drawHorns(); // Draw horns on top of head
        this.drawHelmet();
        this.drawShield();
        this.drawWeapon();
        
        // Reset shadow effects
        this.ctx.shadowBlur = 0;
    }
    
    startAnimation() {
        this.animationTimer = setInterval(() => {
            this.animationFrame++;
            this.render();
        }, this.animationSpeed);
    }
    
    exportPNG() {
        const link = document.createElement('a');
        link.download = 'rpg-character.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }
    
    exportSVG() {
        // Create SVG representation
        const svgData = this.generateSVG();
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.download = 'rpg-character.svg';
        link.href = url;
        link.click();
        
        URL.revokeObjectURL(url);
    }
    
    generateSVG() {
        return `<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
            <rect width="128" height="128" fill="transparent"/>
            <!-- Character would be recreated as SVG elements -->
            <text x="64" y="64" text-anchor="middle" fill="white">SVG Export</text>
        </svg>`;
    }
    
    randomizeCharacter() {
        // Randomize all character parts
        this.character.race = ['human', 'elf', 'dwarf', 'orc'][Math.floor(Math.random() * 4)];
        this.character.head = Math.floor(Math.random() * this.partData.heads.length);
        this.character.hair = Math.floor(Math.random() * this.partData.hair.length);
        this.character.eyes = Math.floor(Math.random() * this.partData.eyes.length);
        this.character.helmet = Math.random() > 0.3 ? Math.floor(Math.random() * this.partData.helmets.length) : null;
        this.character.armor = Math.floor(Math.random() * this.partData.armor.length);
        this.character.boots = Math.floor(Math.random() * this.partData.boots.length);
        this.character.gloves = Math.random() > 0.4 ? Math.floor(Math.random() * this.partData.gloves.length) : null;
        this.character.weapon = Math.random() > 0.2 ? Math.floor(Math.random() * this.partData.weapons.length) : null;
        this.character.shield = Math.random() > 0.6 ? Math.floor(Math.random() * this.partData.shields.length) : null;
        this.character.cape = Math.random() > 0.7 ? Math.floor(Math.random() * this.partData.capes.length) : null;
        this.character.accessory = Math.random() > 0.5 ? Math.floor(Math.random() * this.partData.accessories.length) : null;
        this.character.aura = Math.random() > 0.5 ? Math.floor(Math.random() * this.partData.auras.length) : null;
        this.character.wings = Math.random() > 0.5 ? Math.floor(Math.random() * this.partData.wings.length) : null;
        this.character.tail = Math.random() > 0.5 ? Math.floor(Math.random() * this.partData.tails.length) : null;
        this.character.horns = Math.random() > 0.5 ? Math.floor(Math.random() * this.partData.horns.length) : null;
        
        // Randomize colors
        const skinColors = ['#fdbcb4', '#f7e6d7', '#d2691e', '#8b4513', '#654321', '#98fb98', '#8fbc8f', '#dc143c', '#8b0000', '#f5f5dc'];
        const hairColors = ['#000000', '#8b4513', '#dda0dd', '#ffd700', '#ff6347', '#8fbc8f', '#2d1b0e', '#708090'];
        const armorColors = ['#4a5568', '#6b46c1', '#374151', '#22c55e', '#dc2626', '#f59e0b', '#654321', '#8b0000', '#696969', '#2f2f2f'];
        const weaponColors = ['#718096', '#8b5cf6', '#6b7280', '#92400e', '#991b1b', '#059669', '#8b4513', '#ffd700', '#708090', '#ff4500'];
        const magicColors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#ff4500', '#ff6347', '#9370db', '#dc143c'];
        
        this.character.colors.skin = skinColors[Math.floor(Math.random() * skinColors.length)];
        this.character.colors.hair = hairColors[Math.floor(Math.random() * hairColors.length)];
        this.character.colors.armor = armorColors[Math.floor(Math.random() * armorColors.length)];
        this.character.colors.weapon = weaponColors[Math.floor(Math.random() * weaponColors.length)];
        this.character.colors.magic = magicColors[Math.floor(Math.random() * magicColors.length)];
        
        this.setActiveRace(this.character.race);
        this.updateUIFromCharacter();
        this.render();
    }
    
    saveCharacter() {
        const characterData = JSON.stringify(this.character);
        const characterName = prompt('Enter a name for your character:', 'MyCharacter');
        if (characterName) {
            const savedCharacters = JSON.parse(localStorage.getItem('rpgCharacters') || '{}');
            savedCharacters[characterName] = characterData;
            localStorage.setItem('rpgCharacters', JSON.stringify(savedCharacters));
            alert(`Character "${characterName}" saved successfully!`);
        }
    }
    
    loadCharacter() {
        const savedCharacters = JSON.parse(localStorage.getItem('rpgCharacters') || '{}');
        const characterNames = Object.keys(savedCharacters);
        
        if (characterNames.length === 0) {
            alert('No saved characters found!');
            return;
        }
        
        const characterList = characterNames.map((name, index) => `${index + 1}. ${name}`).join('\n');
        const selection = prompt(`Select a character to load:\n${characterList}\n\nEnter the number:`);
        
        if (selection && !isNaN(selection)) {
            const index = parseInt(selection) - 1;
            if (index >= 0 && index < characterNames.length) {
                const characterName = characterNames[index];
                this.character = JSON.parse(savedCharacters[characterName]);
                this.setActiveRace(this.character.race);
                this.updateUIFromCharacter();
                this.render();
                alert(`Character "${characterName}" loaded successfully!`);
            }
        }
    }
    
    openAIModal() {
        document.getElementById('aiModal').classList.remove('hidden');
        // Set generation type based on current mode
        this.setGenerationType(this.isMonsterMode ? 'monster' : 'character');
        // Focus on prompt input
        setTimeout(() => {
            document.getElementById('aiPromptModal').focus();
        }, 100);
    }
    
    closeAIModal() {
        document.getElementById('aiModal').classList.add('hidden');
    }
    
    closeCharacterInfoModal() {
        document.getElementById('characterInfoModal').classList.add('hidden');
    }
    
    setGenerationType(type) {
        const isMonster = type === 'monster';
        
        // Update buttons
        document.querySelectorAll('.gen-type-btn').forEach(btn => {
            btn.classList.remove('bg-blue-600');
            btn.classList.add('bg-gray-700');
        });
        
        if (isMonster) {
            document.getElementById('monsterGenType').classList.add('bg-blue-600');
            document.getElementById('monsterGenType').classList.remove('bg-gray-700');
        } else {
            document.getElementById('characterGenType').classList.add('bg-blue-600');
            document.getElementById('characterGenType').classList.remove('bg-gray-700');
        }
        
        // Update suggestions
        this.updateSuggestions(isMonster);
        
        // Update placeholder
        const placeholder = isMonster ? 
            "Describe your monster... (e.g., 'A massive fire-breathing dragon with molten scales' or 'A shadowy wraith with glowing eyes')" :
            "Describe your character... (e.g., 'A noble knight with shining armor' or 'A mystical wizard with arcane powers')";
        document.getElementById('aiPromptModal').placeholder = placeholder;
    }
    
    updateSuggestions(isMonster) {
        const suggestions = isMonster ? [
            { text: "Ancient Dragon", prompt: "Ancient dragon with massive wings and breath of fire" },
            { text: "Shadow Wraith", prompt: "Ethereal shadow wraith with glowing red eyes" },
            { text: "Bone Golem", prompt: "Massive skeletal golem made of ancient bones" },
            { text: "Void Demon", prompt: "Demonic entity from the void with twisted horns" },
            { text: "Ice Troll", prompt: "Massive ice troll with frozen blue skin" },
            { text: "Fire Elemental", prompt: "Blazing fire elemental with molten core" }
        ] : [
            { text: "Holy Paladin", prompt: "Powerful paladin with blessed armor and holy magic" },
            { text: "Dark Necromancer", prompt: "Dark necromancer with death magic and skull staff" },
            { text: "Elven Archer", prompt: "Graceful elven archer with enchanted bow" },
            { text: "Dwarven Warrior", prompt: "Stout dwarven warrior with massive war axe" },
            { text: "Fire Mage", prompt: "Powerful fire mage with burning staff and robes" },
            { text: "Rogue Assassin", prompt: "Stealthy rogue assassin with twin daggers" }
        ];
        
        const buttons = document.querySelectorAll('.suggestion-btn');
        buttons.forEach((btn, index) => {
            if (suggestions[index]) {
                btn.textContent = suggestions[index].text;
                btn.dataset.suggestion = suggestions[index].prompt;
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });
    }
    
    async generateFromAIModal() {
        const prompt = document.getElementById('aiPromptModal').value.trim();
        const isMonster = document.getElementById('monsterGenType').classList.contains('bg-blue-600');
        const enhancedAnimations = document.getElementById('enhancedAnimations').checked;
        const randomizeColors = document.getElementById('randomizeColors').checked;
        const includeBackstory = document.getElementById('includeBackstory').checked;
        
        if (!prompt) {
            alert('Please enter a description for your creation');
            return;
        }
        
        this.showGenerationProgress();
        
        try {
            await this.generateUnifiedAI({
                prompt,
                isMonster,
                enhancedAnimations,
                randomizeColors,
                includeBackstory
            });
        } catch (error) {
            console.error('AI generation failed:', error);
            alert('AI generation failed. Please try again.');
            this.hideGenerationProgress();
        }
    }
    
    async generateRandomAI() {
        const isMonster = document.getElementById('monsterGenType').classList.contains('bg-blue-600');
        const enhancedAnimations = document.getElementById('enhancedAnimations').checked;
        
        this.showGenerationProgress();
        
        try {
            await this.generateUnifiedAI({
                prompt: "random",
                isMonster,
                enhancedAnimations,
                randomizeColors: true,
                includeBackstory: true
            });
        } catch (error) {
            console.error('Random AI generation failed:', error);
            alert('AI generation failed. Please try again.');
            this.hideGenerationProgress();
        }
    }
    
    showGenerationProgress() {
        document.getElementById('generationStatus').classList.remove('hidden');
        let progress = 0;
        const progressBar = document.getElementById('progressBar');
        
        this.progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90;
            progressBar.style.width = progress + '%';
        }, 200);
    }
    
    hideGenerationProgress() {
        document.getElementById('generationStatus').classList.add('hidden');
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        document.getElementById('progressBar').style.width = '0%';
    }
    
    async generateUnifiedAI(options) {
        try {
            const { prompt, isMonster, enhancedAnimations, randomizeColors, includeBackstory } = options;
            
            const systemPrompt = `You are an expert RPG character designer with deep knowledge of pixel art aesthetics. Generate a detailed ${isMonster ? 'monster' : 'character'} configuration with specific visual variety.
            
            Focus on creating DISTINCTIVE visual combinations:
            - Mix different head shapes with complementary features
            - Choose armor/clothing that fits the character concept
            - Select colors that create visual cohesion and character mood
            - Add magical elements that enhance the character's story
            
            ${isMonster ? 'For monsters: Use more aggressive features, darker/unnatural colors, claws, fangs, supernatural elements. Consider creature type (undead, beast, demon, elemental).' : 'For characters: Focus on heroic/adventurer archetypes with appropriate equipment. Consider class archetype (warrior, mage, rogue, etc).'}
            
            Available options expanded:
            - Heads: 0-8 (Round, Square, Oval, Angular, Heart, Noble, Rugged, Lean, Broad)
            - Hair: 0-11 (includes Flowing, Messy variations)
            - Eyes: 0-9 (includes Cat-like, Glowing Orbs)
            - Equipment: Mix functional and decorative pieces
            
            Create CHARACTER PERSONALITY through visual choices:
            - Aggressive: Angular features, dark colors, heavy armor
            - Mystical: Flowing elements, magical colors, ethereal features  
            - Noble: Refined features, rich colors, ornate equipment
            - Wild: Rugged features, natural colors, primitive equipment
            
            Respond with JSON only, following this schema:
            {
              "concept": "distinctive ${isMonster ? 'monster' : 'character'} description with personality",
              "visualTheme": "aggressive|mystical|noble|wild|elemental|undead",
              "race": "${isMonster ? 'goblin|orc|dragon|skeleton|demon|beast|undead|elemental' : 'human|elf|dwarf|orc'}",
              "archetype": "${isMonster ? 'brute|caster|assassin|tank|flyer|summoner' : 'warrior|mage|rogue|archer'}",
              "head": 0-8,
              "hair": 0-11,
              "eyes": 0-9,
              "helmet": 0-9 or null,
              "armor": 0-8,
              "boots": 0-7,
              "gloves": 0-6 or null,
              "weapon": 0-16 or null,
              "shield": 0-6 or null,
              "cape": 0-6 or null,
              "accessory": 0-7 or null,
              "aura": 0-6 or null,
              "wings": 0-5 or null,
              "tail": 0-4 or null,
              "horns": 0-5 or null,
              "colors": {
                "skin": "hex color (consider race and theme)",
                "hair": "hex color (complement skin and theme)", 
                "armor": "hex color (reflect status and theme)",
                "weapon": "hex color (material and enchantment)",
                "magic": "hex color (magical affinity)"
              }${includeBackstory ? ',\n              "personality": "detailed personality traits matching visual theme",\n              "backstory": "rich backstory explaining appearance choices",\n              "specialAbilities": "3-5 abilities based on appearance"' : ''}
            }`;
            
            const userPrompt = prompt === "random" ? 
                `Generate a completely random and visually striking ${isMonster ? 'monster' : 'character'} with creative combinations. Ensure distinctive visual personality through feature choices.` :
                `Create a visually distinctive ${isMonster ? 'monster' : 'character'} based on: "${prompt}". Focus on translating the description into specific visual features and personality.`;
            
            const completion = await websim.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                json: true
            });
            
            const result = JSON.parse(completion.content);
            
            // Apply enhanced animations if requested
            if (enhancedAnimations) {
                this.aiEnhancedAnimations = true;
                await this.generateAIAnimationParameters();
            }
            
            // Switch to appropriate mode if needed
            if (isMonster !== this.isMonsterMode) {
                this.switchMode(isMonster);
            }
            
            // Apply the generated character/monster
            this.applyAIGeneratedCharacter(result);
            
            // Show character info
            this.showCharacterInfo(result);
            
        } finally {
            this.hideGenerationProgress();
        }
    }
    
    showCharacterInfo(characterData) {
        const content = document.getElementById('characterInfoContent');
        
        let html = `
            <div class="bg-gray-700 rounded p-4 mb-4">
                <h4 class="font-bold text-lg text-purple-300 mb-2">${characterData.concept}</h4>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div><span class="text-gray-300">Race:</span> <span class="text-white">${characterData.race}</span></div>
                    <div><span class="text-gray-300">Type:</span> <span class="text-white">${characterData.archetype}</span></div>
                </div>
            </div>
        `;
        
        if (characterData.personality || characterData.backstory) {
            html += `
                <div class="space-y-3">
                    ${characterData.personality ? `
                        <div>
                            <h5 class="font-semibold text-green-300 mb-1">Personality</h5>
                            <p class="text-gray-300 text-sm">${characterData.personality}</p>
                        </div>
                    ` : ''}
                    ${characterData.backstory ? `
                        <div>
                            <h5 class="font-semibold text-blue-300 mb-1">Backstory</h5>
                            <p class="text-gray-300 text-sm">${characterData.backstory}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        }
        
        content.innerHTML = html;
        
        this.closeAIModal();
        document.getElementById('characterInfoModal').classList.remove('hidden');
    }
    
    applyAIGeneratedCharacter(aiCharacter) {
        // Apply the AI-generated character configuration
        this.character.race = aiCharacter.race;
        this.character.head = aiCharacter.head;
        this.character.hair = aiCharacter.hair;
        this.character.eyes = aiCharacter.eyes;
        this.character.helmet = aiCharacter.helmet;
        this.character.armor = aiCharacter.armor;
        this.character.boots = aiCharacter.boots;
        this.character.gloves = aiCharacter.gloves;
        this.character.weapon = aiCharacter.weapon;
        this.character.shield = aiCharacter.shield;
        this.character.cape = aiCharacter.cape;
        this.character.accessory = aiCharacter.accessory;
        this.character.aura = aiCharacter.aura;
        this.character.wings = aiCharacter.wings;
        this.character.tail = aiCharacter.tail;
        this.character.horns = aiCharacter.horns;
        this.character.colors = aiCharacter.colors;
        
        this.setActiveRace(aiCharacter.race);
        this.updateUIFromCharacter();
        this.render();
    }
    
    async toggleAIAnimations() {
        this.aiEnhancedAnimations = !this.aiEnhancedAnimations;
        
        if (this.aiEnhancedAnimations) {
            await this.generateAIAnimationParameters();
        } else {
            this.aiAnimationParameters = {};
        }
    }
    
    async generateAIAnimationParameters() {
        try {
            const completion = await websim.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: `You are an expert animator. Generate realistic animation parameters for an RPG character.
                        
                        Consider the character's equipment and type to create appropriate movement:
                        - Heavy armor = slower, more stable movements
                        - Light armor/robes = faster, more fluid movements  
                        - Large weapons = slower attack animations
                        - Magic users = more dramatic casting gestures
                        - Wings = additional flying/hovering animations
                        
                        Respond with JSON only:
                        {
                          "walkSpeed": 0.5-2.0,
                          "attackSpeed": 0.5-2.0, 
                          "castingDrama": 0.5-2.0,
                          "idleIntensity": 0.1-1.0,
                          "movementWeight": 0.5-2.0,
                          "specialEffects": {
                            "hasGlow": boolean,
                            "hasParticles": boolean,
                            "hasTrails": boolean
                          },
                          "personalityType": "aggressive|graceful|mystical|sturdy"
                        }`
                    },
                    {
                        role: "user", 
                        content: `Generate animation parameters for this character:
                        - Race: ${this.character.race}
                        - Armor: ${this.character.armor}
                        - Weapon: ${this.character.weapon}
                        - Has wings: ${this.character.wings !== null}
                        - Has magic aura: ${this.character.aura !== null}
                        - Has cape: ${this.character.cape !== null}`
                    }
                ],
                json: true
            });
            
            this.aiAnimationParameters = JSON.parse(completion.content);
            
        } catch (error) {
            console.error('AI animation generation failed:', error);
            this.aiAnimationParameters = {
                walkSpeed: 1.0,
                attackSpeed: 1.0,
                castingDrama: 1.0,
                idleIntensity: 0.5,
                movementWeight: 1.0,
                specialEffects: { hasGlow: false, hasParticles: false, hasTrails: false },
                personalityType: "balanced"
            };
        }
    }
    
    exportSpriteSheet() {
        const animations = ['idle', 'walk', 'attack', 'cast', 'block', 'jump', 'death', 'victory', 'run'];
        const framesPerAnimation = 16;
        const spriteWidth = 96;
        const spriteHeight = 96;
        const cols = framesPerAnimation;
        const rows = animations.length;
        
        // Create larger canvas for sprite sheet
        const spriteCanvas = document.createElement('canvas');
        spriteCanvas.width = spriteWidth * cols;
        spriteCanvas.height = spriteHeight * rows;
        const spriteCtx = spriteCanvas.getContext('2d');
        spriteCtx.imageSmoothingEnabled = false;
        
        const originalAnimation = this.currentAnimation;
        const originalFrame = this.animationFrame;
        
        // Stop current animation
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
        }
        
        let currentRow = 0;
        const processAnimation = (animIndex) => {
            if (animIndex >= animations.length) {
                // Finished - download sprite sheet
                const link = document.createElement('a');
                link.download = 'rpg-character-spritesheet.png';
                link.href = spriteCanvas.toDataURL();
                link.click();
                
                // Restore original animation
                this.currentAnimation = originalAnimation;
                this.animationFrame = originalFrame;
                this.startAnimation();
                return;
            }
            
            const animation = animations[animIndex];
            this.currentAnimation = animation;
            
            for (let frame = 0; frame < framesPerAnimation; frame++) {
                this.animationFrame = frame;
                this.render();
                
                // Copy current frame to sprite sheet
                spriteCtx.drawImage(
                    this.canvas,
                    frame * spriteWidth, animIndex * spriteHeight,
                    spriteWidth, spriteHeight
                );
            }
            
            // Process next animation
            setTimeout(() => processAnimation(animIndex + 1), 10);
        };
        
        processAnimation(0);
    }
    
    exportGIF() {
        const gif = new GIF({
            workers: 2,
            quality: 10,
            width: 96,
            height: 96,
            workerScript: 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js'
        });
        
        const originalFrame = this.animationFrame;
        const framesCount = 32; // 2 second animation at ~16fps
        const frameDelay = 120; // ms between frames
        
        // Stop current animation
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
        }
        
        let capturedFrames = 0;
        const captureFrame = () => {
            if (capturedFrames >= framesCount) {
                gif.on('finished', (blob) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = `rpg-character-${this.currentAnimation}.gif`;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                    
                    // Restore animation
                    this.animationFrame = originalFrame;
                    this.startAnimation();
                });
                
                gif.render();
                return;
            }
            
            this.animationFrame = capturedFrames;
            this.render();
            
            // Add frame to GIF
            gif.addFrame(this.canvas, { delay: frameDelay });
            
            capturedFrames++;
            setTimeout(captureFrame, 10);
        };
        
        captureFrame();
    }
}

// Initialize the character generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RPGCharacterGenerator();
});
