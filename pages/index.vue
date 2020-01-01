<template>
  <form @submit="createCharacter">
  <div class="h-screen flex bg-white sm:bg-transparent">
    <div class="m-auto">
    <div class="sm:bg-white w-full rounded-none md:w-2/3 p-4 md:rounded mx-auto" id="characterCreationTop">
      <h1 class="text-center text-xl mb-2">Character Generation</h1>
      <div class="block" id="race">
        <h2 class="text-center border-b-2 border-red-700">Select Race</h2>
        <ul :key="index" v-for="(race, index) in races">
          <li><input class="form-radio m-2" name="raceSelection" type="radio" v-model="character.race">{{race}}</li>
        </ul>
      </div>
      <div class="block" id="homeland">
        <h2 class="text-center border-b-2 border-red-700">Select Homeland</h2>
        <h3>Select Region</h3>
        <ul :key="index" v-for="(land, index) in region">
          <li><input class="m-2 form-radio" name="homelandSelection" type="radio" v-bind:value="land" v-model=character.homeland>{{land}}</li>
        </ul>
        <div id="specificNorthernRegion" v-if="character.homeland === 'Northern Kingdoms'">
          <h2>Select Specific land</h2>
          <ul :key="index" v-for="(land, index) in northernLands" >
            <li class="block"><input class="m-2 form-radio" name="region" type="radio" v-model="character.homeRegion">
              <h4 class="inline">{{land.name}}  </h4>
              <h5 class="inline font-light">  {{land.bonus}}</h5>
            </li>
          </ul>
        </div>
        <div id="specificNilfgaardRegion" v-if="character.homeland === 'Nilfgaardian Vassal'">
          <h2>Select Specific land</h2>
          <ul :key="index" v-for="(land, index) in nilfgaardVassalLands" >
            <li class="block"><input class="m-2 form-radio" name="region" type="radio" v-model="character.homeRegion">
              <h4 class="inline">{{land.name}}  </h4>
              <h5 class="inline font-light">  {{land.bonus}}</h5>
            </li>
          </ul>
        </div>
        <div id="Nilfgaard" v-if="character.homeland === 'Heart of Nilfgaard'">
        <h2>Select Specific land</h2>
        <ul :key="index" v-for="(land, index) in nilfgaardLands" >
          <li class="block"><input class="m-2 form-radio" name="region" type="radio" v-model="character.homeRegion">
            <h4 class="inline">{{land.name}}  </h4>
            <h5 class="inline font-light">  {{land.bonus}}</h5>
          </li>
        </ul>
      </div>
        <div id="elderlandRegion" v-if="character.homeland === 'Elderlands'">
          <h2>Select Specific land</h2>
          <ul :key="index" v-for="(land, index) in elderlandLands" >
            <li class="block"><input class="m-2 form-radio" name="region" type="radio" v-model="character.homeRegion">
              <h4 class="inline">{{land.name}}  </h4>
              <h5 class="inline font-light">  {{land.bonus}}</h5>
            </li>
          </ul>
        </div>
      </div>
      <div class="block text-center mb-2" id="family and parents roll">
        <h2>Family or Parental Fate Selection</h2>
        <label for="familyFateSelection">Did something Happen to your Family, or individual Parents?</label>
        <select id="familyFateSelection"  class="border-b-2 border-red-700 p-2" v-model="character.fate">
          <option disabled>Select Family Fate</option>
          <option>Family</option>
          <option>Individual Parents</option>
        </select>
      </div>
      <div class="block" id="familialFate" v-if="character.fate === 'Family'">
        <h2>Familial Fate</h2>
        <ul :key="index" v-for="(fate, index) in nilfgaardianFamilyFate" v-if="character.homeland === 'Heart of Nilfgaard' || character.homeland === 'Nilfgaardian Vassal'">
          <li><input class="m-2 form-radio" name="familial fate" type="radio" v-model="character.familyFate">{{fate}}</li>
        </ul>
        <ul :key="index" v-for="(fate, index) in northernFamilyFate" v-if="character.homeland === 'Northern Kingdoms'">
          <li><input class="m-2 form-radio" name="familial fate" type="radio" v-model="character.familyFate">{{fate}}</li>
        </ul>
        <ul :key="index" v-for="(fate, index) in elderlandFamilyFate" v-if="character.homeland === 'Elderlands'">
          <li><input class="m-2 form-radio" name="familial fate" type="radio" v-model="character.familyFate">{{fate}}</li>
        </ul>
      </div>
      <div class="block" id="parentalFate" v-if="character.fate === 'Individual Parents'">
        <h2>Parental Fate</h2>
        <ul :key="index" id="northernParentalFate" v-for="(fate, index) in northernParentalFate" v-if="character.homeland === 'Northern Kingdoms'">
          <li><input class="m-2 form-radio" name="parentalFate"  type="radio" v-model="character.parentalStatus">{{fate.text}}</li>
        </ul>
        <ul :key="index" id="nilfgarrdianParentalFate" v-for="(fate, index) in nilfgaardianParentalFate" v-if="character.homeland === 'Heart of Nilfgaard' || character.homeland === 'Nilfgaardian Vassal'">
          <li><input class="m-2 form-radio" name="parentalFate" type="radio" v-model="character.parentalStatus">{{fate.text}}</li>
        </ul>
        <ul :key="index" id="elderlandParentalFate" v-for="(fate, index) in elderlandParentalFate" v-if="character.homeland === 'Dol Blathanna' || character.homeland === 'Mahakam'">
          <li><input class="m-2 form-radio" name="parentalFate" type="radio" v-model="character.parentalStatus">{{fate.text}}</li>
        </ul>
      </div>
      <div class="block text-center" id="name">
        <label for="characterName">Character Name Entry</label>
        <input class="text-center border-b-2 border-red-700 px-4 py-2" id="characterName" placeholder="Enter Name Here" type="text" v-model="character.name">
        <button type="button" v-on:click="generateName">Generate Name</button>
      </div>
      <div class="block" id="characterGender">
        <ul :key="index" v-for="(benis, index) in genders">
          <li><input class="m-2 form-radio" name="gender" type="radio" v-model="character.gender">{{benis}}</li>
        </ul>
      </div>
    </div>
    </div>
  </div>
  </form>
</template>

<script>

    export default {
        components: {
        },
        data : function () {
            return{
                //top level character object, this is eventually what will get exported to an object in firebase
                character :{
                    //basic player information
                    name: '',
                    gender: '',
                    race: '',
                    homeland: '',
                    homeRegion: '',

                    //Essentially a boolean for the family or individual parents toggle
                    fate: '',
                    //only used if something happened to your family
                    familyFate : '',
                    //only used if something happened to one or more of your parents
                    parentalStatus: '',
                    //The individual skills of a player
                    skills: [
                    ],
                    //holds stuff like health and other ailments
                    stats: [

                    ],
                    //holds all the player gear
                    gear : [

                    ]
                },
                //the 4 races that are available
                races: ['Witcher', 'Elf', 'Human', 'Dwarf'],
                //The DM will make the determination if genders are to be restricted for some reason
                //Historically, Witchers are only males
                genders: ['Male', 'Female'],
                //this is the top level lands that the player can roll or select for
                region: ['Northern Kingdoms', 'Heart of Nilfgaard', 'Nilfgaardian Vassal', 'Elderlands'],
                //individual regions have states within them the player can start in
                northernLands: [
                    {name: 'Redania', bonus: '+1 Education' },
                    {name: 'Kaedwen', bonus: '+1 Endurance'},
                    {name: 'Temeria', bonus: '+1 Charisma'},
                    {name: 'Aedirn', bonus: '+1 Crafting'},
                    {name:'Lyria & Rivia', bonus: '+1 Resist Coercion'},
                    {name: 'Kovir & Poviss', bonus: '+1 Business'},
                    {name: 'Skellige', bonus: '+1 Courage'},
                    {name: 'Cidaris', bonus : '+1 Sailing'},
                    {name: 'Verden', bonus : '+1 Wilderness survival'},
                    {name: 'Cintra', bonus: '+1 Human Perception'}
                ],
                nilfgaardVassalLands: [
                    {name: 'Vicovaro', bonus: '+1 Education'},
                    {name: 'Angren', bonus: '+1 Wilderness Survival'},
                    {name: 'Nazair', bonus: '+1 Brawling'},
                    {name: 'Mettina', bonus: '+1 Ride'},
                    {name: 'Mag Turga', bonus: '+1 Endurance'},
                    {name: 'Gheso', bonus: '+1 Stealth'},
                    {name: 'Ebbing', bonus: '+1 Deduction'},
                    {name: 'Maecht', bonus: '+1 Charisma'},
                    {name: 'Gemmeria', bonus: '+1 Intimidation'},
                    {name: 'Etolia', bonus: '+1 Courage'},
                ],
                nilfgaardLands:[
                    {name: 'Heart of Nilfgaard', bonus: '+1 Deceit'}
                ],
                elderlandLands: [
                    {name: 'Dol Blathanna', bonus: '+1 Social Etiquette'},
                    {name: 'Mahakam', bonus: '+1 Crafting'}
                ],


                //Entire Family Statuses
                northernFamilyFate: [
                    'Your family was scattered to the\n' +
                    'winds by the wars and you have\n' +
                    'no idea where most of them\n' +
                    'are.' ,
                    'Your family was imprisoned\n' +
                    'for crimes or on trumped-up\n' +
                    'charges. You were the only one\n' +
                    'to escape. You may want to free\n' +
                    'them...or maybe not',
                    'Your family house was cursed\n' +
                    'and now either crops won’t\n' +
                    'grow or specters roam the halls.\n' +
                    'It became too dangerous for\n' +
                    'you to stay in this home',
                    'With so many wars your family’s livelihood was destroyed.\n' +
                    'Your family turned to crime to\n' +
                    'survive. ',
                    'Your family accumulated a\n' +
                    'huge debt through gambling or\n' +
                    'favors from others. You need\n' +
                    'money desperately.',
                    'Your family has fallen into a\n' +
                    'feud with another family. You\n' +
                    'may not even remember why\n' +
                    'this feud started in the first\n' +
                    'place',
                    'Due to some action or inaction\n' +
                    'your family has become hated\n' +
                    'in your home town and now\n' +
                    'no one there wants to have anything to do with them',
                    'One day everything you had\n' +
                    'was ripped away by a bandit\n' +
                    'mob. Your family was massacred, leaving you entirely alone.',
                    'Your family has a deep, dark\n' +
                    'secret that if discovered would\n' +
                    'ruin you all completely. You\n' +
                    'can decide what this secret is,\n' +
                    'or the Game Master can decide',
                    'Your family has come to despise\n' +
                    'each other. No one you grew up\n' +
                    'with will talk with each other\n' +
                    'any more and you’re lucky to\n' +
                    'get a passing hello from your\n' +
                    'siblings.',
                ],
                nilfgaardianFamilyFate : [
                    'Your family was indentured for\n' +
                    'crimes against the Empire or\n' +
                    'on trumped-up charges. Only\n' +
                    'you escaped.',
                    'Your family was exiled to the\n' +
                    'Korath Desert and you likely\n' +
                    'spent most of your early life\n' +
                    'struggling to survive in the\n' +
                    'deadly wasteland.',
                    'Your family was killed by a\n' +
                    'rogue mage who either had a\n' +
                    'vendetta against your family, or\n' +
                    'just wanted blood. Either way,\n' +
                    'you are alone.',
                    'Your family disappeared and\n' +
                    'you have no idea where they\n' +
                    'went. One day they just up and\n' +
                    'left.',
                    'Your family was executed for\n' +
                    'treason against the Empire. You\n' +
                    'were the only one to escape this\n' +
                    'fate',
                    'Your family was stripped of\n' +
                    'its title for some reason. You\n' +
                    'were evicted from your home\n' +
                    'and left scrambling to survive\n' +
                    'among the un-washed masses.',
                    'Your family name was\n' +
                    'tarnished by a magic relative\n' +
                    'who flaunted their magical gift\n' +
                    'disgracefully like a Northern\n' +
                    'mage.',
                    'You disgraced your family in\n' +
                    'the eyes of the Empire. Something you did or failed to do has\n' +
                    'ruined your personal name and\n' +
                    'harmed your family.',
                    'Your family has a deep, dark\n' +
                    'secret that if discovered would\n' +
                    'destroy them and their name\n' +
                    'forever. You must protect this\n' +
                    'secret with your life.',
                    'Your family was assassinated.\n' +
                    'They may have been in the way\n' +
                    'of someone’s plan or they may\n' +
                    'have been used to get at someone more powerful. Either way,\n' +
                    'your family is gone now',
                ],
                elderlandFamilyFate : [
                    'Your family were marked as\n' +
                    'human sympathizers and are\n' +
                    'not particularly loved in their\n' +
                    'homeland.',
                    'Your family was ostracized\n' +
                    'for dissenting opinions and\n' +
                    'now people won’t socialize with\n' +
                    'you or your family at all.',
                    'Your family died in the\n' +
                    'Northern Wars. They may have\n' +
                    'actually fought in the war, or\n' +
                    'were casualties of war who just\n' +
                    'happened to get in the way.',
                    'Your family has been caught in\n' +
                    'a feud for centuries. You may\n' +
                    'not remember why this feud\n' +
                    'started, but it is dire',
                    'Your family was stripped of its\n' +
                    'title for some reason. You were\n' +
                    'evicted from your home and\n' +
                    'left scrambling to survive.',
                    'Your family turned to raiding\n' +
                    'human settlements early in\n' +
                    'your life to get food and perhaps strike back at the humans.',
                    'Your family house is haunted.\n' +
                    'Most likely this is because your\n' +
                    'home was the site of many,\n' +
                    'many deaths during the war\n' +
                    'against humans.',
                    'Your family has been split by a\n' +
                    'human in-law who was brought\n' +
                    'into your family by a sibling or\n' +
                    'relative. Some of your family\n' +
                    'like them and some hate them.',
                    'Your family was killed by humans who thought they were\n' +
                    'Scoia’tael. They may have been\n' +
                    'slaughtered or hung with no\n' +
                    'court proceedings or trials.',
                    'Your family is descended from\n' +
                    'an infamous traitor. It taints\n' +
                    'your family’s interactions with\n' +
                    'others of the elder races and\n' +
                    'has made living in the elderland difficult.',
                ],

                //Individual Parental Fates
                northernParentalFate : [
                    {roll: 1, text: 'One or more of your parents\n' +
                            'were killed in the Northern\n' +
                            'Wars. Most likely your father, but\n' +
                            'it is also possible that your mother fought or was a casualty'},
                    {roll: 2, text: 'One or more of your parents\n' +
                            'lef you in the wilderness to\n' +
                            'fend for yourself. Maybe they\n' +
                            'couldn’t aﬀord to keep you;\n' +
                            'maybe you were an accident.'},
                    {roll: 3, text: 'One or more of your parents\n' +
                            'were cursed by a mage or due\n' +
                            'to the intense hatred of someone they encountered. Te\n' +
                            'curse took their life.'},
                    {roll: 4, text: 'One or more of your parents\n' +
                            'sold you for coin, or perhaps\n' +
                            'traded you for some goods or\n' +
                            'service. Your parents needed\n' +
                            'the money more than you.'},
                    {roll: 5, text: 'One or more of your parents\n' +
                            'joined a gang. You saw this\n' +
                            'gang ofen and were sometimes\n' +
                            'forced to work with them.'},
                    {roll: 6, text: 'One or more of your parents\n' +
                            'were killed by monsters. It is\n' +
                            'your decision as to what they\n' +
                            'may have fallen prey to'},
                    {roll: 7, text: 'One or more of your parents\n' +
                            'were falsely executed. Tey may\n' +
                            'have been a scapegoat for something or just in the wrong place.'},
                    {roll : 8, text: 'One or more of your parents\n' +
                            'died of a plague. There was\n' +
                            'nothing that could be done but\n' +
                            'try to ease their passing.'},
                    {roll: 9, text: 'One or more of your parents\n' +
                            'defected to Nilfgaard. Tey\n' +
                            'may have been given a deal for\n' +
                            'information or they may just\n' +
                            'have jumped the border.'},
                    {roll : 10, text: 'One or more of your parents\n' +
                            'were kidnapped by nobles.\n' +
                            'Likely it was your mother, who\n' +
                            'attracted the attention of a local\n' +
                            'lord or his son.'}
                ],
                nilfgaardianParentalFate: [
                    {roll: 1, text: 'Your father died in one of the\n' +
                            'Northern Wars. He may have already been in the military or he\n' +
                            'may have been conscripted into\n' +
                            'service during that war.'},
                    {roll: 2, text: 'One or more of your parents\n' +
                            'were poisoned. Tis may have\n' +
                            'been the work of a professional\n' +
                            'rival, or it may have been to get\n' +
                            'your parents out of the way'},
                    {roll: 3, text: 'The secret police took your\n' +
                            'parent or parents for ‘questioning.’ Te next week their bodies\n' +
                            'were found hung in the streets\n' +
                            'of the city'},
                    {roll: 4, text: 'One or more of your parents\n' +
                            'were killed by a rogue mage.\n' +
                            'Most likely they tried to turn\n' +
                            'the mage in question in to the\n' +
                            'Empire and paid the price'},
                    {roll: 5, text: 'One or more of your parents\n' +
                            'were imprisoned for unlawful\n' +
                            'magic. Maybe they actually\n' +
                            'committed the crime or maybe\n' +
                            'it was a setup'},
                    {roll: 6, text: 'One or more of your parents\n' +
                            'were exiled to the Korath Desert. Likely they committed a\n' +
                            'major crime but killing them\n' +
                            'would cause trouble.'},
                    {roll: 7, text: 'One or more of your parents\n' +
                            'were cursed by a mage. Te\n' +
                            'mage likely had a vendetta\n' +
                            'against them.'},
                    {roll: 8, text: 'Your parents simply lef you\n' +
                            'one day. You may not even\n' +
                            'know why they did it. One day\n' +
                            'your parents just disappeared.'},
                    {roll: 9, text: 'One or more of your parents\n' +
                            'were enslaved. Tey either\n' +
                            'commited a crime against the\n' +
                            'Empire or were set up by a rival.'},
                    {roll: 10, text: 'One or more of your parents\n' +
                            'were sent to the North as double agents. You likely don’t even\n' +
                            'know where they are now, but\n' +
                            'they’re serving the Emperor.'}
                ],
                elderlandParentalFate : [
                    {roll: 1, text: 'One or more of your parents were accused of being\n' +
                            'Scoia’tael. Te people around\n' +
                            'you give your parents sidelong\n' +
                            'glances.'},
                    {roll: 2, text: 'One or more of your parents\n' +
                            'turned on your own people and\n' +
                            'sold out the elder races to the\n' +
                            'humans. Your parents are unwelcome in your homeland.'},
                    {roll: 3, text: 'One or more of your parents\n' +
                            'killed themselves out of despair.\n' +
                            'With no hope of regaining the\n' +
                            'glory of the past, they gave up\n' +
                            'and ended it'},
                    {roll: 4, text: 'While traveling, one or more of\n' +
                            'your parents fell prey to human\n' +
                            'racism. Tey died in a pogrom\n' +
                            'and their bodies were displayed\n' +
                            'on pikes.'},
                    {roll: 5, text: 'One or more of your parents\n' +
                            'have become obsessed with\n' +
                            'regaining the former glory\n' +
                            'of their race. They sacrificed\n' +
                            'everything for this cause'},
                    {roll: 6, text: 'One or more of your parents\n' +
                            'were exiled from your\n' +
                            'homeland. There are many possible reasons, from crime to\n' +
                            'dissenting opinions.'},
                    {roll: 7, text: 'One or more of your parents\n' +
                            'were cursed. You can decide\n' +
                            'what this curse is or, the Game\n' +
                            'Master can decide.'},
                    {roll: 8, text: 'Your parents gave you to another family so that you could\n' +
                            'survive, because they couldn’t\n' +
                            'care for you'},
                    {roll : 9, text: 'One or more of your parents\n' +
                            'joined the Scoia’tael in an attempt to get revenge on the humans who they see as ruining\n' +
                            'their lives.'},
                    {roll: 10, text: 'One or more of your parents\n' +
                            'died in an ‘accident’. Most likely\n' +
                            'they made a powerful enemy\n' +
                            'that finally found a way to get\n' +
                            'rid of them.'}
                ],

                //Family Status, basically your social standing
                northernStatus: [
                    {state: 'Aristocracy', description: 'You grew up in a noble manor\n' +
                            'with servants to wait on you,\n' +
                            'but you were always expected\n' +
                            'to behave and impress.', startingGear : 'Paper of Nobility (+2 Reputation)',},
                    {state: 'Adopted by a Mage', description: 'You were given to a mage at a\n' +
                            'young age. You lived in comfort\n' +
                            'but barely saw your caretaker,\n' +
                            'who was always busy.', startingGear : 'A Chronicle (+1 Education)',},
                    {state: 'Knights', description: 'You grew up in a manor where\n' +
                            'you learned to be a proper lady\n' +
                            'or lord. Your fate was set from\n' +
                            'birth.', startingGear : 'Personal Heraldry (+1 Reputation)',},
                    {state: 'Merchant Family', description: 'You grew up among merchants\n' +
                            'and you were always surrounded\n' +
                            'by yelling, haggling, and\n' +
                            'money.', startingGear : '2 Acquaintances',},
                    {state: 'Artisan Family', description: 'You grew up in an artisan’s\n' +
                            'workshop. Your days were filled\n' +
                            'with the incessant sounds of\n' +
                            'creation, and often long.', startingGear : '3 Common Diagrams/Formulae',},
                    {state: 'Entertainer Family', description: 'You grew up with a band of performers.\n' +
                            'You may have traveled\n' +
                            'or you may have performed at\n' +
                            'a theater.', startingGear : '1 Instrument & 1 Friend',},
                    {state: 'Peasant Family', description: 'You grew up on a farm in the\n' +
                            'countryside. You didn’t have\n' +
                            'much to your name and your\n' +
                            'life was simple, but dangerous.', startingGear : 'A Lucky Token (+1 Luck)',},
                ],
                nilfgaardianStatus: [
                    {state: 'Aristocracy', description: 'You grew up in a manor, training\n' +
                            'to be well-versed in the\n' +
                            'world of the court. The luxury\n' +
                            'was just your incentive.', startingGear: 'Paper of Nobility (+2 Reputation)'},

                    {state: 'High Clergy', description: 'You were raised among the clergy\n' +
                            'of the Great Sun. You grew up pious\n' +
                            'and always aware that the\n' +
                            'Church would guide you.', startingGear: 'A Holy Symbol (+1 Courage)'},

                    {state: 'Knights', description: 'You grew up knowing that your\n' +
                            'duty was to the Emperor, and\n' +
                            'that all of your luxury was a\n' +
                            'reward for your eventual service.', startingGear: 'Personal Heraldry (+1 Reputation)'},
                    {state: 'Artisan Family', description: 'You grew up in an artisan’s\n' +
                            'shop, learning to craft products\n' +
                            'for sale around the world. You\n' +
                            'learned the value of quality.', startingGear: '3 Common Diagrams/Formulae'},
                    {state: 'Merchant Family', description: 'You grew up selling products\n' +
                            'all around the Empire. You saw\n' +
                            'all kinds exotic of goods from\n' +
                            'all around the world.', startingGear: '2 Acquaintances'},
                    {state: 'Born into Servitude', description: 'You were born into servitude\n' +
                            'and lived in simple quarters.\n' +
                            'You owned very little and toiled\n' +
                            'often.', startingGear: 'A trained bird or serpent'},
                    {state: 'Peasant Family', description: 'You grew up on one of the\n' +
                            'thousands of farms across the\n' +
                            'Empire. You had little to your\n' +
                            'name but life was simple.', startingGear: 'A Lucky Token (+1 Luck)'},

                ],
                elderlandStatus: [
                    {state: 'Aristocracy', description: 'You grew up in a palace and were\n' +
                            'constantly reminded of the glory\n' +
                            'of the past. You were expected to\n' +
                            'live up to the legacy.', startingGear: 'Paper of Nobility (+2 Reputation)'},
                    {state: 'Noble Warrior', description: 'You grew up as a noble warrior’s\n' +
                            'child, expected to rise to\n' +
                            'your family’s reputation and to\n' +
                            'never dishonor your heritage.', startingGear: 'Personal Heraldry (+1 Reputation)'},
                    {state: 'Merchants', description: 'You grew up among traveling\n' +
                            'merchants. Life was difficult\n' +
                            'sometimes but non-human\n' +
                            'crafts are always valuable.', startingGear: '2 Acquaintances'},
                    {state: 'Scribe Family', description: 'You grew up as the child of\n' +
                            'scribes, recording and protecting\n' +
                            'as much elderfolk history as\n' +
                            'possible.', startingGear: 'A Chronicle (+1 Education)'},
                    {state: 'Entertainers', description: 'You grew up singing songs and\n' +
                            'performing plays. You worked\n' +
                            'backstage, helped write songs,\n' +
                            'and fixed instruments.', startingGear: '1 Instrument & 1 Friend'},
                    {state: 'Artisan Family', description: 'You grew up in a family of\n' +
                            'artisans, visiting ancient palaces\n' +
                            'for inspiration and spending\n' +
                            'hours every day on projects.', startingGear: '3 Common Diagrams/Formulae'},
                    {state: 'Lowborn Family', description: 'You grew up in a lowborn family,\n' +
                            'tending to the manors of\n' +
                            'others or working small jobs\n' +
                            'around your home city.', startingGear: 'A Lucky Token (+1 Luck)'},
                ],
            }
        },
        methods: {
            generateName(){

            },
            createCharacter(){

            },
        }
    }
</script>

<style>
  button{
    @apply bg-red-700 px-4 py-2 rounded
  }
  h2{
    @apply text-center border-b-2 border-red-700 text-xl
  }
</style>
