import { Request, Response } from 'express';
import User from "../models/users.model";
import Video from '../../videos/models/videos.model';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';


class UserRepository {

  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await hash(password, 10);
      const newUser = {
        user_id: uuidv4(),
        name,
        email,
        password: hashedPassword,
      };

      const videosCollection = {
        user_id: newUser.user_id,
        videos: [] 
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }

      await User.create(newUser);
      await Video.create(videosCollection);

      res.status(201).json({ message: 'User created successfully!' });

    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };


  async checkUserbyEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          exists: false,
          user: null,
          error: 'User not found'
        });
      }

      return res.status(200).json({
        exists: true,
        user: {
          name: user.name,
        }
      });

    } catch (error) {
      console.error('Error checking user by email:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }


  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password.' });
      }

      const token = sign({
        user_id: user.user_id,
        email: user.email
      }, process.env.SECRET as string, { expiresIn: '1d' });
      return res.status(200).json({ token: token, message: 'Authentication created successfully!' });

    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };


  async getUser(req: any, res: any) {
    try {
      const { user_id } = req.user
      const user = await User.findOne({ user_id });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const foundUser = {
        user_id: user.user_id,
        name: user.name,
        email: user.email
      }
      return res.status(200).json({ user: foundUser });

    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };

}

export default UserRepository;