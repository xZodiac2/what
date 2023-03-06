class Brawler {

    constructor(model, name, hp, damage, attack, SUPER, damageFromSuper, brawlerIndex) {
        this._model = model
        this._name = name
        this._hp = hp
        this._damage = damage
        this._attack = attack
        this._SUPER = SUPER
        this._damageFromSuper = damageFromSuper
        this._brawlerIndex = brawlerIndex
        this.alive = true
        this._xp = 0
        this._level = 1
        this._fillPrecentage = this._xp / 10
        this.restart = function () {
            this._hp = hp
            this.alive = true
        }
    }

    lostHp = (takenDamage) => {
        this._hp -= takenDamage
    }



    setHpAndDamage = () => {
        this._hp += this._level * 20
        this._damage += this._level * 7.5
    }

    levelUp = () => {
        this._level += 1
        this._xp = 0
        this.setHpAndDamage()
    }

    killedSombody = () => {
        this._xp += 300
        if (this._xp >= 1000) {
            this.levelUp()
        }
    }

    isDead = () => {
        this.alive = false
        this._damage = 0
        this._damageFromSuper = 0
    }
}



const shelly = new Brawler (
    'images/shelly.webp', // Path to brawler bodel
    'Shelly', // Name of brawler
    3100, // Brawler hp
    120, // Brawler damage
    function() {
        // Some logic of attack
    },
    function() {
        // Some logic of super
    },
    180, // Damage from super
    0 // Brawler index
)

const kolt = new Brawler (
    'images/kolt.webp', // Path to brawler bodel
    'Kolt', // Name of brawler
    2250, // Brawler hp
    140, // Bralwer damage
    function() {
        // Some logic of attack
    },
    function() {
        // Some logic of super
    },
    200, // Damage from super
    1 // Brawler index
)


const brawerModels = document.querySelectorAll('img')

function setModels() {
    brawerModels.forEach(model => {
        if (model.classList.contains('shelly-model') && shelly.alive === true) {
            model.setAttribute('src', `${shelly._model}`)
        } else if (model.classList.contains('shelly-model') && shelly.alive === false) {
            model.setAttribute('src', '')
        }

        if (model.classList.contains('kolt-model') && kolt.alive === true) {
            model.setAttribute('src', `${kolt._model}`)
        } else if (model.classList.contains('kolt-model') && kolt.alive === false) {
            model.setAttribute('src', '')
        }
    })
}

setModels()

const attackButtons = document.querySelectorAll('.attack')
const congratulation = document.querySelector('.congratulation')
const restartButton = document.querySelector('.restart')
const hp = document.querySelectorAll('.hp')
const fillField = document.querySelectorAll('.filled-field')



function fillPrecentage() {
    const shellyXpField = fillField[0].clientWidth - (shelly._xp / 5)
    const koltXpField = fillField[0].clientWidth - (kolt._xp / 5)
    console.log(kolt._xp, shelly._xp, shellyXpField, koltXpField)
    fillField[shelly._brawlerIndex].style.left = `-${shellyXpField}px`
    fillField[kolt._brawlerIndex].style.left = `-${koltXpField}px`
}


function somebodyDead() {
    setModels()
    if (shelly.alive === false) {
        congratulation.textContent = 'Кольт победил!'
        attackButtons[shelly._brawlerIndex].style.display = 'none'
        hp[shelly._brawlerIndex].textContent = 'Умер'
    } else if (kolt.alive === false) {
        congratulation.textContent = 'Шелли победила!'
        hp[kolt._brawlerIndex].textContent = 'Умер'
        attackButtons[kolt._brawlerIndex].style.display = 'none'
    }
    fillPrecentage()
}


function checkHp() {
    if (shelly._hp <= 0) {
        shelly.isDead()
        kolt.killedSombody()
        somebodyDead()
    } else if (kolt._hp <= 0) {
        kolt.isDead()
        shelly.killedSombody()
        somebodyDead()
    }
}

function setHp() {
    if (shelly.alvie != true && kolt.alive != true) return

    hp.forEach(brawlerHp => {
        if (brawlerHp.classList.contains('shelly-hp')) {
            brawlerHp.textContent = `Хп шелли ${shelly._hp}`
        } else if (brawlerHp.classList.contains('kolt-hp')) {
            brawlerHp.textContent = `Хп кольта ${kolt._hp}`
        }
    })
}



restartButton.addEventListener('click', function() {
    congratulation.textContent = ''
    shelly.restart()
    kolt.restart()
    setHp()
    setModels()
})


setHp()


attackButtons.forEach(attackButton => {
    attackButton.addEventListener('click', function() {

        console.log(kolt._brawlerIndex)
        // attack brawler
        if (attackButton.classList.contains('kolt-attack')) {
            shelly.lostHp(kolt._damage)
        } else if (attackButton.classList.contains('shelly-attack')) {
            kolt.lostHp(shelly._damage)
        }

        checkHp()
        setHp()
    })
})
