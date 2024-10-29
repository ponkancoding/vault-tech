import express, { Request, Response } from 'express';

const router = express.Router();

const users: Array<{
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  address: {
    homeName: string;
    street: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
}> = [];

router.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ users });
});

router.post('/create', async (req: Request, res: Response): Promise<void> => {
  const { personalDetails, address } = req.body;

  const { firstName, lastName, email, phone } = personalDetails;
  const { homeName, street, suburb, state, postcode, country } = address;

  if (!firstName || !lastName || !email || !phone) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  const emailExists = users.some((user) => user.personalDetails.email === email);

  if (emailExists) {
    res.status(400).json({ error: 'Email already exists.' });
    return;
  }

  const newUser = {
    personalDetails: { firstName, lastName, email, phone },
    address: { homeName, street, suburb, state, postcode, country },
  };
  users.push(newUser);

  res.status(200).json({ message: 'User added successfully!', user: newUser });
});

router.delete('/delete/:email', async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;

  const userIndex = users.findIndex((user) => user.personalDetails.email === email);

  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  users.splice(userIndex, 1);

  res.status(200).json({ message: 'User deleted successfully!' });
});

router.put('/update/:email', async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;
  const { personalDetails, address } = req.body;

  const { firstName, lastName, phone } = personalDetails;
  const { homeName, street, suburb, state, postcode, country } = address;

  if (!firstName || !lastName || !phone) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  const user = users.find((user) => user.personalDetails.email === email);

  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  user.personalDetails = { firstName, lastName, email, phone };
  user.address = { homeName, street, suburb, state, postcode, country };

  res.status(200).json({ message: 'User updated successfully!', user });
});

export default router;