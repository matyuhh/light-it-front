export default interface IDiagnosis {
  Issue: {
    ID: number;
    Name: string;
    Accuracy: number;
    Icd: string;
    IcdName: string;
    ProfName: string;
    Ranking: number;
  };
  Specialisation?: unknown;
}
