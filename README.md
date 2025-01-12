### Opis projektu

Dana strona jest stroną, przedstawiającą panel administratora.

Aby wejść na stronę użytkownik musi się zalogować.

Panel zawiera 2 strony główne: **użytkownicy** oraz **książki**.
Wspiera dwie role admin i klient. Admin ma dostęp do dodatkowych stron,
takich jak tworzenie nowych adminów i użytkowników; tworzenie, edycja i usuwanie książek.
Natomiast użytkownik może wyłącznie preglądać dostępne książki.

### Drzewo projektu:
 - **controllers** - zawiera funkcję do wystawionych endpointów.
 - **db** - zawiera kod podłączenia sie do bazy oraz je zainicjowanie danymi początkowymi.
 - **helpers** - zawiera funkcje pomocnicze.
 - **middlewares** - zawiera funkcje pośrednie do sprawdzenia roli i sesji użytkownika.
 - **public** - zawiera style, assety i kod uruchamiany dynamicznie po stronie klienta.
 - **routes** - zawiera wszystkie udostępnione przez API endpointy.
 - **views** - zawiera widoki do wyświetlania użytkownikowi.

```diff
!Przed uruchomieniem niezbędne śćągnięcie bibliotek opisanych w pliku "package.json" poleceniem
```

```
npm install
```

Uruchomienie panelu administratora lokalnie możliwe za pomocą komendy
```
npm start
```

### Dane wejściowe
Admin:
 - login: **admin**
 - password: **admin1234***

Użytkownik:
 - login: **usertest1**
 - password: **test1234***
