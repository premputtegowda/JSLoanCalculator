
//form
const form = document.getElementById('loan-form');
//Listen on form
form.addEventListener('submit', function(e){
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 1000);

    e.preventDefault();
})

//calculate Results

function calculateResults(){
    //load UI variable.s
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value/100)/12;
    const calculatedPeriod = parseFloat(years.value * 12);
    //compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPeriod);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPeriod).toFixed(2);
        totalInterest.value = ((monthly*calculatedPeriod)-principal).toFixed(2);
        //show results and hide loading

        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
    } else {
        showError('Please check your numbers');
    }



}

// Error Function

function showError(error){

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    //hide loading
    document.getElementById('loading').style.display = 'none';
    //insert error before heading

    card.insertBefore(errorDiv,heading);


    //show error ofor 3 seconds

    setTimeout(clearError,3000);

}

//function clearError
function clearError(){
    document.querySelector('.alert').remove();
}
