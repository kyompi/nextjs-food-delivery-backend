module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1338),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "e10971ca6e7878ce245618ea6fc13515"),
    },
  },
});
