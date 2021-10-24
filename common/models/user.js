'use strict';
const app = require('../../server/server');
var Role = app.models.Role;
var RoleMapping = app.models.RoleMapping;

module.exports = function (User) {
  User.observe('after save', function a(ctx, next) {
    console.log('############## Inside User :: After save hook ###############');
    try {
      const data = ctx.instance ? ctx.instance : ctx.data;
      if (data && data.id && data.isAdmin) {
        // make user as admin
        const role = Role.findOrCreate({where: {name: 'admin'}}, {
          name: 'admin'
        });
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: data.id
        });
      }
    } catch (err) {
      logger.error('Error :: ', err);
      next();
    }
  });

  User.createAdmin = async function(userDetails) {
    try {
      const user = await User.create(userDetails);
      if (user && user.id && userDetails.isAdmin) {
        const role = Role.findOrCreate({where: {name: 'admin'}}, {
          name: 'admin'
        });
          //make bob an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: user.id
        });
      }
    } catch (err) {
      logger.error('Error :: ', err);
      next();
    }
  }

  User.remoteMethod("createAdmin", {
    http: {
      path: "/create-admin",
      verb: "post"
    },
    accepts: {
      arg: "payload",
      type: "object",
      "http": {
        "source": "body"
      }
    },
    isStatic: true,
    returns: {
      arg: "User",
      type: "object",
      root: "true"
    }
  });
};
