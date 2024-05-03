
const validateEmail = (email) => {
    email = email.trim();
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,4}$/;
    if (!email)
        return "Addresse email obligatoire."
    else if (!pattern.test(email))
        return "Addresse email invalide."
    else
        return "";
}

const validateContact = (contact, required) => {
    const pattern = /^[0+][0-9 ]{9,16}$/;
    if (!contact)
        return required ? "Contact obligatoire." : ""
    else if (!pattern.test(contact)) {
        return "Numéro de téléphone invalide."
    }
    else 
        return "";
}

const validateCinOrNif = (cinOrNif) => {
    if (!cinOrNif)
        return "N° CIN ou NIF obligatoire";
    else if (/^[^0-9 ]$/.test(cinOrNif))
        return "CIN ou NIF Invalide";
    else
        return "";
}

const validateName = (text) => {
    if (!text)
        return `Nom obligatoire.`;
    else if (!/^[a-zA-Z0-9._ -]+$/.test(text) || text.length > 60)
        return "Nom invalide";
    else
        return "";
}

const validatePassword = (text) => {
    if (!text)
        return `Mot de passe ne doit pas être vide.`;
    else
        return "";
}

const validateFirstName = (text) => {
    if (!/^[a-zA-Z ]*$/.test(text) || text.length > 60)
        return text ? "Prénom invalide" : "";
    else
        return "";
}

const validateAmi = (text) => {
    if (!text)
        return "Entrez la référence AMI"
    else if (text.length > 100)
        return text ? "Reférence AMI invalide" : "";
    else
        return "";
}

const validateFile = (file) => {   
    const size = Math.round(file.size/1024);
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];   

    if (!allowedTypes.includes(file.type))
        return "Type de fichier non autorisé."

    if (size > (3 * 1024))
        return "Soumettre un fichier inférieur à 3MB."
}

const validateTextarea = (text) => {
    if (text.length > 2000)
        return text ? "Pas plus de 2000 caractères" : "";
    else
        return "";
}

export const validateDemandeDossier = (input) => {
    return {
        nom: validateName(input.nom),
        prenom: validateFirstName(input.prenom),
        id_candidat: validateCinOrNif(input.cin_nif),
        email: validateEmail(input.email_entreprise),
        telephone1: validateContact(input.telephone1, true),
        telephone2: validateContact(input.telephone2, false),
        telephone3: validateContact(input.telephone3, false)
    }
}

export const validateDepotDossier = (input) => {
    const res = {}
    Object.keys(input).forEach(item => {
        if (item.startsWith('fichier')) {
            res[item] = validateFile(input[item]);
        }
    })
    res.id_ami = validateAmi(input.id_ami);
    res.description = validateTextarea(input.description);
    
    return res;
}

export const validateAjoutEmail = (input) => {
    return {
        nom: validateName(input.nom),
        email: validateEmail(input.email),
    } 
}

export const validateSignIn = (input) => {
    const emailError = validateEmail(input.email);
    const passwordError = validatePassword(input.password);

    if (emailError || passwordError)
        return "Email ou mot de passe invalide.";
}