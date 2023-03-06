class Brawler {

    constructor(model, name, maxHp, maxDamage, attack, SUPER, damageFromSuper, brawlerIndex) {
        this._model = model
        this._name = name
        this._maxHp = maxHp
        this._hp = maxHp
        this._maxDamage = maxDamage
        this._damage = maxDamage
        this._attack = attack
        this._SUPER = SUPER
        this._damageFromSuper = damageFromSuper
        this._brawlerIndex = brawlerIndex
        this.alive = true
        this._xp = 1
        this._level = 1
        this._necessaryXp = 1000
        this.setHpAndDamage = function () {
            this._maxHp = maxHp + this._level * 20
            this._maxDamage = maxDamage + this._level * 7.5
        }
    }

    lostHp = (takenDamage) => {
        this._hp -= takenDamage
    }


    restart = () => {
        this._hp = this._maxHp
        this._damage = this._maxDamage
        this.alive = true
    }

    levelUp = () => {
        this._level += 1
        this._necessaryXp += 500
        this._xp -= this._necessaryXp
        this.setHpAndDamage()
    }

    killedSombody = () => {
        this._xp += 400
        if (this._xp >= this._necessaryXp) {
            this.levelUp()
        }
    }

    finish = () => {
        this._damage = 0
        this._damageFromSuper = 0
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
const attackButtons = document.querySelectorAll('.attack')
const congratulation = document.querySelector('.congratulation')
const restartButton = document.querySelector('.restart')
const hp = document.querySelectorAll('.hp')
const filledXpField = document.querySelectorAll('.filled-field')
const displayLevel = document.querySelectorAll('.level')

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

function setLevels() {
    displayLevel[shelly._brawlerIndex].textContent = `Уровень: ${shelly._level}`
    displayLevel[kolt._brawlerIndex].textContent = `Уровень: ${kolt._level}`
}

function setButtons() {
    attackButtons[shelly._brawlerIndex].style.display = 'block'
    attackButtons[kolt._brawlerIndex].style.display = 'block'
}

function fillXpBar() {
    const shellyXpInPrecents = shelly._xp / shelly._necessaryXp * 100
    const koltXpInPrecents = kolt._xp / kolt._necessaryXp * 100
    const pixelsQuantityForFillShellyXpBar = filledXpField[shelly._brawlerIndex].clientWidth / 100 * shellyXpInPrecents
    const pixelsQuantityForFillKoltXpBar = filledXpField[kolt._brawlerIndex].clientWidth / 100 * koltXpInPrecents
    filledXpField[shelly._brawlerIndex].style.left = `-${200 - pixelsQuantityForFillShellyXpBar}px`
    filledXpField[kolt._brawlerIndex].style.left = `-${200 - pixelsQuantityForFillKoltXpBar}px`
}


function somebodyDead() {
    setModels()
    if (shelly.alive === false) {
        congratulation.textContent = 'Кольт победил!'
        hp[shelly._brawlerIndex].textContent = 'Умер'
    } else if (kolt.alive === false) {
        congratulation.textContent = 'Шелли победила!'
        hp[kolt._brawlerIndex].textContent = 'Умер'
    }
    attackButtons[shelly._brawlerIndex].style.display = 'none'
    attackButtons[kolt._brawlerIndex].style.display = 'none'
    fillXpBar()
    setLevels()
}


function checkHp() {
    if (shelly._hp <= 0) {
        shelly.isDead()
        kolt.killedSombody()
        somebodyDead()
        kolt.finish()
    } else if (kolt._hp <= 0) {
        kolt.isDead()
        shelly.killedSombody()
        somebodyDead()
        shelly.finish()
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

function restartGame() {
    congratulation.textContent = ''
    shelly.restart()
    kolt.restart()
    setHp()
    setModels()
    setButtons()
}




restartButton.addEventListener('click', restartGame)

setModels()
setHp()
setLevels()

attackButtons.forEach(attackButton => {
    attackButton.addEventListener('click', function() {

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
