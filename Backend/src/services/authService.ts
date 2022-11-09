import passport from "passport";
import { Strategy, VerifyFunction } from "passport-local";
import prisma from "../prismaClient";
import { comparePassword } from "../helpers/userHelper";

const authUser: VerifyFunction = async (matricula, password, next) => {
  const user = await prisma.user.findUnique({
    where: {
      matricula,
    },
  });

  if (!user || !comparePassword(password, user.password)) {
    return next(null, false);
  }

  return next(null, user);
};

passport.use(new Strategy({ usernameField: "matricula" }, authUser));

passport.serializeUser((user, next) => next(null, user.matricula));

passport.deserializeUser(async (matricula, next) => {
  const user = await prisma.user.findUnique({
    where: {
      matricula: matricula as string,
    },
  });

  if (!user) {
    return next(null, false);
  }

  return next(null, user);
});

export default passport;
