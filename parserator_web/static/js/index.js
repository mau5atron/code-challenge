/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */

async function submitData(input_string){
   // Using this function to make a get request at the specific API uri
   // @ /api/parse and sending form input
   const baseURI = "http://"+window.location.host;
   const apiPath = "/api/parse/?input_string=";
   const url = baseURI+apiPath+input_string;
   const respose = await fetch(url, {
      method: "GET",
      headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
      }
   });

   let data = await respose.json();
   return data;
}

window.onload = () => {
   document.querySelector("button#submit").addEventListener('click', (event) => {
      event.preventDefault();   
      const input_string = document.querySelector("input[name='address']");
      const errorTooltip = document.getElementById("error-handle");
      const addressType = document.getElementById("parse-type");
      submitData(input_string.value)
         .then(res => {
            let tbody = document.querySelector("table tbody");
            let addressResults = document.querySelector("div#address-results");
            // if address obj does not exist, setup to display errors
            if (res.address_components === undefined){
               addressResults.style.display = 'none';
               addressType.textContent = '';
               tbody.textContent = '';
               throw new Error(res.error);
            }
            
            if (input_string.classList.contains("is-invalid") && errorTooltip.classList.contains("invalid-tooltip")){
               input_string.classList.remove("is-invalid");
               errorTooltip.classList.remove("invalid-tooltip");
               errorTooltip.textContent = '';
            }
            // flush child nodes from tbody
            if (addressResults.style.display == 'block') {
               tbody.textContent = '';
               addressType.textContent = '';
            }
            
            addressType.textContent = res.address_type;
            // setting up child nodes to be pushed into the data table
            for (let prop in res.address_components){
               let trow = document.createElement("tr");
               let addressPartTd = document.createElement("td");
               let tagTd = document.createElement("td");
               let address_part_text = document.createTextNode(`${res.address_components[prop]}`);
               let tag_text = document.createTextNode(`${prop}`);
               addressPartTd.appendChild(address_part_text);
               tagTd.appendChild(tag_text);
               trow.appendChild(addressPartTd);
               trow.appendChild(tagTd);
               tbody.appendChild(trow);
            }

            addressResults.style.display = 'block';
         }).catch(err => {
            input_string.classList.add("is-invalid");
            errorTooltip.classList.add("invalid-tooltip");
            errorTooltip.textContent = err;
         });
   });
} 