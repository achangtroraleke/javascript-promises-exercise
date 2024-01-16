let baseURL = "http://numbersapi.com";

const $numberForm = $("#number-form");
const $resultContainer = $("#result-container");
const $favoriteNumContainer = $("#favorite-numbers");
const $getFactsButton = $("#get-data-btn");
const $resetButton = $("#reset-btn");


let favoriteNumbers = [];


$numberForm.on('submit', function(e){
    e.preventDefault();
    let num = e.target.number.value;
    addFavoriteNumHTML(num);
    addNumPromise(getNumberData(num))
    $numberForm[0].reset();
})

$getFactsButton.on('click', function(e){
    e.preventDefault();
    $resultContainer.empty();
    getFacts(favoriteNumbers);
})

$resetButton.on('click', function(e){
    e.preventDefault();
    $favoriteNumContainer.empty();
    $resultContainer.empty();
    favoriteNumbers = []
})



function getNumberData(number){
    let response = axios({
        url: `${baseURL}/${number}`,
        method: 'GET',
    });
   
    return response
}

function addResultHTML(data){
    $resultContainer.append(`<li>${data}</li>`)
}

function addFavoriteNumHTML(data){
    $favoriteNumContainer.append(`<li>${data}</li>`)
}

function addNumPromise(data){
    favoriteNumbers.push(data)
}

async function getFacts(arrNum){
    await Promise.all(arrNum)
    .then(numArr =>(
        numArr.forEach(result=> addResultHTML(result.data))
        ))
    .catch(err => console.log(err));
}
