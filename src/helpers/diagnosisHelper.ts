export const formatDiagnosisList = (diagnosisList) => {
  const { diagnosis } = diagnosisList;
  if (diagnosis?.length > 0)
    return diagnosis.map((diagnosisArray) => {
      return {
        _id: diagnosisArray._id,
        diagnosisItems: diagnosisArray.diagnosisItems
          .map((diagnosis) => diagnosis.Issue.Name)
          .join(', '),
        ...(diagnosisArray.isValid !== undefined && {
          isValid: diagnosisArray.isValid,
        }),
      };
    });
  return [];
};
