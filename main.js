import './style.css';

const form = document.querySelector('form');

//listen to when user submits the form by clicking that button "form"
form.addEventListener('submit', async (e) => {
    //normally when a form is submitted, the entire page is refresh - we want to prevent that in this case
    e.preventDefault();
    showSpinner();

    // extract the data from the form
    // data structure: map
    const data = new FormData(form);

    // js function fetch
    // RESTful APIs
    const response = await fetch('http://localhost:8081/dream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: data.get('prompt'),
      }),
    });

    if (response.ok){
      const { image } = await response.json();

      const result = document.querySelector('#result');
      result.innerHTML = `<img src="${image}" width="512" />`;
    } else{
      const err = await response.text();
      alert(err);
      console.error(err);
    }

    hideSpinner();
});

function showSpinner(){
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
}

function hideSpinner(){
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Dream';
}