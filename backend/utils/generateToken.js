
//generating jwt for authorization and access protected routes. For authentication, we don't need jwt. We simply compare password and email with database data.
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export default generateToken