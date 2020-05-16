if(document.getElementById('problem-post')  !== null){
    document.getElementById('problem-post').addEventListener('click', function(){
        document.getElementById("problem-overlay").className = 'overlay'
    })
    document.getElementById('close').addEventListener('click', function(){
        document.getElementById("problem-overlay").className = 'overlay hide'
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

if(document.getElementById('problem-submit') !== null){
    document.getElementById('problem-submit').addEventListener('click', function(){

        var title = document.getElementById('problem-title').value
        var category = document.getElementById('problem-category').value
        var description = document.getElementById('problem-description').value
    
        document.getElementById('dashboard-list').innerHTML += "<div class='sme-dashboard-item'><div class='sme-first-line'>" +
            "<div class='item-title'>" + title + "</div><div class='show-more-container'>" +
            "<i id='show-more-1' class='fa fa-sort-desc'></i><i id='show-less-1' class='fa fa-close hide'></i>" +
            "</div></div><div class='item-tag-container'><div class='item-tag'>" + category + "</div></div>" +
            "<div class='item-description-container'>" + description + 
            "</div></div>"

        var formdata = new FormData()
        var files = document.getElementById('compulsory-att')
        formdata.append('compulsory_att',files.files[0])
        
        var name = 'KEVIN CHRISTOPHER OU'

        $.ajax({
            type : 'POST', 
            url: "http://127.0.0.1:5000/kyc",
            cache: false,
            contentType: false,
            processData: false,
            data : formdata,
            success: function(response){
                console.log(JSON.parse(response))

                var output = JSON.parse(response)

                var output_name = output.vision.extract.name 

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

                document.getElementById('view-proposal').addEventListener('click', function(){
                    window.location.replace("quotations.html")
                })

                if(output_name == name){
                    alert("Authenticated Successfully")
                }
                else{
                    alert("Failed to Authenticated")
                }
            },
            error: function(error){
                console.log(error)
                alert("Can't connect to server")
            }
        })
    })
}

if(document.getElementById('upload-submit') !== null){
    document.getElementById('upload-submit').addEventListener('click', function(){
        alert("Uploaded Successfully")
    })
}

//File Upload
document.getElementById('proxy-button1').addEventListener('click', function(){
    document.getElementById('compulsory-att').click()
})

document.getElementById('compulsory-att').addEventListener('change', function(){
    var file_list = document.getElementById('compulsory-att')
    var uploaded_files = document.getElementById('uploaded-compulsory-files')
    // console.log(file_list.files)
    uploaded_files.innerHTML = ''
    for(var i =0; i< file_list.files.length; i++){
        uploaded_files.innerHTML += file_list.files[i].name
        if(i == file_list.files.length - 1 & i > 1){
            uploaded_files.innerHTML += file_list.files[i].name
        }   
    }
})