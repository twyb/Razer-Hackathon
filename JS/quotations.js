document.getElementById('accept').addEventListener('click', function(){
    document.getElementById('status-container').className = 'status-container accepted'
    document.getElementById('status').innerHTML = 'Accepted'

    document.getElementById('reply').className = 'reply-container hide'
})

document.getElementById('accept').addEventListener('click', function(){

    var form_data = new FormData()

    form_data.append('industry', 'All')
    form_data.append('employee_count', '20')

    console.log(form_data)

    $.ajax({
        type : 'POST', 
        url: "http://127.0.0.1:5000/grants",
        cache: false,
        contentType: false,
        processData: false,
        data : form_data,
        success: function(response){

            output = JSON.parse(response)

            document.getElementById('calculator').className='calculator-container'

            var selected_grants = ['GID004', 'GID006', 'GID007']
            
            for(var i=0; i < output.length; i++){
                if(selected_grants.includes(output[i].GrantID)){
                    if(output[i].GrantID == 'GID004'){
                        document.getElementById('grants-list').innerHTML += " <div id='grant-chosen' class='grants-info-card'><div class='grant-logo'>" +
                        "<img src='../Pics/enterprise-singapore-logo-vector.png'></div>" +
                        "<div class='grants-title'>" + output[i].GrantTitle + "</div><div class='grants-amount'>" +
                        "<input id='grant-amount' type=hidden value=" + String(output[i].GrantAmount) + ">$" +
                        String(output[i].GrantAmount) + ".00</div>" + "<div class='grant-eligibility'>" + output[i].GrantEligibility +
                        "</div><div class='grant-url'>" + "<a href='" + output[i].GrantLink + "'>" + output[i].GrantLink + "</a></div></div>"
                    }
                    else{
                        document.getElementById('grants-list').innerHTML += " <div class='grants-info-card'><div class='grant-logo'>" +
                        "<img src='../Pics/enterprise-singapore-logo-vector.png'></div>" +
                        "<div class='grants-title'>" + output[i].GrantTitle + "</div><div class='grants-amount'>" +
                        "$" + String(output[i].GrantAmount) + ".00</div>" + "<div class='grant-eligibility'>" + output[i].GrantEligibility +
                        "</div><div class='grant-url'>" + "<a href='" + output[i].GrantLink + "'>" + output[i].GrantLink + "</a></div></div>"
                    }
                }
            }

            document.getElementById('grant-chosen').addEventListener('click', function(){

                document.getElementById('grant-chosen').className = 'grants-info-card selected'
            
                var total = document.getElementById('fixed_balance').value
            
                var grant_amount = document.getElementById('grant-amount').value
            
                var balance_after_grant = total - grant_amount
            
                document.getElementById('flexi-balance').value = balance_after_grant
            
                document.getElementById('flexi-balance-span').innerHTML = "$" + String(balance_after_grant) +".00"
            
                var form_data = new FormData()
            
                form_data.append('remaining', String(balance_after_grant))
            
                $.ajax({
                    type : 'POST', 
                    url: "http://127.0.0.1:5000/loans",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data : form_data,
                    success: function(response){

                        document.getElementById('loans-header').className = 'loans-header'
                        document.getElementById('loans-list').className = 'loan-list-container'

                        console.log(response)

                        output = JSON.parse(response)

                        for(var i = 0; i < output.length; i ++){
                            if(output[i].LoanID == 'L006'){
                                document.getElementById('loans-list').innerHTML = "<div id='loans-chosen' class='loans-info-card'>" + 
                            "<div class='loans-logo'><img src='../Pics/ocbc.png'></div>" + 
                            "<div class='loans-title'>"+ output[i].LoanTitle +"</div><div class='loans-amount'>" +
                            "<input id='loans-amount' type=hidden value=" + output[i].LoanAmount + ">$" + output[i].LoanAmount + ".00</div>" +
                            "<div class='loans-eligibility'>" + output[i].LoanEligibility + "</div><div class='loans-url'>" +
                            "<a href='"+ output[i].LoanLink + "'>" + output[i].LoanLink + "</a></div></div>"
                            }
                        }

                        document.getElementById('loans-chosen').addEventListener('click', function(){
            
                            document.getElementById('loans-chosen').className = 'loans-info-card selected'
                        
                            var total = document.getElementById('flexi-balance').value
                        
                            var loans_amount = document.getElementById('loans-amount').value
                        
                            var balance_after_loans = total - loans_amount
            
                            console.log(balance_after_loans)
                        
                            document.getElementById('flexi-balance').value = balance_after_loans
                        
                            document.getElementById('flexi-balance-span').innerHTML = "$" + String(balance_after_loans) +".00"
                        })
                    },
                    error: function(error){
                        console.log(error)
                        alert("Can't connect to server")
                    }
                })
            })


        },
        error: function(error){
            console.log(error)
            alert("Can't connect to server")
        }
    })
})

