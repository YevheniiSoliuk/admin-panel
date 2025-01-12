const { adminPassword, testUserPassword } = require("../config");

const initialUsersData = [
   {
      name: "Yevhenii Admin",
      lastname: "Soliuk",
      login: "admin",
      password: adminPassword,
      email: "admin@mail.com",
      isAdmin: 1,
   }, {
      name: "User",
      lastname: "Test 1",
      login: "usertest1",
      password: testUserPassword,
      email: "testuser@mail.com",
      isAdmin: 0,
   }
];

const initialBooksData = [
   {
     title: "Pride and Prejudice",
     author_name: "Jane",
     author_lastname: "Austen",
     first_publish_year: 1813,
     about: "A classic novel that explores the themes of love, societal expectations, and individual growth through the story of Elizabeth Bennet and Mr. Darcy."
   },
   {
     title: "1984",
     author_name: "George",
     author_lastname: "Orwell",
     first_publish_year: 1949,
     about: "A dystopian novel that examines the dangers of totalitarianism and extreme political ideology in a world of perpetual surveillance and propaganda."
   },
   {
     title: "To Kill a Mockingbird",
     author_name: "Harper",
     author_lastname: "Lee",
     first_publish_year: 1960,
     about: "A deeply moving novel that addresses racial injustice and moral growth in the Deep South, seen through the eyes of young Scout Finch."
   }
];

module.exports = {
   initialUsersData,
   initialBooksData,
};