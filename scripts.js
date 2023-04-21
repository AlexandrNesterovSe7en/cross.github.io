let items = [];
let helpMassive = [];
const INPUTS_TEXT = document.querySelectorAll('input[type="text"]')
const FIELDS = {
    '1': {
        name: 'сульфатация',
        startPos: {
            x: 17,
            y: 8
        },
        direction: 'row',
    },
    '2': {
        name: 'отдача',
        startPos: {
            x: 23,
            y: 7,
        },
        direction: 'column'
    },
    '3': {
        name: 'электролит',
        startPos: {
            x: 19,
            y: 7,
        },
        direction: 'column',
    },
    '4': {
        name: 'емкость',
        startPos: {
            x: 17,
            y: 4,
        },
        direction: 'column'
    },
    '5': {
        name: 'тип',
        startPos: {
            x: 26,
            y: 7,
        },
        direction: 'column'
    },
    '6': {
        name: 'кислотные',
        startPos: {
            x: 9,
            y: 4,
        },
        direction: 'row',
    },
    '7': {
        name: 'ток',
        startPos: {
            x: 14,
            y: 4,
        },
        direction: 'column',
    },
    '8': {
        name: 'подзаряд',
        startPos: {
            x: 14,
            y: 12,
        },
        direction: 'row',
    },
    '9': {
        name: 'обслуживание',
        startPos: {
            x: 11,
            y: 2,
        },
        direction: 'column'
    },
    '10': {
        name: 'щелочные',
        startPos: {
            x: 4,
            y: 13,
        },
        direction: 'row'
    },
    '11': {
        name: 'пластина',
        startPos: {
            x: 6,
            y: 8,
        },
        direction: 'row',
    },
    '12': {
        name: 'ареометр',
        startPos: {
            x: 5,
            y: 11,
        },
        direction: 'column',
    },
    '13': {
        name: 'заряд',
        startPos: {
            x: 8,
            y: 7,
        },
        direction: 'column'
    },
    '14': {
        name: 'разряд',
        startPos: {
            x: 5,
            y: 18,
        },
        direction: 'row'
    },
    '15': {
        name: 'аккумулятор',
        startPos: {
            x: 2,
            y: 2,
        },
        direction: 'row',
    },
    '16': {
        name: 'батарея',
        startPos: {
            x: 2,
            y: 1,
        },
        direction: 'column',
    },
    '17': {
        name: 'напряжение',
        startPos: {
            x: 14,
            y: 10,
        },
        direction: 'column',
    },
    '18': {
        name: 'состав',
        startPos: {
            x: 1,
            y: 11,
        },
        direction: 'row',
    },
    '19': {
        name: 'баллон',
        startPos: {
            x: 1,
            y: 4,
        },
        direction: 'row',
    },
    '20': {
        name: 'режим',
        startPos: {
            x: 1,
            y: 6,
        },
        direction: 'row',
    },
};

for (let i = 0; i < 20; i++) {
    for(let j = 0; j < 28; j++) {
        let div = document.createElement('div');
        div.className = 'item'   
        helpMassive.push(div)
    }
    items.push(helpMassive);
    helpMassive = [];
}


class CrossInit {
    constructor(items) {
        this.columns = 28;
        this.rows = 20;
        this.countElements = this.columns * this.rows;
        this.items = items;
    }

    init() {
        this.items.forEach((item) => {
            document.querySelector('.root').append(...item)
        })
    }
}

let cross = new CrossInit(items);

cross.init()

let i = 0;
for (let item in FIELDS) {
    INPUTS_TEXT[i].setAttribute('maxlength', FIELDS[item].name.length)
    i++
    if ( FIELDS[item]?.name ) {
        setRow(FIELDS[item], item)
        setColumn(FIELDS[item], item)
    }
}

function setRow(field, count, value='', flag=true) {
    let {name, startPos:{x, y}, direction} = field;
    if ( direction === 'row') {
        items[y][x - 1].innerHTML = count;
        for ( let i = 0; i < name.length; i++) {
            if (value.length === i && !flag){
                break;
            } 
            let div = items[y][x++];
            
            if (flag) {
                div.classList.add('focusItem');
                continue;
            }

            div.innerHTML = value[i];
        }
    }
}

function setColumn(field, count, value='', flag=true) {
    let {name, startPos:{x, y}, direction} = field;
        
    if ( direction === 'column') {
        items[y - 1][x].innerHTML = count;
        for ( let i = 0; i < name.length; i++) {
            if (value.length === i && !flag){
                break;
            } 

            let div = items[y++][x];
            
            if (flag) {
                div.classList.add('focusItem');
                continue;
            }

            div.innerHTML = value[i];

                       
        }
    } 


}

const containerRoot = document.querySelector('.container-root')

containerRoot.addEventListener('input', (e) => {
    const input = e.target

    if (input.hasAttributes('type', 'text')) {
        const count = input.dataset.id;
        const field = FIELDS[count];

        input.dataset.answer = input.value;

        setRow(field, count, input.value, false);
        setColumn(field, count, input.value, false)
    }
    input.value = input.value
})

document.querySelector('button').addEventListener('click', (e) => {
    const btn = e.target;
    btn.classList.add('active')
})