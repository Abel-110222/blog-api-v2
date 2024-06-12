import UserProfile from '../models/UserProfile.js';



export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario en la base de datos
    const newUser = new User({
      username,
      email,
      password // Recuerda cifrar la contraseña antes de almacenarla en la base de datos
    });

    await newUser.save();

    res.status(201).json(newUser); // Devolver el nuevo usuario creado con el código de estado 201
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ where: { user_id: req.userId } });
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { bio, avatar_url } = req.body;

  try {
    const userProfile = await UserProfile.findOne({ where: { user_id: req.userId } });
    if (!userProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    userProfile.bio = bio || userProfile.bio;
    userProfile.avatar_url = avatar_url || userProfile.avatar_url;
    await userProfile.save();

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

