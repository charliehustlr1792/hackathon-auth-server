const UserRepository = require("../repository/repository");
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require("../config/serverconfig");
const bcrypt = require('bcrypt');
const QRCode = require('qrcode');
const Jimp = require('jimp');
const stringifySafe = require('json-stringify-safe');
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getbyEmail(email);
      const passwordsMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordsMatch) {
        console.log("Passwords don't match");
        throw { error: "Incorrect Password" };
      } else {
        const newJWT = this.createToken({ email: user.email, id: user.id });
        return newJWT;
      }
    } catch (error) {
      console.log("Something wrong happened in signing in");
      throw error;
    }
  }
  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid Token" };
      }
      const user = await this.userRepository.getbyId(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Sommething wrong happened in auth process");
      throw error;
    }
  }
  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "10h" });
      return result;
    } catch (error) {
      console.log("Something wrong happened in token creation");
      throw error;
    }
  }
  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something wrong happened in token validation");
      throw error;
    }
  }
  checkPassword(userInputPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
  
  async generateQRCode(userEmail){
    try {
      const user = await this.userRepository.getbyEmail(userEmail);
      const qrData = stringifySafe({ id: user.id, name: user.name, email: user.email });
      const qrCodeBuffer = await QRCode.toBuffer(qrData, { type: 'image/png' });
  
      // Save QR code as a JPG file
      const image = await Jimp.read(qrCodeBuffer);
      const outputPath = `./assets/user_${user.id}.png`;
      await image.quality(100).writeAsync(outputPath);
      return true;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw error;
    }
  };
}
module.exports = UserService;
