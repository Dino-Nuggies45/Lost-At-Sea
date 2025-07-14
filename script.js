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
            { text: "Talk to the lonely crewmember", next: "lonelyCrew", once: "lonelyCrewDone" },
            { text: "Talk to the excited crewmember", next: "excitedCrew", once: "excitedCrewDone" },
            { text: "Talk to the tired crewmember", next: "tiredCrew", once: "tiredCrewDone" },
            { text: "Offer the magic shell", next: "offeringCaptain", condition: "Magic Shell", consume: "Magic Shell" },
            { text: "Offer the location of the temple", next: "offerLocation", condition: "Ancient Temple Location", consume: "Ancient Temple Location" },
            { text: "Watch the Ocean until dinner", next: "confirmationPage" }
        ]
    },

    

    lonelyCrew: {
        text: "You approach a crewmember sitting alone, his gaze fixed on the horizon. Your presence seems to startle him. 'Oh, hello there,' he says softly. You introduce yourself and explain your situation. You ask if he needs any help. He shakes his head, 'No...sometimes you just need a moment away from the chaos of the ship.' You nod and sit with him a while longer. He begins to play a soft song on a self made bangoo.",
        options: [
            { text: "Listen and enjoy the music", next: "musicEnjoyed" },
            { text: "Leave him to his thoughts and go back to the main deck", next: "adventureTime"}
        ]
    },

    musicEnjoyed: {
        text: "...",
        options: [
            { text: "Leave him to his thoughts and go back to the main deck", next: "adventureTime" }
        ]
    },

  excitedCrew: {
        text: "You walk over to a crewmember who is lugging a heavy jug of wine. 'This is going to be the best dinner yet!' he laughs. As you approach he sets down the jug, 'Hey! You're the new mate! How did you end up here?' You explain your story to him and he nods in understanding. 'Well, if you want to help us out, we could use some extra hands. Carry one of those other jugs to the dinner table for me yeah?'",
        options: [
             { text: "Grab a heavy jug", next: "heavyJug" },
             { text: "Grab a light jug", next: "lightJug" }
        ]
    },

    lightJug: {
        text: "You pick up the light jug and carry it with ease. The excited crewmember grins, 'Look at you! Little weakling in our crew yeah?' You carry it to the dinner table, but you can feel the crews disappointment.",
        options: [
            { text: "go back and get the heavy jug", next: "anotherRound2" },
            { text: "head back to the main deck", next: "adventureTime", }
        ]
    },

    heavyJug: {
        text: "You pick up the heavy jug and struggle to carry it. The excited crewmember laughs, 'You sure you can handle that? It's a bit much for a new mate!' You manage to carry it to the dinner table, but you're exhausted.",
        options: [
            { text: "go back and get the light jug", next: "anotherRound1" },
            { text: "head back to the main deck", next: "adventureTime",  }
        ]
    },

    anotherRound1: {
        text: "You head back to the excited crewmember, who is still laughing grabbing the light jug from him 'Okay big guy! Thanks for your help!'",
        options: [
            { text: "Head back to the main deck", next: "adventureTime"}
        ]
    },

    anotherRound2: {
        text: "You head back to the excited crewmember, who is still laughing you grab the heavy jug from him. 'Desprate for a redemption aye? Go for it, don't spill or you're paying!'",
        options: [
            { text: "Head back to the main deck", next: "adventureTime", }
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
                setChoice: { key: "choice", value: "sand" } 
            }
        ]
    },

    birdCage: {
        text: "You take the bird cage and place it on the top bunk. The tired crewmember raises an eyebrow, 'A bird cage? Really? Well, at least it's something.'",
        options: [
            { text: "leave the tired crewmember to his rest and go back up", next: "adventureTime", 
                setChoice: { key: "choice", value: "birdCage" } 
            }
        ]
    },

    crate: {
        text: "You take the heavy crate and place it on the top bunk. The tired crewmember looks at you with a mix of admiration and concern, 'That's...a bit much, but I guess it works.'",
        options: [
            { text: "leave the tired crewmember to his rest and go back up", next: "adventureTime", 
                 setChoice: { key: "choice", value: "crate" } 
            }
        ]
    },

  offeringCaptain: {
        text: "You hand over the magic shell. The Captain smiles, 'This is the conch! It is said to have the ability to summon the sea gods! I declare you my right hand! Of course only if you're willing to give it to me?' The Captain hands you a badge that says 'Right Hand of the Captain'.",
        options: [
            { text: "'Actually give it back I want it for myself!'", next: "refusal" },
            { text: "Smile at the Captain, proud of the upgrade", next: "accept1", consume: "Magic Shell",
                setChoice: { key: "gaveMagicShell", value: true} 
            },
        ],
        inventoryGain: "_Right hand badge"
    },

    accept1: {
        text: "The Captain grins, 'Wonderful! Now we can sail the seas without any worry! I will make sure you get your share of the fortune! In the meantime, head to the main deck, socialize, enjoy the waves!'",
        options: [
            { text: "Bid her farewell and head to the main deck", next: "adventureTime" },
        ]
    },

  offerLocation: {
        text: "The Captain listens raising a curious brow, 'A temple? Hm...I guess we won't be needing this sand after all. Lead us to this...temple...I heard its the key to getting home...and making a fat stack of cash.'",
        options: [
            { text: "Refuse, the treasure is yours to keep now", next: "refusal" },
            { text: "Accept, the pirates are honest you both benefit", next: "accept", consume: "Ancient Temple Location", setChoice: { key: "revealedTemple", value: true } }
        ]
    },

    accept: {
        text: "The Captain nods, 'Good choice! We will have to postpone our trip home and investigate that temple in the morning! In the meantime, head to the main deck, socialize, enjoy the waves!'",
        options: [
            { text: "Bid her farewell and head to the main deck", next: "adventureTime" },
          
        ],
        inventoryGain: "_TempleSail"
    },

    refusal: {
        text: "The Captain frowns, 'You landlubber! You think we'll let you go after this? We'll see about that!' The crew turns hostile, and you are forced to jump overboard to escape.",
        options: [
            { text: "Swim back to the raft", next: "intro" }
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

    dinnerTime: {
        text: "Dinner is served. The crew gathers around, sharing stories and laughter. You feel a sense of belonging, even if just for a moment. As you eat, you notice the tired crewmember from earlier looking at you with a nod of approval. The excited crewmember raises his jug in a toast to you, and the lonely crewmember smiles softly.",
        options: [
            { text: "Enjoy the meal and camaraderie", next: "bunkerResults" }
        ]
    },

    bunkerResults: {
        text: () => {
            const choice = state.choices.choice;
            if (choice === "sand") {
                return "You return to the bunk and find the sack of sand and your bunk still there.";
            } else if (choice === "birdCage") {
                return "You return to find your bunk occupied the bird cage knocked off the bed. You sigh and scurry to find a place on the floor to sleep.";
            } else if (choice === "crate") {
                return "You return to the bunk and find the heavy crate and your bunk still there. Although it takes a lot of effort to get rid of the crate before you sleep, it is worth it to have a nice bed to sleep in.";
            } else {
                return "You didn't make a choice, so you find a random spot on the floor. It's not the most comfortable, but it will do for the night.";
            }
        },
        options: [
            { text: "Go To Sleep", next: "nextDay" }
        ]
    },

    nextDay: {
        text: () => {
            if (state.choices.revealedTemple) {
                return "You wake up to the sound of waves and the smell of salt in the air. The crew is already up, preparing to set sail towards the temple. The Captain nods at you, 'Ready for an adventure?'";
            } else if (state.choices.gaveMagicShell) {
                return "You wake up with a sense of purpose. You head out to the main deck where the Captain is waiting. 'Today we sail to riches!' she declares, holding the magic shell high.";
            } else {
                return "The tired crewmember wakes you up, 'Time to get moving, mate. Theres a lot on the agenda.' You stretch and prepare for whatever lies ahead.";
            }
        },
        options: [
            { text: "Head over to the temple", 
                next: "templeSail",
                condition: "_TempleSail"
            },
            { text: "Set sail to riches",
                next: "dailyChoresRightHand",
                condition: "_Right hand badge"
            },

            { text: "Get ready for the day",
              next: "dailyChoresCrew",
              
            }
        ]
        
    },



    dailyChoresCrew: {
        text: "You and the Captain head towards the front of the ship. As the ship starts to move you notice a storm ahead, 'Has that storm always been there?' You question. The Captain nods, 'In all my years I've never experienced a storm as bad as that one. When we've attemped to battle it we just get pushed back here but this time its different...we have you now. Although we are missing the shell which would get us out this mess quicker...but thats besides the point, it is time ONWARD' Are you ready?",
        options: [
            {text: "Yes", next: "stormStart"}
        ]
    },

    stormStart: {
        text: "You tighten the sails and brace for impact. With no shell to guide you, it’s up to your wits and unity.",
        options: [
            { text: "Rally the crew with a speech", next: "rallyCrew" },
            { text: "Go silent and take the helm yourself", next: "silentLeadership" }
        ]
    },

    rallyCrew: {
        text: "'This storm won’t break us!' you shout. The crew cheers and readies themselves.",
        options: [
            { text: "Assign roles carefully", next: "assignRoles" },
            { text: "Let the crew choose their tasks", next: "crewChoiceChaos" }
        ]
    },

    silentLeadership: {
        text: "You wordlessly grab the wheel and push forward, hoping your actions speak louder.",
        options: [
            { text: "Order everyone below deck", next: "belowDeck" },
            { text: "Keep everyone on deck to fight", next: "fightTogether" }
        ]
    },

    assignRoles: {
        text: "Everyone knows what to do. The ship runs like clockwork through the chaos.",
        options: [
            { text: "Focus on defense", next: "minimalDamage" },
            { text: "Attack the storm head-on", next: "stormStrike" }
        ]
    },

    crewChoiceChaos: {
        text: "Without direction, chaos erupts. The crew panics.",
        options: [
            { text: "Try to regain control", next: "tooLate" },
            { text: "Abandon ship", next: "shipwrecked" }
        ]
    },

    belowDeck: {
        text: "Your call protects the crew but risks the ship. A huge wave crashes over you.",
        options: [
            { text: "Brace and ride it out", next: "surviveCrash" },
            { text: "Call for help from the spirits", next: "stormSpirits" }
        ]
    },

    fightTogether: {
        text: "Side by side, the crew fights the storm. You grow stronger as one.",
        options: [
            { text: "Push for the storm's center", next: "finalPush" },
            { text: "Try to ride the storm’s edge", next: "stormEdge" }
        ]
    },

    minimalDamage: {
        text: "Your planning pays off. The ship sustains only minor damage. You reach the harbor safely.",
        options: [
            { text: "Return home", next: "endingGood" }
        ]
    },

    stormStrike: {
        text: "You strike into the storm... and it splits before you. You've earned the sea’s respect.",
        options: [
            { text: "Settle as Captain of these waters", next: "endingAltNewLife" }
        ]
    },

    tooLate: {
        text: "Your crew can’t recover in time. The ship is lost to the sea.",
        options: [
            { text: "Restart your journey", next: "intro" }
        ]
    },

    shipwrecked: {
        text: "You leap too soon. The sea swallows you.",
        options: [
            { text: "Restart your journey", next: "intro" }
        ]
    },

    surviveCrash: {
        text: "You survive, barely. The crew sees your scars as proof of leadership.",
        options: [
            { text: "Retire and start a quiet life", next: "endingNeutral" }
        ]
    },

    stormSpirits: {
        text: "The spirits answer and lift your ship above the waves.",
        options: [
            { text: "Thank them and journey on", next: "endingGood" }
        ]
    },

    finalPush: {
        text: "The center of the storm reveals treasure and tranquility. You’ve earned it.",
        options: [
            { text: "Live here with the crew", next: "endingAltNewLife1" },
            { text: "Sail home victorious", next: "endingGood1" }
        ]
    },

    endingAltNewLife1:{
        text:"The captain looks at you and smiles 'Welcome to the crew!'",
        options: [
            { text: "Restart your journey", next: "intro" }
        ]
    },

    endingGood1:{
        text:"You and the crew finally dock at the destination. As you unboard the ship you look towards the crew and then back at the city. Your time with them was short lived, but it was worth every second.",
        options: [
            { text: "Restart your journey", next: "intro" }
        ]
    },

    stormEdge: {
        text: "You misjudge the edge and are pulled under.",
        options: [
            { text: "Restart your journey", next: "intro" }
        ]
    },

    dailyChoresRightHand: {
        text: "You and the Captain head towards the front of the ship. As the ship starts to move you notice a storm ahead, 'Has that storm always been there?' You question. The Captain nods, 'In all my years I've never experienced a storm as bad as that one. When we've attemped to battle it we just get pushed back here but this time its different...we have the shell now.' Are you ready?",
        options: [
            {text: "Yes", next: "shellStart"}
        ]
    },

    shellStart: {
        text: "You hand the magic shell to the Captain. She holds it high and chants something under her breath. The sky trembles, and the storm seems to part slightly in the distance.",
        options: [
        { text: "Suggest steering directly into the parting clouds", next: "directPath" },
        { text: "Wait a moment to observe the storm's reaction", next: "observeFirst" }
    ]
    },

    directPath: {
        text: "You urge the crew to move now, hoping the shell’s power lasts. The ship lurches forward into the eye of the storm.",
        options: [
            { text: "Hold the shell aloft and concentrate", next: "concentrationTest" },
            { text: "Trust the shell and focus on steering", next: "focusSteering" }
        ]
    },

    observeFirst: {
        text: "You ask the Captain to wait and study the shell’s energy. The shell begins pulsing in rhythm with the thunder.",
        options: [
            { text: "Try to match the ship’s course to the pulse", next: "pulseCourse" },
            { text: "Use this moment to call out to the sea", next: "callSea" }
        ]
    },

    concentrationTest: {
        text: "You grip the shell tightly. A voice echoes in your mind, 'Balance or perish.'",
        options: [
            { text: "Focus on harmony between shell and sea", next: "balanceAchieved" },
            { text: "Try to control the storm forcefully", next: "controlFails" }
        ]
    },

    focusSteering: {
        text: "You leave the shell to the Captain and focus on guiding the ship through lightning-lit waters.",
        options: [
            { text: "Speed up to escape faster", next: "speedTooFast" },
            { text: "Stay the course steadily", next: "steadyWins" }
        ]
    },

    pulseCourse: {
        text: "You adjust the course in sync with the shell’s pulses. The storm begins to hum in harmony.",
        options: [
            { text: "Continue syncing with the rhythm", next: "safePassage" },
            { text: "Break the pattern and rush ahead", next: "breakHarmony" }
        ]
    },

    callSea: {
        text: "You call to the sea with your heart. A spectral whale appears and guides your ship gently forward.",
        options: [
            { text: "Follow the whale closely", next: "followWhale" },
            { text: "Try to overtake it", next: "disrespectSea" }
        ]
    },


    balanceAchieved: {
        text: "The shell glows bright. The storm calms. You've guided your crew to safety with balance and care.",
        options: [
            { text: "Return home with honor", next: "endingGood" },
            { text: "Stay and explore the calm seas", next: "endingNeutral" }
        ]
    },

    controlFails: {
        text: "The shell cracks. The storm engulfs the ship. You lose control as the sea takes everything.",
        options: [
            { text: "Restart your journey", next: "intro" }
        ]
    },

    speedTooFast: {
        text: "Your speed causes the ship to lose balance and crash against hidden rocks.",
        options: [
            { text: "Restart your journey", next: "intro" }
        ]
    },

    steadyWins: {
        text: "Despite chaos around you, your calm decisions bring the crew safely through the storm.",
        options: [
            { text: "Celebrate with the crew", next: "endingGood" }
        ]
    },

    safePassage: {
        text: "The pulse leads you to a hidden bay. You're safe, and the crew praises your instincts.",
        options: [
            { text: "Head home with treasures", next: "endingGood" }
        ]
    },

    breakHarmony: {
        text: "Breaking the rhythm angers the sea. A wave capsizes the ship.",
        options: [
            { text: "Restart your journey", next: "intro" }
        ]
    },

    followWhale: {
        text: "The whale leads you to a secret island filled with peace and promise.",
        options: [
            { text: "Start a new life here", next: "endingAltNewLife" },
            { text: "Return and tell the tale", next: "endingGood" }
        ]
    },

    disrespectSea: {
        text: "You try to overtake the whale. It vanishes, and the sea punishes your arrogance.",
        options: [
            { text: "Restart your journey", next: "intro" }
        ]
    },

    endingAltNewLife:{
        text:"You start a new",
        options: [
            { text: "Restart your journey", next: "intro" }
        ]
    },

    endingAltNewLife:{
        text:"You return to the ship ready to tell the tale",
        options: [
            { text: "Restart your journey", next: "intro" }
        ]
    },


    templeSail: {
        text: "The crew sets sail towards the temple. The ocean is calm, and the sun shines brightly. You feel a sense of excitement and anticipation as you approach the mysterious island. You notice the three crew members from before, who do you want to talk to?(You can only choose one)",
        options: [
            { text: "The tired crew member", next: "tiredCrewTemple" },
            { text: "The excited crew member", next: "excitedCrewTemple" },
            { text: "The lonely crew member", next: "lonelyCrewTemple" }
        ]
    },

    tiredCrewTemple: {
        text: "You approach the tired crewmember, who is carefully mopping the deck. 'Oh, hey there.' Heard you were the one who gave the Captain the location to this temple. On behalf of the crew, I want to thank you. We have been searching for this place for years.' He pauses, 'I just hope we find what we're looking for and get home soon.'(You can only choose one).",
        options: [
            { text: "Ask him about his experiences", next: "tiredCrewTempleTalk" },
            { text: "Ask about home", next: "tiredCrewTempleHome" },
        ]
    },

    tiredCrewTempleHome: {
        text: "'Home?' The tired crewmember chuckles a little, 'honestly, I've spent so long at sea, I forget what home feels like.' You tilt your head, confused. He beings again, 'Ah...I am always saying that I miss home and now I'm telling you I don't remember it...I guess I mean I miss the feeling of home. Theres some kind of comfort in knowing you have a place to go back to, you know? When all this is over...I hope to find home again, a place where I can rest, no more adventures, no more searching for treasure...just peace.' You nod, understanding the longing for a place to belong. You two talk for a bit longer begore the Captain comes out ready to set sail. 'Alright crew! We are almost there! Get ready for the adventure of a lifetime!'",
        options: [
            { text: "Head back to the main deck", next: "mainDeck" }
        ]
    },

    tiredCrewTempleTalk: {
        text: "'My experience? Well, the Captain is my sister. Shes always been adventurous, so when she told me she wanted to sail the seas, I had to join her. I would much rather be at home, but I don't think shes old enough to be on her own...well...thats what I tell myself. Shes shown me shes more than capable of taking care of herself, but I still worry...ah! I didn't mean to ramble on like that...' You nod, you have no recollection of your family, home, or anything before the raft. You feel a strange emptiness, but you push it aside. Adventure awaits. You two talk for a bit longer before the Captain comes out ready to set sail. 'Alright crew! We are almost there! Get ready for the adventure of a lifetime!'",
        options: [
            { text: "Head back to the main deck", next: "mainDeck" }
        ]
    },

    excitedCrewTemple: {
        text: "You approach the excited crewmember, who had been busy running around the ship, 'Hey! Rumor has it you're the one who found the temple! How did you find it? You must be the luckiest person alive! HAHA' You notice he is carrying multiple items, from swords to spears to sheilds.(You can only choose one).",
        options: [
            { text: "Offer help", next: "helpExcitedCrew" },
            { text: "Ask him about home", next: "excitedCrewHome" }
        ]
    },

    helpExcitedCrew:{
        text: "You open your arms 'I can help out' He looks a little shocked before handing you a couple weapons, 'Thanks! We're just taking them to the back of the ship. Thats where the stand is for them. We'll be taking them into the island according to the Captain, we don't know whats there.' You and him lug the weapons to the end of the ship talking about anythings that comes to mind. The excited crew member carries most of the conversation, but he still allows you to talk. You both prop the weapons on the stand before hearing the Captain's voice. 'Alright crew! We are almost there! Get ready for the adventure of a lifetime!'",
        options: [
            { text: "Head back to the main deck", next: "mainDeck" }
        ]
    },

    excitedCrewHome: {
        text: "'Ah! home sweet home aye? I can't tell you!' He laughs, 'I've spent all my life at sea, but I don't exactly miss the land. The ocean breeze, the salty sea air, and more importantly the crew, this is honestly all I need! Home can be a lot of places and to each their own, but for me the land isnt that. Nobody is crazy out at sea, everybody belongs and the crew here will go out their way to protect their own. I'm more at home here than I am anywhere else...but that just me.' He laughs again. 'I better get back to work!' The Captain comes out ready to set sail. 'Alright crew! We are almost there! Get ready for the adventure of a lifetime!'",
        options: [
            { text: "Head back to the main deck", next: "mainDeck" }
        ]
    },

    lonelyCrewTemple:{
        text: "The sweet sound of his bango and his voice fill the air. He looks up at you and nods before going back to his instrument. The waves crash to the beat and he gestures for you to take a seat. Calm and collected he continues to play, no words exchanged, but you can tell his feelings through his song. You watch the waves crash into the ocean, it is serene and peaceful.",
        options: [
            { text: "Ask him to play a song from his home", next: "lonelyCrewSong" },
            { text: "Ask him to teach you how to play", next: "lonelyCrewInstrument" }
        ]
    },

    lonelyCrewSong:{
        text: "He looks over at you, a little surprised by your request. He smiles and nods and begins to play. It is slow, not upbeat like the other songs hes played. 'My mama used to sing to this song. I've long forgotten the words, but I can recite the melody in my sleep. Its a nice song, maybe someday I can remember the lyrics or maybe just create new ones.' You are a bit surprised to hear him speak, but you nod reasurring that you heard him. He beings to play, the melody is calming not what you would expect when you look at him. You feel a strange comfort from the song. You enjoy the moments of silence before the Captain comes out ready to set sail. 'Alright crew! We are almost there! Get ready for the adventure of a lifetime!'",
        options: [
            { text: "Play a song from your home", next: "lonelyCrewSong" },
            { text: "Ask him to teach you how to play", next: "lonelyCrewInstrument" }
        ]
    },

    lonelyCrewInstrument:{
        text: "A small chuckle slips from his lips as he nods, 'Why not?' He hands you the bango and faces you. He pretends to hold the bango in his hands and begins guiding his hands as if they were playing something, 'Since its your first time don't think about messing up, just think about getting through the entire song.' He digs in his pocket and pulls out a sheet of paper with what look like chords. 'Don't worry, just play all of them open chord, it will still be beautiful.'",
        options: [
            { text: "Play the song on your own", next: "rhythmGameStart"},
            {text: "Thank him and move on", next: "postRhythmGame"}
        ]
    },
    
    rhythmGameStart:{
        text: () => {
            setTimeout(startRhythmGame, 100);
            return "You prepare yourself and start strumming(hit A S or D depending on where the note is: far right is D, middle is S, and far left is A)";
        },
        options:[]
    },

    postRhythmScene:{
        text: () => {
            return "You finish the song the lonely crew mate nods in approval taking his bango back, come back if you ever want to play again! The Captain comes out ready to set sail. 'Alright crew! We are almost there! Get ready for the adventure of a lifetime!'";
        },
        options: [
            { text: "Head back to the main deck", next: "mainDeck" }
        ]
    },

    mainDeck: {
        text: "Once you finish up with your crew mate you meet at the front of the ship where the Captain looks like shes preparing a speech. She glances over the crowd before giving you a smile 'My comrades today we face the unknown! In this Jungle there are things we may have never experienced but our one goal is to get to the temple and claim the treasure. As you may know there is a terrible storm that we could not pass to get home, these lands hold the key. The temple is OUR key, so grab a weapon, grab a friend, and get ready because this will be our greatest adventure yet! Protect yourselves and your crew. Your captains will be assigned accordingly, follow them and stay safe. HUZZAH' She shouts everyone repeating the motto. People disperse to grab a weapon.",
        options: [
            {text: "A Shield", next: "partner", inventoryGain: "Sheild"},
            {text: "A Sword", next: "partner", inventoryGain: "Sword"},
            {text: "A Spear", next: "partner", inventoryGain: "Spear"}

        ]
    },
    
    partner: {
        text: "You look around ready to choose a partner who will you choose?",
        options: [  
            { text: "The tired crew member", next: "tiredCrewChosen" },
            { text: "The excited crew member", next: "excitedCrewChosen" },
            { text: "The lonely crew member", next: "lonelyCrewChosen" }
        ]

    },

    tiredCrewChosen: {
        text: "You look over at the tired crew member he gives you a look of confusion as you ask him to be your partner, 'okay...?' he says cautiously.",
        options:[
            {text: "Time to venture into the jungle", next: "adventure", inventoryGain: "_tiredCrewMember"}
        ]
    },


    excitedCrewChosen: {
        text: "You head over to the excited crew member asking him to be your partner, 'HAHA silly we were already partners!",
        options:[
            {text: "Time to venture into the jungle", next: "adventure", inventoryGain: "_excitedCrewMember"}
        ]
    },

    lonelyCrewChosen: {
        text: "You glance over at the lonely crew member he looks up from his instrument and nods before going back to playing a silent realization that you two are partners",
        options:[
            {text: "Time to venture into the jungle", next: "adventure", inventoryGain: "_lonelyCrewMember"}
        ]
    },

    adventure: {
        text: "You and your partner make your way over to the jungle island. The captain pats your shoulder, 'Which way are you and your partner going?' She asks. You look and the paths.",
        options:[
            {text: "middle", next: "excitedPath", condition: "_excitedCrewMember"},
            {text: "right", next: "tiredPath", condition: "_tiredCrewMember"},
            {text: "left", next: "lonelyPath", condition: "_lonelyCrewMember"}
        ]
    },

    lonelyPath: {
        text: "You point at the left path, 'We'll go that way,' you say. The lonely crew member nods quietly, his banjo slung over his shoulder. 'Mama used to play tunes like these...' he mutters softly. You both walk deeper into the woods, where shadows grow longer and the air feels heavier. Soon, you notice the ground is covered in soft moss, but it’s oddly quiet—too quiet. A faint rustling sounds nearby, but you can’t see anything.",
        options: [
            { text: "Call out softly to see if anything responds", next: "quietRustle" },
            { text: "Press forward cautiously without a sound", next: "mossPath" }
        ]
    },

    quietRustle: {
        text: "You whisper into the silence, and suddenly a small group of glowing fireflies emerge, dancing through the air. The lonely crew member smiles faintly, plucking a gentle chord on his banjo that seems to calm the forest itself. You both relax a bit and continue on, following the trail as it winds through tall ancient trees.",
        options: [
            { text: "Follow the fireflies", next: "templeEntrance" },
            { text: "Ignore them and keep going on the path", next: "mossPath" }
        ]
    },

    mossPath: {
        text: "You move forward quietly, stepping carefully on the soft moss that cushions your steps. Suddenly, the ground shifts beneath your feet, revealing a hidden pit covered by leaves and branches. You quickly grab the lonely crew member's arm to stop him from stepping in. He nods, breathless. 'Almost lost my footing there... Mama always warned me about hidden traps,' he says. You carefully navigate around it and soon see something glimmering between the trees ahead.",
        options: [
            { text: "Investigate the glimmer", next: "templeEntrance" },
            { text: "Avoid the glimmer and keep walking", next: "templeEntrance" }
        ]
    },

    templeEntrance: {
        text: "The path opens to a moss-covered stone wall with a narrow crevice. Vines hang low, and you spot faint carvings of music notes and banjo strings etched into the stone. The lonely crew member looks at the carvings and softly plays a note on his banjo. To your surprise, the stone wall rumbles and slowly slides aside, revealing a hidden passage leading into the temple.",
        options: [
            { text: "Enter the temple passage", next: "templeInside" }
        ]
    },

    templeInside: {
        text: "Inside the temple, the air is cool and thick with ancient dust. Faint light filters through cracks above, illuminating a pedestal in the center holding a glowing pendant. The lonely crew member looks around nervously, 'This must be what we came for.' As you reach for the pendant, you realize you could betray him and take everything for yourself, or share this discovery.",
        options: [
            { text: "Betray Him", next: "battle3" },
            { text: "Tell him about the pendant", next: "endingTwo" }
        ]
    },
    investigateGlimmerBadEnding: {
        text: "You step closer to the glimmer, curiosity pulling you forward. As you brush aside some leaves, the ground suddenly gives way beneath your feet! You fall into a dark pit lined with sharp rocks. The lonely crew member’s desperate shouts echo above you, but there’s no way out. As darkness closes in, you regret not heeding your caution.",
        options: [
            { text: "Start Over?", next: "intro" }
        ]
    },



    tiredPath: {
        text: "You point at the right path, 'We'll take that path' you say. The tired crew member grabs more food and stashes it in his pocket, 'sure' he says before catching up with you. You both walk through the fog sticking close by each other. It had been silent the whole walk until the tired crew member points at a plant, 'look doesn't that plant look interesting?' You look and see a purple plant almost like a flower sitting in a green bush.",
        options:[
            {text: "Pull him back, away from the flower", next: "templeFind"},
            {text: "Get a closer look at the flower", next: "flower"}
        ]
    },

    templeFind:{
        text:"You shake your head 'We need to keep going.' You assure. The tired crew mate sighs a bit before continuing walking by your side. After another 30 minutes that felt like an hour you come to see a mossy wall. You look up and notice an open window, 'We need to get up there' you turn around to see the tired crew mate with a hook attached to a rope. He throws it and pulls on it. 'You can go first' he nods. You look a bit shocked before you climb in through the window. After you hop down the tired crew mate came not too long after. You look around and the riches and quickly notice a pendant in the middle. You pick it up and as the tired crew member detaches the hook you realize that you can get the jump on him and take everything for youself.",
        options:[
            {text: "Betray Him", next: "battle2"},
            {text: "Tell him about the pendant", next: "endingTwo"},
        ]
    },

    flower: {
        text: "You and the tired crew mate bend down to inspect the flower. The tired crew mate carefully touches the flower. It spews a nice fragrance in your faces. The tired crew mate looks confused, 'Hm...I wonder what that was.' He beings to yawn, 'I'm so sleepy...' You nod as a wave of sleepiness comes over you. The tired crew mate lays down on the grass and begins snoring. There is no harm in going to sleep you think laying your head down as well. You don't wake back up.",
        options:[
            {text:"Start Over?", next: "intro"}
        ]
    },

    excitedPath:{
        text: "You point towards the middle path, 'We will be taking that one.' you say. The excited crew member nods in agreement, 'Great choice! We will pave the way for our friends!' The Captain nods, 'Sounds good! You two stay safe...remember protect yourself and your partner' You both nod and proceed into the jungle. You both rush into the forest the excited crew member is running through the forest with no care in the world. Fog begins to draw in closer.",
        options: [
            {text: "Tell the excited crew member to slow down", next: "slowDown"},
            {text: "Run faster to catch up the the excited crew member", next: "runFaster"}
        ]
    },

    runFaster:{
        text: "The fog cuts you off before you can catch up. The fog clouds your vision and fills your lung. You don't make it",
        options: [
            {text: "Start Over?", next: "intro"}
        ]
    },

    slowDown:{
     text: "You yell at your partner to slow down as you hurridly catch up. The fog completely encases you both but at least you are together. He looks over at you, 'Gosh..I'm glad I stopped I would've lost you, thank you!' You nod and notice him striking rocks before a flame starts to emit from a branch it seems he picked up. You grab onto his belt as he guides you with his makeshift torch. You both notice a fork in the road. On the right you notice a weird looking man, he looks old almost like a wanderer and on the left is a dog.",
        options:[
            {text: "Go to the right", next: "wizard"},
            {text: "Go to the left", next: "dog"}
        ]
    },

    dog: {
        text: "You and the excited crewmate follow the dog, it leads you down a path, after a while the fire goes out. Growling emerges from the shadows...You become dogfood",
        options:[
            {text: "Start Over?", next: "intro" },
        ]
    },

    wizard: {
        text:"You cautiously approach the old man. As you approach he begins to talk, 'What is always coming, but never arrives?' he starts. The excited crew member whispers, 'the Captain used to say this, she says its sleep' You analyze the question, should you just take your crewmates word for it?",
        options:[
            {text: "sleep", next: "wizardDeath"},
            {text: "tomorrow", next: "correctAnswer1"}
        ]
    },

    correctAnswer1: {
        text: "The wizards walks more before stopping in his tracks again. You and the excited crew member stop in your tracks once again. 'What comes down but never goes up?' he starts. The excited crew member whispers, 'Oh Oh I know! Its rain!' You analyze the question, should you just take your crewmates word for it?",
        options:[
            {text: "Rain", next: "correctAnswer2"},
            {text: "Gravity", next: "wizardDeath"}
        ]
    },

    correctAnswer2: {
        text: "The wizards walks more before stopping in his tracks again. You and the excited crew member stop in your tracks once again. 'The more you take, the more you leave behind, what am I?' he starts. The excited crew member whispers, 'I can't help you with this one...not even I know' You analyze the question, should you just take your crewmates word for it?",
        options:[
            {text: "Footsteps", next: "correctAnswer3"},
            {text: "Glitter", next: "wizardDeath"}
        ]
    },

    correctAnswer3: {
        text: "The wizard smiles and turns around. He begins walking. You look at the excited crew mate, 'Huh...I guess it is footsteps' he laughs a little before dragging you to follow him. You follow the wizard until the fog starts to cave in covering the wizards path. You both press on, the torch lighting the way. As the fog disapates you notice the temple. You let go of the excited crew member as you both stare in awe at the temple. 'This is...the temple.' He says shocked. You push on the door not strong enough to open it. The excited crew member helps you out by ramming into the door which makes it fly open. Gold fills your vision and you begin and the excited crew member stare. He quickly begins looking around, 'WHOA this is enough to buy the whole country back at home!' he exclaims. You make your way to the center, it has a pendant, 'is this...the way back home?' You turn around, the excited crew member basically bouncing off the walls in excitement. You could keep all the treasure for yourself, nobody has to know...only if you take care of him...",
        options:[
            {text: "Betray Him", next: "battle"},
            {text: "Tell him about the pendant", next: "endingTwo"},
        ]
    },

    endingTwo: {
        text: "You show the pendant to your partner. 'Huh this is our way out?' You nod, 'How are we supposed to get it to the rest of the crew?' You ask. Suddenly the doors fly open. The rest of the crew crashes in. The Captain points, 'IT WAS SO SCARY OUT THERE!' She yells. She notices the temple and the pendant in your hand, 'is that...oh goodness please say it is.' You nod, 'Its the way home' The crew stands up wiping their pants. 'Home...EVERYONE ITS TIME TO GO HOME!' The captain yells. She rushes over and raises it high, 'Me and everyone in here would like to go home! With all the riches in the temple!' The light glows and encapses the crew you hear everyone cheering and celebrating before the light encases your vision.",
        options:[
            {text: "Start Over?", next: "intro"},
        ]
    },

    battle: {
        text:"You look over at him and unsheath your weapon. The excited crew member looks over at you, 'Hey there mate...what are you doing?' You begin to approach him...",
        options:[
            {text: "Charge at him with your sheild", next: "lose", condition: "Sheild"},
            {text: "lunge at him with your sword", next: "win", condition: "Sword"},
            {text: "Create distance with your Spear", next: "win", condition: "Spear"}
        ]
    },

    battle2: {
        text:"You look over at him and unsheath your weapon. The tired crew mate looks over at you, 'Hey there mate...what are you doing?' You begin to approach him...",
        options:[
            {text: "Charge at him with your sheild", next: "win", condition: "Sheild"},
            {text: "lunge at him with your sword", next: "lose", condition: "Sword"},
            {text: "Create distance with your Spear", next: "win", condition: "Spear"}
        ]
    },

    battle3: {
        text:"You look over at him and unsheath your weapon. The lonely crew member looks over at you, 'Hey there mate...what are you doing?' You begin to approach him...",
        options:[
            {text: "Charge at him with your sheild", next: "win", condition: "Sheild"},
            {text: "lunge at him with your sword", next: "lose", condition: "Sword"},
            {text: "Create distance with your Spear", next: "lose", condition: "Spear"}
        ]
    },
    
    win: {
        text: "You and your partner begin the fight. You end up gaining the advantage and charge at him. You shove him into the pile of riches that is now yours. Your partner looks at you fearful. You raise your weapon, no remorse, no regret. You pull the body aside and look into the pendant, 'Would you like to go home?' The pendant asks. You look at the body and the back at the riches, 'Yes me and everything in here would like to go home.'",
        options:[
            {text: "Start Over?", next: "intro"},
        ]
    },

    lose: {
        text: "You and your partner begin the fight. You struggle, losing footing, before falling in the riches. Your partner raises their weapon with a look of despair. You close your eyes, you made the bed and now you must lie in it. A regretful whisper, 'I'm sorry...' ",       
        options:[
            {text: "Start Over?", next: "intro"},
        ]
    },

    wizardDeath: {
        text:"The wizard shakes his head, 'not even close' he whispers. You see him disappear and the fog starts to close in, you cannot move and for the first time the usual smile on the excited crew member's face disappears and nothing but pure fear emerges. The fog clouds your vision...you lose. ",
        options:[
            {text: "Start Over", next: "intro"},
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
        inventoryGain: "Ancient Temple Location"
    },

    endingOne: {
        text: "You attempt to push the doors to the temple open however you are not strong enough, you must come back with someone in order to open it.",
        options: [
            { text: "Run back to the raft", next: "intro" }
        ],
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

    sceneDiv.textContent = typeof scene.text === "function" ? scene.text() : scene.text;
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
        if (inventory[item] && !item.startsWith("_")) {
            const itemDiv = document.createElement("div");
            itemDiv.textContent = item;
            inventoryDiv.appendChild(itemDiv);
        }
    }
}

function showHomeScreen() {
     document.body.innerHTML = `
        <div id="homeScreen" class="home-screen">
            <h1 class="title" style="color: white; font-size: 3em; text-shadow: 2px 2px 8px rgba(0,0,0,0.5);">Lost at Sea</h1>
            <button id="newGameBtn" class="menu-btn">New Game</button>
            <button id="loadGameBtn" class="menu-btn">Load Game</button>
            <button id="clearSaveBtn" class="menu-btn">Clear Save</button>
        </div>
        <div id="game-container" style="display: none;">
            <div id="text"></div>
            <div id="scene" class="scene-box"></div>
            <div id="options" class="button-box"></div>
            <div id="inventory" class="inventory-box"></div>
            <div id="rhythmGame" style="display: none;">
                <div id="gameArea"></div>
                <p id="rhythmResult"></p>
                <button id="continueButton" style="display:none;">Continue</button>
                <audio id="bgMusic" src="bango.mp3" preload="auto"></audio>
            </div>
        </div>
    `;
   document.getElementById("homeScreen").style.display = "flex";
   document.getElementById("game-container").style.display = "none";

    document.getElementById("newGameBtn").onclick = startNewGame;
    document.getElementById("loadGameBtn").onclick = loadGame;
    document.getElementById("clearSaveBtn").onclick = clearSave;
}


function startNewGame() {
    document.getElementById("game-container").style.display = "flex";
    document.getElementById("homeScreen").style.display = "none";
    fadeToScene("intro");
}


function fadeToScene(sceneId) {
    const scene = document.getElementById("scene");
    if (!scene) {
        showScene(sceneId);
        return;
    }

    scene.classList.remove("fade-in");
    scene.classList.add("fade-out");

    setTimeout(() => {
        showScene(sceneId);
        scene.classList.remove("fade-out");
        scene.classList.add("fade-in");
    }, 500);
}


function getSaveData() {
    return {
        currentScene,
        inventory: {...inventory},
        state: {
            completedScenes: {...state.completedScenes},
            choices: {...state.choices}
        }
    };
}

function loadSaveData(data) {
    currentScene = data.currentScene;
    inventory = {...data.inventory};
    state.completedScenes = {...data.state.completedScenes};
    state.choices = {...data.state.choices};
    updateInventory();
    fadeToScene(currentScene);
}

function loadGame() {
    const saveData = localStorage.getItem("lostAtSeaSave");
    if (saveData) {
        const parsedData = JSON.parse(saveData);
        loadSaveData(parsedData);
        document.getElementById("homeScreen").style.display = "none";
        document.getElementById("game-container").style.display = "block";
    } else {
        alert("No saved game found");
    }
}

function clearSave() {
    localStorage.removeItem("lostAtSeaSave");
    alert("Save data cleared.");
}


function startNewGame() {
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    fadeToScene("intro");

     const saveBtn = document.getElementById("saveExitBtn");
    if (saveBtn) {
        saveBtn.onclick = () => {
            localStorage.setItem("lostAtSeaSave", JSON.stringify(getSaveData()));
            showPopup("✔ Game saved!");
            showHomeScreen();
        };
    }
}

function showPopup(message) {
    const popup = document.getElementById("popup");
    if (!popup) return;

    popup.textContent = message;
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);
}


function fadeToScene(sceneId) {
    const scene = document.getElementById("scene");
    if (!scene) {
        showScene(sceneId);
        return;
    }

    scene.classList.remove("fade-in");
    scene.classList.add("fade-out");

    setTimeout(() => {
        showScene(sceneId);
        scene.classList.remove("fade-out");
        scene.classList.add("fade-in");
    }, 500); 
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("saveExitBtn");
    if (btn) {
        btn.onclick = () => {
            localStorage.setItem("lostAtSeaSave", JSON.stringify(getSaveData()));
            showHomeScreen();
        };
    }
});


function startRhythmGame(){
    const gameDiv = document.getElementById("rhythmGame");
   const gameArea = document.getElementById("gameArea");
   const resultText = document.getElementById("rhythmResult");
   const music = document.getElementById("bgMusic");
   const continueButton = document.getElementById("continueButton")

   gameDiv.style.display = "block"
   resultText.textContent = "";
   continueButton.style.display = "none";
   music.currentTime = 0;
   music.play();

   const keys = ["a", "s", "d"];
   const beatTimes = [0.28, 0.6, 0.98, 1.32, 1.7, 2.04, 2.39, 2.74, 3.09, 
    3.41, 3.78, 4.16, 4.5, 4.85, 5.2, 5.55, 5.92, 6.27, 6.62, 6.99, 
    7.34, 7.69, 8.03, 8.38, 8.73, 9.08, 9.43, 9.8, 10.15, 10.5, 
    10.87, 11.22, 11.56, 11.91, 12.28, 12.63, 12.98, 13.33, 
    13.68, 14.05, 14.4, 14.74, 15.09, 15.46, 15.81, 16.16, 
    16.51, 16.86, 17.21, 17.55, 17.93, 18.27, 18.62, 18.97, 
    19.34, 19.69, 20.04, 20.39, 20.74, 21.11, 21.46, 21.8, 
    22.15, 22.5, 22.85, 23.2, 23.57, 23.92, 24.29, 24.64, 
    24.98, 25.33, 25.68, 26.03, 26.38, 26.75, 27.1, 27.45,
    27.79, 28.14, 28.49, 28.84, 29.21, 29.56, 29.93, 30.28, 
    30.63, 30.98, 31.32, 31.67, 32.04, 32.39, 32.74, 33.09, 
    33.44, 33.81, 34.16, 34.5, 34.85, 35.22, 35.57, 35.92, 
    36.27, 36.64, 36.99, 37.34, 37.69, 38.03, 38.38, 38.75,
    39.1, 39.45, 39.8, 40.15, 40.5, 40.87, 41.22, 41.56, 41.91,
    42.28, 42.63, 42.98, 43.33, 43.68, 44.03, 44.37, 44.74, 45.09, 
    45.44, 45.79, 46.16, 46.51, 46.86, 47.21, 47.55, 47.93, 48.27, 
    48.62, 48.97, 49.34, 49.69, 50.04, 50.39, 50.74, 51.08, 51.43, 
    51.8, 52.15, 52.5, 52.85, 53.2, 53.57, 53.92, 54.27, 54.61, 54.98,
    55.33, 55.68, 56.03, 56.4, 56.75, 57.1, 57.45, 57.82, 58.17, 58.51, 
    58.86, 59.21, 59.56, 59.93, 60.28, 60.63, 60.98, 61.32, 61.67, 62.04,
    62.39, 62.74, 63.09, 63.46, 63.81, 64.16, 64.51, 64.85, 65.2, 65.57, 
    65.92, 66.27, 66.62, 66.97, 67.34, 67.69, 68.03, 68.38, 68.75, 69.1, 
    69.45, 69.8, 70.15, 70.5, 70.87, 71.22, 71.56, 71.91, 72.26, 72.61, 72.98, 
    73.33, 73.68, 74.03, 74.4, 74.75, 75.09, 75.44, 75.79, 76.16, 76.51, 76.86, 
    77.21, 77.55, 77.93, 78.27, 78.62, 78.97, 79.32, 79.69, 80.04, 80.39, 80.74, 
    81.08, 81.46, 81.8, 82.15, 82.5, 82.85, 83.22, 83.57, 83.92, 84.27, 84.61, 
    84.99, 85.33, 85.68, 86.03, 86.38, 86.75, 87.1, 87.45, 87.79, 88.14, 88.49, 
    88.86, 89.21, 89.56, 89.93, 90.28, 90.63, 90.98, 91.32, 91.7, 92.04, 92.39, 
    92.74, 93.09, 93.44, 93.79, 94.16, 94.51, 94.85, 95.2, 95.55, 95.92, 96.27, 
    96.62, 96.97, 97.34, 97.69, 98.03, 98.38, 98.75, 99.1, 99.45, 99.8, 100.15, 
    100.5, 100.87, 101.22, 101.56, 101.91, 102.26, 102.63, 102.98, 103.33, 103.68, 
    104.03, 104.4, 104.75, 105.09, 105.44, 105.81, 106.16, 106.51, 106.86, 107.21, 
    107.55, 107.93, 108.27, 108.62, 108.97, 109.32, 109.67, 110.04, 110.39, 110.74, 
    111.08, 111.46, 111.8, 112.15, 112.5, 112.85, 113.2, 113.55, 113.89, 114.24, 114.59, 
    114.94, 115.31, 115.66, 116.01, 116.36, 116.73, 117.05, 117.4, 117.75, 118.1, 118.44, 
    118.79, 119.21, 119.56, 119.91, 120.26, 120.63, 120.98, 121.32, 121.67, 122.02, 122.37, 
    122.72, 123.07, 123.41, 123.76, 124.13, 124.51, 124.85, 125.2, 125.55, 125.92, 126.27, 
    126.62, 126.97, 127.34, 127.69, 128.03, 128.38, 128.73, 129.08, 129.45, 129.8, 130.15, 
    130.5, 130.87, 131.22, 131.56, 131.91, 132.28, 132.63, 132.98, 133.33, 133.68, 134.03, 
    134.37, 134.72, 135.09, 135.44, 135.79, 136.16, 136.51, 136.86, 137.21, 137.56, 137.9, 
    138.27, 138.62, 138.97, 139.32, 139.69, 140.04, 140.39, 140.74, 141.08, 141.43, 141.8, 
    142.15, 142.5, 142.85, 143.22, 143.57, 143.92, 144.27, 144.61, 144.96, 145.33, 145.68, 
    146.03, 146.38, 146.73, 147.1, 147.45, 147.8, 148.17, 148.51, 148.86, 149.21, 149.56, 
    149.91, 150.26, 150.63, 150.98, 151.32, 151.67, 152.02, 152.39, 152.74, 153.09, 153.44, 
    153.81, 154.16, 154.51, 154.85, 155.2, 155.57, 155.92, 156.27, 156.62, 156.97, 157.32, 
    157.69, 158.04, 158.38, 158.73, 159.1, 159.45, 159.8, 160.15, 160.5, 160.84, 161.22, 161.56, 
    161.91, 162.26, 162.61, 162.96, 163.33, 163.68, 164.03, 164.37];
   const timingWindows = [];

   let hitCount = 0;


   function spawnNote(key){
    const note = document.createElement("div");
    note.className = "note";
    note.style.left = keys.indexOf(key) * 100 + "px";
   gameArea.appendChild(note);
  
   const spawnTime = Date.now()
   timingWindows.push({key, time: spawnTime +  2800});
   setTimeout(() => {
    gameArea.removeChild(note);
    }, 3000);
   }

  beatTimes.forEach((t) => {
    const randKey = keys[Math.floor(Math.random() * keys.length)];
    setTimeout(()=> spawnNote(randKey), t * 1000);
  });
   
   function keyHandler(e){
    const now = Date.now();
    const matchIndex = timingWindows.findIndex(win => 
        win.key === e.key && Math.abs(win.time - now) <= 300
    );

    if (matchIndex !== -1) {
        hitCount++;

       const noteEl = [...gameArea.children].find(n =>
        parseInt(n.style.left) === keys.indexOf(e.key) * 100
    );
    if (noteEl) {
        noteEl.classList.add("hit");
        setTimeout(() => {
            if (noteEl.parentNode) noteEl.remove();
        }, 300); 
    }

        timingWindows.splice(matchIndex, 1);
        resultText.textContent = `Nice! Hits: ${hitCount}`;
        resultText.classList.remove = ("pulse");
        void resultText.offsetWidth;
        resultText.classList.add("pulse")
        
    } else {
        resultText.textContent = 'Miss!';
    }

    if (hitCount >= 10) {
        continueButton.style.display = "inline-block"
    }
   }

   function endGame(){
    document.removeEventListener("keydown", keyHandler);
    resultText.textContent = "Game Over!";
    music.pause();
    music.currentTime = 0;
    gameDiv.style.display = "none";
    showScene("postRhythmScene");
   }

   continueButton.onclick = endGame;
   document.addEventListener("keydown", keyHandler)

}

showScene("intro");
