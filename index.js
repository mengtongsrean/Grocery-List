// initialiaze app and get database started from fire base
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
    databaseURL: "https://practice-c2753-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const groceryListInDB = ref(database, "grocery-list");
const inputEl = document.getElementById("input-field");
const buttonEl = document.getElementById("add-button");
const groceryListEl = document.getElementById("grocery-list");

buttonEl.addEventListener("click", function () {
    if (inputEl.value !== "") {
        let inputValue = inputEl.value;
        push(groceryListInDB, inputValue);
        clearInputField();
    }
});

function appendList(item) {
    let itemID = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
    newEl.addEventListener("dblclick", function () {
        let exactLocationOfListInDB = ref(database, `grocery-list/${itemID}`);
        remove(exactLocationOfListInDB);
    });
    groceryListEl.append(newEl);

}

onValue(groceryListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let groceryListArray = Object.entries(snapshot.val());
        clearGroceryListField();
        for (let i = 0; i < groceryListArray.length; i++) {
            let currentItem = groceryListArray[i];
            appendList(currentItem);
        }
    } else {
        groceryListEl.innerHTML = "No item here yet!";
    }

})

function clearInputField() {
    inputEl.value = "";
}

function clearGroceryListField() {
    groceryListEl.innerHTML = "";
}

