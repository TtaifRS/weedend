import moesif from 'moesif-nodejs'
import dotenv from 'dotenv'

dotenv.config({ path: './config/config.env' })
//moesif setup 
export const moesifMiddleware = moesif({
  applicationId: process.env.MOESIF_ID,

  // Optional hook to link API calls to users
  identifyUser: function (req, res) {
    return req.user ? req.user.id : undefined;
  },
});