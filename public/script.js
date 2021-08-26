console.log('rendering on client side')



const weatherform = document.querySelector('form');
const search = document.querySelector('input')
const message1=document.getElementById('p-first')
const message2=document.getElementById('p-second')



weatherform.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;//getting value from input 
message2.textContent='Loading'
    fetch('http://localhost:3000/weather?searchterm='+location)
    .then(response => response.json()).then(data => {
        if (data.error) {
            console.log(data.error)
        message2.textContent=data.error
        }

        else {
            console.log(data.forecast,data.location)
            message2.textContent=data.forecast+' . '  +  data.location;
        }
    })


})


