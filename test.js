class Brawler {
    constructor(model, name, damage, hp, attack, SUPER, damageFromSuper) {
        this.model = model
        this.name = name
        this.damage = damage
        this.damageFromSuper = damageFromSuper
        this.hp = hp
        this.attack = attack
        this.SUPER = SUPER
        this.damageFromSuper = damageFromSuper
    }

    lostHp = (takenDamage) => {
        this.hp -= takenDamage
    }

}

const shelly = new Brawler('images/shelly.webp', "Shelly", 78, 3100,
function() {
    console.log(`Какая то логика атаки`)
},
function() {
    console.log("Какая то логика ульты")
}, 120)


const kolt = new Brawler('images/kolt.webp', "Kolt", 120, 2700,
function() {
    console.log(`Какая то логика атаки`)
},
function() {
    console.log("Какая то логика ульты")
}, 120)


const brawerModels = document.querySelectorAll('img')

brawerModels.forEach(model => {
    if (model.classList.contains('shelly-model')) {
        model.setAttribute('src', `${shelly.model}`)
    } else if (model.classList.contains('kolt-model')) {
        model.setAttribute('src', `${kolt.model}`)
    }
})




const hp = document.querySelectorAll('.hp')

hp.forEach(brawlerHp => {
    if (brawlerHp.classList.contains('shelly-hp')) {
        brawlerHp.textContent = `Хп шелли ${shelly.hp}`
    } else if (brawlerHp.classList.contains('kolt-hp')) {
        brawlerHp.textContent = `Хп кольта ${kolt.hp}`
    }
})





const attackButtons = document.querySelectorAll('.attack')
const congratulation = document.querySelector('.congratulation')

attackButtons.forEach(attackButton => {
    attackButton.addEventListener('click', function() {

        // attack brawler
        if (attackButton.classList.contains('kolt-attack')) {
            shelly.lostHp(kolt.damage)
        } else if (attackButton.classList.contains('shelly-attack')) {
            kolt.lostHp(shelly.damage)
        }

        // set brawlers hp
        hp.forEach(brawlerHp => {
            if (brawlerHp.classList.contains('shelly-hp')) {
                if (shelly.hp <= 0) {
                    brawlerHp.textContent = 'Умер'
                    shelly.damage = 0
                    congratulation.textContent = 'Кольт победил!'
                } else {
                    brawlerHp.textContent = `Хп шелли ${shelly.hp}`
                }
            } else if (brawlerHp.classList.contains('kolt-hp')) {
                if (kolt.hp <= 0) {
                    brawlerHp.textContent = 'Умер'
                    kolt.damage = 0
                    congratulation.textContent('Шелли победила!')
                } else {
                    brawlerHp.textContent = `Хп кольта ${kolt.hp}`
                }
            }
        })
    })
})
