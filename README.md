# Aufgaben für den 24.04.2024
### Client-Side Routing
##### Erklärung des Konzepts
Client-Side Routing ist ein Ansatz in der Webentwicklung, bei dem das Navigieren durch eine Webseite und der Austausch von Inhalten im Browser des Benutzers über JavaScript gehandhabt werden. Dies steht im Gegensatz zum traditionellen Server-Side Rendering (SSR), bei dem jede neue Seite vollständig vom Server geladen wird.

Bei Client-Side Routing wird die gesamte Webseite – oder zumindest ein Großteil davon – als eine einzige Seite geladen. Diese Seite fungiert dann als eine Art Rahmen, in dem unterschiedliche Inhalte dynamisch angezeigt werden können. Wenn ein Benutzer durch die Seite navigiert (z.B. über Menülinks klickt), lädt das Client-Side Routing nicht eine neue Seite vom Server, sondern verändert lediglich den angezeigten Inhalt innerhalb des bestehenden Rahmens. Dies geschieht durch JavaScript, das die URL in der Adresszeile verändert, ohne eine vollständige Seitenaktualisierung durchzuführen.
##### Vorteile von Client-Side Routing
Client-Side Routing bietet mehrere signifikante Vorteile, die vor allem die Benutzererfahrung verbessern:

- Schnelle Reaktionszeit: Da die Inhalte bereits im Browser geladen sind, können sie fast sofort angezeigt werden, ohne auf die Serverantwort zu warten. Dies macht das Browsen für den Benutzer schneller und reaktiver.
- Flüssige Navigation: Durch das Vermeiden vollständiger Seitenladungen fühlt sich die Navigation nahtlos an. Inhalte und visuelle Elemente bleiben zwischen den Seitenwechseln erhalten, was zu einer kohärenteren und weniger disruptiven Erfahrung führt.
- Weniger Serverlast: Da der Server nicht bei jedem Seitenwechsel aufgerufen wird, um die gesamte Seite neu zu rendern, reduziert sich die Belastung des Servers. Stattdessen werden oft nur Daten im JSON-Format nachgeladen, die dann auf dem Client gerendert werden.
- Erweiterte Nutzererfahrungen: Entwickler können komplexe Übergangseffekte und dynamischere Benutzeroberflächen erstellen, die mit traditionellem SSR schwerer zu implementieren wären.
Diese Vorteile machen Client-Side Routing besonders attraktiv für Anwendungen, bei denen Benutzererfahrung und schnelle Interaktion im Vordergrund stehen, wie z.B. bei Single Page Applications (SPAs). Trotzdem ist es wichtig, die potenziellen Nachteile zu bedenken, wie z.B. die Herausforderungen bei der Suchmaschinenoptimierung (SEO) und die initiale Ladezeit, die länger sein kann, da zunächst mehr Inhalte geladen werden müssen.

##### Technologien für das Client-Side Routing
Client-Side Routing kann zum Einen mit statischem HTML und Vanilla Javascript implementiert werden. Das ist im Vergleich zu anderen Lösungen (wie z.B. Frameworks) etwas umständlicher, aber zum Verständnis erstmal einfacher. 
Wir schauen uns das Ganze einfach mal an. Coded es gerne einmal nach 
1. Statisches HTML vorbereiten
Zunächst erstellen wir einige statische HTML-Dateien, die wir als Seiten verwenden wollen. Wir können zum Beispiel die Seiten `home.html`, `about.html` und `info.html`. #
```
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
</head>
<body>
    <h1>Willkommen auf der Startseite</h1>
    <p>Hier finden Sie grundlegende Informationen und eine Übersicht über unsere Website.</p>
</body>
</html>
```
```
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Über uns</title>
</head>
<body>
    <h1>Über uns</h1>
    <p>Diese Seite gibt Ihnen einen Einblick in unser Unternehmen und unsere Werte.</p>
</body>
</html>

```
```
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Info</title>
</head>
<body>
    <h1>Informationsseite</h1>
    <p>Hier finden Sie detaillierte Informationen zu unseren Produkten und Dienstleistungen.</p>
</body>
</html>
```

2. Wir erstellen die Haupt-HTML-Datei
Wir erstellen die `index.html`, die als Einstiegspunkt für unsere Anwendung dient. In dieser Datei setzen wir das Grundlayout und die Navigation:
```
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Simple Client-Side Routing</title>
</head>
<body>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">Über uns</a>
        <a href="#info">Info</a>
    </nav>
    <div id="content">
        <!-- Hier wird der Inhalt der Seiten geladen -->
    </div>
    <script src="router.js"></script>
</body>
</html>

```
3. Vanilla Javascript Router schreiben
Wir benötigen ein JavaScript-Modul, das die Navigation zwischen den Seiten steuert. Dieses Modul wird die URL überwachen und den entsprechenden Inhalt in den `content`-Bereich der `index.html` laden. 
```
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

```
Dies ermöglicht es uns, die Inhalte der verschiedenen Seiten dynamisch zu laden, ohne die gesamte Seite neu zu rendern. Wir verwenden das `hashchange`-Event, um auf Änderungen in der URL zu reagieren, und laden dann den entsprechenden Inhalt in den `content`-Bereich. Außerdem verwenden wir das `load`-Event, um die richtige Seite beim ersten Laden der Anwendung anzuzeigen. Die Funktion `router` extrahiert den Pfad aus der URL, lädt die entsprechende HTML-Datei über Fetch und fügt den Inhalt in den `content`-Bereich ein. Im Fehlerfall wird eine entsprechende Meldung angezeigt. Wenn wir von unserer ´index.html´ dann auf die nav-inks jeweils klicken, dann wird der Inhalt der jeweiligen Seite dynamisch geladen.
- Navigation: Die Links in der Navigation verwenden Hash-Basierte URLs (#home, #about, #info). Beim Klicken auf diese Links ändert sich die URL, was einen hashchange Event auslöst.
- Router Funktion: Diese Funktion hört auf Änderungen des Hashs in der URL. Sie bestimmt die neue "Seite", die angezeigt werden soll, lädt das entsprechende HTML-Dokument asynchron mit fetch() und setzt dessen Inhalt in das content Div.
- Event Listener: Es werden zwei Event Listener hinzugefügt. Einer für den load Event, um die richtige Seite zu laden, wenn die Anwendung zum ersten Mal gestartet wird, und einer für den hashchange Event, um die Seite zu aktualisieren, wenn der Benutzer navigiert.

### Aufgabe
Klont euch den Code und lasst ihn mal laufen. Laufen lassen könnt ihr das Ganze, indem ihr in VS Code den Live-Server aktiviert (Das ist eine Extension, die ihr installieren müsst).
Macht bitte einen Screenshot vom laufenden Code.
- Fügt eine weitere Seite mit dem Namen `contact.html` hinzu, die eine Kontaktseite darstellt. Dort sollen aufgelistet sein: Telefonnummer, E-Mail-Adresse und Anschrift. Außerdem soll ein Bild angezeigt werden. Nutzt dazu die HTML-Elemente `img`, `h2` und `p`. (Gerne danach googlen oder eine KI nutzen)
- Diese Seite soll über einen Button von index-Seite erreicht werden. Fügt das bitte hinzu.

Abgabe
Ein Screenshot mit der erfüllten Aufgabe

Javascript-Frameworks vorstellen
--- 
Für das Client-Side Routing gibt es mehrere moderne JavaScript-Frameworks und -Bibliotheken, die diese Funktionalität unterstützen und erleichtern. Hier sind drei der populärsten:

- React: Eine JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen, entwickelt von Facebook. React ist besonders bekannt für seine Komponenten-basierte Architektur, die das Erstellen von interaktiven UIs vereinfacht. Für das Routing in React-Anwendungen wird häufig die Bibliothek React Router verwendet.
- Angular: Ein umfassendes und mächtiges Framework, entwickelt von Google. Angular bietet eine komplette Lösung für die Entwicklung von Frontend-Anwendungen, inklusive einer eigenen Lösung für das Routing, den Angular Router, der direkt ins Framework integriert ist.
- Vue.js: Ein progressives JavaScript-Framework, das für seine Einfachheit und seine inkrementelle Adoptierbarkeit bekannt ist. Vue.js selbst hat keine eingebaute Routing-Lösung, aber es wird oft in Kombination mit Vue Router verwendet, einer Bibliothek, die speziell für Vue.js entwickelt wurde.

### Aufgabe 
Setzt euch bitte in 3 großen Gruppen zusammen und bereitet eine kleine Präsentation zu den verschiedenen Javascript-Frameworks vor. Geht bitte dabei auf die folgenden Aspekte ein:
- Was ist das Besondere an dem Framework?
- Welche Vorteile bietet es für die Entwicklung von Webanwendungen?
- Gibt es bekannte Anwendungsbeispiele oder Unternehmen, die das Framework verwenden?
- Welche Nachteile oder Herausforderungen gibt es bei der Verwendung des Frameworks?
- Gibt es Alternativen oder vergleichbare Frameworks?
- Welche Art von Projekten eignet sich besonders gut für das Framework?
- Gibt es spezielle Features oder Funktionen, die das Framework auszeichnen?
- Wie ist die Lernkurve für Entwickler, die das Framework noch nicht kennen?
- Ein Beispiel für eine einfache Anwendung oder Komponente, die mit dem Framework erstellt wurde.

Nutzt dazu bitte das Internet, insbesondere Youtube als Quelle. Für jedes Framework existiert außerdem eine offizielle Dokumentation, die ihr für eure Recherche nutzen könnt. Beschränkt euch bei dem Beispiel bitte auf eine einfache Anwendung oder Komponente, um den Rahmen der Präsention klein zu halten. Da ich nicht anwesend bin, kann ich euch leider nicht unterstützen. Es reicht daher vollkommen aus, wenn ihr aus einer sehr oberflächlichen Perspektive an das Thema rangeht. In der Tiefe besprechen wir das dann in der nächsten Stunde. Und tatsächlich ist Frontend nicht das Hauptthema der nächsten Stunden. Viel mehr wollen wir uns später um die Backend-Entwicklung mit Python kümmern. 

### Hinweis
Für die Ausführung der Projekte benötigen wir node als Anwendung. Das Ganze können wir am besten über einen Paketmanager installieren. Paketmanager existieren für jedes Betriebssystem. Unter Linux sollten yum oder apt bekannt sein. In MacOs verwendet man Homebrew und in Windows in der Regel chocolatey. Wir wollen auf euern Windows-Rechnern genau chocolatey installieren. 
Geht dazu bitte nach dieser Anleitung vor: https://chocolatey.org/install#individual (Haltet euch an der Individual Installation) Alternative Anleitung: https://docs.chocolatey.org/en-us/choco/setup
Wichtig ist, dass ihr die administrative Powershell bzw. cmd verwendet.

Nach der erfolgreichen Installation von Chocolatey könnt ihr jedes beliebige Programm installieren. Für unsere Zwecke benötigen wir node. Installiert node bitte mit dem Befehl `choco install nodejs`. Checken könnt ihr das Ganze dann mit `node -v` und `npm -v`. (npm ist der Package Manager von nodejs, quasi das Äquivalent zu pip bei Python)

Ausblick auf die nächste Stunde
--- 
In der nächsten Stunde werden wir uns die einzelnen Präsentationen ansehen und ich werde mit euch ein kleines Beispiel in jeweils einem Frontend-Framework durchgehen. Darüber hinaus bereiten wir dann ein geeignetes Backend als RestFul API vor, um die Frontend-Frameworks mit Daten zu versorgen. Hierzu verwenden wir wieder FastAPI und Python. Dann werden wir uns nämlich anschauen, wie wir Daten persistent halten können und integrieren eine Datenbank-Verbindung zu einer mysql-Datenbank. Dazu wird dann eine lokale mysql-Datenbank auf jedem Rechner laufen, die wir dann mit dem Backend ansteuern bei den sogenannten CRUD-Operationen (Create, Read, Update, Delete von verschiedenen Items). Weiterführend wollen wir dazu Unit Tests schreiben, um die Funktionalität zu gewährleisten. Diese Unit-Tests werden dann in einer Pipeline ausgeführt, die wir in Github Actions erstellen. Das ist das Prinzip des Continous Integration. Danach wollen wir das Ganze in Docker Container verpacken und die jeweiligen Docker-Images in einer Container-Registry speichern. Diese Docker Images können wir dann für eine Orchestrierung via Kubernetes nutzen oder aber ein Automatisierungstool wie Ansible verwenden, um die Anwendung auf virtuelle Maschinen bereitzustellen... Aber irgendwann sind dann auch schon Sommerferien ^^

