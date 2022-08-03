const numberButtons = document.querySelectorAll(".number")
const operationButtons = document.querySelectorAll(".operand")
const equalsButton = document.querySelector(".equal")
const deleteButton = document.querySelector(".delete")
const clearAllButton = document.querySelector(".clear-all")
const currentOperand = document.querySelector(".currentOperand")
const previousOperand = document.querySelector(".previousOperand")
let changeToNewNumber;
let clickedNumber = false;
let operands = []
let operators = []

equalsButton.addEventListener("click", calculate)
clearAllButton.addEventListener("click", deleteDisplay)
deleteButton.addEventListener("click", deleteNumber)
numberButtons.forEach(e => e.addEventListener("click", ()=>{
    if (changeToNewNumber && e.innerText !== "."){
        currentOperand.innerText = `${e.innerText}`
    }else if(currentOperand.innerText === "0" && e.innerText !== "."){
        currentOperand.innerText = `${e.innerText}`
    }else{
        if(e.innerText === "." && currentOperand.innerText !== "Error" &&currentOperand.innerText.split("").every(e => e !== ".")){
            currentOperand.innerText = `${currentOperand.innerText}${e.innerText}`
        }else if(e.innerText !== "."){
            currentOperand.innerText = `${currentOperand.innerText}${e.innerText}`
        }
    }
    changeToNewNumber = false
    clickedNumber = true
    if (e.innerText === "." && currentOperand.innerText === "Error"){
        changeToNewNumber = true
    }
}))


operationButtons.forEach(e => e.addEventListener("click", ()=>{
    if(clickedNumber === true && currentOperand.innerText !== "Error"){
        operands.push(Number(currentOperand.innerText))
        operators.push(e.innerText)
        previousNumber = currentOperand.innerText
        previousOperand.innerText = previousOperand.innerText + currentOperand.innerText + e.innerText
        changeToNewNumber = true
        clickedNumber = false
    }
}))



function calculate(){
    let result = 0;
    let firstNumber = operands[0]
    if(clickedNumber) operands.push(Number(currentOperand.innerText))

    // first doing all the mulitplication and division
    while (operators.some(e => e === "*" || e === "/")){
        let indexOfOperator;
        let indexOfStar = operators.indexOf("*")
        let indexOfDivide = operators.indexOf("/")

        if(indexOfStar > -1 && indexOfDivide > -1){
            indexOfStar < indexOfDivide ? indexOfOperator = indexOfStar : indexOfOperator = indexOfDivide
        }else{
            if (indexOfStar > -1){
                indexOfOperator = indexOfStar
            }else if (indexOfDivide > -1){
                indexOfOperator = indexOfDivide
            }
        }

        if (operators[indexOfOperator] === "*"){
            result = operands[indexOfOperator] * operands[indexOfOperator + 1]
            operands[indexOfOperator] = result
            operands.splice(indexOfOperator + 1, 1)
            operators.splice(indexOfOperator, 1)
        }else{
            result = operands[indexOfOperator] / operands[indexOfOperator + 1]
            operands[indexOfOperator] = result
            operands.splice(indexOfOperator + 1, 1)
            operators.splice(indexOfOperator, 1)
        }
    }
    
   // adding and subtracting
   if(operators.length > 0){
    result = operands[0]
    for (let i = 1; i < operands.length; i++){
        if (operators[i - 1] === "+"){
            result = result + operands[i]
        }else{
            result = result - operands[i]
        }
    }
}
  
    if (result === Infinity){
        result = "Error"
    }
    if (isNaN(result) && typeof result === "number"){
        result = firstNumber
    }
    if (previousOperand.innerText === ""){
        result = currentOperand.innerText
    }

    currentOperand.innerText = result
    previousOperand.innerText = ""
    operands = []
    operators = []
    changeToNewNumber = true
}

function deleteDisplay(){
    currentOperand.innerHTML = "0"
    previousOperand.innerHTML = ""
    operands = []
    operators = []
    clickedNumber = false
}

function deleteNumber(){
    let tmp = ""
    if(currentOperand.innerText === "Error"){
        clickedNumber = false
        return currentOperand.innerText = "0"
    }
    if(currentOperand.innerText.length === 1){
        clickedNumber = false
        return currentOperand.innerText = "0"
    }else {
        for (let i = 0; i < currentOperand.innerText.length - 1; i++){
            tmp += currentOperand.innerText[i]
        }
    }
    return currentOperand.innerText = tmp
}


