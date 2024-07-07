const tg = window.Telegram.WebApp;

const food = [
    {
        name: "avocado",
        price: 4.99,
        image: "img/avocado.png",
        counter: 0
    },
    {
        name: "egglplant",
        price: 3.99,
        image: "img/eggplant.png",
        counter: 0
    },
    {
        name: "potato",
        price: 0.99,
        image: "img/potato.png",
        counter: 0
    },
    {
        name: "red-apple",
        price: 1.99,
        image: "img/red-apple.png",
        counter: 0
    }
];

const items = document.querySelector(".items");
const viewOrder = document.querySelector(".view-order");
const wishes = document.querySelector(".itemsContainer");
const check = document.querySelector(".check");
const mc = document.querySelector(".mainContainer");
const hc = document.querySelector(".headContainer");
const payBtn = document.querySelector(".pay-btn");
const editBtn = document.querySelector(".edit-btn");


food.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("item")
    div.innerHTML = `
        <div class="counter hide">0</div>
        <div><img src="${item.image}" alt="img"></div>
        <div>${item.name} - ${item.price}</div>
        <div>
            <button class="add-btn">Add</button>
            <button class="minus-btn hide">-</button>
            <button class="plus-btn hide">+</button>
        </div>
    `;
    items.appendChild(div);

    const buttonAdd = div.querySelector(".add-btn");
    const buttonMinus = div.querySelector(".minus-btn");
    const buttonPlus = div.querySelector(".plus-btn");
    const counter = div.querySelector(".counter");

    buttonAdd.addEventListener("click", () => {
        buttonAdd.classList.add("hide");
        buttonMinus.classList.remove("hide");
        buttonPlus.classList.remove("hide");
        viewOrder.classList.remove("hide");
        counter.classList.remove("hide");
        counter.textContent = 1;
        item.counter++;
    });

    buttonMinus.addEventListener("click", () => {
        if (counter.textContent == 1) {
            buttonAdd.classList.remove("hide");
            buttonMinus.classList.add("hide");
            buttonPlus.classList.add("hide");
            counter.classList.add("hide");
            counter.textContent = 0;
            item.counter = 0;
        } else {
            counter.textContent--;
            item.counter--;
        }

        let sum = 0;
        food.forEach(item => {
            sum += item.counter;
        });
        if (sum == 0) {
            viewOrder.classList.add("hide");
        }
    });

    buttonPlus.addEventListener("click", () => {
        counter.textContent++;
        item.counter++;
    });
});


viewOrder.addEventListener("click", () => {
    items.classList.add("hide");
    viewOrder.classList.add("hide");
    mc.classList.remove("hide");
    hc.classList.remove("hide");
    check.classList.remove("hide");

    wishes.innerHTML = '';
    food.forEach(item => {
        const itemContainer = document.createElement("div");
        if (item.counter > 0) {
            sum += item.counter*item.price;
            itemContainer.classList.add("itemContainer");
            itemContainer.innerHTML = `
                <div class="check-counter ">${item.counter} </div>
                <div class="elemen-price ">${(item.counter*item.price).toFixed(2)}$ </div>
                <div class="image"><img src="${item.image}" alt="img"></div>
                <div>${item.name}</div>
            `
            wishes.appendChild(itemContainer);
        }
    });
    wishes.classList.remove("hide");
    payBtn.textContent = `pay ${sum.toFixed(2)}`;
});


editBtn.addEventListener("click", () => {
    items.classList.remove("hide");
    wishes.classList.add("hide");
    viewOrder.classList.remove("hide");
    mc.classList.add("hide");
    hc.classList.add("hide");
    check.classList.add("hide");
});


payBtn.addEventListener("click", () => {
    const buyedItems = [];
    food.forEach(item => {
        if (item.counter > 0) {
            buyedItems.push(item);
        };
    });
    const stringCheck = JSON.stringify(buyedItems);
    console.log(stringCheck, typeof(stringCheck));
    tg.sendData(stringCheck);
});
