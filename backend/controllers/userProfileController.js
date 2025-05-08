import { getUserIdByCookies } from '../util/auth/getUserIdByCookies.js';
import { User } from '../models/users.js';

export const getUser = async (req, res) => {
  try {
    const userId = getUserIdByCookies(req);
    const user = await User.findById(userId);
    if (!userId) return res.status(404).send({ message: 'User not found' })
    res.json(user);
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
};