
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
    const pattern = /^[0+][0-9 ]{9,18}$/;
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
    else if (!/^[a-zA-Z0-9._ -]+$/.test(text) || text.length > 70)
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

const validateAdresse = (text) => {
    if (!/^[a-zA-Z0-9 ]+$/.test(text) || text.length > 70)
        return text ? "Adresse Invalide" : "";
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
    if (!file) return ""
    const size = Math.round(file.size/1024);
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];   

    if (!allowedTypes.includes(file.type))
        return "Type de fichier non autorisé."

    if (size > (3 * 1024))
        return "Soumettre un fichier inférieur à 3MB."

    return ""
}

const validateDescription = (text) => {
    if (text.length > 2000)
        return text ? "Pas plus de 2000 caractères" : "";
    else
        return "";
}

export const validateDemandeDossier = (input) => {
    return {
        nom: validateName(input.nom),
        adresse: validateAdresse(input.adresse),
        cin_nif: validateCinOrNif(input.cin_nif),
        email: validateEmail(input.email),
        telephone1: validateContact(input.telephone1, true),
        telephone2: validateContact(input.telephone2, false),
        telephone3: validateContact(input.telephone3, false)
    }
}

export const validateAjoutDossier = (input) => {
    const res = {}
    const files = {}
    input.files.map(file =>
        files[file.name] = validateFile(file.fichier)
    );
    res.files = files;
    res.ref_ami = validateAmi(input.ref_ami);
    res.description = validateDescription(input.description);
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
    const passwordError = validatePassword(input.mot_de_passe);

    if (emailError || passwordError)
        return "Email ou mot de passe invalide.";
}