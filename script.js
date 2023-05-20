const menuBtn = document.querySelector('.menu'),
navLinksBox = document.querySelector('.nav-links'),
navLinks = document.querySelectorAll('.nav-link'),
inputLink = document.querySelector('.url'),
errorPara = document.querySelector('.error-para'),
shortenBtn = document.querySelector('.shorten-btn'),
shortLinksWrapper = document.querySelector('.short-links-wrapper');

async function getData(){
    const encodedParams = new URLSearchParams();
    encodedParams.append('url', `${inputLink.value}`);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: encodedParams
        };

    const data = await fetch('https://api.shrtco.de/v2/shorten',options);

    const result = await data.json();
    if(result.ok == false){
        prompt(result.error);
        inputLink.value='';
        return false;
    }

    shortLinksWrapper.classList.remove('none');

    const li = document.createElement('li');
    li.classList.add('short-link-box');
    const fP = document.createElement('p');
    fP.classList.add('unshort-link');
    const fDiv = document.createElement('div');
    fDiv.classList.add('link-border');
    const lDiv = document.createElement('div');
    lDiv.classList.add('short-link-box');
    const lP = document.createElement('p');
    lP.classList.add('short-link');
    const button = document.createElement('button');
    button.classList.add('copy-btn');


    button.textContent = 'Copy';
    fP.textContent = inputLink.value;
    lP.textContent = result.result.full_short_link2;

    li.append(fP);
    li.append(fDiv);
    li.append(lDiv);

    lDiv.append(lP);
    lDiv.append(button)

    shortLinksWrapper.append(li);
    inputLink.value='';
}

shortLinksWrapper.addEventListener('click', (e)=>{
    if(e.target.classList.value == 'copy-btn'){
        e.target.style.backgroundColor = 'hsl(257, 27%, 26%)';
        e.target.textContent = 'Copied!';

        navigator.clipboard
        .writeText(e.target.previousElementSibling.textContent)

    }else{
        return false;
    }
})

const regex = /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

shortenBtn.addEventListener('click', ()=>{
    if(!regex.test(inputLink.value)){
        errorPara.classList.remove('none');
        shortenBtn.style.marginBottom ='2.1rem';
        inputLink.style.borderColor='hsl(0, 87%, 67%)';
    }else{
        errorPara.classList.add('none');
        shortenBtn.style.marginBottom ='0rem';
        inputLink.style.borderColor='hsl(0, 0%, 100%)';
        getData();
    }
})

menuBtn.addEventListener('click', showNavBar);
navLinks.forEach(link=>link.addEventListener('click', showNavBar));

function showNavBar(){
    navLinksBox.classList.toggle('none-mobile');
}