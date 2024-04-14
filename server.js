const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://elhabibali:e2He1oMGkjgO6Ekb@cluster0.cyjcsfy.mongodb.net/pfe1?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Définition du schéma pour les demandes de congé
const demandeCongeSchema = new mongoose.Schema({
  CIN: String,
  Username: String,
  dateDebut: Date,
  dateFin: Date,
  description: String
});

// Création du modèle à partir du schéma
const DemandeConge = mongoose.model('DemandeConge', demandeCongeSchema);

// Route pour recevoir les données du formulaire (méthode POST)
app.post('/conges', async (req, res) => {
  const { CIN, Username, dateDebut, dateFin, description } = req.body;

  try {
    const nouvelleDemande = new DemandeConge({
      CIN,
      Username,
      dateDebut,
      dateFin,
      description
    });
    await nouvelleDemande.save();

    console.log('Données du formulaire de congé enregistrées dans MongoDB.');

    res.status(200).json({ message: 'Données du formulaire de congé enregistrées avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données du formulaire de congé dans MongoDB :', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement des données.' });
  }
});
app.get('/conges', async (req, res) => {
  try {
    // Récupérer toutes les demandes de congé depuis la base de données
    const demandes = await DemandeConge.find();
    // Répondre avec les données récupérées
    res.json(demandes);
  } catch (error) {
    // En cas d'erreur, répondre avec un statut 500 (Erreur interne du serveur)
    console.error('Erreur lors de la récupération des demandes de congé:', error);
    res.sendStatus(500);
  }
});
// Route pour accepté une demande de congé (méthode POST)
app.post('/conges/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const demande = await DemandeConge.findByIdAndUpdate(id, { status: 'accepter' });
    if (!demande) {
      return res.status(404).json({ message: 'Demande de congé non trouvée.' });
    }
    res.json({ message: 'Demande de congé accepter avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'approbation de la demande de congé:', error);
    res.status(500).json({ message: 'Erreur lors de l\'approbation de la demande de congé.' });
  }
});

// Route pour rejeter une demande de congé (méthode POST)
app.post('/conges/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const demande = await DemandeConge.findByIdAndUpdate(id, { status: 'refusé' });
    if (!demande) {
      return res.status(404).json({ message: 'Demande de congé non trouvée.' });
    }
    res.json({ message: 'Demande de congé refusé.' });
  } catch (error) {
    console.error('Erreur lors du rejet de la demande de congé:', error);
    res.status(500).json({ message: 'Erreur lors du rejet de la demande de congé.' });
  }
}); 
// Définition du schéma pour les employés
const employeeSchema = new mongoose.Schema({
  lundi: String,
  mardi: String,
  mercredi: String,
  jeudi: String,
  vendredi: String
});
const Employee = mongoose.model('employee', employeeSchema);


// Route pour récupérer tous les employés
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Erreur lors de la récupération des employés :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Ajoutez cette route pour gérer l'ajout d'un employé avec son emploi du temps
app.post('/ajouter-emploi-du-temps', async (req, res) => {
  const employee = new Employee({
    lundi: req.body.lundi,
    mardi: req.body.mardi,
    mercredi: req.body.mercredi,
    jeudi: req.body.jeudi,
    vendredi: req.body.vendredi
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/employees/:id', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Erreur lors de la récupération des employés :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
app.post('/modifier-emploi-du-temps/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extrait l'ID des paramètres de la requête

    // Vérifier si l'ID est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Paramètre d'employé invalide." });
    }

    const {lundi, mardi, mercredi, jeudi, vendredi } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      lundi,
      mardi,
      mercredi,
      jeudi,
      vendredi
    }, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Emploi du temps non trouvé' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'employé du temps:", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour de l'employé du temps." });
  }
});

app.post('/employees/:id/archive', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    employee.archived = true; 
    await employee.save();

    res.status(200).json({ message: "Employé archivé avec succès" });
  } catch (error) {
    console.error('Erreur lors de l\'archivage de l\'employé :', error);
    res.status(500).json({ message: "Erreur lors de l'archivage de l'employé" });
  }
});

const formationsSchema = new mongoose.Schema({
  nomDeFormateur: String,
  Formation: String,
  description: String,
  prix: String
});

// Création du modèle à partir du schéma
const FormationModel = mongoose.model('Formation', formationsSchema);

app.get('/formation', async (req, res) => {
  try {
    const formations = await FormationModel.find();
    res.json(formations);
  } catch (error) {
    console.error('Error fetching formations:', error);
    res.status(500).json({ error: 'Error fetching formations' });
  }
});

// Route pour ajouter une formation
app.post('/ajouter-formations', async (req, res) => {
  const { nomDeFormateur, Formation, description, prix } = req.body;

  try {
    // Créer une nouvelle instance de Formation avec les données reçues
    const newFormation = new FormationModel({
      nomDeFormateur,
      Formation,
      description,
      prix
    });

    // Enregistrer la nouvelle formation dans la base de données
    const savedFormation = await newFormation.save();

    // Répondre avec la formation nouvellement créée
    res.status(201).json(savedFormation);
        // Afficher une notification
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la formation :', error);
    res.status(400).json({ message: 'Erreur lors de l\'ajout de la formation' });
  }
});

app.post('/Formation', async (req, res) => {
  const selectedFormationId = req.body.selectedFormation;

  try {
    const selectedFormationData = await FormationModel.findById(selectedFormationId);
    const { nomDeFormateur, Formation, description, prix } = selectedFormationData || {};

    const newSelectedFormation = new FormationModel({
      nomDeFormateur,
      Formation,
      description,
      prix
    });   
    const savedSelectedFormation = await newSelectedFormation;
    res.status(200).json({ message: 'Formation envoyée  avec succès au responsable RH', savedSelectedFormation });
  } catch (error) {
    console.error('Error saving selected formation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/formation/:id', async (req, res) => {
  try {
    const formations = await FormationModel.find();
    res.json(formations);
  } catch (error) {
    console.error('Error fetching formations:', error);
    res.status(500).json({ error: 'Error fetching formations' });
  }
});


// Route pour modifier une formation
app.post('/modifier-formation/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID de formation invalide." });
  }

  const { nomDeFormateur, Formation, description, prix } = req.body;

  try {
    const updatedFormation = await FormationModel.findByIdAndUpdate(id, {
      nomDeFormateur,
      Formation,
      description,
      prix
    }, { new: true });

    if (!updatedFormation) {
      return res.status(404).json({ error: 'Formation non trouvée' });
    }
   
    res.status(200).json(updatedFormation);    
  } catch (error) {
    console.error('Erreur lors de la modification de la formation :', error);
    res.status(500).json({ message: 'Erreur lors de la modification de la formation' });
  }
});


app.post('/formation/:id/archive', async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndUpdate(id, { $set: { archived: true } });
    res.json({ message: 'formation archivé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'archivage de la formation :', error);
    res.status(500).json({ message: 'Erreur lors de l\'archivage de la foramation' });
  }
});


// Définition du schéma pour les profiles des employés
const userEmpSchema = new mongoose.Schema({
  CIN: Number,
  firstName: String,
  lastName: String,
  email: String,
  tel: Number
});

const User= mongoose.model('User', userEmpSchema);

// Route pour récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// Route pour mettre à jour un utilisateur par son ID
app.post('/users/:id', async (req, res) => {
  const { id } = req.params;
  const {CIN, firstName, lastName, email,tel} = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, {
      CIN, 
      firstName,
      lastName,
      email,
      tel,
    }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Définition du schéma pour les profiles des responsableRH
const userRHSchema = new mongoose.Schema({
  CIN: Number,
  firstName: String,
  lastName: String,
  email: String,
  tel: Number
});

const UserRH= mongoose.model('profileRH', userRHSchema);


// Route pour récupérer tous les utilisateurs
app.get('/profileRH', async (req, res) => {
  try {
    const users = await UserRH.find();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
app.get('/profileRH/:id', async (req, res) => {
  try {
    const user = await UserRH.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// Route pour mettre à jour un utilisateur par son ID
app.post('/profileRH/:id', async (req, res) => {
  const { id } = req.params;
  const { CIN, firstName, lastName, email, tel } = req.body;

  try {
    const updatedUserRH = await UserRH.findByIdAndUpdate(id, {
      CIN, 
      firstName,
      lastName,
      email,
      tel,
    }, { new: true });

    if (!updatedUserRH) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUserRH);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Démarrer le serveur et écouter sur le port défini
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});