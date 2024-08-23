function addNumbertoScreen(number){
    let screen_txt = screen.textContent; //text content of the screen
    if(screen_txt==="0" && number==0)
        return; //avoid multiple 0s on the screen
    else if (screen_txt==="0")
        screen_txt = number; //replace the 0 with the new number
    else
        screen_txt+=number; //simply append the number to the screen
    let updated_num=""; //this is a string, it represents the new value of operand
    if(operator_var){
        //affects operand_2
        updated_num = operand_2.toString();
        if(screen_txt.charAt(-2)===".") //as this takes place after appending, use -2 to target the decimal point
            updated_num+=".";
        updated_num +=number;
        operand_2 = updated_num.parseFloat();
    }
    else{
        //affects operand_1
        updated_num = operand_1.toString();
        if(screen_txt.charAt(-2)===".") //as this takes place after appending, use -2 to target the decimal point
            updated_num+=".";
        updated_num +=number;
        operand_1 = updated_num.parseFloat();
    }
}

function addOperator(operator){
    if(!operator_var){
        operator_var = operator;
        screen.textContent += operator_var;
    }
    else{
        alert("Operator limit reached. Request cannot be processed.");
        return;
    }
}

function clearScreen(){
    screen.textContent = "0";
}

function backspace(){
    let screen_txt = screen.textContent; //screen text
    let updated_num; //this is a string, it represents the new value of operand
    if(operator_var && operand_2!=0){
        //targeting operand 2
        updated_num = operand_2.toString();
        updated_num = updated_num.slice(0, -1);
        //slice again if it is the first place of decimal
        if(updated_num.charAt(-1)=="."){
            updated_num = updated_num.slice(0, -1);
        }
        if(updated_num!=="")
            operand_2 = updated_num.parseFloat(); //return new value to operand_2
        else
            operand_2 = 0; //backspace causes operand_2 to become empty, set operand_2 to 0
    }
    else if(operator_var && operand_2==0){
        //targeting operator_var
        operator_var = null;
    }
    else if(operand_1!=0){
        //targeting operand 1
        updated_num = operand_1.toString();
        updated_num = updated_num.slice(0, -1);
        //slice again if it is the first place of decimal
        if(updated_num.charAt(-1)=="."){
            updated_num = updated_num.slice(0, -1);
        }
        if(updated_num!=="")
            operand_1 = updated_num.parseFloat(); //return new value to operand_1
        else
            operand_1 = 0; //backspace causes operand_1 to become empty, set operand_1 to 0
    }
    else{
        //the screen is already empty
        alert("The screen is already empty");
        return;
    }
    //update screen
    if(screen_txt.slice(0, -1)=="")
        screen.textContent=0; //reset screen to show 0 (default configuration)
    else
        screen.textContent = screen_txt.slice(0, -1); 
}

function addDecimalPoint(){
    let screen_txt = screen.textContent;
    if(operator_var && operand_2!=0){
        //targeting operand 2
        if(operand_2%1 !== 0){
            //numbers cannot have more than 1 decimal point
            alert("Syntax error: Numbers may not have more than 1 decimal point");
        }
        else{
            screen_txt += ".";
            screen.textContent = screen_txt;
        }
    }
    else if(!operator_var && operand_1!=0){
        //targeting operand 1
        if(operand_1%1 !== 0){
            //numbers cannot have more than 1 decimal point
            alert("Syntax error: Numbers may not have more than 1 decimal point");
        }
        else{
            screen_txt += ".";
            screen.textContent = screen_txt;
        }
    }
    else{
        //case +. (decimal point immediately after operand) or . (at the beginning of the page)
        alert("Syntax error: Decimal point must follow integers");
    }
}