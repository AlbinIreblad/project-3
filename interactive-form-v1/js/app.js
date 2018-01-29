//All this is getting the html elements and calling the methods, also i divided it into difrent part with enter spaces
//next time i write code i will try to select more of the parent elements and then chose childs from there cus this looks not good
const name = document.querySelector('input');
name.focus();
const JobRole = document.querySelector("select");
JobRole.onchange = ChangedToOther;
var creditcard = false;
const Email = document.getElementById("mail");
const Fieldset = document.querySelector("fieldset");
const Input = document.createElement("input");
const Colors = document.getElementById("color");
const Design = document.getElementById("design");
Design.onchange = ChangeColorT;

const MainCon = document.querySelector("input[name = 'all']");
const jsFrameworks = document.querySelector("input[name = 'js-frameworks']");
const jsLibs = document.querySelector("input[name = 'js-libs']");
const express = document.querySelector("input[name = 'express']");
const node = document.querySelector("input[name = 'node']");
const buildTools = document.querySelector("input[name = 'build-tools']");
const npm = document.querySelector("input[name = 'npm']");
const FieldsetAct = document.querySelector("fieldset.activities");
var price = 0;

const Payment = document.querySelector("select[id='payment']");
const CreditCard = document.querySelector('div#credit-card');
const Paypal = document.querySelector('fieldset div p').parentNode;
const BitCoin = Paypal.nextElementSibling;
HidePayment();
Payment.onchange = ChangePayment;

const submitBtn = document.querySelector("button[type = 'submit']")
//When the submit button is checked this method is played
submitBtn.addEventListener('click', function(event){
    //border is transparent so it updates everytime the button is clicked
    name.style.borderColor = 'transparent';
    Email.style.borderColor = 'transparent';
    //making names border red to indicate that the you need to fill in a name
    if(name.value == ''){
        name.style.borderColor = 'red';
        event.preventDefault();
    }
    //Checking if the email contains a @ beacouse thats how a email works
    sub = "@"
    if(Email.value.indexOf(sub) === -1){
        Email.style.borderColor = 'red';
        event.preventDefault();
    }
    //if price is less then 100 means that none of the checkboxes is checked wich means that i need to correct them
    if(price < 100){
        var Wronglabel = document.createElement('span');
        Wronglabel.innerHTML = 'You need to select one activity';
        Wronglabel.style.color = 'red';
        FieldsetAct.insertBefore(Wronglabel, document.querySelector('fieldset.activities label'));
        //decided to make this a message instead of a border because it looks nicer
        FieldsetAct.removeChild(Wronglabel.previousSibling);
        //removing the precius sibling of wronglabel, first time this code runs the space between the first label and the legend is deleted wich is okay
        event.preventDefault();
        //i use prevent default on every if statement so the submit button dosent actully submit and instead makes the statements that i say it should
    }
    if(creditcard === true){
        //checking if the creditcard form is active and meets the creteria
        var cvv = document.querySelector('input#cvv');
        var zip = document.querySelector('input#zip');
        var ccNum = document.querySelector('input#cc-num');
        ccNum.style.borderColor = 'transparent';
        zip.style.borderColor = 'transparent';
        cvv.style.borderColor = 'transparent';
        if(ccNum.value.length > 17 || ccNum.value.length < 13 || ccNum.value.match(/^[0-9]+$/) == null){
            ccNum.style.borderColor = 'red';
            event.preventDefault();
        }
        if(zip.value.length !== 5 || zip.value.match(/^[0-9]+$/) == null){
            zip.style.borderColor = 'red';
            event.preventDefault();
        }
        if(cvv.value.length !== 3 || cvv.value.match(/^[0-9]+$/) == null){
            cvv.style.borderColor = 'red';
            event.preventDefault();
        }
        //if statements inside if statements, first to check if the checkbox menu is selected and then if the form is correctly filled
        //if it wrong then the border turns red and again the border turns red
            
    }
    //i used if statements and not else if statements beacouse i want it to continue to show what is wrong instead of showing only one wrong at the time
});


//made this a function beacouse otherwise i would need to write these 3 lines two times, dry
function HidePayment() {
    CreditCard.style.display = 'none';
    Paypal.style.display = 'none';
    BitCoin.style.display = 'none';
}
//a function that checks what option is selected and then hides all the payments objects and then shows the one that is selected
function ChangePayment(event) {
    //hides all
    HidePayment();
    if (event.target.value === "paypal"){
        //shows the right object
        Paypal.style.display = 'block';
        creditcard = false;
    }
    else if (event.target.value === "bitcoin"){
        BitCoin.style.display = 'block';
        creditcard = false;
    }
    else if (event.target.value === "credit card"){ 
        CreditCard.style.display = 'block';
        creditcard = true;
    }
    else{
        //if you select any other option all the payment methods is hidden
        HidePayment();
        creditcard = false;
    }
    
}

//not so mutch dry code, here is one example where it would be better to chose the parent element and then chose the kids like a array and use a for statements
jsFrameworks.addEventListener('change', function () {
    Disable(jsFrameworks, express);
// all these have event listners and then sends a the disable function 2 names one wich is this and one that is the one that happens at the same time.
});
express.addEventListener('change', function () {
    Disable(express, jsFrameworks);
});

jsLibs.addEventListener('change', function () {
    Disable(jsLibs, node);
});
node.addEventListener('change', function () {
    Disable(node, jsLibs);
});
//price function is the price calculater function and the disable function also calls the price function i did it like that so i dont have to repeat that code line in every event listner
MainCon.addEventListener('change', function () {
    Price(MainCon);
});
buildTools.addEventListener('change', function () {
    Price(buildTools);
});
npm.addEventListener('change', function () {
    Price(npm);
});
//disable have 2 varieble first and last first is the one that got checked the last is the one that happens at the same time
function Disable(first, last) {
    if (first.checked) {
        //cheks if it is checked or uncheked
        //this code strips runs when it is checked and makes the input diabled and the label grey
        last.disabled = true;
        last.parentNode.style.color = 'grey';

    } else {
        //when its unchecked it makes the input not disabled and the label black
        last.disabled = false;
        last.parentNode.style.color = 'black';
    }
    Price(first);
}

function Price(first) {
    //creates the span that will write out the final price
    var Totalprice = document.createElement('span');
    if (first.checked) {
        if (first == MainCon) //the only one that cost diffrent is the main confrence so this if statements checks if it is the main and adds 200 if it is
            price = price + 200;
        else // if it isent it must cost 100 so that is the other option
            price = price + 100;
    } else {
        if (first == MainCon)//does the reverse if it is unchecked and - 100 or 200 same if statements...
            price = price - 200;
        else
            price = price - 100;
    }
//at the end it ads the final price and appends it at the botton of the fieldset 
    Totalprice.innerHTML = 'Total ' + price + '$';
    FieldsetAct.appendChild(Totalprice);
    //removes the privous one as i did abov on the error message
    FieldsetAct.removeChild(Totalprice.previousSibling);
    if (price === 0) {
        FieldsetAct.removeChild(FieldsetAct.lastChild);
        //if the price is 0 wich means that no of the events is selected and therefor the price span is deleted 
    }

}
//the color based on design that is chosen
function ChangeColorT(event) {
    //checks what design is selected
    if (event.target.value === "js puns") {
        while (Colors.firstChild) {
            Colors.removeChild(Colors.firstChild);
            //removes all the children
        }
        //creates the difrent color selections
        const color1 = document.createElement("option");
        color1.innerHTML = "Cornflower Blue (JS Puns shirt only)";
        color1.value = "cornflowerblue";

        const color2 = document.createElement("option");
        color2.innerHTML = "Dark Slate Grey (JS Puns shirt only)";
        color2.value = "darkslategrey";

        const color3 = document.createElement("option");
        color3.innerHTML = "Gold (JS Puns shirt only)";
        color3.value = "gold";
        //appends the colors option
        Colors.appendChild(color1);
        Colors.appendChild(color2);
        Colors.appendChild(color3);
        //this could also be a function and be called so it wasent repeated 2 times
    } else {
        while (Colors.firstChild) {
            Colors.removeChild(Colors.firstChild);
            //same as above
        }
        const color1 = document.createElement("option");
        color1.innerHTML = "Tomato (I ♥ JS shirt only)";
        color1.value = "tomato";

        const color2 = document.createElement("option");
        color2.innerHTML = "Steel Blue (I ♥ JS shirt only)";
        color2.value = "steelblue";

        const color3 = document.createElement("option");
        color3.innerHTML = "Dim Grey (I ♥ JS shirt only)";
        color3.value = "dimgrey";
        //same as above difrent color
        Colors.appendChild(color1);
        Colors.appendChild(color2);
        Colors.appendChild(color3);

    }
}
function ChangedToOther(event) {
    //if the job role event was changed to other a nice text menu is created
    if (event.target.value == "other") {
        Input.type = 'text';
        Input.id = "other-title";
        Input.placeholder = "Your Job Role";
        //makes the input element and adding the right information and appends it 
        Fieldset.appendChild(Input);
    } else {
        Fieldset.removeChild(Input);
        //this actully throws alot of errors if you check the console, bacause if you chose any other than the other in the menu the input isnt appended and dosent exsist
        //and is definatly not a child of fieldset but this dosent effect the customers interface so its ok, i could fix this with using a if statement in a if statement or something
        //like that to see if other has been selected and when or if the user makes a next choice the this code should run. 
    }

}