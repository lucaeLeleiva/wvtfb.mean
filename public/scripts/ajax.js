'use strict';
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
        id = this.id,
        name = this.name,
        comment = {comment: document.getElementById('textarea').value,};
    req.onreadystatechange = send;
    function send(){
        if (this.readyState == 4 && this.status == 200) {
            let ul = document.getElementById('lista'),
                elementos = JSON.parse(this.responseText);
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            for(let i = 0; i < elementos.length; i++){
                console.log(elementos);
                let li = document.createElement('li'),
                    a = document.createElement('a'),
                    aText = document.createTextNode(elementos[i].posterName),
                    liText = document.createTextNode(': '+elementos[i].comment);
                a.className = 'navbar-link';
                a.setAttribute('href', '/articles/'+elementos[i].posterId);
                a.appendChild(aText);
                li.appendChild(a);
                li.appendChild(liText);
                li.className = 'list-group-item';
                ul.appendChild(li);
            }
        }
    }
    req.open('post', '/addComment/'+id+'/'+name, true);
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