const express =require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES = require("../../config/roles");

router.route("/")
    .get(verifyRoles(ROLES.Admin),userController.getUsers);
    
router.route("/:username")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(verifyRoles(ROLES.Admin),userController.deleteUser);

router.route("/:username/changepwd")
    .patch(userController.changePassword);
    
router.route("/:username/returnbook")
    .patch(userController.returnBook);
    
router.route("/:username/addrole")
    .patch(verifyRoles(ROLES.Editor,ROLES.Admin),userController.addRole);

router.route("/:username/deleterole")
    .patch(verifyRoles(ROLES.Admin),userController.deleteRole);

router.route("/:username/borrowedbooks")
    .get(userController.getBorrowedBooks);

router.route("/findborrowers/:bookId")
    .post(verifyRoles(ROLES.Admin),userController.findBorrowers);

module.exports = router;