import { createArmor, createWeapon } from "./equipment.js"

/**
 *
 *
 * @export
 */
export function shopItems() {
    // console.log("\nWelcome to the Shop!\nHere you can exchange items for coins")
    let shopItems = []

    for (let i = 0; i < 2; ++i) {
        let weapon = new createWeapon()
        shopItems.push(weapon)
    }
    for (let i = 0; i < 2; ++i) {
        let armor = new createArmor()
        shopItems.push(armor)
    }
    return shopItems
}
