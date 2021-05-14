const inputToDo = document.querySelector('.inputToDo');
const createListBtn = document.querySelector('.createListBtn');
const removeListBtn = document.querySelector('.removeListBtn');
const containerList = document.querySelector('.containerList');

if (localStorage.getItem('DATA')) {
    JSON.parse(localStorage.getItem('DATA')).forEach(item => {
        render(item.id, item.text);
    })
} else {
    localStorage.setItem('DATA', JSON.stringify([]));
    localStorage.setItem('DELETED_DATA', JSON.stringify([]));
    localStorage.setItem('Counter', 0);
}

createListBtn.addEventListener('click', () => {
    const arrList = JSON.parse(localStorage.getItem('DATA'));
    const i = localStorage.Counter;

    render(i, inputToDo.value);

    arrList.push({
        id: i,
        text: inputToDo.value,
    });

    inputToDo.value = '';
    localStorage.Counter++;
    localStorage.DATA = JSON.stringify(arrList);
});

removeListBtn.addEventListener('click', () => {
    const arrList = JSON.parse(localStorage.getItem('DATA'));
    const deletedArrList = JSON.parse(localStorage.getItem('DELETED_DATA'));
    const stateCheckbox = [...document.getElementsByClassName('state')];
    const renderMasList = [...document.getElementsByClassName('li')];
    const newArrList = [];
    
    stateCheckbox.forEach((item, i) => {
        if (item.checked) {
            deletedArrList.push(arrList[i])
            containerList.removeChild(renderMasList[i])
        } else {
            newArrList.push(arrList[i])
        }
    })

    localStorage.DELETED_DATA = JSON.stringify(deletedArrList);
    localStorage.DATA = JSON.stringify(newArrList);
})

function render(i, text) {
    const list = `
        <div class="li list${i}">
            <p class="textList">${text}</p>
            <input class="state" type="checkbox">
        </div>
    `;

    containerList.insertAdjacentHTML("beforeend", list);
}