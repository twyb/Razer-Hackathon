var count = 0;
document.getElementById('login').addEventListener('click', function(){
$.ajax({
        type : 'POST', 
        url: "http://127.0.0.1:5000/login",
        contentType: 'application/json',
        data : JSON.stringify({'data': [$('#text').val(), $('#password').val()]}),
        success: function(response){
            // console.log(response)
            if(response[0] == 'True'){
                document.getElementById('2FAcontainer').innerHTML = "<h3>Enter 2FA Code</h3>" +
                "<div id = '2FAmessage' class = 'FAmessage'></div>" + 
                "<input type = 'password' id ='2FA' placeholder='2FA' class = 'form__field' style = 'padding: 0 0 10px 0'>";
                document.getElementById('fasubmit').innerHTML = "<button type = 'button' id = '2FAsubmit' name = 'submit' class = 'submit' data-hover = 'Authenticate!'><div>Submit</div></button>";
                document.getElementById('logincontainer').innerHTML = '';
                document.getElementById('2FAsubmit').addEventListener('click', function(){
                    document.getElementById('2FAmessage').innerHTML = '';
                        count += 1;
                        $.ajax({
                            type: 'POST',
                            url: "http://127.0.0.1:5000/2FA",
                            contentType: 'application/json',
                            data : JSON.stringify({'data': $('#2FA').val()}),
                            success: function(response){
                                if(response == 'True'){
                                    if(sessionStorage){
                                                sessionStorage.setItem('username', $('#text').val())
                                                sessionStorage.setItem('token', response[1])
                                            }
                                    window.location.href = 'landing_page.html';
                                }
                                else{
                                    document.getElementById('2FAmessage').innerHTML += "Retry Again";
                                }
                            },
                            error: function(error){
                                console.log(error)
                                alert("Can't connect to server.")
                            }
                        })
                        if(count > 3){
                                location.reload();
                                alert("Too many tries. Please login again.")
                            }   
                    })
            }
            else{
                    document.getElementById('warning').innerHTML = "<p>Invalid Username or Password.<br>Please Try Again </p>";
            }
        },
        error: function(error){
            console.log(error)
            alert("Can't connect to server.")
        }
    })
})