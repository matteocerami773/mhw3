/*bottone "scopri di più"*/

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('readMoreBtn').addEventListener('click', function() {
        let extraContent = document.querySelector('#extra');
        extraContent.classList.toggle('hidden');
        
        if (!extraContent.classList.contains('hidden')) {
            this.textContent = "Mostra meno"; 
        } else {
            this.textContent = "Scopri di più"; 
        }
    });

    readMoreBtn.addEventListener('click', function() {
        if (!extraContent.classList.contains('hidden')) {
            extraContent.classList.add('hidden'); 
            readMoreBtn.textContent = "Scopri di più"; 
        }
    });
});


/*Cambiare l'immagine (la prima immagine della pagina)*/

document.addEventListener('DOMContentLoaded', function() {
    let Image = document.getElementById('change');
    
    
    let Image1 = "im2/1.jpeg";
    let Image2 = "im2/changeimage.avif";
    
    // Controlla quale immagine è attualmente mostrata e la cambia
    Image.addEventListener('click', function() {
        if(Image.src.includes(Image1)) {
            Image.src = Image2; 
        } else {
            Image.src = Image1; 
        }
    });
});

/*Apre un menu laterale sulla sinistra (pulsante menu)*/

document.addEventListener('DOMContentLoaded', function() {
    let sidebar = document.getElementById('sidebar');
    let openSidebarBtn = document.getElementById('menuBtn');

    openSidebarBtn.addEventListener('click', function() {
        
        sidebar.classList.toggle('show');
    });
});

/*API Auth0, con autenticazione Oauth 2.0*/
let auth0 = null;

  const initializeAuth0 = async () => {
    auth0 = await createAuth0Client({
      domain: 'dev-ojiyy6rg7t20dow4.us.auth0.com',
      client_id: 'C3SGp6iJ7pRqxKAK4Aj8ojJWEKlB3zw6',
      redirect_uri: 'http://matteocerami773.github.io/mhw3/callback'
    });

    //Gestisce la risposta di callback
    if (window.location.pathname === '/callback' && window.location.search.includes('code=')) {
      try {
        await auth0.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/");
      } catch (e) {
        console.error(e);
      }
      updateUI();
    }

    updateUI();
  };

  const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
      console.log('Utente autenticato');
      
    } else {
      console.log('Utente non autenticato');
    }
  };

  const login = async () => {
    await auth0.loginWithRedirect();
  };

  const logout = () => {
    auth0.logout({
      returnTo: 'http://matteocerami773.github.io/mhw3'
    });
  };

  window.onload = () => {
    initializeAuth0();
  };


  /*Utilizzo la API di Google Maps, per avere una mappa dei negozi IKEA in Italia:*/
  
  function initMap(){
    //Coordinate del centro della mappa (Italia)
    var center = { lat: 41.8719, lng: 12.5674 };

    // Creazione di un'istanza di Google Maps
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5, 
        center: center 
    });

    //negozi IKEA con le loro coordinate
    var ikeaShops = [
        { name: 'Ikea Milano San Giuliano', location: { lat: 45.5093, lng: 9.0976 } },
        { name: 'Ikea Roma Anagnina', location: { lat: 41.8236, lng: 12.6037 } },
        { name: 'Ikea Bologna Casalecchio di Reno', location: { lat: 44.4731, lng: 11.2887 } },
        { name: 'Ikea Firenze', location: { lat: 43.7807, lng: 11.2272 } },
        { name: 'Ikea Padova', location: { lat: 45.3963, lng: 11.878 } },
        { name: 'Ikea Verona', location: { lat: 45.4015, lng: 10.9988 } },
        { name: 'Ikea Catania', location: { lat: 37.4654, lng: 15.0636 } },
        { name: 'Ikea Napoli Afragola', location: { lat: 40.9377, lng: 14.2706 } },
        { name: 'Ikea Palermo', location: { lat: 38.1632, lng: 13.3201 } },
        { name: 'Ikea Cagliari', location: { lat: 39.2323, lng: 9.0952 } },
    ];

    //Aggiunge i marker 
    ikeaShops.forEach(function(shop) {
        var marker = new google.maps.Marker({
            position: shop.location,
            map: map,
            title: shop.name
        });
    });
}
