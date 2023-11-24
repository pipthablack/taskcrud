import { v4 as uuidv4 } from 'uuid';
import asyncHandler from 'express-async-handler';

let accessTokenStore = {}; // In-memory storage for access tokens
let refreshTokenStore = {}; // In-memory storage for refresh tokens

const authHelpers = {};

// @desc    Generate tokens
authHelpers.generateToken = asyncHandler(({ id, userId }) => {
  if (!id || !userId) {
    throw new Error('Both id and userId are required to generate tokens');
  }

  // Generate unique tokens using uuid
  const accessToken = uuidv4();
  const refreshToken = uuidv4();

  // Store tokens in memory
  accessTokenStore[userId] = accessToken;
  refreshTokenStore[userId] = refreshToken;

  return { accessToken, refreshToken };
});

// @desc    Authenticate access token
authHelpers.authenticateAccessToken = (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token || !Object.values(accessTokenStore).includes(token)) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  // Extract user ID from the token and attach to the request
  const userId = Object.keys(accessTokenStore).find((key) => accessTokenStore[key] === token);
  req.user = { userId };

  next();
};

// @desc    Authenticate refresh token
authHelpers.authenticateRefreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken || !Object.values(refreshTokenStore).includes(refreshToken)) {
    return res.status(401).json({ message: 'Unauthorized user, refresh token invalid' });
  }

  // Extract user ID from the token and attach to the request
  const userId = Object.keys(refreshTokenStore).find((key) => refreshTokenStore[key] === refreshToken);
  req.user = { userId };

  next();
});

export default authHelpers;
