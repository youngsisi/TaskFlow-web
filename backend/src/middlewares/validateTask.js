const validateTask = (req, res, next) => {

    const { title, priority, status } = req.body;

    const priorities = [
        "basse",
        "moyenne",
        "haute"
    ];

    const statuses = [
        "à faire",
        "en cours",
        "terminé"
    ];

    if (!title) {

        return res.status(400).json({
            message: "Le titre est obligatoire"
        });
    }

    if (!priorities.includes(priority)) {

        return res.status(400).json({
            message: "Priorité invalide"
        });
    }

    if (status && !statuses.includes(status)) {

        return res.status(400).json({
            message: "Statut invalide"
        });
    }

    next();
};

module.exports = validateTask;