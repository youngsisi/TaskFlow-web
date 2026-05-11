exports.register = async (req, res) => {

  const { fullname, email, password } = req.body;

  // Vérifier champs
  if (!fullname || !email || !password) {

    return res.status(400).json({
      message: "All fields are required"
    });

  }

  // Vérifier longueur password
  if (password.length < 6) {

    return res.status(400).json({
      message: "Password must be at least 6 characters"
    });

  }

  try {

    // Vérifier email
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "Email already exists"
      });

    }

    const user = await User.create({
      fullname,
      email,
      password
    });

    res.status(201).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};