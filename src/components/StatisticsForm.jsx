import React, { useEffect, useState } from "react";
import GroupContainer from "./GroupContainer";
import Button from "./form/Button";
import InputTexte from "./form/InputTexte";
import Label from "./form/Label";
import StatisticsApi from "../api/StatisticsApi";
import AmiApi from "../api/AmiApi";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from "react-datepicker";
import fr from 'date-fns/locale/fr';

import style from "./StatisticsForm.module.css";

registerLocale('fr', fr);

const getTodayDate = () => {
    return new Date();
}

const getOneMonthEarlierDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
}

const StatisticsForm = ({
    trigger, 
    setStatistics, 
    setTrigger
}) => {
    const [formValues, setFormValues] = useState({
        search: "Tout",
        startDate: getOneMonthEarlierDate(),
        endDate: getTodayDate(),
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const generalStats = await StatisticsApi.post('/statistics', formValues);
                console.log(generalStats)
                setStatistics(generalStats)
            }
            catch (err) {
                console.log(err.message)
                throw err;
            }
        }
        fetchStatistics();
    }, [trigger])
    
    const fetchSuggestions = (value) => {
        setTimeout(async () => {
            const fetchedSuggestions = await AmiApi.searchAmiById(value);
            setSuggestions(fetchedSuggestions);
        }, 1000);
    }

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setFormValues({...formValues, search: value});
        setShowDropdown(value.trim().length > 0);
        fetchSuggestions(value);
    }

    const handleChange = (name, date) => {
        setFormValues({...formValues, [name]: date});
    }

    const handleDropdownItemClick = (item) => {
        setFormValues({...formValues, search: item});
        setShowDropdown(false);
    }

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        setTrigger(prev => !prev)
    }

    return (
        <div>
            <form className={style.container} onSubmit={handleSubmit}>
                <div className={style.searchContainer}>
                    <GroupContainer>
                        <Label value="Référence d'appel d'offre" />
                        <InputTexte
                            type="search"
                            value={formValues.search}
                            handleChange={handleSearchChange}
                        />
                        {showDropdown && (
                            <div className={style.dropdown}>
                                <div
                                    className={style.dropdownItem}
                                    onClick={() => handleDropdownItemClick("Tout")}
                                    >
                                    Tout
                                </div>
                                {suggestions.map((item, index) => (
                                    <div
                                        key={index}
                                        className={style.dropdownItem}
                                        onClick={() => handleDropdownItemClick(item.id_ami)}
                                        >
                                        {item.id_ami}
                                    </div>
                                ))}
                            </div>
                        )}
                    </GroupContainer>
                </div>

                <GroupContainer>
                    <Label value="Intervalle de Temps" />
                    <DatePicker
                        selected={formValues.startDate}
                        onChange={(date) => handleChange("startDate", date)}
                        dateFormat="dd-MM-yyyy"
                        locale="fr"
                        maxDate={getTodayDate()}
                        className={style.input}
                        wrapperClassName={style.datePickerWrapper}
                        calendarClassName={style.datePickerCalendar}
                    />
                    <p style={{textAlign: "center"}}> jusqu'à </p>
                    <DatePicker
                        selected={formValues.endDate}
                        onChange={(date) => handleChange("endDate", date)}
                        dateFormat="dd-MM-yyyy"
                        locale="fr"
                        maxDate={getTodayDate()}
                        className={style.input}
                        wrapperClassName={style.datePickerWrapper}
                    />
                </GroupContainer>
                <div className={style.buttonContainer}>
                   <Button type="submit" value="Procéder"/>
                </div>
            </form>
        </div>
    )
}

export default StatisticsForm;
