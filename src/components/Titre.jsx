import style from './Titre.module.css'

const Titre = ({title}) => (
    <h1 className={style.title}>
        {title}
    </h1>
);

export default Titre;