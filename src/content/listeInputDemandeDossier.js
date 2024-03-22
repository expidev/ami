export const inputList = [
    {
      label: "Nom de l'entreprise ou du Candidat",
      type: "text",
      name: "nom",
      placeholder: "Entrez votre notre nom d'entreprise ou votre nom",
      required: true
    },
    {
      label: "Prénom (Si personne physique)",
      type: "text",
      name: "prenom",
      placeholder: "Entrez votre prénom si vous avez entré(e) votre nom",
      required: false
    },
    {
      label: "N° CIN ou NIF",
      type: "text",
      name: "cin_nif",
      placeholder: "Entrez votre N° CIN ou NIF",
      required: true
    },
    {
      label: "Email",
      type: "email",
      name: "email_entreprise",
      placeholder: "Entrez votre email",
      required: true
    },
    {
      label: "Contact",
      type: "text",
      name: "telephone",
      placeholder: "Entrez votre numéro de téléphone",
      required: true
    }
];