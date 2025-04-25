/**
 * Creates a weapon object with a random name, rarity, stats, and price.
 *
 * @export
 */
export function createWeapon() {
    this.name = getRandomWeapon()
    this.rarity = getRarity()
    this.stat = getStats()
    this.price = getPrice.call(this)
}

/**
 * Creates an armor object with a random name, rarity, stats, and price.
 *
 * @export
 */
export function createArmor() {
    this.name = getRandomArmor()
    this.rarity = getRarity()
    this.stat = getStats()
    this.price = getPrice.call(this)
}



/**
 * Returns weapon name & type.
 *
 * @return {string} The random generated weapon name and type.
 */
function getRandomWeapon() { // Return weapon name & type
    const weaponNamesLength = weaponNames.length
    const randomWeaponName = Math.floor(Math.random() * weaponNamesLength)

    const weaponTypesLength = weaponTypes.length
    const randomWeaponType = Math.floor(Math.random() * weaponTypesLength)

    return weaponTypes[randomWeaponType] + " of the " + weaponNames[randomWeaponName]
}

/**
 * Returns armor name & type.
 *
 * @return {string} The random generated armor name and type.
 */
function getRandomArmor() { // Return armor name & type
    const weaponNamesLength = weaponNames.length
    const randomWeaponName = Math.floor(Math.random() * weaponNamesLength)

    const armorTypesLength = armorTypes.length
    const randomArmorType = Math.floor(Math.random() * armorTypesLength)

    return armorTypes[randomArmorType] + " of the " + weaponNames[randomWeaponName]
}

/**
 *
 *
 * @param {number} n - A probability value between 0 and 1.
 * @return {boolean} // Return true or false to get probability of argument.
 */
function probability(n) {
    return Math.random() < n;
}

/**
 * // Return the rarity for object between set inverals
 *
 * @return {string} The rarity of the object.
 */
function getRarity() {
    if (probability(0.001)) {
        return "legendary"
    } else if (probability(0.01)) {
        return "Epic"
    } else if (probability(0.10)) {
        return "Rare"
    } else if (probability(0.30)) {
        return "Uncommon"
    } else {
        return "Common"
    }
}

/**
 * Return stats for object between set intervals
 *
 * @return {string} The stat type and value for the object.
 */
function getStats() {
    let randomizedNumber = Math.floor(Math.random() * statTypes.length)
    if (statTypes[randomizedNumber] === "Attack") {
        let attack = Math.floor(Math.random() * 1) + 20
        return "Attack: " + attack
    } else if (statTypes[randomizedNumber] === "Attack%") {
        let attackPercent = Math.floor(Math.random() * 1) + 5
        return "Attack %: " + attackPercent
    } else if (statTypes[randomizedNumber] === "Crit Chance") {
        let critChance = Math.floor(Math.random() * 2) + 9
        return "Crit Chance: " + critChance
    } else if (statTypes[randomizedNumber] === "Crit Damage") {
        let critDamage = Math.floor(Math.random() * 1) + 5
        return "Crit Damage: " + critDamage
    } else if (statTypes[randomizedNumber] === "Speed") {
        let speed = Math.floor(Math.random() * 1) + 10
        return "Speed: " + speed
    }

}

/**
 * // Return price for object between set intervals
 *
 * @return {number} The price of the object.
 */
function getPrice() {

    if (this.rarity === "Common") {
        return Math.floor(Math.random() * 16) + 10
    } else if (this.rarity === "Uncommon") {
        return Math.floor(Math.random() * 26) + 25
    } else if (this.rarity === "Rare") {
        return Math.floor(Math.random() * 51) + 50
    } else if (this.rarity === "Epic") {
        return Math.floor(Math.random() * 351) + 150
    } else if (this.rarity === "Legendary") {
        return Math.floor(Math.random() * 1001) + 1000
    }
}


const weaponNames = [
    "Hawk", "Bear", "Scorpion", "Falcon", "Merciless", "Damned", "Night", "First Mate",
    "Righteous", "Holy", "Wicked", "Weak", "Scourged", "Diseased", "Arcane", "Legion",
    "Enchanted", "Silly", "Funny", "Raincaller", "Marauder", "Souleater", "Eternal",
    "Abyss", "Forsaken", "Phoenix", "Ancients", "Shadows", "Tempest", "Immortal",
    "Wraith", "Divine", "Reckoning", "Stormbringer", "Bloodmoon", "Enigma",
    "Dreadnought", "Serpent", "Vortex", "Valiant", "Voidwalker", "Nightfall",
    "Harbinger", "Sentinel", "Titan", "Nemesis", "Inferno", "Revenant", "Eclipse",
    "Wrath", "Oblivion", "Specter", "Bane", "Redeemer", "Maelstrom", "Requiem",
    "Leviathan", "Warbringer", "Chaos", "Omen", "Vindication", "Vanguard",
    "Juggernaut", "Oracle", "Torment", "Sovereign", "Nemesis", "Lion", "Tiger",
    "Bear", "Elephant", "Wolf", "Eagle", "Buffalo", "Rhino", "Jaguar", "Gorilla",
    "Bison", "Panther", "Crocodile", "Bull", "Shark", "Falcon", "Ox", "Leopard",
    "Whale", "Komodo Dragon", "Flipper Flopper"
]


const weaponTypes = [
    "Sword", "Dagger", "Mace", "Axe", "Bow", "Crossbow", "Spear", "Lance", "Halberd",
    "Hammer", "Staff", "Wand", "Flail", "Scythe", "Whip", "Katana", "Rapier",
    "Claymore", "Greatsword", "Longsword", "Shortsword", "Club", "Trident",
    "Morningstar", "Chakram", "Shuriken", "Nunchaku", "Warhammer", "Gladius",
    "Falchion", "Sabre", "Polearm", "Battleaxe", "Tomahawk", "Throwing Knife",
    "Blunderbuss", "Musket", "Pistol", "Cannon", "Sling", "Boomerang", "Dirk",
    "Kukri", "Estoc", "Cutlass", "Broadsword", "Scimitar", "Javelin", "Quarterstaff",
    "Ballista"
]


const armorTypes = [
    "Helmet", "Shoulder", "Cape", "Hands", "Belt", "Legs", "Boots", "Ring", "Trinket"
]


const statTypes = ["Attack", "Attack%", "Crit Chance", "Crit Damage", "Speed"
]






