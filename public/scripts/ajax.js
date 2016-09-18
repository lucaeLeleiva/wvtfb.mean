//'use strict';
//gr8 shit m8 gud codin'
window.onload = ()=>{
    const arrUp = document.getElementsByClassName('btn btn-success');
    for (let i = 0; i < arrUp.length; i++) {
        arrUp[i].onclick=sendUp;
    }
    const arrDown = document.getElementsByClassName('btn btn-danger');
    for (let i = 0; i < arrDown.length; i++) {
        arrDown[i].onclick=sendDown;
    }
    const arrComment = document.getElementsByClassName('btn btn-lg btn-primary btn-block');
    for (let i = 0; i < arrComment.length; i++) {
        arrComment[i].onclick=comment;
    }
};


function comment(){
    const req = new XMLHttpRequest(),
        comment = {comment: document.getElementById('textarea').value,};
    req.onreadystatechange = send;
    function send(){
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let ul = document.getElementById('lista'),
                elementos = this.responseText;
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            for(let i = 0; i < elementos.length; i++){
                let li = document.createElement('li');
                li.value = elementos[i].comment;
                li.className = 'list-group-item';
                ul.appendChild(li);
            }
        }
    }
    req.open('post', '/addComment/'+this.id+'/'+this.name, true);
    req.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(comment));
}

function sendUp(){
    const req = new XMLHttpRequest(),
        id = this.name;
    req.onreadystatechange = send;
    function send(){
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(id).innerHTML = this.responseText;
        }
    }
    
    req.open('post', '/upVote/'+id, true);
    req.send();
}

function sendDown(){
    const req = new XMLHttpRequest(),
        id = this.name;
    req.onreadystatechange = send;
    function send(){
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(id).innerHTML = this.responseText;
        }
    }
    req.open('post', '/downVote/'+id, true);
    req.send();
}