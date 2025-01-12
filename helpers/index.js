const jsonwebtoken = require("jsonwebtoken");
const config = require("../config");

const getUserName = (token, res) => {
   try {
      if (token == null) return "";
      const tokenVerify = jsonwebtoken.verify(token, config.SECRET);
      return tokenVerify.login;
   } catch (e) {
      return res.redirect("/users/add");
   }
};

const getIsAdmin = (token, res) => {
   try {
      if (token == null) return "";
      const tokenVerify = jsonwebtoken.verify(token, config.SECRET);
      return tokenVerify.isAdmin;
   } catch (e) {
      return res.redirect("/auth/login");
   }
};

const renderView = ({ pathToViewFile, documentTitle, data, message, sessionToken, res }) => {
   if (pathToViewFile.includes("auth")) {
      return res.render(pathToViewFile, {
         title: documentTitle,
         message: message ?? "",
         login: "",
      });
   }

   const isAdmin = getIsAdmin(sessionToken, res);
   const username = getUserName(sessionToken, res);

   res.render(pathToViewFile, {
      title: documentTitle,
      message: message ?? "",
      data: data ?? [],
      login: username,
      isAdmin: isAdmin
   });
}

module.exports = {
   getUserName,
   getIsAdmin,
   renderView,
};