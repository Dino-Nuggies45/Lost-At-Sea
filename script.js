const inventory = {};
const state = {
    completedScenes: {},
    choices: {},
}; 

const scenes = {
    intro: {
        text: "You wake up on a wooden raft, adrift in a vast ocean. The sun is setting, casting a golden hue over the water. You have no memory of how you got here, but you know you need to survive. Two islands and a pirate ship are visible in the distance.",
        options: [
            { text: "Swim to the misty island", next: "mistyIsland" },
            { text: "Row toward the glowing shore", next: "glowingShore" },
            { text: "Yell for help and hope the pirates will hear you", next: "pirateShip" }
        ]
    },
    mistyIsland: {
        text: "Fog surrounds you. You spot a cloaked figure holding a lantern...",
        options: [
            { text: "Talk to the figure", next: "talkHermit" },
            { text: "Sneak past into the jungle", next: "junglePath" }
        ]
    },

    glowingShore: {
        text: "You softly bump into the glowing shore. Its warm and oddly comforting...",
        options: [
            { text: "Pick up the glowing sand", next: "sandCollected" },
            { text: "Search the beach", next: "beachSearch" }
        ]
    },

    pirateShip: {
        text: "The pirate ship sails closer, weary of you. A pirate shouts, 'What do you want you landlubber?'",
        options: [
            { text: "Hey I'm not a landlubber! I need help getting home", next: "homeHelp" },
            { text: "I have something to offer in exchange for your help", next: "offerItem", condition: "Glowing Sand", consume: "Glowing Sand" }
        ]
    },

    homeHelp: {
        text: "The pirates laugh. 'We don't help landlubbers! But if you have something to offer, we might consider it.'",
        options: [
            { text: "Back to square one", next: "intro" },
        ]
    },

    offerItem: {
        text: "You hand over the glowing sand. The pirate jumps down from the ship and examines it. 'This is rare stuff! Welcome aboard!'",
        options: [
            { text: "Climb on the ship and get ready for the adventure", next: "adventureTime" }
        ]
    },

    adventureTime: {
        text: "As you board the ship, the Captain examines you. 'We were looking for a lost relic, but this sand will do millions back at the port, get settled in, dinner is at moonrise.' You look around and notice some crew members you can talk to.",
        options: [
            { text: "Talk to the lonely crewmember", next: "lonelyCrew" },
            { text: "Talk to the excited crewmember", next: "excitedCrew" },
            { text: "Talk to the tired crewmember", next: "tiredCrew", once: "tiredCrewDone" },
            { text: "Offer the magic shell", next: "offeringCaptain", condition: "Magic Shell", consume: "Magic Shell" },
            { text: "Offer the location of the temple", next: "offerLocation", condition: "ancientTempleLocation", consume: "ancientTempleLocation" },
            { text: "Watch the Ocean until dinner", next: "confirmationPage" }
        ]
    },

    

    lonelyCrew: {
        text: "As you board the ship, the Captain examines you. 'We were looking for a lost relic, but this sand will do millions back at the port, get settled in, dinner is at moonrise.' You look around and notice some crew members you can talk to.",
        options: [
            { text: "Talk to the lonely crewmember", next: "lonelyCrew" },
            { text: "Talk to the excited crewmember", next: "excitedCrew" },
            { text: "Talk to the tired crewmember", next: "tiredCrew" },
            { text: "Offer the magic shell", next: "offeringCaptain", condition: "Magic Shell", consume: "Magic Shell" },
            { text: "Offer the location of the temple", next: "offerLocation", condition: "ancientTempleLocation", consume: "ancientTempleLocation" },
            { text: "Watch the Ocean until dinner", next: "oceanWatching" }
        ]
    },

  excitedCrew: {
        text: "As you board the ship, the Captain examines you. 'We were looking for a lost relic, but this sand will do millions back at the port, get settled in, dinner is at moonrise.' You look around and notice some crew members you can talk to.",
        options: [
            { text: "Talk to the lonely crewmember", next: "lonelyCrew" },
            { text: "Talk to the excited crewmember", next: "excitedCrew" },
            { text: "Talk to the tired crewmember", next: "tiredCrew" },
            { text: "Offer the magic shell", next: "offeringCaptain", condition: "Magic Shell", consume: "Magic Shell" },
            { text: "Offer the location of the temple", next: "offerLocation", condition: "ancientTempleLocation", consume: "ancientTempleLocation" },
            { text: "Watch the Ocean until dinner", next: "oceanWatching" }
        ]
    },

  tiredCrew: {
        text: "You approach a tired-looking crewmember. 'I just want to get home,' he sighs. 'This treasure hunt is exhausting.' You nod in understanding, explaining your story. The tired crew member yawns, 'Lets head to the bunk and secure you a bed...after dinner these pigs with two legs forget about rules and curtousy and will sleep anywhere that doesn't have stuff on it.'",
        options: [
         { text: "Head down to the bunks with him", next: "bunkRoom" }
        ]
    },

    bunkRoom: {
         text: "You make it to the bunks and begin to search for a place to sleep. The tired crewmember tosses a heavy sack of sand onto a bunk, 'Pick any bunk...just not mine and find something heavy to place one it trust me you don't want to be bedless...' First you decided to pick a bunk...",
        options: [
         { text: "Top Bunk(above the tired crewmate)", next: "itemSearch" },
         { text: "Bottom Bunk(Next to the tired crewmate", next: "itemSearch" }
        ]
    },

    itemSearch: {
         text: "You search the room for something to place on the bunk. ",
        options: [
         { text: "A sack of sand that is already on someones bunk", next: "selfishChoice" },
         { text: "A bird cage", next: "birdCage" },
         { text: "A heavy but suspicious looking crate", next: "crate" }
        ]
    },

    selfishChoice: {
        text: "You take the sack of sand and place it on the top bunk. The tired crewmember looks at you with a frown, 'Really? You could have at least asked them...but whatever. I wont tell'",
        options: [
            { text: "leave the tired crewmember to his rest and go back up", next: "adventureTime",
            onChoose: () => { state.completedScenes["tiredCrewDone"] = true; }
             }
        ]
    },

    birdCage: {
        text: "You take the bird cage and place it on the top bunk. The tired crewmember raises an eyebrow, 'A bird cage? Really? Well, at least it's something.'",
        options: [
            { text: "leave the tired crewmember to his rest and go back up", next: "adventureTime" }
        ]
    },

    crate: {
        text: "You take the heavy crate and place it on the top bunk. The tired crewmember looks at you with a mix of admiration and concern, 'That's...a bit much, but I guess it works.'",
        options: [
            { text: "leave the tired crewmember to his rest and go back up", next: "adventureTime" }
        ]
    },

  offeringCaptain: {
        text: "You hand over the magic shell. The Captain smiles, 'This is the conch! It is said to have the ability to summon the sea gods! I declare you my right hand! This is worth a fortune!'",
        options: [
            { text: "'Actually give it back I want it for myself!", next: "takeBack", consume: "Magic Shell" },
            { text: "Smile at the Captain, proud of the upgrade", next: "accept"},
        ]
    },

  offerLocation: {
        text: "The Captain listens raising a curious brow, 'A temple? Hm...I guess we won't be needing this sand after all. Lead us to this...temple...I heard its the key to getting home...and making a fat stack of cash.'",
        options: [
            { text: "Refuse, the treasure is yours to keep now", next: "refusal" },
            { text: "Accept, the pirates are honest you both benefit", next: "accept"},
        ]
    },

    confirmationPage: {
        text: "You have chosen to watch the ocean until dinner. All other options will be unavailable. Are you sure you want to proceed?",
        options: [
            { text: "Yes", next: "oceanWatching" },
            { text: "No", next: "adventureTime" }
        ]
    },

  oceanWatching: {
        text: "You lean on the edge of the ship, watching the waves. The ocean is calm, and you feel a sense of peace. The sun dips below the horizon, painting the sky in hues of orange and purple. The moon rises as the crew prepares dinner. You feel a strange connection to the ocean, as if it holds secrets waiting to be discovered.",
        options: [
            { text: "Go Eat Dinner", next: "dinnerTime" }
        ]
    },


    sandCollected: {
        text: "You bottle some glowing sand. It hums faintly in your hand before you stash it away.",
        options: [
            { text: "Return to the raft", next: "intro" },
        ],
        inventoryGain: "Glowing Sand"
    },

    talkHermit: {
        text: "The hermit offers you a torch. 'Take it, and see the truth in the jungle.'",
        options: [
            { text: "Take the torch", next: "torchTaken" },
            { text: "Refuse and run", next: "junglePath" }
        ]
    },

    torchTaken: {
        text: "You recieve a torch.",
        options: [
            { text: "Venture into the jungle", next: "junglePath" },
        ],
        inventoryGain: "Torch"
    },

    beachSearch: {
        text: "You find a shell with strange carvings...it feels oddly magical.",
         options: [
            { text: "Keep it", next: "intro" }
        ],
        inventoryGain: "Magic Shell"
    },

    junglePath: {
        text: "The jungle is dark. Vines hang low. You hear growling.",
        options: [
            { text: "Light the torch", next: "safePath", condition: "Torch", consume: "Torch" },
            { text: "Proceed without light", next: "dangerPath" }
        ]
    },

    safePath: {
        text: "With the torch you are able to see clearly, the growling fades into the darkness.",
        options: [
            { text: "Keep Exploring", next: "templeEntrance" },
            
        ]
    },

    dangerPath: {
        text: "You are ambushed and knocked unconcious! You wake up back on your raft.",
        options: [
            { text: "Wake up", next: "intro" },
            
        ]
    },

    templeEntrance: {
        text: "You find an ancient temple. The walls are covered in glowing runes.",
        options: [
            { text: "Enter the temple", next: "endingOne" },
            { text: "Run back to the raft", next: "intro" }
        ],
        inventoryGain: "ancientTempleLocation"
    },

    endingOne: {
        text: "Inside the temple, you find a glowing crystal. As you touch it, visions of the way home flood your mind. You Win!",
        options: [
            { text: "Play Again", next: "intro" }
        ],
        reset: true
    }
};



function showScene(key) {
    const scene = scenes[key];
    const sceneDiv = document.getElementById("scene");
    const optionsDiv = document.getElementById("options");

    sceneDiv.textContent = scene.text;
    optionsDiv.innerHTML = "";

    if (scene.reset) {
        for (let key in inventory) delete inventory[key];
        for (let key in state.completedScenes) delete state.completedScenes[key];
        for (let key in state.choices) delete state.choices[key];
        
        updateInventory();
    }

    sceneDiv.textContent = scene.text;
    optionsDiv.innerHTML = "";

    if (scene.reset) {
        for (let key in inventory) delete inventory[key];
        for (let key in state.completedScenes) delete state.completedScenes[key];
        for (let key in state.choices) delete state.choices[key];
        updateInventory();
    }

    if (scene.inventoryGain) {
        inventory[scene.inventoryGain] = true;
        updateInventory();
    }

    scene.options.forEach(option => {
        if (option.condition && !inventory[option.condition]) return;
        if (option.once && state.completedScenes[option.once]) return;

        const btn = document.createElement("button");
        btn.textContent = option.text;
        btn.onclick = () => {
            if (option.onChoose) {
                option.onChoose();
            }

            if (option.consume) {
                delete inventory[option.consume];
                updateInventory();
            }

            if (option.setChoice) {
                state.choices[option.setChoice.key] = option.setChoice.value;
            }

            if (option.once) {
                state.completedScenes[option.once] = true;
            }

            showScene(option.next);
        };
        optionsDiv.appendChild(btn);
    });
}


function updateInventory() {
    const inventoryDiv = document.getElementById("inventory");
    inventoryDiv.innerHTML = "<h3>Inventory</h3>";
    
    for (const item in inventory) {
        if (inventory[item]) {
            const itemDiv = document.createElement("div");
            itemDiv.textContent = item;
            inventoryDiv.appendChild(itemDiv);
        }
    }
}


showScene("intro");
