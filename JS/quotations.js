document.getElementById('accept').addEventListener('click', function(){
    document.getElementById('status-container').className = 'status-container accepted'
    document.getElementById('status').innerHTML = 'Accepted'

    document.getElementById('reply').className = 'reply-container hide'
})

document.getElementById('accept').addEventListener('click', function(){

    var form_data = new FormData()

    form_data.append('industry', 'All')
    form_data.append('employee_count', '1200')

    console.log(form_data)

    $.ajax({
        type : 'POST', 
        url: "http://127.0.0.1:5000/grants",
        cache: false,
        contentType: false,
        processData: false,
        data : form_data,
        success: function(response){
            console.log(response)
        },
        error: function(error){
            console.log(error)
            alert("Can't connect to server")
        }
    })
})

document.getElementById('grant-chosen').addEventListener('click', function(){

    document.getElementById('grant-chosen').className = 'grants-info-card selected'

    var total = document.getElementById('fixed_balance').value

    var grant_amount = document.getElementById('grant-amount').value

    var balance_after_total = total - grant_amount

    console.log(balance_after_total)
})