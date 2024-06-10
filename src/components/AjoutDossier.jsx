import { useEffect, useState } from "react";
import Input from "./form/Input";
import style from "./AjoutDossier.module.css";
import { validateAjoutDossier } from "../helpers/validateForm";
import Textarea from "./form/Textarea";
import Label from "./form/Label";
import GroupInput from "./GroupInput";
import Error from "./form/Error";
import DocumentApi from "../api/DocumentApi";
import AmiApi from "../api/AmiApi";
import CopieLien from "./CopieLien";
import { useNavigate } from "react-router-dom";
import AjoutFichier from "./AjoutFichier";
import SubmitButton from "./form/SubmitButton";

const AjoutDossier = ({ ref_ami, isNewAmi, trigger, setTrigger }) => {
	const [formValues, setFormValues] = useState({
		ref_ami: ref_ami || "",
		description: "",
		action: isNewAmi ? "insert" : "update",
		files: [{ name: `fichier${new Date().toString()}`, fichier: null }]
	});
	const [descriptionCharacter, setDescriptionCharcter] = useState(0);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate()

	const maxDescriptionCharacter = 2000;

	useEffect(() => {
		const fetchAmi = async (ref_ami) => {
			try {
				const newAmi = await AmiApi.getAmiByRef(ref_ami);

				setFormValues({
					...formValues,
					ref_ami: newAmi.ref_ami,
					description: newAmi.description
				});
			} catch (err) {
				console.error("Error fetching AMI list:", err);
				return;
			}
		};
		if (!isNewAmi)
			fetchAmi(ref_ami);
	}, [trigger])

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "description") {
			setDescriptionCharcter(value.length);
		}	
		setFormValues({
			...formValues,
			[name]: value
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		setErrors({});
		const data = validateAjoutDossier(formValues);
		// if error, then display the errors
		for (const [key, value1] of Object.entries(data)) {
			if (value1) {
				if (key !== "files") {
					setErrors(data);
					return;
				}
				else {
					for (const [key, value2] of Object.entries(value1)) {
						if (value2) {
							setErrors(data);
							return;
						}
					}
				}
			}
		}

		try {
			await DocumentApi.post(formValues);
			setTrigger(prev => !prev) // refresh the DAO in the table
			if (isNewAmi) {
				navigate(`/modification_dao/${encodeURIComponent(formValues.ref_ami)}`, { replace: true })
			}
			// reset the form but keep the ref_ami and description if update of DAO
			setFormValues({
				action: "update", 
				ref_ami: formValues.ref_ami, 
				description: formValues.description,
				files: [{ name: `fichier${new Date().toString()}`, fichier: null }]
			})
		} catch (error) {
			// case of duplicate AMI. we return 409 when nouveau DAO
			if (error.request.status == 409) {
				setErrors({ref_ami: "Ref. Appel d'offre déjà existant."})
			}
			console.error('Error:', error);
		}
	}

	return (
	  <>
	    <div className={style.container}>
	      {!isNewAmi && <CopieLien ref_ami={ref_ami} />}

	      <form
	        className={style.formContainer}
	        onSubmit={handleSubmit}
	      >
	        <GroupInput>
	          <Label value="Ref. Appel d'offre" name="ref_ami" required={true} />
	          <Input
	            type="text"
	            value={formValues["ref_ami"]}
	            name="ref_ami"
	            placeholder="Entrez le N° Ref. Appel d'offre"
	            disabled={ref_ami ? true : false}
	            handleChange={handleChange}
	          />
	          <Error value={errors["ref_ami"]} />
	        </GroupInput>

	        <GroupInput>
	          <Label value="Description" name="description" />
	          <Textarea
	            name="description"
	            placeholder="Mettre à jour la description des DAO"
	            value={formValues["description"]}
	            handleChange={handleChange}
	          />
			  <span
			  	className={
					`${style.character} 
					${descriptionCharacter > maxDescriptionCharacter && style.red}`}
			  >
				{descriptionCharacter} / {maxDescriptionCharacter} caractères
			  </span>

	          <Error value={errors["description"]} />
	        </GroupInput>

	        <AjoutFichier
	          formValues={formValues}
	          setFormValues={setFormValues}
	          files={formValues.files}
	          errors={errors}
	        />

	        <div className={style.buttonContainer}>
	          <SubmitButton
	            value="Soumettre"
	          />
	        </div>
	      </form>
	    </div>
	  </>
	);
}

export default AjoutDossier;