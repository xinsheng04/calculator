//All global variables
let operands = []
let operators = [];
let passed_Decimal = false; //passed a decimal point
const allowed_operators = ["+", "-", "*", "/"];
const screen = document.getElementById("question");
const answer = document.getElementById("answer");


function writeToScreen(element){
    let screen_txt = screen.textContent !== null ? screen.textContent : "0"; //text content of the screen
    if(screen_txt.length>=11){
        alert("Already at maximum length!");
    }
    else{
        if (screen_txt==="0" && element==0)
            return; //avoid multiple 0s on the screen
        else if(element==="." && screen_txt==="0")
            screen_txt = "0."; //start with decimal less than 1
        else if(element === "." && allowed_operators.includes(screen_txt.slice(-1)))
            screen_txt +=  "0."; //user forgot to put 0 in front of decimal point after operator
        else if (screen_txt==="0")
            screen_txt = element; //replace the 0 with the new number
        else
            screen_txt+=element; //simply append the number to the screen
        
        screen.textContent = screen_txt; // Update the screen
    }
}

function backspace(){
    let screen_txt = screen.textContent || "0"; //screen text
    screen_txt = screen_txt.slice(0, -1);
    if(screen_txt === "")
        screen.textContent=0; //reset screen to show 0 (default configuration)
    else
        screen.textContent = screen_txt; // Update the screen
}

function clearScreen(){
    screen.textContent = "0";
    answer.textContent = null;
}

//the following function sets the operands and operator 
function setOperandsAndOperator(){
    const screen_txt = screen.textContent;
    let complete_element = ""; //the element to be uploaded
    let start = 0, end = 0;
    //starts with operator
    if(allowed_operators.includes(screen_txt[0])){
        if(answer.textContent){
            //replace with given answer
            operands.push(parseFloat(answer.textContent));
            operators.push(screen_txt[0]);
            start = 1;
            end = 1;
        }
        else{
            throw "Syntax error: Cannot start equation with an operand without defined previous answer";
        }
    }
    while(end<screen_txt.length){
        if(!isNaN(parseFloat(screen_txt[start]))){
            while(!isNaN(parseFloat(screen_txt[end])) || screen_txt[end] === "."){
                if(screen_txt[end] === "." && passed_Decimal){
                    //error: a number cannot have more than one decimal point
                    throw "Syntax error: A number cannot have more than one decimal point";
                }
                else if(screen_txt[end] === "." && !passed_Decimal){
                    passed_Decimal = true; //set passedDecimal to true
                }
                end++;
                if(end==screen_txt.length)
                    break; //end of parsing
            }
            complete_element = parseFloat(screen_txt.slice(start, end));
            operands.push(complete_element);
            start = end;
            passed_Decimal = false; //reset this flag for the next floating point
        }
        else if (allowed_operators.includes(screen_txt[start])){
            operators.push(screen_txt[start]);
            start ++;
            end = start;
            if(allowed_operators.includes(screen_txt[start])){
                //error: cannot have two operators consecutively without any operands between them
                throw "Syntax error: Cannot have two operators consecutively";
            }
        }
    }
    //final checking for redundancy
    if (!(operators.length == operands.length-1)){
        console.log(operands);
        console.log(operators);
        throw "Unexpected error: Operands and operators do not add up";
    }
}

function add(accumulator, operand){
    return accumulator + operand;
}

function subtract(accumulator, operand){
    return accumulator - operand;
}

function multiply(accumulator, operand){
    return accumulator * operand;
}

function divide(accumulator, operand){
    if (operand==0){
        throw "Math error: Cannot divide by 0";
    }
    else
        return accumulator / operand;
}

function compute(){
    try{
        setOperandsAndOperator();
        //now all operands and operators have been accounted for
        //Note: Does not take into account PEMDAS/BODMAS rules
        let accumulator = operands[0]; //first operand 
        let next_operand = 0,  operator = "";
        for(let operaton_counter = 0; operaton_counter < operators.length; operaton_counter ++){
            next_operand = operands[operaton_counter+1];
            operator = operators[operaton_counter];
            switch (operator){
                case "+": accumulator = add(accumulator, next_operand); break;
                case "-": accumulator = subtract(accumulator, next_operand); break;
                case "*": accumulator = multiply(accumulator, next_operand); break;
                case "/": accumulator = divide(accumulator, next_operand); break;
            }
        }
        answer.textContent = accumulator;
        //reset everything
        passed_Decimal = false;
        operands = [];
        operators = [];
        screen.textContent = "0";
    }
    catch(exception){
        alert(exception);
        //reset everything
        passed_Decimal = false;
        operands = [];
        operators = [];
        return;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const calculator = document.querySelector(".calculator-area");
    const buttons = document.getElementsByTagName("button");
    Array.from(buttons).forEach(button => {
        button.addEventListener("mouseover", () => {
            button.classList.toggle("grayHover");
        });
        button.addEventListener("mouseout", () => {
            button.classList.toggle("grayHover");
        });
    });
    calculator.addEventListener("click", (event) => {
        const target = event.target;
        switch (target.id){
            case "one": writeToScreen(1);break;
            case "two": writeToScreen(2);break;
            case "three": writeToScreen(3);break;
            case "four": writeToScreen(4);break;
            case "five": writeToScreen(5);break;
            case "six": writeToScreen(6);break;
            case "seven": writeToScreen(7);break;
            case "eight": writeToScreen(8);break;
            case "nine": writeToScreen(9);break;
            case "zero": writeToScreen(0);break;
            case "addition": writeToScreen("+"); break;
            case "subtraction": writeToScreen("-"); break;
            case "multiplication": writeToScreen("*"); break;
            case "division": writeToScreen("/"); break;
            case "decimal-point": writeToScreen("."); break;
            case "clear": clearScreen(); break;
            case "backspace": backspace(); break;
            case "compute": compute(); break;
        }
    });
});