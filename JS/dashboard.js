if(document.getElementById('problem-post')  !== null){
    document.getElementById('problem-post').addEventListener('click', function(){
        document.getElementById("problem-overlay").className = 'overlay'
    })
    document.getElementById('close').addEventListener('click', function(){
        document.getElementById("problem-overlay").className = 'overlay hide'
    })
}
    
if(document.getElementById('show-more') !== null){
    document.getElementById('show-more').addEventListener('click', function(){
        document.getElementById('show-less').className = 'fa fa-close'
        document.getElementById('show-more').className = 'fa fa-sort-desc hide'
        document.getElementById('responses').className = 'response-item-container'
    })

    document.getElementById('show-less').addEventListener('click', function(){
        document.getElementById('show-less').className = 'fa fa-close hide'
        document.getElementById('show-more').className = 'fa fa-sort-desc'
        document.getElementById('responses').className = 'response-item-container hide'
    })    
    
}

if(document.getElementById('upload-proposal') !== null){
    document.getElementById('upload-proposal').addEventListener('click', function(){
    document.getElementById("proposal-overlay").className = 'overlay'
    })
    document.getElementById('close').addEventListener('click', function(){
        document.getElementById("proposal-overlay").className = 'overlay hide'
    })
}

if(document.getElementById('view-proposal') !== null){
    document.getElementById('view-proposal').addEventListener('click', function(){
        window.location.replace("quotations.html")
    })
}
