function books() {
   window.location.href="/books";
}

function users() {
   window.location.href="/users";
}

function addUser() {
   window.location.href="/users/add";
}

function addBook() {
   window.location.href="/books/add";
}

function cancelEdit(prevPath) {
   if (!prevPath && window.navigation.canGoBack) {
      window.navigation.back();
   }

   if (prevPath) {
      window.location.href=prevPath;
   }

   window.location.href="/books";
}

function logout() {
   window.location.href="/auth/logout";
}