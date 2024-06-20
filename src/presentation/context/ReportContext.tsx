import React, {createContext, useState} from 'react';

export const ReportContext = createContext();

export const ReportProvider = ({children}) => {
  const [report, setReport] = useState({
    vehicle: null,
    generator: null,
    observations: '',
    steps: {step1: '', step2: '', step3: ''},
  });

  const updateReport = newData => {
    setReport(prevReport => ({...prevReport, ...newData}));
  };

  return (
    <ReportContext.Provider value={{report, updateReport}}>
      {children}
    </ReportContext.Provider>
  );
};
