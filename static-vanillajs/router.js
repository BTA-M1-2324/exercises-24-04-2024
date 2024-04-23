window.addEventListener("hashchange", router);
window.addEventListener("load", router);

function router() {
    const path = window.location.hash.substring(1) || 'home';
    const contentDiv = document.getElementById('content');
    const routes = {
        'home': 'home.html',
        'about': 'about.html',
        'info': 'info.html'
    };
    fetch(routes[path])
        .then(response => response.text())
        .then(html => contentDiv.innerHTML = html)
        .catch(error => contentDiv.innerHTML = '<p>Fehler beim Laden der Seite.</p>');
}

