console.log("under javascript function");




const inputForm = document.querySelector('input');
const button = document.querySelector('button');


button.addEventListener("click", () => {
    console.log(`Got the input ${inputForm.value}`);
    fetch(`http://localhost:3000/weather?address=${inputForm.value}`).then((data) => {

        data.json().then((data) => {
            if(data.err){
                document.querySelector('#error').textContent = data.err
                console.log(`Error Occurred ${data.err}`);
            }
            else{
            document.querySelector('#weather-info').textContent= JSON.stringify(data)
            console.log(`fetched the data ${JSON.stringify(data)}`);
            }
        })

   })
   });