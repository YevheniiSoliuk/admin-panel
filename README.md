### Opis projektu

Dana strona jest stroną, przedstawiającą panel administratora.

Aby wejść na stronę uzytkownik musi się zalogować.

Panel zawiera 2 strony główne: **uzytkownicy** oraz **ksiązki**.
Wspiera dwie role admin i klient. Admin ma dostęp do dodatkowych stron,
takich jak tworzenie nowych adminów i urzytkowników; tworzenie, edycja i usuwanie ksiązek.
Natomiast uzytkownik moze wyłącznie preglądać dostępne ksiązki.

### Drzewo projektu:
 - controllers - zawiera funkcję do wystawionych endpointów.
 - db - zawiera kod podłączenia sie do bazy oraz je zainicjowanie danymi początkowymi.
 - helpers - zawiera funkcje pomocnicze.
 - middlewares - zawiera funkcje pośrednie do sprawdzenia roli i sesji uzytkownika.
 - public - zawiera style, assety i kod uruchamiany dynamicznie po stronie klienta.
 - routes - zawiera wszystkie udostępnione przez API endpointy.
 - views - zawiera widoki do wyświetlania uzytkownikowi.

```diff
!Przed uruchomieniem klienta oraz serwera trzeba śćągnąć biblioteki opisane w pliku "package.json" polecenim
```

```
npm install
```

Uruchomienie panelu administratora lokalnie komendą
```
npm start
```

### Dane wejściowe
Admin:
 - login: admin
 - password: admin1234*

Uzytkownik:
 - login: usertest1
 - password: test1234*
