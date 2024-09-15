import { useState, useEffect } from 'react';
import LevelService from '../../../services/LevelService';

const useLevelData = (levelId, languageName) => {
  const [progress, setProgress] = useState(0);
  const [nextView, setNextView] = useState(0);
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const levelService = new LevelService();
  useEffect(() => {
    const fetchData = async () => {
        const savedProgress = localStorage.getItem(`progress_${levelId}`);
        const savedNextView = localStorage.getItem(`nextView_${levelId}`);
        const savedData = localStorage.getItem(`data_${levelId}`);
        const savedNewData = localStorage.getItem(`newdata_${levelId}`);
        const savedDataLoaded = localStorage.getItem(`loaded_${levelId}`);
    
        if (savedProgress) setProgress(parseInt(savedProgress, 10));
        if (savedNextView) setNextView(parseInt(savedNextView, 10));
        if (savedNewData) setNewData(JSON.parse(savedNewData));
        if (savedDataLoaded) setDataLoaded(true);
    
        if (savedData) {
        setData(JSON.parse(savedData));
        } else {
        try {
            const languageId = languageName === 'ENGLISH' ? 1 : languageName === 'GERMAN' ? 2 : 1;
            const response = await levelService.getLevelData(levelId, languageId);
            
            setData(response);
            localStorage.setItem(`data_${levelId}`, JSON.stringify(response));
            setDataLoaded(true);
            localStorage.setItem(`loaded_${levelId}`, 'true');
        } catch (error) {
            console.error("Błąd podczas pobierania danych:", error);
            setDataLoaded(false);
        }
        }
    };
    
    fetchData();
  }, [levelId, languageName]);

  return { progress, setProgress, nextView, setNextView, data, setData, newData, setNewData, dataLoaded, setDataLoaded, openModal, setOpenModal };
};

export default useLevelData;
