document.getElementById('accept').addEventListener('click', function(){
    document.getElementById('status-container').className = 'status-container accepted'
    document.getElementById('status').innerHTML = 'Accepted'

    document.getElementById('reply').className = 'reply-container hide'
})