const inventory = {};

const scenes = {
    intro: {
        reset: true,
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
            { text: "I have something to offer in exchange for your help", next: "offerItem", condition: "Glowing Sand" }
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
            { text: "Enter the temple", next: "endingOne" }
        ]
    },

    endingOne: {
        text: "Inside the temple, you find a glowing crystal. As you touch it, visions of the way home flood your mind. You Win!",
        options: [
            { text: "Play Again", next: "intro" }
        ]
    }
};



function showScene(key) {
    const scene = scenes[key];
    const sceneDiv = document.getElementById("scene");
    const optionsDiv = document.getElementById("options");

    sceneDiv.textContent = scene.text;
    optionsDiv.innerHTML = "";

    if (scene.reset) {
        for (let key in inventory) {
            delete inventory[key];
        }
        updateInventory();
    }


    if (scene.inventoryGain) {
        inventory[scene.inventoryGain] = true;
        updateInventory();
    }
    scene.options.forEach(option => {
    if (option.condition && !inventory[option.condition]) return;
        
    const btn = document.createElement("button");
        btn.textContent = option.text;
        btn.onclick = () => {
            if (option.consume) {
                delete inventory[option.consume];
                updateInventory();
            }
            showScene(option.next);
        };
        optionsDiv.appendChild(btn);
    

    
});

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

}

showScene("intro");
